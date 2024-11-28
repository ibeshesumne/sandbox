// src/components/features/CreateDataForm.js
import React from 'react';
import { Link } from 'react-router-dom';

const CreateDataForm = ({ formData, handleChange, handleSubmit }) => {
  // Helper function to validate the date input
  const handleDateChange = (e) => {
    const value = e.target.value;
    // Regex to match YYYY-MM-DD format
    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (isValid || value === "") {
      handleChange(e); // Only update state if valid
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Create Record
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Field */}
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Date (YYYY-MM-DD)
            </label>
            <input
              id="date"
              type="text" // Switch to type="text"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              placeholder="YYYY-MM-DD" // Enforced placeholder
              required
              className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please enter the date in YYYY-MM-DD format.
            </p>
          </div>

          {/* Sender Field */}
          <div>
            <label
              htmlFor="sender"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Sender
            </label>
            <input
              id="sender"
              type="text"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              placeholder="Enter sender's name"
              required
              className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Receiver Field */}
          <div>
            <label
              htmlFor="receiver"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Receiver
            </label>
            <input
              id="receiver"
              type="text"
              name="receiver"
              value={formData.receiver}
              onChange={handleChange}
              placeholder="Enter receiver's name"
              required
              className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Notes Field */}
          <div>
            <label
              htmlFor="notes"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter notes"
              required
              className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            Create
          </button>
        </form>
        {/* Back to Home Link */}
        <Link
          to="/"
          className="block text-center mt-4 text-blue-500 dark:text-blue-400 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreateDataForm;
