/**
 * This is where App.tsx is used.
 * @author Huy Le (huyisme-005)
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//createRoot lets you create a root to display React components inside a browser DOM node.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 