/**
 * @file Login.tsx
 * @author Huy Le (huyisme-005)
 * @brief Login page
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
// @ts-ignore
import icon from '../assets/icon.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Added: State for error and loading feedback for login API call
  // These states are used to show messages and loading spinner during login
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Added: Send login data to backend API and handle response
    // Responsible for authenticating user and redirecting to home or verification page
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Save token if needed: localStorage.setItem('token', data.token);
        navigate('/home');
      } else if (data.needsVerification) {
        setError('Please verify your email before logging in.');
        // Optionally redirect to verification page
        // navigate('/verify-email', { state: { email: username } });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
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
        {/* Added: Show error and loading messages for login process */}
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Logging in...</div>}
        </form>

        <div className="switch-link">
          <p>Don't have an account? <Link to="/signup" className="switch-anchor">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
