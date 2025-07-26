import React from 'react';

interface WireDividerProps {
  className?: string;
}

const WireDivider: React.FC<WireDividerProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden py-8 ${className}`}>
      {/* Main wire line */}
      <div className="relative h-0.5 bg-gradient-to-r from-transparent via-electric-cable to-transparent mx-auto max-w-4xl">
        {/* Traveling spark */}
        <div className="absolute top-0 left-0 w-2 h-0.5 bg-electric-blue animate-spark-travel rounded-full shadow-[0_0_10px_hsl(var(--electric-blue))]" />
        
        {/* Connection nodes */}
        <div className="absolute -top-1 left-1/4 w-2.5 h-2.5 bg-electric-blue rounded-full animate-electric-pulse shadow-[0_0_8px_hsl(var(--electric-blue))]" />
        <div className="absolute -top-1 right-1/4 w-2.5 h-2.5 bg-electric-blue rounded-full animate-electric-pulse shadow-[0_0_8px_hsl(var(--electric-blue))]" 
             style={{ animationDelay: '1s' }} />
        
        {/* Additional spark effects */}
        <div className="absolute top-0 left-1/3 w-1 h-0.5 bg-electric-pulse animate-spark-travel rounded-full opacity-60" 
             style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
        <div className="absolute top-0 right-1/3 w-1 h-0.5 bg-electric-pulse animate-spark-travel rounded-full opacity-40" 
             style={{ animationDelay: '1.5s', animationDuration: '2.5s' }} />
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-blue/5 to-transparent blur-sm" />
    </div>
  );
};

export default WireDivider;