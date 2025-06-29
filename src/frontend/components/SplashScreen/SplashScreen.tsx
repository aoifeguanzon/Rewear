import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <img
        src="/logo.jpg"
        alt="Logo"
        className="w-60 h-60 object-contain"
        style={{ borderRadius: '2rem' }}
      />
    </div>
  );
};

export default SplashScreen; 