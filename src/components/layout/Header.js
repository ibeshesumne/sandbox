import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from '../ui/DarkModeToggle';  // Updated import path

const Header = () => {
  return (
    <header className="bg-blue-500 dark:bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Letters</h1>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
          <DarkModeToggle />  {/* Add the DarkModeToggle here */}
        </nav>
      </div>
    </header>
  );
};

export default Header;