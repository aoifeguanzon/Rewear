import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-6xl font-light mb-4">Sign up</h1>
      <div className="text-center text-lg mb-8">
        <div>Where style meets sustainability.</div>
        <div>Join the movement.</div>
      </div>
      <form className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border border-black px-3 py-2 text-lg rounded-none focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-black px-3 py-2 text-lg rounded-none focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-black px-3 py-2 text-lg rounded-none focus:outline-none"
        />
        <button
          type="submit"
          className="border border-black text-2xl py-2 mt-2 bg-white hover:bg-gray-100 transition-colors"
        >
          Create account
        </button>
      </form>
      <div className="mt-4 text-lg">
        Already with us?{' '}
        <a href="#" className="font-bold underline hover:no-underline">Log in</a>
      </div>
    </div>
  );
};

export default SignUp; 