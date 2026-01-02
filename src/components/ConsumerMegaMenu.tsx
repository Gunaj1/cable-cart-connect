import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cable, Wifi, Network, Video, Phone, Monitor, Layers, Volume2,
  ChevronRight, Zap, Shield, ArrowRight
} from 'lucide-react';
import { categories } from '@/data/products';

interface ConsumerMegaMenuProps {
  isVisible: boolean;
}

const categoryIcons: Record<string, any> = {
  'Patchcords': Cable,
  'Cat5e LAN Cables': Network,
  'Cat 6 LAN Cable': Wifi,
  'CCTV Cable': Video,
  'Telephone Cable': Phone,
  'Computer Cords': Monitor,
  'Lift Cables': Layers,
  'Speaker Cable': Volume2
};

const categoryColors: Record<string, string> = {
  'Patchcords': 'from-blue-500 to-blue-700',
  'Cat5e LAN Cables': 'from-emerald-500 to-emerald-700',
  'Cat 6 LAN Cable': 'from-violet-500 to-violet-700',
  'CCTV Cable': 'from-rose-500 to-rose-700',
  'Telephone Cable': 'from-amber-500 to-amber-700',
  'Computer Cords': 'from-cyan-500 to-cyan-700',
  'Lift Cables': 'from-indigo-500 to-indigo-700',
  'Speaker Cable': 'from-pink-500 to-pink-700'
};

const ConsumerMegaMenu: React.FC<ConsumerMegaMenuProps> = ({ isVisible }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    // Always trigger animation by incrementing key
    setAnimationKey(prev => prev + 1);
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="w-screen bg-gradient-to-b from-background via-background to-muted/30 border-b shadow-2xl">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Our Products</h2>
              <p className="text-sm text-muted-foreground">Premium networking solutions for every need</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Quality Certified Since 1997</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || Cable;
            const isActive = activeCategory === category.name;
            const colorClass = categoryColors[category.name] || 'from-primary to-primary/70';
            
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`
                  relative group p-4 rounded-xl border transition-all duration-300
                  ${isActive 
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25' 
                    : 'bg-card hover:bg-accent border-border hover:border-primary/50 hover:shadow-md'
                  }
                `}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className={`
                    p-2.5 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-primary-foreground/20' 
                      : `bg-gradient-to-br ${colorClass} text-white shadow-md`
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold leading-tight line-clamp-2">
                    {category.name}
                  </span>
                  <span className={`text-[10px] ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {category.products.length} Products
                  </span>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary-foreground rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Products Panel */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={`${activeCategory}-${animationKey}`}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="py-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    {React.createElement(categoryIcons[activeCategory] || Cable, { className: 'w-5 h-5 text-primary' })}
                    {activeCategory}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    Click on any product to view details
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                  {categories
                    .find(c => c.name === activeCategory)
                    ?.products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="group cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className={`
                          relative bg-card rounded-xl border border-border overflow-hidden
                          transition-all duration-300 hover:shadow-xl hover:shadow-primary/10
                          hover:border-primary/50 hover:-translate-y-1
                          ${hoveredProduct === product.id ? 'ring-2 ring-primary/50' : ''}
                        `}>
                          {/* Product Image */}
                          <div className="relative aspect-square overflow-hidden bg-muted">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Speed Badge */}
                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/90 text-primary-foreground text-[10px] font-bold rounded-full backdrop-blur-sm">
                              {product.speed}
                            </div>
                            
                            {/* Quick Action */}
                            <motion.div 
                              className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={false}
                              animate={hoveredProduct === product.id ? { y: 0 } : { y: 10 }}
                            >
                              <div className="flex items-center justify-center gap-1 text-white text-xs font-medium">
                                <span>View Details</span>
                                <ArrowRight className="w-3 h-3" />
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                            
                            {/* Stock indicator */}
                            <div className="flex items-center gap-1 mt-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 30 ? 'bg-emerald-500' : product.stock > 10 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                              <span className="text-[10px] text-muted-foreground">
                                {product.stock > 30 ? 'In Stock' : product.stock > 10 ? 'Limited Stock' : 'Low Stock'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Browse - Show when no category selected */}
        {!activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4 border-t border-border"
          >
            <p className="text-center text-muted-foreground mb-4">
              <span className="text-foreground font-medium">Click on a category above</span> to explore our products, or browse featured items below
            </p>
            
            {/* Featured Products Preview */}
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {categories.slice(0, 8).map((category) => {
                const product = category.products[0];
                if (!product) return null;
                
                return (
                  <motion.div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border group-hover:border-primary/50 transition-all duration-300">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <span className="text-[10px] font-medium text-white/90 line-clamp-1">
                          {category.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConsumerMegaMenu;
