import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/Product';

interface CompareTableProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onClearComparison: () => void;
}

const CompareTable: React.FC<CompareTableProps> = ({
  products,
  isOpen,
  onClose,
  onAddToCart,
  onClearComparison
}) => {
  const handleImageError = (product: Product) => {
    console.log(`Image improvement needed: ${product.name} (${product.image})`);
  };

  // Extract all unique specification keys
  const allSpecKeys = React.useMemo(() => {
    const keys = new Set<string>();
    products.forEach(product => {
      product.detailedDescription?.specifications?.forEach(spec => {
        // Try to extract key-value pairs from specifications
        if (typeof spec === 'string' && spec.includes(':')) {
          const [key] = spec.split(':');
          keys.add(key.trim());
        }
      });
    });
    return Array.from(keys);
  }, [products]);

  const getSpecValue = (product: Product, key: string) => {
    const specs = product.detailedDescription?.specifications || [];
    const spec = specs.find(s => 
      typeof s === 'string' && s.toLowerCase().includes(key.toLowerCase())
    );
    return spec ? spec.split(':')[1]?.trim() || '-' : '-';
  };

  if (!isOpen || products.length < 2) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">
            Product Comparison ({products.length} products)
          </DialogTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClearComparison}>
              Clear All
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 w-48 bg-muted/30">Feature</th>
                {products.map((product, index) => (
                  <th key={product.id} className="p-4 text-center min-w-64">
                    <div className="flex flex-col items-center space-y-3">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-muted/30 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          onError={() => handleImageError(product)}
                        />
                      </div>
                      
                      {/* Product Name */}
                      <h3 className="font-semibold text-sm line-clamp-2 text-center">
                        {product.name}
                      </h3>
                      
                      {/* Category */}
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Price Row */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium bg-muted/30">Price</td>
                {products.map((product) => (
                  <td key={`${product.id}-price`} className="p-4 text-center">
                    <span className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Stock Row */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium bg-muted/30">Stock</td>
                {products.map((product) => (
                  <td key={`${product.id}-stock`} className="p-4 text-center">
                    <Badge variant={product.stock > 10 ? "secondary" : "destructive"}>
                      {product.stock > 10 ? "In Stock" : `${product.stock} left`}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Applications Row */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium bg-muted/30">Applications</td>
                {products.map((product) => (
                  <td key={`${product.id}-applications`} className="p-4 text-center">
                    <div className="space-y-1">
                      {product.detailedDescription?.applications?.slice(0, 3).map((app, index) => (
                        <div key={index} className="text-sm bg-muted/50 px-2 py-1 rounded">
                          {app}
                        </div>
                      )) || <span className="text-muted-foreground">-</span>}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Features Row */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium bg-muted/30">Key Features</td>
                {products.map((product) => (
                  <td key={`${product.id}-features`} className="p-4 text-center">
                    <div className="space-y-1">
                      {product.detailedDescription?.features?.slice(0, 3).map((feature, index) => (
                        <div key={index} className="text-sm text-left">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block mr-2" />
                          {feature}
                        </div>
                      )) || <span className="text-muted-foreground">-</span>}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Specification Rows */}
              {allSpecKeys.map((specKey) => (
                <tr key={specKey} className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium bg-muted/30 capitalize">{specKey}</td>
                  {products.map((product) => {
                    const value = getSpecValue(product, specKey);
                    const isDifferent = products.some(p => getSpecValue(p, specKey) !== value);
                    
                    return (
                      <td key={`${product.id}-${specKey}`} className="p-4 text-center">
                        <span className={cn(
                          "px-2 py-1 rounded text-sm",
                          isDifferent && value !== '-' && "bg-yellow-100 dark:bg-yellow-900/30"
                        )}>
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Add to Cart Row */}
              <tr className="border-b bg-muted/10">
                <td className="p-4 font-medium bg-muted/30">Actions</td>
                {products.map((product) => (
                  <td key={`${product.id}-actions`} className="p-4 text-center">
                    <Button
                      onClick={() => onAddToCart(product)}
                      className="w-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareTable;