import React, { useState } from 'react';
import './UploadWidget.css';
import upload from '../assets/upload.png';

// Show uploaded image if available, otherwise show default icon
function UploadImage({ previewUrl }) {
  return (
    <div className="upload-image-wrapper">
      <img
        src={previewUrl || upload}
        alt='Upload preview'
        className='upload-preview'
      />
    </div>
  );
}


function UploadButton({ onImageSelect }) {
  return (
    <label className='big-dark-button' style={{ cursor: 'pointer' }}>
      <h1>Upload image</h1>
      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={onImageSelect}
      />
    </label>
  );
}

function ProductLinkInput({ onChange }) {
  return (
    <div>
      <h3 className='product-link-label'>Or paste a product link:</h3>
      <input
        type='text'
        className='product-link-input'
        placeholder='Enter product link...'
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function PriceRangeSlider() {
  const [price, setPrice] = useState(25);

  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="price-range-container">
      <label htmlFor="priceRange" className="price-range-label">
        <h3>Maximum price: ${price}</h3>
      </label>
      <input
        id="priceRange"
        type="range"
        min="0"
        max="50"
        value={price}
        onChange={handleChange}
        className="price-range-input"
      />
    </div>
  );
}

function UploadSearchButton({ onClick }) {
  return (
    <button className='big-dark-button submit' onClick={onClick}>
      <h1>Search for item</h1>
    </button>
  );
}

function UploadWidget({ onSearch }) {
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Create preview URL
    }
  };

  const handleSearch = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('link', link);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        alert('Image uploaded and search started!');
      } catch (err) {
        alert('Upload failed.');
      }
    } else {
      alert(`Searching for: ${link}`);
    }
    if (onSearch) onSearch();
  };

  return (
    <div className='widget'>
      <div>
        <UploadImage previewUrl={previewUrl} />
        <UploadButton onImageSelect={handleImageSelect} />
        <ProductLinkInput onChange={setLink} />
        {image && <div className='selected-image'>Selected: {image.name}</div>}
      </div>
      <div className='widget-bottom'>
        <PriceRangeSlider />
        <UploadSearchButton onClick={handleSearch} />
      </div>
    </div>
  );
}

export default UploadWidget;
