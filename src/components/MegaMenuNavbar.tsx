import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Cable, Wifi, Network, Video, Phone, Monitor, Layers, Volume2,
  Home, Building2, Award, Briefcase, MapPin, Users, 
  FileText, Image, Star, ChevronDown
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
  products: Product[];
  onProductSelect: (product: Product) => void;
  onFilterClick?: () => void;
}

const MegaMenuNavbar: React.FC<MegaMenuNavbarProps> = ({ 
  products, 
  onProductSelect,
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
                <NavigationMenuContent>
                  <div className="w-[800px] p-6 bg-background">
                    <div className="grid grid-cols-4 gap-6">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.name} className="space-y-3">
                            <div className="flex items-center space-x-2 text-primary font-semibold mb-3">
                              <Icon className="w-5 h-5" />
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <div className="space-y-2">
                              {category.products.slice(0, 4).map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => handleProductClick(product)}
                                  className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                                >
                                  {product.name}
                                </button>
                              ))}
                              {category.products.length > 4 && (
                                <button
                                  onClick={() => scrollToSection('products')}
                                  className="text-xs text-primary hover:underline"
                                >
                                  View all {category.products.length} →
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-background">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Corporate Section */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-primary font-semibold mb-3">
                          <Building2 className="w-5 h-5" />
                          <span className="text-sm">Corporate</span>
                        </div>
                        <div className="space-y-2">
                          <button
                            onClick={() => scrollToSection('about')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            About Us
                          </button>
                          <button
                            onClick={() => scrollToSection('about')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Our Mission
                          </button>
                          <button
                            onClick={() => scrollToSection('about')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Our Vision
                          </button>
                          <button
                            onClick={() => scrollToSection('about')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Meet Our Team
                          </button>
                          <button
                            onClick={() => scrollToSection('services')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Services
                          </button>
                          <button
                            onClick={() => scrollToSection('credentials')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Credentials
                          </button>
                        </div>
                      </div>

                      {/* Life at CCI & News */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-primary font-semibold mb-3">
                          <Users className="w-5 h-5" />
                          <span className="text-sm">Life at CCI</span>
                        </div>
                        <div className="space-y-2">
                          <button
                            onClick={() => navigate('/workspace')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            <Image className="w-3 h-3 inline mr-1" />
                            Workspace Gallery
                          </button>
                        </div>

                        <div className="flex items-center space-x-2 text-primary font-semibold mb-3 mt-6">
                          <FileText className="w-5 h-5" />
                          <span className="text-sm">News & Media</span>
                        </div>
                        <div className="space-y-2">
                          <button
                            onClick={() => navigate('/blogs')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Blogs
                          </button>
                          <button
                            onClick={() => navigate('/advertisements')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Advertisements
                          </button>
                        </div>
                      </div>

                      {/* Contact & Reviews */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-primary font-semibold mb-3">
                          <MapPin className="w-5 h-5" />
                          <span className="text-sm">Contact Us</span>
                        </div>
                        <div className="space-y-2">
                          <button
                            onClick={() => scrollToSection('contact')}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Get in Touch
                          </button>
                        </div>

                        <div className="flex items-center space-x-2 text-primary font-semibold mb-3 mt-6">
                          <Star className="w-5 h-5" />
                          <span className="text-sm">Reviews</span>
                        </div>
                        <div className="space-y-2">
                          <a
                            href="https://www.google.com/search?q=chhajer+cable+industries"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            Client Reviews
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
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
