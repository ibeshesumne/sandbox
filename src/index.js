// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from "./App";
import CreateData from "./components/CreateData";
import ReadData from "./components/ReadData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeleteData";
import { DarkModeProvider } from "./DarkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateData />} />
          <Route path="/read" element={<ReadData />} />
          <Route path="/update" element={<UpdateData />} />
          <Route path="/delete" element={<DeleteData />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);