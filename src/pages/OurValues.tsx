import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BadgeCheck, Heart, Shield, Lightbulb, Users, Target, Award, Handshake, TrendingUp, Clock } from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import valuesBg from '@/assets/values-bg.jpg';

const OurValues: React.FC = () => {
  const coreValues = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We never compromise on the durability, safety, or performance of our products. Every cable that leaves our facility meets the highest standards.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Customer Commitment',
      description: 'We put our customers at the center of everything we do—delivering on time, every time, with exceptional service and support.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Growth',
      description: 'We embrace change, invest in technology, and constantly improve our processes and products to stay ahead of market demands.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BadgeCheck,
      title: 'Integrity & Accountability',
      description: 'We act with honesty, take responsibility for our actions, and uphold the highest ethical standards in all our dealings.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Teamwork & Collaboration',
      description: 'We work together, leveraging diverse skills and perspectives to achieve common goals and deliver excellence.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'We invest in our people, encourage growth, and foster a culture of continuous improvement and knowledge sharing.',
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  const valueInAction = [
    { value: 'Quality First', example: 'Multi-level quality checks on every product' },
    { value: 'Customer Focus', example: '24/7 customer support availability' },
    { value: 'Innovation', example: 'Annual R&D investment in new technologies' },
    { value: 'Integrity', example: 'Transparent pricing with no hidden costs' },
    { value: 'Teamwork', example: 'Cross-functional collaboration in projects' },
    { value: 'Learning', example: 'Regular training programs for employees' }
  ];

  return (
    <>
      <Helmet>
        <title>Our Core Values - Chhajer Cable Industries | Quality, Integrity & Excellence</title>
        <meta name="description" content="Discover the core values that drive Chhajer Cable Industries. Quality First, Customer Commitment, Innovation, Integrity, Teamwork, and Continuous Learning." />
      </Helmet>

      <MegaMenuNavbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={valuesBg} alt="Our Values" className="w-full h-full object-cover" />
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
                <BadgeCheck className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Core Values</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                The <span className="text-primary">Principles</span> That Define Us
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Our values are the foundation of everything we do. They guide our decisions, 
                shape our culture, and drive our commitment to excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Six Pillars of Excellence</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The values that have guided us for over 27 years
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-card h-full rounded-3xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all relative overflow-hidden">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}>
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values in Action */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Values in Action</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                How we live our values every day
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {valueInAction.map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 border border-border flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.value}</h4>
                    <p className="text-sm text-muted-foreground">{item.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Building a Culture of <span className="text-primary">Excellence</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our values aren't just words on a wall—they're the DNA of our organization. 
                  Every employee at Chhajer Cable Industries embodies these principles in their 
                  daily work, creating a culture where excellence thrives.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From the manufacturing floor to customer service, from R&D to logistics, 
                  our values ensure consistency, reliability, and trust in everything we deliver.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Handshake, label: 'Trust' },
                  { icon: Target, label: 'Focus' },
                  { icon: Clock, label: 'Reliability' },
                  { icon: TrendingUp, label: 'Growth' }
                ].map((item, index) => (
                  <div key={item.label} className="bg-card rounded-2xl p-8 border border-border text-center">
                    <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="font-semibold text-foreground">{item.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Commitment Banner */}
        <section className="py-20 bg-gradient-to-r from-[hsl(var(--industrial-dark))] to-[hsl(var(--industrial-blue))]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <BadgeCheck className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Our Promise to You</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                When you choose Chhajer Cable Industries, you're choosing a partner committed to 
                quality, integrity, and excellence. Our values ensure that every interaction, 
                every product, and every service exceeds your expectations.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurValues;
