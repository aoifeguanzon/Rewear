import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-black px-6 py-4 flex justify-between items-center">
      {/* Add the Logo */}
      <div className="text-black font-bold text-xl">
        LOGO
      </div>
      <ul className="flex space-x-6 text-black font-medium">
        <li><a href="/">Home</a></li>
        <li><a href="/Profile">Profile</a></li>
        <li><a href="/Social">Social</a></li>
        <li><a href="/Settings">Settings</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
