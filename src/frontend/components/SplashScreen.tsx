/**
 * @file SplashScreen.tsx
 * @author Huy Le, Aoife Guanzon
 * @brief This is the code for the splash screen.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      {!imgError ? (
        <img
          src="assets/logo.png"
          alt="Logo"
          className="splash-logo"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="splash-logo-error">
          Logo not found
        </div>
      )}

      <div className="button-container">
        <button
          className="splash-button"
          onClick={() => navigate('/signup')}
        >
          New user
        </button>
        <button
          className="splash-button"
          onClick={() => navigate('/login')}
        >
          Returning User
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;