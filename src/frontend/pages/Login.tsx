import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="centered-page px-4">
      <h1 className="text-6xl font-light mb-4">Welcome!</h1>
      <div className="subtitle text-lg mb-8">Your next look awaits you.</div>
      <form className="centered-form" style={{marginTop: 0}}>
        <input
          type="text"
          placeholder="Username / email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border border-black px-3 py-2 text-lg rounded-none focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-black px-3 py-2 text-lg rounded-none focus:outline-none"
        />
        <div className="text-right text-sm mb-2">
          <a href="#" className="underline text-black hover:no-underline">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="border border-black text-2xl py-2 mt-2 bg-white hover:bg-gray-100 transition-colors"
        >
          Log in
        </button>
      </form>
      <div className="login-link mt-4 text-lg">
        Don't have an account?{' '}
        <Link to="/signup" className="font-bold underline hover:no-underline">Sign up</Link>
      </div>
    </div>
  );
};

export default Login; 