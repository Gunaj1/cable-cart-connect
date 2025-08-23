import React, { useState } from 'react';
import { Cable, ShoppingCart, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Eye, X, Award, Shield, Users, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Logo from '../components/Logo';
import AboutTabs from '../components/AboutTabs';
import Checkout from '../components/Checkout';
import ServicesSection from '../components/ServicesSection';
import BusinessCredentials from '../components/BusinessCredentials';
import InventoryManager from '../components/InventoryManager';
import ProductComparison from '../components/ProductComparison';
import CompareButton from '../components/CompareButton';
import ComparisonFloatingButton from '../components/ComparisonFloatingButton';
import { useComparison } from '../contexts/ComparisonContext';
import { getProductDetails } from '../data/productImages';

// Import product images
import cat6StpPatchcord from '../assets/cat6-stp-patchcord.jpg';
import cat6FtpPatchcord from '../assets/cat6-ftp-patchcord.jpg';
import cat6UtpPatchcord from '../assets/cat6-utp-patchcord.jpg';
import cat5eStpPatchcord from '../assets/cat5e-stp-patchcord.jpg';
import cat5eFtpPatchcord from '../assets/cat5e-ftp-patchcord.jpg';
import cat5eUtpPatchcord from '../assets/cat5e-utp-patchcord.jpg';
import cat5eFlatLan from '../assets/cat5e-flat-lan.jpg';
import cat5e2pairLan from '../assets/cat5e-2pair-lan.jpg';
import cat5eArmoredLan from '../assets/cat5e-armored-lan.jpg';
import cat5eFtpLan from '../assets/cat5e-ftp-lan.jpg';
import cat5eStpLan from '../assets/cat5e-stp-lan.jpg';
import cat5eUtpLan from '../assets/cat5e-utp-lan.jpg';
import cat5eOutdoorLan from '../assets/cat5e-outdoor-lan.jpg';
import cat6FlatLan from '../assets/cat6-flat-lan.jpg';
import cat6ArmoredLan from '../assets/cat6-armored-lan.jpg';
import cat6StpLan from '../assets/cat6-stp-lan.jpg';
import cat6FtpLan from '../assets/cat6-ftp-lan.jpg';
import cat6UtpLan from '../assets/cat6-utp-lan.jpg';
import cat6OutdoorLan from '../assets/cat6-outdoor-lan.jpg';
import cctv3plus1Cable from '../assets/cctv-3plus1-cable.jpg';
import cctv4plus1Cable from '../assets/cctv-4plus1-cable.jpg';
import telephoneCable from '../assets/telephone-cable.jpg';
import desktopPowerCord from '../assets/desktop-power-cord.jpg';
import laptopAdapterCord from '../assets/laptop-adapter-cord.jpg';
import liftCable from '../assets/lift-cable.jpg';
import speakerCable from '../assets/speaker-cable.jpg';
import { Product } from '@/types/Product';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import ProductCompareDrawer from '@/components/ProductCompareDrawer';
import CompareTable from '@/components/CompareTable';

/* Added: Local ErrorBoundary to catch render/effect errors without changing presentation */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: 16 }}>
          <p>Something went wrong.</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.message ?? 'Unknown error'}</pre>
          <button onClick={() => this.setState({ hasError: false, error: undefined })}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
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
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isFullCompareOpen, setIsFullCompareOpen] = useState(false);
  const {
    comparisonProducts,
    clearComparison
  } = useComparison();

  /* Changed: remove runtime randomness to avoid SSR/hydration/render-time issues; keep concept of stock initialization intact */
  const [products, setProducts] = useState<Product[]>(() => {
    return categories.flatMap(category =>
      category.products.map(product => ({
        ...product,
        stock: 100 // deterministic initial stock to avoid render-time errors; still represents "initialized stock levels"
      }))
    );
  });

  const addToCart = (product: Product) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (!currentProduct || (currentProduct.stock ?? 0) <= 0) {
      alert('Sorry, this product is out of stock!');
      return;
    }
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= (currentProduct.stock ?? 0)) {
          alert(`Sorry, only ${currentProduct.stock} items available in stock!`);
          return prevItems;
        }
        return prevItems.map(item => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }
      return [...prevItems, {
        ...currentProduct,
        quantity: 1
      }];
    });

    // Update stock
    setProducts(prev => prev.map(p => p.id === product.id ? {
      ...p,
      stock: (p.stock ?? 0) - 1
    } : p));
  };

  const removeFromCart = (productId: string) => {
    const removedItem = cartItems.find(item => item.id === productId);
    if (removedItem) {
      // Restore stock
      setProducts(prev => prev.map(p => p.id === productId ? {
        ...p,
        stock: (p.stock ?? 0) + removedItem.quantity
      } : p));
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
    if (quantityDiff > 0 && quantityDiff > (currentProduct.stock ?? 0)) {
      alert(`Sorry, only ${currentProduct.stock} more items available in stock!`);
      return;
    }
    setCartItems(prevItems => prevItems.map(item => item.id === productId ? {
      ...item,
      quantity: newQuantity
    } : item));

    // Update stock
    setProducts(prev => prev.map(p => p.id === productId ? {
      ...p,
      stock: (p.stock ?? 0) - quantityDiff
    } : p));
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

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const ProductDetailModal = ({
    product,
    onClose
  }: {
    product: Product | null;
    onClose: () => void;
  }) => {
    if (!product || !product.detailedDescription) return null;

    const productDetails = getProductDetails(product.id) ?? { title: product.name, images: [product.image], description: product.description, applications: [], specifications: {}, features: [] };

    return <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-gray-600 z-10 px-8 py-6 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-3xl font-bold text-white">{productDetails.title}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/20">
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg border">
                  <img src={productDetails.images?.[0] ?? product.image} alt={productDetails.title} className="w-full h-auto object-contain bg-white p-4" />
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-6 border border-blue-200">
                  <p className="text-2xl font-bold text-blue-900 mb-4">Price: ${product.price}</p>
                  <p className="text-lg font-medium text-gray-700 mb-4">Stock: {product.stock || 0} units</p>
                  <p className="text-gray-700 mb-4">{productDetails.description}</p>
                  <button onClick={() => {
                  addToCart(product);
                  onClose();
                }} className="w-full bg-gradient-to-r from-blue-600 to-gray-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-gray-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg transform hover:scale-105" disabled={!product.stock}>
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
                    {productDetails.applications?.map((app: string, index: number) => <li key={index} className="flex items-start">
                        <Cable className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{app}</span>
                      </li>)}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-500 rounded-full mr-3"></span>
                    Specifications
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {Object.entries(productDetails.specifications ?? {}).map(([key, value], index) => <li key={index} className="flex items-start">
                        <span className="w-3 h-3 bg-gradient-to-r from-gray-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium"><strong>{key}:</strong> {String(value)}</span>
                      </li>)}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-gray-500 rounded-full mr-3"></span>
                    Features
                  </h3>
                  <ul className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 space-y-3 border border-gray-200">
                    {productDetails.features?.map((feature: string, index: number) => <li key={index} className="flex items-start">
                        <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-gray-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          onNavigate={scrollToSection}
          activeSection={activeSection}
          products={products}
          onProductSelect={product => setSelectedProduct(product)}
        />

        {/* Hero Section */}
        <div
          id="home"
          className="relative h-[600px] bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80")'
          }}
        >
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
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === null ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl' : 'bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-400 hover:text-blue-700 shadow-lg'}`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl' : 'bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-400 hover:text-blue-700 shadow-lg'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Premium Product Grid */}
          {selectedCategory === null ? (
            // All Categories View - Show by category
            <div className="space-y-16">
              {categories.map(category => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.products.map(product => {
                      const currentProduct = products.find(p => p.id === product.id);
                      if (!currentProduct) return null;
                      return (
                        <ProductCard
                          key={product.id}
                          product={currentProduct}
                          onQuickView={product => {
                            setQuickViewProduct(product);
                            setIsQuickViewOpen(true);
                          }}
                          onAddToCart={addToCart}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Single Category View - Show selected category products
            <div className="max-w-6xl mx-auto">
              {categories
                .filter(category => category.id === selectedCategory)
                .map(category => (
                  <div key={category.id}>
                    {/* Category Hero */}
                    <div className="mb-12 text-center">
                      <h3 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h3>
                      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Premium quality {category.name.toLowerCase()} designed for professional networking applications
                      </p>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.products.map(product => {
                        const currentProduct = products.find(p => p.id === product.id);
                        if (!currentProduct) return null;
                        return (
                          <ProductCard
                            key={product.id}
                            product={currentProduct}
                            onQuickView={product => {
                              setQuickViewProduct(product);
                              setIsQuickViewOpen(true);
                            }}
                            onAddToCart={addToCart}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* About Section */}
        <div id="about" className="bg-gradient-to-br from-white to-blue-50 py-20">
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

        {/* Services Section - New Column */}
        <div id="services" className="bg-gradient-to-br from-gray-50 to-white py-20">
          <ServicesSection />
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

        {/* Business Credentials Section */}
        <BusinessCredentials />

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

        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        />

        <InventoryManager
          isOpen={isInventoryOpen}
          onClose={() => setIsInventoryOpen(false)}
          products={products}
          onUpdateStock={(productId, newStock) => {
            setProducts(prev => prev.map(p => p.id === productId ? {
              ...p,
              stock: newStock
            } : p));
          }}
        />

        {/* Quick View Modal */}
        <ProductQuickView
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setQuickViewProduct(null);
          }}
          onAddToCart={(product, quantity) => {
            for (let i = 0; i < quantity; i++) {
              addToCart(product);
            }
          }}
          onViewDetails={product => setSelectedProduct(product)}
        />

        {/* Compare Drawer */}
        <ProductCompareDrawer
          isOpen={isCompareDrawerOpen}
          onOpenChange={setIsCompareDrawerOpen}
          onViewFullComparison={() => {
            setIsCompareDrawerOpen(false);
            setIsFullCompareOpen(true);
          }}
        />

        {/* Full Compare Table */}
        <CompareTable
          products={comparisonProducts}
          isOpen={isFullCompareOpen}
          onClose={() => setIsFullCompareOpen(false)}
          onAddToCart={addToCart}
          onClearComparison={() => {
            clearComparison();
            setIsFullCompareOpen(false);
          }}
        />

        {/* Floating Comparison Button */}
        <ComparisonFloatingButton onOpenComparison={() => setIsCompareDrawerOpen(true)} />
      </div>
    </ErrorBoundary>
  );
};

const categories = [{
  id: 1,
  name: 'Patchcords',
  products: [{
    id: 'pc1',
    name: 'Cat 6 STP',
    price: 29.99,
    image: cat6StpPatchcord,
    category: 'Patchcords',
    description: 'Shielded Twisted Pair Cat6 patchcord with enhanced EMI protection, ideal for high-interference environments. Supports speeds up to 10Gbps.',
    detailedDescription: getProductDetails('pc1')
  }, {
    id: 'pc2',
    name: 'Cat 6 FTP',
    price: 27.99,
    image: cat6FtpPatchcord,
    category: 'Patchcords',
    description: 'Foiled Twisted Pair Cat6 patchcord offering excellent noise protection. Perfect for data centers and enterprise networks.',
    detailedDescription: getProductDetails('pc2')
  }, {
    id: 'pc3',
    name: 'Cat 6 UTP',
    price: 25.99,
    image: cat6UtpPatchcord,
    category: 'Patchcords',
    description: 'Unshielded Twisted Pair Cat6 patchcord for standard networking needs. Cost-effective solution for office environments.',
    detailedDescription: getProductDetails('pc3')
  }, {
    id: 'pc4',
    name: 'Cat 5e STP',
    price: 24.99,
    image: cat5eStpPatchcord,
    category: 'Patchcords',
    description: 'Shielded Cat5e patchcord with reliable performance and EMI protection. Supports speeds up to 1Gbps.',
    detailedDescription: getProductDetails('pc4')
  }, {
    id: 'pc5',
    name: 'Cat5e FTP',
    price: 22.99,
    image: cat5eFtpPatchcord,
    category: 'Patchcords',
    description: 'Foiled Cat5e patchcord with overall shield for noise reduction. Ideal for small business networks.',
    detailedDescription: getProductDetails('pc5')
  }, {
    id: 'pc6',
    name: 'Cat5e UTP',
    price: 20.99,
    image: cat5eUtpPatchcord,
    category: 'Patchcords',
    description: 'Standard Cat5e patchcord for basic networking needs. Perfect for home and small office use.',
    detailedDescription: getProductDetails('pc6')
  }]
}, {
  id: 2,
  name: 'Cat5e LAN Cables',
  products: [{
    id: 'lan1',
    name: 'Cat 5e Flat',
    price: 35.99,
    image: cat5eFlatLan,
    category: 'Cat5e LAN Cables',
    description: 'Ultra-thin flat design for easy installation under carpets and along walls. Perfect for home networking.',
    detailedDescription: getProductDetails('lan1')
  }, {
    id: 'lan2',
    name: 'Cat5e 2 pair',
    price: 32.99,
    image: cat5e2pairLan,
    category: 'Cat5e LAN Cables',
    description: 'Economical 2-pair solution for voice and basic data applications. Ideal for telephone systems.',
    detailedDescription: getProductDetails('lan2')
  }, {
    id: 'lan3',
    name: 'Cat 5e Armored',
    price: 45.99,
    image: cat5eArmoredLan,
    category: 'Cat5e LAN Cables',
    description: 'Heavy-duty armored cable for underground and outdoor installations. Excellent rodent protection.',
    detailedDescription: getProductDetails('lan3')
  }, {
    id: 'lan4',
    name: 'Cat 5e FTP',
    price: 38.99,
    image: cat5eFtpLan,
    category: 'Cat5e LAN Cables',
    description: 'Foiled cable with overall shield for superior noise immunity. Perfect for industrial environments.',
    detailedDescription: getProductDetails('lan4')
  }, {
    id: 'lan5',
    name: 'Cat 5e STP',
    price: 36.99,
    image: cat5eStpLan,
    category: 'Cat5e LAN Cables',
    description: 'Individually shielded pairs for maximum protection against crosstalk and interference.',
    detailedDescription: getProductDetails('lan5')
  }, {
    id: 'lan6',
    name: 'Cat 5e UTP',
    price: 34.99,
    image: cat5eUtpLan,
    category: 'Cat5e LAN Cables',
    description: 'Standard unshielded cable for general networking needs. Cost-effective solution for office installations.',
    detailedDescription: getProductDetails('lan6')
  }, {
    id: 'lan7',
    name: 'Cat 5e Outdoor',
    price: 42.99,
    image: cat5eOutdoorLan,
    category: 'Cat5e LAN Cables',
    description: 'UV-resistant and waterproof design for outdoor installations. Suitable for direct burial.',
    detailedDescription: getProductDetails('lan7')
  }]
}, {
  id: 3,
  name: 'Cat 6 LAN Cable',
  products: [{
    id: 'cat1',
    name: 'Cat 6 Flat',
    price: 45.99,
    image: cat6FlatLan,
    category: 'Cat 6 LAN Cable',
    description: 'Low-profile flat design Cat6 cable for discrete installations. Supports 10Gbps up to 55 meters.',
    detailedDescription: getProductDetails('cat1')
  }, {
    id: 'cat2',
    name: 'Cat 6 Armored',
    price: 55.99,
    image: cat6ArmoredLan,
    category: 'Cat 6 LAN Cable',
    description: 'Double-jacketed armored Cat6 cable for harsh environments. Superior physical protection.',
    detailedDescription: getProductDetails('cat2')
  }, {
    id: 'cat3',
    name: 'Cat 6 STP',
    price: 48.99,
    image: cat6StpLan,
    category: 'Cat 6 LAN Cable',
    description: 'Shielded Cat6 cable with individual pair shielding. Excellent for high-speed data centers.',
    detailedDescription: getProductDetails('cat3')
  }, {
    id: 'cat4',
    name: 'Cat 6 FTP',
    price: 46.99,
    image: cat6FtpLan,
    category: 'Cat 6 LAN Cable',
    description: 'Foiled Cat6 cable with overall shield. Ideal for commercial and industrial applications.',
    detailedDescription: getProductDetails('cat4')
  }, {
    id: 'cat5',
    name: 'Cat 6 UTP',
    price: 44.99,
    image: cat6UtpLan,
    category: 'Cat 6 LAN Cable',
    description: 'Standard Cat6 unshielded cable. Perfect for modern office networks requiring higher bandwidth.',
    detailedDescription: getProductDetails('cat5')
  }, {
    id: 'cat6',
    name: 'Cat 6 Outdoor',
    price: 52.99,
    image: cat6OutdoorLan,
    category: 'Cat 6 LAN Cable',
    description: 'Weather-resistant Cat6 cable for outdoor installations. UV-protected and waterproof design.',
    detailedDescription: getProductDetails('cat6')
  }]
}, {
  id: 4,
  name: 'CCTV Cable',
  products: [{
    id: 'cctv1',
    name: 'CCTV Cable 3+1',
    price: 29.99,
    image: cctv3plus1Cable,
    category: 'CCTV Cable',
    description: 'Combined power and video cable with 3 copper conductors and 1 coaxial core. Perfect for analog CCTV systems.',
    detailedDescription: getProductDetails('cctv1')
  }, {
    id: 'cctv2',
    name: 'CCTV Cable 4+1',
    price: 34.99,
    image: cctv4plus1Cable,
    category: 'CCTV Cable',
    description: 'Premium CCTV cable with 4 power conductors and 1 coaxial core. Ideal for PTZ cameras and long-distance installations.',
    detailedDescription: getProductDetails('cctv2')
  }]
}, {
  id: 5,
  name: 'Telephone Cable',
  products: [{
    id: 'tel1',
    name: 'Standard Telephone Cable',
    price: 19.99,
    image: telephoneCable,
    category: 'Telephone Cable',
    description: 'Multi-pair telephone cable for voice communication. Suitable for internal and external telephone wiring systems.',
    detailedDescription: getProductDetails('tel1')
  }]
}, {
  id: 6,
  name: 'Computer Cords',
  products: [{
    id: 'cc1',
    name: 'Desktop CPU Power Cord',
    price: 15.99,
    image: desktopPowerCord,
    category: 'Computer Cords',
    description: 'Standard 3-pin power cord for desktop computers and monitors. Available in various lengths with safety certification.',
    detailedDescription: getProductDetails('cc1')
  }, {
    id: 'cc2',
    name: 'Laptop Notebook Adaptor Power Cord',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
    category: 'Computer Cords',
    description: 'Universal laptop power cord compatible with most notebook adapters. Features strain relief and durable construction.',
    detailedDescription: getProductDetails('cc2')
  }]
}, {
  id: 7,
  name: 'Lift Cables',
  products: [{
    id: 'lift1',
    name: 'Standard Lift Cable',
    price: 149.99,
    image: liftCable,
    category: 'Lift Cables',
    description: 'Professional lift cable with enhanced flexibility and durability for elevator systems. Designed for reliable operation in demanding vertical transportation environments.',
    detailedDescription: getProductDetails('lift1')
  }]
}, {
  id: 8,
  name: 'Speaker Cable',
  products: [{
    id: 'speaker1',
    name: 'Standard Speaker Cable',
    price: 39.99,
    image: speakerCable,
    category: 'Speaker Cable',
    description: 'High-quality speaker cable for audio applications. Features multi-stranded copper conductors and reliable connections for optimal sound transmission.',
    detailedDescription: getProductDetails('speaker1')
  }]
}];

export default Index;
