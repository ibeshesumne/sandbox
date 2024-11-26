// ReadDataContainer.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import ReadDataList from "./ReadDataList";

function ReadDataContainer() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data || {});
    });
  }, []);

  const totalPages = Math.ceil(Object.keys(data).length / recordsPerPage);

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
  const currentRecords = Object.keys(data).slice(indexOfFirstRecord, indexOfLastRecord).reduce((acc, key) => {
    acc[key] = data[key];
    return acc;
  }, {});

  return (
    <ReadDataList
      data={currentRecords}
      currentPage={currentPage}
      totalPages={totalPages}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handleGoToLastPage={handleGoToLastPage}
    />
  );
}

export default ReadDataContainer;