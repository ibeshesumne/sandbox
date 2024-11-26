// UpdateDataList.js
import React from "react";

function UpdateDataList({
  records,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  recordsPerPage,
  currentRecords,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  selectedId,
  handleSelectRecord,
}) {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Search by sender, receiver, or notes"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on new search
        }}
        className="w-full p-2 mb-4 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
      />
      {currentRecords.map((key) => (
        <div
          key={key}
          onClick={() => handleSelectRecord(key)}
          className={`p-4 border rounded-md mb-2 cursor-pointer ${
            selectedId === key
              ? "bg-zenBlue text-zenLight"
              : "bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <p>
            <strong>Sender:</strong> {records[key].sender} |{" "}
            <strong>Date:</strong> {records[key].date}
          </p>
          <p>
            <strong>Receiver:</strong> {records[key].receiver}
          </p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UpdateDataList;