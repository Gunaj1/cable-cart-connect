
import React from 'react';
import { Cable } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/4fe743c1-7814-4030-b751-98c886511e2c.png" 
        alt="Chhajer Cable Industries" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
