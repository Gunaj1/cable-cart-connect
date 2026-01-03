import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Newspaper, 
  Calendar, 
  Download,
  ExternalLink,
  FileText,
  Award,
  TrendingUp
} from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';
import { Button } from '@/components/ui/button';

const PressReleases = () => {
  const navigate = useNavigate();

  const pressReleases = [
    {
      id: 1,
      title: 'Chhajer Cable Industries Expands Manufacturing Capacity by 50%',
      summary: 'New production lines and advanced machinery added to meet growing demand for premium networking cables.',
      date: '2024-01-20',
      category: 'Company News'
    },
    {
      id: 2,
      title: 'Launch of Next-Generation Cat6A Cable Range',
      summary: 'Introducing cables capable of supporting 10Gbps speeds up to 100 meters with enhanced shielding technology.',
      date: '2024-01-10',
      category: 'Product Launch'
    },
    {
      id: 3,
      title: 'ISO 9001:2015 Recertification Achieved',
      summary: 'Successful completion of quality management system audit reaffirms our commitment to excellence.',
      date: '2023-12-15',
      category: 'Certification'
    },
    {
      id: 4,
      title: 'Partnership with Leading IT Infrastructure Providers',
      summary: 'Strategic alliance formed to deliver comprehensive networking solutions to enterprise clients.',
      date: '2023-12-01',
      category: 'Partnership'
    },
    {
      id: 5,
      title: 'Manufacturing Excellence Award 2023',
      summary: 'Recognized for outstanding quality control and innovation in cable manufacturing processes.',
      date: '2023-11-15',
      category: 'Achievement'
    }
  ];

  const mediaHighlights = [
    { title: 'Featured in Economic Times', icon: Newspaper },
    { title: 'Industry Award Winners', icon: Award },
    { title: 'Market Leaders Report', icon: TrendingUp }
  ];

  return (
    <>
      <Helmet>
        <title>Press Releases | Chhajer Cable Industries</title>
        <meta name="description" content="Official press releases and media announcements from Chhajer Cable Industries." />
      </Helmet>
      
      <MegaMenuNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Hero Section with Background */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-24 overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/lovable-uploads/4fe743c1-7814-4030-b751-98c886511e2c.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/70" />
          
          <div className="container mx-auto px-4 relative z-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/90 hover:text-white mb-8 transition-colors"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white mb-6">
                <Newspaper className="w-5 h-5" />
                <span className="font-medium">News & Media</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Press Releases
              </h1>
              <p className="text-xl text-white/90">
                Official announcements and media coverage of Chhajer Cable Industries
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Media Highlights */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediaHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 p-6 rounded-xl bg-background shadow-lg border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-semibold">{highlight.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Releases List */}
        <section className="container mx-auto px-4 py-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Recent <span className="text-primary">Press Releases</span>
          </motion.h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <motion.article
                key={release.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card rounded-2xl p-6 shadow-lg border hover:border-primary/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {release.category}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(release.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{release.summary}</p>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Full Release
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-primary-foreground"
          >
            <FileText className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Media Kit</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Download our official media kit containing logos, brand guidelines, and company information for press use.
            </p>
            <Button className="bg-background text-primary hover:bg-background/90">
              <Download className="w-4 h-4 mr-2" />
              Download Media Kit
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default PressReleases;
