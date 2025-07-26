import React, { useEffect, useState } from 'react';

const ScrollCable: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div 
      className={`scroll-cable ${isScrolling ? 'active' : ''}`}
      style={{
        background: `linear-gradient(
          90deg,
          transparent 0%,
          hsl(var(--cable-gray)) 20%,
          hsl(var(--electric-blue)) 50%,
          hsl(var(--cable-gray)) 80%,
          transparent 100%
        )`,
        backgroundSize: '200% 100%',
      }}
    />
  );
};

export default ScrollCable;