import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // laste in firste out (-1)
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getALLNotes", error);
    res.status(500).json({ message: "internal server error " });
  }
};
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found " });
    // res.status(200).json({ message: "note found successfully !" });
    res.status(200).json(note);
  } catch (error) {
    console.error("error in getNoteById controller", error);
    res.status(500).json({ message: "internal server error " });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    const note = new Note({ title, content });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("error in createNote controller", error);
    res.status(500).json({ message: "internal server error" });
  }
};


export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNote)
      return res.status(404).json({ message: "note not found " });
    res.status(200).json({ message: "note update successfully !" });
  } catch (error) {
    console.error("error in updateNote controller", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "note not found " });
    res.status(200).json({ message: "note deleted successfully !" });
  } catch (error) {
    console.error("error in deleteNote controller", error);
    res.status(500).json({ message: "internal server error" });
  }
};
