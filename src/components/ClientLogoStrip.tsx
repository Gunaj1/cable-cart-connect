import React from 'react';

const ClientLogoStrip = () => {
  // Generate placeholder logos
  const logoPlaceholders = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `Add Logo ${index + 1}`
  }));

  return (
    <div className="w-full bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-sm py-6 border-t border-blue-500/30">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-white text-xl font-semibold mb-6">Our Clients</h3>
        
        {/* Logo Strip Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-blue-600/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-blue-600/90 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling Logo Container */}
          <div className="flex animate-scroll-infinite hover:animation-pause">
            {/* First set of logos */}
            <div className="flex space-x-8 min-w-max">
              {logoPlaceholders.map((logo) => (
                <div
                  key={`first-${logo.id}`}
                  className="flex-shrink-0 w-24 h-16 bg-white/10 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-white text-xs font-medium text-center px-2">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-8 min-w-max ml-8">
              {logoPlaceholders.map((logo) => (
                <div
                  key={`second-${logo.id}`}
                  className="flex-shrink-0 w-24 h-16 bg-white/10 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-white text-xs font-medium text-center px-2">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogoStrip;