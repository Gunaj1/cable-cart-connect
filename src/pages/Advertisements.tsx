import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';

const Advertisements = () => {
  const navigate = useNavigate();

  const advertisements = [
    {
      id: 1,
      title: 'New Cat6 STP Patchcord Line Launch',
      description: 'Introducing our latest range of high-performance Cat6 STP patchcords with enhanced EMI protection.',
      date: '2024-01-20',
      type: 'Product Launch'
    },
    {
      id: 2,
      title: 'Special Offer: Bulk Orders',
      description: 'Get exclusive discounts on bulk orders of Cat5e and Cat6 cables. Limited time offer!',
      date: '2024-01-15',
      type: 'Promotion'
    },
    {
      id: 3,
      title: 'Industry Recognition Award',
      description: 'Chhajer Cable Industries receives excellence award for quality manufacturing.',
      date: '2024-01-10',
      type: 'Achievement'
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
            Advertisements & Announcements
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest updates, offers, and announcements from Chhajer Cable Industries
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {advertisements.map((ad) => (
            <div key={ad.id} className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {ad.type}
                </span>
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{ad.title}</h3>
              
              <p className="text-muted-foreground mb-4">
                {ad.description}
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(ad.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Stay Updated?</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter to receive the latest news, offers, and product updates.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border bg-background"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisements;
