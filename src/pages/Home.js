// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase'; // Adjust the path if needed

const Home = () => {
  const [commonData, setCommonData] = useState(null);

  useEffect(() => {
    const fetchCommonData = async () => {
      try {
        const snapshot = await get(ref(db, '/commonData')); // Adjust the path to match your database structure
        setCommonData(snapshot.val());
      } catch (error) {
        console.error('Error fetching common data:', error);
      }
    };
    fetchCommonData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to the Henri Thomas Archive
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Discover the extensive correspondence and works of Henri Thomas, one
            of France's most celebrated authors. Explore his letters, delve into
            his relationships with contemporaries, and gain insights into his
            literary contributions.
          </p>

          {/* Prefetched Data Section */}
          {commonData ? (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-6">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                Featured Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {JSON.stringify(commonData)}
              </p>
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400 mb-6">Loading featured data...</div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Link
              to="/search"
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Search Letters
            </Link>
            <Link
              to="/about"
              className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Additional Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Explore the Archive
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This archive includes over a thousand letters, categorized by
            correspondents, topics, and dates. Start your journey into history
            today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
