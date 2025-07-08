// src/services/noteService.js
import api from './api';

const createNote = (title, content) => {
  return api.post('/notes', { title, content });
};

const getNotes = () => {
  return api.get('/notes');
};

const deleteNote = (noteId) => {
  return api.delete(`/notes/${noteId}`);
};

const noteService = {
  createNote,
  getNotes,
  deleteNote,
};

export default noteService;