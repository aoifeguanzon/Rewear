/**
 * @file Social.tsx
 * @brief The social page.
 * @author Huy Le (huyisme-005)
 */
import React from 'react';
import logo from '../assets/logo.png';
import '../pages/Social.css';

const Social: React.FC = () => {
  return (
    <div className="social-root">
      {/* Top Navigation Bar */}
      <div className="social-navbar">
        <div className="social-logo-container">
          <img src={logo} alt="Logo" className="social-logo" />
        </div>
        <div className="social-nav-links">
          <a href="#">Home</a>
          <a href="#">Profile</a>
          <a href="#" className="active">Social</a>
          <a href="#">Settings</a>
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
