import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComparison } from "@/contexts/ComparisonContext";
import { getProductDetails } from "@/data/productImages";
import { ChevronLeft, Check, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/pages/Index";
import { Product } from "@/types/Product";
import MegaMenuNavbar from "@/components/MegaMenuNavbar";
import { cn } from "@/lib/utils";

const ComparePage = () => {
  const navigate = useNavigate();
  const { comparisonProducts, clearComparison, addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison();
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Flatten all products from categories and add stock property
    const products: Product[] = [];
    categories.forEach(category => {
      category.products.forEach(product => {
        products.push({
          ...product,
          stock: 50, // Default stock value
          detailedDescription: product.detailedDescription ?? { specifications: [], features: [], applications: [] }
        });
      });
    });
    setAllProducts(products);
  }, []);

  useEffect(() => {
    document.title = `Compare Products | ${comparisonProducts.length} selected`;
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = `${window.location.origin}/compare`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [comparisonProducts.length]);

  // Show product selection if less than 2 products selected or if user wants to add more
  if (comparisonProducts.length < 2 || showProductSelection) {
    return (
      <>
        <MegaMenuNavbar />
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-4"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-4xl font-bold mb-2">Product Comparison</h1>
              <p className="text-muted-foreground mb-4">
                Select 2-3 products to compare their specifications and features
              </p>
              
              {/* Selected Products Counter */}
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {comparisonProducts.length}/3 Selected
                </Badge>
                {comparisonProducts.length >= 2 && (
                  <Button onClick={() => setShowProductSelection(false)}>
                    View Comparison
                  </Button>
                )}
                {comparisonProducts.length > 0 && (
                  <Button variant="outline" onClick={clearComparison}>
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Product Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => {
                const isSelected = isInComparison(product.id);
                return (
                  <div
                    key={product.id}
                    className={cn(
                      "bg-card rounded-lg border overflow-hidden transition-all hover:shadow-lg cursor-pointer",
                      isSelected && "border-primary border-2 shadow-lg"
                    )}
                    onClick={() => {
                      if (isSelected) {
                        removeFromComparison(product.id);
                      } else if (canAddMore) {
                        addToComparison(product);
                      }
                    }}
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-muted/30 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary-foreground" />
                        </div>
                      )}
                      {!isSelected && !canAddMore && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <p className="text-white text-sm font-medium">Max 3 products</p>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        {product.price != null ? `₹${Number(product.price).toFixed(2)}` : "Contact for Price"}
                      </p>
                      <Button
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        className="w-full mt-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isSelected) {
                            removeFromComparison(product.id);
                          } else if (canAddMore) {
                            addToComparison(product);
                          }
                        }}
                        disabled={!isSelected && !canAddMore}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Select to Compare
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Get detailed product information
  const productsWithDetails = comparisonProducts.map(p => ({
    ...p,
    details: getProductDetails(p.id)
  }));

  // Generate recommendations based on products
  const generateRecommendation = (product: typeof productsWithDetails[0]) => {
    const name = product.name.toLowerCase();
    const isSTP = name.includes('stp');
    const isFTP = name.includes('ftp');
    const isUTP = name.includes('utp');
    const isOutdoor = name.includes('outdoor');
    const isCat6 = name.includes('cat 6') || name.includes('cat6');
    const isCCTV = name.includes('cctv');
    const isTelephone = name.includes('telephone');
    const isComputerCord = name.includes('power cord') || name.includes('adaptor') || name.includes('laptop') || name.includes('desktop');
    const isLift = name.includes('lift') || name.includes('elevator');
    const isSpeaker = name.includes('speaker');

    let recommendation = '';
    let idealFor: string[] = [];
    let notIdealFor: string[] = [];

    // CCTV Cables
    if (isCCTV) {
      recommendation = 'Specialized cable for surveillance systems with integrated power and video transmission. Ideal for security installations.';
      idealFor = ['CCTV surveillance systems', 'Security camera installations', 'DVR/NVR connections', 'PTZ camera systems', 'Long-distance camera runs'];
      notIdealFor = ['Network data transmission', 'Audio applications', 'High-speed internet connections'];
    }
    // Telephone Cables
    else if (isTelephone) {
      recommendation = 'Professional-grade telephone cable for voice communication systems. Designed for reliable signal transmission in telecommunication networks.';
      idealFor = ['Telephone exchanges', 'Voice communication systems', 'PBX systems', 'Telecommunication networks', 'Multi-line phone systems'];
      notIdealFor = ['High-speed data networks', 'Video transmission', 'Power distribution'];
    }
    // Computer Power Cords
    else if (isComputerCord) {
      recommendation = 'Universal power cord with safety features and wide compatibility. Essential for reliable power delivery to electronic devices.';
      idealFor = ['Laptop and desktop computers', 'Monitors and displays', 'Printers and scanners', 'Gaming consoles', 'Audio equipment'];
      notIdealFor = ['High-power industrial equipment', 'Outdoor installations', 'Specialized voltage requirements'];
    }
    // Lift Cables
    else if (isLift) {
      recommendation = 'Heavy-duty cable designed for elevator systems with enhanced flexibility and durability. Built for continuous vertical movement.';
      idealFor = ['Elevator systems', 'Lift installations', 'Vertical transportation', 'Industrial lifting equipment', 'Building infrastructure'];
      notIdealFor = ['Stationary installations', 'Network data transmission', 'Low-flex applications'];
    }
    // Speaker Cables
    else if (isSpeaker) {
      recommendation = 'High-quality audio cable for optimal sound transmission. Features multi-stranded conductors for clear audio signal delivery.';
      idealFor = ['Home theater systems', 'Professional audio setups', 'PA systems', 'Studio equipment', 'Broadcasting systems'];
      notIdealFor = ['Data network transmission', 'Power distribution', 'Video signal transmission'];
    }
    // Network Cables (STP/FTP/UTP)
    else if (isSTP) {
      recommendation = 'Best for environments with high electromagnetic interference. Provides maximum protection against EMI/RFI.';
      idealFor = ['Industrial environments', 'Data centers', 'High-interference areas', 'Critical network infrastructure'];
      notIdealFor = ['Standard home networks', 'Budget-conscious projects', 'Low-interference areas'];
    } else if (isFTP) {
      recommendation = 'Excellent balance of protection and cost. Suitable for most professional installations.';
      idealFor = ['Enterprise networks', 'Commercial buildings', 'Professional installations', 'Office environments'];
      notIdealFor = ['Extreme EMI environments', 'Very basic home networks'];
    } else if (isUTP) {
      recommendation = 'Cost-effective solution for standard networking needs. Perfect for everyday applications.';
      idealFor = ['Home networks', 'Small offices', 'Educational institutions', 'Residential installations'];
      notIdealFor = ['High-interference areas', 'Industrial environments', 'EMI-sensitive applications'];
    }

    if (isOutdoor && !isCCTV) {
      recommendation = 'Weather-resistant construction designed for outdoor installations. UV-protected and moisture-resistant.';
      idealFor = ['Outdoor surveillance', 'Building-to-building connections', 'Campus networks', 'Outdoor wireless access points'];
      notIdealFor = ['Indoor-only installations', 'Temperature-controlled environments'];
    }

    if (isCat6) {
      recommendation += ' Cat6 provides superior bandwidth and faster speeds up to 1000 Mbps.';
    }

    return { recommendation, idealFor, notIdealFor };
  };

  return (
    <>
      <MegaMenuNavbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Product Comparison</h1>
                <p className="text-muted-foreground">Compare specifications, features, and find the perfect cable for your needs</p>
              </div>
              <Button variant="outline" onClick={() => setShowProductSelection(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add More Products
              </Button>
            </div>
          </div>

          {/* Product Images at Top of Comparison */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-border">
              {productsWithDetails.map((product) => (
                <div key={product.id} className="p-6 text-center">
                  <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={product.details.images[0] || product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {product.price != null ? `₹${Number(product.price).toFixed(2)}` : "Contact for Price"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromComparison(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

        {/* Detailed Comparison Table */}
        <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-border mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-4 text-left font-semibold sticky left-0 bg-primary z-10 min-w-[180px]">
                    Specification
                  </th>
                  {productsWithDetails.map((p) => (
                    <th key={p.id} className="p-4 text-center font-semibold min-w-[280px]">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-b border-border bg-muted/30">
                  <td className="p-4 font-semibold sticky left-0 bg-muted/30 z-10">Price</td>
                  {productsWithDetails.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <span className="text-2xl font-bold text-primary">
                        {p.price != null ? `₹${Number(p.price).toFixed(2)}` : "Contact for Price"}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Stock Status */}
                <tr className="border-b border-border">
                  <td className="p-4 font-semibold sticky left-0 bg-card z-10">Stock Status</td>
                  {productsWithDetails.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <Badge variant={(p.stock ?? 0) > 10 ? 'default' : (p.stock ?? 0) > 0 ? 'secondary' : 'destructive'}>
                        {(p.stock ?? 0) > 10 ? 'In Stock' : (p.stock ?? 0) > 0 ? 'Limited Stock' : 'Out of Stock'}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{p.stock ?? 0} units</div>
                    </td>
                  ))}
                </tr>

                {/* Detailed Specifications */}
                {productsWithDetails[0].details.specifications && Object.keys(productsWithDetails[0].details.specifications).length > 0 && (
                  <>
                    <tr className="bg-muted/50">
                      <td colSpan={productsWithDetails.length + 1} className="p-3 font-bold text-sm uppercase tracking-wide">
                        Technical Specifications
                      </td>
                    </tr>
                    {Object.keys(productsWithDetails[0].details.specifications).map((specKey) => (
                      <tr key={specKey} className="border-b border-border">
                        <td className="p-4 font-medium sticky left-0 bg-card z-10">{specKey}</td>
                        {productsWithDetails.map((p) => (
                          <td key={p.id} className="p-4 text-center">
                            <span className="text-sm">
                              {p.details.specifications[specKey] || '-'}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}

                {/* Applications */}
                <tr className="bg-muted/50">
                  <td colSpan={productsWithDetails.length + 1} className="p-3 font-bold text-sm uppercase tracking-wide">
                    Applications
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-semibold sticky left-0 bg-card z-10">Suitable For</td>
                  {productsWithDetails.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.details.applications && p.details.applications.length > 0 ? (
                        <ul className="space-y-2 text-left text-sm">
                          {p.details.applications.slice(0, 6).map((app, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                              <span>{app}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Features */}
                <tr className="bg-muted/50">
                  <td colSpan={productsWithDetails.length + 1} className="p-3 font-bold text-sm uppercase tracking-wide">
                    Key Features
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-semibold sticky left-0 bg-card z-10">Features</td>
                  {productsWithDetails.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.details.features && p.details.features.length > 0 ? (
                        <ul className="space-y-2 text-left text-sm">
                          {p.details.features.slice(0, 6).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Our Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsWithDetails.map((product) => {
              const rec = generateRecommendation(product);
              return (
                <div key={product.id} className="border border-border rounded-lg p-5 bg-muted/20">
                  <h3 className="font-bold text-lg mb-3 text-primary">{product.name}</h3>
                  <p className="text-sm mb-4">{rec.recommendation}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-green-700">
                      <Check className="w-4 h-4" />
                      Ideal For:
                    </h4>
                    <ul className="space-y-1 text-sm ml-6">
                      {rec.idealFor.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-red-700">
                      <X className="w-4 h-4" />
                      Not Ideal For:
                    </h4>
                    <ul className="space-y-1 text-sm ml-6">
                      {rec.notIdealFor.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

          {/* Call to Action */}
          <div className="text-center flex gap-4 justify-center">
            <Button size="lg" variant="outline" onClick={() => setShowProductSelection(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add More Products
            </Button>
            <Button size="lg" variant="outline" onClick={() => {
              clearComparison();
              navigate('/');
            }}>
              Clear & Browse Products
            </Button>
            <Button size="lg" onClick={() => navigate('/')}>
              Browse More Products
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ComparePage;
