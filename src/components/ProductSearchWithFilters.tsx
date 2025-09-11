import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Cable, Filter, ChevronDown, ChevronUp } from 'lucide-react';
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

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface ProductSearchWithFiltersProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  className?: string;
}

const ProductSearchWithFilters: React.FC<ProductSearchWithFiltersProps> = ({ 
  products, 
  onProductSelect, 
  className 
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    priceRange: '',
    availability: '',
    type: ''
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Extract filter options from products
  const filterOptions = {
    category: Array.from(new Set(products.map(p => p.category))).map(cat => ({
      id: cat,
      label: cat,
      count: products.filter(p => p.category === cat).length
    })),
    priceRange: [
      { id: '0-50', label: '$0 - $50', count: products.filter(p => p.price <= 50).length },
      { id: '50-100', label: '$50 - $100', count: products.filter(p => p.price > 50 && p.price <= 100).length },
      { id: '100-200', label: '$100 - $200', count: products.filter(p => p.price > 100 && p.price <= 200).length },
      { id: '200+', label: '$200+', count: products.filter(p => p.price > 200).length }
    ],
    availability: [
      { id: 'in-stock', label: 'In Stock', count: products.filter(p => p.stock > 0).length },
      { id: 'low-stock', label: 'Low Stock', count: products.filter(p => p.stock <= 5 && p.stock > 0).length },
      { id: 'out-of-stock', label: 'Out of Stock', count: products.filter(p => p.stock === 0).length }
    ],
    type: [
      { id: 'cat6', label: 'CAT 6', count: products.filter(p => p.name.toLowerCase().includes('cat 6') || p.name.toLowerCase().includes('cat6')).length },
      { id: 'cat5e', label: 'CAT 5e', count: products.filter(p => p.name.toLowerCase().includes('cat 5e') || p.name.toLowerCase().includes('cat5e')).length },
      { id: 'utp', label: 'UTP', count: products.filter(p => p.name.toLowerCase().includes('utp')).length },
      { id: 'stp', label: 'STP', count: products.filter(p => p.name.toLowerCase().includes('stp')).length },
      { id: 'ftp', label: 'FTP', count: products.filter(p => p.name.toLowerCase().includes('ftp')).length }
    ]
  };

  // Filter products based on search query and selected filters
  const filteredProducts = products.filter(product => {
    // Text search
    const searchTerm = query.toLowerCase();
    const matchesSearch = !query.trim() || (
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

    // Category filter
    const matchesCategory = !selectedFilters.category || product.category === selectedFilters.category;

    // Price range filter
    const matchesPriceRange = !selectedFilters.priceRange || (() => {
      switch (selectedFilters.priceRange) {
        case '0-50': return product.price <= 50;
        case '50-100': return product.price > 50 && product.price <= 100;
        case '100-200': return product.price > 100 && product.price <= 200;
        case '200+': return product.price > 200;
        default: return true;
      }
    })();

    // Availability filter
    const matchesAvailability = !selectedFilters.availability || (() => {
      switch (selectedFilters.availability) {
        case 'in-stock': return product.stock > 0;
        case 'low-stock': return product.stock <= 5 && product.stock > 0;
        case 'out-of-stock': return product.stock === 0;
        default: return true;
      }
    })();

    // Type filter
    const matchesType = !selectedFilters.type || (() => {
      const productName = product.name.toLowerCase();
      switch (selectedFilters.type) {
        case 'cat6': return productName.includes('cat 6') || productName.includes('cat6');
        case 'cat5e': return productName.includes('cat 5e') || productName.includes('cat5e');
        case 'utp': return productName.includes('utp');
        case 'stp': return productName.includes('stp');
        case 'ftp': return productName.includes('ftp');
        default: return true;
      }
    })();

    return matchesSearch && matchesCategory && matchesPriceRange && matchesAvailability && matchesType;
  }).slice(0, 8); // Limit to 8 results

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: '',
      priceRange: '',
      availability: '',
      type: ''
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(filter => filter !== '');

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
        setShowFilters(false);
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
        setShowFilters(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset focused index when query changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [query, selectedFilters]);

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
      {/* Search Input with Filter Button */}
      <div className="relative">
        <div className="flex">
          <div className="relative flex-1">
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
              onFocus={() => {
                if (query.trim() || hasActiveFilters) setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search products, specs, categories..."
              className={cn(
                "w-full pl-10 pr-10 py-3 rounded-l-xl border-2 border-gray-200",
                "bg-white text-gray-900 placeholder-gray-500",
                "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
                "transition-all duration-300 shadow-lg hover:shadow-xl",
                "text-sm md:text-base"
              )}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                  setFocusedIndex(-1);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "rounded-l-none rounded-r-xl border-l-0 border-2 border-gray-200 px-4",
              "hover:bg-blue-50 hover:border-blue-300",
              showFilters && "bg-blue-50 border-blue-300",
              hasActiveFilters && "bg-blue-100 border-blue-400"
            )}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                {Object.values(selectedFilters).filter(v => v !== '').length}
              </Badge>
            )}
            {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Category</h4>
              <div className="space-y-1">
                {filterOptions.category.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterChange('category', option.id)}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded text-sm transition-colors",
                      selectedFilters.category === option.id
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Price Range</h4>
              <div className="space-y-1">
                {filterOptions.priceRange.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterChange('priceRange', option.id)}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded text-sm transition-colors",
                      selectedFilters.priceRange === option.id
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Cable Type</h4>
              <div className="space-y-1">
                {filterOptions.type.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterChange('type', option.id)}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded text-sm transition-colors",
                      selectedFilters.type === option.id
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Availability</h4>
              <div className="space-y-1">
                {filterOptions.availability.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterChange('availability', option.id)}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded text-sm transition-colors",
                      selectedFilters.availability === option.id
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || hasActiveFilters) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-40 max-h-96 overflow-y-auto">
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
              <p className="text-sm">No products found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearchWithFilters;