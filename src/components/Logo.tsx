
import React from 'react';
import { Cable } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Cable className="w-full h-full text-blue-600" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800 opacity-20 rounded-sm" />
      </div>
    </div>
  );
};

export default Logo;
