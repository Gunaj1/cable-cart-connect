import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Shield, 
  Award, 
  Truck,
  ArrowLeft,
  Star,
  ZoomIn,
  Plus,
  Minus,
  Check,
  Share2,
  Download,
  Phone,
  Mail,
  Package,
  Clock,
  BadgeCheck,
  Sparkles,
  CircleCheck,
  Factory,
  TestTube,
  Wrench,
  Globe,
  Cable,
  ChevronDown,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useComparison } from '@/contexts/ComparisonContext';
import { Product } from '@/types/Product';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import { categories } from './Index';
import { productDescriptions } from '@/data/productDescriptions';

interface ProductDetailEnhancedProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

const ProductDetailEnhanced: React.FC<ProductDetailEnhancedProps> = ({ products: propProducts, onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  const { addToComparison, isInComparison } = useComparison();

  const allProducts = propProducts && propProducts.length > 0 
    ? propProducts 
    : categories.flatMap(category => 
        category.products.map(product => ({
          ...product,
          stock: Math.floor(Math.random() * 100) + 10,
          applications: product.detailedDescription?.applications || [],
          features: product.detailedDescription?.features || [],
          specifications: product.detailedDescription?.specifications.reduce((acc: Record<string, string>, spec: string, index: number) => {
            acc[`spec_${index}`] = spec;
            return acc;
          }, {}) || {}
        } as Product))
      );

  const product = allProducts.find(p => 
    String(p.id) === String(productId) ||
    p.name.toLowerCase().replace(/\s+/g, '-') === productId
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <MegaMenuNavbar products={allProducts} onProductSelect={() => {}} />
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
              <Package className="w-16 h-16 text-primary/50" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Product Not Found</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              The product you're looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => navigate('/')} size="lg" className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Catalog
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const parseSpecifications = (product: Product): Record<string, string> => {
    try {
      if (product.detailedDescription?.specifications) {
        if (Array.isArray(product.detailedDescription.specifications)) {
          const specs: Record<string, string> = {};
          product.detailedDescription.specifications.forEach((spec, index) => {
            if (spec.includes(':')) {
              const [key, ...valueParts] = spec.split(':');
              specs[key.trim()] = valueParts.join(':').trim();
            } else {
              specs[`Specification ${index + 1}`] = spec;
            }
          });
          return specs;
        }
        return product.detailedDescription.specifications as Record<string, string>;
      }
      return {};
    } catch (error) {
      return {};
    }
  };

  const specifications = parseSpecifications(product);
  const productSlug = product.name.toLowerCase().replace(/\s+/g, '-');
  const enhancedDescription = productDescriptions[productSlug] || product.description;

  const generateProductSchema = () => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.description,
    "sku": product.id,
    "brand": { "@type": "Brand", "name": "Chhajer Cable Industries" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "256" }
  });

  const productImages = [product.image, product.image, product.image, product.image];

  const certifications = [
    { icon: BadgeCheck, label: 'OEM Supplier', description: 'Certified Original Equipment Manufacturer', color: 'from-blue-500 to-blue-600' },
    { icon: TestTube, label: 'Fluke Tested', description: 'Verified by Fluke Networks', color: 'from-green-500 to-green-600' },
    { icon: Factory, label: 'DCM Tested', description: 'Data Communications Certified', color: 'from-purple-500 to-purple-600' },
    { icon: Wrench, label: 'Customizable', description: 'Tailored to Your Specifications', color: 'from-orange-500 to-orange-600' }
  ];

  const features = product.features || product.detailedDescription?.features || [
    'High-quality conductor material',
    'Premium insulation for signal integrity',
    'Durable outer jacket',
    'Color-coded pairs for easy identification',
    'RoHS compliant materials'
  ];

  const applications = product.applications || product.detailedDescription?.applications || [
    'Enterprise networking',
    'Data centers',
    'Telecommunications',
    'Security systems',
    'Audio/Video installations'
  ];

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{product.name} | Chhajer Cable Industries - Premium Cables Since 1997</title>
        <meta name="description" content={`${product.name} - ${product.description}. High-quality networking cables from Chhajer Cable Industries.`} />
        <script type="application/ld+json">{JSON.stringify(generateProductSchema())}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <MegaMenuNavbar products={allProducts} onProductSelect={() => {}} />
        
        {/* Hero Section with Gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 py-8 relative">
            {/* Breadcrumb */}
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm mb-8"
            >
              <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Home
              </button>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground capitalize">{product.category}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-semibold">{product.name}</span>
            </motion.nav>

            {/* Main Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Image Gallery */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Main Image Container */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative aspect-square bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                    {imageError ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <div className="text-center">
                          <Cable className="w-24 h-24 mx-auto mb-4 text-primary/50" />
                          <p className="text-xl font-bold text-foreground">{product.name}</p>
                          <p className="text-muted-foreground">Premium Quality Cable</p>
                        </div>
                      </div>
                    ) : (
                      <motion.img
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src={productImages[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-contain p-8 cursor-zoom-in hover:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
                        onClick={() => setIsImageZoomed(true)}
                      />
                    )}
                    
                    {/* Image Navigation */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="bg-background/90 backdrop-blur-sm shadow-lg hover:bg-background"
                        onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                        disabled={currentImageIndex === 0}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="bg-background/90 backdrop-blur-sm shadow-lg hover:bg-background"
                        onClick={() => setCurrentImageIndex(Math.min(productImages.length - 1, currentImageIndex + 1))}
                        disabled={currentImageIndex === productImages.length - 1}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Zoom Button */}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setIsImageZoomed(true)}
                    >
                      <ZoomIn className="w-5 h-5" />
                    </Button>

                    {/* Stock Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500/90 text-white border-0 shadow-lg">
                        <CircleCheck className="w-3 h-3 mr-1" />
                        In Stock
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 justify-center">
                  {productImages.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shadow-md ${
                        currentImageIndex === index 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-contain bg-card p-2"
                        onError={() => setImageError(true)}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Product Information */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                {/* Product Title & Rating */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                      {product.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Best Seller
                    </Badge>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-foreground mb-3 leading-tight">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-muted-foreground/30'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">4.8</span>
                    <span className="text-sm text-muted-foreground">(256 reviews)</span>
                    <span className="text-sm text-green-600 font-medium">✓ Verified Quality</span>
                  </div>
                </div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-card to-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${cert.color} text-white shadow-lg`}>
                        <cert.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{cert.label}</p>
                        <p className="text-xs text-muted-foreground">{cert.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Price Section */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{(product.price * 1.2).toFixed(2)}</span>
                    <Badge className="bg-red-500 text-white border-0">20% OFF</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Inclusive of all taxes | Free shipping on orders above ₹5000
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <Package className="w-4 h-4" />
                      {product.stock || 50}+ units available
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Ships in 24-48 hours
                    </span>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold text-foreground">Quantity:</label>
                    <div className="flex items-center gap-2 bg-card rounded-xl border border-border/50 p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-lg"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-lg"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => onAddToCart?.(product)} 
                      className="flex-1 h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                      size="lg"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 w-14 rounded-xl border-2">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className={`h-14 w-14 rounded-xl border-2 ${isInComparison(product.id) ? 'bg-primary/10 border-primary' : ''}`}
                      onClick={() => addToComparison(product)}
                      disabled={isInComparison(product.id)}
                    >
                      {isInComparison(product.id) ? <Check className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                {/* Quick Benefits */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: Truck, text: 'Free Shipping', sub: 'On orders ₹5000+' },
                    { icon: Shield, text: '2-Year Warranty', sub: 'Full coverage' },
                    { icon: Award, text: 'Quality Certified', sub: 'ISO 9001:2015' },
                    { icon: Globe, text: 'Pan India Delivery', sub: '3-5 business days' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
                      <benefit.icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{benefit.text}</p>
                        <p className="text-xs text-muted-foreground">{benefit.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Product Details Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs defaultValue="overview" className="mb-16">
                <TabsList className="w-full justify-start gap-2 bg-card/50 p-2 rounded-2xl border border-border/50 mb-8 flex-wrap h-auto">
                  {['Overview', 'Specifications', 'Features', 'Applications', 'Reviews', 'Support'].map((tab) => (
                    <TabsTrigger 
                      key={tab}
                      value={tab.toLowerCase()} 
                      className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-medium"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 rounded-2xl border-border/50 shadow-xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <Info className="w-5 h-5 text-primary" />
                          Product Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="prose prose-lg max-w-none">
                          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                            {product.description}
                          </p>
                          <div className="bg-muted/30 rounded-xl p-6 border border-border/30">
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-primary" />
                              Detailed Specifications
                            </h4>
                            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
                              {enhancedDescription}
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="space-y-6">
                      <Card className="rounded-2xl border-border/50 shadow-xl">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent border-b border-border/30">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <CircleCheck className="w-5 h-5 text-green-500" />
                            Quality Assurance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                          {['Fluke Test Certified', 'DCM Performance Tested', 'ISO 9001:2015', 'RoHS Compliant', '100% Quality Check'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-foreground">{item}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="rounded-2xl border-border/50 shadow-xl">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Phone className="w-5 h-5 text-primary" />
                            Need Help?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                          <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl">
                            <Phone className="w-4 h-4 text-primary" />
                            Call: +91 XXXX XXXX XX
                          </Button>
                          <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl">
                            <Mail className="w-4 h-4 text-primary" />
                            Email Support
                          </Button>
                          <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90">
                            <Download className="w-4 h-4 mr-2" />
                            Download Datasheet
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-0">
                  <Card className="rounded-2xl border-border/50 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Zap className="w-5 h-5 text-primary" />
                        Technical Specifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(specifications).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex justify-between items-center p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors group"
                          >
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">{key}</span>
                            <span className="text-muted-foreground text-right">{value}</span>
                          </motion.div>
                        ))}
                      </div>
                      {Object.keys(specifications).length === 0 && (
                        <div className="bg-muted/30 rounded-xl p-6">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                            {enhancedDescription}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="mt-0">
                  <Card className="rounded-2xl border-border/50 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Key Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/20 hover:border-green-500/40 transition-colors"
                          >
                            <div className="p-2 rounded-lg bg-green-500/10">
                              <Check className="w-5 h-5 text-green-500" />
                            </div>
                            <span className="text-foreground font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="applications" className="mt-0">
                  <Card className="rounded-2xl border-border/50 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Globe className="w-5 h-5 text-primary" />
                        Applications & Use Cases
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.map((app, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                                <Zap className="w-5 h-5 text-primary" />
                              </div>
                              <span className="font-medium text-foreground">{app}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                  <Card className="rounded-2xl border-border/50 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-transparent border-b border-border/30">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        Customer Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                          <div className="text-5xl font-bold text-foreground mb-2">4.8</div>
                          <div className="flex justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-muted-foreground">Based on 256 reviews</p>
                        </div>
                        <div className="lg:col-span-2 space-y-3">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-3">
                              <span className="text-sm font-medium w-8">{stars}★</span>
                              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                  style={{ width: `${stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : 2}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12">{stars === 5 ? '75%' : stars === 4 ? '18%' : stars === 3 ? '5%' : '2%'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { name: 'Rajesh Kumar', rating: 5, comment: 'Excellent quality cable! Fast delivery and great packaging. Using it for our office network setup.', date: '2 weeks ago' },
                          { name: 'Priya Sharma', rating: 5, comment: 'Very satisfied with the purchase. The cable quality is top-notch and performance is as expected.', date: '1 month ago' },
                          { name: 'Amit Patel', rating: 4, comment: 'Good product for the price. Would recommend for small to medium installations.', date: '1 month ago' }
                        ].map((review, i) => (
                          <div key={i} className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold">
                                {review.name[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{review.name}</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {[...Array(review.rating)].map((_, j) => (
                                      <Star key={j} className="w-3 h-3 text-yellow-400 fill-current" />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="support" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="rounded-2xl border-border/50 shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <Download className="w-5 h-5 text-primary" />
                          Downloads
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        {['Product Datasheet', 'Installation Guide', 'Technical Specifications', 'Compliance Certificates'].map((doc, i) => (
                          <Button key={i} variant="outline" className="w-full justify-between h-14 rounded-xl">
                            <span className="flex items-center gap-3">
                              <Download className="w-4 h-4 text-primary" />
                              {doc}
                            </span>
                            <Badge variant="secondary">PDF</Badge>
                          </Button>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-border/50 shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/30">
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <Phone className="w-5 h-5 text-primary" />
                          Contact Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <p className="text-muted-foreground">Need help with this product? Our expert team is here to assist you.</p>
                        <div className="space-y-3">
                          <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-primary/90">
                            <Phone className="w-4 h-4 mr-2" />
                            Request a Callback
                          </Button>
                          <Button variant="outline" className="w-full h-14 rounded-xl">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email Inquiry
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-16"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Related Products</h2>
                    <p className="text-muted-foreground">Explore more products in this category</p>
                  </div>
                  <Button variant="outline" className="rounded-xl gap-2" onClick={() => navigate('/')}>
                    View All Products
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      className="group cursor-pointer"
                    >
                      <Card className="rounded-2xl border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/30 h-full">
                        <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted/30 p-6 relative overflow-hidden">
                          <img 
                            src={relatedProduct.image} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary font-semibold bg-background/90 px-4 py-2 rounded-full text-sm">
                              View Details
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{relatedProduct.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary text-lg">₹{relatedProduct.price.toFixed(2)}</span>
                            <Badge variant="secondary" className="text-xs">
                              <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                              4.8
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>

        {/* Image Zoom Modal */}
        <AnimatePresence>
          {isImageZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-8"
              onClick={() => setIsImageZoomed(false)}
            >
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-8 right-8 rounded-full"
                onClick={() => setIsImageZoomed(false)}
              >
                ✕
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetailEnhanced;
