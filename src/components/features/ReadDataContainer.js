import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Hook to track navigation changes
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import ReadDataList from "./ReadDataList";

function ReadDataContainer({ searchQuery, filters, resetSearch }) {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const location = useLocation(); // Track current route

  useEffect(() => {
    // Fetch all data from Firebase
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const fetchedData = snapshot.val() || {};
      setData(fetchedData);
      setFilteredData(fetchedData); // Reset filteredData to full data initially
    });
  }, []);

  useEffect(() => {
    // Reset to full data when navigating to Home
    if (location.pathname === "/") {
      setFilteredData(data);
      resetSearch(); // Clear searchQuery and filters from the parent component
    }
  }, [location, data, resetSearch]);

  useEffect(() => {
    let results = { ...data };

    // Apply general search query across all fields
    if (searchQuery) {
      results = Object.keys(results).reduce((acc, key) => {
        const record = results[key];
        const recordString = Object.values(record).join(" ").toLowerCase();
        if (recordString.includes(searchQuery.toLowerCase())) {
          acc[key] = record;
        }
        return acc;
      }, {});
    }

    // Apply advanced search filters
    if (filters) {
      if (filters.sender) {
        results = Object.keys(results).reduce((acc, key) => {
          if (results[key].sender.toLowerCase().includes(filters.sender.toLowerCase())) {
            acc[key] = results[key];
          }
          return acc;
        }, {});
      }

      if (filters.receiver) {
        results = Object.keys(results).reduce((acc, key) => {
          if (results[key].receiver.toLowerCase().includes(filters.receiver.toLowerCase())) {
            acc[key] = results[key];
          }
          return acc;
        }, {});
      }

      if (filters.notes) {
        results = Object.keys(results).reduce((acc, key) => {
          if (results[key].notes.toLowerCase().includes(filters.notes.toLowerCase())) {
            acc[key] = results[key];
          }
          return acc;
        }, {});
      }
    }

    setFilteredData(results);
    setCurrentPage(1); // Reset to the first page on new search
  }, [data, searchQuery, filters]);

  // Pagination logic
  const totalRecords = Object.keys(filteredData).length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = Object.keys(filteredData)
    .slice(indexOfFirstRecord, indexOfLastRecord)
    .reduce((acc, key) => {
      acc[key] = filteredData[key];
      return acc;
    }, {});

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
