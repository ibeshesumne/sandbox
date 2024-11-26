// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from "./App";
import CreateData from "./Components/CreateData";
import ReadData from "./Components/ReadData";
import UpdateData from "./Components/UpdateData";
import DeleteData from "./Components/DeleteData";
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