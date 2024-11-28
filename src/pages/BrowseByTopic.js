// src/pages/BrowseByTopic.js
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

const BrowseByTopic = () => {
  const [topics, setTopics] = useState([]); // List of unique topics
  const [selectedTopic, setSelectedTopic] = useState(null); // Selected topic
  const [letters, setLetters] = useState([]); // Letters for the selected topic
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      const db = getDatabase();
      const recordsRef = ref(db, 'letters');
      const snapshot = await get(recordsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Extract unique topics (grouping by `notes`)
        const topicsSet = new Set();
        Object.values(data).forEach((record) => {
          const note = record.notes || 'General';
          topicsSet.add(note);
        });

        setTopics(Array.from(topicsSet).sort());
      }

      setLoading(false);
    };

    fetchTopics();
  }, []);

  const fetchLettersForTopic = async (topic) => {
    setLoading(true);
    const db = getDatabase();
    const recordsRef = ref(db, 'letters');
    const snapshot = await get(recordsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Filter letters for the selected topic
      const filteredLetters = Object.values(data).filter(
        (record) => record.notes === topic,
      );

      setLetters(filteredLetters);
    }

    setLoading(false);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    fetchLettersForTopic(topic);
  };

  const handleBackClick = () => {
    setSelectedTopic(null);
    setLetters([]);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12 flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar for Topics */}
      <div className="w-1/4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Topics (Notes)</h2>
        <ul>
          {topics.map((topic, index) => (
            <li key={index}>
              <button
                className={`w-full text-left py-2 px-4 rounded-md mb-2 ${
                  selectedTopic === topic
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleTopicClick(topic)}
              >
                {topic}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 ml-4">
        {selectedTopic ? (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Back to Topics
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Letters for Topic: {selectedTopic}
            </h2>
            {letters.length > 0 ? (
              <ul>
                {letters.map((letter, index) => (
                  <li
                    key={index}
                    className="mb-4 border-b pb-2 bg-white dark:bg-gray-800 p-4 rounded shadow"
                  >
                    <strong>Sender:</strong> {letter.sender} <br />
                    <strong>Receiver:</strong> {letter.receiver} <br />
                    <strong>Date:</strong> {letter.date} <br />
                    <strong>Notes:</strong> {letter.notes}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No letters found for {selectedTopic}.</p>
            )}
          </div>
        ) : (
          <p className="text-lg">
            Select a topic from the left to view letters.
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowseByTopic;
