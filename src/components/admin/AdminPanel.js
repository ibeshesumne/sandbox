import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue, off } from "firebase/database";
import AdminRecord from "./AdminRecord";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;

  useEffect(() => {
    const dbRef = ref(db, "letters");
    const listener = onValue(dbRef, (snapshot) => {
      const fetchedData = snapshot.val() || {};
      const dataArray = Object.keys(fetchedData).map((key) => ({
        id: key,
        ...fetchedData[key],
      }));
      setData(dataArray);
    });

    return () => {
      off(dbRef, listener);
    };
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleGoToLastPage = () => {
    setCurrentPage(Math.ceil(data.length / recordsPerPage));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <div className="space-y-4">
        {currentRecords.map((record) => (
          <AdminRecord key={record.id} record={record} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
        <button
          onClick={handleGoToLastPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;