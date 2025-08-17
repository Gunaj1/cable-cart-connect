import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  Zap,
  Shield,
  Settings,
  Award,
  Cable,
  Star,
  Palette,
  Ruler,
  Wrench,
  Clock,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils"; // if you don’t have this, replace with simple join className function

// ------------------- Product Interface -------------------
interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description?: string;
  stock: number;
  detailedDescription?: {
    applications: string[];
    specifications: string[];
    features: string[];
  };
}

// ------------------- Helper -------------------
const extractTechnicalDetails = (product: Product) => {
  const shielding = product.name.includes("STP")
    ? "STP (Shielded)"
    : product.name.includes("FTP")
    ? "FTP (Foiled)"
    : product.name.includes("UTP")
    ? "UTP (Unshielded)"
    : "Standard";

  const construction = product.name.includes("Flat")
    ? "Flat Cable"
    : product.name.includes("Armored")
    ? "Armored Cable"
    : product.name.includes("Outdoor")
    ? "Outdoor Rated"
    : product.name.includes("2 pair")
    ? "2-Pair Construction"
    : "Standard Construction";

  const bandwidth = product.name.includes("Cat 6")
    ? "Up to 250MHz"
    : product.name.includes("Cat 5e")
    ? "Up to 100MHz"
    : "Standard Bandwidth";

  const speed = product.name.includes("Cat 6")
    ? "Up to 10Gbps (55m)"
    : product.name.includes("Cat 5e")
    ? "Up to 1Gbps"
    : "Standard Speed";

  return {
    shielding,
    construction,
    bandwidth,
    speed,
    colors: "Multiple Colors Available",
    lengths: "Custom Lengths Available",
    impedance: "100 ±15Ω",
    applications:
      product.detailedDescription?.applications.slice(0, 3) || ["General Use"],
    customization: "OEM & Custom Orders Available",
    warranty: "2 Years Manufacturer Warranty",
  };
};

