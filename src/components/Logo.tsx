
import React from 'react';
import { Cable } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-gray-500 to-zinc-500 rounded-lg opacity-20 blur-sm transform rotate-3"></div>
        <div className="relative bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-600 rounded-lg p-2 shadow-lg">
          <Cable className="w-full h-full text-white" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
