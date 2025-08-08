/**
@file Profile.tsx
@author Isaac Mulugeta, Aoife Guanzon
@brief This is the "My Wardrobes" sub-page component for the profile.
*/

import React, { useState } from 'react';
import { Upload, Search } from 'lucide-react';
import './Profile.css';

const MyWardrobes = () => {
  const [image, setImage] = useState<string | null>(null);
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>My Wardrobe</h2>
      </div>

      {/* Upload Box */}
      <div className="upload-box">
        <div className="image-preview">
          {image ? (
            <img src={image} alt="Uploaded" />
          ) : (
            <Upload style={{ width: '50%', height: '100%', color: 'white' }} />
          )}
        </div>

        <label className="upload-button" style={{ marginBottom: '1rem' }}>
          <h1>Upload Image</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>

        <div className="link-input">
          <label htmlFor="item-link"><h2>Item Link</h2></label>
          <input
            type="url"
            id="item-link"
            placeholder="Enter item link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="price-input">
          <label htmlFor="price"><h2>Price</h2></label>
          <input
            type="url"
            id="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
          />
        </div>
      </div>

      {/* Wardrobe Items */}
      <div style={{ marginTop: '2rem' }}>
        <div className="section-header">
          <h2>My Items</h2>
        </div>
        <div className="card-grid">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="card">
                <div className="card-image"></div>
                <div className="card-title">Item {i + 1}</div>
                <div className="card-subtitle">$XX.XX</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyWardrobes;
