import React, { useState, useEffect } from 'react';
import { Cable, ShoppingCart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Eye, X, Award, Shield, Users, TrendingUp, Map, Star } from 'lucide-react';
import ChatBot from '../components/ChatBot';
import ClientLogoStrip from '../components/ClientLogoStrip';
import MegaMenuNavbar from '../components/MegaMenuNavbar';
import Logo from '../components/Logo';
import AboutTabs from '../components/AboutTabs';
import ServicesSection from '../components/ServicesSection';
import BusinessCredentials from '../components/BusinessCredentials';
import { useComparison } from '../contexts/ComparisonContext';
import { getProductDetails } from '../data/productImages';
import { Search } from 'lucide-react';
import AmazonStyleFilter from '@/components/AmazonStyleFilter';
import BulkQuoteForm from '@/components/BulkQuoteForm';
import ManufacturingAnimation from '@/components/ManufacturingAnimation';
import { categories as sharedCategories } from '@/data/products';

import { Product } from '@/types/Product';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import ProductCompareDrawer from '@/components/ProductCompareDrawer';
import ComparisonFloatingButton from '@/components/ComparisonFloatingButton';

// Helper function to create URL-friendly slug from product name
const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const Index = () => {
  const location = window.location;
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isBulkQuoteOpen, setIsBulkQuoteOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    comparisonProducts,
    clearComparison
  } = useComparison();
  
  // Handle scroll-to on page load from navigation state
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);
  const [products, setProducts] = useState<Product[]>(() => {
    // Initialize products with stock levels from shared categories
    return sharedCategories.flatMap(category => category.products.map(product => ({
      ...product,
      stock: product.stock || Math.floor(Math.random() * 100) + 10,
      applications: (product as any).detailedDescription?.applications || [],
      features: (product as any).detailedDescription?.features || [],
      specifications: (product as any).detailedDescription?.specifications?.reduce((acc: Record<string, string>, spec: string, index: number) => {
        acc[`spec_${index}`] = spec;
        return acc;
      }, {}) || {}
    })));
  });

  // Initialize filtered products when products change
  React.useEffect(() => {
    if (filteredProducts.length === 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    let filtered = [...products];

    // Apply category filter if selected
    if (selectedCategory) {
      const selectedCat = categories.find(cat => cat.id === selectedCategory);
      if (selectedCat) {
        const categoryProductIds = selectedCat.products.map(p => p.id);
        filtered = filtered.filter(p => categoryProductIds.includes(p.id));
      }
    }

    // Apply category filters
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    // Apply availability filter
    if (filters.availability && filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        if (filters.availability.includes('in-stock') && product.stock > 5) return true;
        if (filters.availability.includes('low-stock') && product.stock <= 5 && product.stock > 0) return true;
        if (filters.availability.includes('out-of-stock') && product.stock === 0) return true;
        return false;
      });
    }

    // Apply applications filter
    if (filters.applications && filters.applications.length > 0) {
      filtered = filtered.filter(product =>
        product.applications && filters.applications.some(app => 
          product.applications.includes(app)
        )
      );
    }

    // Apply features filter
    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(product =>
        product.features && filters.features.some(feature => 
          product.features.includes(feature)
        )
      );
    }

    // Apply specifications filter
    if (filters.specifications && filters.specifications.length > 0) {
      filtered = filtered.filter(product =>
        product.specifications && filters.specifications.some(spec => 
          Object.keys(product.specifications).includes(spec)
        )
      );
    }

    // Apply sorting
    if (filters.sortOption) {
      switch (filters.sortOption) {
        case 'price-low-high':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          // Sort by rating (assuming higher is better)
          filtered.sort((a, b) => (b.rating || 4) - (a.rating || 4));
          break;
        case 'newest':
          // Sort by newest (assuming id order represents newness)
          filtered.reverse();
          break;
        default:
          // relevance - keep original order
          break;
      }
    }

    setFilteredProducts(filtered);
  };
  
  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <MegaMenuNavbar 
        products={products} 
        onProductSelect={product => {
          setQuickViewProduct(product);
          setIsQuickViewOpen(true);
        }}
        onFilterClick={() => setIsFilterOpen(true)}
      />
      
      {/* Hero Section - Manufacturing Animation */}
      <div id="home">
        <ManufacturingAnimation />
      </div>

      {/* Need Help Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Choosing the Right Cable?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our experts are here to help you find the perfect cable solution for your specific requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/technical-consultation"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Technical Consultation
            </a>
            <a
              href="/bulk-quote"
              className="bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-600"
            >
              Request Bulk Quote
            </a>
          </div>
        </div>
      </div>

      {/* Client Logo Strip */}
      <ClientLogoStrip />

      {/* Services Section */}
      <div id="services" className="bg-gradient-to-br from-gray-50 to-white py-20">
        <ServicesSection />
      </div>

      {/* Credentials Section */}
      <div id="credentials">
        <BusinessCredentials />
      </div>

      {/* Hidden sections for navigation scroll targets */}
      <div id="about" className="hidden">
        <div className="bg-gradient-to-br from-white to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
                About Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Two decades of excellence in cable manufacturing
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <AboutTabs />
            </div>
          </div>
        </div>
      </div>

      <div id="products" className="hidden">
        {/* Products available through Consumer menu */}
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gradient-to-br from-blue-900 via-gray-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-blue-200">
              We're here to help with all your cable needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <p className="flex items-center text-lg">
                  <Phone className="w-6 h-6 mr-3 text-blue-400" />
                  +91 9717535050
                </p>
                <p className="flex items-center text-lg">
                  <Mail className="w-6 h-6 mr-3 text-blue-400" />
                  info@chhajercables.com
                </p>
                <p className="flex items-center text-lg">
                  <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                  A6 Jhilmil Industrial Area, New Delhi 110095, India
                </p>
                
                {/* Premium Google Maps Button */}
                <div className="mt-6">
                  <button
                    onClick={() => window.open('https://www.google.com/maps/dir//A6+Jhilmil+Industrial+Area,+New+Delhi+110095,+India/@28.6851,77.2426,17z', '_blank')}
                    className="group relative flex items-center justify-center w-full py-4 px-6 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] border border-white/20"
                  >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                    
                    {/* Icon with premium styling */}
                    <div className="relative flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                      <Map className="w-5 h-5 text-white drop-shadow-lg" />
                    </div>
                    
                    {/* Text with glow effect */}
                    <span className="relative font-bold text-white text-lg tracking-wide drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300">
                      View on Google Maps
                    </span>
                    
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse-travel"></div>
                    </div>
                  </button>
                </div>

                {/* Premium Google Reviews Button */}
                <div className="mt-4">
                  <button
                    onClick={() => window.open('https://www.google.com/search?sca_esv=12e50a14a6107b85&rlz=1C1VDKB_en-GBIN1101IN1101&sxsrf=AE3TifOC_UIgONEdUsFEhFLFxI6OUre3tA:1756626174964&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E3fIPw7Xl6VH7ZUJS1CPV8ZrDr_9-DqpOFAlEM0oTwJ3xRRZyt5ReYrvuAKLcVKLukLFLUhMCcxPcElH1FiSsndQHSTPxNwSCFEA-nAYxIUWfs10xw%3D%3D&q=Chhajer+Cable+Industries+Reviews&sa=X&ved=2ahUKEwjcxKW5xrSPAxXFSWwGHZcWI_AQ0bkNegQIHhAE&biw=1366&bih=641&dpr=1#lrd=0x390cfbf65a34cc11:0x4402284828be60a5,3', '_blank')}
                    className="group relative flex items-center justify-center w-full py-4 px-6 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_15px_40px_rgba(251,146,60,0.4)] border border-white/20"
                  >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                    
                    {/* Google icon with premium styling */}
                    <div className="relative flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                      <Star className="w-5 h-5 text-white drop-shadow-lg fill-current" />
                    </div>
                    
                    {/* Text with glow effect */}
                    <span className="relative font-bold text-white text-lg tracking-wide drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300">
                      Rate Us on Google
                    </span>
                    
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse-travel"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-2 text-lg">
                <p>Wednesday - Monday</p>
                <p className="text-blue-400 font-semibold">8:00 AM - 6:00 PM</p>
                <p>Tuesday</p>
                <p className="text-gray-400">Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amazon Style Filter Panel */}
      <AmazonStyleFilter
        products={products}
        onFilterChange={handleFilterChange}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Quick View Modal */}
      <ProductQuickView product={quickViewProduct} isOpen={isQuickViewOpen} onClose={() => {
      setIsQuickViewOpen(false);
      setQuickViewProduct(null);
    }} />

      {/* Compare Drawer */}
      <ProductCompareDrawer isOpen={isCompareDrawerOpen} onOpenChange={setIsCompareDrawerOpen} onViewFullComparison={() => {}} />

      {/* Bulk Quote Modal */}
      {isBulkQuoteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <BulkQuoteForm onClose={() => setIsBulkQuoteOpen(false)} />
        </div>
      )}
      
      {/* AI ChatBot */}
      <ChatBot />
      
      {/* Comparison Floating Button */}
      <ComparisonFloatingButton onOpenComparison={() => setIsCompareDrawerOpen(true)} />
    </div>;
};
// Re-export categories from shared source
export const categories = sharedCategories;
export default Index;