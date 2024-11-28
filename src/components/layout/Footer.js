// src/components/layout/Footer.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../ui/DarkModeToggle";
import CreateDataModal from "../features/CreateDataModal";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="bg-google-footer dark:bg-google-footer-dark text-google-dark-text dark:text-google-light-text p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 Ibeshe production</p>
        <div className="flex items-center space-x-4">
          <Link
            to="/privacy"
            className="text-google-dark-text dark:text-google-light-text hover:text-google-blue"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-google-dark-text dark:text-google-light-text hover:text-google-blue"
          >
            Terms of Service
          </Link>
          <div className="relative group">
            <button className="text-google-dark-text dark:text-google-light-text hover:text-google-blue">
              Settings
            </button>
            <div className="absolute right-0 top-0 transform -translate-y-full mt-2 w-48 bg-google-white dark:bg-google-footer-dark text-google-dark-text dark:text-google-light-text rounded-md shadow-lg hidden group-hover:block">
              <div className="py-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="block w-full text-left px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray"
                >
                  Add Record
                </button>
                <Link
                  to="/admin"
                  className="block px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray"
                >
                  Admin
                </Link>
                <Link
                  to="/advanced-search"
                  className="block px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray"
                >
                  Advanced Search
                </Link>
                <Link
                  to="/heatmap" // New Heatmap link
                  className="block px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray"
                >
                  Heat Map
                </Link>
                <Link
                  to="/search-help"
                  className="block px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray"
                >
                  Search Help
                </Link>
                <Link
                  to="/statistics" // New Statistics link
                  className="block px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray"
                >
                  Statistics
                </Link>
                <div className="px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray">
                  <DarkModeToggle label="Mode toggle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <CreateDataModal onClose={() => setShowModal(false)} />}
    </footer>
  );
};

export default Footer;