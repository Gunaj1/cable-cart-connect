import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Eye, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useComparison } from '@/contexts/ComparisonContext';
import { Product } from '@/types/Product';

interface ProductCompareDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onViewFullComparison: () => void;
  children?: React.ReactNode;
}

const ProductCompareDrawer: React.FC<ProductCompareDrawerProps> = ({
  isOpen,
  onOpenChange,
  onViewFullComparison,
  children
}) => {
  const { comparisonProducts, removeFromComparison, clearComparison } = useComparison();

  const handleImageError = (product: Product) => {
    console.log(`Image improvement needed: ${product.name} (${product.image})`);
  };

  if (comparisonProducts.length === 0) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      
      <SheetContent side="bottom" className="h-[400px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-lg font-bold">
            Compare Products ({comparisonProducts.length}/3)
          </SheetTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
            <Button size="sm" onClick={onViewFullComparison}>
              <Eye className="w-4 h-4 mr-1" />
              View Full Comparison
            </Button>
          </div>
        </SheetHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {comparisonProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border rounded-lg p-4 relative"
            >
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 w-6 h-6"
                onClick={() => removeFromComparison(product.id)}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Product Image */}
              <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={() => handleImageError(product)}
                />
              </div>

              {/* Product Info */}
              <h4 className="font-medium text-sm line-clamp-2 mb-2">
                {product.name}
              </h4>
              
              <div className="text-lg font-bold text-primary mb-2">
                ${product.price.toFixed(2)}
              </div>

              {/* Key Specs Preview */}
              <div className="space-y-1">
                {product.detailedDescription?.specifications?.slice(0, 2).map((spec, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    {spec}
                  </div>
                ))}
              </div>

              {/* Stock Status */}
              <Badge 
                variant={product.stock > 10 ? "secondary" : "destructive"} 
                className="mt-2 text-xs"
              >
                {product.stock > 10 ? "In Stock" : `${product.stock} left`}
              </Badge>
            </div>
          ))}

          {/* Add More Placeholder */}
          {comparisonProducts.length < 3 && (
            <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl">+</span>
                </div>
                <p className="text-sm">Add another product to compare</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button 
            className="w-full" 
            size="lg"
            onClick={onViewFullComparison}
            disabled={comparisonProducts.length < 2}
          >
            Compare {comparisonProducts.length} Products
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductCompareDrawer;