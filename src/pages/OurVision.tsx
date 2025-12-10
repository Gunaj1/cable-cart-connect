import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, TrendingUp, Cpu, Leaf, Globe, Rocket, Star } from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import visionBg from '@/assets/vision-bg.jpg';

const OurVision: React.FC = () => {
  const visionAreas = [
    {
      icon: Cpu,
      title: 'Technology Leadership',
      description: 'Continuously advancing our manufacturing technologies to deliver cables with superior performance and reliability.',
      progress: 90
    },
    {
      icon: Lightbulb,
      title: 'Continuous Innovation',
      description: 'Investing in R&D to develop next-generation connectivity solutions that meet evolving market demands.',
      progress: 85
    },
    {
      icon: TrendingUp,
      title: 'Process Excellence',
      description: 'Streamlining production processes to maximize efficiency while maintaining the highest quality standards.',
      progress: 95
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Implementing eco-friendly manufacturing practices for a greener tomorrow.',
      progress: 75
    }
  ];

  const futureGoals = [
    {
      year: '2025',
      goals: ['Launch next-gen Cat7 cables', 'Expand manufacturing capacity', 'Achieve carbon neutrality goals']
    },
    {
      year: '2027',
      goals: ['Enter international markets', 'Smart cable solutions', '100% sustainable packaging']
    },
    {
      year: '2030',
      goals: ['Industry-leading R&D center', 'Complete digital transformation', 'Zero-waste manufacturing']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Vision - Chhajer Cable Industries | Leading Cable Manufacturing Innovation</title>
        <meta name="description" content="Explore Chhajer Cable Industries' vision for the future. Our commitment to technology advancement, innovation, and excellence in cable manufacturing." />
      </Helmet>

      <MegaMenuNavbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={visionBg} alt="Our Vision" className="w-full h-full object-cover" />
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
                <Eye className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Vision</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Shaping the <span className="text-primary">Future</span> of Connectivity
              </h1>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-xl text-gray-200 leading-relaxed italic">
                  "Our vision is to continually advance our technologies and processes to deliver uncompromising 
                  quality in cable manufacturing. We invest in continuous learning, streamline our production, 
                  and are committed to excellence as a way of life."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-1/4 right-20 w-20 h-20 bg-primary/20 rounded-full blur-xl hidden lg:block"
            animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.div
            className="absolute bottom-1/4 right-40 w-32 h-32 bg-primary/10 rounded-full blur-2xl hidden lg:block"
            animate={{ y: [0, -20, 0], scale: [1, 0.9, 1] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
          />
        </section>

        {/* Vision Areas with Progress */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Strategic Focus Areas</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Key areas driving our journey towards industry leadership
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {visionAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <area.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{area.title}</h3>
                      <p className="text-muted-foreground mb-4">{area.description}</p>
                      
                      {/* Progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-primary">{area.progress}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${area.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Statement Highlight */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[hsl(var(--industrial-dark))] to-[hsl(var(--industrial-blue))] rounded-3xl p-12 text-center relative overflow-hidden"
            >
              {/* Background decorations */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48" />
              
              <div className="relative">
                <Target className="w-16 h-16 text-primary mx-auto mb-8" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-3xl mx-auto">
                  Creating Top-Tier Cables That Deliver Real Value
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  We create cables and cords that are durable, function-rich, and deliver real value 
                  in the installation, replacement, and management of server systems and connected infrastructure.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Future Roadmap */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Future Roadmap</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Strategic milestones guiding our path to 2030
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {futureGoals.map((period, index) => (
                <motion.div
                  key={period.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className={`bg-card rounded-2xl p-8 border ${index === 2 ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'} hover:border-primary/50 transition-all h-full`}>
                    {index === 2 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Ultimate Goal
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${index === 2 ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                        {index === 0 ? <Rocket className="w-6 h-6" /> : index === 1 ? <Globe className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                      </div>
                      <span className="text-3xl font-bold text-foreground">{period.year}</span>
                    </div>
                    
                    <ul className="space-y-3">
                      {period.goals.map((goal, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Excellence as Way of Life */}
        <section className="py-20 bg-gradient-to-r from-[hsl(var(--industrial-dark))] to-[hsl(var(--industrial-blue))]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-8 h-8 text-primary fill-primary" />
                ))}
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Excellence as a Way of Life</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                At Chhajer Cable Industries, excellence isn't just a goal—it's embedded in everything we do, 
                every day, in every product we create.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurVision;
