import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  // Load products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error("Error fetching products:", error);
    else setProducts(data || []);
  };

  // Add a new product
  const addProduct = async () => {
    if (!name || price <= 0) {
      alert("Please enter valid product details.");
      return;
    }
    const { error } = await supabase.from("products").insert([{ name, price }]);
    if (error) {
      console.error(error);
      alert("Error adding product");
    } else {
      setName("");
      setPrice(0);
      fetchProducts();
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("Error deleting product");
    } else {
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>

      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <button onClick={addProduct}>Add</button>

      <h2>Existing Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price}
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
