import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import icon from '../assets/icon.png';
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (location.state && (location.state as any).mode) {
      setIsLogin((location.state as any).mode === 'login');
    }
  }, [location.state]);

  return (
    <div className={`auth-page ${isLogin ? 'login-active' : 'signup-active'}`}>
      <div className="green-section">
        {isLogin ? (
          <>
            <h1 className="title">Welcome!</h1>
            <div className="auth-subtitle">Your next look awaits you.</div>
            <form className="auth-form">
              <input type="text" placeholder="Username / email" className="auth-input" />
              <input type="password" placeholder="Password" className="auth-input" />
              <button type="submit" className="big-dark-button">Log in</button>
            </form>
            <div className="switch-link">
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="switch-anchor">Sign up</button>
            </div>
          </>
        ) : (
          <>
            <h1 className="title">Sign up</h1>
            <div className="auth-subtitle">
              Where style meets sustainability.<br /><b>Join the movement.</b>
            </div>
            <form className="auth-form">
              <input type="text" placeholder="Username" className="auth-input" />
              <input type="email" placeholder="Email" className="auth-input" />
              <input type="password" placeholder="Password" className="auth-input" />
              <button type="submit" className="big-dark-button">Create account</button>
            </form>
            <div className="switch-link">
              Already with us?{' '}
              <button onClick={() => setIsLogin(true)} className="switch-anchor">Log in</button>
            </div>
          </>
        )}
      </div>

      <div className="logo-section">
        <img src={icon} alt="Logo" />
      </div>
    </div>
  );
};

export default AuthPage;
