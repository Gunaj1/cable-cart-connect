import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Handshake, 
  CheckCircle, 
  TrendingUp, 
  Users,
  Shield,
  Globe,
  Award,
  Send
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import { Button } from '@/components/ui/button';

const Partnerships = () => {
  const navigate = useNavigate();

  const benefits = [
    { icon: TrendingUp, title: 'Revenue Growth', description: 'Access to premium products with competitive margins' },
    { icon: Shield, title: 'Brand Association', description: 'Partner with a trusted name in cable manufacturing' },
    { icon: Users, title: 'Dedicated Support', description: 'Personal account manager for seamless operations' },
    { icon: Award, title: 'Training Programs', description: 'Product knowledge and sales training provided' },
    { icon: Globe, title: 'Marketing Support', description: 'Co-branded marketing materials and campaigns' },
    { icon: CheckCircle, title: 'Priority Access', description: 'First access to new products and innovations' }
  ];

  const partnerTypes = [
    {
      title: 'Technology Partners',
      description: 'IT integrators, system builders, and solution providers',
      features: ['Volume discounts', 'Technical support', 'Co-marketing opportunities']
    },
    {
      title: 'Reseller Partners',
      description: 'Retail outlets and e-commerce platforms',
      features: ['Competitive pricing', 'Drop-shipping support', 'Marketing materials']
    },
    {
      title: 'OEM Partners',
      description: 'Manufacturers requiring custom cable solutions',
      features: ['Custom manufacturing', 'Private labeling', 'Quality certification']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Become Our Partner | Chhajer Cable Industries</title>
        <meta name="description" content="Partner with Chhajer Cable Industries and grow your business with premium cable solutions." />
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
                <Handshake className="w-5 h-5" />
                <span className="font-medium">Join Us</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-6">
                Become Our Partner
              </h1>
              <p className="text-xl text-muted-foreground">
                Join our network of successful partners and grow your business with premium cable solutions
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Partner Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Partner <span className="text-primary">Benefits</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card p-6 rounded-2xl shadow-lg border hover:border-primary/50 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Partnership <span className="text-primary">Programs</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 * index }}
                  className="bg-card p-8 rounded-2xl shadow-xl border"
                >
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground mb-6">{type.description}</p>
                  <ul className="space-y-3">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
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
                <Handshake className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Apply for Partnership</h2>
                <p className="text-muted-foreground">
                  Fill in your details and our team will get in touch with you shortly.
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
                  <label className="block text-sm font-medium mb-2">Partnership Type</label>
                  <select className="w-full px-4 py-3 rounded-lg border bg-background">
                    <option>Select partnership type</option>
                    <option>Technology Partner</option>
                    <option>Reseller Partner</option>
                    <option>OEM Partner</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea className="w-full px-4 py-3 rounded-lg border bg-background h-32" placeholder="Tell us about your business and partnership interests..."></textarea>
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

export default Partnerships;
