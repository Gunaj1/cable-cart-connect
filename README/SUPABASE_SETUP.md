# Supabase Setup

This project includes an idempotent Supabase migration and seed helpers to manage all content (categories, products, images, SEO pages, comparisons) from Supabase.

## 1) Run the migration
Option A – SQL Editor (recommended):
1. Open the Supabase SQL Editor
2. Paste the contents of `supabase_full_migration.sql`
3. Run it. It is safe to re-run.

Option B – Supabase CLI:
1. `supabase db execute --file supabase_full_migration.sql`

## 2) Seed initial data
Categories:
- Import `data/categories.csv` into the `categories` table (columns: name, slug, description, image_url)

Products:
- Import `data/products.csv` into a temp table or directly into `products`
- If importing via `category_slug`, you can map to `category_id` using:

```sql
-- Map helper: create category_id from category_slug
WITH cat AS (
  SELECT id, slug FROM public.categories
)
INSERT INTO public.products (name, category_id, price, image_url, short_description, applications, features, specifications)
SELECT
  p.name,
  c.id,
  p.price::numeric,
  NULLIF(p.image_url,'')::text,
  NULLIF(p.short_description,'')::text,
  CASE WHEN p.applications <> '' THEN string_to_array(p.applications,';') ELSE '{}'::text[] END,
  CASE WHEN p.features <> '' THEN string_to_array(p.features,';') ELSE '{}'::text[] END,
  CASE WHEN p.specifications <> '' THEN p.specifications::jsonb ELSE '{}'::jsonb END
FROM
  (SELECT * FROM public.read_csv('data/products.csv')) AS p
JOIN cat c ON c.slug = p.category_slug;
```

Alternatively, import `data/products.csv` via dashboard, then run an UPDATE to set `category_id` using `category_slug`.

## 3) Promote your first admin
After signing up in the app:
```sql
UPDATE public.profiles SET role='admin' WHERE id='<YOUR_USER_UUID>';
```

## 4) Environment variables
Use the existing Supabase client already configured in the project. No .env changes are required in Lovable.

## 5) Storage
Product images are stored in public bucket `product-images`. Uploads are restricted to admins.

## 6) Realtime (optional)
To enable realtime for a table, run:
```sql
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
```

## 7) Troubleshooting
- If you cannot insert/update: ensure your user is an admin (profiles.role='admin')
- If you cannot see data: ensure RLS SELECT policies allow your user (authenticated) or public for pages
