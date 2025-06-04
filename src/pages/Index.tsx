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
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image Section */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={product.id === 'pc1' ? '/image-copy.png' : product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-lg font-semibold text-blue-900 mb-2">Price: ${product.price}</p>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications</h3>
                  <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {product.detailedDescription.applications.map((app, index) => (
                      <li key={index} className="flex items-start">
                        <Cable className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {product.detailedDescription.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {product.detailedDescription.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />
      
      {/* Hero Section */}
      <div id="home" className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-white max-w-3xl text-center">
            <div className="mb-8 animate-fade-in flex justify-center">
              <Logo className="h-24" />
            </div>
            <p className="text-xl leading-relaxed animate-slide-up mx-auto">
              With over two decades of excellence, Chhajer Cable Industries stands as a premier manufacturer of high-quality cables and networking solutions. Based in Delhi, we specialize in producing a comprehensive range of cables including LAN, CCTV, telephone, and specialized industrial cables. Our commitment to quality, innovation, and customer satisfaction has made us a trusted name in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <div className="space-y-4">
                  {category.products.map((product) => (
                    <div 
                      key={product.id} 
                      className="border-b pb-4 relative"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Cable className="w-4 h-4 mr-2 text-blue-600" />
                          <span>{product.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">${product.price}</span>
                          {product.detailedDescription && (
                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 transition-colors duration-300 flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              About
                            </button>
                          )}
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors duration-300"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      {hoveredProduct === product.id && (
                        <div className="absolute z-10 bg-white border border-gray-200 shadow-lg rounded-md p-3 mt-2 w-full">
                          <p className="text-sm text-gray-600">{product.description}</p>
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

      {/* Other Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Other Products We Manufacture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="space-y-2">
                    {product.applications.map((app, appIndex) => (
                      <div key={appIndex} className="flex items-center text-sm text-gray-700">
                        <Cable className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
            <p className="mb-4">
              Founded in 2000, Chhajer Cable Industries has grown to become one of India's leading manufacturers of high-quality cables and networking solutions. Our state-of-the-art manufacturing facility in Delhi is equipped with the latest technology and staffed by skilled professionals who ensure that every product meets the highest standards of quality and reliability.
            </p>
            <p className="mb-4">
              We take pride in our comprehensive range of products that cater to various sectors including IT, telecommunications, security systems, and industrial applications. Our commitment to innovation and quality has earned us the trust of countless customers across the country.
            </p>
            <p>
              At Chhajer Cable Industries, we believe in building lasting relationships with our customers through excellent service, competitive pricing, and unwavering support. Our team of experts is always ready to assist you in finding the perfect solution for your specific needs.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  +91 98765 43210
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  info@chhajercables.com
                </p>
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Industrial Area, Delhi, India
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
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
        description: 'Unshielded Twisted Pair Cat6 patchcord for standard networking needs. Cost-effective solution for office environments.'
      },
      { 
        id: 'pc4', 
        name: 'Cat 5e STP', 
        price: 24.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Patchcords',
        description: 'Shielded Cat5e patchcord with reliable performance and EMI protection. Supports speeds up to 1Gbps.'
      },
      { 
        id: 'pc5', 
        name: 'Cat5e FTP', 
        price: 22.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Patchcords',
        description: 'Foiled Cat5e patchcord with overall shield for noise reduction. Ideal for small business networks.'
      },
      { 
        id: 'pc6', 
        name: 'Cat5e UTP', 
        price: 20.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Patchcords',
        description: 'Standard Cat5e patchcord for basic networking needs. Perfect for home and small office use.'
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
        description: 'Ultra-thin flat design for easy installation under carpets and along walls. Perfect for home networking.'
      },
      { 
        id: 'lan2', 
        name: 'Cat5e 2 pair', 
        price: 32.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Economical 2-pair solution for voice and basic data applications. Ideal for telephone systems.'
      },
      { 
        id: 'lan3', 
        name: 'Cat 5e Armored', 
        price: 45.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Heavy-duty armored cable for underground and outdoor installations. Excellent rodent protection.'
      },
      { 
        id: 'lan4', 
        name: 'Cat 5e FTP', 
        price: 38.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Foiled cable with overall shield for superior noise immunity. Perfect for industrial environments.'
      },
      { 
        id: 'lan5', 
        name: 'Cat 5e STP', 
        price: 36.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Individually shielded pairs for maximum protection against crosstalk and interference.'
      },
      { 
        id: 'lan6', 
        name: 'Cat 5e UTP', 
        price: 34.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'Standard unshielded cable for general networking needs. Cost-effective solution for office installations.'
      },
      { 
        id: 'lan7', 
        name: 'Cat 5e Outdoor', 
        price: 42.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat5e LAN Cables',
        description: 'UV-resistant and waterproof design for outdoor installations. Suitable for direct burial.'
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
        description: 'Low-profile flat design Cat6 cable for discrete installations. Supports 10Gbps up to 55 meters.'
      },
      { 
        id: 'cat2', 
        name: 'Cat 6 Armored', 
        price: 55.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Double-jacketed armored Cat6 cable for harsh environments. Superior physical protection.'
      },
      { 
        id: 'cat3', 
        name: 'Cat 6 STP', 
        price: 48.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Shielded Cat6 cable with individual pair shielding. Excellent for high-speed data centers.'
      },
      { 
        id: 'cat4', 
        name: 'Cat 6 FTP', 
        price: 46.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Foiled Cat6 cable with overall shield. Ideal for commercial and industrial applications.'
      },
      { 
        id: 'cat5', 
        name: 'Cat 6 UTP', 
        price: 44.99, 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Standard Cat6 unshielded cable. Perfect for modern office networks requiring higher bandwidth.'
      },
      { 
        id: 'cat6', 
        name: 'Cat 6 Outdoor', 
        price: 52.99, 
        image: 'https://images.unsplash.com/photo-1589030942747-0581036c3869?auto=format&fit=crop&q=80',
        category: 'Cat 6 LAN Cable',
        description: 'Weather-resistant Cat6 cable for outdoor installations. UV-protected and waterproof design.'
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
        description: 'Combined power and video cable with 3 copper conductors and 1 coaxial core. Perfect for analog CCTV systems.'
      },
      { 
        id: 'cctv2', 
        name: 'CCTV Cable 4+1', 
        price: 34.99, 
        image: 'https://images.unsplash.com/photo-1557317605-47b7e98862e8?auto=format&fit=crop&q=80',
        category: 'CCTV Cable',
        description: 'Premium CCTV cable with 4 power conductors and 1 coaxial core. Ideal for PTZ cameras and long-distance installations.'
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
        description: 'Multi-pair telephone cable for voice communication. Suitable for internal and external telephone wiring systems.'
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
        description: 'Standard 3-pin power cord for desktop computers and monitors. Available in various lengths with safety certification.'
      },
      { 
        id: 'cc2', 
        name: 'Laptop Notebook Adaptor Power Cord', 
        price: 18.99, 
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
        category: 'Computer Cords',
        description: 'Universal laptop power cord compatible with most notebook adapters. Features strain relief and durable construction.'
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
        name: 'Traveling Cable 12 Core',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
        category: 'Lift Cables',
        description: 'Heavy-duty 12-core traveling cable for elevator systems. Features high flexibility and superior mechanical strength for reliable elevator operations.'
      },
      {
        id: 'lift2',
        name: 'Traveling Cable 24 Core',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
        category: 'Lift Cables',
        description: 'Premium 24-core traveling cable designed for high-rise buildings. Includes integrated steel support and enhanced durability for extended service life.'
      },
      {
        id:  'lift3',
        name: 'Compensation Cable',
        price: 75.99,
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
        category: 'Lift Cables',
        description: 'Specialized compensation cable for counterweight systems. Engineered for optimal balance and smooth elevator operation.'
      },
      {
        id: 'lift4',
        name: 'Control Cable',
        price: 65.99,
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
        category: 'Lift Cables',
        description: 'High-performance control cable for elevator control systems. Features EMI shielding and fire-resistant properties.'
      }
    ]
  }
];

const otherProducts = [
  {
    name: 'Fire Alarm Cables',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80',
    description: 'Fire-resistant cables designed for fire alarm and emergency communication systems.',
    applications: [
      'Fire detection systems',
      'Emergency communication',
      'Safety installations'
    ]
  },
  {
    name: 'Solar DC Cables',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80',
    description: 'UV-resistant DC cables specifically designed for solar panel installations and renewable energy systems.',
    applications: [
      'Solar panel connections',
      'Renewable energy systems',
      'Outdoor installations'
    ]
  },
  {
    name: 'Coaxial Cables',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80',
    description: 'High-frequency coaxial cables for cable TV, satellite, and broadband applications.',
    applications: [
      'Cable TV systems',
      'Satellite connections',
      'Broadband networks'
    ]
  },
  {
    name: 'Audio/Video Cables',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80',
    description: 'Professional-grade audio and video cables for broadcasting and entertainment systems.',
    applications: [
      'Broadcasting equipment',
      'Audio systems',
      'Video transmission'
    ]
  },
  {
    name: 'Fiber Optic Cables',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80',
    description: 'High-speed fiber optic cables for long-distance data transmission and telecommunications.',
    applications: [
      'Telecommunications',
      'High-speed internet',
      'Data centers'
    ]
  },
  {
    name: 'Control Cables',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80',
    description: 'Multi-core control cables for industrial automation and process control systems.',
    applications: [
      'Industrial automation',
      'Process control',
      'Manufacturing systems'
    ]
  },
  {
    name: 'Armored Cables',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80',
    description: 'Heavy-duty armored cables for underground installations and harsh environments.',
    applications: [
      'Underground installations',
      'Industrial environments',
      'Marine applications'
    ]
  },
  {
    name: 'Speaker Cables',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80',
    description: 'High-fidelity speaker cables for professional audio and home theater systems.',
    applications: [
      'Professional audio',
      'Home theaters',
      'Sound systems'
    ]
  }
];

export default Index;
