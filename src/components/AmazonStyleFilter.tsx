import React, { useState, useEffect } from 'react';
import { Filter, X, Search, ChevronDown, ChevronUp, Star, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface AmazonStyleFilterProps {
  products: any[];
  onFilterChange: (filters: any) => void;
  className?: string;
}

const AmazonStyleFilter: React.FC<AmazonStyleFilterProps> = ({ 
  products, 
  onFilterChange, 
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    rating: [],
    availability: []
  });
  const [sortOption, setSortOption] = useState('relevance');
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    availability: true
  });

  // Extract filter options from products
  const filterOptions = {
    categories: Array.from(new Set(products.map(p => p.category))).map(cat => ({
      id: cat,
      label: cat,
      count: products.filter(p => p.category === cat).length
    })),
    availability: [
      { id: 'in-stock', label: 'In Stock', count: products.filter(p => p.stock > 5).length },
      { id: 'low-stock', label: 'Low Stock (≤5)', count: products.filter(p => p.stock <= 5 && p.stock > 0).length },
      { id: 'out-of-stock', label: 'Out of Stock', count: products.filter(p => p.stock === 0).length }
    ],
    rating: [
      { id: '4-plus', label: '4★ & Up', count: Math.floor(products.length * 0.9) },
      { id: '3-plus', label: '3★ & Up', count: Math.floor(products.length * 0.95) },
      { id: '2-plus', label: '2★ & Up', count: products.length }
    ]
  };

  const priceRange = [
    Math.min(...products.map(p => p.price || 0)),
    Math.max(...products.map(p => p.price || 1000))
  ];

  const handleMultiSelectChange = (filterType: string, optionId: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(optionId)
        ? prev[filterType].filter(id => id !== optionId)
        : [...prev[filterType], optionId]
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const applyFilters = () => {
    onFilterChange({ ...filters, sortOption });
  };

  const resetFilters = () => {
    const emptyFilters = {
      categories: [],
      priceRange: [priceRange[0], priceRange[1]],
      rating: [],
      availability: []
    };
    setFilters(emptyFilters);
    setSortOption('relevance');
    onFilterChange({ ...emptyFilters, sortOption: 'relevance' });
  };

  const getActiveFilterCount = () => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === 'priceRange') {
        return count + (value[0] !== priceRange[0] || value[1] !== priceRange[1] ? 1 : 0);
      }
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return count;
    }, 0);
  };

  // Apply filters automatically
  useEffect(() => {
    applyFilters();
  }, [filters, sortOption]);

  const activeFilterCount = getActiveFilterCount();

  const FilterSection = ({ 
    title, 
    options, 
    filterType, 
    sectionKey
  }: {
    title: string;
    options: FilterOption[];
    filterType: string;
    sectionKey: string;
  }) => {
    const filteredOptions = options;

    return (
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          {expandedSections[sectionKey] ? 
            <ChevronUp className="w-4 h-4 text-gray-500" /> : 
            <ChevronDown className="w-4 h-4 text-gray-500" />
          }
        </button>
        
        {expandedSections[sectionKey] && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {filteredOptions.slice(0, 8).map(option => (
              <label
                key={option.id}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors text-sm"
              >
                <Checkbox
                  checked={filters[filterType].includes(option.id)}
                  onCheckedChange={() => handleMultiSelectChange(filterType, option.id)}
                  className="h-4 w-4"
                />
                <span className="text-gray-700 flex-1">{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-xs text-gray-500">({option.count})</span>
                )}
              </label>
            ))}
            {filteredOptions.length > 8 && (
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                + {filteredOptions.length - 8} more
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const RatingSection = () => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection('rating')}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-semibold text-gray-900 text-sm">Customer Ratings</h3>
        {expandedSections['rating'] ? 
          <ChevronUp className="w-4 h-4 text-gray-500" /> : 
          <ChevronDown className="w-4 h-4 text-gray-500" />
        }
      </button>
      
      {expandedSections['rating'] && (
        <div className="mt-3 space-y-2">
          {filterOptions.rating.map(option => (
            <label
              key={option.id}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors text-sm"
            >
              <Checkbox
                checked={filters.rating.includes(option.id)}
                onCheckedChange={() => handleMultiSelectChange('rating', option.id)}
                className="h-4 w-4"
              />
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-700">{option.label}</span>
              </div>
              <span className="text-xs text-gray-500 ml-auto">({option.count})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const PriceSection = () => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection('price')}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-semibold text-gray-900 text-sm">Price Range</h3>
        {expandedSections['price'] ? 
          <ChevronUp className="w-4 h-4 text-gray-500" /> : 
          <ChevronDown className="w-4 h-4 text-gray-500" />
        }
      </button>
      
      {expandedSections['price'] && (
        <div className="mt-3 space-y-3">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={priceRange[1]}
              min={priceRange[0]}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Filter Toggle Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-10 px-3 border-2 transition-all duration-300",
          "hover:border-blue-300 hover:bg-blue-50",
          isOpen && "border-blue-400 bg-blue-50",
          activeFilterCount > 0 && "border-blue-500 bg-blue-100",
          className
        )}
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Filters</span>
        {activeFilterCount > 0 && (
          <Badge 
            variant="secondary" 
            className="ml-2 h-5 min-w-[20px] px-1 text-xs bg-blue-600 text-white"
          >
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {/* Sidebar Filter Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col border-r border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters & Sort
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Sort Options */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Sort By</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            {/* Search in Filters */}

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Categories */}
              <FilterSection
                title="Categories"
                options={filterOptions.categories}
                filterType="categories"
                sectionKey="categories"
              />

              {/* Price Range */}
              <PriceSection />

              {/* Customer Ratings */}
              <RatingSection />

              {/* Availability */}
              <FilterSection
                title="Availability"
                options={filterOptions.availability}
                filterType="availability"
                sectionKey="availability"
              />

            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex-1 text-sm"
                  disabled={activeFilterCount === 0}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset All
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([filterType, values]) => {
            if (filterType === 'priceRange') {
              if (values[0] !== priceRange[0] || values[1] !== priceRange[1]) {
                return (
                  <Badge key={filterType} variant="secondary" className="bg-blue-100 text-blue-800">
                    Price: ${values[0]} - ${values[1]}
                    <button
                      onClick={() => handlePriceRangeChange([priceRange[0], priceRange[1]])}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              }
              return null;
            }
            
            if (Array.isArray(values) && values.length > 0) {
              return values.map(value => {
                const option = filterOptions[filterType as keyof typeof filterOptions]?.find(opt => opt.id === value);
                return (
                  <Badge key={`${filterType}-${value}`} variant="secondary" className="bg-blue-100 text-blue-800">
                    {option?.label || value}
                    <button
                      onClick={() => handleMultiSelectChange(filterType, value)}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              });
            }
            return null;
          })}
        </div>
      )}
    </>
  );
};

export default AmazonStyleFilter;