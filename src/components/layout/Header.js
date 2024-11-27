// src/components/layout/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-google-header text-google-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="text-google-white hover:text-google-blue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => navigate(1)} className="text-google-white hover:text-google-blue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <Link to="/" className="text-lg font-sans hover:underline">Home</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/about" className="text-lg font-sans hover:underline">About</Link>
          <Link to="/contact" className="text-lg font-sans hover:underline">Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;