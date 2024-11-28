// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-red-600">404: Page Not Found</h1>
      <p className="text-lg mt-4">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block text-blue-500 hover:underline text-lg"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
