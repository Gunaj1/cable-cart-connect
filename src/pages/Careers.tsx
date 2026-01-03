import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  Users,
  GraduationCap,
  TrendingUp,
  Heart,
  Send,
  Building2
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import { Button } from '@/components/ui/button';

const Careers = () => {
  const navigate = useNavigate();

  const openPositions = [
    {
      title: 'Production Supervisor',
      department: 'Manufacturing',
      location: 'Delhi NCR',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead our production team to ensure quality output and efficient operations.'
    },
    {
      title: 'Quality Control Engineer',
      department: 'Quality Assurance',
      location: 'Delhi NCR',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Ensure all products meet our stringent quality standards.'
    },
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Pan India',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Drive sales growth and build lasting client relationships.'
    },
    {
      title: 'R&D Engineer',
      department: 'Research & Development',
      location: 'Delhi NCR',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Innovate and develop next-generation cable technologies.'
    }
  ];

  const whyJoinUs = [
    { icon: TrendingUp, title: 'Growth Opportunities', description: 'Clear career progression paths' },
    { icon: GraduationCap, title: 'Learning Culture', description: 'Continuous skill development' },
    { icon: Heart, title: 'Work-Life Balance', description: 'Flexible and supportive environment' },
    { icon: Users, title: 'Great Team', description: 'Collaborative and friendly colleagues' }
  ];

  return (
    <>
      <Helmet>
        <title>Careers - Join Our Team | Chhajer Cable Industries</title>
        <meta name="description" content="Explore career opportunities at Chhajer Cable Industries. Join our team and build your future with us." />
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
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">Join Us</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Build Your Career With Us
              </h1>
              <p className="text-xl text-white/90">
                Join a team of passionate professionals dedicated to manufacturing excellence
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Join Us */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyJoinUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center p-6 rounded-xl bg-background shadow-lg border"
                >
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Open <span className="text-primary">Positions</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card p-6 rounded-2xl shadow-lg border hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{position.title}</h3>
                      <p className="text-primary font-medium">{position.department}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{position.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 text-sm bg-muted px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3" />
                      {position.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm bg-muted px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {position.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm bg-muted px-3 py-1 rounded-full">
                      <Briefcase className="w-3 h-3" />
                      {position.experience}
                    </span>
                  </div>
                  
                  <Button className="w-full group-hover:bg-primary transition-colors">
                    <Send className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-primary-foreground"
            >
              <GraduationCap className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals. Send us your resume and we'll reach out when a suitable position opens up.
              </p>
              <a 
                href="mailto:careers@chjcable.com"
                className="inline-block px-8 py-3 bg-background text-primary rounded-lg font-semibold hover:bg-background/90 transition-colors"
              >
                Send Your Resume
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Careers;
