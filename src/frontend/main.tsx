/**
 * This is where App.tsx is used.
 * @author Huy Le (huyisme-005)
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { Analytics } from '@vercel/analytics/react'; // Added for Vercel Analytics

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics /> {/* Add this line to enable Vercel Analytics */}
  </React.StrictMode>
);