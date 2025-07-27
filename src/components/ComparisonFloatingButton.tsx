import React, { useState, useEffect } from 'react';
import { Scale, Eye, X, Cable } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useComparison } from '@/contexts/ComparisonContext';

interface ComparisonFloatingButtonProps {
  onOpenComparison: () => void;
}

const ComparisonFloatingButton: React.FC<ComparisonFloatingButtonProps> = ({ onOpenComparison }) => {
  const { comparisonProducts, clearComparison } = useComparison();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    if (comparisonProducts.length > 0) {
      setIsVisible(true);
      setShouldPulse(true);
      // Remove pulse effect after animation
      const timer = setTimeout(() => setShouldPulse(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [comparisonProducts.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className={cn(
        "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl shadow-blue-500/25 p-4 transform transition-all duration-500",
        "hover:shadow-blue-500/40 hover:scale-105 animate-bounce-in",
        shouldPulse && "animate-electric-pulse"
      )}>
        <div className="flex items-center space-x-4">
          {/* Product count indicator */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Cable className="w-6 h-6" />
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
          <div className="flex -space-x-2">
            {comparisonProducts.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "w-8 h-8 bg-white rounded-full border-2 border-blue-500 overflow-hidden transform transition-all duration-300",
                  "hover:scale-110"
                )}
                style={{ zIndex: 10 - index }}
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
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenComparison}
              disabled={comparisonProducts.length < 2}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2",
                comparisonProducts.length >= 2
                  ? "bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 shadow-lg animate-bounce-in"
                  : "bg-white/50 text-blue-300 cursor-not-allowed opacity-50"
              )}
              title={comparisonProducts.length < 2 ? "Add at least 2 products to compare" : "Open comparison view"}
            >
              <Eye className="w-4 h-4" />
              <span>Compare</span>
            </button>
            
            <button
              onClick={clearComparison}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-3 bg-white/20 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 rounded-full"
            style={{ width: `${(comparisonProducts.length / 3) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Floating animation indicator */}
      <div className="absolute inset-0 bg-blue-500 rounded-2xl animate-ping opacity-20" />
      
      {/* Cable connection effect */}
      {comparisonProducts.length >= 2 && (
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
      )}
    </div>
  );
};

export default ComparisonFloatingButton;