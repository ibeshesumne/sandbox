// src/pages/BrowseByYear.js
import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";

const BrowseByYear = () => {
  const [years, setYears] = useState([]); // List of unique years
  const [selectedYear, setSelectedYear] = useState(null); // Currently selected year
  const [letters, setLetters] = useState([]); // Letters for the selected year
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYears = async () => {
      const db = getDatabase();
      const recordsRef = ref(db, "letters");
      const snapshot = await get(recordsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Extract unique years
        const yearsSet = new Set();
        Object.values(data).forEach((record) => {
          const year = record.date?.split("-")[0];
          if (year) yearsSet.add(year);
        });

        setYears(Array.from(yearsSet).sort());
      }

      setLoading(false);
    };

    fetchYears();
  }, []);

  const fetchLettersForYear = async (year) => {
    setLoading(true);
    const db = getDatabase();
    const recordsRef = ref(db, "letters");
    const snapshot = await get(recordsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Filter letters for the selected year
      const filteredLetters = Object.values(data).filter(
        (record) => record.date?.split("-")[0] === year
      );

      setLetters(filteredLetters);
    }

    setLoading(false);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    fetchLettersForYear(year);
  };

  const handleBackClick = () => {
    setSelectedYear(null);
    setLetters([]);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12 flex">
      {/* Sidebar for Years */}
      <div className="w-1/4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Years</h2>
        <ul>
          {years.map((year) => (
            <li key={year}>
              <button
                className={`w-full text-left py-2 px-4 rounded-md mb-2 ${
                  selectedYear === year
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 ml-4">
        {selectedYear ? (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Back to Years
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Letters from {selectedYear}
            </h2>
            {letters.length > 0 ? (
              <ul>
                {letters.map((letter, index) => (
                  <li key={index} className="mb-4 border-b pb-2">
                    <strong>Sender:</strong> {letter.sender} <br />
                    <strong>Receiver:</strong> {letter.receiver} <br />
                    <strong>Date:</strong> {letter.date} <br />
                    <strong>Notes:</strong> {letter.notes}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No letters found for {selectedYear}.</p>
            )}
          </div>
        ) : (
          <p className="text-lg">
            Select a year from the left to view letters.
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowseByYear;
