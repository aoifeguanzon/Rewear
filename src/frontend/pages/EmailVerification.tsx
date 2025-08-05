/**
 * @file EmailVerification.tsx
 * @author Huy Le (huyisme-005), Aoife Guanzon
 * @brief Page for verifying user email after signup and login. Handles code input, resend, and verification logic.
 */
// EmailVerification.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './AuthPage.css';

const EmailVerification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      const emailParam = searchParams.get('email');
      if (emailParam) {
        setEmail(emailParam);
      }
    }
  }, [location.state, searchParams]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || !email) {
      setError('Please enter both email and verification code');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Email verified successfully! Redirecting to login...');
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification code sent successfully! Please check your email.');
      } else {
        setError(data.message || 'Failed to resend code');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <Link to="/signup" className="back-button">Back</Link>

        <h1 className="title">Verify Email</h1>
        <div className="auth-subtitle">
          <p>Check your email for the verification code.<br />Enter it below to activate your account.</p>
        </div>

        {message && (
          <div className="alert success-alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert error-alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleVerification}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="text"
            placeholder="Verification Code (6 digits)"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            className="auth-input"
            maxLength={6}
            pattern="[0-9]{6}"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="big-dark-button"
          >
            <h1>{isLoading ? 'Verifying...' : 'Join ReWear'}</h1>
          </button>
        </form>

        <p
          onClick={!isLoading ? handleResendCode : undefined}
          className={`resend-link ${isLoading ? 'disabled' : ''}`}
          style={{marginTop: 0}}
        >
          <b>Resend code</b>
        </p>

        <div
          style={{display: 'flex', alignSelf: 'center'}}>
          <p className='switch-link'>Already verified?{' '}
            <Link to="/login" className="switch-anchor">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
