import React, { useState } from 'react';
import { Cable, ShoppingCart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Eye, X, Award, Shield, Users, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Logo from '../components/Logo';
import AboutTabs from '../components/AboutTabs';
import Checkout from '../components/Checkout';
import ServicesSection from '../components/ServicesSection';
import InventoryManager from '../components/InventoryManager';

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      name: 'Patchcords',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80',
      products: [
        { 
          id: 'pc1', 
          name: 'Cat 5e STP', 
          price: 24.99, 
          image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80',
          category: 'Patchcords',
          description: 'Shielded Twisted Pair Cat5e patchcord with excellent EMI protection. Ideal for environments with electromagnetic interference.',
          detailedDescription: {
            applications: [
              'FAST ETHERNET APPLICATIONS',
              'GIGABIT ETHERNET',
              'VOICE APPLICATIONS',
              'LAN APPLICATIONS'
            ],
            specifications: [
              'STP TYPE',
              'RJ45 PLUG',
              'PVC JACKET',
              '4 TWISTED PAIR',
              'COPPER CONDUCTOR',
              'MATERIAL OF CONDUCTOR: BARE COPPER OR TINNED COPPER OR CCA',
              'GAUGE: 23/24/25/26AWG OR CUSTOMIZED'
            ],
            features: [
              '4 TWISTED PAIRS CABLE AROUND A CROSS SHAPED CENTRAL FILLER INTO THE CABLE CORE',
              'OEM SUPPLIER',
              'LENGTHS: ALL LENGTHS AVAILABLE',
              'CUSTOMIZATION AVAILABLE',
              'ALL COLORS AVAILABLE'
            ]
          }
        },
        { 
          id: 'pc2', 
          name: 'Cat 6 FTP', 
          price: 27.99, 
          image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
          category: 'Patchcords',
          description: 'Foiled Twisted Pair Cat6 patchcord offering excellent noise protection. Perfect for data centers and enterprise networks.',
          detailedDescription: {
            applications: [
              'DATA CENTERS',
              'ENTERPRISE NETWORKS',
              'HIGH-SPEED NETWORK APPLICATIONS',
              'INDUSTRIAL ENVIRONMENTS'
            ],
            specifications: [
              'FREQUENCY: UPTO 600MHZ',
              'IMPEDANCE: 100 ±15Ω',
              'SHIELD: ALUMINUM FOIL SUPPORTED',
              'SPECIFICATION: 23/24/25/26 AWG STRANDED',
              'CONDUCTOR: CCA OR PURE COPPER',
              'INSULATION: LLDPE',
              'JACKET: PVC AND LSZH',
              'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'
            ],
            features: [
              'PASSED FLUKE TEST',
              'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED',
              'PACKING: PE BAG OR CUSTOMIZED'
            ]
          }
        },
        { 
          id: 'pc3', 
          name: 'Cat 6 UTP', 
          price: 25.99, 
          image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
          category: 'Patchcords',
          description: 'Unshielded Twisted Pair Cat6 patchcord for standard networking needs. Cost-effective solution for office environments.',
          detailedDescription: {
            applications: [
              'OFFICE ENVIRONMENTS',
              'COMMERCIAL BUILDINGS',
              'EDUCATIONAL INSTITUTIONS',
              'SMALL TO MEDIUM BUSINESSES'
            ],
            specifications: [
              'FREQUENCY: UPTO 600MHZ',
              'IMPEDANCE: 100, ±15Ω',
              'SPECIFICATION: 23/24/25/26 AWG, STRANDED',
              'CONDUCTOR: CCA OR PURE COPPER',
              'INSULATION: LLDPE',
              'JACKET: PVC AND LSZH',
              'CONNECTORS: RJ45 8P8CS PLUG, NICKEL- OR GOLD-PLATED'
            ],
            features: [
              'OEM SUPPLIERS',
              'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED',
              'PASSED FLUKE TEST',
              'PACKING: PE BAG OR CUSTOMIZED'
            ]
          }
        }
      ]
    },
    {
      id: 2,
      name: 'LAN Cables',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80',
      products: [
        { 
          id: 'lan1', 
          name: 'Cat 6A F/UTP', 
          price: 89.99, 
          image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&q=80',
          category: 'LAN Cables',
          description: 'High-performance Cat6A cable with foil shielding. Supports 10 Gigabit Ethernet over longer distances.',
          detailedDescription: {
            applications: [
              '10 GIGABIT ETHERNET',
              'DATA CENTER BACKBONE',
              'ENTERPRISE NETWORKS',
              'HIGH-BANDWIDTH APPLICATIONS'
            ],
            specifications: [
              'FREQUENCY: UP TO 500 MHZ',
              'CABLE TYPE: F/UTP',
              'CONDUCTOR: 23 AWG SOLID COPPER',
              'INSULATION: HDPE',
              'JACKET: LSZH OR PVC',
              'COMPLIANCE: TIA/EIA-568-C.2'
            ],
            features: [
              'SUPPORTS 10GBASE-T UP TO 100M',
              'EXCELLENT CROSSTALK PERFORMANCE',
              'BACKWARDS COMPATIBLE',
              'REDUCED ALIEN CROSSTALK'
            ]
          }
        },
        { 
          id: 'lan2', 
          name: 'Cat 6 UTP', 
          price: 45.99, 
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
          category: 'LAN Cables',
          description: 'Standard Cat6 UTP cable for most networking applications. Reliable performance for gigabit networks.',
          detailedDescription: {
            applications: [
              'STRUCTURED CABLING',
              'OFFICE NETWORKS',
              'RESIDENTIAL INSTALLATIONS',
              'COMMERCIAL BUILDINGS'
            ],
            specifications: [
              'FREQUENCY: UP TO 250 MHZ',
              'CONDUCTOR: 23 AWG SOLID COPPER',
              'INSULATION: HDPE',
              'JACKET: PVC OR LSZH',
              'COMPLIANCE: TIA/EIA-568-B.2-1'
            ],
            features: [
              'SUPPORTS GIGABIT ETHERNET',
              'COST-EFFECTIVE SOLUTION',
              'EASY INSTALLATION',
              'MULTIPLE JACKET OPTIONS'
            ]
          }
        }
      ]
    },
    {
      id: 3,
      name: 'CCTV Cables',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80',
      products: [
        { 
          id: 'cctv1', 
          name: 'RG59 Coaxial', 
          price: 35.99, 
          image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80',
          category: 'CCTV Cables',
          description: 'High-quality RG59 coaxial cable for analog CCTV systems. Excellent signal transmission for security applications.',
          detailedDescription: {
            applications: [
              'ANALOG CCTV SYSTEMS',
              'SECURITY CAMERAS',
              'VIDEO TRANSMISSION',
              'SURVEILLANCE NETWORKS'
            ],
            specifications: [
              'IMPEDANCE: 75 OHM',
              'CONDUCTOR: COPPER CLAD STEEL',
              'DIELECTRIC: FOAM PE',
              'SHIELD: AL-FOIL + BRAIDING',
              'JACKET: PVC'
            ],
            features: [
              'LOW SIGNAL LOSS',
              'EXCELLENT SHIELDING',
              'WEATHER RESISTANT',
              'FLEXIBLE INSTALLATION'
            ]
          }
        },
        { 
          id: 'cctv2', 
          name: 'RG6 Coaxial', 
          price: 42.99, 
          image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80',
          category: 'CCTV Cables',
          description: 'Premium RG6 coaxial cable for high-definition video transmission. Superior performance for modern security systems.',
          detailedDescription: {
            applications: [
              'HD CCTV SYSTEMS',
              'SATELLITE TV',
              'CABLE TV DISTRIBUTION',
              'HIGH-FREQUENCY APPLICATIONS'
            ],
            specifications: [
              'IMPEDANCE: 75 OHM',
              'CONDUCTOR: SOLID COPPER',
              'DIELECTRIC: GAS INJECTED FOAM',
              'SHIELD: QUAD SHIELD',
              'JACKET: PVC OR PE'
            ],
            features: [
              'HD VIDEO SUPPORT',
              'SUPERIOR SIGNAL QUALITY',
              'MOISTURE RESISTANT',
              'LONG DISTANCE CAPABILITY'
            ]
          }
        }
      ]
    },
    {
      id: 4,
      name: 'Telephone Cables',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80',
      products: [
        { 
          id: 'tel1', 
          name: '2 Pair Telephone', 
          price: 18.99, 
          image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&q=80',
          category: 'Telephone Cables',
          description: '2-pair telephone cable for basic voice communication systems. Ideal for residential and small office applications.',
          detailedDescription: {
            applications: [
              'RESIDENTIAL PHONE LINES',
              'SMALL OFFICE SYSTEMS',
              'PBXAND KEY SYSTEMS',
              'BASIC VOICE COMMUNICATION'
            ],
            specifications: [
              'PAIRS: 2',
              'CONDUCTOR: 24 AWG SOLID COPPER',
              'INSULATION: PE',
              'JACKET: PVC',
              'COLOR CODE: STANDARD'
            ],
            features: [
              'CLEAR VOICE TRANSMISSION',
              'EASY TERMINATION',
              'COST EFFECTIVE',
              'RELIABLE PERFORMANCE'
            ]
          }
        },
        { 
          id: 'tel2', 
          name: '4 Pair Telephone', 
          price: 29.99, 
          image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80',
          category: 'Telephone Cables',
          description: '4-pair telephone cable for multi-line phone systems. Suitable for business environments requiring multiple lines.',
          detailedDescription: {
            applications: [
              'MULTI-LINE PHONE SYSTEMS',
              'BUSINESS ENVIRONMENTS',
              'PBX INSTALLATIONS',
              'COMMERCIAL BUILDINGS'
            ],
            specifications: [
              'PAIRS: 4',
              'CONDUCTOR: 24 AWG SOLID COPPER',
              'INSULATION: PE',
              'JACKET: PVC OR PLENUM',
              'COMPLIANCE: FCC PART 68'
            ],
            features: [
              'MULTIPLE LINE SUPPORT',
              'BUSINESS GRADE QUALITY',
              'PLENUM RATED OPTIONS',
              'STANDARD COLOR CODING'
            ]
          }
        }
      ]
    },
    {
      id: 5,
      name: 'Power Cables',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80',
      products: [
        { 
          id: 'pow1', 
          name: '16 AWG Power', 
          price: 52.99, 
          image: 'https://images.unsplash.com/photo-1562259820-14d53c82d5d0?auto=format&fit=crop&q=80',
          category: 'Power Cables',
          description: 'Heavy-duty 16 AWG power cable for electrical installations. Suitable for various power distribution applications.',
          detailedDescription: {
            applications: [
              'ELECTRICAL INSTALLATIONS',
              'POWER DISTRIBUTION',
              'CONTROL PANELS',
              'INDUSTRIAL EQUIPMENT'
            ],
            specifications: [
              'GAUGE: 16 AWG',
              'CONDUCTOR: STRANDED COPPER',
              'INSULATION: XLPE',
              'JACKET: PVC',
              'VOLTAGE RATING: 600V'
            ],
            features: [
              'HIGH CURRENT CAPACITY',
              'FLEXIBLE DESIGN',
              'HEAT RESISTANT',
              'UL LISTED'
            ]
          }
        },
        { 
          id: 'pow2', 
          name: '12 AWG Power', 
          price: 78.99, 
          image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80',
          category: 'Power Cables',
          description: 'High-capacity 12 AWG power cable for demanding electrical applications. Ideal for heavy-duty power distribution.',
          detailedDescription: {
            applications: [
              'HEAVY-DUTY POWER DISTRIBUTION',
              'INDUSTRIAL MACHINERY',
              'ELECTRICAL PANELS',
              'HIGH-CURRENT APPLICATIONS'
            ],
            specifications: [
              'GAUGE: 12 AWG',
              'CONDUCTOR: STRANDED COPPER',
              'INSULATION: THHN/THWN',
              'JACKET: NYLON',
              'VOLTAGE RATING: 600V'
            ],
            features: [
              'MAXIMUM CURRENT CAPACITY',
              'INDUSTRIAL GRADE',
              'MOISTURE RESISTANT',
              'NEC COMPLIANT'
            ]
          }
        }
      ]
    },
    {
      id: 6,
      name: 'Fiber Optic',
      image: 'https://images.unsplash.com/photo-1527359443928-d4d64b548d0e?auto=format&fit=crop&q=80',
      products: [
        { 
          id: 'fiber1', 
          name: 'Single Mode OS2', 
          price: 125.99, 
          image: 'https://images.unsplash.com/photo-1516139008210-96e45dccd83b?auto=format&fit=crop&q=80',
          category: 'Fiber Optic',
          description: 'High-performance single mode OS2 fiber optic cable for long-distance, high-bandwidth applications.',
          detailedDescription: {
            applications: [
              'LONG-DISTANCE TRANSMISSION',
              'TELECOMMUNICATIONS',
              'DATA CENTER INTERCONNECTS',
              'METROPOLITAN NETWORKS'
            ],
            specifications: [
              'TYPE: SINGLE MODE OS2',
              'CORE: 9/125 μm',
              'ATTENUATION: ≤0.4 dB/km @ 1310nm',
              'JACKET: LSZH',
              'COMPLIANCE: ITU-T G.652.D'
            ],
            features: [
              'ULTRA LOW LOSS',
              'LONG TRANSMISSION DISTANCE',
              'HIGH BANDWIDTH',
              'BEND INSENSITIVE'
            ]
          }
        },
        { 
          id: 'fiber2', 
          name: 'Multimode OM4', 
          price: 89.99, 
          image: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476?auto=format&fit=crop&q=80',
          category: 'Fiber Optic',
          description: 'OM4 multimode fiber cable optimized for high-speed short to medium distance applications.',
          detailedDescription: {
            applications: [
              'DATA CENTERS',
              'LAN BACKBONES',
              'CAMPUS NETWORKS',
              'HIGH-SPEED ETHERNET'
            ],
            specifications: [
              'TYPE: MULTIMODE OM4',
              'CORE: 50/125 μm',
              'BANDWIDTH: 4700 MHz·km @ 850nm',
              'JACKET: OFNR',
              'COMPLIANCE: IEC 60793-2-10'
            ],
            features: [
              '40G/100G SUPPORT',
              'OPTIMIZED FOR 850nm',
              'BACKWARD COMPATIBLE',
              'LOW BEND LOSS'
            ]
          }
        }
      ]
    }
  ];

  const [products, setProducts] = useState<Product[]>(() => {
    // Initialize products with stock levels
    return categories.flatMap(category => 
      category.products.map(product => ({
        ...product,
        stock: Math.floor(Math.random() * 100) + 10 // Random stock between 10-110
      }))
    );
  });

  const addToCart = (product: Product) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (!currentProduct || currentProduct.stock <= 0) {
      alert('Sorry, this product is out of stock!');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= currentProduct.stock) {
          alert(`Sorry, only ${currentProduct.stock} items available in stock!`);
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...currentProduct, quantity: 1 }];
    });

    // Update stock
    setProducts(prev => prev.map(p => 
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));
  };

  const removeFromCart = (productId: string) => {
    const removedItem = cartItems.find(item => item.id === productId);
    if (removedItem) {
      // Restore stock
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, stock: p.stock + removedItem.quantity } : p
      ));
    }
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const currentItem = cartItems.find(item => item.id === productId);
    const currentProduct = products.find(p => p.id === productId);
    
    if (!currentItem || !currentProduct) return;

    const quantityDiff = newQuantity - currentItem.quantity;
    
    if (quantityDiff > 0 && quantityDiff > currentProduct.stock) {
      alert(`Sorry, only ${currentProduct.stock} more items available in stock!`);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Update stock
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: p.stock - quantityDiff } : p
    ));
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const ProductDetailModal = ({ product, onClose }: { product: Product | null; onClose: () => void }) => {
    if (!product || !product.detailedDescription) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-gray-600 z-10 px-8 py-6 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-3xl font-bold text-white">{product.name}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/20">
              <X className="w-7 h-7" />
            </button>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg border">
                  <img 
                    src={product.id === 'pc1' ? '/image-copy.png' : product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-6 border border-blue-200">
                  <p className="text-2xl font-bold text-blue-900 mb-4">Price: ${product.price}</p>
                  <p className="text-lg font-medium text-gray-700 mb-4">Stock: {product.stock || 0} units</p>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-gray-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-gray-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg transform hover:scale-105"
                    disabled={!product.stock}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>{product.stock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-gray-500 rounded-full mr-3"></span>
                    Applications
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {product.detailedDescription.applications.map((app, index) => (
                      <li key={index} className="flex items-start">
                        <Cable className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-gray-500 to-blue-500 rounded-full mr-3"></span>
                    Specifications
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {product.detailedDescription.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-3 h-3 bg-gradient-to-r from-gray-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-gray-500 rounded-full mr-3"></span>
                    Features
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {product.detailedDescription.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-gray-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />
      
      {/* Hero Section */}
      <div id="home" className="relative h-[600px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80")' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-gray-900/70 to-blue-800/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-white max-w-4xl text-center">
            <div className="mb-10 animate-fade-in flex justify-center">
              <Logo className="h-28" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-gray-100 bg-clip-text text-transparent leading-tight">
              Chhajer Cable Industries
            </h1>
            
            {/* CCI Acronym - Centered */}
            <div className="mb-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="flex items-center space-x-6">
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-300">C</div>
                    <div className="text-sm text-gray-200">Committed</div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-300">C</div>
                    <div className="text-sm text-gray-200">Credible</div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-300">I</div>
                    <div className="text-sm text-gray-200">Innovators</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-blue-200 font-medium mb-4">Quality Cables Since 1997</p>
            <p className="text-xl md:text-2xl leading-relaxed animate-slide-up mx-auto font-light">
              With over two decades of excellence, we stand as a premier manufacturer of high-quality cables and networking solutions. Based in Delhi, we specialize in producing a comprehensive range of cables including LAN, CCTV, telephone, and specialized industrial cables. Our commitment to quality, innovation, and customer satisfaction has made us a trusted name in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality cables and networking solutions
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl'
                : 'bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-400 hover:text-blue-700 shadow-lg'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl'
                  : 'bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-400 hover:text-blue-700 shadow-lg'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className={`grid gap-8 ${selectedCategory === null ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'}`}>
          {categories.filter(category => selectedCategory === null || category.id === selectedCategory).map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className={selectedCategory === null ? "p-8" : "p-10"}>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">{category.name}</h3>
                <div className={selectedCategory === null ? "space-y-4" : "space-y-6"}>
                  {category.products.map((product) => {
                    const currentProduct = products.find(p => p.id === product.id);
                    return (
                      <div 
                        key={product.id} 
                        className="border-b border-gray-100 pb-4 relative"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className={selectedCategory === null ? "flex flex-col space-y-3" : "flex items-center justify-between"}>
                          <div className="flex items-center">
                            <Cable className={selectedCategory === null ? "w-4 h-4 mr-2 text-blue-600" : "w-6 h-6 mr-4 text-blue-600"} />
                            <span className={selectedCategory === null ? "font-medium text-gray-800 text-sm" : "font-semibold text-gray-800 text-lg"}>{product.name}</span>
                          </div>
                          <div className={selectedCategory === null ? "flex items-center justify-between w-full" : "flex items-center space-x-4"}>
                            <span className={selectedCategory === null ? "text-base font-bold text-blue-600" : "text-xl font-bold text-blue-600"}>${product.price}</span>
                            <div className="flex items-center space-x-2">
                              {product.detailedDescription && (
                                <button
                                  onClick={() => setSelectedProduct(currentProduct || null)}
                                  className={selectedCategory === null 
                                    ? "bg-gradient-to-r from-gray-100 to-blue-50 text-gray-700 py-1.5 px-3 rounded-md hover:from-blue-50 hover:to-gray-100 hover:text-blue-700 transition-all duration-300 flex items-center font-medium border border-gray-200 text-xs"
                                    : "bg-gradient-to-r from-gray-100 to-blue-50 text-gray-700 py-3 px-6 rounded-lg hover:from-blue-50 hover:to-gray-100 hover:text-blue-700 transition-all duration-300 flex items-center font-medium border border-gray-200 text-base"
                                  }
                                >
                                  <Eye className={selectedCategory === null ? "w-3 h-3 mr-1" : "w-5 h-5 mr-2"} />
                                  View
                                </button>
                              )}
                              <button
                                onClick={() => currentProduct && addToCart(currentProduct)}
                                className={selectedCategory === null
                                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1.5 px-3 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                                }
                                disabled={!currentProduct?.stock}
                              >
                                <ShoppingCart className={selectedCategory === null ? "w-3 h-3 mr-1" : "w-5 h-5 mr-2"} />
                                {selectedCategory === null ? "Add" : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                        {hoveredProduct === product.id && (
                          <div className="absolute z-20 bg-white border border-gray-200 shadow-xl rounded-xl p-4 mt-3 w-full left-0 backdrop-blur-sm">
                            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <AboutTabs />
      </div>

      {/* Services Section */}
      <div id="services" className="py-20">
        <ServicesSection />
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gradient-to-br from-blue-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to discuss your cable requirements? Contact us today for expert guidance and competitive pricing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Phone className="w-12 h-12 text-blue-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Phone</h3>
              <p className="text-gray-300 mb-4">Call us for immediate assistance</p>
              <p className="text-xl font-semibold text-blue-300">+91 9811234567</p>
              <p className="text-lg text-blue-300">+91 9876543210</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Mail className="w-12 h-12 text-blue-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Email</h3>
              <p className="text-gray-300 mb-4">Send us your detailed requirements</p>
              <p className="text-xl font-semibold text-blue-300">info@chhajercables.com</p>
              <p className="text-lg text-blue-300">sales@chhajercables.com</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <MapPin className="w-12 h-12 text-blue-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Address</h3>
              <p className="text-gray-300 mb-4">Visit our manufacturing facility</p>
              <p className="text-lg text-blue-300 leading-relaxed">
                A6 Jhilmil Industrial Area<br />
                New Delhi 110095<br />
                India
              </p>
            </div>
          </div>

          {/* Business Credentials Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Business Credentials</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Trusted certifications and compliance for your peace of mind
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <Shield className="w-10 h-10 text-blue-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">ISO 9001:2015</h4>
                <p className="text-gray-300 text-sm">Quality Management</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <Award className="w-10 h-10 text-blue-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">BIS Certified</h4>
                <p className="text-gray-300 text-sm">Safety Standards</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <Users className="w-10 h-10 text-blue-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">500+ Customers</h4>
                <p className="text-gray-300 text-sm">Happy Clients</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <TrendingUp className="w-10 h-10 text-blue-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">27+ Years</h4>
                <p className="text-gray-300 text-sm">Experience</p>
              </div>
            </div>

            {/* Banking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-4">Company Registration</h4>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Company:</strong> Chhajer Cable Industries Pvt. Ltd.</p>
                  <p><strong>CIN:</strong> U31300DL1997PTC087654</p>
                  <p><strong>GST:</strong> 07AABCC1234D1Z5</p>
                  <p><strong>Established:</strong> March 15, 1997</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-4">Banking Details</h4>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Bank:</strong> State Bank of India</p>
                  <p><strong>Branch:</strong> Jhilmil Industrial Area</p>
                  <p><strong>Account Type:</strong> Current Account</p>
                  <p><strong>IFSC Code:</strong> SBIN0001234</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Logo className="h-10 mr-3" />
                <h3 className="text-xl font-bold">Chhajer Cable Industries</h3>
              </div>
              <p className="text-gray-400">
                Quality cables and networking solutions since 1997. Trusted by businesses worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('products')} className="text-gray-400 hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>LAN Cables</li>
                <li>CCTV Cables</li>
                <li>Patchcords</li>
                <li>Fiber Optic</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Chhajer Cable Industries. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals and overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
      />
      
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <InventoryManager 
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        products={products}
        onUpdateStock={(productId, newStock) => {
          setProducts(prev => prev.map(p => 
            p.id === productId ? { ...p, stock: newStock } : p
          ));
        }}
      />
    </div>
  );
};

export default Index;