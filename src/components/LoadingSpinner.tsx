// src/components/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', message }) => {
  const sizeClasses: Record<string, string> = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]}`}>
      <div className="spinner"></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
