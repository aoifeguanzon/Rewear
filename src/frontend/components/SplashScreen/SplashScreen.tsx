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
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      {!imgError ? (
        <img
          src="assets/logo.jpg"
          alt="Logo"
          style={{ width: '1400px', height: '300px', borderRadius: '0.05rem', objectFit: 'contain' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={{ width: '1400px', height: '300px' }} className="flex items-center justify-center bg-gray-100 rounded text-gray-100 text-xl">
          Logo not found
        </div>
      )}
      {/* Centered Buttons Section */}
      <div className="flex justify-center w-full mt-8">
        <div className="flex flex-row gap-4">
          <button
            className="px-16 py-3 bg-green-600 text-white rounded-md font-semibold text-lg shadow hover:bg-green-700 transition-colors w-64"
            onClick={() => {
              /* handle new user click */
            }}
          >
            New User
          </button>
          <button
            className="px-16 py-3 bg-white text-green-700 border border-green-600 rounded-md font-semibold text-lg shadow hover:bg-green-50 transition-colors w-64"
            onClick={() => {
              /* handle returning user click */
            }}
          >
            Returning User
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; //export it to make sure it gets displayed