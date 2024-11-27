import React, { useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import AdvancedSearch from "./components/features/AdvancedSearch";
import SearchHelp from "./pages/SearchHelp"; // Import the new SearchHelp component
import Privacy from "./pages/Privacy"; // Import the new SearchHelp component
import Terms from "./pages/Terms"; // Import the new SearchHelp component

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState({});
  const navigate = useNavigate();

  // Handle simple search from the header
  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate("/read"); // Redirect to the ReadData page to display results
  };

  // Handle advanced search from AdvancedSearch component
  const handleAdvancedSearch = (filters) => {
    setSearchFilters(filters);
    navigate("/read"); // Redirect to the ReadData page to display results
  };

  // Reset search and filters
  const resetSearch = () => {
    setSearchQuery(""); // Clear general search
    setSearchFilters({}); // Clear advanced filters
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Pass handleSearch to Header */}
      <Header onSearch={handleSearch} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create" element={<CreateData />} />
          {/* Pass searchQuery, searchFilters, and resetSearch to ReadData */}
          <Route
            path="/read"
            element={
              <ReadData
                searchQuery={searchQuery}
                searchFilters={searchFilters}
                resetSearch={resetSearch}
              />
            }
          />
          <Route path="/update" element={<UpdateData />} />
          <Route path="/delete" element={<DeleteData />} />
          <Route path="/search-help" element={<SearchHelp />} /> {/* Add the new route */}
          <Route path="/privacy" element={<Privacy />} /> {/* Add the new route */}
          <Route path="/terms" element={<Terms />} /> {/* Add the new route */}
          {/* Pass handleAdvancedSearch to AdvancedSearch */}
          <Route
            path="/advanced-search"
            element={<AdvancedSearch onSearch={handleAdvancedSearch} />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
