import React from 'react';
import { Building2, Star, Award } from 'lucide-react';

const ClientLogoStrip = () => {
  // Generate placeholder logos with enhanced design
  const logoPlaceholders = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `Add Logo ${index + 1}`,
    category: index % 3 === 0 ? 'enterprise' : index % 3 === 1 ? 'partner' : 'client'
  }));

  return (
    <div className="w-full bg-gradient-to-br from-blue-600/95 via-blue-700/95 to-indigo-700/95 backdrop-blur-md py-8 border-t border-blue-400/30 shadow-2xl relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:40px_40px] animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide">Our Trusted Clients</h3>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Star className="w-6 h-6 text-yellow-300 fill-current" />
            </div>
          </div>
          <p className="text-blue-100 text-sm max-w-md mx-auto">
            Proudly serving industry leaders and growing businesses worldwide
          </p>
        </div>
        
        {/* Enhanced Logo Strip Container */}
        <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          {/* Enhanced gradient overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-blue-600/95 via-blue-600/70 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-blue-600/95 via-blue-600/70 to-transparent z-20 pointer-events-none"></div>
          
          {/* Scrolling Logo Container with enhanced styling */}
          <div className="flex animate-scroll-infinite hover:animation-pause">
            {/* First set of logos */}
            <div className="flex space-x-6 min-w-max">
              {logoPlaceholders.map((logo) => (
                <div
                  key={`first-${logo.id}`}
                  className="group flex-shrink-0 w-28 h-20 bg-white/15 border-2 border-dashed border-white/40 rounded-xl flex flex-col items-center justify-center backdrop-blur-md hover:bg-white/25 hover:border-white/60 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-1 group-hover:bg-white/30 transition-colors">
                    {logo.category === 'enterprise' ? (
                      <Building2 className="w-4 h-4 text-white" />
                    ) : logo.category === 'partner' ? (
                      <Award className="w-4 h-4 text-white" />
                    ) : (
                      <Star className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-white text-xs font-medium text-center px-2 group-hover:text-blue-100 transition-colors">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-6 min-w-max ml-6">
              {logoPlaceholders.map((logo) => (
                <div
                  key={`second-${logo.id}`}
                  className="group flex-shrink-0 w-28 h-20 bg-white/15 border-2 border-dashed border-white/40 rounded-xl flex flex-col items-center justify-center backdrop-blur-md hover:bg-white/25 hover:border-white/60 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-1 group-hover:bg-white/30 transition-colors">
                    {logo.category === 'enterprise' ? (
                      <Building2 className="w-4 h-4 text-white" />
                    ) : logo.category === 'partner' ? (
                      <Award className="w-4 h-4 text-white" />
                    ) : (
                      <Star className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-white text-xs font-medium text-center px-2 group-hover:text-blue-100 transition-colors">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-8 mt-6 text-blue-100 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>500+ Active Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>25+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Global Reach</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogoStrip;