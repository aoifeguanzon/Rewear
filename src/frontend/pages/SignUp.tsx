/**
 * @file SignUp.tsx
 * @author Huy Le (huyisme-005), Aoife Guanzon
 * @brief Sign up page
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
//@ts-ignore
import icon from '../assets/icon.png'

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Added: State for error, success, and loading feedback for signup API call
  // These states are used to show messages and loading spinner during signup
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    // Added: Send signup data to backend API and handle response
    // Responsible for creating user account and redirecting to email verification
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(data.message || 'Account created!');
        // Optionally redirect to verification page
        navigate('/verify-email', { state: { email } });
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  } 

  return (
    <div className="signup-page">
      <Link to="/" className="back-button">Back</Link>

      <div className='green-section'>
      <h1 className="title">Sign up</h1>
      <div className="auth-subtitle">
        <h2>Where style meets sustainability.
          <br /><b>Join the movement.</b>
        </h2>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="auth-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="big-dark-button">
          <h1>Create account</h1>
        </button>
        {/* Added: Show error, success, and loading messages for signup process */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        {loading && <div className="loading-message">Creating account...</div>}
      </form>

      <div className="switch-link">
        <p>Already with us? <Link to="/login" className="switch-anchor">Log in</Link></p>
      </div>
    </div>

      <div className='logo-section'>
        <img src={icon} alt="Logo" />
      </div>

    </div>
  );
};

export default SignUp;
