import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/3" />
      
      {/* Main cable network animation */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Cable gradients */}
            <linearGradient id="cableGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.1)" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.2)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.1)" />
            </linearGradient>
            
            <linearGradient id="cableGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.08)" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.15)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.08)" />
            </linearGradient>

            {/* Glow effects for connection points */}
            <radialGradient id="connectionGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.4)" />
              <stop offset="70%" stopColor="hsl(var(--primary) / 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Data pulse gradient */}
            <linearGradient id="dataPulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="hsl(var(--primary) / 0.6)" />
              <stop offset="70%" stopColor="hsl(var(--primary) / 0.8)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Cable network paths */}
          {/* Main horizontal cable */}
          <path
            d="M100,300 Q300,280 500,300 T900,320 Q1000,325 1100,320"
            stroke="url(#cableGradient1)"
            strokeWidth="3"
            fill="none"
            className="animate-cable-connect"
          />
          
          {/* Secondary cable paths */}
          <path
            d="M200,500 Q400,480 600,500 T1000,520"
            stroke="url(#cableGradient2)"
            strokeWidth="2.5"
            fill="none"
            className="animate-cable-connect-delay-1"
          />
          
          <path
            d="M150,150 Q350,130 550,150 T850,170"
            stroke="url(#cableGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-cable-connect-delay-2"
          />
          
          {/* Vertical connecting cables */}
          <path
            d="M500,300 Q520,400 500,500"
            stroke="url(#cableGradient2)"
            strokeWidth="2"
            fill="none"
            className="animate-cable-vertical"
          />
          
          <path
            d="M750,170 Q770,250 750,320"
            stroke="url(#cableGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-cable-vertical-delay"
          />

          {/* Connection nodes with glow */}
          <g className="animate-pulse-connection">
            <circle cx="500" cy="300" r="8" fill="url(#connectionGlow)" />
            <circle cx="500" cy="300" r="3" fill="hsl(var(--primary) / 0.8)" />
          </g>
          
          <g className="animate-pulse-connection-delay-1">
            <circle cx="750" cy="320" r="6" fill="url(#connectionGlow)" />
            <circle cx="750" cy="320" r="2.5" fill="hsl(var(--primary) / 0.8)" />
          </g>
          
          <g className="animate-pulse-connection-delay-2">
            <circle cx="600" cy="500" r="5" fill="url(#connectionGlow)" />
            <circle cx="600" cy="500" r="2" fill="hsl(var(--primary) / 0.8)" />
          </g>

          {/* Data pulse effects */}
          <circle r="4" fill="url(#dataPulse)">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M100,300 Q300,280 500,300 T900,320 Q1000,325 1100,320"
            />
          </circle>
          
          <circle r="3" fill="url(#dataPulse)">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              begin="2s"
              path="M200,500 Q400,480 600,500 T1000,520"
            />
          </circle>
          
          <circle r="2.5" fill="url(#dataPulse)">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              begin="4s"
              path="M150,150 Q350,130 550,150 T850,170"
            />
          </circle>
        </svg>
      </div>
      
      {/* Floating network nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/30 rounded-full animate-float-node-${(i % 3) + 1}`}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${25 + (i * 8)}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {/* Node glow effect */}
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 animate-pulse" />
          </div>
        ))}
      </div>
      
      {/* Subtle grid pattern representing network infrastructure */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-drift 25s linear infinite'
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;