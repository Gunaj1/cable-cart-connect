import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Factory, 
  Wrench, 
  Users, 
  Award, 
  Shield,
  Zap,
  Settings,
  CheckCircle,
  Cog
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';

// Import manufacturing images
import cat6StpPatchcord1 from '@/assets/CAT 6 STP Patchcord 1.png';
import cat6StpPatchcord2 from '@/assets/CAT 6 STP Patchcord 2.png';
import cat6StpPatchcord3 from '@/assets/CAT 6 STP Patchcord 3.png';
import cat6StpPatchcord4 from '@/assets/CAT 6 STP Patchcord 4.png';
import cat6StpPatchcord5 from '@/assets/CAT 6 STP Patchcord 5.png';

const Workspace = () => {
  const navigate = useNavigate();

  const galleryImages = [
    {
      src: cat6StpPatchcord1,
      title: 'Production Line',
      description: 'State-of-the-art cable manufacturing with precision machinery'
    },
    {
      src: cat6StpPatchcord2,
      title: 'Quality Control Lab',
      description: 'Advanced testing equipment ensuring 100% quality assurance'
    },
    {
      src: cat6StpPatchcord3,
      title: 'Assembly Station',
      description: 'Expert technicians crafting premium networking solutions'
    },
    {
      src: cat6StpPatchcord4,
      title: 'Packaging Facility',
      description: 'Careful packaging for safe delivery worldwide'
    },
    {
      src: cat6StpPatchcord5,
      title: 'R&D Department',
      description: 'Innovation hub developing next-generation cable technology'
    },
    {
      src: cat6StpPatchcord1,
      title: 'Warehouse',
      description: 'Organized inventory management for quick dispatch'
    }
  ];

  const facilities = [
    { icon: Factory, title: 'Manufacturing Unit', value: '50,000+', unit: 'sq. ft.' },
    { icon: Cog, title: 'Production Lines', value: '12', unit: 'automated' },
    { icon: Users, title: 'Expert Staff', value: '200+', unit: 'professionals' },
    { icon: CheckCircle, title: 'Daily Output', value: '10,000+', unit: 'meters' }
  ];

  const capabilities = [
    { icon: Zap, title: 'High-Speed Production', description: 'Automated systems producing cables at industry-leading speeds' },
    { icon: Shield, title: 'Quality Assurance', description: 'Multi-stage testing ensuring every product meets global standards' },
    { icon: Settings, title: 'Custom Manufacturing', description: 'Flexible production for customized cable solutions' },
    { icon: Award, title: 'Certified Processes', description: 'ISO-certified manufacturing with documented quality control' }
  ];

  return (
    <>
      <Helmet>
        <title>Workspace Gallery - Life at CCI | Chhajer Cable Industries</title>
        <meta name="description" content="Explore our modern manufacturing facilities and workspace at Chhajer Cable Industries." />
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
                <span className="font-medium">Life at CCI</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Workspace Gallery
              </h1>
              <p className="text-xl text-white/90">
                Take a virtual tour of our world-class manufacturing facilities where quality cables are born
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Facility Stats */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center p-6 rounded-xl bg-background shadow-lg border"
                >
                  <facility.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary">{facility.value}</div>
                  <div className="text-sm text-muted-foreground">{facility.unit}</div>
                  <div className="text-sm font-medium mt-1">{facility.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Inside Our <span className="text-primary">Manufacturing Facility</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-xl border"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Our <span className="text-primary">Capabilities</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 * index }}
                  className="bg-card p-6 rounded-xl shadow-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <cap.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground text-sm">{cap.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-primary-foreground"
            >
              <Wrench className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">Want to See Our Facility?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Schedule a visit to our manufacturing facility and witness our commitment to quality firsthand.
              </p>
              <button 
                onClick={() => navigate('/technical-consultation')}
                className="px-8 py-3 bg-background text-primary rounded-lg font-semibold hover:bg-background/90 transition-colors"
              >
                Schedule a Visit
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Workspace;
