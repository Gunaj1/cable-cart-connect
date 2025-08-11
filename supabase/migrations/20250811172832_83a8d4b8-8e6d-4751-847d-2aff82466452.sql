-- 1) Roles enum
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin','customer');
  END IF;
END $$;

-- 2) Profiles table (links to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'customer',
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Security definer helper to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(_uid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = COALESCE(_uid, auth.uid())
      AND p.role = 'admin'
  );
$$;

-- RLS policies for profiles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can view their profile'
  ) THEN
    CREATE POLICY "Users can view their profile"
    ON public.profiles FOR SELECT TO authenticated
    USING (id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE TO authenticated
    USING (id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Admins can view all profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT TO authenticated
    USING (public.is_admin(auth.uid()));
  END IF;
END $$;

-- 3) Categories: add image_url and unique(name)
ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS image_url text;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'categories_name_unique'
  ) THEN
    ALTER TABLE public.categories ADD CONSTRAINT categories_name_unique UNIQUE (name);
  END IF;
END $$;

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for categories
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='categories' AND policyname='Categories are viewable by authenticated users'
  ) THEN
    CREATE POLICY "Categories are viewable by authenticated users"
    ON public.categories FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='categories' AND policyname='Admins can insert categories'
  ) THEN
    CREATE POLICY "Admins can insert categories"
    ON public.categories FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='categories' AND policyname='Admins can update categories'
  ) THEN
    CREATE POLICY "Admins can update categories"
    ON public.categories FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='categories' AND policyname='Admins can delete categories'
  ) THEN
    CREATE POLICY "Admins can delete categories"
    ON public.categories FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
  END IF;
END $$;

-- 4) Products: add required content columns
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS applications text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS specifications jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS stock_quantity integer DEFAULT 0;

-- Ensure FK for category_id
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints tc
    JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
    WHERE tc.table_schema='public' AND tc.table_name='products' AND tc.constraint_type='FOREIGN KEY'
      AND ccu.column_name='category_id'
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id)
      REFERENCES public.categories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS policies for products
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='products' AND policyname='Products are viewable by authenticated users'
  ) THEN
    CREATE POLICY "Products are viewable by authenticated users"
    ON public.products FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='products' AND policyname='Admins can insert products'
  ) THEN
    CREATE POLICY "Admins can insert products"
    ON public.products FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='products' AND policyname='Admins can update products'
  ) THEN
    CREATE POLICY "Admins can update products"
    ON public.products FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='products' AND policyname='Admins can delete products'
  ) THEN
    CREATE POLICY "Admins can delete products"
    ON public.products FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
  END IF;
END $$;

-- 5) Pages: enable RLS and policies for SEO content
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='pages' AND policyname='Pages viewable by all'
  ) THEN
    CREATE POLICY "Pages viewable by all"
    ON public.pages FOR SELECT TO public USING (COALESCE(is_published, true));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='pages' AND policyname='Admins can manage pages'
  ) THEN
    CREATE POLICY "Admins can manage pages"
    ON public.pages FOR ALL TO authenticated
    USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
  END IF;
END $$;

-- 6) Storage bucket and policies for product images
INSERT INTO storage.buckets (id, name, public)
SELECT 'product-images', 'product-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images');

-- Public read for product-images
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Public read access to product-images'
  ) THEN
    CREATE POLICY "Public read access to product-images" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'product-images');
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can upload to product-images'
  ) THEN
    CREATE POLICY "Admins can upload to product-images" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images' AND public.is_admin(auth.uid()));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can update product-images'
  ) THEN
    CREATE POLICY "Admins can update product-images" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'product-images' AND public.is_admin(auth.uid()));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can delete product-images'
  ) THEN
    CREATE POLICY "Admins can delete product-images" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'product-images' AND public.is_admin(auth.uid()));
  END IF;
END $$;
