/**
 * @file SignUp.tsx
 * @author Huy Lee, Aoife Guanzon
 * @brief Sign up page
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import icon from '../assets/icon.png'

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

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
