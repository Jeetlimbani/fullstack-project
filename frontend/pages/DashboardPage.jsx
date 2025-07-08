
import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Typography, Box, Button, CircularProgress, Alert, AppBar, Toolbar
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import noteService from '../services/noteService';
import authService from '../services/authService'; // <--- Make sure this import is present
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth(); // 'user' from context has basic info (id, email from token)
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading for notes
  const [error, setError] = useState('');
  const [fullUserInfo, setFullUserInfo] = useState(null); // This will hold the full user data from /auth/me
  const [userInfoLoading, setUserInfoLoading] = useState(true); // Loading for user info
  const navigate = useNavigate();

  const fetchUserInfo = useCallback(async () => {
    setUserInfoLoading(true);
    setError('');
    try {
      // Use authService.getUserInfo() here
      const response = await authService.getUserInfo();
      setFullUserInfo(response.data.user); // <--- Set the full user object here
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user info.');
   
    } finally {
      setUserInfoLoading(false);
    }
  }, []); // Depend on nothing as it's a fetch on mount

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await noteService.getNotes();
      setNotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes.');
      // The Axios interceptor (in api.js) should ideally handle 403/401 by redirecting to login.
    } finally {
      setLoading(false);
    }
  }, []); // Depend on nothing as it's a fetch on mount

  useEffect(() => {
    fetchUserInfo();
    fetchNotes();
  }, [fetchUserInfo, fetchNotes]); // Ensure both are called on mount

  const handleCreateNote = async ({ title, content }) => {
    setError('');
    try {
      await noteService.createNote(title, content);
      await fetchNotes(); // Refresh notes after creation
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    setError('');
    try {
      await noteService.deleteNote(noteId);
      await fetchNotes(); // Refresh notes after deletion
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  // Display loading indicator if either user info or notes are still loading
  if (userInfoLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes App
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome, {fullUserInfo?.name || fullUserInfo?.email || user?.email || 'User'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            User ID: {fullUserInfo?.id || user?.id || 'Not available'}
          </Typography>
        </Box>

        <NoteForm onSubmit={handleCreateNote} />

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Your Notes
        </Typography>

        {notes.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            You don't have any notes yet. Create one above!
          </Typography>
        ) : (
          <Box>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DashboardPage;