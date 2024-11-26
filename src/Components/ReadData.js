import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

function ReadData() {
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data || {});
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">View Records</h2>
        <Link to="/" className="block text-blue-500 text-center mb-4 underline">
          Back to Home
        </Link>
        {Object.keys(data).length > 0 ? (
          Object.keys(data).map((key) => (
            <div
              key={key}
              className="mb-4 p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <h3 className="text-lg font-bold">ID: {key}</h3>
              <p>Date: {data[key].date}</p>
              <p>Sender: {data[key].sender}</p>
              <p>Receiver: {data[key].receiver}</p>
              <p>Notes: {data[key].notes}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No records found.</p>
        )}
      </div>
    </div>
  );
}

export default ReadData;
