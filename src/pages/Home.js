// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Welcome to the Home Page</h1>
        <Link to="/search" className="inline-block bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition">
          Let's go to Records Search
        </Link>
      </div>
    </div>
  );
};

export default Home;