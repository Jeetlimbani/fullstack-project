
import React, { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import AuthForm from '../components/AuthForm';
import OTPInput from '../components/OTPInput';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await authService.signupEmailOTP(email, password);
      setMessage(response.data.message);
      setStep(2); // Move to OTP verification step
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await authService.verifyOTP(email, otp);
      login(response.data.token, response.data.user);
      setMessage(response.data.message);
      navigate('/dashboard'); // Redirect to dashboard after successful verification
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}

      {step === 1 ? (
        <AuthForm
          title="Sign Up"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignupSubmit}
          buttonText="Sign Up"
        />
      ) : (
        <OTPInput
          email={email}
          setEmail={setEmail}
          otp={otp}
          setOtp={setOtp}
          onSubmit={handleOtpVerify}
          error={error}
          message={message}
        />
      )}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Already have an account? <Link to="/signin">Sign In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUpPage;