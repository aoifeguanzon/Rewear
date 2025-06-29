/**
 * @file App.tsx
 * @author Huy Le (huyisme-005)
 * @brief this is the main program for the frontend.
 */

import React from 'react';//React plays a significant role in frontend development by providing a component-based approach to building user interfaces, enabling efficient rendering and reusability
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);

export default App; //make it visible