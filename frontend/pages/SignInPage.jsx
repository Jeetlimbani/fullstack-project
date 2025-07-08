
import React, { useState } from 'react';
import { Container, Typography, Box, Alert, Divider } from '@mui/material';
import AuthForm from '../components/AuthForm';
import GoogleSignInButton from '../components/GoogleSignInButton';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.loginEmail(email, password);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Invalid credentials.');
    }
  };

  const handleGoogleSuccess = async (googleToken) => {
    setError('');
    try {
      const response = await authService.loginGoogle(googleToken);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed.');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login error:', error);
    setError('Failed to sign in with Google. Please try again.');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <AuthForm
        title="Sign In"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleEmailLogin}
        buttonText="Sign In with Email"
      />

      <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography sx={{ mx: 2 }} color="text.secondary">OR</Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleSignInButton
          onGoogleSuccess={handleGoogleSuccess}
          onGoogleFailure={handleGoogleFailure}
        />
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignInPage;