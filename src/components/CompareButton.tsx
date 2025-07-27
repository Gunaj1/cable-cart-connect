import React from 'react';
import { Scale, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useComparison } from '@/contexts/ComparisonContext';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  stock: number;
  detailedDescription?: {
    applications: string[];
    specifications: string[];
    features: string[];
  };
}

interface CompareButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

const CompareButton: React.FC<CompareButtonProps> = ({ product, size = 'md' }) => {
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison();
  
  const isComparing = isInComparison(product.id);
  const isDisabled = !canAddMore && !isComparing;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isComparing) {
      removeFromComparison(product.id);
    } else if (canAddMore) {
      addToComparison(product);
      // Add a subtle shake animation to draw attention
      e.currentTarget.classList.add('animate-shake-attention');
      setTimeout(() => {
        e.currentTarget.classList.remove('animate-shake-attention');
      }, 500);
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "relative overflow-hidden rounded-full flex items-center justify-center font-semibold transition-all duration-300 group",
        sizeClasses[size],
        isComparing
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-blue-700 transform hover:scale-110 animate-electric-pulse"
          : isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
          : "bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transform hover:scale-110 shadow-md hover:shadow-lg animate-bounce-in"
      )}
      title={
        isComparing 
          ? "Remove from comparison" 
          : isDisabled 
          ? "Maximum 3 products can be compared" 
          : "Add to comparison"
      }
    >
      <div className="relative z-10">
        {isComparing ? (
          <Check className={cn(iconSizes[size], "animate-scale-in")} />
        ) : (
          <Scale className={cn(iconSizes[size], "group-hover:animate-pulse")} />
        )}
      </div>
      
      {/* Ripple effect */}
      <div className={cn(
        "absolute inset-0 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 opacity-20",
        isComparing && "bg-blue-300"
      )} />
      
      {/* Glow effect for active state */}
      {isComparing && (
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse-glow opacity-30" />
      )}
    </button>
  );
};

export default CompareButton;