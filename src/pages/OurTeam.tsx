import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, Linkedin, Mail, Award, Target, Lightbulb } from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import teamBg from '@/assets/team-bg.jpg';

const OurTeam: React.FC = () => {
  const leadership = [
    {
      name: 'Jyoti Chhajer',
      role: 'Proprietor',
      initials: 'JC',
      gradient: 'from-primary to-blue-700',
      description: 'As the Proprietor of Chhajer Cable Industries, Jyoti Chhajer brings visionary leadership and a commitment to excellence. With a deep understanding of the cable manufacturing industry and a passion for quality, she has been instrumental in establishing CCI as a trusted name in the market. Her strategic vision and dedication to customer satisfaction have been the driving force behind the company\'s growth and reputation for delivering premium connectivity solutions.',
      achievements: ['Founded CCI in 1997', 'Expanded to 500+ products', 'Built pan-India network']
    },
    {
      name: 'Amit Chhajer',
      role: 'CEO & Director',
      initials: 'AC',
      gradient: 'from-gray-600 to-gray-700',
      description: 'Amit Chhajer serves as the CEO and Director, leading the operational and strategic initiatives at Chhajer Cable Industries. With extensive expertise in manufacturing processes, quality control, and business development, he has played a pivotal role in modernizing the company\'s infrastructure and expanding its product portfolio. His innovative approach and commitment to technological advancement ensure that CCI remains at the forefront of the cable industry.',
      achievements: ['ISO Certification', 'Technology Modernization', 'Product Diversification']
    }
  ];

  const values = [
    { icon: Target, title: 'Vision', description: 'Leading India\'s cable industry with innovation' },
    { icon: Award, title: 'Excellence', description: 'Uncompromising standards in every product' },
    { icon: Lightbulb, title: 'Innovation', description: 'Pioneering solutions for tomorrow\'s needs' }
  ];

  return (
    <>
      <Helmet>
        <title>Meet Our Team - Chhajer Cable Industries | Leadership & Vision</title>
        <meta name="description" content="Meet the visionary leaders behind Chhajer Cable Industries. Learn about our dedicated team driving innovation and excellence in cable manufacturing." />
      </Helmet>

      <MegaMenuNavbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={teamBg} alt="Our Team" className="w-full h-full object-cover" />
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
                <Users className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Leadership</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Meet the <span className="text-primary">Visionaries</span> Behind Our Success
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Dedicated leaders driving innovation, quality, and growth at Chhajer Cable Industries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Cards */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Leadership Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience and expertise guiding our path to excellence
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl"
                >
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${leader.gradient} p-8 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
                    
                    <div className="relative flex items-center gap-6">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-3xl border-2 border-white/30">
                        {leader.initials}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{leader.name}</h3>
                        <p className="text-white/80 font-medium">{leader.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {leader.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
                      {leader.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Contact Icons */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                      <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Mail className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Culture */}
        <section className="py-20 bg-gradient-to-r from-[hsl(var(--industrial-dark))] to-[hsl(var(--industrial-blue))]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-6">Join Our Growing Team</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                We're always looking for talented individuals who share our passion for quality and innovation.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-gray-300">Team Members</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">15+</p>
                  <p className="text-gray-300">Departments</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">100%</p>
                  <p className="text-gray-300">Dedicated</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurTeam;
