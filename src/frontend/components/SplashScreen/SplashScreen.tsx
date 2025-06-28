import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white animate-fade-in">
      <img
        src={require('../../assets/rewear-logo.png')}
        alt="ReWear Logo"
        className="w-40 h-40 mb-8 drop-shadow-lg animate-bounce-gentle"
        style={{ borderRadius: '2rem' }}
      />
      <h1 className="text-4xl font-bold text-green-700 mb-2 tracking-tight">ReWear</h1>
      <p className="text-lg text-green-800 font-medium mb-6">Sustainable Fashion, Shared Locally</p>
      <div className="w-32 h-2 bg-green-200 rounded-full animate-slide-up" />
    </div>
  );
};

export default SplashScreen; 