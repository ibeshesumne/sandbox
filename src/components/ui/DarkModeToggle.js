// src/components/ui/DarkModeToggle.js
import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // Dynamically change the label based on the current mode
  const toggleLabel = darkMode ? 'Dark Mode: On' : 'Dark Mode: Off';

  return (
    <button
      onClick={toggleDarkMode}
      className="text-google-dark-text dark:text-google-light-text hover:text-google-blue w-full text-left"
    >
      {toggleLabel}
    </button>
  );
};

export default DarkModeToggle;
