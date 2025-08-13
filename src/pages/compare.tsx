import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface DbProduct {
  id: string;
  name: string;
  price: number | null;
  applications: string[] | null;
  features: string[] | null;
  specifications: Record<string, string> | null;
  image_url: string | null;
  stock_quantity: number | null;
}

const ComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ids = useMemo(() => {
    const p = new URLSearchParams(location.search).get("ids") || "";
    return p.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3);
  }, [location.search]);

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Compare Products | ${ids.length} selected`;
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = `${window.location.origin}/compare`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [ids.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (ids.length < 2) {
        navigate("/", { replace: true });
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id,name,price,applications,features,specifications,image_url,stock_quantity")
        .in("id", ids);
      if (error) {
        console.error("Failed to load products:", error);
      }
      setProducts((data as DbProduct[]) || []);
      setLoading(false);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  if (loading) return <div className="p-6">Loading comparison…</div>;
  if (products.length < 2) return <div className="p-6">Select at least two products to compare.</div>;

  const cols = Math.min(products.length, 3);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Comparison</h1>
      <div className={`grid gap-6 ${cols === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
        {products.map((p) => (
          <article key={p.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="aspect-video bg-gray-50 flex items-center justify-center">
              {p.image_url ? (
                <img src={p.image_url} alt={`${p.name} product image`} className="w-full h-full object-contain" loading="lazy" />
              ) : (
                <div className="text-sm text-gray-500">No image</div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-gray-700">Price: {p.price != null ? `₹${Number(p.price).toFixed(2)}` : "N/A"}</p>
              <p className="text-gray-700">Stock: {p.stock_quantity ?? 0}</p>
              {p.applications && p.applications.length > 0 && (
                <section>
                  <h3 className="font-medium">Applications</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {p.applications.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </section>
              )}
              {p.features && p.features.length > 0 && (
                <section>
                  <h3 className="font-medium">Features</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {p.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </section>
              )}
              {p.specifications && Object.keys(p.specifications).length > 0 && (
                <section>
                  <h3 className="font-medium">Specifications</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(p.specifications).map(([k, v]) => (
                        <tr key={k} className="border-t">
                          <td className="py-1 pr-3 font-medium text-gray-700 w-1/3">{k}</td>
                          <td className="py-1 text-gray-700">{String(v)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default ComparePage;
