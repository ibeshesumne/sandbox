// src/App.js
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./contexts/DarkModeContext";
import { Helmet } from "react-helmet";
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
import Search from "./pages/Search";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound"; // Import NotFound
import BrowseByYear from "./pages/BrowseByYear";
import BrowseByCorrespondent from "./pages/BrowseByCorrespondent";
import BrowseByTopic from "./pages/BrowseByTopic";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";



function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Helmet for Meta Information */}
      <Helmet>
        <title>Henri Thomas Archive</title>
        <meta
          name="description"
          content="Explore the letters and works of Henri Thomas."
        />
      </Helmet>

      {/* Header is always rendered at the top */}
      <Header />

      {/* Main Content */}
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
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} /> {/* Use NotFound for undefined routes */}
          {/* Other routes */}
          <Route path="/browse/year" element={<BrowseByYear />} />
          <Route path="/browse/correspondent" element={<BrowseByCorrespondent />} />
          <Route path="/browse/topic" element={<BrowseByTopic />} />
          <Route path="/advanced-search" element={<AdvancedSearchPage />} />
        </Routes>
      </div>

      {/* Footer is always rendered at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
