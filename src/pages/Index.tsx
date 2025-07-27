import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Settings, Zap, Search, Filter, Star, Plus, Minus, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import InventoryManager from '../components/InventoryManager';
import AboutTabs from '../components/AboutTabs';
import ServicesSection from '../components/ServicesSection';
import BusinessCredentials from '../components/BusinessCredentials';
import CompareButton from '../components/CompareButton';
import ComparisonFloatingButton from '../components/ComparisonFloatingButton';
import ProductComparison from '../components/ProductComparison';
import { useComparison } from '../contexts/ComparisonContext';

// Import images
import cat5eUTPLan from '../assets/cat5e-utp-lan.jpg';
import cat5eSTPLan from '../assets/cat5e-stp-lan.jpg';
import cat5eFTPLan from '../assets/cat5e-ftp-lan.jpg';
import cat5eFlatLan from '../assets/cat5e-flat-lan.jpg';
import cat5eArmoredLan from '../assets/cat5e-armored-lan.jpg';
import cat5eOutdoorLan from '../assets/cat5e-outdoor-lan.jpg';
import cat5e2PairLan from '../assets/cat5e-2pair-lan.jpg';
import cat5eUTPPatchcord from '../assets/cat5e-utp-patchcord.jpg';
import cat5eSTPPatchcord from '../assets/cat5e-stp-patchcord.jpg';
import cat5eFTPPatchcord from '../assets/cat5e-ftp-patchcord.jpg';
import cat6UTPLan from '../assets/cat6-utp-lan.jpg';
import cat6STPLan from '../assets/cat6-stp-lan.jpg';
import cat6FTPLan from '../assets/cat6-ftp-lan.jpg';
import cat6FlatLan from '../assets/cat6-flat-lan.jpg';
import cat6ArmoredLan from '../assets/cat6-armored-lan.jpg';
import cat6OutdoorLan from '../assets/cat6-outdoor-lan.jpg';
import cat6UTPPatchcord from '../assets/cat6-utp-patchcord.jpg';
import cat6STPPatchcord from '../assets/cat6-stp-patchcord.jpg';
import cat6FTPPatchcord from '../assets/cat6-ftp-patchcord.jpg';
import cctvCable3Plus1 from '../assets/cctv-3plus1-cable.jpg';
import cctvCable4Plus1 from '../assets/cctv-4plus1-cable.jpg';
import telephoneCable from '../assets/telephone-cable.jpg';
import speakerCable from '../assets/speaker-cable.jpg';
import liftCable from '../assets/lift-cable.jpg';
import desktopPowerCord from '../assets/desktop-power-cord.jpg';
import laptopAdapterCord from '../assets/laptop-adapter-cord.jpg';

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

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{ items: CartItem[], total: number } | null>(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  const { comparisonProducts, clearComparison } = useComparison();

  const products: Product[] = [
    // Cat5e LAN Cables
    {
      id: 'cat5e-utp-lan',
      name: 'Cat5e UTP LAN Cable',
      category: 'Cat5e LAN',
      image: cat5eUTPLan,
      price: 25,
      description: 'High-quality Cat5e UTP cable for reliable network connections',
      stock: 150,
      detailedDescription: {
        applications: ['Office Networks', 'Home Internet', 'Data Centers', 'Ethernet Connections'],
        specifications: ['24 AWG Copper', '100MHz Bandwidth', '100m Max Length', 'RJ45 Compatible'],
        features: ['Unshielded Twisted Pair', 'PVC Jacket', 'Color Coded', 'Easy Installation']
      }
    },
    {
      id: 'cat5e-stp-lan',
      name: 'Cat5e STP LAN Cable',
      category: 'Cat5e LAN',
      image: cat5eSTPLan,
      price: 35,
      description: 'Shielded Cat5e cable for environments with electromagnetic interference',
      stock: 120,
      detailedDescription: {
        applications: ['Industrial Networks', 'Medical Equipment', 'High EMI Areas', 'Server Rooms'],
        specifications: ['24 AWG Copper', '100MHz Bandwidth', 'Foil Shield', 'Drain Wire'],
        features: ['EMI Protection', 'Grounding Required', 'Enhanced Performance', 'Durable Construction']
      }
    },
    {
      id: 'cat5e-ftp-lan',
      name: 'Cat5e FTP LAN Cable',
      category: 'Cat5e LAN',
      image: cat5eFTPLan,
      price: 30,
      description: 'Foil shielded Cat5e cable offering balanced performance and protection',
      stock: 100,
      detailedDescription: {
        applications: ['Commercial Buildings', 'Schools', 'Hospitals', 'Office Complexes'],
        specifications: ['24 AWG Copper', '100MHz Bandwidth', 'Foil Shielding', 'LSZH Jacket'],
        features: ['Moderate EMI Protection', 'Fire Retardant', 'Easy Termination', 'Cost Effective']
      }
    },
    {
      id: 'cat5e-flat-lan',
      name: 'Cat5e Flat LAN Cable',
      category: 'Cat5e LAN',
      image: cat5eFlatLan,
      price: 28,
      description: 'Ultra-thin flat Cat5e cable perfect for under-carpet installations',
      stock: 80,
      detailedDescription: {
        applications: ['Under Carpet', 'Wall Mounting', 'Tight Spaces', 'Clean Installations'],
        specifications: ['26 AWG Copper', '100MHz Bandwidth', '2mm Thickness', 'Flexible Design'],
        features: ['Space Saving', 'Discreet Installation', 'Flexible', 'Easy Routing']
      }
    },
    {
      id: 'cat5e-armored-lan',
      name: 'Cat5e Armored LAN Cable',
      category: 'Cat5e LAN',
      image: cat5eArmoredLan,
      price: 45,
      description: 'Heavy-duty armored Cat5e cable for harsh environments',
      stock: 60,
      detailedDescription: {
        applications: ['Outdoor Installations', 'Industrial Sites', 'Underground', 'Harsh Environments'],
        specifications: ['24 AWG Copper', '100MHz Bandwidth', 'Steel Armor', 'PE Jacket'],
        features: ['Rodent Resistant', 'Crush Protection', 'Weather Resistant', 'Long Lasting']
      }
    },
    {
      id: 'cat5e-outdoor-lan',
      name: 'Cat5e Outdoor LAN Cable',
      category: 'Cat5e LAN',
      image: cat5eOutdoorLan,
      price: 40,
      description: 'Weather-resistant Cat5e cable designed for outdoor use',
      stock: 90,
      detailedDescription: {
        applications: ['Outdoor Networks', 'Building-to-Building', 'Campus Networks', 'Aerial Installation'],
        specifications: ['24 AWG Copper', '100MHz Bandwidth', 'UV Resistant', 'Water Resistant'],
        features: ['All Weather', 'UV Protection', 'Temperature Stable', 'Direct Burial']
      }
    },
    {
      id: 'cat5e-2pair-lan',
      name: 'Cat5e 2-Pair LAN Cable',
      category: 'Cat5e LAN',
      image: cat5e2PairLan,
      price: 20,
      description: 'Economical 2-pair Cat5e cable for basic networking needs',
      stock: 200,
      detailedDescription: {
        applications: ['Basic Networks', 'Telephone Systems', 'Simple Data Transfer', 'Cost-Sensitive Projects'],
        specifications: ['24 AWG Copper', '2 Twisted Pairs', '100MHz Bandwidth', 'Compact Design'],
        features: ['Cost Effective', 'Smaller Diameter', 'Easy Installation', 'Basic Performance']
      }
    },

    // Cat5e Patch Cords
    {
      id: 'cat5e-utp-patchcord',
      name: 'Cat5e UTP Patch Cord',
      category: 'Cat5e Patch Cord',
      image: cat5eUTPPatchcord,
      price: 8,
      description: 'Ready-to-use Cat5e UTP patch cord with RJ45 connectors',
      stock: 300,
      detailedDescription: {
        applications: ['Patch Panels', 'Switch Connections', 'Desktop Connections', 'Network Racks'],
        specifications: ['26 AWG Stranded', 'RJ45 Connectors', 'Gold Plated Contacts', 'Multiple Lengths'],
        features: ['Plug and Play', 'Flexible', 'Reliable Connections', 'Color Options']
      }
    },
    {
      id: 'cat5e-stp-patchcord',
      name: 'Cat5e STP Patch Cord',
      category: 'Cat5e Patch Cord',
      image: cat5eSTPPatchcord,
      price: 12,
      description: 'Shielded Cat5e patch cord for interference-free connections',
      stock: 250,
      detailedDescription: {
        applications: ['Server Connections', 'High-End Equipment', 'EMI Sensitive Areas', 'Professional Setups'],
        specifications: ['26 AWG Stranded', 'Shielded RJ45', 'Gold Plated', 'Molded Boots'],
        features: ['EMI Protection', 'Professional Grade', 'Secure Connections', 'Durable']
      }
    },
    {
      id: 'cat5e-ftp-patchcord',
      name: 'Cat5e FTP Patch Cord',
      category: 'Cat5e Patch Cord',
      image: cat5eFTPPatchcord,
      price: 10,
      description: 'Foil shielded Cat5e patch cord for enhanced performance',
      stock: 280,
      detailedDescription: {
        applications: ['Office Networks', 'Commercial Use', 'Data Centers', 'Network Equipment'],
        specifications: ['26 AWG Stranded', 'Foil Shielded', 'RJ45 Connectors', 'Snagless Design'],
        features: ['Balanced Performance', 'Easy Handling', 'Reliable', 'Professional Appearance']
      }
    },

    // Cat6 LAN Cables
    {
      id: 'cat6-utp-lan',
      name: 'Cat6 UTP LAN Cable',
      category: 'Cat6 LAN',
      image: cat6UTPLan,
      price: 35,
      description: 'High-performance Cat6 UTP cable for gigabit networks',
      stock: 140,
      detailedDescription: {
        applications: ['Gigabit Networks', 'High-Speed Data', 'Modern Offices', 'Data Centers'],
        specifications: ['23 AWG Copper', '250MHz Bandwidth', '100m Max Length', 'Backward Compatible'],
        features: ['High Speed', 'Future Proof', 'Reliable Performance', 'Standard Compliant']
      }
    },
    {
      id: 'cat6-stp-lan',
      name: 'Cat6 STP LAN Cable',
      category: 'Cat6 LAN',
      image: cat6STPLan,
      price: 50,
      description: 'Shielded Cat6 cable for maximum performance and protection',
      stock: 100,
      detailedDescription: {
        applications: ['High-End Networks', 'Server Farms', 'Industrial Automation', 'Critical Systems'],
        specifications: ['23 AWG Copper', '250MHz Bandwidth', 'Individual Pair Shielding', 'Overall Shield'],
        features: ['Maximum Protection', 'Superior Performance', 'Professional Grade', 'Long Distance']
      }
    },
    {
      id: 'cat6-ftp-lan',
      name: 'Cat6 FTP LAN Cable',
      category: 'Cat6 LAN',
      image: cat6FTPLan,
      price: 42,
      description: 'Foil shielded Cat6 cable balancing performance and cost',
      stock: 110,
      detailedDescription: {
        applications: ['Corporate Networks', 'Educational Institutions', 'Healthcare', 'Government'],
        specifications: ['23 AWG Copper', '250MHz Bandwidth', 'Foil Shield', 'LSZH Available'],
        features: ['Balanced Solution', 'Good EMI Protection', 'Cost Effective', 'Easy Installation']
      }
    },
    {
      id: 'cat6-flat-lan',
      name: 'Cat6 Flat LAN Cable',
      category: 'Cat6 LAN',
      image: cat6FlatLan,
      price: 38,
      description: 'Ultra-thin Cat6 flat cable for discreet high-speed installations',
      stock: 70,
      detailedDescription: {
        applications: ['Modern Offices', 'Home Networks', 'Clean Installations', 'Tight Spaces'],
        specifications: ['26 AWG Copper', '250MHz Bandwidth', '2.5mm Thickness', 'Flexible'],
        features: ['Space Efficient', 'High Speed', 'Discreet', 'Easy Routing']
      }
    },
    {
      id: 'cat6-armored-lan',
      name: 'Cat6 Armored LAN Cable',
      category: 'Cat6 LAN',
      image: cat6ArmoredLan,
      price: 65,
      description: 'Heavy-duty armored Cat6 cable for extreme environments',
      stock: 50,
      detailedDescription: {
        applications: ['Industrial Networks', 'Outdoor Installations', 'Harsh Environments', 'Security Systems'],
        specifications: ['23 AWG Copper', '250MHz Bandwidth', 'Steel Armor', 'PE Jacket'],
        features: ['Maximum Protection', 'Rodent Proof', 'Weather Resistant', 'Long Life']
      }
    },
    {
      id: 'cat6-outdoor-lan',
      name: 'Cat6 Outdoor LAN Cable',
      category: 'Cat6 LAN',
      image: cat6OutdoorLan,
      price: 55,
      description: 'Weather-resistant Cat6 cable for outdoor high-speed networks',
      stock: 80,
      detailedDescription: {
        applications: ['Outdoor Networks', 'Campus Connections', 'Building Links', 'Aerial Installation'],
        specifications: ['23 AWG Copper', '250MHz Bandwidth', 'UV Resistant', 'Gel Filled'],
        features: ['All Weather', 'High Speed', 'UV Protection', 'Moisture Resistant']
      }
    },

    // Cat6 Patch Cords
    {
      id: 'cat6-utp-patchcord',
      name: 'Cat6 UTP Patch Cord',
      category: 'Cat6 Patch Cord',
      image: cat6UTPPatchcord,
      price: 12,
      description: 'High-performance Cat6 UTP patch cord for gigabit connections',
      stock: 280,
      detailedDescription: {
        applications: ['Gigabit Networks', 'Server Connections', 'Switch Links', 'High-Speed Data'],
        specifications: ['26 AWG Stranded', 'RJ45 Connectors', 'Gold Plated', 'Snagless Boots'],
        features: ['High Performance', 'Reliable', 'Easy Installation', 'Multiple Colors']
      }
    },
    {
      id: 'cat6-stp-patchcord',
      name: 'Cat6 STP Patch Cord',
      category: 'Cat6 Patch Cord',
      image: cat6STPPatchcord,
      price: 18,
      description: 'Shielded Cat6 patch cord for maximum performance and protection',
      stock: 200,
      detailedDescription: {
        applications: ['High-End Equipment', 'Server Rooms', 'Critical Connections', 'Professional Setups'],
        specifications: ['26 AWG Stranded', 'Shielded RJ45', 'Gold Plated', 'Molded Strain Relief'],
        features: ['Maximum Performance', 'EMI Protection', 'Professional Grade', 'Secure Connections']
      }
    },
    {
      id: 'cat6-ftp-patchcord',
      name: 'Cat6 FTP Patch Cord',
      category: 'Cat6 Patch Cord',
      image: cat6FTPPatchcord,
      price: 15,
      description: 'Foil shielded Cat6 patch cord for enhanced gigabit performance',
      stock: 240,
      detailedDescription: {
        applications: ['Corporate Networks', 'Data Centers', 'Network Equipment', 'Professional Use'],
        specifications: ['26 AWG Stranded', 'Foil Shielded', 'RJ45 Connectors', 'Flexible Cable'],
        features: ['Enhanced Performance', 'Good Protection', 'Professional', 'Reliable']
      }
    },

    // CCTV Cables
    {
      id: 'cctv-3plus1',
      name: 'CCTV 3+1 Cable',
      category: 'CCTV Cable',
      image: cctvCable3Plus1,
      price: 22,
      description: 'Composite video and power cable for CCTV installations',
      stock: 180,
      detailedDescription: {
        applications: ['CCTV Systems', 'Security Cameras', 'Surveillance', 'Video Transmission'],
        specifications: ['RG59 Coaxial', '2 Core Power', '75 Ohm Impedance', 'PE Jacket'],
        features: ['Video + Power', 'Easy Installation', 'Cost Effective', 'Reliable Transmission']
      }
    },
    {
      id: 'cctv-4plus1',
      name: 'CCTV 4+1 Cable',
      category: 'CCTV Cable',
      image: cctvCable4Plus1,
      price: 28,
      description: 'Advanced CCTV cable with additional conductors for enhanced functionality',
      stock: 150,
      detailedDescription: {
        applications: ['Advanced CCTV', 'PTZ Cameras', 'Audio/Video Systems', 'Professional Security'],
        specifications: ['RG59 Coaxial', '4 Core Power/Control', '75 Ohm Impedance', 'Shielded'],
        features: ['Multi-Function', 'PTZ Control', 'Audio Capable', 'Professional Grade']
      }
    },

    // Telephone Cable
    {
      id: 'telephone-cable',
      name: 'Telephone Cable',
      category: 'Telephone Cable',
      image: telephoneCable,
      price: 15,
      description: 'Multi-pair telephone cable for voice communication systems',
      stock: 220,
      detailedDescription: {
        applications: ['Telephone Systems', 'Intercom', 'Voice Networks', 'PBX Systems'],
        specifications: ['24 AWG Copper', 'Multi-Pair', 'Color Coded', 'PVC Jacket'],
        features: ['Voice Quality', 'Multiple Pairs', 'Easy Identification', 'Reliable']
      }
    },

    // Speaker Cable
    {
      id: 'speaker-cable',
      name: 'Speaker Cable',
      category: 'Speaker Cable',
      image: speakerCable,
      price: 18,
      description: 'High-quality speaker cable for audio systems',
      stock: 160,
      detailedDescription: {
        applications: ['Audio Systems', 'PA Systems', 'Home Theater', 'Professional Audio'],
        specifications: ['OFC Copper', 'Low Resistance', 'Flexible', 'Clear Jacket'],
        features: ['High Fidelity', 'Low Loss', 'Flexible', 'Professional Grade']
      }
    },

    // Lift Cable
    {
      id: 'lift-cable',
      name: 'Lift Cable',
      category: 'Lift Cable',
      image: liftCable,
      price: 85,
      description: 'Specialized cable for elevator and lift systems',
      stock: 40,
      detailedDescription: {
        applications: ['Elevators', 'Lifts', 'Vertical Transport', 'Building Systems'],
        specifications: ['Multi-Core', 'Flexible', 'Oil Resistant', 'High Strength'],
        features: ['Elevator Grade', 'Flexible', 'Durable', 'Safety Compliant']
      }
    },

    // Computer Power Cords
    {
      id: 'pc1',
      name: 'Desktop Power Cord',
      category: 'Computer Power Cord',
      image: desktopPowerCord,
      price: 12,
      description: 'Standard desktop computer power cord',
      stock: 300,
      detailedDescription: {
        applications: ['Desktop Computers', 'Monitors', 'Printers', 'Office Equipment'],
        specifications: ['3 Pin', '250V Rating', '10A Current', 'IEC C13 Connector'],
        features: ['Universal Fit', 'Safety Certified', 'Durable', 'Standard Length']
      }
    },
    {
      id: 'laptop-adapter-cord',
      name: 'Laptop Adapter Cord',
      category: 'Computer Power Cord',
      image: laptopAdapterCord,
      price: 15,
      description: 'Power cord for laptop adapters and chargers',
      stock: 250,
      detailedDescription: {
        applications: ['Laptop Adapters', 'Chargers', 'Power Supplies', 'Mobile Devices'],
        specifications: ['2 Pin', '250V Rating', '2.5A Current', 'Figure-8 Connector'],
        features: ['Compact Design', 'Portable', 'Universal', 'Reliable']
      }
    }
  ];

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateStock = (productId: string, newStock: number) => {
    // In a real app, this would update the backend
    console.log(`Updated stock for ${productId} to ${newStock}`);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleCheckout = (event: CustomEvent) => {
      setCheckoutData(event.detail);
      setIsCheckoutOpen(true);
    };

    window.addEventListener('checkout', handleCheckout as EventListener);
    return () => window.removeEventListener('checkout', handleCheckout as EventListener);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openComparison = () => {
    setIsComparisonOpen(true);
  };

  const closeComparison = () => {
    setIsComparisonOpen(false);
  };

  const handleClearComparison = () => {
    clearComparison();
    setIsComparisonOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />
      
      {/* Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-gray-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent">
                Premium Cables
              </span>
              <br />
              <span className="text-gray-800">for Every Need</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up leading-relaxed">
              Discover our comprehensive range of high-quality networking cables, power cords, and specialized solutions. 
              Trusted by professionals since 1997.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <button 
                onClick={() => scrollToSection('products')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold"
              >
                Explore Products
              </button>
              <button 
                onClick={() => setIsInventoryOpen(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-blue-200 text-lg font-semibold flex items-center"
              >
                <Settings className="w-5 h-5 mr-2" />
                Manage Inventory
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              Our Product Range
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From basic networking needs to specialized industrial applications, we have the right cable for every project.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Level</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <CompareButton product={product} size="sm" />
                    {product.stock < 10 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Low Stock
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="w-4 h-4 mr-1" />
                      <span>{product.stock} in stock</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              About Chhajer Cable Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn more about our journey, mission, and commitment to excellence
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
      <BusinessCredentials />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-gray-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Ready to discuss your cable requirements? Our team is here to help you find the perfect solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Our Facility</h3>
              <p className="opacity-90">A6 Jhilmil Industrial Area<br />New Delhi 110095</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="opacity-90">+91 98765 43210<br />+91 11 2345 6789</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="opacity-90">info@chhajercables.com<br />sales@chhajercables.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Floating Button */}
      <ComparisonFloatingButton onOpenComparison={openComparison} />

      {/* Product Comparison Modal */}
      <ProductComparison
        isOpen={isComparisonOpen}
        onClose={closeComparison}
        products={comparisonProducts}
        onClearComparison={handleClearComparison}
      />

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      {/* Checkout */}
      {checkoutData && (
        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={checkoutData.items}
          total={checkoutData.total}
        />
      )}

      {/* Inventory Manager */}
      <InventoryManager
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        products={products}
        onUpdateStock={updateStock}
      />
    </div>
  );
};

export default Index;