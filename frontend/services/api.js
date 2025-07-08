// src/services/api.js
import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/invalidity
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // Token expired or invalid, clear token and redirect to login
      localStorage.removeItem('token');
      // You might want to dispatch a global event or use react-router-dom's navigate
      window.location.href = '/signin'; // Simple redirect for demonstration
    }
    return Promise.reject(error);
  }
);

export default api;