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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-2">
            Product Comparison
          </h1>
          <p className="text-gray-600">Compare specifications, features, and pricing side by side</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                  <th className="p-4 text-left text-white font-semibold sticky left-0 bg-blue-600 z-10 min-w-[150px]">
                    Feature
                  </th>
                  {products.map((p) => (
                    <th key={p.id} className="p-4 text-center text-white font-semibold min-w-[250px]">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-32 h-32 bg-white rounded-lg p-2 flex items-center justify-center">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="w-full h-full object-contain" />
                          ) : (
                            <div className="text-sm text-gray-500">No image</div>
                          )}
                        </div>
                        <span className="text-lg">{p.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10">Price</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {p.price != null ? `₹${Number(p.price).toFixed(2)}` : "N/A"}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white z-10">Stock</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        (p.stock_quantity ?? 0) > 10 ? 'bg-green-100 text-green-700' : 
                        (p.stock_quantity ?? 0) > 0 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {p.stock_quantity ?? 0} units
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10">Applications</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.applications && p.applications.length > 0 ? (
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 text-left">
                          {p.applications.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white z-10">Features</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.features && p.features.length > 0 ? (
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 text-left">
                          {p.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10">Specifications</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.specifications && Object.keys(p.specifications).length > 0 ? (
                        <div className="space-y-2 text-left">
                          {Object.entries(p.specifications).map(([k, v]) => (
                            <div key={k} className="text-sm">
                              <span className="font-medium text-gray-900">{k}:</span>{' '}
                              <span className="text-gray-700">{String(v)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComparePage;
