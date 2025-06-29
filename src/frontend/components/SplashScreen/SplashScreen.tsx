/**
 * @file SplashScreen.tsx
 * @author Huy Le (huyisme-005)
 * @brief This is the code for the splash screen.
 */
import React, { useState } from 'react';

/**
 * This is the SplashScreen variable to represent the landing page.
 * @returns the splash screen
 */
const SplashScreen: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white relative">
      {!imgError ? (
        <img
          src="assets/logo.jpg"
          alt="Logo"
          style={{ width: '1400px', height: '500px', borderRadius: '0.05rem', objectFit: 'contain' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={{ width: '1400px', height: '500px' }} className="flex items-center justify-center bg-gray-100 rounded text-gray-100 text-xl">
          Logo not found
        </div>
      )}
      
    </div>
  );
};

export default SplashScreen; //export it to make sure it gets displayed