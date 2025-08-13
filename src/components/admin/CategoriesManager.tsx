import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "./ImageUploader";

interface Category {
  id: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  created_at?: string;
}

const CategoriesManager = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("id,name,description,image_url,created_at")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    setItems((data as Category[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) return alert("Name is required");
    setSaving(true);
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    const { error } = await supabase.from("categories").insert({
      name: name.trim(),
      slug,
      description: description || null,
      image_url: imageUrl,
    });
    if (error) alert(error.message);
    setName("");
    setDescription("");
    setImageUrl(null);
    await fetchAll();
    setSaving(false);
  };

  const updateCategory = async (id: string, patch: Partial<Category>) => {
    const { error } = await supabase.from("categories").update(patch).eq("id", id);
    if (error) alert(error.message);
    await fetchAll();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) alert(error.message);
    await fetchAll();
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Categories</h2>
        <p className="text-sm text-gray-600">Manage product categories and images.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-4 space-y-3">
          <h3 className="font-semibold">Add Category</h3>
          <label className="block text-sm">Name
            <input className="mt-1 w-full border rounded p-2" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., CAT6 Cables" />
          </label>
          <label className="block text-sm">Description
            <textarea className="mt-1 w-full border rounded p-2" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description (optional)" />
          </label>
          <div>
            <p className="text-sm font-medium">Image</p>
            <ImageUploader onUploaded={(url) => setImageUrl(url)} />
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 h-24 object-cover rounded" />}
          </div>
          <button disabled={saving} onClick={addCategory} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{saving ? "Saving…" : "Add"}</button>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-4 border-b font-semibold">Existing</div>
          {loading ? (
            <div className="p-4">Loading…</div>
          ) : (
            <ul className="divide-y">
              {items.map((c) => (
                <li key={c.id} className="p-4 flex items-start gap-4">
                  <img src={c.image_url || ""} alt={c.name} className="w-16 h-16 object-cover rounded bg-gray-100" />
                  <div className="flex-1 space-y-2">
                    <input className="w-full border rounded p-2" defaultValue={c.name} onBlur={(e) => updateCategory(c.id, { name: e.target.value })} />
                    <textarea className="w-full border rounded p-2" rows={2} defaultValue={c.description ?? ""} onBlur={(e) => updateCategory(c.id, { description: e.target.value })} />
                  </div>
                  <button onClick={() => deleteCategory(c.id)} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoriesManager;
