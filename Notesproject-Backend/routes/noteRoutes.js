import express from 'express';
import  * as noteController from '../controllers/noteController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import { validateNote } from '../middlewares/validationMiddleware.js';

const router = express.Router();


router.use(authenticateToken);

router.post('/', validateNote, noteController.createNote);
router.get('/', noteController.getUserNotes);
router.delete('/:id', noteController.deleteNote); 

export default router;
