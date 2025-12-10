import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, Milestone, TrendingUp, Award, Cpu, Globe, Rocket } from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import journeyBg from '@/assets/journey-bg.jpg';

const OurJourney: React.FC = () => {
  const milestones = [
    {
      year: '1997',
      title: 'The Beginning',
      description: 'Founded Chhajer Cable Industries with a vision to provide high-quality cables. Established our first manufacturing unit in Delhi with a small but dedicated team.',
      icon: Milestone,
      highlight: false,
      achievements: ['First manufacturing unit', 'Initial product line launched', 'Local market penetration']
    },
    {
      year: '2005',
      title: 'LAN Cable Innovation',
      description: 'Introduced our comprehensive range of LAN cables. Expanded our product line to include Cat5e and Cat6 cables, meeting the growing demand for networking solutions.',
      icon: Cpu,
      highlight: false,
      achievements: ['Cat5e cables launched', 'Cat6 cables introduced', 'Quality certification obtained']
    },
    {
      year: '2010',
      title: 'Technology Advancement',
      description: 'Made significant investments in state-of-the-art manufacturing technology. Achieved ISO certification, marking a milestone in our commitment to quality.',
      icon: Award,
      highlight: false,
      achievements: ['ISO certification', 'Modern machinery installed', 'Testing lab established']
    },
    {
      year: '2015',
      title: 'Product Diversification',
      description: 'Expanded into specialized cable categories including CCTV, telephone, lift, and computer power cords, becoming a one-stop solution for connectivity needs.',
      icon: TrendingUp,
      highlight: false,
      achievements: ['CCTV cables added', 'Power cords introduced', 'Market expansion']
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Embraced digital technologies to enhance customer experience and streamline operations. Launched our online presence to serve customers better.',
      icon: Globe,
      highlight: false,
      achievements: ['Online platform launched', 'Digital ordering system', 'Enhanced customer support']
    },
    {
      year: '2025',
      title: 'Future Ready',
      description: 'Continuing our commitment to innovation with sustainable practices and advanced manufacturing. Leading the industry with eco-friendly solutions.',
      icon: Rocket,
      highlight: true,
      achievements: ['Sustainable practices', 'Advanced R&D', 'Industry leadership']
    }
  ];

  const stats = [
    { value: '27+', label: 'Years in Business' },
    { value: '500+', label: 'Products' },
    { value: '1000+', label: 'Clients Served' },
    { value: '6', label: 'Major Milestones' }
  ];

  return (
    <>
      <Helmet>
        <title>Our Journey - Chhajer Cable Industries | 27 Years of Excellence</title>
        <meta name="description" content="Explore the 27-year journey of Chhajer Cable Industries from 1997 to 2025. Discover our milestones, achievements, and commitment to cable manufacturing excellence." />
      </Helmet>

      <MegaMenuNavbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={journeyBg} alt="Our Journey" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--industrial-dark))]/95 via-[hsl(var(--industrial-dark))]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Journey</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="text-primary">27 Years</span> of Building Excellence
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                From a small manufacturing unit to India's trusted cable manufacturer — witness our remarkable journey of growth, innovation, and excellence.
              </p>
            </motion.div>
          </div>

          {/* Animated timeline indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/80 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Milestones That Define Us</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Each milestone represents our commitment to growth and excellence
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-primary hidden lg:block" />

              <div className="space-y-12 lg:space-y-0">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:mb-16`}
                  >
                    {/* Content Card */}
                    <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                      <div className={`bg-card rounded-2xl p-8 border ${milestone.highlight ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'} hover:border-primary/50 transition-all`}>
                        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${milestone.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                            <milestone.icon className="w-6 h-6" />
                          </div>
                          <span className={`text-3xl font-bold ${milestone.highlight ? 'text-primary' : 'text-foreground'}`}>
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground mb-4">{milestone.description}</p>
                        
                        {/* Achievements */}
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          {milestone.achievements.map((achievement, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                      <div className={`w-6 h-6 rounded-full border-4 ${milestone.highlight ? 'bg-primary border-primary-foreground' : 'bg-background border-primary'}`} />
                    </div>

                    {/* Empty space for alignment */}
                    <div className="hidden lg:block lg:w-5/12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Growth Chart Visual */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Growth Story</h2>
              <p className="text-xl text-muted-foreground">Continuous expansion and improvement over the years</p>
            </motion.div>

            <div className="bg-card rounded-3xl p-8 border border-border">
              <div className="flex items-end justify-between h-64 gap-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(index + 1) * 15 + 10}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col items-center justify-end"
                  >
                    <div 
                      className={`w-full rounded-t-lg ${milestone.highlight ? 'bg-gradient-to-t from-primary to-primary/60' : 'bg-gradient-to-t from-primary/80 to-primary/40'}`}
                      style={{ height: '100%' }}
                    />
                    <p className="text-sm font-bold text-foreground mt-3">{milestone.year}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-20 bg-gradient-to-r from-[hsl(var(--industrial-dark))] to-[hsl(var(--industrial-blue))]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">The Journey Continues</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                As we look to the future, we remain committed to innovation, quality, and serving our customers with the best connectivity solutions.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurJourney;
