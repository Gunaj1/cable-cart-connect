import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Building2, Users, Award, Globe, Shield, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import aboutUsBg from '@/assets/about-us-bg.jpg';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { value: '27+', label: 'Years of Excellence', icon: Award },
    { value: '500+', label: 'Products Delivered', icon: Globe },
    { value: '1000+', label: 'Happy Clients', icon: Users },
    { value: '50+', label: 'Industry Partners', icon: Shield },
  ];

  const highlights = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'ISO certified manufacturing processes ensuring consistent quality across all products.'
    },
    {
      icon: Zap,
      title: 'Innovation Driven',
      description: 'Continuous R&D investment to stay ahead with cutting-edge cable technologies.'
    },
    {
      icon: Globe,
      title: 'Pan-India Reach',
      description: 'Serving customers across India with efficient logistics and timely delivery.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Skilled professionals dedicated to manufacturing excellence and customer service.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Chhajer Cable Industries | Leading Cable Manufacturer Since 1997</title>
        <meta name="description" content="Learn about Chhajer Cable Industries - India's trusted cable manufacturer since 1997. Discover our commitment to quality, innovation, and customer satisfaction." />
      </Helmet>

      <MegaMenuNavbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={aboutUsBg} 
              alt="About Chhajer Cable Industries" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--industrial-dark))]/95 via-[hsl(var(--industrial-dark))]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">About Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Building India's <span className="text-primary">Connectivity</span> Since 1997
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                From a humble beginning to becoming one of India's most trusted cable manufacturers, 
                our journey is a testament to unwavering commitment to quality and innovation.
              </p>
            </motion.div>
          </div>

          {/* Animated cable lines */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.path
                d="M0,80 Q250,20 500,80 T1000,80 T1500,80 T2000,80"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-primary" />
                  <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Story</span>
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  A Legacy of <span className="text-primary">Excellence</span>
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 1997, Chhajer Cable Industries has grown to become one of India's leading 
                    manufacturers of high-quality cables and networking solutions. Our state-of-the-art 
                    manufacturing facility in Delhi is equipped with the latest technology and staffed 
                    by skilled professionals who ensure that every product meets the highest standards 
                    of quality and reliability.
                  </p>
                  <p>
                    We take pride in our comprehensive range of products that cater to various sectors 
                    including IT, telecommunications, security systems, and industrial applications. 
                    Our commitment to innovation and quality has earned us the trust of countless 
                    customers across the country.
                  </p>
                  <p>
                    At Chhajer Cable Industries, we believe in building lasting relationships with our 
                    customers through excellent service, competitive pricing, and unwavering support.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={aboutUsBg} 
                    alt="Our Manufacturing Facility" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--industrial-dark))]/60 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                  <p className="text-4xl font-bold">27+</p>
                  <p className="text-sm font-medium opacity-90">Years of Trust</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence drives everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[hsl(var(--industrial-dark))] to-[hsl(var(--industrial-blue))]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience Quality?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover why thousands of businesses trust Chhajer Cable Industries for their connectivity needs.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-white text-[hsl(var(--industrial-dark))] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Our Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutUs;
