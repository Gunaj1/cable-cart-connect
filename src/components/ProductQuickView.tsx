import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingCart, Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/Product';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onViewDetails
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const handleImageError = () => {
    setImageError(true);
    console.log(`Image improvement needed: ${product.name} (${product.image})`);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  // Extract variant options from specifications
  const variantOptions = React.useMemo(() => {
    const specs = product.detailedDescription?.specifications || [];
    const options: Record<string, string[]> = {};
    
    // Example: extract shield types, gauges, etc.
    specs.forEach(spec => {
      if (spec.toLowerCase().includes('shield')) {
        options.shield = ['UTP', 'FTP', 'STP'];
      }
      if (spec.toLowerCase().includes('gauge')) {
        options.gauge = ['23AWG', '24AWG', '25AWG', '26AWG'];
      }
      if (spec.toLowerCase().includes('length')) {
        options.length = ['1m', '2m', '3m', '5m', '10m'];
      }
    });
    
    return options;
  }, [product.detailedDescription?.specifications]);

  // Feature highlights
  const highlights = product.detailedDescription?.features?.slice(0, 3) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Quick View</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-muted/50">
                <div className="text-center text-muted-foreground">
                  <div className="w-24 h-24 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">CC</span>
                  </div>
                  <p className="text-sm">Chhajer Cable Industry</p>
                </div>
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Product Name */}
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

            {/* Price */}
            <div className="text-3xl font-bold text-primary mb-4">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selectors */}
            {Object.entries(variantOptions).map(([key, options]) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium mb-2 capitalize">
                  {key}
                </label>
                <div className="flex flex-wrap gap-2">
                  {options.map(option => (
                    <Button
                      key={option}
                      variant={selectedVariants[key] === option ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedVariants(prev => ({ ...prev, [key]: option }))}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {product.stock} units available
              </p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {highlights.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onViewDetails(product);
                  onClose();
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;