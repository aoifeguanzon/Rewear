/**
 * @file App.tsx
 * @author Huy Le
 * @brief This is the main program for the frontend.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/SplashScreen/navbar';
import SplashScreen from './components/SplashScreen/SplashScreen';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MyWardrobes from './pages/MyWardrobes';
import SharedWardrobes from './pages/SharedWardrobes';
/*import Home from './pages/Home';
import Social from './pages/Social';
import Settings from './pages/Settings';*/

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Profile routes with nested routing */}
        <Route path="/profile" element={<Profile />}>
          <Route path="my-wardrobes" element={<MyWardrobes />} />
          <Route path="shared-wardrobes" element={<SharedWardrobes />} />
        </Route>
        
        {/* Uncomment these when you're ready to use them */}
        {/*<Route path="/home" element={<Home />} />
        <Route path="/social" element={<Social />} />
        <Route path="/settings" element={<Settings />} />*/}
      </Routes>
    </Router>
  );
};

export default App;