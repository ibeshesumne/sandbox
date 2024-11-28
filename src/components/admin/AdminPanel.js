import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, query, orderByKey, onValue } from 'firebase/database';
import AdminRecord from './AdminRecord';

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;

  useEffect(() => {
    const startKey = (currentPage - 1) * recordsPerPage;
    const dbQuery = query(
      ref(db, 'letters'),
      orderByKey()
    );

    const unsubscribe = onValue(dbQuery, (snapshot) => {
      const fetchedData = snapshot.val() || {};
      const dataArray = Object.keys(fetchedData).map((key) => ({
        id: key,
        ...fetchedData[key],
      }));
      // Paginate the data
      const paginatedData = dataArray.slice(startKey, startKey + recordsPerPage);
      setData(paginatedData);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [currentPage]);

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
        {data.map((record) => (
          <AdminRecord key={record.id} record={record} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={data.length < recordsPerPage} // Disable if there are no more records
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
