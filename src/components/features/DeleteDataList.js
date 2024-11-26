// DeleteDataList.js
import React from "react";
import { Link } from "react-router-dom";

function DeleteDataList({ records, currentPage, totalPages, handleNextPage, handlePreviousPage, handleGoToLastPage, handleDelete }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zenGray dark:bg-zenDark">
      <div className="max-w-4xl p-8 bg-zenLight dark:bg-zenDark rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zenDark dark:text-zenDarkText mb-6 text-center">Delete Records</h2>
        <Link to="/" className="block text-zenAccent text-center mb-4 underline">
          Back to Home
        </Link>
        <div className="space-y-2">
          {Object.keys(records).map((key) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div>
                <p className="font-bold">ID: {key}</p>
                <p>{records[key].sender} - {records[key].date}</p>
              </div>
              <button
                onClick={() => handleDelete(key)}
                className="px-4 py-2 bg-red-500 text-zenLight rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {Object.keys(records).length === 0 && (
          <p className="text-center text-gray-500 mt-4">No records to delete.</p>
        )}

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
          <button
            onClick={handleGoToLastPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDataList;