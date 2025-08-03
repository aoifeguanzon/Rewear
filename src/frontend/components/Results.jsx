import React from 'react';
import './Results.css';
import SearchIcon from '../assets/search-icon.png';

function Results({ show }) {
  return (
    <div className="results-container">
      {show ? (
        <div className="results-view">
          <h1>Here are your search results!</h1>
        </div>
      ) : (
        <img
          className="results-placeholder"
          src={SearchIcon}
          alt="Search icon"
        />
      )}
    </div>
  );
}

export default Results;
