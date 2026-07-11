import { PenSquareIcon, Trash2Icon, PinIcon, PinOffIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  // ✅ NEW: Toggle pin handler
  const handleTogglePin = async (e, id) => {
    e.preventDefault(); // prevent navigation from the Link

    try {
      const res = await api.put(`/notes/${id}/pin`);
      // Update the note in state with the returned updated note
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? res.data.note : n))
      );
      toast.success(res.data.note.isPinned ? "Note pinned!" : "Note unpinned!");
    } catch (error) {
      console.log("Error in handleTogglePin", error);
      toast.error("Failed to toggle pin");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className={`card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid ${note.isPinned ? "border-warning" : "border-[#00FF9D]"}`}
    >
      <div className="card-body">
        {/* ✅ NEW: Pin indicator */}
        <div className="flex justify-between items-start">
          <h3 className="card-title text-base-content">{note.title}</h3>
          {note.isPinned && (
            <span className="badge badge-warning badge-sm">Pinned</span>
          )}
        </div>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            {/* ✅ NEW: Pin/Unpin button */}
            <button
              className={`btn btn-ghost btn-xs ${note.isPinned ? "text-warning" : "text-base-content/60"}`}
              onClick={(e) => handleTogglePin(e, note._id)}
              title={note.isPinned ? "Unpin note" : "Pin note"}
            >
              {note.isPinned ? <PinOffIcon className="size-4" /> : <PinIcon className="size-4" />}
            </button>
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
