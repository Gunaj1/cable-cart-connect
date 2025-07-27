import React, { useState, useEffect } from 'react';
import { Scale, Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useComparison } from '@/contexts/ComparisonContext';

interface ComparisonFloatingButtonProps {
  onOpenComparison: () => void;
}

const ComparisonFloatingButton: React.FC<ComparisonFloatingButtonProps> = ({ onOpenComparison }) => {
  const { comparisonProducts, clearComparison } = useComparison();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (comparisonProducts.length > 0) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow for smooth exit animation
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [comparisonProducts.length]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-40 transition-all duration-500 transform",
      comparisonProducts.length > 0 
        ? "translate-y-0 opacity-100 scale-100" 
        : "translate-y-4 opacity-0 scale-95"
    )}>
      <div className={cn(
        "bg-gradient-to-r from-blue-600 via-blue-700 to-gray-600 text-white rounded-2xl shadow-2xl shadow-blue-500/25 p-4 transform transition-all duration-500",
        "hover:shadow-blue-500/40 hover:scale-105 relative overflow-hidden"
      )}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-white/10 to-blue-400/20 animate-pulse-travel opacity-50"></div>
        
        <div className="flex items-center space-x-4">
          {/* Product count indicator */}
          <div className="flex items-center space-x-3 relative z-10">
            <div className="relative">
              <Scale className="w-6 h-6 animate-pulse" />
              <div className="absolute -top-2 -right-2 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-bounce">
                {comparisonProducts.length}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Compare Products</div>
              <div className="text-xs text-blue-200">
                {comparisonProducts.length} selected
              </div>
            </div>
          </div>

          {/* Product images preview */}
          <div className="flex -space-x-2 relative z-10">
            {comparisonProducts.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "w-8 h-8 bg-white rounded-full border-2 border-blue-500 overflow-hidden transform transition-all duration-500",
                  "hover:scale-110 animate-fade-in"
                )}
                style={{ 
                  zIndex: 10 - index,
                  animationDelay: `${index * 200}ms`
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 relative z-10">
            <button
              onClick={onOpenComparison}
              disabled={comparisonProducts.length < 2}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold transition-all duration-500 flex items-center space-x-2 relative overflow-hidden",
                comparisonProducts.length >= 2
                  ? "bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  : "bg-white/50 text-blue-300 cursor-not-allowed"
              )}
            >
              {comparisonProducts.length >= 2 && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              )}
              <Eye className="w-4 h-4" />
              <span className="relative z-10">Compare</span>
            </button>
            
            <button
              onClick={clearComparison}
              className="p-2 rounded-lg bg-white/20 hover:bg-red-500 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110 group"
              title="Clear comparison"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-3 bg-white/20 rounded-full h-1 overflow-hidden relative z-10">
          <div 
            className="h-full bg-gradient-to-r from-white via-blue-200 to-white transition-all duration-700 rounded-full relative overflow-hidden"
            style={{ width: `${(comparisonProducts.length / 3) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse-travel"></div>
          </div>
        </div>
      </div>
      
      {/* Floating animation indicator */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl animate-ping opacity-20" />
    </div>
  );
};

export default ComparisonFloatingButton;