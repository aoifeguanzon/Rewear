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
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>My Wardrobes</h2>
      </div>

      {/* Upload Box */}
      <div className="upload-box">
        <div className="image-preview">
          {image ? (
            <img src={image} alt="Uploaded" />
          ) : (
            <Upload style={{ width: '2rem', height: '2rem', color: '#6b7280' }} />
          )}
        </div>

        <label className="upload-button" style={{ marginBottom: '1rem' }}>
          <Upload style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>

        <div className="link-input">
          <label htmlFor="item-link">Item Link</label>
          <input
            type="url"
            id="item-link"
            placeholder="Enter item link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="price-range">
          <label>Price Range</label>
          <div className="price-selects">
            <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
              <option value="">Min</option>
              <option value="10">$10</option>
              <option value="20">$20</option>
              <option value="50">$50</option>
            </select>
            <span>–</span>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
              <option value="">Max</option>
              <option value="100">$100</option>
              <option value="200">$200</option>
              <option value="500">$500</option>
            </select>
          </div>
        </div>

        <button className="search-button">
          <Search style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          Search
        </button>
      </div>

      {/* Wardrobe Items */}
      <div style={{ marginTop: '2rem' }}>
        <div className="section-header">
          <h2>My Items</h2>
        </div>
        <div className="card-grid">
          {Array(6)
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
