import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const NoteForm = ({ onSubmit, initialData = { title: '', content: '' } }) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        mb: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper'
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Create New Note
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Content (Optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
        Add Note
      </Button>
    </Box>
  );
};

export default NoteForm;