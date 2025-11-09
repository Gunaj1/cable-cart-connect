import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
            Blogs & Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights, guides, and news from the cable industry
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
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
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            More articles coming soon. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
