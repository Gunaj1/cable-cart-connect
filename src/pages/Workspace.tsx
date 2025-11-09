import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

const Workspace = () => {
  const navigate = useNavigate();

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
            Life at Chhajer Cable Industries
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our modern workspace and manufacturing facilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Workspace View {index}</h3>
                <p className="text-sm text-muted-foreground">
                  Our state-of-the-art facility equipped with modern manufacturing equipment
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-lg p-8 max-w-4xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Our Facilities</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              At Chhajer Cable Industries, we pride ourselves on maintaining world-class manufacturing facilities
              that combine traditional craftsmanship with cutting-edge technology.
            </p>
            <p>
              Our workspace is designed to foster innovation, quality control, and efficient production processes
              that have made us a trusted name in the cable industry since 1997.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modern manufacturing equipment</li>
              <li>Quality control laboratories</li>
              <li>Dedicated R&D facilities</li>
              <li>Employee welfare areas</li>
              <li>Sustainable production practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
