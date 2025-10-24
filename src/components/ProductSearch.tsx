import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Cable, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductDetails } from '@/data/productImages';

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

interface ProductSearchProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  className?: string;
  onFilterClick?: () => void;
  showFilterButton?: boolean;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ products, onProductSelect, className, onFilterClick, showFilterButton = false }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query
  const filteredProducts = query.trim() 
    ? products.filter(product => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.detailedDescription?.applications.some(app => 
            app.toLowerCase().includes(searchTerm)
          ) ||
          product.detailedDescription?.specifications.some(spec => 
            spec.toLowerCase().includes(searchTerm)
          )
        );
      }).slice(0, 8) // Limit to 8 results
    : [];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredProducts.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < filteredProducts.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredProducts.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && filteredProducts[focusedIndex]) {
          handleProductSelect(filteredProducts[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
    setQuery('');
    setIsOpen(false);
    setFocusedIndex(-1);
    inputRef.current?.blur();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset focused index when query changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [query]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && resultsRef.current) {
      const focusedElement = resultsRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex]);

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, specs, categories..."
          className={cn(
            "w-full pl-10 py-3 rounded-xl border-2 border-gray-200",
            "bg-white text-gray-900 placeholder-gray-500",
            "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
            "transition-all duration-300 shadow-lg hover:shadow-xl",
            "text-sm md:text-base",
            showFilterButton ? "pr-20" : "pr-10"
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                setFocusedIndex(-1);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {showFilterButton && (
            <button
              onClick={onFilterClick}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-blue-50 border-l border-gray-200 ml-1 pl-3"
              title="Toggle filters"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div ref={resultsRef} className="py-2">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition-all duration-200 flex items-center space-x-3",
                    "hover:bg-blue-50 border-b border-gray-100 last:border-b-0",
                    focusedIndex === index && "bg-blue-50 border-blue-200"
                  )}
                >
                  {/* Product Image */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center"><Cable class="w-6 h-6 text-gray-400" /></div>`;
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate text-sm">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {product.category}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {getProductDetails(product.id).description}
                    </p>
                    {product.stock <= 5 && (
                      <span className="text-xs text-orange-500 font-medium">
                        {product.stock > 0 ? `Only ${product.stock} left` : 'Out of stock'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No products found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching for cables, specifications, or categories
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;