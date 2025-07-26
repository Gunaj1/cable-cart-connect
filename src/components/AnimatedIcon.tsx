import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  Icon: LucideIcon;
  className?: string;
  glowColor?: 'blue' | 'pulse';
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  Icon, 
  className = 'w-8 h-8',
  glowColor = 'blue'
}) => {
  const glowClass = glowColor === 'blue' 
    ? 'text-electric-blue drop-shadow-[0_0_8px_hsl(var(--electric-blue)/0.6)]' 
    : 'text-electric-pulse drop-shadow-[0_0_8px_hsl(var(--electric-pulse)/0.6)]';

  return (
    <div className="relative">
      {/* Background glow */}
      <div className={`absolute inset-0 ${glowClass} animate-electric-pulse blur-sm opacity-50`}>
        <Icon className={className} />
      </div>
      
      {/* Main icon with sway animation */}
      <div className={`relative ${glowClass} animate-cable-sway`}>
        <Icon className={className} />
      </div>
      
      {/* Subtle pulse overlay */}
      <div className={`absolute inset-0 ${glowClass} animate-pulse opacity-30`}>
        <Icon className={className} />
      </div>
    </div>
  );
};

export default AnimatedIcon;