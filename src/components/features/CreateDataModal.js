// src/components/features/CreateDataModal.js
import React, { useState } from 'react';
import { db } from '../../firebase';
import { ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const CreateDataModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    sender: '',
    receiver: '',
    notes: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = ref(db, 'letters');
    push(dbRef, formData)
      .then(() => {
        alert('Data created successfully!');
        onClose();
        navigate('/read');
      })
      .catch((error) => alert('Error creating data: ' + error.message));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="relative w-11/12 max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Create Record
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Field */}
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
            >
              Date (YYYY-MM-DD)
            </label>
            <input
              id="date"
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              required
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please enter the date in YYYY-MM-DD format.
            </p>
          </div>

          {/* Sender Field */}
          <div>
            <label
              htmlFor="sender"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
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
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Receiver Field */}
          <div>
            <label
              htmlFor="receiver"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
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
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Notes Field */}
          <div>
            <label
              htmlFor="notes"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
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
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            Create
          </button>
        </form>
        <button
          onClick={onClose}
          className="block mt-4 text-blue-500 dark:text-blue-400 text-center underline hover:no-underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateDataModal;
