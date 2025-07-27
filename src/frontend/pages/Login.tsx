/**
 * @file Login.tsx
 * @author Huy Lee
 * @brief Login page
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import icon from '../assets/icon.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="signup-page">
      <Link to="/" className="back-button">Back</Link>
      <div className="logo-section">
        <img src={icon} alt="Logo" />
      </div>
      <div className="green-section">
        <h1 className="title">Welcome!</h1>
        <div className="auth-subtitle">
          <h2>Your next look awaits you.</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username / email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="auth-input"
          />
          <div>
            <a href="/" className="switch-anchor">Forgot password?</a>
          </div>
          <button type="submit" className="big-dark-button">
            <h1>Log in</h1>
          </button>
        </form>

        <div className="switch-link">
          <p>Don't have an account? <Link to="/signup" className="switch-anchor">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
