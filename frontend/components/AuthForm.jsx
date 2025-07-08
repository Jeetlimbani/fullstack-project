import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AuthForm = ({ email, setEmail, password, setPassword, onSubmit, buttonText, title }) => {
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
        {title}
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default AuthForm;