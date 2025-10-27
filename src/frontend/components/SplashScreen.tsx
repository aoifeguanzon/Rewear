/**
 * @file SplashScreen.tsx
 * @author Huy Le, Aoife Guanzon
 * @brief This is the code for the splash screen.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      {!imgError ? (
        <img
          src={logo}
          alt="Logo"
          className="splash-logo"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="splash-logo-error">
          <p>Logo not found</p>
        </div>
      )}

      <div className="button-container">
        <button
          className="splash-button"
          onClick={() => navigate('/signup')}
        >
          <h1>New user</h1>
        </button>
        <button
          className="splash-button"
          onClick={() => navigate('/login')}
        >
          <h1>Existing user</h1>
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;