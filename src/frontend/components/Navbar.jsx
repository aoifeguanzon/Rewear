/**
 * @file Navbar.tsx
 * @author Isaac Mulugeta, Aoife Guanzon
 * @brief This is the Navbar component for the ReWear application.
 * @details The Navbar component provides navigation links for the application.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'


function Navbar() {
  return (
    <nav className="navbar">
      <div className ="logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/social">Social</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
