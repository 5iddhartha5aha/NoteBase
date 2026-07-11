import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
  try {
    // Simulate fetching notes from a database
    const notes = await Note.find({}); // This will fetch all notes from the MongoDB collection
    res.status(200).json(notes);

  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes", error });
  }
}

export async function getNoteById(req, res) {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Error fetching note", error });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Error creating note", error });
  }
}

export async function updateNote(req, res) {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Error updating note", error });
  }
}

export async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully", note });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note", error });
  }
}

//added new controller for pinning a note
export async function togglePinNote(req, res) {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isPinned = !note.isPinned;  // flip the pin status
    await note.save();

    res.status(200).json({ message: `Note ${note.isPinned ? "pinned" : "unpinned"} successfully`, note });
  } catch (error) {
    console.error("Error toggling pin:", error);
    res.status(500).json({ message: "Error toggling pin", error });
  }
}
