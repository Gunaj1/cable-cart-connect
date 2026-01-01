import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Store, 
  CheckCircle, 
  MapPin, 
  Package,
  Truck,
  BarChart,
  Users,
  Send,
  IndianRupee
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import { Button } from '@/components/ui/button';

const Distributors = () => {
  const navigate = useNavigate();

  const advantages = [
    { icon: IndianRupee, title: 'Attractive Margins', description: 'Competitive pricing with healthy profit margins' },
    { icon: Package, title: 'Full Product Range', description: 'Access to our complete portfolio of cables' },
    { icon: Truck, title: 'Logistics Support', description: 'Efficient supply chain and delivery systems' },
    { icon: BarChart, title: 'Sales Tools', description: 'CRM access and sales tracking dashboard' },
    { icon: Users, title: 'Territory Rights', description: 'Exclusive distribution rights in your region' },
    { icon: Store, title: 'Retail Support', description: 'POS materials and display solutions' }
  ];

  const requirements = [
    'Registered business entity with GST',
    'Minimum investment capacity of ₹5,00,000',
    'Warehouse/storage facility',
    'Existing retail or B2B network',
    'Dedicated sales team',
    'Commitment to brand exclusivity in category'
  ];

  const territories = [
    { region: 'North India', cities: 'Delhi NCR, Punjab, Haryana, UP' },
    { region: 'West India', cities: 'Maharashtra, Gujarat, Rajasthan' },
    { region: 'South India', cities: 'Karnataka, Tamil Nadu, AP, Telangana' },
    { region: 'East India', cities: 'West Bengal, Bihar, Odisha' }
  ];

  return (
    <>
      <Helmet>
        <title>Become a Distributor | Chhajer Cable Industries</title>
        <meta name="description" content="Join our distribution network and bring premium cable solutions to your region." />
      </Helmet>
      
      <MegaMenuNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Store className="w-5 h-5" />
                <span className="font-medium">Join Us</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-6">
                Become a Distributor
              </h1>
              <p className="text-xl text-muted-foreground">
                Expand your business by distributing India's trusted cable brand in your region
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Distributor Advantages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Distributor <span className="text-primary">Advantages</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card p-6 rounded-2xl shadow-lg border hover:border-primary/50 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <advantage.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements & Territories */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Requirements */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Eligibility <span className="text-primary">Requirements</span>
                </h2>
                <div className="bg-card p-8 rounded-2xl shadow-lg border">
                  <ul className="space-y-4">
                    {requirements.map((req, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Territories */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Available <span className="text-primary">Territories</span>
                </h2>
                <div className="space-y-4">
                  {territories.map((territory, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-card p-6 rounded-xl shadow-lg border flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">{territory.region}</h3>
                        <p className="text-sm text-muted-foreground">{territory.cities}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <Store className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Apply for Distributorship</h2>
                <p className="text-muted-foreground">
                  Submit your application and our team will evaluate your eligibility.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">GST Number</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="GSTIN" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Person</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border bg-background" placeholder="email@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Region</label>
                    <select className="w-full px-4 py-3 rounded-lg border bg-background">
                      <option>Select region</option>
                      <option>North India</option>
                      <option>West India</option>
                      <option>South India</option>
                      <option>East India</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Business Description</label>
                  <textarea className="w-full px-4 py-3 rounded-lg border bg-background h-32" placeholder="Tell us about your business, existing network, and why you want to be our distributor..."></textarea>
                </div>
                
                <Button className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Distributors;
