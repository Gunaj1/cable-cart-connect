import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5 animate-pulse-slow" />
      
      {/* Flowing wave layers */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.03)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.08)" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.02)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.06)" />
            </linearGradient>
          </defs>
          
          {/* First wave layer */}
          <path
            d="M0,400 C300,200 600,600 1200,300 L1200,800 L0,800 Z"
            fill="url(#wave1)"
            className="animate-wave-slow"
          />
          
          {/* Second wave layer */}
          <path
            d="M0,600 C400,300 800,700 1200,400 L1200,800 L0,800 Z"
            fill="url(#wave2)"
            className="animate-wave-medium"
          />
        </svg>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary/20 rounded-full animate-float-${(i % 3) + 1}`}
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
      
      {/* Connection lines (subtle) */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Animated connection lines */}
          <line
            x1="0"
            y1="200"
            x2="1200"
            y2="250"
            stroke="url(#line1)"
            strokeWidth="1"
            className="animate-line-flow"
          />
          <line
            x1="0"
            y1="500"
            x2="1200"
            y2="480"
            stroke="url(#line1)"
            strokeWidth="1"
            className="animate-line-flow-reverse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-shift 20s linear infinite'
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;