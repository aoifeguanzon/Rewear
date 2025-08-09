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
      <div className="social-main">
        {/* Friends Column */}
        <div className="social-column social-friends">
          <div className="social-section-header">
            <span>Your friends</span>
            <input type="text" placeholder="Search for a friend" className="social-search" />
          </div>
          <div className="social-friend-list">
            {[1,2,3,4].map((_, i) => (
              <div className="social-friend-item" key={i}>
                <div className="social-avatar" />
                <span>Username</span>
              </div>
            ))}
          </div>
        </div>
        {/* Chats Column */}
        <div className="social-column social-chats">
          <div className="social-section-header">
            <span>Chats</span>
            <input type="text" placeholder="Find conversation" className="social-search" />
          </div>
          <div className="social-chat-list">
            <div className="social-chat-item">
              <div className="social-avatar" />
              <div>
                <span>Username</span><br />
                <span className="social-chat-label bold">Received message</span>
              </div>
            </div>
            <div className="social-chat-item">
              <div className="social-avatar" />
              <div>
                <span>Username</span><br />
                <span className="social-chat-label">Sent message</span>
              </div>
            </div>
            <div className="social-chat-item">
              <div className="social-avatar" />
              <div>
                <span>Username</span><br />
                <span className="social-chat-label">Sent message</span>
              </div>
            </div>
            <div className="social-chat-item">
              <div className="social-avatar" />
              <div>
                <span>Username</span><br />
                <span className="social-chat-label bold">Received message</span>
              </div>
            </div>
            <div className="social-chat-item">
              <div className="social-avatar" />
              <div>
                <span>Username</span><br />
                <span className="social-chat-label">Unopened message</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