// ------------------- Comparison Modal -------------------
interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onClearComparison: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  isOpen,
  onClose,
  products,
  onClearComparison,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [highlightedColumn, setHighlightedColumn] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modal) modal.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen || products.length < 2) return null;

  const comparisonData = products.map(extractTechnicalDetails);

  const comparisonSections = [
    {
      title: "Basic Information",
      rows: [
        { label: "Product Name", key: "name", icon: Award },
        { label: "Category", key: "category", icon: Settings },
        { label: "Price", key: "price", icon: DollarSign },
        { label: "Stock Status", key: "stock", icon: CheckCircle2 },
      ],
    },
    {
      title: "Technical Specifications",
      rows: [
        { label: "Shielding Type", key: "shielding", icon: Shield },
        { label: "Construction", key: "construction", icon: Wrench },
        { label: "Bandwidth", key: "bandwidth", icon: Zap },
        { label: "Speed Rating", key: "speed", icon: Zap },
        { label: "Impedance", key: "impedance", icon: Settings },
      ],
    },
    {
      title: "Customization & Availability",
      rows: [
        { label: "Available Colors", key: "colors", icon: Palette },
        { label: "Length Options", key: "lengths", icon: Ruler },
        { label: "Primary Applications", key: "applications", icon: CheckCircle2 },
        { label: "Customization Options", key: "customization", icon: Star },
        { label: "Warranty Period", key: "warranty", icon: Clock },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={cn(
          "bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 relative z-20",
          isAnimating
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Cable className="w-6 h-6 text-white" />
            <div>
              <h2
                id="comparison-title"
                className="text-2xl font-bold text-white"
              >
                Product Comparison
              </h2>
              <p className="text-blue-100">
                Compare {products.length} selected products
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClearComparison}
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 text-sm"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 p-2 rounded-full hover:bg-white/20"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 bg-white z-30 border-b border-gray-200 flex overflow-x-auto">
          {comparisonSections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={cn(
                "px-6 py-3 text-lg font-semibold border-b-4",
                activeSection === index
                  ? "text-blue-600 border-blue-600 bg-blue-50"
                  : "text-gray-600 border-transparent hover:text-blue-500"
              )}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-auto max-h-[70vh] p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-blue-200">
                <th className="text-left py-3 px-3 text-lg font-bold text-gray-900">
                  {comparisonSections[activeSection].title}
                </th>
                {products.map((product, index) => (
                  <th
                    key={product.id}
                    onClick={() =>
                      setHighlightedColumn(
                        highlightedColumn === index ? null : index
                      )
                    }
                    className={cn(
                      "text-center py-3 px-3 text-lg font-bold cursor-pointer",
                      highlightedColumn === index
                        ? "bg-blue-100 text-blue-700 ring-2 ring-blue-400"
                        : index % 2 === 0
                        ? "bg-blue-50"
                        : "bg-gray-50"
                    )}
                  >
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonSections[activeSection].rows.map((row) => {
                const Icon = row.icon;
                return (
                  <tr key={row.key} className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold text-gray-800">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span>{row.label}</span>
                      </div>
                    </td>
                    {products.map((product, colIndex) => {
                      let value;
                      if (row.key === "name") value = product.name;
                      else if (row.key === "category") value = product.category;
                      else if (row.key === "price") value = `$${product.price}`;
                      else if (row.key === "stock")
                        value = `${product.stock} in stock`;
                      else if (row.key === "applications") {
                        value = comparisonData[colIndex].applications.join(", ");
                      } else {
                        value =
                          comparisonData[colIndex][
                            row.key as keyof typeof comparisonData[0]
                          ];
                      }

                      return (
                        <td
                          key={`${product.id}-${row.key}`}
                          className={cn(
                            "py-3 px-3 text-center text-gray-700",
                            highlightedColumn === colIndex
                              ? "bg-blue-100 ring-2 ring-blue-400"
                              : colIndex % 2 === 0
                              ? "bg-blue-50/30"
                              : "bg-gray-50/30"
                          )}
                        >
                          {typeof value === "string" && value.includes(",") ? (
                            <div className="text-sm space-y-1">
                              {value.split(",").map((item, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-white rounded-full px-2 py-1 inline-block mr-1 mb-1"
                                >
                                  {item.trim()}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="font-medium">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 flex justify-center space-x-4 bg-gray-50 border-t">
          <button
            onClick={onClearComparison}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear Comparison
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ------------------- Product Page -------------------
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cat 6 UTP Cable",
    category: "LAN Cable",
    image: "https://via.placeholder.com/150",
    price: 120,
    stock: 25,
    detailedDescription: {
      applications: ["Networking", "Data Transfer", "Home Use"],
      specifications: ["Cat 6", "23AWG", "PVC Jacket"],
      features: ["High Speed", "Durable", "Reliable"],
    },
  },
  {
    id: "2",
    name: "Cat 5e FTP Cable",
    category: "LAN Cable",
    image: "https://via.placeholder.com/150",
    price: 80,
    stock: 50,
    detailedDescription: {
      applications: ["Networking", "Office Use", "Small Business"],
      specifications: ["Cat 5e", "24AWG", "Shielded"],
      features: ["Affordable", "Good Quality"],
    },
  },
  {
    id: "3",
    name: "Outdoor Armored Cable",
    category: "LAN Cable",
    image: "https://via.placeholder.com/150",
    price: 200,
    stock: 10,
    detailedDescription: {
      applications: ["Outdoor", "Industrial", "Heavy Duty"],
      specifications: ["Armored", "UV Resistant", "Waterproof"],
      features: ["Weather Resistant", "Strong Build"],
    },
  },
];

const ProductPage: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const toggleSelect = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-blue-600 font-semibold">${product.price}</p>
            <p className="text-sm text-gray-500">{product.stock} in stock</p>

            <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.some((p) => p.id === product.id)}
                onChange={() => toggleSelect(product)}
                className="mr-2"
              />
              <span>Select for Compare</span>
            </div>
          </div>
        ))}
      </div>

      {/* Compare Button */}
      <div className="mt-8">
        <button
          disabled={selectedProducts.length < 2}
          onClick={() => setIsComparisonOpen(true)}
          className={cn(
            "px-6 py-3 text-lg rounded-lg text-white",
            selectedProducts.length < 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          Compare {selectedProducts.length > 0 && `(${selectedProducts.length})`}
        </button>
      </div>

      {/* Comparison Modal */}
      <ProductComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={selectedProducts}
        onClearComparison={() => setSelectedProducts([])}
      />
    </div>
  );
};

export default ProductPage;

