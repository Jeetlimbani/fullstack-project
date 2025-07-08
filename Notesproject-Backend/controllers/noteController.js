import  * as noteService from '../services/noteService.js';

export const createNote = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT authentication
    const { title, content } = req.body;
    const note = await noteService.createNote(userId, title, content);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await noteService.getNotesByUserId(userId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve notes.', error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await noteService.deleteNote(id, userId);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Note not found.') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized to delete this note.') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to delete note.', error: error.message });
  }
};
