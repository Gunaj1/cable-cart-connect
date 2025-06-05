
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Target, Compass, Users, ExternalLink } from 'lucide-react';

interface AboutTabProps {
  activeTab: string;
}

const AboutTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('about');

  const tabContent = {
    about: {
      title: "About Us",
      icon: <Users className="w-12 h-12 text-blue-600 mb-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-xl">
            Founded in 2000, Chhajer Cable Industries has grown to become one of India's leading manufacturers of high-quality cables and networking solutions. Our state-of-the-art manufacturing facility in Delhi is equipped with the latest technology and staffed by skilled professionals who ensure that every product meets the highest standards of quality and reliability.
          </p>
          <p className="text-xl">
            We take pride in our comprehensive range of products that cater to various sectors including IT, telecommunications, security systems, and industrial applications. Our commitment to innovation and quality has earned us the trust of countless customers across the country.
          </p>
          <p className="text-xl">
            At Chhajer Cable Industries, we believe in building lasting relationships with our customers through excellent service, competitive pricing, and unwavering support. Our team of experts is always ready to assist you in finding the perfect solution for your specific needs.
          </p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80"
    },
    mission: {
      title: "Our Mission",
      icon: <Compass className="w-12 h-12 text-blue-600 mb-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-xl">
            We envision becoming the benchmark for quality in the cable industry—championing integrity, social responsibility, and excellence. Our commitment is to consistently deliver value to our customers by providing high-quality products at the right time, in the right place, and at the right price.
          </p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
    },
    vision: {
      title: "Our Vision",
      icon: <Target className="w-12 h-12 text-blue-600 mb-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-xl">
            Our vision is to continually advance our technologies and processes to deliver uncompromising quality in cable manufacturing. We invest in continuous learning, streamline our production, and are committed to excellence as a way of life. We create top-tier cables and cords that are durable, function-rich, and deliver real value in the installation, replacement, and management of server systems and connected infrastructure.
          </p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1594805809385-6d3cc7716e95?auto=format&fit=crop&q=80"
    },
    values: {
      title: "Our Core Values",
      icon: <BadgeCheck className="w-12 h-12 text-blue-600 mb-6" />,
      content: (
        <div className="space-y-8">
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Quality First</h3>
            <p className="text-gray-700">We never compromise on the durability, safety, or performance of our products.</p>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Customer Commitment</h3>
            <p className="text-gray-700">We put our customers at the center of everything we do—delivering on time, every time.</p>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Innovation & Growth</h3>
            <p className="text-gray-700">We embrace change, invest in technology, and constantly improve to stay ahead.</p>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Integrity & Accountability</h3>
            <p className="text-gray-700">We act with honesty, take responsibility, and uphold the highest ethical standards.</p>
          </div>
          
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Teamwork & Continuous Learning</h3>
            <p className="text-gray-700">We work collaboratively and invest in our people to build a smarter, stronger future.</p>
          </div>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
    }
  };

  const TabContent: React.FC<AboutTabProps> = ({ activeTab }) => {
    const content = tabContent[activeTab as keyof typeof tabContent];
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        <div className="order-2 lg:order-1">
          <div className="text-center mb-8">
            {content.icon}
            <h3 className="text-3xl font-bold mb-6">{content.title}</h3>
          </div>
          {content.content}
        </div>
        <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-gray-900/40 z-10" />
          <img 
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(tabContent).map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-blue-200'
            }`}
          >
            {tabContent[tab as keyof typeof tabContent].title}
          </button>
        ))}
      </div>
      
      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default AboutTabs;
