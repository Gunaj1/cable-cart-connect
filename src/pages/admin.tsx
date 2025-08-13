import { useState } from "react";
import AdminRoute from "@/components/AdminRoute";
import CategoriesManager from "@/components/admin/CategoriesManager";
import ProductsManager from "@/components/admin/ProductsManager";
import PagesManager from "@/components/admin/PagesManager";

export default function Admin() {
  const [tab, setTab] = useState<"products"|"categories"|"pages">("products");

  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-600">Only admins may make changes. Data is synced with Supabase.</p>
        </header>

        <nav className="flex gap-3 mb-8">
          <button onClick={()=>setTab("products")} className={`px-4 py-2 rounded ${tab==="products"?"bg-blue-600 text-white":"bg-white border"}`}>Products</button>
          <button onClick={()=>setTab("categories")} className={`px-4 py-2 rounded ${tab==="categories"?"bg-blue-600 text-white":"bg-white border"}`}>Categories</button>
          <button onClick={()=>setTab("pages")} className={`px-4 py-2 rounded ${tab==="pages"?"bg-blue-600 text-white":"bg-white border"}`}>Pages</button>
        </nav>

        {tab === "products" && <ProductsManager />}
        {tab === "categories" && <CategoriesManager />}
        {tab === "pages" && <PagesManager />}
      </div>
    </AdminRoute>
  );
}
