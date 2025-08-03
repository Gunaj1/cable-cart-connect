import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Zap, Shield, Settings, Award, Cable, Star, Palette, Ruler, Wrench, Clock, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onClearComparison: () => void;
}

// Helper function to extract technical details from products
const extractTechnicalDetails = (product: Product) => {
  const shielding = product.name.includes('STP') ? 'STP (Shielded)' 
    : product.name.includes('FTP') ? 'FTP (Foiled)' 
    : product.name.includes('UTP') ? 'UTP (Unshielded)' 
    : 'Standard';

  const construction = product.name.includes('Flat') ? 'Flat Cable'
    : product.name.includes('Armored') ? 'Armored Cable'
    : product.name.includes('Outdoor') ? 'Outdoor Rated'
    : product.name.includes('2 pair') ? '2-Pair Construction'
    : 'Standard Construction';

  const bandwidth = product.name.includes('Cat 6') ? 'Up to 250MHz'
    : product.name.includes('Cat 5e') ? 'Up to 100MHz'
    : 'Standard Bandwidth';

  const speed = product.name.includes('Cat 6') ? 'Up to 10Gbps (55m)'
    : product.name.includes('Cat 5e') ? 'Up to 1Gbps'
    : 'Standard Speed';

  return {
    shielding,
    construction,
    bandwidth,
    speed,
    colors: 'Multiple Colors Available',
    lengths: 'Custom Lengths Available',
    impedance: '100 ±15Ω',
    applications: product.detailedDescription?.applications.slice(0, 3) || ['General Use'],
    customization: 'OEM & Custom Orders Available',
    warranty: '2 Years Manufacturer Warranty'
  };
};

