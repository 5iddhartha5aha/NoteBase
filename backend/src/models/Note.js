import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        isPinned: {                // ✅ NEW
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    } //createdAt and updatedAt fields will be automatically added by Mongoose
);

const Note = mongoose.model("Note", noteSchema);

export default Note;