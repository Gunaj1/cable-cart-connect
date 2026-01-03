import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, ArrowRight, Newspaper } from 'lucide-react';
import MegaMenuNavbar from '@/components/MegaMenuNavbar';

const Blogs = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Cat6 vs Cat5e: Which Cable is Right for You?',
      excerpt: 'Learn about the key differences between Cat6 and Cat5e cables and make an informed decision for your networking needs.',
      author: 'Technical Team',
      date: '2024-01-15',
      category: 'Technical Guide'
    },
    {
      id: 2,
      title: 'The Importance of Quality Cables in Modern Networks',
      excerpt: 'Discover why investing in high-quality cables can save you time and money in the long run.',
      author: 'Industry Insights',
      date: '2024-01-10',
      category: 'Industry News'
    },
    {
      id: 3,
      title: 'Shielded vs Unshielded Cables: What You Need to Know',
      excerpt: 'Explore the differences between STP, FTP, and UTP cables and their ideal applications.',
      author: 'Technical Team',
      date: '2024-01-05',
      category: 'Technical Guide'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Blogs & Articles | Chhajer Cable Industries</title>
        <meta name="description" content="Stay updated with the latest insights, guides, and news from Chhajer Cable Industries." />
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
                Blogs & Articles
              </h1>
              <p className="text-xl text-white/90">
                Stay updated with the latest insights, guides, and news from the cable industry
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-6">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    
                    <button className="text-primary hover:text-primary/80 font-medium flex items-center group">
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground">
                More articles coming soon. Stay tuned for updates!
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blogs;
