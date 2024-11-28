// src/components/layout/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false);

  const toggleBrowseDropdown = () => {
    setBrowseDropdownOpen(!browseDropdownOpen);
  };

  const closeBrowseDropdown = () => {
    setBrowseDropdownOpen(false); // Close the dropdown
  };

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => navigate(1)} className="text-gray-600 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <Link to="/" className="text-lg font-sans text-gray-600 hover:text-blue-500">
            Home
          </Link>
        </div>

        {/* Dropdown for Browse Works */}
        <div className="relative">
          <button
            onClick={toggleBrowseDropdown}
            className="text-lg font-sans text-gray-600 hover:text-blue-500 flex items-center"
          >
            Browse Works
            <svg
              className="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {browseDropdownOpen && (
            <ul className="absolute bg-white text-gray-600 mt-2 rounded shadow-lg w-40">
              <li className="hover:bg-gray-100">
                <Link
                  to="/browse/year"
                  className="block px-4 py-2"
                  onClick={closeBrowseDropdown}
                >
                  By Year
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link
                  to="/browse/correspondent"
                  className="block px-4 py-2"
                  onClick={closeBrowseDropdown}
                >
                  By Correspondent
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link
                  to="/browse/topic"
                  className="block px-4 py-2"
                  onClick={closeBrowseDropdown}
                >
                  By Topic
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Other Links */}
        <div className="flex items-center space-x-4">
          <Link to="/about" className="text-lg font-sans text-gray-600 hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="text-lg font-sans text-gray-600 hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;