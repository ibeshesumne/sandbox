import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from '../ui/DarkModeToggle';  // Updated import path

const Footer = () => {
  return (
    <footer className="bg-google-footer dark:bg-google-footer-dark text-google-dark-text dark:text-google-light-text p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 Leary family production</p>
        <div className="flex items-center space-x-4">
          <Link to="/privacy" className="text-google-dark-text dark:text-google-light-text hover:text-google-blue">Privacy Policy</Link>
          <Link to="/terms" className="text-google-dark-text dark:text-google-light-text hover:text-google-blue">Terms of Service</Link>
          <div className="relative group">
            <button className="text-google-dark-text dark:text-google-light-text hover:text-google-blue">Settings</button>
            <div className="absolute right-0 top-0 transform -translate-y-full mt-2 w-48 bg-google-white dark:bg-google-footer-dark text-google-dark-text dark:text-google-light-text rounded-md shadow-lg hidden group-hover:block">
              <div className="py-2">
                <Link to="/search-help" className="block px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray">Search Help</Link>
                <div className="px-4 py-2 hover:bg-google-light-gray dark:hover:bg-google-dark-gray">
                  <DarkModeToggle label="Dark Mode" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;