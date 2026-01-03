import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Building2, Award, Briefcase, MapPin, Users, 
  FileText, Image, Star, Map, ShoppingBag, Menu, X, ChevronDown, ChevronRight
} from 'lucide-react';
import Logo from './Logo';
import ProductSearch from './ProductSearch';
import ConsumerMegaMenu from './ConsumerMegaMenu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Mobile menu sections data
  const companySections = [
    {
      title: 'About',
      icon: Building2,
      items: [
        { label: 'About Us', path: '/about-us' },
        { label: 'Meet Our Team', path: '/team' },
        { label: 'Our Journey', path: '/journey' },
        { label: 'Our Mission', path: '/mission' },
        { label: 'Our Vision', path: '/vision' },
        { label: 'Our Core Values', path: '/values' },
      ]
    },
    {
      title: 'Services',
      icon: Award,
      items: [
        { label: 'Our Services', action: () => scrollToSection('services') },
        { label: 'Credentials', action: () => scrollToSection('credentials') },
      ]
    },
    {
      title: 'Life at CCI',
      icon: Users,
      items: [
        { label: 'Workspace Gallery', path: '/workspace' },
        { label: 'Our Culture', path: '/culture' },
        { label: 'Careers', path: '/careers' },
      ]
    },
    {
      title: 'News & Media',
      icon: FileText,
      items: [
        { label: 'Blogs & Articles', path: '/blogs' },
        { label: 'Offers & Promotions', path: '/advertisements' },
        { label: 'Press Releases', path: '/press-releases' },
      ]
    },
    {
      title: 'Contact Us',
      icon: MapPin,
      items: [
        { label: 'Get in Touch', action: () => scrollToSection('contact') },
        { label: 'Google Maps', href: 'https://www.google.com/maps/dir//A6+Jhilmil+Industrial+Area,+New+Delhi+110095,+India/@28.6851,77.2426,17z' },
      ]
    },
    {
      title: 'Join Us',
      icon: Users,
      items: [
        { label: 'Become Our Partner', path: '/partnerships' },
        { label: 'Become a Distributor', path: '/distributors' },
        { label: 'Supplier Inquiries', path: '/supplier-inquiries' },
        { label: 'Careers', path: '/careers' },
      ]
    },
  ];

  const consumerCategories = [
    { label: 'LAN Cables', path: '/?category=lan-cables' },
    { label: 'Patchcords', path: '/?category=patchcords' },
    { label: 'CCTV Cables', path: '/?category=cctv-cables' },
    { label: 'Speaker Cables', path: '/?category=speaker-cables' },
    { label: 'Power Cables', path: '/?category=power-cables' },
    { label: 'Lift Cables', path: '/?category=lift-cables' },
    { label: 'Telephone Cables', path: '/?category=telephone-cables' },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={handleHomeClick}>
            <Logo className="h-10 lg:h-12" />
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-700 to-gray-700 bg-clip-text text-transparent">
                Chhajer Cable Industries
              </h1>
              <p className="text-xs lg:text-sm text-muted-foreground font-medium">Quality Cables Since 1997</p>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
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
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Consumers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ConsumerMegaMenu isVisible={true} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Company Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen bg-background border-b px-8 py-10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-8 auto-rows-min">
                      {/* About Section */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                          <Building2 className="w-5 h-5 flex-shrink-0" />
                          <span>About</span>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => navigate('/about-us')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">About Us</button>
                          <button onClick={() => navigate('/team')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Meet Our Team</button>
                          <button onClick={() => navigate('/journey')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Our Journey</button>
                          <button onClick={() => navigate('/mission')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Our Mission</button>
                          <button onClick={() => navigate('/vision')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Our Vision</button>
                          <button onClick={() => navigate('/values')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Our Core Values</button>
                        </div>
                      </div>

                      {/* Services Section */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                          <Award className="w-5 h-5 flex-shrink-0" />
                          <span>Services</span>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => scrollToSection('services')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Our Services</button>
                          <button onClick={() => scrollToSection('credentials')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Credentials</button>
                        </div>
                      </div>

                      {/* Life at CCI */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                          <Users className="w-5 h-5 flex-shrink-0" />
                          <span>Life at CCI</span>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => navigate('/workspace')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Workspace Gallery</button>
                          <button onClick={() => navigate('/culture')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Our Culture</button>
                          <button onClick={() => navigate('/careers')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Careers</button>
                        </div>
                      </div>

                      {/* News & Media */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                          <FileText className="w-5 h-5 flex-shrink-0" />
                          <span>News & Media</span>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => navigate('/blogs')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Blogs & Articles</button>
                          <button onClick={() => navigate('/advertisements')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Offers & Promotions</button>
                          <button onClick={() => navigate('/press-releases')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Press Releases</button>
                        </div>
                      </div>

                      {/* Contact Us */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                          <MapPin className="w-5 h-5 flex-shrink-0" />
                          <span>Contact Us</span>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Get in Touch</button>
                          <a href="https://www.google.com/maps/dir//A6+Jhilmil+Industrial+Area,+New+Delhi+110095,+India/@28.6851,77.2426,17z" target="_blank" rel="noopener noreferrer" className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">
                            <Map className="w-3 h-3 inline mr-1" />Google Maps
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
                          <a href="https://www.google.com/search?q=chhajer+cable+industries" target="_blank" rel="noopener noreferrer" className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Client Reviews</a>
                        </div>
                      </div>

                      {/* Join Us */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold text-base border-b border-border pb-3">
                          <Users className="w-5 h-5 flex-shrink-0" />
                          <span>Join Us</span>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => navigate('/partnerships')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Become Our Partner</button>
                          <button onClick={() => navigate('/distributors')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Become a Distributor</button>
                          <button onClick={() => navigate('/supplier-inquiries')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Supplier Inquiries</button>
                          <button onClick={() => navigate('/careers')} className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1.5 leading-relaxed">Careers</button>
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                <SheetHeader className="p-4 border-b bg-primary text-primary-foreground">
                  <SheetTitle className="text-left text-primary-foreground flex items-center gap-2">
                    <Logo className="h-8" />
                    <span className="font-bold">Chhajer Cable Industries</span>
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <div className="p-4 space-y-2">
                    {/* Search */}
                    <div className="mb-4">
                      <ProductSearch
                        products={products}
                        onProductSelect={(product) => {
                          onProductSelect(product);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full"
                        showFilterButton={true}
                        onFilterClick={() => {
                          onFilterClick?.();
                          setIsMobileMenuOpen(false);
                        }}
                      />
                    </div>

                    {/* Home */}
                    <button
                      onClick={handleHomeClick}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/50 hover:bg-accent text-foreground font-medium transition-colors"
                    >
                      <Home className="w-5 h-5 text-primary" />
                      Home
                    </button>

                    {/* Consumers Section */}
                    <Collapsible open={expandedSection === 'consumers'} onOpenChange={() => toggleSection('consumers')}>
                      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-accent/50 hover:bg-accent text-foreground font-medium transition-colors">
                        <div className="flex items-center gap-3">
                          <ShoppingBag className="w-5 h-5 text-primary" />
                          Consumers
                        </div>
                        <ChevronDown className={cn("w-5 h-5 transition-transform", expandedSection === 'consumers' && "rotate-180")} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1">
                        {consumerCategories.map((category, index) => (
                          <button
                            key={index}
                            onClick={() => handleMobileNavigation(category.path)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                            {category.label}
                          </button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Company Section */}
                    <Collapsible open={expandedSection === 'company'} onOpenChange={() => toggleSection('company')}>
                      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-accent/50 hover:bg-accent text-foreground font-medium transition-colors">
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5 text-primary" />
                          Company
                        </div>
                        <ChevronDown className={cn("w-5 h-5 transition-transform", expandedSection === 'company' && "rotate-180")} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-2">
                        {companySections.map((section, sectionIndex) => (
                          <Collapsible key={sectionIndex}>
                            <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">
                              <div className="flex items-center gap-2">
                                <section.icon className="w-4 h-4 text-primary" />
                                {section.title}
                              </div>
                              <ChevronRight className="w-4 h-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-6 mt-1 space-y-1">
                              {section.items.map((item, itemIndex) => (
                                <button
                                  key={itemIndex}
                                  onClick={() => {
                                    if ('path' in item && item.path) {
                                      handleMobileNavigation(item.path);
                                    } else if ('action' in item && item.action) {
                                      item.action();
                                    } else if ('href' in item && item.href) {
                                      window.open(item.href, '_blank');
                                      setIsMobileMenuOpen(false);
                                    }
                                  }}
                                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                >
                                  {item.label}
                                </button>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Product Comparisons */}
                    <button
                      onClick={() => handleMobileNavigation('/compare')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/50 hover:bg-accent text-foreground font-medium transition-colors"
                    >
                      <Award className="w-5 h-5 text-primary" />
                      Product Comparisons
                    </button>

                    {/* Quick Actions */}
                    <div className="mt-6 pt-4 border-t space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground px-4 mb-2">Quick Actions</h3>
                      <button
                        onClick={() => handleMobileNavigation('/technical-consultation')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
                      >
                        Get Technical Consultation
                      </button>
                      <button
                        onClick={() => handleMobileNavigation('/bulk-quote')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                      >
                        Request Bulk Quote
                      </button>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MegaMenuNavbar;
