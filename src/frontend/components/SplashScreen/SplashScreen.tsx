import React, { useState } from 'react';

const SplashScreen: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      <div className="mt-4" />
      {!imgError ? (
        <img
          src="assets/logo.jpg"
          alt="Logo"
          style={{ width: '1400px', height: '200px', borderRadius: '0.05rem', objectFit: 'contain' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={{ width: '1400px', height: '200px' }} className="flex items-center justify-center bg-gray-100 rounded text-gray-100 text-xl">
          Logo not found
        </div>
      )}
      <div className="mt-10 flex flex-col items-center max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Purpose &amp; Vision</h2>
        <p className="text-lg text-gray-700">
          Help users shop sustainably by finding affordable second-hand fashion, connecting them with local clothing swaps, and building communities where they can share wardrobes and track their fashion impact.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen; 