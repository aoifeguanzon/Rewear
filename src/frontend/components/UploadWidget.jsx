import React from 'react';
import './UploadWidget.css';
import upload from '../assets/upload.png';
import { useState } from 'react';

function UploadImage() {
    return(
        <img src={upload} alt='Upload icon'/>
    )
}

// Added: UploadButton now triggers file input for image upload
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

/**
 * UploadWidget component
 * Now supports image upload and product link input for search.
 */
function UploadWidget({ onSearch }) {
  // State for product link
  const [link, setLink] = useState('');
  // Added: State for selected image file
  const [image, setImage] = useState(null);

  // Added: Handle image selection from file input
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Added: Handle search, including image upload if image is selected
  const handleSearch = async () => {
    // Example: send image and link to backend
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('link', link);
      // Replace URL with your backend endpoint
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        // Handle response (show results, etc.)
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
        <UploadImage />
        {/* Added: Pass image select handler to UploadButton */}
        <UploadButton onImageSelect={handleImageSelect} />
        <ProductLinkInput onChange={setLink} />
        {/* Added: Show selected image name for user feedback */}
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
