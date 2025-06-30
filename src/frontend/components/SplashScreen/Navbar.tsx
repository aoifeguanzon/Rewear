/**
 * @file Navbar.tsx
 * @author Isaac Mulugeta
 * @brief This is the Navbar component for the ReWear application.
 * @details The Navbar component provides navigation links for the application.
 */
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-black px-6 py-4 flex justify-between items-center">
      {/* Add the Logo */}
      <div className="text-black font-bold text-xl">
        LOGO
      </div>
      <ul className="flex space-x-6 text-black font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/social">Social</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
