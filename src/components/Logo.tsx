
import React from 'react';
import { Cable } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg opacity-20 blur-sm transform rotate-3"></div>
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg p-2 shadow-lg">
          <Cable className="w-full h-full text-white" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
