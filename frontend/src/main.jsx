// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can keep a basic CSS file or remove it if not needed
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

