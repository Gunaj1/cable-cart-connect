
import React, { useState } from 'react';
import { ShoppingCart, Search, X } from 'lucide-react';
import Logo from './Logo';
import ProductSearch from './ProductSearch';

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

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onNavigate, activeSection, products, onProductSelect }) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Logo className="h-12" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-gray-700 bg-clip-text text-transparent">
                Chhajer Cable Industries
              </h1>
              <p className="text-sm text-gray-600 font-medium">Quality Cables Since 1997</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-lg font-semibold transition-all duration-300 hover:text-blue-600 relative ${
                  activeSection === item.id 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="hidden lg:block">
            <ProductSearch
              products={products}
              onProductSelect={onProductSelect}
              className="w-80"
            />
          </div>

          {/* Mobile Search Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              {isMobileSearchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
            </button>

            <button
            onClick={onCartClick}
            className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {cartCount}
              </span>
            )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden px-4 pb-4 border-t border-gray-100 bg-white/95 backdrop-blur-md animate-fade-in">
            <ProductSearch
              products={products}
              onProductSelect={(product) => {
                onProductSelect(product);
                setIsMobileSearchOpen(false);
              }}
              className="w-full"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
