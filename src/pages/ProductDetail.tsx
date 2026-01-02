import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Shield, 
  Award, 
  Truck,
  ArrowLeft,
  Star,
  ZoomIn,
  Play,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { useComparison } from '@/contexts/ComparisonContext';
import { Product } from '@/types/Product';
import ProductCard from '@/components/ProductCard';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import { categories } from './Index';

interface ProductDetailProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products: propProducts, onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToComparison, isInComparison } = useComparison();

  // Use provided products or flatten from categories
  const allProducts = propProducts && propProducts.length > 0 
    ? propProducts 
    : categories.flatMap(category => 
        category.products.map(product => {
          const prod = product as any;
          return {
            ...product,
            stock: product.stock || Math.floor(Math.random() * 100) + 10,
            applications: prod.detailedDescription?.applications || [],
            features: prod.detailedDescription?.features || [],
            specifications: prod.detailedDescription?.specifications?.reduce((acc: Record<string, string>, spec: string, index: number) => {
              acc[`spec_${index}`] = spec;
              return acc;
            }, {}) || {}
          } as Product;
        })
      );

  // Find product from products array by slug ID or name-based slug
  const product = allProducts.find(p => {
    const productIdLower = productId?.toLowerCase() || '';
    const pIdLower = String(p.id).toLowerCase();
    const nameSlug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return pIdLower === productIdLower || nameSlug === productIdLower;
  });

  // Debug logging
  useEffect(() => {
    console.log('ProductDetail Debug:', {
      productId,
      foundProduct: product,
      productsCount: allProducts.length,
      routeParams: { productId }
    });
  }, [productId, product, allProducts]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <MegaMenuNavbar 
          products={allProducts}
          onProductSelect={() => {}}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Safe JSON parsing for specifications
  const parseSpecifications = (product: Product): Record<string, string> => {
    try {
      if (product.detailedDescription?.specifications) {
        // If it's already an array of strings, convert to object
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
      console.warn('Invalid specifications JSON for product:', product.name, error);
      return {};
    }
  };

  const specifications = parseSpecifications(product);

  // Generate multiple product images (4 images + 1 video placeholder)
  const productImages = [
    product.image, // Main image
    product.image, // Duplicate for connector close-up (placeholder)
    product.image, // Duplicate for cable detail (placeholder)
    product.image  // Duplicate for packaging (placeholder)
  ];

  // Uniform badges for all products
  const uniformBadges = [
    { label: 'Customization Available', icon: '🔧' },
    { label: 'Fluke Test Passed', icon: '✅' },
    { label: 'DCM Tested', icon: '🔬' },
    { label: 'OEM Supplier', icon: '🏭' }
  ];

  // Extract variants from specifications
  const extractVariants = (specs: Record<string, string>) => {
    const variants: Record<string, string[]> = {};
    Object.entries(specs).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey.includes('gauge') || lowerKey.includes('shield') || 
          lowerKey.includes('length') || lowerKey.includes('impedance')) {
        // Extract multiple options if separated by commas or 'or'
        const options = value.split(/[,/|]|or\s/i).map(opt => opt.trim()).filter(Boolean);
        if (options.length > 1) {
          variants[key] = options.slice(0, 3); // Limit to 3 options
        }
      }
    });
    return variants;
  };

  const variants = extractVariants(specifications);

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Image improvement needed: ${product.name} (${product.image})`);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      // Pass the product multiple times for quantity
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <MegaMenuNavbar 
          products={allProducts}
          onProductSelect={() => {}}
        />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <button onClick={() => navigate('/')} className="hover:text-foreground">
              Home
            </button>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Media Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-card rounded-lg overflow-hidden border">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted/50">
                    <div className="text-center text-muted-foreground">
                      <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary">CC</span>
                      </div>
                      <p className="text-lg font-semibold">Chhajer Cable</p>
                      <p className="text-sm">High Quality Product Image</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={productImages[currentImageIndex]}
                    alt={`${product.name} - View ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain cursor-zoom-in"
                    onError={handleImageError}
                    onClick={() => setIsImageZoomed(true)}
                  />
                )}
                
                {/* Image Navigation */}
                {productImages.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                      disabled={currentImageIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={() => setCurrentImageIndex(Math.min(productImages.length - 1, currentImageIndex + 1))}
                      disabled={currentImageIndex === productImages.length - 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Zoom Icon */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  onClick={() => setIsImageZoomed(true)}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Thumbnails + Video */}
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-contain bg-muted/30"
                      onError={handleImageError}
                    />
                  </button>
                ))}
                
                {/* Video Placeholder */}
                <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-border bg-muted/50 flex items-center justify-center">
                  <Play className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Product Information & Buy Box */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.2 out of 5)</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">127 reviews</span>
                </div>
                
                {/* Uniform Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {uniformBadges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <span>{badge.icon}</span>
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border-y py-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  ${product.price.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  In stock • {product.stock || 50}+ available
                </p>
              </div>

              {/* Variants */}
              {Object.keys(variants).length > 0 && (
                <div className="space-y-4">
                  {Object.entries(variants).map(([variantName, options]) => (
                    <div key={variantName}>
                      <label className="text-sm font-medium mb-2 block">{variantName}:</label>
                      <div className="flex flex-wrap gap-2">
                        {options.map((option) => (
                          <Button
                            key={option}
                            variant={selectedVariant[variantName] === option ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedVariant(prev => ({ ...prev, [variantName]: option }))}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleAddToCart} className="flex-1" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => addToComparison(product)}
                    disabled={isInComparison(product.id)}
                  >
                    {isInComparison(product.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Tech Specs</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Zap className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-medium">High Performance</h4>
                        <p className="text-sm text-muted-foreground">Professional grade quality</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Shield className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Quality Tested</h4>
                        <p className="text-sm text-muted-foreground">Fluke & DCM certified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Award className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Industry Standard</h4>
                        <p className="text-sm text-muted-foreground">OEM supplier quality</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  {Object.keys(specifications).length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-4 py-2 border-b last:border-b-0">
                          <dt className="font-medium text-sm">{key}</dt>
                          <dd className="col-span-2 text-sm text-muted-foreground">{value}</dd>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Detailed specifications will be available soon.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Applications & Use Cases</h3>
                  {product.detailedDescription?.applications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.detailedDescription.applications.map((app, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{app}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Application details will be available soon.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  {product.detailedDescription?.features ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.detailedDescription.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Feature details will be available soon.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <p className="text-muted-foreground">Reviews and ratings will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compatibility" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Compatibility & Accessories</h3>
                  <p className="text-muted-foreground">Compatibility information will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Related Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    onQuickView={() => {}}
                    onAddToCart={onAddToCart || (() => {})}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {isImageZoomed && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setIsImageZoomed(false)}
              >
                ×
              </Button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetail;