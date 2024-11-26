import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from "./App";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <Router>
        <App />
      </Router>
    </DarkModeProvider>
  </React.StrictMode>
);