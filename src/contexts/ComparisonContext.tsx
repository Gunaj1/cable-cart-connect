import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/Product';

interface ComparisonContextType {
  comparisonProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
  children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  const addToComparison = (product: Product) => {
    setComparisonProducts(prev => {
      if (prev.length >= 3 || prev.some(p => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonProducts([]);
  };

  const isInComparison = (productId: string) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  const canAddMore = comparisonProducts.length < 3;

  return (
    <ComparisonContext.Provider value={{
      comparisonProducts,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      canAddMore
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};