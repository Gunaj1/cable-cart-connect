import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Zap, Shield, Settings, Award, Cable } from 'lucide-react';
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
    customization: 'OEM & Custom Orders Available'
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
    }
  }, [isOpen]);

  if (!isOpen || products.length < 2) return null;

  const comparisonData = products.map(extractTechnicalDetails);

  const comparisonRows = [
    { label: 'Product Name', key: 'name', icon: Award },
    { label: 'Category', key: 'category', icon: Settings },
    { label: 'Shielding Type', key: 'shielding', icon: Shield },
    { label: 'Construction', key: 'construction', icon: Settings },
    { label: 'Bandwidth', key: 'bandwidth', icon: Zap },
    { label: 'Speed Rating', key: 'speed', icon: Zap },
    { label: 'Impedance', key: 'impedance', icon: Settings },
    { label: 'Available Colors', key: 'colors', icon: Settings },
    { label: 'Length Options', key: 'lengths', icon: Settings },
    { label: 'Primary Applications', key: 'applications', icon: CheckCircle2 },
    { label: 'Customization', key: 'customization', icon: Award },
    { label: 'Price', key: 'price', icon: Award }
  ];

  return (
    <div className="fixed inset-0 comparison-modal-overlay z-50 flex items-center justify-center p-4">
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
              <h2 className="text-3xl font-bold text-white animate-bounce-in">Product Comparison</h2>
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

          {/* Comparison Table */}
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-blue-200">
                    <th className="text-left py-4 px-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-blue-50 to-transparent rounded-l-lg">
                      Specifications
                    </th>
                    {products.map((product, index) => (
                       <th 
                        key={product.id} 
                        className={cn(
                          "text-center py-4 px-4 text-lg font-bold text-gray-900 product-column-hover cursor-pointer",
                          index === products.length - 1 && "rounded-r-lg",
                          index % 2 === 0 ? "bg-blue-50/50" : "bg-gray-50/50"
                        )}
                        title="Click to highlight this product"
                      >
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, rowIndex) => {
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
                                "py-4 px-4 text-center text-gray-700 product-column-hover",
                                colIndex % 2 === 0 ? "bg-blue-50/20" : "bg-gray-50/20",
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
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;