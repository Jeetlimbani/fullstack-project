import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteCard = ({ note, onDelete }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {note.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          {note.content}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="delete" onClick={() => onDelete(note.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteCard;