import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Cable, Wifi, Network, Video, Phone, Monitor, Layers, Volume2,
  Home, Building2, Award, Briefcase, MapPin, Users, 
  FileText, Image, Star, ChevronDown, Map
} from 'lucide-react';
import Logo from './Logo';
import ProductSearch from './ProductSearch';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  stock: number;
}

interface MegaMenuNavbarProps {
  products?: Product[];
  onProductSelect?: (product: Product) => void;
  onFilterClick?: () => void;
}

const MegaMenuNavbar: React.FC<MegaMenuNavbarProps> = ({ 
  products = [], 
  onProductSelect = () => {},
  onFilterClick 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Category icons mapping
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

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(productsByCategory).map(categoryName => ({
    name: categoryName,
    icon: categoryIcons[categoryName] || Cable,
    products: productsByCategory[categoryName]
  }));

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (section: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={handleHomeClick}>
            <Logo className="h-12" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-gray-700 bg-clip-text text-transparent">
                Chhajer Cable Industries
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Quality Cables Since 1997</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  onClick={handleHomeClick}
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                    location.pathname === '/' && "text-primary"
                  )}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Consumers Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  <Building2 className="w-4 h-4 mr-2" />
                  Consumers
                </NavigationMenuTrigger>
              <NavigationMenuContent className="!fixed !left-0 !right-0 !top-[72px] !translate-x-0 !w-[100vw] origin-top transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:opacity-100 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=closed]:-translate-y-2.5 data-[state=closed]:pointer-events-none">
                  <div className="w-full h-[85vh] max-h-[85vh] overflow-hidden bg-background shadow-2xl border-b">
                    <div className="px-8 py-10 h-full">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-6 gap-y-8 auto-rows-min">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <div key={category.name} className="space-y-4">
                              <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span className="whitespace-nowrap">{category.name}</span>
                              </div>
                              <div className="space-y-2">
                                {category.products.map((product) => (
                                  <button
                                    key={product.id}
                                    onClick={() => handleProductClick(product)}
                                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                                  >
                                    {product.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Company Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!fixed !left-0 !right-0 !top-[72px] !translate-x-0 !w-[100vw] origin-top transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:opacity-100 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=closed]:-translate-y-2.5 data-[state=closed]:pointer-events-none">
                  <div className="w-full h-[85vh] max-h-[85vh] overflow-hidden bg-background shadow-2xl border-b">
                    <div className="px-8 py-10 h-full">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-8 auto-rows-min">
                        {/* About Section */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                            <Building2 className="w-5 h-5 flex-shrink-0" />
                            <span>About</span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => scrollToSection('about')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              About Us
                            </button>
                            <button
                              onClick={() => scrollToSection('about')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Our Mission
                            </button>
                            <button
                              onClick={() => scrollToSection('about')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Our Vision
                            </button>
                            <button
                              onClick={() => scrollToSection('about')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Meet Our Team
                            </button>
                          </div>
                        </div>

                        {/* Services Section */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                            <Award className="w-5 h-5 flex-shrink-0" />
                            <span>Services</span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => scrollToSection('services')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Our Services
                            </button>
                            <button
                              onClick={() => scrollToSection('credentials')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Credentials
                            </button>
                          </div>
                        </div>

                        {/* Life at CCI */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                            <Users className="w-5 h-5 flex-shrink-0" />
                            <span>Life at CCI</span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => navigate('/workspace')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              <Image className="w-3 h-3 inline mr-1" />
                              Workspace Gallery
                            </button>
                          </div>
                        </div>

                        {/* News & Media */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                            <FileText className="w-5 h-5 flex-shrink-0" />
                            <span>News & Media</span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => navigate('/blogs')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Blogs
                            </button>
                            <button
                              onClick={() => navigate('/advertisements')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Advertisements
                            </button>
                          </div>
                        </div>

                        {/* Contact Us */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                            <MapPin className="w-5 h-5 flex-shrink-0" />
                            <span>Contact Us</span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => scrollToSection('contact')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Get in Touch
                            </button>
                            <a
                              href="https://www.google.com/maps/dir//A6+Jhilmil+Industrial+Area,+New+Delhi+110095,+India/@28.6851,77.2426,17z"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              <Map className="w-3 h-3 inline mr-1" />
                              Google Maps
                            </a>
                          </div>
                        </div>

                        {/* Reviews */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                            <Star className="w-5 h-5 flex-shrink-0" />
                            <span>Reviews</span>
                          </div>
                          <div className="space-y-2">
                            <a
                              href="https://www.google.com/search?q=chhajer+cable+industries"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Client Reviews
                            </a>
                          </div>
                        </div>

                        {/* Join Us */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                            <Users className="w-5 h-5 flex-shrink-0" />
                            <span>Join Us</span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => navigate('/partnerships')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Become Our Partner
                            </button>
                            <button
                              onClick={() => navigate('/distributors')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Become a Distributor
                            </button>
                            <button
                              onClick={() => scrollToSection('contact')}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed"
                            >
                              Supplier Inquiries
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Product Comparisons */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  onClick={() => navigate('/compare')}
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                    location.pathname === '/compare' && "text-primary"
                  )}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Product Comparisons
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Box - Desktop */}
          <div className="hidden lg:block">
            <ProductSearch
              products={products}
              onProductSelect={onProductSelect}
              className="w-80"
              showFilterButton={true}
              onFilterClick={onFilterClick}
            />
          </div>
        </div>

        {/* Mobile Menu - Simplified */}
        <div className="lg:hidden pb-4">
          <ProductSearch
            products={products}
            onProductSelect={onProductSelect}
            className="w-full"
            showFilterButton={true}
            onFilterClick={onFilterClick}
          />
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={handleHomeClick}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium"
            >
              <Home className="w-4 h-4 inline mr-1" />
              Home
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium"
            >
              <Building2 className="w-4 h-4 inline mr-1" />
              Products
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium"
            >
              <Briefcase className="w-4 h-4 inline mr-1" />
              Company
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MegaMenuNavbar;
