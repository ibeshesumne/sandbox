import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import { Link } from "react-router-dom";

function DeleteData() {
  const [records, setRecords] = useState({});

  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRecords(data || {});
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete record ID: ${id}?`)) {
      const dbRef = ref(db, `letters/${id}`);
      remove(dbRef)
        .then(() => alert(`Record ${id} deleted successfully!`))
        .catch((error) => alert("Error deleting record: " + error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Delete Records</h2>
        <Link to="/" className="block text-blue-500 text-center mb-4 underline">
          Back to Home
        </Link>
        <div className="space-y-2">
          {Object.keys(records).map((key) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 border rounded-md bg-gray-50 hover:bg-gray-100"
            >
              <div>
                <p className="font-bold">ID: {key}</p>
                <p>{records[key].sender} - {records[key].date}</p>
              </div>
              <button
                onClick={() => handleDelete(key)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {Object.keys(records).length === 0 && (
          <p className="text-center text-gray-500 mt-4">No records to delete.</p>
        )}
      </div>
    </div>
  );
}

export default DeleteData;
