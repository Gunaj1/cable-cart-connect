import React, { useState } from 'react';
import { Cable, ShoppingCart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Eye, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Logo from '../components/Logo';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
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
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ProductDetailModal = ({ product, onClose }: { product: Product | null; onClose: () => void }) => {
    if (!product || !product.detailedDescription) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-slate-600 to-gray-600 z-10 px-8 py-6 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-3xl font-bold text-white">{product.name}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/20">
              <X className="w-7 h-7" />
            </button>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Product Image Section */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl overflow-hidden shadow-lg border">
                  <img 
                    src={product.id === 'pc1' ? '/image-copy.png' : product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900 mb-4">Price: ${product.price}</p>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-slate-600 to-gray-600 text-white py-3 px-6 rounded-xl hover:from-slate-700 hover:to-gray-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg transform hover:scale-105"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full mr-3"></span>
                    Applications
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {product.detailedDescription.applications.map((app, index) => (
                      <li key={index} className="flex items-start">
                        <Cable className="w-6 h-6 text-slate-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-gray-500 to-zinc-500 rounded-full mr-3"></span>
                    Specifications
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-zinc-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {product.detailedDescription.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-3 h-3 bg-gradient-to-r from-gray-500 to-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-zinc-500 to-slate-500 rounded-full mr-3"></span>
                    Features
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {product.detailedDescription.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-3 h-3 bg-gradient-to-r from-zinc-500 to-slate-500 rounded-full mt-2 mr-3 flex-shrink-0" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />
      
      {/* Hero Section */}
      <div id="home" className="relative h-[600px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80")' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/70 to-zinc-900/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-white max-w-4xl text-center">
            <div className="mb-10 animate-fade-in flex justify-center">
              <Logo className="h-28" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-slate-100 to-gray-100 bg-clip-text text-transparent leading-tight">
              Chhajer Cable Industries
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed animate-slide-up mx-auto font-light">
              With over two decades of excellence, we stand as a premier manufacturer of high-quality cables and networking solutions. Based in Delhi, we specialize in producing a comprehensive range of cables including LAN, CCTV, telephone, and specialized industrial cables. Our commitment to quality, innovation, and customer satisfaction has made us a trusted name in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 via-gray-700 to-zinc-700 bg-clip-text text-transparent mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality cables and networking solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">{category.name}</h3>
                <div className="space-y-5">
                  {category.products.map((product) => (
                    <div 
                      key={product.id} 
                      className="border-b border-gray-100 pb-5 relative"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Cable className="w-5 h-5 mr-3 text-slate-600" />
                          <span className="font-semibold text-gray-800">{product.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-slate-600">${product.price}</span>
                          {product.detailedDescription && (
                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 py-2 px-4 rounded-lg hover:from-slate-100 hover:to-gray-200 hover:text-slate-700 transition-all duration-300 flex items-center font-medium"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Details
                            </button>
                          )}
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-gradient-to-r from-slate-600 to-gray-600 text-white py-2 px-4 rounded-lg hover:from-slate-700 hover:to-gray-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-105"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      {hoveredProduct === product.id && (
                        <div className="absolute z-20 bg-white border border-gray-200 shadow-xl rounded-xl p-4 mt-3 w-full left-0 backdrop-blur-sm">
                          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-gradient-to-br from-white to-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 via-gray-700 to-zinc-700 bg-clip-text text-transparent mb-4">
              About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Two decades of excellence in cable manufacturing
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl">
                  Founded in 2000, Chhajer Cable Industries has grown to become one of India's leading manufacturers of high-quality cables and networking solutions. Our state-of-the-art manufacturing facility in Delhi is equipped with the latest technology and staffed by skilled professionals who ensure that every product meets the highest standards of quality and reliability.
                </p>
                <p className="text-xl">
                  We take pride in our comprehensive range of products that cater to various sectors including IT, telecommunications, security systems, and industrial applications. Our commitment to innovation and quality has earned us the trust of countless customers across the country.
                </p>
                <p className="text-xl">
                  At Chhajer Cable Industries, we believe in building lasting relationships with our customers through excellent service, competitive pricing, and unwavering support. Our team of experts is always ready to assist you in finding the perfect solution for your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300">
              We're here to help with all your cable needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <p className="flex items-center text-lg">
                  <Phone className="w-6 h-6 mr-3 text-slate-400" />
                  +91 98765 43210
                </p>
                <p className="flex items-center text-lg">
                  <Mail className="w-6 h-6 mr-3 text-slate-400" />
                  info@chhajercables.com
                </p>
                <p className="flex items-center text-lg">
                  <MapPin className="w-6 h-6 mr-3 text-slate-400" />
                  Industrial Area, Delhi, India
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-slate-600 transition-all duration-300 transform hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-slate-600 transition-all duration-300 transform hover:scale-110">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-slate-600 transition-all duration-300 transform hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white/20 rounded-xl hover:bg-slate-600 transition-all duration-300 transform hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-2 text-lg">
                <p>Monday - Saturday</p>
                <p className="text-slate-400 font-semibold">9:00 AM - 6:00 PM</p>
                <p>Sunday</p>
                <p className="text-gray-400">Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

const categories = [
  {
    id: 1,
    name: 'Patchcords',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80',
    products: [
      { 
        id: 'pc1', 
        name: 'Cat 6 STP', 
        price: 29.99, 
        image: '/image-copy.png',
        category: 'Patchcords',
        description: 'Shielded Twisted Pair Cat6 patchcord with enhanced EMI protection, ideal for high-interference environments. Supports speeds up to 10Gbps.',
        detailedDescription: {
          applications: [
            'LAN NETWORK SYSTEM',
            'COMPUTER NETWORK DISTRIBUTING SYSTEM',
            'TELECOMMUNICATION NETWORK SYSTEM',
            'TESTING EQUIPMENT SYSTEM',
            'CATV SYSTEM'
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
      },
      { 
        id: 'pc4', 
        name: 'Cat 5e STP', 
        price: 24.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Patchcords',
        description: 'Shielded Cat5e patchcord with reliable performance and EMI protection. Supports speeds up to 1Gbps.',
        detailedDescription: {
          applications: [
            'ENTERPRISE NETWORKS',
            'DATA CENTERS',
            'INDUSTRIAL ENVIRONMENTS',
            'HIGH-INTERFERENCE AREAS'
          ],
          specifications: [
            'FREQUENCY: UPTO 600MHZ',
            'LENGTH: 0.1 MTR TO 100 MTR',
            'RJ45, 8P8C, 2 FORK 50µ" GOLD PLATED CONTACTS',
            'SHIELDED PLUG BOOT CABLE ASSEMBLIES'
          ],
          features: [
            'AVAILABLE IN LSZH JACKET- REDUCED TOXIC GASSES EMITTED DURING COMBUSTION',
            '100% FACTORY TESTED',
            'PROVIDES BETTER MECHANICAL PROPERTIES',
            'AVAILABLE IN 5 DIFFERENT JACKET COLORS',
            'CUSTOMIZATION AVAILABLE'
          ]
        }
      },
      { 
        id: 'pc5', 
        name: 'Cat5e FTP', 
        price: 22.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Patchcords',
        description: 'Foiled Cat5e patchcord with overall shield for noise reduction. Ideal for small business networks.',
        detailedDescription: {
          applications: [
            'SMALL BUSINESS NETWORKS',
            'EDUCATIONAL INSTITUTIONS',
            'OFFICE ENVIRONMENTS',
            'MEDIUM-INTERFERENCE AREAS'
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
            'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED',
            'PASSED FLUKE TEST',
            'PACKING: PE BAG OR CUSTOMIZED'
          ]
        }
      },
      { 
        id: 'pc6', 
        name: 'Cat5e UTP', 
        price: 20.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Patchcords',
        description: 'Standard Cat5e patchcord for basic networking needs. Perfect for home and small office use.',
        detailedDescription: {
          applications: [
            'HOME NETWORKS',
            'SMALL OFFICE NETWORKS',
            'BASIC DATA TRANSMISSION',
            'GENERAL NETWORKING'
          ],
          specifications: [
            'FREQUENCY: UPTO 600MHZ',
            'LENGTH: 0.1 MTR TO 100 MTR',
            'RJ45, 8P8C, 2 FORK 50µ" GOLD PLATED CONTACTS',
            'SHIELDED PLUG BOOT CABLE ASSEMBLIES'
          ],
          features: [
            'AVAILABLE IN LSZH JACKET- REDUCED TOXIC GASSES EMITTED DURING COMBUSTION',
            '100% FACTORY TESTED',
            'PROVIDES BETTER MECHANICAL PROPERTIES',
            'AVAILABLE IN 5 DIFFERENT JACKET COLORS',
            'CUSTOMIZATION AVAILABLE'
          ]
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Cat5e LAN Cables',
    image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
    products: [
      { 
        id: 'lan1', 
        name: 'Cat 5e Flat', 
        price: 35.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Ultra-thin flat design for easy installation under carpets and along walls. Perfect for home networking.',
        detailedDescription: {
          applications: [
            '1000 BASE T GIGABIT 100 MBPS',
            '100 BASE-TX',
            'TPDDI. 155 MBPS ATM',
            'HOME AND OFFICE NETWORKS',
            'UNDER CARPET INSTALLATIONS'
          ],
          specifications: [
            'FREQUENCY: UPTO 600 MHZ',
            'CHARACTERISTIC IMPEDANCE: 1 TO 100 MHZ: 100Ω±15%',
            'F. SPEED: ≥0,69',
            'CONDUCTOR RESISTANCE AT 20ºC: 149 Ω/KM ± 5%',
            'MAXIMUM VOLTAGE: AC 49 V',
            'LENGTH: 100MTR/305MTR'
          ],
          features: [
            'OEM SUPPLIERS',
            'ELECTRICAL FEATURES OPTIMIZED',
            'CUSTOMIZATION AVAILABLE',
            'ALL COLORS AVAILABLE',
            'SPEED: 1000 MBPS'
          ]
        }
      },
      { 
        id: 'lan2', 
        name: 'Cat5e 2 pair', 
        price: 32.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Economical 2-pair solution for voice and basic data applications. Ideal for telephone systems.',
        detailedDescription: {
          applications: [
            'VOICE COMMUNICATION SYSTEMS',
            'BASIC DATA APPLICATIONS',
            'TELEPHONE SYSTEMS',
            'ECONOMICAL NETWORK SOLUTIONS',
            'POE APPLICATIONS'
          ],
          specifications: [
            'JACKET: PVC, LLDPE',
            'INSULATION: SPECIAL PE POLYOLEFIN, WHGN/GN, WHOG/OG',
            'SHIELDING: SF/UTP (OVERALL TINNED COPPER BRAID SHIELD, UNSHIELDED TWISTED PAIR)',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'CUSTOMIZATION AVAILABLE',
            'ALL COLORS AVAILABLE',
            'COST-EFFECTIVE SOLUTION',
            'RELIABLE PERFORMANCE'
          ]
        }
      },
      { 
        id: 'lan3', 
        name: 'Cat 5e Armored', 
        price: 45.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Heavy-duty armored cable for underground and outdoor installations. Excellent rodent protection.',
        detailedDescription: {
          applications: [
            'UNDERGROUND INSTALLATIONS',
            'OUTDOOR APPLICATIONS',
            'INDUSTRIAL ENVIRONMENTS',
            'DIRECT BURIAL APPLICATIONS',
            'RODENT PROTECTION AREAS'
          ],
          specifications: [
            'HEAVY 23/24/25/26 COPPER & CCA GAUGE',
            'EC GRADE COPPER',
            '0.8 MM ALUMINIUM ROD',
            'INTERNATIONAL STANDARD TWISTING',
            'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)',
            'LENGTH: 100MTR/305MTR'
          ],
          features: [
            'OEM SUPPLIERS',
            'DCM TESTED',
            'FLUKE TESTED',
            'F.R FRESH HIGH QUALITY PVC',
            'SPEED: 1000 MBPS',
            'CUSTOMIZATION AVAILABLE',
            'ALL COLORS AVAILABLE'
          ]
        }
      },
      { 
        id: 'lan4', 
        name: 'Cat 5e FTP', 
        price: 38.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Foiled cable with overall shield for superior noise immunity. Perfect for industrial environments.',
        detailedDescription: {
          applications: [
            'INDUSTRIAL ENVIRONMENTS',
            'EMI SENSITIVE AREAS',
            'COMMERCIAL BUILDINGS',
            'HIGH-INTERFERENCE LOCATIONS',
            'PROFESSIONAL NETWORKS'
          ],
          specifications: [
            'FREQUENCY: 1 TO 500MHZ',
            'IMPEDANCE: 100 ±15Ω',
            'SHIELD: ALUMINUM FOIL SUPPORTED',
            'SPECIFICATION: 23/24/25/26 AWG STRANDED',
            'CONDUCTOR: CCA OR PURE COPPER',
            'INSULATION: LLDPE',
            'JACKET: PVC AND LSZH'
          ],
          features: [
            'OEM SUPPLIERS',
            'CUSTOMIZED LENGTHS AND COLORS ARE ACCEPTED',
            'PASSED FLUKE TEST',
            'PACKING: PE BAG OR CUSTOMIZED',
            'SUPERIOR NOISE IMMUNITY'
          ]
        }
      },
      { 
        id: 'lan5', 
        name: 'Cat 5e STP', 
        price: 36.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Individually shielded pairs for maximum protection against crosstalk and interference.',
        detailedDescription: {
          applications: [
            'NETWORK ADAPTERS',
            'HUBS, SWITCHES, ROUTERS',
            'DSL/CABLE MODEMS',
            'PATCH PANELS',
            'COMPUTER NETWORKING APPLICATIONS'
          ],
          specifications: [
            'FTP SHIELDED TWIST PAIR',
            'CM TYPE PVC JACKET',
            '23/24/25/26 AWG 4PAIR STRANDED COPPER WIRE/ CCA WIRE',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'DESIGNED FOR NETWORK ADAPTERS',
            'ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE',
            'MAXIMUM CROSSTALK PROTECTION'
          ]
        }
      },
      { 
        id: 'lan6', 
        name: 'Cat 5e UTP', 
        price: 34.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Standard unshielded cable for general networking needs. Cost-effective solution for office installations.',
        detailedDescription: {
          applications: [
            'GENERAL NETWORKING',
            'OFFICE INSTALLATIONS',
            'ENHANCED CATEGORY 5 (1,000 BASE-T)',
            'ETHERNET STANDARD APPLICATIONS',
            'COMMERCIAL BUILDINGS'
          ],
          specifications: [
            'COMPLIANT WITH ETHERNET STANDARD',
            'TRANSMISSION SPEED OF 1,000 MBPS (1 GBPS)',
            'FLAT TYPE COMPLIANT WITH ENHANCED CATEGORY 5',
            'ULTRA-RIBBON CABLE WITH THICKNESS OF 1.4 MM AND WIDTH OF 8 MM',
            'CABLE STRUCTURE: STRANDED WIRE TWISTED PAIR',
            'LENGTH: 100MTR/305MTR'
          ],
          features: [
            'OEM SUPPLIERS',
            'STRAIGHT-THROUGH CABLE USING ALL 4 PAIRS OF WIRES',
            'CUSTOMIZATION AVAILABLE',
            'SPEED: 1000 MBPS',
            'ALL COLORS AVAILABLE'
          ]
        }
      },
      { 
        id: 'lan7', 
        name: 'Cat 5e Outdoor', 
        price: 42.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'UV-resistant and waterproof design for outdoor installations. Suitable for direct burial.',
        detailedDescription: {
          applications: [
            'OUTDOOR INSTALLATIONS',
            'DIRECT BURIAL APPLICATIONS',
            'WEATHER-RESISTANT NETWORKING',
            'CAMPUS NETWORKS',
            'OUTDOOR SECURITY SYSTEMS'
          ],
          specifications: [
            '23/24/25/26 AWG 4-PAIR, SOLID BARE COPPER CONDUCTORS/ CCA WIRE',
            'OVERALL ALUMINUM FOIL SHIELD – F/UTP',
            'BANDWIDTH TESTED UP TO 600 MHZ',
            'SUPPORTS POE++ (802.3BT) 4PPOE, UP TO 90W',
            'NOT RATED FOR DIRECT BURIAL',
            'LENGTH: 100MTR/305MTR'
          ],
          features: [
            'OEM SUPPLIERS',
            'SPEED: 1000 MBPS',
            'CUSTOMIZATION AVAILABLE',
            'ALL COLORS AVAILABLE',
            'UV-RESISTANT DESIGN',
            'WATERPROOF CONSTRUCTION'
          ]
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Cat 6 LAN Cable',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
    products: [
      { 
        id: 'cat1', 
        name: 'Cat 6 Flat', 
        price: 45.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Low-profile flat design Cat6 cable for discrete installations. Supports 10Gbps up to 55 meters.',
        detailedDescription: {
          applications: [
            'DISCRETE INSTALLATIONS',
            'UNDER CARPET WIRING',
            'ALONG WALLS',
            'HIGH-SPEED DATA TRANSMISSION'
          ],
          specifications: [
            'UNBREAKABLE OUTER JACKET',
            '7/36 EC GRADE COPPER',
            'HEAT PROOF INNER CORE',
            'EXCELLENT SIGNAL CHARACTERISTICS',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE',
            'SUPERIOR SIGNAL QUALITY',
            'DURABLE CONSTRUCTION'
          ]
        }
      },
      { 
        id: 'cat2', 
        name: 'Cat 6 Armored', 
        price: 55.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Double-jacketed armored Cat6 cable for harsh environments. Superior physical protection.',
        detailedDescription: {
          applications: [
            'HARSH ENVIRONMENTS',
            'OUTDOOR INSTALLATIONS',
            'INDUSTRIAL APPLICATIONS',
            'UNDERGROUND INSTALLATIONS'
          ],
          specifications: [
            'HEAVY 23/24/25/26 COPPER GAUGE / CCA WIRES',
            'EC GRADE COPPER',
            '0.8 MM ALUMINIUM ROD',
            'INTERNATIONAL STANDARD TWISTING',
            'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'DCM TESTED',
            'FLUKE TESTED',
            'F.R FRESH HIGH QUALITY PVC',
            'ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE'
          ]
        }
      },
      { 
        id: 'cat3', 
        name: 'Cat 6 STP', 
        price: 48.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Shielded Cat6 cable with individual pair shielding. Excellent for high-speed data centers.',
        detailedDescription: {
          applications: [
            'HIGH-SPEED DATA CENTERS',
            'INDUSTRIAL ENVIRONMENTS',
            'EMI SENSITIVE AREAS',
            'PROFESSIONAL NETWORKS'
          ],
          specifications: [
            '80 WIRE ALOE SHIELDED',
            '42 MICRON ALUMINIUM FOIL',
            'OUTER LD PVC (WEATHER AND TEMPERATURE PROOF)',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'DCM TESTED',
            'FLUKE TESTED',
            'F.R FRESH HIGH QUALITY PVC',
            'ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE'
          ]
        }
      },
      { 
        id: 'cat4', 
        name: 'Cat 6 FTP', 
        price: 46.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Foiled Cat6 cable with overall shield. Ideal for commercial and industrial applications.',
        detailedDescription: {
          applications: [
            'COMMERCIAL APPLICATIONS',
            'INDUSTRIAL ENVIRONMENTS',
            'OFFICE NETWORKS',
            'DATA TRANSMISSION'
          ],
          specifications: [
            'WEATHER PROOF DOUBLE JACKET',
            '23/24/25/26 EC GRADE COPPER/ CCA',
            '42 MICRON ALUMINIUM FOIL',
            'INTERNATIONAL STANDARD TWISTING',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'DCM TESTED',
            'FLUKE TESTED',
            'F.R FRESH HIGH QUALITY PVC',
            'ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE'
          ]
        }
      },
      { 
        id: 'cat5', 
        name: 'Cat 6 UTP', 
        price: 44.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Standard Cat6 unshielded cable. Perfect for modern office networks requiring higher bandwidth.',
        detailedDescription: {
          applications: [
            'OFFICE NETWORKS',
            'VIDEO & DATA APPLICATIONS',
            'COMMERCIAL BUILDINGS',
            'GENERAL NETWORKING'
          ],
          specifications: [
            'CAT 6 UTP IS OUR LAN CABLES RANGE',
            '23/24/25/26 AWG, COPPER/CCA WIRE',
            'DESIGNED TO DELIVER MAXIMUM PERFORMANCE FOR VIDEO & DATA APPLICATIONS',
            'TWISTED PAIRS HELP TRANSMIT TRUE SIGNALS & REDUCE TRANSMISSION LOSSES',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE',
            'MAXIMUM PERFORMANCE',
            'REDUCED TRANSMISSION LOSSES'
          ]
        }
      },
      { 
        id: 'cat6', 
        name: 'Cat 6 Outdoor', 
        price: 52.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Weather-resistant Cat6 cable for outdoor installations. UV-protected and waterproof design.',
        detailedDescription: {
          applications: [
            '10 BASE T',
            '100 BASE T',
            '1000 BASE-TX',
            'TP-PMD',
            '100 MBPS CDDI',
            'ATM 155',
            '4/16 MBPS TOKEN RING',
            'SUITABLE FOR OUTDOOR APPLICATION',
            'INDOOR /OUTDOOR APPLICATIONS'
          ],
          specifications: [
            'LDPE SHEATH FACILITATES INDOOR/OUTDOOR APPLICATIONS',
            'LENGTH: 100MTR/305MTR',
            'SPEED: 1000 MBPS'
          ],
          features: [
            'OEM SUPPLIERS',
            'ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE',
            'WEATHER RESISTANT',
            'UV PROTECTED'
          ]
        }
      }
    ]
  },
  {
    id: 4,
    name: 'CCTV Cable',
    image: 'https://images.unsplash.com/photo-1557317605-47b7e98862e8?auto=format&fit=crop&q=80',
    products: [
      { 
        id: 'cctv1', 
        name: 'CCTV Cable 3+1', 
        price: 29.99, 
        image: 'https://images.unsplash.com/photo-1557317605-47b7e98862e8?auto=format&fit=crop&q=80',
        category: 'CCTV Cable',
        description: 'Combined power and video cable with 3 copper conductors and 1 coaxial core. Perfect for analog CCTV systems.',
        detailedDescription: {
          applications: [
            'CCTV SURVEILLANCE CAMERAS',
            'DVR AND NVR CONNECTIONS',
            'PC BASED SYSTEMS',
            'SECURITY SYSTEMS'
          ],
          specifications: [
            'COPPER SIZE OF VIDEO: 018, 020',
            'CORE SIZE: 7X38, 14X40, 14X42, 14X43',
            'BRAIDING WITH 36 X 0.115 MM ALLOY WITH ALUMINUM FOIL',
            'LENGTH: 90M/180M',
            'MANUFACTURED USING EXCEPTIONAL QUALITY RAW MATERIALS'
          ],
          features: [
            'COLORS: ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE',
            'HIGHLY SHOCK-PROOF',
            'HIGH TENSILE STRENGTH',
            'GREAT PICTURE AND VIDEO QUALITY',
            'WIRES ARE MADE OF QUALITY RAW MATERIALS'
          ]
        }
      },
      { 
        id: 'cctv2', 
        name: 'CCTV Cable 4+1', 
        price: 34.99, 
        image: 'https://images.unsplash.com/photo-1557317605-47b7e98862e8?auto=format&fit=crop&q=80',
        category: 'CCTV Cable',
        description: 'Premium CCTV cable with 4 power conductors and 1 coaxial core. Ideal for PTZ cameras and long-distance installations.',
        detailedDescription: {
          applications: [
            'CCTV SURVEILLANCE CAMERAS',
            'DVR AND NVR CONNECTIONS',
            'PC BASED SYSTEMS',
            'PTZ CAMERAS',
            'LONG-DISTANCE INSTALLATIONS'
          ],
          specifications: [
            'COPPER SIZE OF VIDEO: 018, 020',
            'CORE SIZE: 7X38, 14X40, 14X42, 14X43',
            'BRAIDING WITH 36 X 0.115 MM ALLOY WITH ALUMINUM FOIL',
            'LENGTH: 90M/180M',
            'MANUFACTURED USING EXCEPTIONAL QUALITY RAW MATERIALS'
          ],
          features: [
            'COLORS: ALL COLORS AVAILABLE',
            'CUSTOMIZATION AVAILABLE',
            'HIGHLY SHOCK-PROOF',
            'HIGH TENSILE STRENGTH',
            'GREAT PICTURE AND VIDEO QUALITY',
            'WIRES ARE MADE OF QUALITY RAW MATERIALS'
          ]
        }
      }
    ]
  },
  {
    id: 5,
    name: 'Telephone Cable',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80',
    products: [
      { 
        id: 'tel1', 
        name: 'Standard Telephone Cable', 
        price: 19.99, 
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80',
        category: 'Telephone Cable',
        description: 'Multi-pair telephone cable for voice communication. Suitable for internal and external telephone wiring systems.',
        detailedDescription: {
          applications: [
            'TELEPHONE SWITCHING EXCHANGES',
            'SWITCH BOARD & TELEPHONE WIRING (MDF, SDH, DWDM, DSLAM ETC.)',
            'PULSE CODE MODULATION SYSTEMS',
            'RS-232 COMMUNICATION'
          ],
          specifications: [
            'HIGH-SPEED STATE-OF-THE-ART MACHINERY',
            'PURE ELECTROLYTIC GRADE, SUPER ANNEALED, TINNED COPPER CONDUCTOR',
            'GOOD QUALITY PVC INSULATION',
            'SUITABLE FOR OPERATION AT VOLTAGE OF 250 VOLTS',
            'CONDUCTOR OPERATING TEMPERATURE 70°C, 85°C & 105°C',
            '1-50 PAIR CABLE AVAILABLE'
          ],
          features: [
            'LENGTH IS CUSTOMIZABLE AS PER REQUIREMENT',
            'ALL COLORS AVAILABLE',
            'FIRE RETARDANT/FIRE RETARDANT LOW SMOKE',
            'ZERO HALOGEN LOW SMOKE & SHEATH MATERIAL',
            'HIGH QUALITY CONSTRUCTION'
          ]
        }
      }
    ]
  },
  {
    id: 6,
    name: 'Computer Cords',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
    products: [
      { 
        id: 'cc1', 
        name: 'Desktop CPU Power Cord', 
        price: 15.99, 
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
        category: 'Computer Cords',
        description: 'Standard 3-pin power cord for desktop computers and monitors. Available in various lengths with safety certification.',
        detailedDescription: {
          applications: [
            'COMPUTER SYSTEMS',
            'MONITORS',
            'PRINTERS',
            'SCANNERS',
            'ELECTRONIC DEVICES WITH 3-PIN POWER PLUG'
          ],
          specifications: [
            'CHHAJER CABLE INDUSTRIES - LEADING MANUFACTURER IN DELHI',
            '3 PIN COMPUTER POWER CORD CABLE',
            'FEMALE CONNECTOR FOR ELECTRONIC GADGETS',
            '3-PRONG GROUNDED MALE PLUG FOR WALL OUTLETS',
            'STANDARD OUTLET COMPATIBLE'
          ],
          features: [
            'SUPPLY POWER TO COMPUTER SYSTEM AND VARIOUS DEVICES',
            'DIRECT INSERTION INTO ELECTRONIC GADGETS',
            'STANDARD WALL OUTLET CONNECTION',
            'OVERLOAD PROTECTION',
            'HIGH QUALITY CONSTRUCTION'
          ]
        }
      },
      { 
        id: 'cc2', 
        name: 'Laptop Notebook Adaptor Power Cord', 
        price: 18.99, 
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
        category: 'Computer Cords',
        description: 'Universal laptop power cord compatible with most notebook adapters. Features strain relief and durable construction.',
        detailedDescription: {
          applications: [
            'LAPTOP COMPUTER / VIDEO GAMES',
            'NOTEBOOKS',
            'PRINTERS',
            'LCD TFT CRT MONITORS',
            'AUDIO EQUIPMENT & AMPS',
            'ELECTRONICS USING 3-PRONG POWER'
          ],
          specifications: [
            'POLARISED POWER CABLE',
            'FEMALE CONNECTOR FOR DEVICE CONNECTION',
            'MALE CONNECTOR FOR STANDARD OUTLET',
            'ADVANCED WIRES FOR OVERLOAD PROTECTION',
            'ANTI-INTERFERENCE FEATURE',
            'BETTER ISOLATION MATERIALS',
            'RUBBERISED TEXTURE CORD'
          ],
          features: [
            'COMPATIBLE WITH HP, DELL, LENOVO, SONY VAIO',
            'COMPATIBLE WITH TOSHIBA, WIPRO, LG, ASUS',
            'COMPATIBLE WITH SAMSUNG, IBM, ACER',
            'OVERLOAD PROTECTION',
            'ANTI-INTERFERENCE DESIGN'
          ]
        }
      }
    ]
  },
  {
    id: 7,
    name: 'Lift Cables',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    products: [
      {
        id: 'lift1',
        name: 'Standard Lift Cable',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
        category: 'Lift Cables',
        description: 'Professional lift cable with enhanced flexibility and durability for elevator systems. Designed for reliable operation in demanding vertical transportation environments.',
        detailedDescription: {
          applications: [
            'ELEVATOR SYSTEMS',
            'LIFT INSTALLATIONS',
            'VERTICAL TRANSPORTATION',
            'CARRIAGE SYSTEMS',
            'INDUSTRIAL LIFTING EQUIPMENT'
          ],
          specifications: [
            'BARE COPPER CONDUCTOR, EXTRA FINE WIRE, HIGH FLEXIBLE',
            'CORE INSULATION OF PLASTIC, FLEXIBLE AT LOW TEMPERATURES',
            'CORE IDENTIFICATION BLACK CORES WITH CONTINUOUS WHITE NUMBERING',
            'GN-YE CONDUCTOR',
            'OUTER SHEATH OF SPECIAL PLASTIC, FLEXIBLE AT LOW TEMPERATURES',
            'SHEATH COLOUR: ALL COLORS AVAILABLE'
          ],
          features: [
            'SHEATH UV-RESISTANT',
            'IN CARRIAGE VERSION WITH SPECIAL SUPPORT',
            'BRAIDING AND WITH PUR SHEATH PARTICULARLY',
            'RESISTANT TO WEAR, OIL, HYDROLYSIS AND',
            'MICROBIAL ATTACK',
            'CUSTOMIZABLE AVAILABLE'
          ]
        }
      }
    ]
  },
  {
    id: 8,
    name: 'Speaker Cable',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80',
    products: [
      {
        id: 'speaker1',
        name: 'Standard Speaker Cable',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80',
        category: 'Speaker Cable',
        description: 'High-quality speaker cable for audio applications. Features multi-stranded copper conductors and reliable connections for optimal sound transmission.',
        detailedDescription: {
          applications: [
            'ALL THE CABLES ARE USED FOR SPEAKER RANGES, HOME THEATER OR AUDIO SYSTEM',
            'USED FOR CONNECTING POWER AMPLIFIER AND BROADCASTING SYSTEMS',
            'FOR TRANSMITTING THE AUDIO SIGNALS AMPLIFIED BY THE AMPLIFIER',
            'HOME AUDIO SYSTEMS',
            'PROFESSIONAL SOUND EQUIPMENT'
          ],
          specifications: [
            'OFFERING WIDE RANGE OF HIGH QUALITY SPEAKER CABLE WITH ALL KINDS OF APPLICATIONS',
            'SPEAKER CABLES ARE MOSTLY USED FOR ESTABLISHING A CONNECTION BETWEEN A SPEAKER AND AMPLIFIER SOURCES',
            '3 KEY ELECTRICAL PROPERTIES RESISTANCE, CAPACITANCE AND INDUCTANCE',
            'RATED VOLTAGE: 300/300V',
            'FULL 100M'
          ],
          features: [
            'MULTI-STRANDED/FLEXIBLE OFC, COPPER, TINNED-COPPER WIRE CONDUCTOR',
            'RELIABLE CONNECTION',
            'ROHS STANDARD PVC',
            'CE,SGS,ISO9001 STANDARD',
            'KEEP WORKING UNDER 70°C FOR LONG PERIOD OPERATION'
          ]
        }
      }
    ]
  }
];

export default Index;
