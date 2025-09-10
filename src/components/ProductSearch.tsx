import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Cable, Filter, SlidersHorizontal, DollarSign, Zap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductDetails } from '@/data/productImages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
}

interface FilterState {
  priceRange: 'all' | 'under-50' | '50-100' | 'over-100';
  category: string;
  specifications: string[];
  features: string[];
}

const ProductSearch: React.FC<ProductSearchProps> = ({ products, onProductSelect, className }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    priceRange: 'all',
    category: 'all',
    specifications: [],
    features: []
  });

  // Filter products based on search query and filters
  const filteredProducts = query.trim() 
    ? products.filter(product => {
        const searchTerm = query.toLowerCase();
        
        // Text search
        const matchesSearch = (
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
        
        if (!matchesSearch) return false;
        
        // Price filter
        const matchesPrice = (() => {
          switch (filters.priceRange) {
            case 'under-50': return product.price < 50;
            case '50-100': return product.price >= 50 && product.price <= 100;
            case 'over-100': return product.price > 100;
            default: return true;
          }
        })();
        
        // Category filter
        const matchesCategory = filters.category === 'all' || 
          product.category.toLowerCase().includes(filters.category.toLowerCase());
        
        return matchesPrice && matchesCategory;
      }).slice(0, 8) // Limit to 8 results
    : [];

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: 'all',
      category: 'all',
      specifications: [],
      features: []
    });
  };

  const hasActiveFilters = filters.priceRange !== 'all' || 
    filters.category !== 'all' || 
    filters.specifications.length > 0 || 
    filters.features.length > 0;

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
      {/* Search Input with Filters */}
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
            "w-full pl-10 pr-20 py-3 rounded-xl border-2 border-gray-200",
            "bg-white text-gray-900 placeholder-gray-500",
            "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
            "transition-all duration-300 shadow-lg hover:shadow-xl",
            "text-sm md:text-base"
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-1 h-8 w-8",
              (showFilters || hasActiveFilters) && "bg-blue-100 text-blue-600"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                setFocusedIndex(-1);
              }}
              className="p-1 h-8 w-8 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h4>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => updateFilter('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="under-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="over-100">Over $100</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Cable className="w-4 h-4 inline mr-1" />
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="patchcords">Patchcords</option>
                <option value="cat6-lan-cables">CAT 6 LAN Cables</option>
                <option value="cat5e-lan-cables">CAT 5e LAN Cables</option>
                <option value="cctv-cables">CCTV Cables</option>
                <option value="computer-cords">Computer Cords</option>
                <option value="specialty-cables">Specialty Cables</option>
              </select>
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Settings className="w-4 h-4 inline mr-1" />
                Key Features
              </label>
              <div className="flex flex-wrap gap-1">
                {['OEM Supplier', 'Fluke Tested', 'DCM Tested', 'Customizable', 'Weather Proof'].map((feature) => (
                  <Badge
                    key={feature}
                    variant={filters.features.includes(feature) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      const newFeatures = filters.features.includes(feature)
                        ? filters.features.filter(f => f !== feature)
                        : [...filters.features, feature];
                      updateFilter('features', newFeatures);
                    }}
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.priceRange !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              Price: {filters.priceRange}
              <button
                onClick={() => updateFilter('priceRange', 'all')}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.category !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {filters.category}
              <button
                onClick={() => updateFilter('category', 'all')}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
              <button
                onClick={() => updateFilter('features', filters.features.filter(f => f !== feature))}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}

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
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 truncate text-sm">
                        {product.name}
                      </h4>
                      <span className="font-bold text-blue-600 text-sm ml-2">
                        ${product.price}
                      </span>
                    </div>
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