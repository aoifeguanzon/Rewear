/**
 * @file Social.tsx
 * @brief The social page.
 * @author Huy Le (huyisme-005)
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../pages/Social.css';

const Social: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="social-root">
      {/* Top Navigation Bar */}
      <div className="social-navbar">
        <div className="social-logo-container" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
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
      <div className="social-main-outer">
        <div className="social-main-inner">
          {/* Friends Column */}
          <div className="social-column social-friends">
            <div className="social-section-header">
              <span className="social-section-title">Your friends</span>
              <input type="text" placeholder="Search for a friend" className="social-search" />
            </div>
            <div className="social-friend-list">
              {[1,2,3,4].map((_, i) => (
                <div className="social-friend-item" key={i}>
                  <div className="social-avatar" />
                  <span className="social-username">Username</span>
                </div>
              ))}
            </div>
          </div>
          {/* Vertical Divider */}
          <div className="social-divider" />
          {/* Chats Column */}
          <div className="social-column social-chats">
            <div className="social-section-header">
              <span className="social-section-title">Chats</span>
              <input type="text" placeholder="Find conversation" className="social-search" />
            </div>
            <div className="social-chat-list">
              <div className="social-chat-item">
                <div className="social-avatar" />
                <div>
                  <span className="social-username">Username</span><br />
                  <span className="social-chat-label bold">Received message</span>
                </div>
              </div>
              <div className="social-chat-item">
                <div className="social-avatar" />
                <div>
                  <span className="social-username">Username</span><br />
                  <span className="social-chat-label">Sent message</span>
                </div>
              </div>
              <div className="social-chat-item">
                <div className="social-avatar" />
                <div>
                  <span className="social-username">Username</span><br />
                  <span className="social-chat-label">Sent message</span>
                </div>
              </div>
              <div className="social-chat-item">
                <div className="social-avatar" />
                <div>
                  <span className="social-username">Username</span><br />
                  <span className="social-chat-label bold">Received message</span>
                </div>
              </div>
              <div className="social-chat-item">
                <div className="social-avatar" />
                <div>
                  <span className="social-username">Username</span><br />
                  <span className="social-chat-label">Unopened message</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
