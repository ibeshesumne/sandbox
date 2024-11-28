// src/pages/Results.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get("q");
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

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
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = records.filter((record) =>
        Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRecords(results);
    }
  }, [searchTerm, records]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 p-4">
      <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 p-4 shadow-md">
        <div className="max-w-xl mx-auto flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mb-6"
          />
        </div>
      </div>
      <div className="flex-grow p-4">
        <div className="max-w-xl mx-auto">
          {filteredRecords.length > 0 ? (
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
          ) : (
            <div className="text-center text-gray-900 dark:text-white">
              <p className="text-2xl font-bold">No results found for "{searchTerm}".</p>
              <p className="text-lg">Please try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;