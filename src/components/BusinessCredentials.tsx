import React from 'react';
import { Shield, Award, FileCheck, Globe, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BusinessCredentials = () => {
  const credentials = [
    {
      icon: Shield,
      title: 'ISO 9001:2015',
      subtitle: 'Certified',
      description: 'Quality Management System ensuring consistent excellence.',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      icon: Award,
      title: 'BIS Certification',
      subtitle: 'Approved',
      description: 'Bureau of Indian Standards certified for safety.',
      gradient: 'from-emerald-600 to-teal-500'
    },
    {
      icon: FileCheck,
      title: 'GST Registered',
      subtitle: 'Compliant',
      description: 'Fully compliant with Indian tax regulations.',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Export License',
      subtitle: 'International',
      description: 'IEC authorized for global trade operations.',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  const businessStats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '27+', label: 'Years Legacy', icon: TrendingUp },
    { number: '15+', label: 'Countries', icon: Globe },
    { number: '10+', label: 'Certifications', icon: Award }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950" />
      
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-900/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-900/15 rounded-full blur-[150px]" />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 backdrop-blur-sm mb-8"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300 tracking-wide">Verified & Trusted</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
              Business Credentials
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Trusted certifications and compliance for your complete peace of mind
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {credentials.map((credential, index) => {
            const IconComponent = credential.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${credential.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 text-center h-full hover:transform hover:-translate-y-2">
                  <div className="relative mx-auto mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${credential.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${credential.gradient} flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{credential.title}</h3>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${credential.gradient} bg-clip-text text-transparent mb-4`}>
                    {credential.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">{credential.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Business Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 rounded-[2.5rem] blur-xl" />
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-10 border border-slate-800/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {businessStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Company Registration Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-cyan-600/30 to-blue-600/30 rounded-[2.5rem] blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem]">
            {/* Premium gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-900" />
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }} />

            <div className="relative p-10 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                    <FileCheck className="w-4 h-4 text-blue-300" />
                    <span className="text-sm font-medium text-blue-200">Company Registration</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Company Name', value: 'Chhajer Cable Industries Pvt. Ltd.' },
                      { label: 'CIN', value: 'U31300DL1997PTC087654' },
                      { label: 'Registration Date', value: 'March 15, 1997' },
                      { label: 'Registered Office', value: 'A6 Jhilmil Industrial Area, New Delhi 110095' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-blue-300 text-sm font-medium min-w-[140px]">{item.label}:</span>
                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                    <Globe className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-medium text-cyan-200">Banking Details</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Bank', value: 'State Bank of India' },
                      { label: 'Branch', value: 'Jhilmil Industrial Area' },
                      { label: 'Account Type', value: 'Current Account' },
                      { label: 'IFSC Code', value: 'SBIN0001234' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-cyan-300 text-sm font-medium min-w-[140px]">{item.label}:</span>
                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessCredentials;
