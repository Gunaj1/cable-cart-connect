import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "./ImageUploader";

interface PageRow {
  id: string; slug: string; title: string | null; content: string | null; is_published: boolean | null; hero_image: string | null; seo: any;
}

const PagesManager = () => {
  const [items, setItems] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [seo, setSeo] = useState("{\n  \"title\": \"\",\n  \"description\": \"\"\n}");
  const [hero, setHero] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("pages").select("id,slug,title,content,is_published,hero_image,seo").order("created_at", { ascending: false });
    setItems((data as PageRow[]) || []);
    setLoading(false);
  };

  useEffect(()=>{ load(); }, []);

  const add = async () => {
    if (!slug.trim()) return alert("Slug required");
    let seoObj: any = {};
    try { seoObj = JSON.parse(seo || "{}"); } catch { return alert("Invalid SEO JSON"); }
    const { error } = await supabase.from("pages").insert({
      slug: slug.trim(), title: title || null, content: content || null, is_published: true, hero_image: hero, seo: seoObj
    });
    if (error) alert(error.message);
    setSlug(""); setTitle(""); setContent(""); setHero(null); setSeo("{\n  \"title\": \"\",\n  \"description\": \"\"\n}");
    await load();
  };

  const update = async (id: string, patch: Partial<PageRow>) => {
    const { error } = await supabase.from("pages").update(patch).eq("id", id);
    if (error) alert(error.message);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) alert(error.message);
    await load();
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Pages</h2>
        <p className="text-sm text-gray-600">Manage SEO pages (About, Services, etc.). Existing site content remains as fallback.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-4 space-y-3">
          <h3 className="font-semibold">Add Page</h3>
          <label className="block text-sm">Slug
            <input className="mt-1 w-full border rounded p-2" value={slug} onChange={e=>setSlug(e.target.value)} placeholder="about, services, home" />
          </label>
          <label className="block text-sm">Title
            <input className="mt-1 w-full border rounded p-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Page title" />
          </label>
          <label className="block text-sm">Content (HTML/Markdown or plain text)
            <textarea className="mt-1 w-full border rounded p-2" rows={6} value={content} onChange={e=>setContent(e.target.value)} />
          </label>
          <label className="block text-sm">SEO (JSON)
            <textarea className="mt-1 w-full border rounded p-2 font-mono" rows={4} value={seo} onChange={e=>setSeo(e.target.value)} />
          </label>
          <div>
            <p className="text-sm font-medium">Hero image</p>
            <ImageUploader folder="pages" onUploaded={(url)=>setHero(url)} />
            {hero && <img src={hero} alt="Hero" className="mt-2 h-24 object-cover rounded" />}
          </div>
          <button onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-4 border-b font-semibold">Existing</div>
          {loading ? (<div className="p-4">Loading…</div>) : (
            <ul className="divide-y">
              {items.map(p => (
                <li key={p.id} className="p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <input className="border rounded p-2" defaultValue={p.slug} onBlur={(e)=>update(p.id,{ slug: e.target.value })} />
                    <input className="border rounded p-2 flex-1" defaultValue={p.title ?? ""} onBlur={(e)=>update(p.id,{ title: e.target.value })} />
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked={!!p.is_published} onChange={(e)=>update(p.id,{ is_published: e.target.checked })} /> Published
                    </label>
                  </div>
                  <textarea className="border rounded p-2 w-full" rows={3} defaultValue={p.content ?? ""} onBlur={(e)=>update(p.id,{ content: e.target.value })} />
                  <textarea className="border rounded p-2 w-full font-mono" rows={3} defaultValue={JSON.stringify(p.seo || {}, null, 2)} onBlur={(e)=>{ try{ update(p.id,{ seo: JSON.parse(e.target.value||"{}") }); } catch{ alert("Invalid JSON"); } }} />
                  <div className="flex items-center gap-3">
                    <input className="border rounded p-2 flex-1" placeholder="Hero URL" defaultValue={p.hero_image ?? ""} onBlur={(e)=>update(p.id,{ hero_image: e.target.value })} />
                    <button onClick={()=>remove(p.id)} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default PagesManager;
