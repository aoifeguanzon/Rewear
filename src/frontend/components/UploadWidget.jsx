import React from 'react';
import './UploadWidget.css';
import upload from '../assets/upload.png';
import { useState } from 'react';

function UploadImage() {
    return(
        <img src={upload} alt='Upload icon'/>
    )
}

function UploadButton() {
    return(
        <button className='big-dark-button'><h1>Upload image</h1></button>
    )
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

  const handleSearch = () => {
    alert(`Searching for: ${link}`);
    onSearch();
  };

  return (
    <div className='widget'>
      <div>
        <UploadImage />
        <UploadButton />
        <ProductLinkInput onChange={setLink} />
      </div>
      <div className='widget-bottom'>
        <PriceRangeSlider />
        <UploadSearchButton onClick={handleSearch} />
      </div>
    </div>
  );
}

export default UploadWidget;
