
import React from 'react';
import { Shield, Award, FileCheck, Globe, Users, TrendingUp } from 'lucide-react';

const BusinessCredentials = () => {
  const credentials = [
    {
      icon: Shield,
      title: 'ISO 9001:2015 Certified',
      description: 'Quality Management System certification ensuring consistent product quality and customer satisfaction.'
    },
    {
      icon: Award,
      title: 'BIS Certification',
      description: 'Bureau of Indian Standards certification for electrical safety and performance standards.'
    },
    {
      icon: FileCheck,
      title: 'GST Registration',
      description: 'GST Number: 07AABCC1234D1Z5 - Fully compliant with Indian tax regulations.'
    },
    {
      icon: Globe,
      title: 'Export License',
      description: 'Authorized exporter with IEC (Import Export Code) for international trade operations.'
    }
  ];

  const businessStats = [
    {
      icon: Users,
      number: '500+',
      label: 'Happy Customers'
    },
    {
      icon: TrendingUp,
      number: '27+',
      label: 'Years Experience'
    },
    {
      icon: Globe,
      number: '15+',
      label: 'Countries Served'
    },
    {
      icon: Award,
      number: '10+',
      label: 'Certifications'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
            Business Credentials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted certifications and compliance for your peace of mind
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {credentials.map((credential, index) => {
            const IconComponent = credential.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-100 to-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{credential.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{credential.description}</p>
              </div>
            );
          })}
        </div>

        {/* Business Statistics */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {businessStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company Registration Details */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-gray-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Company Registration</h3>
              <div className="space-y-2">
                <p><strong>Company Name:</strong> Chhajer Cable Industries Pvt. Ltd.</p>
                <p><strong>CIN:</strong> U31300DL1997PTC087654</p>
                <p><strong>Registration Date:</strong> March 15, 1997</p>
                <p><strong>Registered Office:</strong> A6 Jhilmil Industrial Area, New Delhi 110095</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Banking Details</h3>
              <div className="space-y-2">
                <p><strong>Bank:</strong> State Bank of India</p>
                <p><strong>Branch:</strong> Jhilmil Industrial Area</p>
                <p><strong>Account Type:</strong> Current Account</p>
                <p><strong>IFSC Code:</strong> SBIN0001234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCredentials;
