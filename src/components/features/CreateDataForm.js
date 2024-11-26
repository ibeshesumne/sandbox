// src/components/features/CreateDataForm.js
import React from "react";
import { Link } from "react-router-dom";

const CreateDataForm = ({ formData, handleChange, handleSubmit }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Create Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Date"
          required
          className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          name="sender"
          value={formData.sender}
          onChange={handleChange}
          placeholder="Sender"
          required
          className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          name="receiver"
          value={formData.receiver}
          onChange={handleChange}
          placeholder="Receiver"
          required
          className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
          required
          className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
        />
        <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
          Create
        </button>
      </form>
      <Link to="/" className="block text-center mt-4 text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  </div>
);

export default CreateDataForm;