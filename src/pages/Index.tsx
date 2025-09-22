import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Heart, 
  Star, 
  Zap, 
  Shield, 
  Award, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Package, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  FileText,
  Calculator,
  Wrench,
  Target,
  TrendingUp,
  Globe,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import AboutTabs from '../components/AboutTabs';
import ServicesSection from '../components/ServicesSection';
import BusinessCredentials from '../components/BusinessCredentials';
import ClientLogoStrip from '../components/ClientLogoStrip';
import AmazonStyleFilter from '../components/AmazonStyleFilter';
import ComparisonFloatingButton from '../components/ComparisonFloatingButton';
import CompareTable from '../components/CompareTable';
import ChatBot from '../components/ChatBot';
import { useComparison } from '../contexts/ComparisonContext';
import { Product } from '../types/Product';

// Mock product data
const mockProducts: Product[] = [
  // Patchcords
  {
    id: 'pc1',
    name: 'Cat 6 STP',
    category: 'Patchcords',
    image: '/src/assets/CAT 6 STP Patchcord 1.png',
    price: 29.99,
    description: 'Shielded Twisted Pair Cat6 patchcord',
    stock: 45,
    detailedDescription: {
      applications: ['LAN NETWORK SYSTEM', 'COMPUTER NETWORK DISTRIBUTING SYSTEM'],
      specifications: ['OEM SUPPLIER', 'CUSTOMIZATION AVAILABLE'],
      features: ['23/24/25/26AWG']
    }
  },
  {
    id: 'pc2',
    name: 'Cat 6 FTP',
    category: 'Patchcords',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 27.99,
    description: 'Foiled Twisted Pair Cat6 patchcord',
    stock: 32,
    detailedDescription: {
      applications: ['DATA CENTERS', 'ENTERPRISE NETWORKS'],
      specifications: ['PASSED FLUKE TEST', 'CUSTOMIZED LENGTHS'],
      features: ['100 ±15Ω']
    }
  },
  {
    id: 'pc3',
    name: 'Cat 6 UTP',
    category: 'Patchcords',
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 25.99,
    description: 'Unshielded Twisted Pair Cat6 patchcord',
    stock: 67,
    detailedDescription: {
      applications: ['OFFICE ENVIRONMENTS', 'SCHOOLS'],
      specifications: ['OEM SUPPLIER', 'PACKING CUSTOMIZED'],
      features: []
    }
  },
  {
    id: 'pc4',
    name: 'Cat 5e STP',
    category: 'Patchcords',
    image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 24.99,
    description: 'Shielded Twisted Pair Cat5e patchcord',
    stock: 28,
    detailedDescription: {
      applications: ['NETWORK ADAPTERS', 'HUBS AND SWITCHES'],
      specifications: ['LSZH AVAILABLE'],
      features: ['100% FACTORY TESTED']
    }
  },
  {
    id: 'pc5',
    name: 'Cat 5e FTP',
    category: 'Patchcords',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 22.99,
    description: 'Foiled Twisted Pair Cat5e patchcord',
    stock: 41,
    detailedDescription: {
      applications: ['DATA TRANSMISSION', 'NETWORK CONNECTIONS'],
      specifications: ['PASSED FLUKE TEST'],
      features: ['CUSTOMIZED LENGTHS AND COLORS ACCEPTED']
    }
  },
  {
    id: 'pc6',
    name: 'Cat 5e UTP',
    category: 'Patchcords',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 20.99,
    description: 'Unshielded Twisted Pair Cat5e patchcord',
    stock: 53,
    detailedDescription: {
      applications: ['NETWORK CONNECTION', 'ETHERNET APPLICATIONS'],
      specifications: ['OEM SUPPLIERS'],
      features: ['CUSTOMIZATION AVAILABLE']
    }
  },

  // Cat5e LAN Cables
  {
    id: 'lan1',
    name: 'Cat 5e Flat',
    category: 'Cat5e LAN Cables',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 35.99,
    description: 'Ultra-thin flat design',
    stock: 23,
    detailedDescription: {
      applications: ['HOME NETWORKS', 'UNDER CARPET'],
      specifications: ['CUSTOMIZATION AVAILABLE', 'SPEED 1000MBPS'],
      features: []
    }
  },
  {
    id: 'lan2',
    name: 'Cat 5e 2 Pair',
    category: 'Cat5e LAN Cables',
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 28.99,
    description: '2-pair configuration for voice and data',
    stock: 19,
    detailedDescription: {
      applications: ['VOICE COMMUNICATION', 'BASIC DATA'],
      specifications: ['SF/UTP AVAILABLE'],
      features: ['SPECIAL PE POLYOLEFIN INSULATION']
    }
  },
  {
    id: 'lan3',
    name: 'Cat 5e Armored',
    category: 'Cat5e LAN Cables',
    image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 45.99,
    description: 'Heavy-duty armored for harsh environments',
    stock: 15,
    detailedDescription: {
      applications: ['INDUSTRIAL', 'OUTDOOR'],
      specifications: ['DCM TESTED', 'FLUKE TESTED'],
      features: ['0.8MM ALUMINIUM ROD']
    }
  },

  // Cat 6 LAN Cable
  {
    id: 'cat1',
    name: 'Cat 6 Flat',
    category: 'Cat 6 LAN Cable',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 42.99,
    description: 'Low-profile flat design for discrete installations',
    stock: 31,
    detailedDescription: {
      applications: ['LIFT/ELEVATOR', 'CCTV IN ELEVATORS'],
      specifications: ['UNBREAKABLE OUTER JACKET'],
      features: ['EXCELLENT SIGNAL CHARACTERISTICS']
    }
  },
  {
    id: 'cat2',
    name: 'Cat 6 Armored',
    category: 'Cat 6 LAN Cable',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 55.99,
    description: 'Armored Cat6 for harsh environments',
    stock: 12,
    detailedDescription: {
      applications: ['OUTDOOR', 'INDUSTRIAL'],
      specifications: ['FLUKE TESTED', 'DCM TESTED'],
      features: ['WEATHER AND TEMPERATURE PROOF']
    }
  },

  // CCTV Cable
  {
    id: 'cctv1',
    name: 'CCTV Cable 3+1',
    category: 'CCTV Cable',
    image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 38.99,
    description: 'Combined power and video transmission',
    stock: 26,
    detailedDescription: {
      applications: ['CCTV CAMERAS', 'DVR CONNECTION'],
      specifications: ['36 X 0.115 MM ALLOY WITH ALUMINUM FOIL'],
      features: ['HIGHLY SHOCK-PROOF', 'HIGH TENSILE STRENGTH']
    }
  },
  {
    id: 'cctv2',
    name: 'CCTV Cable 4+1',
    category: 'CCTV Cable',
    image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 42.99,
    description: 'Enhanced power delivery for PTZ cameras',
    stock: 18,
    detailedDescription: {
      applications: ['PTZ CAMERAS', 'LONG DISTANCE'],
      specifications: ['ENHANCED POWER DELIVERY'],
      features: ['SUPERIOR PICTURE QUALITY']
    }
  },

  // Telephone Cable
  {
    id: 'tel1',
    name: 'Telephone Cable',
    category: 'Telephone Cable',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 18.99,
    description: 'Multi-pair telephone cable for voice systems',
    stock: 47,
    detailedDescription: {
      applications: ['TELEPHONE EXCHANGES', 'SWITCH BOARD WIRING'],
      specifications: ['PURE ELECTROLYTIC GRADE COPPER'],
      features: ['FIRE RETARDANT OPTIONS']
    }
  },

  // Computer Cords
  {
    id: 'cc1',
    name: 'Desktop CPU Power Cord',
    category: 'Computer Cords',
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 12.99,
    description: '3-pin power cord for desktop computers',
    stock: 89,
    detailedDescription: {
      applications: ['COMPUTER SYSTEMS', 'MONITORS'],
      specifications: ['3 PIN CONFIGURATION'],
      features: ['GROUNDED MALE PLUG']
    }
  },
  {
    id: 'cc2',
    name: 'Laptop Adapter Cord',
    category: 'Computer Cords',
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 15.99,
    description: 'Universal laptop power cord',
    stock: 64,
    detailedDescription: {
      applications: ['LAPTOP COMPUTERS', 'VIDEO GAMES'],
      specifications: ['POLARISED POWER CABLE'],
      features: ['OVERLOAD PROTECTION', 'ANTI-INTERFERENCE']
    }
  },

  // Lift Cables
  {
    id: 'lift1',
    name: 'Lift Cable',
    category: 'Lift Cables',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 78.99,
    description: 'Professional lift cable with enhanced flexibility',
    stock: 8,
    detailedDescription: {
      applications: ['LIFT INSTALLATIONS', 'ELEVATOR SYSTEMS'],
      specifications: ['BARE COPPER CONDUCTOR'],
      features: ['HIGH FLEXIBLE', 'UV-RESISTANT SHEATH']
    }
  },

  // Speaker Cable
  {
    id: 'speaker1',
    name: 'Speaker Cable',
    category: 'Speaker Cable',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 24.99,
    description: 'High-quality speaker cable for audio applications',
    stock: 35,
    detailedDescription: {
      applications: ['SPEAKER SYSTEMS', 'HOME THEATER'],
      specifications: ['MULTI-STRANDED OFC'],
      features: ['300/300V RATED', 'CE CERTIFIED']
    }
  }
];

interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  quantity: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const { comparisonProducts, clearComparison } = useComparison();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        price: product.price,
        description: product.description,
        quantity: quantity
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...mockProducts];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    // Apply availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        if (filters.availability.includes('in-stock')) {
          return product.stock > 5;
        }
        if (filters.availability.includes('low-stock')) {
          return product.stock <= 5 && product.stock > 0;
        }
        if (filters.availability.includes('out-of-stock')) {
          return product.stock === 0;
        }
        return true;
      });
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
        case 'newest':
          // Keep original order for newest
          break;
        case 'rating':
          // Sort by rating (mock implementation)
          filtered.sort((a, b) => 4.5 - 4.2); // Mock ratings
          break;
        default:
          // Relevance - keep original order
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleCheckout = (event: CustomEvent) => {
      setIsCheckoutOpen(true);
    };

    window.addEventListener('checkout', handleCheckout as EventListener);
    return () => window.removeEventListener('checkout', handleCheckout as EventListener);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
        products={mockProducts}
        onProductSelect={handleProductSelect}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with animated elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-gray-900/95 to-blue-800/90">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse-slow"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Premium Cable Solutions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connecting India with high-quality cables and networking solutions since 1997. 
              Trusted by professionals nationwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={() => scrollToSection('products')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-2xl transform hover:scale-105 flex items-center space-x-2"
            >
              <Package className="w-5 h-5" />
              <span>Explore Products</span>
            </button>
            <button
              onClick={() => navigate('/technical-consultation')}
              className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold border border-white/30 flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Get Technical Consultation</span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">27+</div>
              <div className="text-blue-100 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">500+</div>
              <div className="text-blue-100 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">15+</div>
              <div className="text-blue-100 text-sm">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">ISO</div>
              <div className="text-blue-100 text-sm">Certified Quality</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of high-quality cables and networking solutions
            </p>
          </div>

          {/* Filter and View Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <AmazonStyleFilter
                products={mockProducts}
                onFilterChange={handleFilterChange}
              />
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleProductSelect}
                onAddToCart={handleAddToCart}
                className={viewMode === 'list' ? 'flex-row' : ''}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              About Chhajer Cable Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leading the industry with innovation, quality, and reliability since 1997
            </p>
          </div>
          <AboutTabs />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <ServicesSection />
      </section>

      {/* Business Credentials Section */}
      <section id="credentials">
        <BusinessCredentials />
      </section>

      {/* Need Help Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Need Help Choosing the Right Cable?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our experts are here to help you find the perfect solution for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Get Technical Consultation</h3>
                <p className="text-blue-100 mb-6">
                  Speak with our technical experts to get personalized recommendations for your specific requirements.
                </p>
                <button
                  onClick={() => navigate('/technical-consultation')}
                  className="w-full bg-white text-blue-600 py-3 px-6 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
                >
                  Start Consultation
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Request Bulk Quote</h3>
                <p className="text-blue-100 mb-6">
                  Get competitive pricing for bulk orders with custom specifications and delivery options.
                </p>
                <button
                  onClick={() => navigate('/bulk-quote')}
                  className="w-full bg-white text-blue-600 py-3 px-6 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Strip */}
      <ClientLogoStrip />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to discuss your cable requirements? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600">
                        A6 Jhilmil Industrial Area<br />
                        New Delhi 110095, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">+91 11 2218 5555</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">info@chhajercable.com</p>
                      <p className="text-gray-600">sales@chhajercable.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                      <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modals and Components */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartTotal}
      />

      <CompareTable
        products={comparisonProducts}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onAddToCart={handleAddToCart}
        onClearComparison={clearComparison}
      />

      <ComparisonFloatingButton
        onOpenComparison={() => setIsCompareOpen(true)}
      />

      <ChatBot />
    </div>
  );
};

export default Index;