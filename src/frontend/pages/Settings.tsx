
/**
 * This is the settings page.
 * @file Settings.tsx
 * @author Huy Le (huyisme-005)
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../pages/Social.css';


const Settings: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="social-root">
      {/* Top Navigation Bar */}
      <div className="social-navbar">
        <div className="social-logo-container" onClick={() => navigate('/home')}>
          <img src={logo} alt="Logo" className="social-logo" />
        </div>
        <div className="social-nav-links">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
          <NavLink to="/Social" className={({ isActive }) => isActive ? 'active' : ''}>Social</NavLink>
          <NavLink to="/Settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
        </div>
      </div>
      {/* Main Content */}
      <div className="settings-main-outer">
        <div className="settings-main-inner">
          {/* Notifications */}
          <div className="settings-col">
            <div className="settings-avatar" />
            <h3>Notifications</h3>
            <div className="settings-section">
              <label><input type="checkbox" /> Enable notifications</label>
              <div className="settings-margin-top-bottom">Receive alerts:</div>
              <label><input type="checkbox" /> In app</label>
              <label><input type="checkbox" /> Email</label>
            </div>
          </div>
          {/* Manage Account */}
          <div className="settings-col">
            <div className="settings-avatar" />
            <h3>Manage my account</h3>
            <div className="settings-section">
              <input type="text" placeholder="Username" className="settings-input" />
              <input type="email" placeholder="Email" className="settings-input" />
              <input type="password" placeholder="Password" className="settings-input" />
              <input type="date" placeholder="Date of birth" className="settings-input" />
              <select className="settings-input" title="Location">
                <option value="">Location</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="other">Other</option>
              </select>
              <button className="settings-delete-btn">Delete account</button>
            </div>
          </div>
          {/* Preferences */}
          <div className="settings-col">
            <div className="settings-avatar" />
            <h3>My preferences</h3>
            <div className="settings-section">
              <div>Search results</div>
              <label><input type="checkbox" /> Ebay</label>
              <label><input type="checkbox" /> Etsy</label>
              <div className="settings-margin-top">Wardrobes</div>
              <label><input type="checkbox" /> Borrow</label>
              <label><input type="checkbox" /> Swap</label>
              <label><input type="checkbox" /> Rent</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
