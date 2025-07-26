import React, { useEffect, useState } from 'react';
import { Cable } from 'lucide-react';

const CableLoader: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Cable Animation */}
        <div className="flex items-center gap-8">
          {/* Cable */}
          <div className="relative">
            <div 
              className={`w-32 h-3 bg-gradient-to-r from-electric-cable via-electric-blue to-electric-cable rounded-full transform transition-all duration-1500 ${
                isConnected ? 'animate-cable-connect' : 'translate-x-[-100px] opacity-0'
              }`}
            />
            {/* Connector */}
            <div 
              className={`absolute -right-2 top-0 w-6 h-3 bg-electric-cable rounded-r-lg transition-all duration-1500 ${
                isConnected ? 'animate-cable-connect' : 'translate-x-[-100px] opacity-0'
              }`}
            />
          </div>

          {/* Port */}
          <div className="relative">
            <div className="w-8 h-6 bg-electric-cable rounded border-2 border-electric-blue/30">
              <div className="w-4 h-2 bg-electric-blue/20 rounded-sm mt-1 mx-auto" />
            </div>
            {/* Power surge effect */}
            {isConnected && (
              <div className="absolute inset-0 rounded animate-power-surge bg-electric-pulse/20" />
            )}
          </div>
        </div>

        {/* Logo with glow */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className={`transition-all duration-1000 ${isConnected ? 'animate-electric-pulse' : ''}`}>
            <Cable className="w-12 h-12 text-electric-blue" />
          </div>
          <p className="text-electric-cable text-sm mt-2 text-center font-medium">
            Connecting...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CableLoader;