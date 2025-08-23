import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, ZoomIn, Star, Award, Shield, Zap, Check, Plus, Minus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getProductDetails } from '@/data/productImages';
import { Product } from '@/types/Product';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  onViewDetails?: (product: Product) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onViewDetails
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'applications' | 'features'>('overview');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setQuantity(1);
      setActiveTab('overview');
      setImageError(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Get unified product details
  const productDetails = getProductDetails(product.id);
  const images = productDetails.images;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl animate-scale-in flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{productDetails.title}</h2>
                <p className="text-blue-100 text-sm">Professional Grade Quality</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-auto">
              {/* Left: Image Gallery */}
              <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="h-full flex flex-col">
                  {/* Main Image */}
                  <div className="relative aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                    {imageError ? (
                      <div className="w-full h-full flex items-center justify-center bg-muted/50">
                        <div className="text-center text-muted-foreground">
                          <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary">CC</span>
                          </div>
                          <p className="text-lg font-semibold">Chhajer Cable</p>
                          <p className="text-sm">Professional Product Image</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={images[currentImageIndex]}
                        alt={`${productDetails.title} - View ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
                        onClick={() => setIsImageZoomed(true)}
                        onError={handleImageError}
                      />
                    )}

                    {/* Navigation Arrows */}
                    {images.length > 1 && !imageError && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                          onClick={nextImage}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </>
                    )}

                    {/* Zoom Icon */}
                    {!imageError && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg"
                        onClick={() => setIsImageZoomed(true)}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    )}

                    {/* Image Counter */}
                    {!imageError && (
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {!imageError && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                            currentImageIndex === index
                              ? "border-blue-500 shadow-lg scale-105"
                              : "border-gray-200 hover:border-blue-300"
                          )}
                        >
                          <img
                            src={image}
                            alt={`View ${index + 1}`}
                            className="w-full h-full object-contain bg-white"
                          />
                        </button>
                      ))}
                      
                      {/* Video Placeholder */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 bg-muted/50 flex items-center justify-center">
                        <Play className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="flex flex-col h-full">
                {/* Product Info Header */}
                <div className="p-8 border-b">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">{productDetails.title}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">(4.2 out of 5)</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Best Seller</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        ${product.price.toFixed(2)}
                      </div>
                      <p className="text-sm text-green-600 font-semibold flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        In Stock ({product.stock || 50}+ available)
                      </p>
                    </div>
                  </div>

                  {/* Quality Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                      <Shield className="w-4 h-4" />
                      Fluke Tested
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                      <Award className="w-4 h-4" />
                      OEM Quality
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                      <Zap className="w-4 h-4" />
                      High Performance
                    </Badge>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {productDetails.description}
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="border-b sticky top-0 bg-white z-10">
                    <div className="flex">
                      {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'specs', label: 'Specifications' },
                        { id: 'applications', label: 'Applications' },
                        { id: 'features', label: 'Features' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={cn(
                            "px-6 py-4 text-sm font-semibold border-b-2 transition-colors",
                            activeTab === tab.id
                              ? "border-blue-500 text-blue-600 bg-blue-50"
                              : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="p-8 flex-1">
                    {activeTab === 'overview' && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                            <Shield className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                            <h4 className="font-bold text-sm mb-2">Quality Tested</h4>
                            <p className="text-xs text-gray-600">Fluke & DCM Certified</p>
                          </div>
                          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                            <Award className="w-10 h-10 text-green-600 mx-auto mb-3" />
                            <h4 className="font-bold text-sm mb-2">OEM Grade</h4>
                            <p className="text-xs text-gray-600">Professional Quality</p>
                          </div>
                          <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                            <Zap className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                            <h4 className="font-bold text-sm mb-2">High Speed</h4>
                            <p className="text-xs text-gray-600">Optimized Performance</p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                          <h4 className="font-bold text-lg mb-4">Key Highlights</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {productDetails.features.slice(0, 6).map((feature, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'specs' && (
                      <div className="space-y-6">
                        <h4 className="font-bold text-2xl mb-6 text-gray-900">Technical Specifications</h4>
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                          <div className="grid gap-4">
                            {Object.entries(productDetails.specifications).map(([key, value]) => (
                              <div key={key} className="grid grid-cols-3 gap-6 py-3 border-b border-gray-200 last:border-b-0">
                                <dt className="font-bold text-sm text-gray-900">{key}</dt>
                                <dd className="col-span-2 text-sm text-gray-700 font-medium">{value}</dd>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'applications' && (
                      <div className="space-y-6">
                        <h4 className="font-bold text-2xl mb-6 text-gray-900">Applications & Use Cases</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {productDetails.applications.map((app, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-blue-100">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm font-semibold text-gray-800">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="space-y-6">
                        <h4 className="font-bold text-2xl mb-6 text-gray-900">Key Features & Benefits</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {productDetails.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                              <Check className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-semibold text-gray-800">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t bg-gradient-to-r from-gray-50 to-blue-50">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold">Quantity:</span>
                      <div className="flex items-center gap-3 bg-white rounded-lg p-1 border border-gray-200">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 font-medium">Total Price</div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${(product.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 text-lg"
                      size="lg"
                    >
                      <ShoppingCart className="w-6 h-6 mr-3" />
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="px-6 py-4"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="px-6 py-4"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>

                    {onViewDetails && (
                      <Button
                        variant="outline"
                        onClick={() => onViewDetails(product)}
                        className="px-8 py-4 font-semibold"
                        size="lg"
                      >
                        View Full Details
                      </Button>
                    )}
                  </div>

                  {/* Trust Signals */}
                  <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-gray-600">2-Year Warranty</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-gray-600">Quality Certified</p>
                    </div>
                    <div className="text-center">
                      <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-gray-600">Fast Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed && !imageError && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={images[currentImageIndex]}
              alt={productDetails.title}
              className="w-full h-full object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsImageZoomed(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductQuickView;