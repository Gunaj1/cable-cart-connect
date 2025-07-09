import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, X, Plus, Minus, Menu, Phone, Mail, MapPin, Clock, Award, Shield, Truck, Headphones } from 'lucide-react';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import ServicesSection from '../components/ServicesSection';
import BusinessCredentials from '../components/BusinessCredentials';
import InventoryManager from '../components/InventoryManager';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{ items: CartItem[], total: number } | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'pc1',
      name: 'Gaming Desktop PC',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&h=500&fit=crop',
      category: 'Computers',
      description: 'High-performance gaming desktop with RGB lighting and powerful components',
      stock: 15,
      detailedDescription: {
        applications: ['Gaming', 'Content Creation', 'Streaming', 'Video Editing'],
        specifications: ['Intel i7-12700K', '32GB DDR4 RAM', '1TB NVMe SSD', 'RTX 3070 GPU'],
        features: ['RGB Lighting', 'Liquid Cooling', 'Cable Management', 'Upgradeable']
      }
    },
    {
      id: 'laptop1',
      name: 'MacBook Pro',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      category: 'Computers',
      description: 'Professional laptop with M2 chip for creative professionals',
      stock: 12,
      detailedDescription: {
        applications: ['Video Editing', 'Graphic Design', 'Programming', 'Music Production'],
        specifications: ['Apple M2 Pro Chip', '16GB Unified Memory', '512GB SSD', '16-inch Retina Display'],
        features: ['All-Day Battery', 'Studio-Quality Mics', 'ProMotion Display', 'Thunderbolt 4']
      }
    },
    {
      id: 'cat5e1',
      name: 'CAT5E Ethernet Cable',
      price: 29,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=500&fit=crop',
      category: 'Cables',
      description: 'High-quality CAT5E ethernet cable for reliable network connections',
      stock: 50,
      detailedDescription: {
        applications: ['Home Networking', 'Office Networks', 'Internet Connectivity', 'Local Area Networks'],
        specifications: ['CAT5E Standard', '100MHz Bandwidth', '1000Mbps Speed', 'RJ45 Connectors'],
        features: ['Durable Construction', 'Snagless Design', 'Gold-Plated Connectors', 'Various Lengths']
      }
    },
    {
      id: 'cat6a1',
      name: 'CAT6A LAN Cable',
      price: 49,
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=500&h=500&fit=crop',
      category: 'Cables',
      description: 'Premium CAT6A cable for high-speed network applications',
      stock: 35,
      detailedDescription: {
        applications: ['10 Gigabit Ethernet', 'Server Rooms', 'Data Centers', 'High-Speed Networks'],
        specifications: ['CAT6A Standard', '500MHz Bandwidth', '10Gbps Speed', 'Shielded Design'],
        features: ['Low Crosstalk', 'Enhanced Performance', 'Backward Compatible', 'Professional Grade']
      }
    },
    {
      id: 'patchcord1',
      name: 'Patch Cord Set',
      price: 25,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop',
      category: 'Cables',
      description: 'Professional patch cord set for network patch panels',
      stock: 60,
      detailedDescription: {
        applications: ['Patch Panels', 'Network Switches', 'Rack Connections', 'Structured Cabling'],
        specifications: ['CAT6 Standard', '250MHz Bandwidth', '1Gbps Speed', 'Molded Boots'],
        features: ['Color Coded', 'Strain Relief', 'Flexible Design', 'Multiple Lengths']
      }
    },
    {
      id: 'printer1',
      name: 'HP LaserJet Pro',
      price: 299,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&h=500&fit=crop',
      category: 'Printers',
      description: 'Professional laser printer for office and business use',
      stock: 8,
      detailedDescription: {
        applications: ['Office Printing', 'Business Documents', 'Reports', 'Presentations'],
        specifications: ['35 pages/min', 'Duplex Printing', 'WiFi Connectivity', '500-sheet Tray'],
        features: ['Fast Printing', 'Energy Efficient', 'Mobile Printing', 'Security Features']
      }
    },
    {
      id: 'scanner1',
      name: 'Epson Document Scanner',
      price: 199,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop',
      category: 'Scanners',
      description: 'High-speed document scanner with automatic document feeder',
      stock: 5,
      detailedDescription: {
        applications: ['Document Digitization', 'Archive Management', 'Receipt Scanning', 'Photo Scanning'],
        specifications: ['600 DPI Resolution', '50-page ADF', 'USB 3.0', 'TWAIN Compatible'],
        features: ['Double-sided Scanning', 'OCR Software', 'PDF Creation', 'Cloud Integration']
      }
    },
    {
      id: 'monitor1',
      name: 'Dell UltraSharp 4K Monitor',
      price: 599,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
      category: 'Monitors',
      description: '32-inch 4K professional monitor with color accuracy',
      stock: 10,
      detailedDescription: {
        applications: ['Graphic Design', 'Photo Editing', 'CAD Work', 'Professional Gaming'],
        specifications: ['3840x2160 4K Resolution', 'IPS Panel', '99% sRGB', 'USB-C Hub'],
        features: ['Color Calibration', 'Height Adjustable', 'Blue Light Filter', 'Picture-in-Picture']
      }
    }
  ]);

  const categories = ['All', 'Computers', 'Cables', 'Printers', 'Scanners', 'Monitors'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const handleCheckout = (event: CustomEvent) => {
      setCheckoutData(event.detail);
      setIsCheckoutOpen(true);
    };

    window.addEventListener('checkout', handleCheckout as EventListener);
    return () => window.removeEventListener('checkout', handleCheckout as EventListener);
  }, []);

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, stock: newStock }
          : product
      )
    );
  };

  const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              
              {product.detailedDescription && (
                <>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Applications</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {product.detailedDescription.applications.map((app, index) => (
                        <li key={index}>{app}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {product.detailedDescription.specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {product.detailedDescription.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-6 border border-blue-200">
              <p className="text-2xl font-bold text-blue-900 mb-4">Price: ${product.price}</p>
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
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <Navbar cartCount={getTotalItems()} onCartClick={() => setIsCartOpen(true)} onNavigate={() => {}} activeSection="home" />
      
      {/* Admin Toggle */}
      <div className="fixed top-20 right-4 z-40">
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Admin
        </button>
      </div>

      {/* Admin Panel */}
      {showAdmin && (
        <div className="fixed top-32 right-4 z-30 bg-white rounded-lg shadow-xl border p-4 max-w-md">
          <h3 className="font-bold text-lg mb-4">Admin Panel</h3>
          <div className="space-y-2">
            <button
              onClick={() => setIsInventoryOpen(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Inventory
            </button>
            <button
              onClick={() => setShowAdmin(false)}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-gray-800 bg-clip-text text-transparent">
            Welcome to Computer Corporation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Since 1997, we've been your trusted partner in computer solutions. 
            Discover our premium range of computers, networking cables, and accessories.
          </p>
          
          {/* Centered CCI Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-gray-600 text-white px-8 py-4 rounded-full shadow-lg">
              <h2 className="text-2xl font-bold">CCI</h2>
              <p className="text-sm opacity-90">Credible • Committed • Innovative</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              <span>25+ Years Experience</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              <span>Trusted Quality</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
              <Truck className="w-5 h-5 mr-2 text-purple-600" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
              <Headphones className="w-5 h-5 mr-2 text-orange-600" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Products</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-gray-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const currentProduct = products.find(p => p.id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      {product.detailedDescription && (
                        <button
                          onClick={() => setSelectedProduct(currentProduct || null)}
                          className="bg-gradient-to-r from-gray-100 to-blue-50 text-gray-700 py-2 px-4 rounded-lg hover:from-blue-50 hover:to-gray-100 hover:text-blue-700 transition-all duration-300 flex items-center font-medium border border-gray-200"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                      )}
                      <button
                        onClick={() => currentProduct && addToCart(currentProduct)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        disabled={!currentProduct?.stock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {currentProduct?.stock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
              <p className="text-lg text-gray-600 mb-6">
                Since 1997, Computer Corporation has been a leading provider of high-quality computer products and networking solutions. We are committed to delivering innovative technology and exceptional customer service.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to empower businesses and individuals with the tools they need to succeed in the digital age. We offer a wide range of products, including computers, networking cables, and accessories, all designed to meet the highest standards of performance and reliability.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1580894726984-3945c985512a?w=500&h=500&fit=crop"
                alt="About Us"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
              <p className="text-lg text-gray-600 mb-6">
                Have questions or need assistance? Contact our support team today.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  <span>support@example.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <span>123 Main Street, Anytown, India</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Mon-Fri: 9am - 5pm</span>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Message"
                    rows={4}
                  />
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <BusinessCredentials />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      <InventoryManager
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        products={products}
        onUpdateStock={updateProductStock}
      />

      {isCheckoutOpen && checkoutData && (
        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setCheckoutData(null);
            setCartItems([]); // Clear cart after checkout
          }}
          items={checkoutData.items}
          total={checkoutData.total}
        />
      )}
    </div>
  );
};

export default Index;
