// src/App.js
import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkModeContext } from './contexts/DarkModeContext';
import { Helmet } from 'react-helmet';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CreateData = lazy(() => import('./components/features/CreateData'));
const ReadData = lazy(() => import('./components/features/ReadData'));
const UpdateData = lazy(() => import('./components/features/UpdateData'));
const DeleteData = lazy(() => import('./components/features/DeleteData'));
const SearchHelp = lazy(() => import('./pages/SearchHelp'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const Search = lazy(() => import('./pages/Search'));
const Results = lazy(() => import('./pages/Results'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BrowseByYear = lazy(() => import('./pages/BrowseByYear'));
const BrowseByCorrespondent = lazy(
  () => import('./pages/BrowseByCorrespondent'),
);
const BrowseByTopic = lazy(() => import('./pages/BrowseByTopic'));
const AdvancedSearchPage = lazy(() => import('./pages/AdvancedSearchPage'));

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
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
        <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="/browse/year" element={<BrowseByYear />} />
            <Route
              path="/browse/correspondent"
              element={<BrowseByCorrespondent />}
            />
            <Route path="/browse/topic" element={<BrowseByTopic />} />
            <Route path="/advanced-search" element={<AdvancedSearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      {/* Footer is always rendered at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
