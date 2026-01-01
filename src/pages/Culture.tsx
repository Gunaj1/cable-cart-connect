import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  Trophy, 
  Sparkles,
  Coffee,
  Target,
  Smile,
  Star
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';

const Culture = () => {
  const navigate = useNavigate();

  const cultureValues = [
    { icon: Heart, title: 'People First', description: 'Our employees are our greatest asset. We invest in their growth and well-being.' },
    { icon: Users, title: 'Team Spirit', description: 'Collaboration and mutual respect drive our success.' },
    { icon: Trophy, title: 'Excellence', description: 'We strive for excellence in everything we do.' },
    { icon: Sparkles, title: 'Innovation', description: 'Encouraging new ideas and creative solutions.' }
  ];

  const benefits = [
    'Competitive Salary Packages',
    'Health Insurance Coverage',
    'Professional Development Programs',
    'Performance Bonuses',
    'Work-Life Balance',
    'Festival Celebrations',
    'Team Building Activities',
    'Recognition & Rewards'
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Production Manager',
      years: '12 years',
      quote: 'CCI has been my second home. The growth opportunities and supportive environment have helped me build a fulfilling career.'
    },
    {
      name: 'Priya Sharma',
      role: 'Quality Analyst',
      years: '8 years',
      quote: 'The culture here encourages learning and innovation. Every day brings new challenges and opportunities to excel.'
    },
    {
      name: 'Amit Verma',
      role: 'Sales Executive',
      years: '5 years',
      quote: 'Working at CCI feels like being part of a family. The support from colleagues and management is exceptional.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Culture - Life at CCI | Chhajer Cable Industries</title>
        <meta name="description" content="Discover the vibrant culture at Chhajer Cable Industries - where people come first." />
      </Helmet>
      
      <MegaMenuNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Life at CCI</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-6">
                Our Culture
              </h1>
              <p className="text-xl text-muted-foreground">
                Building more than cables - we're building careers, relationships, and a legacy of excellence
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Culture Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              What Defines <span className="text-primary">Our Culture</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cultureValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card p-8 rounded-2xl shadow-lg border text-center hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Employee <span className="text-primary">Benefits</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  We believe in taking care of our team with comprehensive benefits that support both professional and personal growth.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-center gap-3"
                    >
                      <Coffee className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary to-primary/60 rounded-3xl p-8 text-primary-foreground">
                  <Target className="w-12 h-12 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">Join Our Family</h3>
                  <p className="opacity-90 mb-6">
                    Be part of a team that values your contribution and supports your growth at every step.
                  </p>
                  <button 
                    onClick={() => navigate('/careers')}
                    className="px-6 py-3 bg-background text-primary rounded-lg font-semibold hover:bg-background/90 transition-colors"
                  >
                    View Open Positions
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Voices from <span className="text-primary">Our Team</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 * index }}
                  className="bg-card p-8 rounded-2xl shadow-lg border relative"
                >
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Smile className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.years}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Culture;
