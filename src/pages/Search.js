// src/pages/Search.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Records Search</h1>
        <input
          type="text"
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
          className="w-full max-w-xl p-3 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mt-4"
        />
      </div>
      {searchTerm && (
        <div className="w-full max-w-xl">
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
