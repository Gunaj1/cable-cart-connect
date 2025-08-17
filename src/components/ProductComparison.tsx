import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

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
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Product Comparison
          </DialogTitle>
        </DialogHeader>

        {products.length < 2 ? (
          <p className="text-center text-gray-500">
            Please select at least two products to compare.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">
                    Feature
                  </th>
                  {products.map((product) => (
                    <th
                      key={product.id}
                      className="border border-gray-300 p-2 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-20 w-20 object-contain mb-2"
                        />
                        <span className="font-semibold">{product.name}</span>
                        <span className="text-sm text-gray-500">
                          {product.category}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">
                    Price
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="border border-gray-300 p-2 text-center">
                      ${product.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">
                    Stock
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="border border-gray-300 p-2 text-center">
                      {product.stock} units
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">
                    Applications
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="border border-gray-300 p-2 text-center">
                      {product.detailedDescription.applications?.join(", ") || "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">
                    Specifications
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="border border-gray-300 p-2 text-center">
                      {product.detailedDescription.specifications?.join(", ") || "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">
                    Features
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="border border-gray-300 p-2 text-center">
                      {product.detailedDescription.features?.join(", ") || "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="destructive" onClick={onClearComparison}>
            Clear Comparison
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductComparison;

