
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Star, Filter, Grid, List, Eye, Plus, Shield, Truck, Award, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Logo from '@/components/Logo';
import ServicesSection from '@/components/ServicesSection';
import AboutTabs from '@/components/AboutTabs';
import BusinessCredentials from '@/components/BusinessCredentials';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import InventoryManager from '@/components/InventoryManager';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  specifications: {
    [key: string]: string;
  };
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "cat5e1",
      name: "Cat5e Ethernet Cable - 25ft",
      category: "Cables",
      image: "/api/placeholder/300/200",
      price: 15.99,
      description: "High-quality Cat5e ethernet cable for reliable network connections. Perfect for home and office use.",
      features: ["25 feet length", "RJ45 connectors", "1000 Mbps speed", "Durable PVC jacket"],
      rating: 4.8,
      reviews: 324,
      inStock: true,
      specifications: {
        "Cable Type": "Cat5e",
        "Length": "25 feet",
        "Connector": "RJ45",
        "Speed": "1000 Mbps"
      }
    },
    {
      id: "cat6-1",
      name: "Cat6 Ethernet Cable - 50ft",
      category: "Cables",
      image: "/api/placeholder/300/200",
      price: 28.99,
      description: "Premium Cat6 ethernet cable for high-speed networking applications. Supports up to 10 Gbps.",
      features: ["50 feet length", "Gold-plated connectors", "10 Gbps speed", "Anti-interference design"],
      rating: 4.9,
      reviews: 256,
      inStock: true,
      specifications: {
        "Cable Type": "Cat6",
        "Length": "50 feet",
        "Connector": "RJ45 Gold-plated",
        "Speed": "10 Gbps"
      }
    },
    {
      id: "patch-panel-1",
      name: "24-Port Patch Panel",
      category: "Patch Panels",
      image: "/api/placeholder/300/200",
      price: 89.99,
      description: "Professional 24-port patch panel for network organization. Rack-mountable design.",
      features: ["24 ports", "Rack mountable", "Cat6 compatible", "Label areas"],
      rating: 4.7,
      reviews: 142,
      inStock: true,
      specifications: {
        "Ports": "24",
        "Mounting": "19-inch rack",
        "Compatibility": "Cat5e/Cat6",
        "Material": "Steel"
      }
    },
    {
      id: "switch-1",
      name: "24-Port Gigabit Switch",
      category: "Switches",
      image: "/api/placeholder/300/200",
      price: 159.99,
      description: "High-performance 24-port gigabit switch for enterprise networking.",
      features: ["24 Gigabit ports", "Rack mountable", "Auto-negotiation", "LED indicators"],
      rating: 4.6,
      reviews: 198,
      inStock: true,
      specifications: {
        "Ports": "24 x 1000Base-T",
        "Switching Capacity": "48 Gbps",
        "MAC Address Table": "8K",
        "Power": "External adapter"
      }
    },
    {
      id: "fiber-1",
      name: "Fiber Optic Cable - 100ft",
      category: "Fiber Optic",
      image: "/api/placeholder/300/200",
      price: 79.99,
      description: "Single-mode fiber optic cable for long-distance, high-speed data transmission.",
      features: ["100 feet length", "Single-mode", "LC connectors", "OS2 standard"],
      rating: 4.8,
      reviews: 87,
      inStock: true,
      specifications: {
        "Type": "Single-mode",
        "Length": "100 feet",
        "Connector": "LC/UPC",
        "Standard": "OS2"
      }
    },
    {
      id: "crimper-1",
      name: "RJ45 Crimping Tool",
      category: "Tools",
      image: "/api/placeholder/300/200",
      price: 34.99,
      description: "Professional RJ45 crimping tool for creating custom ethernet cables.",
      features: ["RJ45 compatible", "Comfortable grip", "Built-in cable stripper", "Durable construction"],
      rating: 4.5,
      reviews: 421,
      inStock: true,
      specifications: {
        "Connector Type": "RJ45",
        "Material": "Carbon steel",
        "Weight": "1.2 lbs",
        "Warranty": "2 years"
      }
    }
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{ items: CartItem[]; total: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const categories = ['All', 'Cables', 'Patch Panels', 'Switches', 'Fiber Optic', 'Tools'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = priceRange === 'All' || 
                        (priceRange === 'Under $50' && product.price < 50) ||
                        (priceRange === '$50-$100' && product.price >= 50 && product.price <= 100) ||
                        (priceRange === 'Over $100' && product.price > 100);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const handleCheckout = (event: CustomEvent) => {
      setCheckoutData(event.detail);
      setIsCheckoutOpen(true);
    };

    window.addEventListener('checkout' as any, handleCheckout);
    return () => window.removeEventListener('checkout' as any, handleCheckout);
  }, []);

  const ProductDetailModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg bg-gray-100"
            />
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-blue-600">${product.price}</h3>
              <Badge variant="secondary" className="mt-2">{product.category}</Badge>
            </div>
            <p className="text-gray-700">{product.description}</p>
            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Specifications:</h4>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex space-x-4">
              <Button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-300 border-gray-200">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-100"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setSelectedProduct(product)}
              className="mr-2"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button 
              size="sm"
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">{product.category}</Badge>
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <Button 
              size="sm" 
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg bg-gray-100"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            </div>
            <div className="flex items-center space-x-4 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-3">{product.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  size="sm"
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Logo className="h-10" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CableConnect</h1>
                  <p className="text-sm text-gray-600">Solutions</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAdmin(!showAdmin)}
                className="text-gray-600 hover:text-gray-900"
              >
                Admin
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Panel */}
      {showAdmin && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <InventoryManager products={products} onUpdateProducts={setProducts} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-gray-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Network Solutions
            </h1>
            <div className="flex justify-center items-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-8 py-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wider">
                  C.C.I
                </h2>
                <p className="text-lg md:text-xl mt-2 opacity-90">
                  Credible • Committed • Innovative
                </p>
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your trusted partner for high-quality networking equipment and solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CableConnect?</h2>
            <p className="text-xl text-gray-600">Professional-grade networking solutions for your business</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">All products tested and certified for professional use</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick delivery to keep your projects on schedule</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Technical assistance from networking professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600">Professional networking equipment for every need</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Prices</SelectItem>
                    <SelectItem value="Under $50">Under $50</SelectItem>
                    <SelectItem value="$50-$100">$50 - $100</SelectItem>
                    <SelectItem value="Over $100">Over $100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {filteredProducts.length} Products Found
              </h3>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Technical Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutTabs />

      {/* Business Credentials */}
      <BusinessCredentials />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo className="h-8" />
                <div>
                  <h3 className="text-lg font-bold">CableConnect</h3>
                  <p className="text-sm text-gray-400">Solutions</p>
                </div>
              </div>
              <p className="text-gray-400">Professional networking solutions for businesses worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Ethernet Cables</li>
                <li>Patch Panels</li>
                <li>Network Switches</li>
                <li>Fiber Optic</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Technical Support</li>
                <li>Installation Guide</li>
                <li>Warranty</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@cableconnect.com</li>
                <li>1-800-CABLE-01</li>
                <li>Mon-Fri 9AM-6PM EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CableConnect Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      {checkoutData && (
        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={checkoutData.items}
          total={checkoutData.total}
        />
      )}
    </div>
  );
};

export default Index;
