// src/config.js
const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || "17601687809-2vlt99heqtdqj68l6dc8qhk7ut6898e0.apps.googleusercontent.com", // Use your actual Google Client ID
};

export default config;