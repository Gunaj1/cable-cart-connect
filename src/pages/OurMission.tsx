import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Compass, Target, Users, Clock, Shield, Zap, Heart, Globe } from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import missionBg from '@/assets/mission-bg.jpg';

const OurMission: React.FC = () => {
  const missionPillars = [
    {
      icon: Shield,
      title: 'Quality Excellence',
      description: 'Deliver products that exceed industry standards through rigorous testing and quality control at every stage of manufacturing.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'Ensure on-time delivery with our efficient supply chain and logistics network, because your time matters.'
    },
    {
      icon: Target,
      title: 'Competitive Pricing',
      description: 'Offer the best value proposition without compromising on quality, making premium cables accessible to all.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Build lasting relationships through exceptional service, transparent communication, and dedicated support.'
    }
  ];

  const commitments = [
    { label: 'Quality Assurance', value: 100, suffix: '%' },
    { label: 'On-Time Delivery', value: 98, suffix: '%' },
    { label: 'Customer Satisfaction', value: 95, suffix: '%' },
    { label: 'Repeat Business', value: 85, suffix: '%' }
  ];

  return (
    <>
      <Helmet>
        <title>Our Mission - Chhajer Cable Industries | Quality, Value & Trust</title>
        <meta name="description" content="Discover Chhajer Cable Industries' mission to deliver high-quality cables at competitive prices with timely delivery. Our commitment to excellence drives everything we do." />
      </Helmet>

      <MegaMenuNavbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={missionBg} alt="Our Mission" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--industrial-dark))]/95 via-[hsl(var(--industrial-dark))]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Compass className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Mission</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Delivering <span className="text-primary">Value</span> Through Quality, Service & Trust
              </h1>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-xl text-gray-200 leading-relaxed italic">
                  "We envision becoming the benchmark for quality in the cable industry—championing integrity, 
                  social responsibility, and excellence. Our commitment is to consistently deliver value to 
                  our customers by providing high-quality products at the right time, in the right place, 
                  and at the right price."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Pillars */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">The Pillars of Our Mission</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Four foundational principles that guide every decision we make
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {missionPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-card h-full rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                        <pillar.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                      <p className="text-muted-foreground">{pillar.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Metrics */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Commitment in Numbers</h2>
              <p className="text-xl text-muted-foreground">Measurable results that reflect our dedication</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {commitments.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-8 border border-border text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: '0 352' }}
                        whileInView={{ strokeDasharray: `${item.value * 3.52} 352` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-foreground">{item.value}{item.suffix}</span>
                    </div>
                  </div>
                  <p className="font-medium text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement Visual */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-3xl p-12 border border-primary/20">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center lg:text-left"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto lg:mx-0 mb-4">
                    <Heart className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Right Product</h3>
                  <p className="text-muted-foreground">High-quality cables that meet your exact specifications</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Right Time</h3>
                  <p className="text-muted-foreground">Timely delivery with efficient logistics</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center lg:text-right"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto lg:ml-auto mb-4">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Right Price</h3>
                  <p className="text-muted-foreground">Competitive pricing without compromising quality</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[hsl(var(--industrial-dark))] to-[hsl(var(--industrial-blue))]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Experience Our Mission in Action</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Chhajer Cable Industries for their connectivity needs.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurMission;
