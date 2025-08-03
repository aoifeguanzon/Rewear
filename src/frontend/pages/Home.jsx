import React from 'react';
import Navbar from '../components/Navbar';
import UploadWidget from '../components/UploadWidget';
import Results from '../components/Results';
import { useState } from 'react';

function Home() {
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <UploadWidget onSearch={() => setShowResults(true)} />
        <Results show={showResults} />
      </div>
    </>
  )
};

export default Home;
