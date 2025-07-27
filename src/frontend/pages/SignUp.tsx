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

      <div className='signup-section'>
      <h1 className="title">Sign up</h1>
      <div className="signup-subtitle">
        <h2>Where style meets sustainability.</h2>
        <h2>Join the movement.</h2>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="signup-input"
        />
        <button type="submit" className="big-dark-button">
          <h1>Create account</h1>
        </button>
      </form>

      <div className="login-link">
        <p>Already with us? <Link to="/login" className="login-anchor">Log in</Link></p>
      </div>
    </div>

      <div className='logo-section'>
        <img src={icon} alt="Logo" />
      </div>

    </div>
  );
};

export default SignUp;
