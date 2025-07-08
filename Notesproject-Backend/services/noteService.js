import prisma from '../models/prisma.js';

export const createNote = async (userId, title, content) => {
  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId,
    },
  });
  return note;
};

export const getNotesByUserId = async (userId) => {
  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return notes;
};

export const deleteNote = async (noteId, userId) => {
  const note = await prisma.note.findUnique({
    where: { id: noteId },
  });

  if (!note) {
    throw new Error('Note not found.');
  }

  if (note.userId !== userId) {
    throw new Error('Unauthorized to delete this note.');
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  return { message: 'Note deleted successfully.' };
};
