// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress/index.js';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';
import SignInPage from '../pages/SignInPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import ProtectedRoute from '../pages/ProtectedRoute.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets CSS for Material UI */}
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            {/* Redirect root to signin or dashboard based on auth status */}
            <Route path="*" element={<HomeRedirect />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

const HomeRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />;
};


export default App;