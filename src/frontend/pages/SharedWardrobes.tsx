/**
@file Profile.tsx
@author Isaac Mulugeta, Aoife Guanzon
@brief This is the "Shared Wardrobes" sub-page component for the profile.
*/

import React from 'react';
import './Profile.css';

const SharedWardrobes = () => {
  const wardrobes = Array(6)
    .fill(null)
    .map((_, i) => ({
      id: i,
      username: `User ${i + 1}`,
      items: 8
    }));

  return (
    <div>
      <div className="section-header">
        <h2>Shared Wardrobes</h2>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2>Wardrobe Stats</h2>
        <p>Total Shared Wardrobes: {wardrobes.length}</p>
      </div>

      {/* Wardrobe List */}
      <div style={{ marginTop: '2rem' }} className="card-grid">
        {wardrobes.map((w) => (
          <div key={w.id} className="card">
            <div className="card-image">
              <div style={{ width: '2rem', height: '2rem', border: '0.125rem solid #d1d5db', transform: 'rotate(45deg)' }}></div>
            </div>
            <p className="card-title">{w.username}</p>
            <p className="card-subtitle">{w.items} items</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedWardrobes;
