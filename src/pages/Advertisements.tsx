import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Megaphone, 
  Calendar, 
  Tag, 
  ExternalLink,
  Gift,
  Percent,
  Trophy,
  Sparkles
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import { Button } from '@/components/ui/button';

// Import images
import cat6StpPatchcord1 from '@/assets/CAT 6 STP Patchcord 1.png';
import cat6StpPatchcord2 from '@/assets/CAT 6 STP Patchcord 2.png';
import cat6StpPatchcord3 from '@/assets/CAT 6 STP Patchcord 3.png';

const Advertisements = () => {
  const navigate = useNavigate();

  const advertisements = [
    {
      id: 1,
      title: 'New Year Special: 20% Off on All Cat6 Cables',
      description: 'Start the year with premium networking solutions. Get 20% off on our entire Cat6 cable range including STP, FTP, and UTP variants.',
      date: '2024-01-20',
      type: 'Special Offer',
      icon: Percent,
      image: cat6StpPatchcord1,
      validTill: 'Jan 31, 2024',
      cta: 'Shop Now'
    },
    {
      id: 2,
      title: 'Cat6 STP Patchcord Line Launch',
      description: 'Introducing our latest range of high-performance Cat6 STP patchcords with enhanced EMI protection and Fluke-tested quality.',
      date: '2024-01-15',
      type: 'Product Launch',
      icon: Sparkles,
      image: cat6StpPatchcord2,
      validTill: null,
      cta: 'Explore Products'
    },
    {
      id: 3,
      title: 'Bulk Order Benefits: Free Shipping',
      description: 'Order cables worth ₹50,000 or more and enjoy free shipping across India. Plus, get complimentary cable testers with orders above ₹1,00,000.',
      date: '2024-01-10',
      type: 'Promotion',
      icon: Gift,
      image: cat6StpPatchcord3,
      validTill: 'Ongoing',
      cta: 'Get Quote'
    },
    {
      id: 4,
      title: 'Industry Excellence Award 2024',
      description: 'Chhajer Cable Industries receives the prestigious Manufacturing Excellence Award for outstanding quality and innovation in cable manufacturing.',
      date: '2024-01-05',
      type: 'Achievement',
      icon: Trophy,
      image: cat6StpPatchcord1,
      validTill: null,
      cta: 'Read More'
    }
  ];

  const typeColors: Record<string, string> = {
    'Special Offer': 'bg-red-500/10 text-red-600',
    'Product Launch': 'bg-blue-500/10 text-blue-600',
    'Promotion': 'bg-green-500/10 text-green-600',
    'Achievement': 'bg-yellow-500/10 text-yellow-600'
  };

  return (
    <>
      <Helmet>
        <title>Advertisements & Announcements | Chhajer Cable Industries</title>
        <meta name="description" content="Latest offers, promotions, and announcements from Chhajer Cable Industries." />
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
                <Megaphone className="w-5 h-5" />
                <span className="font-medium">News & Media</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-6">
                Advertisements & Offers
              </h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with our latest offers, product launches, and company news
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Banner */}
        <section className="container mx-auto px-4 -mt-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-primary-foreground relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  🔥 Limited Time Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  New Year Sale: Up to 25% Off
                </h2>
                <p className="opacity-90 mb-6">
                  Premium quality cables at unbeatable prices. Don't miss out on our biggest sale of the year!
                </p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-background text-primary hover:bg-background/90"
                >
                  Shop Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="hidden md:flex justify-end">
                <img
                  src={cat6StpPatchcord2}
                  alt="Sale Banner"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Advertisements Grid */}
        <section className="container mx-auto px-4 py-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Latest <span className="text-primary">Announcements</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {advertisements.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card rounded-2xl overflow-hidden shadow-xl border group hover:border-primary/50 transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${typeColors[ad.type]}`}>
                      <ad.icon className="w-4 h-4" />
                      {ad.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{ad.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(ad.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {ad.validTill && (
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          Valid: {ad.validTill}
                        </span>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      {ad.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-3xl p-8 md:p-12 text-center shadow-xl border max-w-3xl mx-auto"
          >
            <Megaphone className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter to receive the latest offers, product launches, and company news directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border bg-background"
              />
              <Button className="px-8">Subscribe</Button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Advertisements;
