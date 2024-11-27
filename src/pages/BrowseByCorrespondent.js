// src/pages/BrowseByCorrespondent.js
import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";

const BrowseByCorrespondent = () => {
  const [correspondents, setCorrespondents] = useState([]); // List of unique correspondents
  const [selectedCorrespondent, setSelectedCorrespondent] = useState(null); // Selected correspondent
  const [letters, setLetters] = useState([]); // Letters for the selected correspondent
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCorrespondents = async () => {
      const db = getDatabase();
      const recordsRef = ref(db, "letters");
      const snapshot = await get(recordsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Extract unique correspondents
        const correspondentsSet = new Set();
        Object.values(data).forEach((record) => {
          const correspondent = record.sender || "Unknown";
          correspondentsSet.add(correspondent);
        });

        setCorrespondents(Array.from(correspondentsSet).sort());
      }

      setLoading(false);
    };

    fetchCorrespondents();
  }, []);

  const fetchLettersForCorrespondent = async (correspondent) => {
    setLoading(true);
    const db = getDatabase();
    const recordsRef = ref(db, "letters");
    const snapshot = await get(recordsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Filter letters for the selected correspondent
      const filteredLetters = Object.values(data).filter(
        (record) => record.sender === correspondent
      );

      setLetters(filteredLetters);
    }

    setLoading(false);
  };

  const handleCorrespondentClick = (correspondent) => {
    setSelectedCorrespondent(correspondent);
    fetchLettersForCorrespondent(correspondent);
  };

  const handleBackClick = () => {
    setSelectedCorrespondent(null);
    setLetters([]);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12 flex">
      {/* Sidebar for Correspondents */}
      <div className="w-1/4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Correspondents</h2>
        <ul>
          {correspondents.map((correspondent) => (
            <li key={correspondent}>
              <button
                className={`w-full text-left py-2 px-4 rounded-md mb-2 ${
                  selectedCorrespondent === correspondent
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleCorrespondentClick(correspondent)}
              >
                {correspondent}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 ml-4">
        {selectedCorrespondent ? (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Back to Correspondents
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Letters from {selectedCorrespondent}
            </h2>
            {letters.length > 0 ? (
              <ul>
                {letters.map((letter, index) => (
                  <li key={index} className="mb-4 border-b pb-2">
                    <strong>Receiver:</strong> {letter.receiver} <br />
                    <strong>Date:</strong> {letter.date} <br />
                    <strong>Notes:</strong> {letter.notes}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No letters found for {selectedCorrespondent}.</p>
            )}
          </div>
        ) : (
          <p className="text-lg">
            Select a correspondent from the left to view letters.
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowseByCorrespondent;
