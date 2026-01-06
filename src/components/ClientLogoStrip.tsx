import React from 'react';
import { Building2, Star, Sparkles, Award, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientLogoStrip = () => {
  const logoPlaceholders = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Partner ${index + 1}`,
    category: index % 3 === 0 ? 'enterprise' : index % 3 === 1 ? 'partner' : 'client'
  }));

  const trustIndicators = [
    { icon: Users, label: '500+ Active Clients', color: 'text-emerald-400' },
    { icon: Award, label: '27+ Years Excellence', color: 'text-amber-400' },
    { icon: Globe, label: 'Pan-India Presence', color: 'text-blue-400' }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Premium dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-purple-950/30" />

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50" />
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400 tracking-[0.2em] uppercase">Trusted Partners</span>
            <Sparkles className="w-5 h-5 text-blue-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Our Valued Clients
          </h3>
          <p className="text-slate-400 max-w-lg mx-auto">
            Trusted by industry leaders and growing businesses across India
          </p>
        </motion.div>

        {/* Logo Strip Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden py-6">
            <div className="flex animate-scroll-infinite hover:[animation-play-state:paused]">
              {/* First set */}
              <div className="flex space-x-6 min-w-max">
                {logoPlaceholders.map((logo) => (
                  <div
                    key={`first-${logo.id}`}
                    className="group flex-shrink-0 w-40 h-24 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm flex flex-col items-center justify-center hover:bg-slate-800/50 hover:border-slate-600/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center mb-2 group-hover:border-blue-500/30 transition-colors">
                      {logo.category === 'enterprise' ? (
                        <Building2 className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      ) : logo.category === 'partner' ? (
                        <Award className="w-6 h-6 text-slate-400 group-hover:text-amber-400 transition-colors" />
                      ) : (
                        <Star className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
                      )}
                    </div>
                    <span className="text-slate-500 text-xs font-medium group-hover:text-slate-300 transition-colors">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Duplicate set */}
              <div className="flex space-x-6 min-w-max ml-6">
                {logoPlaceholders.map((logo) => (
                  <div
                    key={`second-${logo.id}`}
                    className="group flex-shrink-0 w-40 h-24 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm flex flex-col items-center justify-center hover:bg-slate-800/50 hover:border-slate-600/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center mb-2 group-hover:border-blue-500/30 transition-colors">
                      {logo.category === 'enterprise' ? (
                        <Building2 className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      ) : logo.category === 'partner' ? (
                        <Award className="w-6 h-6 text-slate-400 group-hover:text-amber-400 transition-colors" />
                      ) : (
                        <Star className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
                      )}
                    </div>
                    <span className="text-slate-500 text-xs font-medium group-hover:text-slate-300 transition-colors">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
        >
          {trustIndicators.map((indicator, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <div className="relative">
                <div className={`absolute inset-0 ${indicator.color.replace('text-', 'bg-')}/20 rounded-full blur-md group-hover:blur-lg transition-all`} />
                <div className="relative w-3 h-3 rounded-full bg-current animate-pulse" style={{ color: `var(--tw-${indicator.color.split('-')[1]}-${indicator.color.split('-')[2]})` }}>
                  <div className={`w-3 h-3 rounded-full ${indicator.color.replace('text-', 'bg-')} animate-pulse`} />
                </div>
              </div>
              <span className="text-slate-300 font-medium">{indicator.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogoStrip;
