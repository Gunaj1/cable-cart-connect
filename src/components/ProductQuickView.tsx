// ProductQuickView.tsx
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, ZoomIn, Star, Award, Shield, Zap, Check, Plus, Minus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getProductDetails } from '@/data/productImages';
import { Product } from '@/types/Product';
import { imageService } from '@/services/imageService';

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
  const [productImages, setProductImages] = useState<string[]>([]);
  const [imagesLoading, setImagesLoading] = useState(false);

  // Load AI-generated images when product changes
  useEffect(() => {
    const loadImages = async () => {
      if (!product) {
        setProductImages([]);
        return;
      }

      setImagesLoading(true);
      try {
        const images = await imageService.getProductImages(product);
        setProductImages(images.length > 0 ? images : [product.image].filter(Boolean));
      } catch (error) {
        console.error('Failed to load product images:', error);
        setProductImages([product.image].filter(Boolean));
      } finally {
        setImagesLoading(false);
      }
    };

    loadImages();
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setQuantity(1);
      setActiveTab('overview');
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

  const productDetails = getProductDetails(product.id);
  const images = productImages.length > 0 ? productImages : productDetails.images;

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

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Make the panel a flex column and constrain height; inner content gets its own scroll */}
        <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl animate-scale-in flex flex-col">
          {/* Header (fixed) */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{productDetails.title}</h2>
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

          {/* Body wrapper (scrollable area) */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-auto">
              {/* Left: Image Gallery */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="h-full flex flex-col">
                   {/* Main Image */}
                   <div className="relative aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden mb-4">
                     {imagesLoading ? (
                       <div className="w-full h-full flex items-center justify-center bg-gray-100">
                         <div className="text-center">
                           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                           <p className="text-sm text-gray-600">Generating product images...</p>
                         </div>
                       </div>
                     ) : (
                       <img
                         src={images[currentImageIndex]}
                         alt={`${productDetails.title} - View ${currentImageIndex + 1}`}
                         className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
                         onClick={() => setIsImageZoomed(true)}
                       />
                     )}

                     {/* Navigation Arrows */}
                     {!imagesLoading && images.length > 1 && (
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
                     {!imagesLoading && (
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
                     {!imagesLoading && images.length > 0 && (
                       <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                         {currentImageIndex + 1} / {images.length}
                       </div>
                     )}
                  </div>

                   {/* Thumbnail Strip */}
                   {!imagesLoading && images.length > 1 && (
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
                     </div>
                   )}

                   {/* AI Generation Status */}
                   {imagesLoading && (
                     <div className="text-center text-sm text-gray-600 mt-2">
                       <p>Generating 5 professional product images...</p>
                       <p className="text-xs mt-1">Hero shot • Close-up • Alternate view • In-use • Packaging</p>
                     </div>
                   )}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="flex flex-col h-full">
                {/* Product Info Header */}
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{productDetails.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">(4.2)</span>
                        <Badge variant="secondary">Best Seller</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        ${product.price.toFixed(2)}
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        ✓ In Stock ({product.stock || 50}+ available)
                      </p>
                    </div>
                  </div>

                   {/* Uniform Quality Badges - Always Show These 4 */}
                   <div className="flex flex-wrap gap-2 mb-4">
                     <Badge variant="outline" className="flex items-center gap-1">
                       <Shield className="w-3 h-3" />
                       Customization Available
                     </Badge>
                     <Badge variant="outline" className="flex items-center gap-1">
                       <Award className="w-3 h-3" />
                       Fluke Test Passed
                     </Badge>
                     <Badge variant="outline" className="flex items-center gap-1">
                       <Zap className="w-3 h-3" />
                       DCM Tested
                     </Badge>
                     <Badge variant="outline" className="flex items-center gap-1">
                       <Shield className="w-3 h-3" />
                       OEM Supplier
                     </Badge>
                   </div>

                  <p className="text-gray-700 leading-relaxed">
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
                            "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                            activeTab === tab.id
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-600 hover:text-gray-900"
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content (scrolls with the whole body) */}
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-sm">Quality Tested</h4>
                            <p className="text-xs text-gray-600">Fluke & DCM Certified</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-sm">OEM Grade</h4>
                            <p className="text-xs text-gray-600">Professional Quality</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-sm">High Speed</h4>
                            <p className="text-xs text-gray-600">Optimized Performance</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Key Highlights</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500" />
                              Professional grade construction
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500" />
                              Industry standard compliance
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500" />
                              Customizable options available
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === 'specs' && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg mb-4">Technical Specifications</h4>
                        <div className="grid gap-3">
                          {Object.entries(productDetails.specifications).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100 last:border-b-0">
                              <dt className="font-medium text-sm text-gray-900">{key}</dt>
                              <dd className="col-span-2 text-sm text-gray-700">{value}</dd>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'applications' && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg mb-4">Applications & Use Cases</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {productDetails.applications.map((app, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-800">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg mb-4">Key Features & Benefits</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {productDetails.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-800">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions (fixed by the outer panel; will remain visible while body scrolls) */}
                <div className="p-6 border-t bg-gray-50">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Price</div>
                      <div className="text-xl font-bold text-blue-600">
                        ${(product.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3"
                      size="lg"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="px-4"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="px-4"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>

                    {onViewDetails && (
                      <Button
                        variant="outline"
                        onClick={() => onViewDetails(product)}
                        className="px-6"
                        size="lg"
                      >
                        View Full Details
                      </Button>
                    )}
                  </div>

                  {/* Trust Signals */}
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <Shield className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">2-Year Warranty</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Quality Certified</p>
                    </div>
                    <div className="text-center">
                      <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Fast Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Right */}
            </div>
          </div>
          {/* End Body wrapper */}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-5xl max-h-full">
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
