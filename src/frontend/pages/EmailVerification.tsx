/**
 * @file EmailVerification.tsx
 * @author Huy Le (huyisme-005)
 * @brief Page for verifying user email after signup. Handles code input, resend, and verification logic.
 */
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../App.css';

/**
 * EmailVerification component
 * Renders form for user to verify their email using a code sent to their inbox.
 */
const EmailVerification: React.FC = () => {
  // State for verification code input
  const [verificationCode, setVerificationCode] = useState('');
  // State for email input
  const [email, setEmail] = useState('');
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for success message
  const [message, setMessage] = useState('');
  // State for error message
  const [error, setError] = useState('');
  // React Router navigation
  const navigate = useNavigate();
  // Search params for extracting email from URL
  const [searchParams] = useSearchParams();

  /**
   * Effect: Get email from URL params if available
   */
  React.useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  /**
   * Handles verification form submission
   * Sends POST request to backend to verify email with code
   */
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Email verified successfully! Redirecting to login...');
        // Store token if provided
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
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles resend code button click
   * Sends POST request to backend to resend verification code
   */
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification code sent successfully! Please check your email.');
      } else {
        setError(data.message || 'Failed to resend code');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="centered-page px-4 relative-position">
      {/* Back Arrow */}
      <Link to="/signup" style={{ position: 'absolute', top: 24, left: 24, display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Back to signup">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
      </Link>

      <h1 className="text-6xl font-light mb-4">Verify Email</h1>
      <div className="subtitle text-lg mb-8">
        <div>Check your email for the verification code.</div>
        <div>Enter it below to activate your account.</div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700">
          {error}
        </div>
      )}

      <form className="centered-form no-margin-top" onSubmit={handleVerification}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-black px-3 py-2 text-lg rounded-none focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Verification Code (6 digits)"
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
          className="border border-black px-3 py-2 text-lg rounded-none focus:outline-none"
          maxLength={6}
          pattern="[0-9]{6}"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="border border-black text-2xl py-2 mt-2 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={handleResendCode}
          disabled={isLoading}
          className="text-lg underline hover:no-underline disabled:opacity-50"
        >
          Didn't receive the code? Resend
        </button>
      </div>

      <div className="login-link mt-4 text-lg">
        Already verified?{' '}
        <Link to="/login" className="font-bold underline hover:no-underline">Log in</Link>
      </div>
    </div>
  );
};

export default EmailVerification;