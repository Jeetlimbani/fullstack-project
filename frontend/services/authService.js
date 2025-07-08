// src/services/authService.js
import api from './api';

const signupEmailOTP = (email, password) => {
  return api.post('/auth/signup/email-otp', { email, password });
};

const verifyOTP = (email, otp) => {
  return api.post('/auth/verify/otp', { email, otp });
};

const loginEmail = (email, password) => {
  return api.post('/auth/login/email', { email, password });
};

const loginGoogle = (googleToken) => {
  return api.post('/auth/login/google', { token: googleToken });
};

const getUserInfo = () => {
  return api.get('/auth/me');
};

const authService = {
  signupEmailOTP,
  verifyOTP,
  loginEmail,
  loginGoogle,
  getUserInfo,
};

export default authService;