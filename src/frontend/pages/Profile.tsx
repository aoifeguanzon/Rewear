/**
@file Profile.tsx
@author Isaac Mulugeta, Aoife Guanzon
@brief This is the profile page for the user.
*/

import React from 'react';
import { ChevronRight, ChevronLeft, Lock } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Profile.css';

const ProfilePage = () => {
  const location = useLocation();
  const isMainProfile = location.pathname === '/profile' || location.pathname === '/profile/';

  const friends = Array(5).fill(null).map((_, i) => ({
    id: i,
    username: 'Username'
  }));

  const sharedWardrobes = Array(3).fill(null).map((_, i) => ({
    id: i,
    username: 'Username',
    items: 8
  }));

  const savedWardrobes = Array(3).fill(null).map((_, i) => ({
    id: i,
    username: 'Username',
    items: 8
  }));

  const WardrobeCard = ({ username, items, isPrivate = false }) => (
    <div className="card">
      <div className="card-image">
        <div style={{ width: '2rem', height: '2rem', border: '0.125rem solid #d1d5db', transform: 'rotate(45deg)' }}></div>
      </div>
      <div className="card-title">{username}</div>
      <div className="card-subtitle">{items} items</div>
      {isPrivate && <Lock style={{ width: '0.75rem', height: '0.75rem', marginTop: '0.25rem', color: '#9ca3af' }} />}
    </div>
  );

  const FriendAvatar = ({ username }) => (
    <div style={{ textAlign: 'center' }}>
      <div className="profile-avatar"></div>
      <span style={{ fontSize: '0.75rem', color: '#4b5563' }}>{username}</span>
    </div>
  );

  const getPageTitle = () => {
    if (location.pathname.includes('/shared-wardrobes')) return 'Shared Wardrobes';
    if (location.pathname.includes('/my-wardrobes')) return 'My Wardrobes';
    return null;
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-grid">
          <div className="profile-sidebar">
            <div className="profile-card" style={{ textAlign: 'center' }}>
              <div className="profile-avatar">Profile Pic</div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Username</h2>
              <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                This is my bio. I've written some words here. Not a lot though.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', textDecoration: 'underline' }}>
                My Wardrobe
              </h3>
              <div className="profile-card">
                <div className="card-image">
                  <div style={{ width: '4rem', height: '4rem', border: '0.25rem solid #d1d5db', transform: 'rotate(45deg)' }}></div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '500' }}>25 items</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {!isMainProfile && (
              <div className="section-header">
                <Link to="/profile" style={{ color: '#16a34a', fontSize: '0.875rem', fontWeight: '500' }}>
                  <ChevronLeft style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                  Back to Profile
                </Link>
                <h1>{getPageTitle()}</h1>
              </div>
            )}

            {isMainProfile ? (
              <>
                <div>
                  <div className="section-header">
                    <h2>Friends (20)</h2>
                    <button style={{ color: '#16a34a', fontSize: '0.875rem', fontWeight: '500' }}>
                      See all <ChevronRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {friends.map((friend, i) => (
                      <FriendAvatar key={i} username={friend.username} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="section-header">
                    <h2>Shared Wardrobes</h2>
                    <Link to="/profile/shared-wardrobes" style={{ color: '#16a34a', fontSize: '0.875rem', fontWeight: '500' }}>
                      See all <ChevronRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
                    </Link>
                  </div>
                  <div className="card-grid">
                    {sharedWardrobes.map((w, i) => (
                      <WardrobeCard key={i} {...w} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="section-header">
                    <h2>Saved Wardrobes</h2>
                    <Link to="/profile/my-wardrobes" style={{ color: '#16a34a', fontSize: '0.875rem', fontWeight: '500' }}>
                      See all <ChevronRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
                    </Link>
                  </div>
                  <div className="card-grid">
                    {savedWardrobes.map((w, i) => (
                      <WardrobeCard key={i} {...w} isPrivate />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
