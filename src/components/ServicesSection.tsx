import React from 'react';
import { Truck, Shield, Headphones, Award, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: 'Swift Delivery',
      description: 'Pan-India express shipping with real-time tracking and premium secure packaging.',
      gradient: 'from-blue-600 to-cyan-500',
      delay: 0
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous 12-point testing protocol with manufacturer warranties on every product.',
      gradient: 'from-emerald-600 to-teal-500',
      delay: 0.1
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock expert assistance for technical queries and order support.',
      gradient: 'from-purple-600 to-pink-500',
      delay: 0.2
    },
    {
      icon: Award,
      title: 'OEM & Branding',
      description: 'Private label manufacturing with custom branding solutions for bulk orders.',
      gradient: 'from-amber-500 to-orange-500',
      delay: 0.3
    },
    {
      icon: Settings,
      title: 'Certified Products',
      description: 'ISO certified, meeting international standards with complete documentation.',
      gradient: 'from-rose-600 to-red-500',
      delay: 0.4
    },
    {
      icon: Zap,
      title: 'Custom Solutions',
      description: 'Tailored cable solutions for unique requirements and specialized applications.',
      gradient: 'from-indigo-600 to-violet-500',
      delay: 0.5
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Premium dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[130px]" />
      
      {/* Geometric grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Premium badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-300 tracking-wide">What We Offer</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Comprehensive solutions engineered for your cable and networking success
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: service.delay }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                
                {/* Card */}
                <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 h-full hover:transform hover:-translate-y-2">
                  {/* Icon container */}
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Hover line accent */}
                  <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
