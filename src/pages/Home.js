import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Letters App</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Manage records in the Firebase Realtime Database.
        </p>
        {/* CRUD Buttons */}
        <div className="space-y-4">
          <Link to="/create">
            <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
              Create Record
            </button>
          </Link>
          <Link to="/read">
            <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition">
              View Records
            </button>
          </Link>
          <Link to="/update">
            <button className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition">
              Update Record
            </button>
          </Link>
          <Link to="/delete">
            <button className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
              Delete Record
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
