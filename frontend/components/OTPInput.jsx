
import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const OTPInput = ({ email, setEmail, otp, setOtp, onSubmit, error, message }) => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper'
      }}
      onSubmit={onSubmit}
    >
      <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
        Verify OTP
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        An OTP has been sent to your email.
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        variant="outlined"
        disabled // Email should typically not be editable during OTP verification
      />
      <TextField
        label="OTP"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        required
        inputProps={{ maxLength: 6 }}
        variant="outlined"
      />
      {error && <Typography color="error">{error}</Typography>}
      {message && !error && <Typography color="success.main">{message}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Verify
      </Button>
    </Box>
  );
};

export default OTPInput;