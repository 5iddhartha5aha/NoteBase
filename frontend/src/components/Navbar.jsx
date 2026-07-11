import { Link } from "react-router";
import { PlusIcon, SunIcon, MoonIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  // Initialize theme from localStorage (so it persists on refresh)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "forest"
  );

  // Apply theme whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "forest" ? "lemonade" : "forest");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">NotesApp</h1>
          <div className="flex items-center gap-4">
            {/* ✅ NEW: Theme toggle button */}
            <button
              className="btn btn-ghost btn-circle"
              onClick={toggleTheme}
              title={theme === "forest" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "forest" ? (
                <SunIcon className="size-5" />
              ) : (
                <MoonIcon className="size-5" />
              )}
            </button>
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
