import React, { useState, useRef, useEffect } from 'react';
import { Filter, X, Search, ChevronDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface AdvancedFilterProps {
  products: any[];
  onFilterChange: (filters: any) => void;
  className?: string;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ 
  products, 
  onFilterChange, 
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    specifications: [],
    applications: [],
    features: [],
    availability: []
  });
  const [filterSearch, setFilterSearch] = useState('');
  
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Extract filter options from products
  const filterOptions = {
    categories: Array.from(new Set(products.map(p => p.category))).map(cat => ({
      id: cat,
      label: cat,
      count: products.filter(p => p.category === cat).length
    })),
    specifications: Array.from(new Set(
      products.flatMap(p => p.specifications ? Object.keys(p.specifications) : [])
    )).map(spec => ({
      id: spec,
      label: spec.charAt(0).toUpperCase() + spec.slice(1),
      count: products.filter(p => p.specifications && p.specifications[spec]).length
    })),
    applications: Array.from(new Set(
      products.flatMap(p => p.applications || [])
    )).map(app => ({
      id: app,
      label: app,
      count: products.filter(p => p.applications && p.applications.includes(app)).length
    })),
    features: Array.from(new Set(
      products.flatMap(p => p.features || [])
    )).map(feature => ({
      id: feature,
      label: feature,
      count: products.filter(p => p.features && p.features.includes(feature)).length
    })),
    availability: [
      { id: 'in-stock', label: 'In Stock', count: products.filter(p => p.stock > 5).length },
      { id: 'low-stock', label: 'Low Stock (≤5)', count: products.filter(p => p.stock <= 5 && p.stock > 0).length },
      { id: 'out-of-stock', label: 'Out of Stock', count: products.filter(p => p.stock === 0).length }
    ]
  };

  const handleMultiSelectChange = (filterType: string, optionId: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(optionId)
        ? prev[filterType].filter(id => id !== optionId)
        : [...prev[filterType], optionId]
    }));
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters = {
      categories: [],
      priceRange: { min: '', max: '' },
      specifications: [],
      applications: [],
      features: [],
      availability: []
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, filterValue) => {
      if (Array.isArray(filterValue)) {
        return count + filterValue.length;
      }
      if (typeof filterValue === 'object' && filterValue !== null) {
        return count + Object.values(filterValue).filter(v => v !== '').length;
      }
      return count;
    }, 0);
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFilterCount = getActiveFilterCount();

  const FilterSection = ({ title, options, filterType, isMultiSelect = true }: {
    title: string;
    options: FilterOption[];
    filterType: string;
    isMultiSelect?: boolean;
  }) => {
    const filteredOptions = options.filter(option =>
      filterSearch === '' || option.label.toLowerCase().includes(filterSearch.toLowerCase())
    );

    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {filteredOptions.map(option => (
            <label
              key={option.id}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
            >
              <Checkbox
                checked={filters[filterType].includes(option.id)}
                onCheckedChange={() => handleMultiSelectChange(filterType, option.id)}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700 flex-1">{option.label}</span>
              {option.count !== undefined && (
                <span className="text-xs text-gray-500">({option.count})</span>
              )}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        ref={buttonRef}
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-10 px-3 border-2 transition-all duration-300",
          "hover:border-blue-300 hover:bg-blue-50",
          isOpen && "border-blue-400 bg-blue-50",
          activeFilterCount > 0 && "border-blue-500 bg-blue-100"
        )}
      >
        <Filter className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Filters</span>
        {activeFilterCount > 0 && (
          <Badge 
            variant="secondary" 
            className="ml-2 h-5 min-w-[20px] px-1 text-xs bg-blue-600 text-white"
          >
            {activeFilterCount}
          </Badge>
        )}
        <ChevronDown className={cn(
          "h-4 w-4 ml-1 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg">Advanced Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Search in Filters */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search filters..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
            {/* Categories */}
            <FilterSection
              title="Categories"
              options={filterOptions.categories}
              filterType="categories"
            />

            {/* Price Range */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm">Price Range</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min $"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max $"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Availability */}
            <FilterSection
              title="Availability"
              options={filterOptions.availability}
              filterType="availability"
            />

            {/* Applications */}
            {filterOptions.applications.length > 0 && (
              <FilterSection
                title="Applications"
                options={filterOptions.applications}
                filterType="applications"
              />
            )}

            {/* Features */}
            {filterOptions.features.length > 0 && (
              <FilterSection
                title="Features"
                options={filterOptions.features}
                filterType="features"
              />
            )}

            {/* Specifications */}
            {filterOptions.specifications.length > 0 && (
              <FilterSection
                title="Specifications"
                options={filterOptions.specifications}
                filterType="specifications"
              />
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex-1 text-sm"
                disabled={activeFilterCount === 0}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button
                onClick={applyFilters}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;