// src/components/DarkModeToggle.js
import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;