import React, { useState } from 'react';
import { ShoppingCart, Eye, Heart, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useComparison } from '@/contexts/ComparisonContext';
import { Product } from '@/types/Product';
import { getProductDetails } from '@/data/productImages';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  className
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison();
  
  const isInCompare = isInComparison(product.id);

  const handleImageError = () => {
    setImageError(true);
    console.log(`Image improvement needed: ${product.name} (${product.image})`);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare) {
      removeFromComparison(product.id);
    } else if (canAddMore) {
      addToComparison(product);
    }
  };

  // Uniform badges for all products
  const uniformBadges = [
    'Customization Available',
    'Fluke Test Passed', 
    'DCM Tested',
    'OEM Supplier'
  ];

  // Extract variants from specifications
  const variants = product.detailedDescription?.specifications || [];

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-lg border border-border overflow-hidden",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "h-full flex flex-col cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">CC</span>
              </div>
              <p className="text-xs">Chhajer Cable</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/* Hover Actions - Desktop */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center gap-2",
          "opacity-0 transition-opacity duration-300",
          "hidden md:flex",
          isHovered && "opacity-100"
        )}>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-white/90 text-foreground hover:bg-white"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Quick Add
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white/90 text-foreground hover:bg-white"
          >
            <Eye className="w-4 h-4 mr-1" />
            Quick View
          </Button>
        </div>

        {/* Compare & Wishlist - Top Right */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "w-8 h-8 bg-white/90 hover:bg-white",
              isInCompare && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={handleCompareToggle}
            disabled={!isInCompare && !canAddMore}
          >
            {isInCompare ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-white/90 hover:bg-white"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Stock Badge */}
        {product.stock < 10 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Low Stock
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Uniform Badges */}
        <div className="flex flex-wrap gap-1 mb-2">
          {uniformBadges.slice(0, 2).map((badge, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {getProductDetails(product.id).description.substring(0, 120)}...
        </p>

        {/* Variants Preview */}
        {variants.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {variants.slice(0, 3).map((variant, index) => (
              <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                {variant}
              </span>
            ))}
          </div>
        )}

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>★★★★☆</span>
            <span className="ml-1">(4.2)</span>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;