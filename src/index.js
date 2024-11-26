import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from "./App";
import CreateData from "./components/features/CreateData";
import ReadData from "./components/features/ReadData";
import UpdateData from "./components/features/UpdateData";
import DeleteData from "./components/features/DeleteData";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateData />} />
          <Route path="/read" element={<ReadData />} />
          <Route path="/update" element={<UpdateData />} />
          <Route path="/delete" element={<DeleteData />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  </React.StrictMode>
);
