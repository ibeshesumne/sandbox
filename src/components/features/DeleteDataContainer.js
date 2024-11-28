import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, remove } from 'firebase/database';
import DeleteDataList from './DeleteDataList';

function DeleteDataContainer() {
  const [records, setRecords] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const dbRef = ref(db, 'letters');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRecords(data || {});
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const totalPages = Math.ceil(Object.keys(records).length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleGoToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = Object.keys(records)
    .slice(indexOfFirstRecord, indexOfLastRecord)
    .reduce((acc, key) => {
      acc[key] = records[key];
      return acc;
    }, {});

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete record ID: ${id}?`)) {
      // Optimistically update local state
      const updatedRecords = { ...records };
      delete updatedRecords[id];
      setRecords(updatedRecords);

      // Perform Firebase deletion
      const dbRef = ref(db, `letters/${id}`);
      remove(dbRef)
        .then(() => {
          alert(`Record ${id} deleted successfully!`);
        })
        .catch((error) => {
          alert('Error deleting record: ' + error.message);
          // Re-add the deleted record in case of an error
          setRecords((prev) => ({ ...prev, [id]: records[id] }));
        });
    }
  };

  return (
    <DeleteDataList
      records={currentRecords}
      currentPage={currentPage}
      totalPages={totalPages}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handleGoToLastPage={handleGoToLastPage}
      handleDelete={handleDelete}
    />
  );
}

export default DeleteDataContainer;
