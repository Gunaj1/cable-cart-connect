import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Factory, 
  CheckCircle, 
  FileText, 
  Shield,
  Clock,
  Award,
  Send,
  Package
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import { Button } from '@/components/ui/button';

const SupplierInquiries = () => {
  const navigate = useNavigate();

  const whatWeProcure = [
    'Copper Wire & Conductors',
    'PVC & LSZH Compounds',
    'Aluminum Foil & Shielding Materials',
    'RJ45 Connectors & Plugs',
    'Packaging Materials',
    'Testing Equipment'
  ];

  const supplierRequirements = [
    { icon: Shield, title: 'Quality Standards', description: 'Must meet ISO quality certifications' },
    { icon: Clock, title: 'Timely Delivery', description: 'Consistent on-time delivery track record' },
    { icon: Award, title: 'Competitive Pricing', description: 'Value-for-money propositions' },
    { icon: FileText, title: 'Documentation', description: 'Complete compliance documentation' }
  ];

  return (
    <>
      <Helmet>
        <title>Supplier Inquiries | Chhajer Cable Industries</title>
        <meta name="description" content="Become a supplier to Chhajer Cable Industries. We're always looking for quality raw material suppliers." />
      </Helmet>
      
      <MegaMenuNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Hero Section with Background */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-24 overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/lovable-uploads/4fe743c1-7814-4030-b751-98c886511e2c.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/70" />
          
          <div className="container mx-auto px-4 relative z-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/90 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white mb-6">
                <Factory className="w-5 h-5" />
                <span className="font-medium">Join Us</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Supplier Inquiries
              </h1>
              <p className="text-xl text-white/90">
                Partner with us as a supplier and be part of our quality-driven manufacturing ecosystem
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* What We Procure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  What We <span className="text-primary">Procure</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  We are always looking for reliable suppliers for high-quality raw materials essential to our cable manufacturing process.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {whatWeProcure.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3 bg-card p-4 rounded-xl border"
                    >
                      <Package className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="grid grid-cols-2 gap-4"
              >
                {supplierRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-xl shadow-lg border text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <req.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-1">{req.title}</h3>
                    <p className="text-xs text-muted-foreground">{req.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vendor Registration Form */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <Factory className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Vendor Registration</h2>
                <p className="text-muted-foreground">
                  Register as a supplier and our procurement team will review your application.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Person</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="Full name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="email@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Products/Materials You Supply</label>
                  <select className="w-full px-4 py-3 rounded-lg border bg-background">
                    <option>Select category</option>
                    <option>Copper Wire & Conductors</option>
                    <option>PVC & LSZH Compounds</option>
                    <option>Shielding Materials</option>
                    <option>Connectors & Plugs</option>
                    <option>Packaging Materials</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Certifications (if any)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="ISO, BIS, etc." />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Company Profile & Product Details</label>
                  <textarea className="w-full px-4 py-3 rounded-lg border bg-background h-32" placeholder="Describe your company, products, manufacturing capacity, and why you'd be a good supplier for us..."></textarea>
                </div>
                
                <Button className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Registration
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SupplierInquiries;
