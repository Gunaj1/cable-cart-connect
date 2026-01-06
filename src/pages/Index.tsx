import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Map, Star, ArrowRight, Sparkles } from 'lucide-react';
import ChatBot from '../components/ChatBot';
import ClientLogoStrip from '../components/ClientLogoStrip';
import MegaMenuNavbar from '../components/MegaMenuNavbar';
import Logo from '../components/Logo';
import AboutTabs from '../components/AboutTabs';
import ServicesSection from '../components/ServicesSection';
import BusinessCredentials from '../components/BusinessCredentials';
import { useComparison } from '../contexts/ComparisonContext';
import { getProductDetails } from '../data/productImages';
import AmazonStyleFilter from '@/components/AmazonStyleFilter';
import BulkQuoteForm from '@/components/BulkQuoteForm';
import ManufacturingAnimation from '@/components/ManufacturingAnimation';

// Re-export categories for other pages that depend on it
export { categories } from '@/data/products';
import { categories as sharedCategories } from '@/data/products';
import { motion } from 'framer-motion';

import { Product } from '@/types/Product';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import ProductCompareDrawer from '@/components/ProductCompareDrawer';
import ComparisonFloatingButton from '@/components/ComparisonFloatingButton';

const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const Index = () => {
  const location = window.location;
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isBulkQuoteOpen, setIsBulkQuoteOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { comparisonProducts, clearComparison } = useComparison();

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  const [products, setProducts] = useState<Product[]>(() => {
    return sharedCategories.flatMap(category => category.products.map(product => ({
      ...product,
      stock: product.stock || Math.floor(Math.random() * 100) + 10,
      applications: (product as any).detailedDescription?.applications || [],
      features: (product as any).detailedDescription?.features || [],
      specifications: (product as any).detailedDescription?.specifications?.reduce((acc: Record<string, string>, spec: string, index: number) => {
        acc[`spec_${index}`] = spec;
        return acc;
      }, {}) || {}
    })));
  });

  React.useEffect(() => {
    if (filteredProducts.length === 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    let filtered = [...products];

    if (selectedCategory) {
      const selectedCat = sharedCategories.find(cat => cat.id === selectedCategory);
      if (selectedCat) {
        const categoryProductIds = selectedCat.products.map(p => p.id);
        filtered = filtered.filter(p => categoryProductIds.includes(p.id));
      }
    }

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    if (filters.priceRange && filters.priceRange.length === 2) {
      filtered = filtered.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
    }

    if (filters.availability && filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        if (filters.availability.includes('in-stock') && product.stock > 5) return true;
        if (filters.availability.includes('low-stock') && product.stock <= 5 && product.stock > 0) return true;
        if (filters.availability.includes('out-of-stock') && product.stock === 0) return true;
        return false;
      });
    }

    if (filters.applications && filters.applications.length > 0) {
      filtered = filtered.filter(product =>
        product.applications && filters.applications.some((app: string) => product.applications.includes(app))
      );
    }

    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(product =>
        product.features && filters.features.some((feature: string) => product.features.includes(feature))
      );
    }

    if (filters.specifications && filters.specifications.length > 0) {
      filtered = filtered.filter(product =>
        product.specifications && filters.specifications.some((spec: string) => Object.keys(product.specifications).includes(spec))
      );
    }

    if (filters.sortOption) {
      switch (filters.sortOption) {
        case 'price-low-high':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => (b.rating || 4) - (a.rating || 4));
          break;
        case 'newest':
          filtered.reverse();
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <MegaMenuNavbar
        products={products}
        onProductSelect={product => {
          setQuickViewProduct(product);
          setIsQuickViewOpen(true);
        }}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      {/* Hero Section - Manufacturing Animation */}
      <div id="home">
        <ManufacturingAnimation />
      </div>

      {/* Need Help Section - Premium Glass Design */}
      <section className="relative py-32 overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Premium badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300 tracking-wide">Expert Guidance Available</span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Need Help Choosing
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                the Right Cable?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Our engineers bring 27+ years of expertise to help you find the perfect solution for your specific requirements
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.a
                href="/technical-consultation"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 transition-all duration-500 group-hover:scale-105" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                
                <span className="relative z-10 text-white">Get Technical Consultation</span>
                <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/bulk-quote"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg border-2 border-slate-700 hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300"
              >
                <span className="text-white">Request Bulk Quote</span>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Logo Strip */}
      <ClientLogoStrip />

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Credentials Section */}
      <div id="credentials">
        <BusinessCredentials />
      </div>

      {/* Hidden sections for navigation scroll targets */}
      <div id="about" className="hidden">
        <div className="bg-gradient-to-br from-white to-blue-50 py-20">
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
      </div>

      <div id="products" className="hidden">
        {/* Products available through Consumer menu */}
      </div>

      {/* Contact Section - Luxury Dark Design */}
      <section id="contact" className="relative py-32 overflow-hidden">
        {/* Premium dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Subtle accent gradients */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-900/15 rounded-full blur-[130px]" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
              We're here to help with all your cable and networking needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 to-cyan-600/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 h-full">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  Contact Us
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group/item">
                    <div className="p-3 rounded-xl bg-slate-800/50 group-hover/item:bg-blue-500/10 transition-colors">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Phone</p>
                      <p className="text-white text-lg font-medium">+91 9717535050</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group/item">
                    <div className="p-3 rounded-xl bg-slate-800/50 group-hover/item:bg-blue-500/10 transition-colors">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Email</p>
                      <p className="text-white text-lg font-medium">info@chhajercables.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group/item">
                    <div className="p-3 rounded-xl bg-slate-800/50 group-hover/item:bg-blue-500/10 transition-colors">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Address</p>
                      <p className="text-white font-medium leading-relaxed">A6 Jhilmil Industrial Area,<br />New Delhi 110095, India</p>
                    </div>
                  </div>

                  {/* Premium Action Buttons */}
                  <div className="pt-6 space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open('https://www.google.com/maps/dir//A6+Jhilmil+Industrial+Area,+New+Delhi+110095,+India/@28.6851,77.2426,17z', '_blank')}
                      className="w-full relative group/btn overflow-hidden rounded-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover/btn:scale-105" />
                      <div className="relative flex items-center justify-center gap-3 px-6 py-4">
                        <Map className="w-5 h-5 text-white" />
                        <span className="font-semibold text-white">View on Google Maps</span>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open('https://www.google.com/search?sca_esv=12e50a14a6107b85&rlz=1C1VDKB_en-GBIN1101IN1101&sxsrf=AE3TifOC_UIgONEdUsFEhFLFxI6OUre3tA:1756626174964&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E3fIPw7Xl6VH7ZUJS1CPV8ZrDr_9-DqpOFAlEM0oTwJ3xRRZyt5ReYrvuAKLcVKLukLFLUhMCcxPcElH1FiSsndQHSTPxNwSCFEA-nAYxIUWfs10xw%3D%3D&q=Chhajer+Cable+Industries+Reviews&sa=X&ved=2ahUKEwjcxKW5xrSPAxXFSWwGHZcWI_AQ0bkNegQIHhAE&biw=1366&bih=641&dpr=1#lrd=0x390cfbf65a34cc11:0x4402284828be60a5,3', '_blank')}
                      className="w-full relative group/btn overflow-hidden rounded-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-transform group-hover/btn:scale-105" />
                      <div className="relative flex items-center justify-center gap-3 px-6 py-4">
                        <Star className="w-5 h-5 text-white fill-current" />
                        <span className="font-semibold text-white">Rate Us on Google</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 h-full">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  Follow Us
                </h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Stay connected with us on social media for the latest updates, product news, and industry insights.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Facebook, label: 'Facebook', color: 'from-blue-600 to-blue-500' },
                    { icon: Twitter, label: 'Twitter', color: 'from-sky-500 to-cyan-500' },
                    { icon: Linkedin, label: 'LinkedIn', color: 'from-blue-700 to-blue-600' },
                    { icon: Instagram, label: 'Instagram', color: 'from-pink-600 to-purple-600' }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/social relative overflow-hidden rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors p-5"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover/social:opacity-10 transition-opacity`} />
                      <div className="flex flex-col items-center gap-3">
                        <social.icon className="w-7 h-7 text-slate-400 group-hover/social:text-white transition-colors" />
                        <span className="text-sm text-slate-500 group-hover/social:text-slate-300 font-medium transition-colors">{social.label}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Business Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/50 to-blue-600/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 h-full">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Business Hours
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30">
                    <div>
                      <p className="text-white font-semibold text-lg">Wed - Mon</p>
                      <p className="text-slate-500 text-sm">Regular hours</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold text-xl">8:00 AM</p>
                      <p className="text-cyan-400 font-bold text-xl">6:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-red-950/30 border border-red-900/30">
                    <div>
                      <p className="text-white font-semibold text-lg">Tuesday</p>
                      <p className="text-slate-500 text-sm">Weekly off</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
                      <p className="text-red-400 font-semibold">Closed</p>
                    </div>
                  </div>
                </div>

                {/* Quick response guarantee */}
                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border border-blue-800/30">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <p className="text-white font-medium">Quick Response</p>
                      <p className="text-slate-400 text-sm">We typically respond within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amazon Style Filter Panel */}
      <AmazonStyleFilter
        products={products}
        onFilterChange={handleFilterChange}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Quick View Modal */}
      <ProductQuickView product={quickViewProduct} isOpen={isQuickViewOpen} onClose={() => {
        setIsQuickViewOpen(false);
        setQuickViewProduct(null);
      }} />

      {/* Compare Drawer */}
      <ProductCompareDrawer isOpen={isCompareDrawerOpen} onOpenChange={setIsCompareDrawerOpen} onViewFullComparison={() => {}} />

      {/* Bulk Quote Modal */}
      {isBulkQuoteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BulkQuoteForm
              onClose={() => setIsBulkQuoteOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Floating Compare Button */}
      <ComparisonFloatingButton onOpenComparison={() => setIsCompareDrawerOpen(true)} />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Index;
