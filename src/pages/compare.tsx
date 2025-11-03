import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useComparison } from "@/contexts/ComparisonContext";
import { getProductDetails } from "@/data/productImages";
import { ChevronLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ComparePage = () => {
  const navigate = useNavigate();
  const { comparisonProducts, clearComparison } = useComparison();

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

  useEffect(() => {
    if (comparisonProducts.length < 2) {
      navigate("/", { replace: true });
    }
  }, [comparisonProducts.length, navigate]);

  if (comparisonProducts.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Not Enough Products</h2>
          <p className="text-muted-foreground mb-6">Select at least two products to compare.</p>
          <Button onClick={() => navigate('/')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  // Get detailed product information
  const productsWithDetails = comparisonProducts.map(p => ({
    ...p,
    details: getProductDetails(p.id)
  }));

  // Generate recommendations based on products
  const generateRecommendation = (product: typeof productsWithDetails[0]) => {
    const details = product.details;
    const isSTP = product.name.toLowerCase().includes('stp');
    const isFTP = product.name.toLowerCase().includes('ftp');
    const isUTP = product.name.toLowerCase().includes('utp');
    const isOutdoor = product.name.toLowerCase().includes('outdoor');
    const isCat6 = product.name.toLowerCase().includes('cat 6') || product.name.toLowerCase().includes('cat6');

    let recommendation = '';
    let idealFor: string[] = [];
    let notIdealFor: string[] = [];

    if (isSTP) {
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

    if (isOutdoor) {
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
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Product Comparison</h1>
          <p className="text-muted-foreground">Compare specifications, features, and find the perfect cable for your needs</p>
        </div>

        {/* Product Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {productsWithDetails.map((product) => (
            <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-4 text-center">{product.name}</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {product.details.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
                      <img 
                        src={img} 
                        alt={`${product.name} - Image ${idx + 1}`}
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.details.description}
                </p>
              </div>
            </div>
          ))}
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
  );
};

export default ComparePage;
