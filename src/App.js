// src/App.js
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./contexts/DarkModeContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreateData from "./components/features/CreateData";
import ReadData from "./components/features/ReadData";
import UpdateData from "./components/features/UpdateData";
import DeleteData from "./components/features/DeleteData";
import SearchHelp from "./pages/SearchHelp";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AdminPanel from "./components/admin/AdminPanel";
import Search from "./pages/Search"; // Import the Search page
import Results from "./pages/Results";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header /> {/* Header is always rendered at the top */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create" element={<CreateData />} />
          <Route path="/read" element={<ReadData />} />
          <Route path="/update" element={<UpdateData />} />
          <Route path="/delete" element={<DeleteData />} />
          <Route path="/search-help" element={<SearchHelp />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/search" element={<Search />} /> {/* Add the Search route */}
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer /> {/* Footer is always rendered at the bottom */}
    </div>
  );
}

export default App;