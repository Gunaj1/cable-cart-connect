import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "./ImageUploader";

interface CategoryRow { id: string; name: string; }
interface ProductRow {
  id: string; name: string; category_id: string | null; price: number | null;
  applications: string[] | null; features: string[] | null;
  specifications: Record<string, string> | null; image_url: string | null;
  stock_quantity: number | null; short_description?: string | null;
}

const parseTags = (raw: string) => raw.split(",").map(s => s.trim()).filter(Boolean);

const ProductsManager = () => {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [items, setItems] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [applications, setApplications] = useState("");
  const [features, setFeatures] = useState("");
  const [specJSON, setSpecJSON] = useState("{}");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [shortDescription, setShortDescription] = useState("");

  const loadAll = async () => {
    setLoading(true);
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from("categories").select("id,name").order("name"),
      supabase.from("products").select("id,name,category_id,price,applications,features,specifications,image_url,stock_quantity,short_description").order("created_at", { ascending: false })
    ]);
    setCategories((cats as CategoryRow[]) || []);
    setItems((prods as ProductRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { loadAll(); }, []);

  const addProduct = async () => {
    if (!name.trim()) return alert("Name required");
    if (!categoryId) return alert("Select category");
    const priceNum = price ? Number(price) : null;
    const stockNum = stock ? Number(stock) : 0;
    let specs: Record<string,string> = {};
    try { specs = JSON.parse(specJSON || "{}"); } catch { return alert("Invalid specifications JSON"); }
    setSaving(true);
    const { error } = await supabase.from("products").insert({
      name: name.trim(),
      category_id: categoryId,
      price: priceNum,
      stock_quantity: stockNum,
      applications: applications ? parseTags(applications) : [],
      features: features ? parseTags(features) : [],
      specifications: specs,
      image_url: imageUrl,
      short_description: shortDescription || null,
    });
    if (error) alert(error.message);
    // reset
    setName(""); setCategoryId(""); setPrice(""); setStock(""); setApplications(""); setFeatures(""); setSpecJSON("{}"); setImageUrl(null); setShortDescription("");
    await loadAll();
    setSaving(false);
  };

  const updateProduct = async (id: string, patch: Partial<ProductRow>) => {
    const { error } = await supabase.from("products").update(patch).eq("id", id);
    if (error) alert(error.message);
    await loadAll();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) alert(error.message);
    await loadAll();
  };

  const catMap = useMemo(() => new Map(categories.map(c => [c.id, c.name])), [categories]);

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Products</h2>
        <p className="text-sm text-gray-600">Manage products, pricing, stock, specs and images.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-4 space-y-3">
          <h3 className="font-semibold">Add Product</h3>
          <label className="block text-sm">Name
            <input className="mt-1 w-full border rounded p-2" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Cat 6 STP" />
          </label>
          <label className="block text-sm">Category
            <select className="mt-1 w-full border rounded p-2" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
              <option value="">Select…</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">Price
              <input className="mt-1 w-full border rounded p-2" type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} placeholder="0.00" />
            </label>
            <label className="block text-sm">Stock
              <input className="mt-1 w-full border rounded p-2" type="number" value={stock} onChange={e=>setStock(e.target.value)} placeholder="0" />
            </label>
          </div>
          <label className="block text-sm">Short Description
            <textarea className="mt-1 w-full border rounded p-2" rows={2} value={shortDescription} onChange={e=>setShortDescription(e.target.value)} placeholder="One-line description" />
          </label>
          <label className="block text-sm">Applications (comma separated)
            <input className="mt-1 w-full border rounded p-2" value={applications} onChange={e=>setApplications(e.target.value)} placeholder="LAN, CATV, Industrial" />
          </label>
          <label className="block text-sm">Features (comma separated)
            <input className="mt-1 w-full border rounded p-2" value={features} onChange={e=>setFeatures(e.target.value)} placeholder="OEM, Customizable, Fluke-tested" />
          </label>
          <label className="block text-sm">Specifications (JSON)
            <textarea className="mt-1 w-full border rounded p-2 font-mono" rows={4} value={specJSON} onChange={e=>setSpecJSON(e.target.value)} placeholder='{"length":"1m","conductor":"Cu"}' />
          </label>
          <div>
            <p className="text-sm font-medium">Image</p>
            <ImageUploader onUploaded={(url)=>setImageUrl(url)} />
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 h-24 object-cover rounded" />}
          </div>
          <button disabled={saving} onClick={addProduct} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{saving?"Saving…":"Add"}</button>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-4 border-b font-semibold">Existing</div>
          {loading ? (<div className="p-4">Loading…</div>) : (
            <ul className="divide-y">
              {items.map(p => (
                <li key={p.id} className="p-4 flex items-start gap-4">
                  <img src={p.image_url || ""} alt={p.name} className="w-16 h-16 object-cover rounded bg-gray-100" />
                  <div className="flex-1 grid grid-cols-2 gap-3 items-start">
                    <input className="border rounded p-2 col-span-2" defaultValue={p.name} onBlur={(e)=>updateProduct(p.id,{ name: e.target.value })} />
                    <select className="border rounded p-2" defaultValue={p.category_id ?? ""} onChange={(e)=>updateProduct(p.id,{ category_id: e.target.value || null })}>
                      <option value="">No category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <input className="border rounded p-2" type="number" step="0.01" defaultValue={p.price ?? undefined} onBlur={(e)=>updateProduct(p.id,{ price: e.target.value? Number(e.target.value): null })} />
                    <input className="border rounded p-2" type="number" defaultValue={p.stock_quantity ?? 0} onBlur={(e)=>updateProduct(p.id,{ stock_quantity: Number(e.target.value)||0 })} />
                    <input className="border rounded p-2 col-span-2" defaultValue={(p.applications||[]).join(", ")} onBlur={(e)=>updateProduct(p.id,{ applications: parseTags(e.target.value) })} />
                    <input className="border rounded p-2 col-span-2" defaultValue={(p.features||[]).join(", ")} onBlur={(e)=>updateProduct(p.id,{ features: parseTags(e.target.value) })} />
                    <textarea className="border rounded p-2 col-span-2 font-mono" rows={3} defaultValue={JSON.stringify(p.specifications||{})} onBlur={(e)=>{ try{ updateProduct(p.id,{ specifications: JSON.parse(e.target.value||"{}") }); } catch{ alert("Invalid JSON"); } }} />
                    <textarea className="border rounded p-2 col-span-2" rows={2} defaultValue={p.short_description ?? ""} onBlur={(e)=>updateProduct(p.id,{ short_description: e.target.value })} />
                  </div>
                  <button onClick={()=>deleteProduct(p.id)} className="px-3 py-2 bg-red-600 text-white rounded self-start">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsManager;