const ProductComparison: React.FC<ProductComparisonProps> = ({
  isOpen,
  onClose,
  products,
  onClearComparison
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Focus trap for accessibility
      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modal) {
        modal.focus();
      }
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Tab') {
      // Handle tab navigation within modal
      const focusableElements = document.querySelectorAll(
        '[role="dialog"] button, [role="dialog"] [tabindex="0"]'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen || products.length < 2) return null;

  const comparisonData = products.map(extractTechnicalDetails);

  const comparisonSections = [
    {
      title: 'Basic Information',
      rows: [
        { label: 'Product Name', key: 'name', icon: Award },
        { label: 'Category', key: 'category', icon: Settings },
        { label: 'Price', key: 'price', icon: DollarSign },
        { label: 'Stock Status', key: 'stock', icon: CheckCircle2 }
      ]
    },
    {
      title: 'Technical Specifications',
      rows: [
        { label: 'Shielding Type', key: 'shielding', icon: Shield },
        { label: 'Construction', key: 'construction', icon: Wrench },
        { label: 'Bandwidth', key: 'bandwidth', icon: Zap },
        { label: 'Speed Rating', key: 'speed', icon: Zap },
        { label: 'Impedance', key: 'impedance', icon: Settings }
      ]
    },
    {
      title: 'Customization & Availability',
      rows: [
        { label: 'Available Colors', key: 'colors', icon: Palette },
        { label: 'Length Options', key: 'lengths', icon: Ruler },
        { label: 'Primary Applications', key: 'applications', icon: CheckCircle2 },
        { label: 'Customization Options', key: 'customization', icon: Star },
        { label: 'Warranty Period', key: 'warranty', icon: Clock }
      ]
    }
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null);

  return (
    <div 
      className="fixed inset-0 comparison-modal-overlay z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Cable Connection SVG */}
      <svg 
        className="absolute inset-0 pointer-events-none z-10" 
        width="100%" 
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {products.length >= 2 && Array.from({ length: products.length - 1 }).map((_, index) => (
          <line
            key={index}
            x1={`${20 + (index * 30)}%`}
            y1="40%"
            x2={`${50 + (index * 30)}%`}
            y2="40%"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="3"
            className="cable-connection-line"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </svg>
      
      <div 
        className={cn(
          "bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 relative z-20",
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-electric-pulse">
              <Cable className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 id="comparison-title" className="text-3xl font-bold text-white animate-bounce-in">Product Comparison</h2>
              <p className="text-blue-100">Compare {products.length} selected products</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClearComparison}
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium"
            >
              Clear All
            </button>
            <button 
              onClick={onClose} 
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white/20"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          {/* Product Images */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 border-b">
            <div className={`grid gap-8 ${products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={cn(
                    "bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 transform transition-all duration-300",
                    `animate-fade-in`
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-blue-100 p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      <span className="text-sm text-gray-500">{product.stock} in stock</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Tabs */}
          <div className="sticky top-0 bg-white z-30 border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {comparisonSections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={cn(
                    "px-8 py-4 text-lg font-semibold whitespace-nowrap transition-all duration-300 border-b-4",
                    activeSection === index
                      ? "text-blue-600 border-blue-600 bg-blue-50"
                      : "text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300"
                  )}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-20 bg-white z-20">
                  <tr className="border-b-2 border-blue-200">
                    <th className="text-left py-4 px-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-blue-50 to-transparent rounded-l-lg">
                      {comparisonSections[activeSection].title}
                    </th>
                    {products.map((product, index) => (
                       <th 
                        key={product.id} 
                        onClick={() => setHighlightedColumn(highlightedColumn === index ? null : index)}
                        className={cn(
                          "text-center py-4 px-4 text-lg font-bold text-gray-900 product-column-hover cursor-pointer transition-all duration-300",
                          index === products.length - 1 && "rounded-r-lg",
                          highlightedColumn === index ? "bg-blue-100 text-blue-700 ring-2 ring-blue-400" : index % 2 === 0 ? "bg-blue-50/50" : "bg-gray-50/50"
                        )}
                        title="Click to highlight this product"
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setHighlightedColumn(highlightedColumn === index ? null : index);
                          }
                        }}
                      >
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonSections[activeSection].rows.map((row, rowIndex) => {
                    const Icon = row.icon;
                    return (
                      <tr 
                        key={row.key}
                        className={cn(
                          "border-b border-gray-100 transition-all duration-300 hover:bg-blue-50/30",
                          "animate-slide-in-up"
                        )}
                        style={{ animationDelay: `${rowIndex * 100 + 300}ms` }}
                      >
                        <td className="py-4 px-4 font-semibold text-gray-800 bg-gradient-to-r from-gray-50 to-transparent">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-blue-600" />
                            <span>{row.label}</span>
                          </div>
                        </td>
                        {products.map((product, colIndex) => {
                          let value;
                          if (row.key === 'name') value = product.name;
                          else if (row.key === 'category') value = product.category;
                          else if (row.key === 'price') value = `$${product.price}`;
                          else if (row.key === 'stock') value = `${product.stock} in stock`;
                          else if (row.key === 'applications') {
                            value = comparisonData[colIndex].applications.join(', ');
                          } else {
                            value = comparisonData[colIndex][row.key as keyof typeof comparisonData[0]];
                          }

                          // Check if this value is different from others for highlighting
                          const isDifferent = products.some((_, i) => {
                            if (i === colIndex) return false;
                            let otherValue;
                            if (row.key === 'name') otherValue = products[i].name;
                            else if (row.key === 'category') otherValue = products[i].category;
                            else if (row.key === 'price') otherValue = `$${products[i].price}`;
                            else if (row.key === 'stock') otherValue = `${products[i].stock} in stock`;
                            else if (row.key === 'applications') {
                              otherValue = comparisonData[i].applications.join(', ');
                            } else {
                              otherValue = comparisonData[i][row.key as keyof typeof comparisonData[0]];
                            }
                            return value !== otherValue;
                          });

                          return (
                            <td 
                              key={`${product.id}-${row.key}`}
                              className={cn(
                                "py-4 px-4 text-center text-gray-700 product-column-hover transition-all duration-300",
                                highlightedColumn === colIndex ? "bg-blue-100 ring-2 ring-blue-400" : colIndex % 2 === 0 ? "bg-blue-50/20" : "bg-gray-50/20",
                                isDifferent && "relative"
                              )}
                            >
                              <div className={cn(
                                "transition-all duration-300",
                                isDifferent && "animate-pulse-glow"
                              )}>
                                {typeof value === 'string' && value.includes(',') ? (
                                  <div className="text-sm space-y-1">
                                    {value.split(',').map((item, i) => (
                                      <div key={i} className="text-xs bg-white rounded-full px-2 py-1 inline-block mr-1 mb-1">
                                        {item.trim()}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="font-medium">{value}</span>
                                )}
                              </div>
                              {isDifferent && (
                                <div className="absolute inset-0 bg-blue-400/10 rounded animate-pulse-subtle pointer-events-none" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 p-6">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onClearComparison}
                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105 flex items-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Clear Comparison</span>
              </button>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;