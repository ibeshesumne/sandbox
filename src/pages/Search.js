// src/pages/Search.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Correct import statement

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [randomSenders, setRandomSenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recordsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRecords(recordsArray);

        // Extract unique senders
        const sendersSet = new Set();
        recordsArray.forEach((record) => {
          const sender = record.sender || "Unknown";
          sendersSet.add(sender);
        });

        // Select 10 random senders
        const sendersArray = Array.from(sendersSet);
        const randomSenders = [];
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * sendersArray.length);
          randomSenders.push(sendersArray[randomIndex]);
        }
        setRandomSenders(randomSenders);
      }
    });
  }, []);

  useEffect(() => {
    const results = records.filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRecords(results);
  }, [searchTerm, records]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/results?q=${searchTerm}`);
    }
  };

  const handleInputClick = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (sender) => {
    setSearchTerm(sender);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontSize: '72px' }}>Search</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
            onClick={handleInputClick}
            className="w-full max-w-2xl p-4 pl-10 border rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mt-4"
          />
          {showSuggestions && (
            <div className="absolute z-10 w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1">
              {randomSenders.map((sender, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 text-left"
                  onClick={() => handleSuggestionClick(sender)}
                >
                  {sender}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {searchTerm && (
        <div className="w-full max-w-2xl">
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="text-gray-900 dark:text-white">Date: {record.date}</p>
                <p className="text-gray-900 dark:text-white">Sender: {record.sender}</p>
                <p className="text-gray-900 dark:text-white">Receiver: {record.receiver}</p>
                <p className="text-gray-900 dark:text-white">Notes: {record.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;