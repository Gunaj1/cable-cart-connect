import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Zap, Shield, Settings, Award, Trash2 } from 'lucide-react';
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
  onRemoveProduct?: (productId: string) => void;
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
  onClearComparison,
  onRemoveProduct
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

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
    <div className={cn(
      "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-500",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div 
        className={cn(
          "bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-700 ease-out",
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-8"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-gray-600 px-8 py-6 flex justify-between items-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-travel"></div>
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-travel" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Product Comparison</h2>
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
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 border-b relative overflow-hidden">
            {/* Cable line animations */}
            <div className="absolute inset-0 pointer-events-none">
              {products.length > 1 && (
                <>
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                    <defs>
                      <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    {products.length === 2 && (
                      <line
                        x1="25%"
                        y1="50%"
                        x2="75%"
                        y2="50%"
                        stroke="url(#cableGradient)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                    )}
                    {products.length === 3 && (
                      <>
                        <line
                          x1="16.67%"
                          y1="50%"
                          x2="50%"
                          y2="50%"
                          stroke="url(#cableGradient)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="animate-pulse"
                        />
                        <line
                          x1="50%"
                          y1="50%"
                          x2="83.33%"
                          y2="50%"
                          stroke="url(#cableGradient)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="animate-pulse"
                          style={{ animationDelay: '0.5s' }}
                        />
                      </>
                    )}
                  </svg>
                </>
              )}
            </div>
            
            <div className={`grid gap-8 ${products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} relative z-10`}>
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={cn(
                    "bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 transform transition-all duration-500 relative group",
                    `animate-fade-in`,
                    hoveredColumn === index && "scale-105 shadow-xl ring-2 ring-blue-400 ring-opacity-50"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredColumn(index)}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  {/* Remove button */}
                  {onRemoveProduct && (
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="absolute top-2 right-2 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                  
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-blue-100 p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
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
                          "text-center py-4 px-4 text-lg font-bold text-gray-900",
                          index === products.length - 1 && "rounded-r-lg",
                          index % 2 === 0 ? "bg-blue-50/50" : "bg-gray-50/50"
                        )}
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
                                "py-4 px-4 text-center text-gray-700 transition-all duration-300",
                                colIndex % 2 === 0 ? "bg-blue-50/20" : "bg-gray-50/20",
                                isDifferent && "relative",
                                hoveredColumn === colIndex && "bg-blue-100/50 shadow-inner"
                              )}
                              onMouseEnter={() => setHoveredColumn(colIndex)}
                              onMouseLeave={() => setHoveredColumn(null)}
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
                                <div className="absolute inset-0 bg-blue-400/20 rounded animate-pulse-subtle pointer-events-none" />
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