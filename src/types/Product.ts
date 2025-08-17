// Unified Product interface for consistent typing across components
export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  stock: number;
  detailedDescription?: {
    applications: string[];
    specifications: string[];
    features: string[];
  };
}

// CSV Product structure for data loading
export interface CSVProduct {
  name: string;
  category_slug: string;
  price: string;
  image_url: string;
  short_description: string;
  applications: string;
  features: string;
  specifications: string;
}

// Database Product structure
export interface DbProduct {
  id: string;
  name: string;
  category_id: string | null;
  price: number | null;
  image_url: string | null;
  applications: string[] | null;
  features: string[] | null;
  specifications: Record<string, string> | null;
  stock_quantity: number | null;
  short_description?: string | null;
}