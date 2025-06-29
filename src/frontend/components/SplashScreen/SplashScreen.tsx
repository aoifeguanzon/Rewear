/**
 * @file SplashScreen.tsx
 * @author Huy Le (huyisme-005)
 * @brief This is the code for the splash screen.
 */
import React, { useState } from 'react';
import '../../App.css';

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
      {/* Vertically Centered Buttons Section */}
      <div className="centered-buttons">
        <button
          className="w-full px-4 py-2 border border-gray-700 rounded bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          onClick={() => { /* handle new user click */ }}
        >
          New user
        </button>
        <button
          className="w-full px-4 py-2 border border-gray-700 rounded bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          onClick={() => { /* handle existing user click */ }}
        >
          Existing user
        </button>
      </div>
    </div>
  );
};

export default SplashScreen; //export it to make sure it gets displayed