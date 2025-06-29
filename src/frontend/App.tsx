/**
 * @file App.tsx
 * @author Huy Le (huyisme-005)
 * @brief this is the main program for the frontend.
 */

import React from 'react';//React plays a significant role in frontend development by providing a component-based approach to building user interfaces, enabling efficient rendering and reusability
import Splash from './pages/Splash';//import the splash screen

const App: React.FC = () => <Splash />;

export default App; //make it visible