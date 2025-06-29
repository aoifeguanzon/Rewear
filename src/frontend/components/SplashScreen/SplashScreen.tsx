import React, { useState, useRef, useEffect } from 'react';

const SplashScreen: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [showPurpose, setShowPurpose] = useState(false);
  const purposeRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setShowPurpose(entry.intersectionRatio > 0.7),
      { threshold: [0, 0.3, 0.5, 0.7, 1] }
    );
    if (purposeRef.current) {
      observer.observe(purposeRef.current);
    }
    return () => {
      if (purposeRef.current) observer.unobserve(purposeRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to your backend or a service
  };

  return (
    <div className="w-full bg-white">
      {/* Logo Section: Full screen height, centered */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
        {!imgError ? (
          <img
            src="assets/logo.jpg"
            alt="Logo"
            style={{ width: '1400px', height: '200px', borderRadius: '0.05rem', objectFit: 'contain' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{ width: '1400px', height: '200px' }} className="flex items-center justify-center bg-gray-100 rounded text-gray-100 text-xl">
            Logo not found
          </div>
        )}
      </div>
      {/* Purpose & Vision Section: Fades in and slides up when scrolled deep enough */}
      <div
        ref={purposeRef}
        className={`flex flex-col items-center max-w-2xl mx-auto text-center py-20 transition-all duration-700
          ${showPurpose ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
        style={{ willChange: 'opacity, transform' }}
      >
        <h2 className="text-2xl font-bold text-green-800 mb-2">Purpose &amp; Vision</h2>
        <p className="text-lg text-gray-700 mb-10">
          Help users shop sustainably by finding affordable second-hand fashion, connecting them with local clothing swaps, and building communities where they can share wardrobes and track their fashion impact.
        </p>
        {/* Join Our Waitlist Section */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mt-10 border border-green-100">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Join Our Waitlist</h3>
          {submitted ? (
            <div className="text-green-700 font-medium text-center">Thank you for joining the waitlist!</div>
          ) : (
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;