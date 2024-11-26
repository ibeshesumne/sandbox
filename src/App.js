import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "./DarkModeContext";

function App() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zenGray dark:bg-zenDark">
      <div className="max-w-xl p-8 bg-zenLight dark:bg-zenDark rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-zenDark dark:text-zenDarkText mb-6">Letters App</h1>
        <p className="text-zenDark dark:text-zenDarkText mb-8">
          Manage records in the Firebase Realtime Database.
        </p>
        <div className="space-y-4">
          <Link to="/create">
            <button className="w-full bg-zenBlue text-zenLight py-3 rounded-md hover:bg-zenAccent transition">
              Create Record
            </button>
          </Link>
          <Link to="/read">
            <button className="w-full bg-green-500 text-zenLight py-3 rounded-md hover:bg-green-600 transition">
              View Records
            </button>
          </Link>
          <Link to="/update">
            <button className="w-full bg-yellow-500 text-zenLight py-3 rounded-md hover:bg-yellow-600 transition">
              Update Record
            </button>
          </Link>
          <Link to="/delete">
            <button className="w-full bg-red-500 text-zenLight py-3 rounded-md hover:bg-red-600 transition">
              Delete Record
            </button>
          </Link>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-8 px-4 py-2 bg-zenAccent text-zenLight rounded-md hover:bg-zenBlue transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;