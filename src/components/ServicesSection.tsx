
import React from 'react';
import { Truck, Shield, Headphones, Award, Settings, Zap } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across India with real-time tracking and secure packaging.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'All products undergo rigorous testing and come with manufacturer warranties and quality guarantees.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for technical queries, order assistance, and after-sales service.'
    },
    {
      icon: Award,
      title: 'OEM & Branding Services',
      description: 'Comprehensive OEM manufacturing and private label solutions with custom branding options for bulk orders.'
    },
    {
      icon: Settings,
      title: 'Certified Products',
      description: 'ISO certified products meeting international standards with proper documentation and testing reports.'
    },
    {
      icon: Zap,
      title: 'Custom Solutions',
      description: 'Tailored cable solutions for specific requirements including bulk orders and custom specifications.'
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
          Our Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive solutions for all your cable and networking needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-blue-100 to-gray-100 rounded-full p-4 mb-6">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ServicesSection;
