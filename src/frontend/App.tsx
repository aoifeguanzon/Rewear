/**
 * @file App.tsx
 * @author Huy Le (huyisme-005)
 * @brief this is the main program for the frontend.
 */

import React from 'react';//React plays a significant role in frontend development by providing a component-based approach to building user interfaces, enabling efficient rendering and reusability
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification'

import Profile from './pages/Profile';
import MyWardrobes from './pages/MyWardrobes';
import SharedWardrobes from './pages/SharedWardrobes';
import Social from './pages/Social';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verification" element={<EmailVerification/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />}>
          <Route path="my-wardrobes" element={<MyWardrobes />} />
          <Route path="shared-wardrobes" element={<SharedWardrobes />} />
        </Route>
      <Route path="/Social" element={<Social />} />
    </Routes>
  </Router>
);

export default App; //make it visible