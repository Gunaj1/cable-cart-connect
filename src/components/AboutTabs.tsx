import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Target, Compass, Users, ExternalLink } from 'lucide-react';
import aboutUsBg from '../assets/about-us-bg.jpg';
import missionBg from '../assets/mission-bg.jpg';
import visionBg from '../assets/vision-bg.jpg';
import valuesBg from '../assets/values-bg.jpg';
import journeyBg from '../assets/journey-bg.jpg';
interface AboutTabProps {
  activeTab: string;
}
const AboutTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('about');
  const tabContent = {
    about: {
      title: "About Us",
      icon: <Users className="w-12 h-12 text-blue-600 mb-6" />,
      content: <div className="space-y-6">
          <p className="text-xl">Founded in 1997, Chhajer Cable Industries has grown to become one of India's leading manufacturers of high-quality cables and networking solutions. Our state-of-the-art manufacturing facility in Delhi is equipped with the latest technology and staffed by skilled professionals who ensure that every product meets the highest standards of quality and reliability.</p>
          <p className="text-xl">
            We take pride in our comprehensive range of products that cater to various sectors including IT, telecommunications, security systems, and industrial applications. Our commitment to innovation and quality has earned us the trust of countless customers across the country.
          </p>
          <p className="text-xl">
            At Chhajer Cable Industries, we believe in building lasting relationships with our customers through excellent service, competitive pricing, and unwavering support. Our team of experts is always ready to assist you in finding the perfect solution for your specific needs.
          </p>
        </div>,
      image: aboutUsBg
    },
    mission: {
      title: "Our Mission",
      icon: <Compass className="w-12 h-12 text-blue-600 mb-6" />,
      content: <div className="space-y-6">
          <p className="text-xl">
            We envision becoming the benchmark for quality in the cable industry—championing integrity, social responsibility, and excellence. Our commitment is to consistently deliver value to our customers by providing high-quality products at the right time, in the right place, and at the right price.
          </p>
        </div>,
      image: missionBg
    },
    vision: {
      title: "Our Vision",
      icon: <Target className="w-12 h-12 text-blue-600 mb-6" />,
      content: <div className="space-y-6">
          <p className="text-xl">
            Our vision is to continually advance our technologies and processes to deliver uncompromising quality in cable manufacturing. We invest in continuous learning, streamline our production, and are committed to excellence as a way of life. We create top-tier cables and cords that are durable, function-rich, and deliver real value in the installation, replacement, and management of server systems and connected infrastructure.
          </p>
        </div>,
      image: visionBg
    },
    values: {
      title: "Our Core Values",
      icon: <BadgeCheck className="w-12 h-12 text-blue-600 mb-6" />,
      content: <div className="space-y-8">
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
        </div>,
      image: valuesBg
    },
    journey: {
      title: "Our Journey",
      icon: <ExternalLink className="w-12 h-12 text-blue-600 mb-6" />,
      content: <div className="space-y-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-gray-600"></div>
            
            {/* Timeline items */}
            <div className="space-y-6">
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                  <span className="text-white font-bold text-sm">97</span>
                </div>
                <div className="ml-6 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-blue-200 shadow-lg">
                  <h3 className="text-lg font-bold text-blue-700 mb-1">1997 - Foundation</h3>
                  <p className="text-gray-700 text-sm">Started our business with a vision to provide high-quality cables. Established our first manufacturing unit in Delhi.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                  <span className="text-white font-bold text-sm">05</span>
                </div>
                <div className="ml-6 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-blue-200 shadow-lg">
                  <h3 className="text-lg font-bold text-blue-700 mb-1">2005 - LAN Cable Innovation</h3>
                  <p className="text-gray-700 text-sm">Introduced our first range of LAN cables. Expanded our product line to include Cat5e and Cat6 cables.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                  <span className="text-white font-bold text-sm">10</span>
                </div>
                <div className="ml-6 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-blue-200 shadow-lg">
                  <h3 className="text-lg font-bold text-blue-700 mb-1">2010 - Technology Advancement</h3>
                  <p className="text-gray-700 text-sm">Invested in state-of-the-art manufacturing technology and achieved ISO certification.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                  <span className="text-white font-bold text-sm">15</span>
                </div>
                <div className="ml-6 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-blue-200 shadow-lg">
                  <h3 className="text-lg font-bold text-blue-700 mb-1">2015 - Product Diversification</h3>
                  <p className="text-gray-700 text-sm">Expanded into specialized cables including CCTV, telephone, and computer power cords.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                  <span className="text-white font-bold text-sm">20</span>
                </div>
                <div className="ml-6 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-blue-200 shadow-lg">
                  <h3 className="text-lg font-bold text-blue-700 mb-1">2020 - Digital Transformation</h3>
                  <p className="text-gray-700 text-sm">Embraced digital technologies and enhanced our online presence.</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white ring-2 ring-yellow-400">
                  <span className="text-white font-bold text-sm">25</span>
                </div>
                <div className="ml-6 bg-gradient-to-r from-yellow-50 to-orange-50 backdrop-blur-sm rounded-lg p-4 border-2 border-yellow-300 shadow-xl">
                  <h3 className="text-lg font-bold text-orange-700 mb-1">2025 - Future Ready</h3>
                  <p className="text-gray-700 text-sm font-medium">Continuing our commitment to innovation and excellence. Leading the industry with sustainable practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>,
      image: journeyBg
    }
  };
  const TabContent: React.FC<AboutTabProps> = ({
    activeTab
  }) => {
    const content = tabContent[activeTab as keyof typeof tabContent];
    return <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -20
    }} transition={{
      duration: 0.5
    }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="order-2 lg:order-1">
          <div className="text-center mb-8">
            {content.icon}
            <h3 className="text-3xl font-bold mb-6">{content.title}</h3>
          </div>
          {content.content}
        </div>
        <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-gray-900/50 z-10" />
          <img src={content.image} alt={content.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
          {/* Cable line animation for journey tab */}
          {activeTab === 'journey' && <div className="absolute inset-0 z-20">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60">
                <div className="absolute top-0 left-0 w-4 h-0.5 bg-blue-300 animate-pulse-travel rounded-full shadow-lg"></div>
              </div>
            </div>}
        </div>
      </motion.div>;
  };
  return <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(tabContent).map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-blue-50 border border-blue-200'}`}>
            {tabContent[tab as keyof typeof tabContent].title}
          </button>)}
      </div>
      
      <TabContent activeTab={activeTab} />
    </div>;
};
export default AboutTabs;