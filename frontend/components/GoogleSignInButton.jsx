// src/components/GoogleSignInButton.js
import React, { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import config from '../config';

const GoogleSignInButton = ({ onGoogleSuccess, onGoogleFailure }) => {
  const googleButtonRef = useRef(null);

  useEffect(() => {
    // Load Google Platform Library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: config.GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (response.credential) {
            onGoogleSuccess(response.credential);
          } else {
            onGoogleFailure(new Error('Google login failed: No credential found.'));
          }
        },
      });

      // Render the Google button
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        { theme: 'outline', size: 'large', text: 'continue_with', width: '300px' } // Customize button
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onGoogleSuccess, onGoogleFailure]);

  return (
    <Button
      variant="outlined"
      sx={{
        mt: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 200, // Adjust as needed
        '& .gsi-material-button': {
          width: '100% !important', // Override default button width if necessary
        },
        height: '48px', // Match Material UI button height
      }}
    >
      <div ref={googleButtonRef} />
    </Button>
  );
};

export default GoogleSignInButton;