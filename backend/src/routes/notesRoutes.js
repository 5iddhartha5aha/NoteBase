import express from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, togglePinNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.put('/:id/pin', togglePinNote);   // ✅ NEW: toggle pin route
router.delete('/:id', deleteNote);

export default router;

//req -> request, res -> response
//this is a simple API endpoint that sends a "Hello, World!" message when accessed
// app.get('/api/notes', (req, res) => {
//   res.send('<h1>Hello, World!</h1>');
// });

// app.post('/api/notes', (req, res) => {
//   res.send('<h1>Note created successfully!</h1>');
// });

// app.put('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   res.send(`<h1>Note with ID ${noteId} updated successfully!</h1>`);
// });

// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   res.send(`<h1>Note with ID ${noteId} deleted successfully!</h1>`);
// });