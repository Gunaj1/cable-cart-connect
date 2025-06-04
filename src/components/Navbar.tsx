
import React from 'react';
import { ShoppingCart, Cable } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onNavigate, activeSection }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Logo className="h-10" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chhajer Cable Industries</h1>
              <p className="text-sm text-gray-600">Quality Cables Since 2000</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-lg font-medium transition-colors duration-300 hover:text-blue-600 ${
                  activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={onCartClick}
            className="relative bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
