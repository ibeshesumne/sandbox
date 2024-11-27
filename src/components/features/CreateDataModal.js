// src/components/features/CreateDataModal.js
import React, { useState } from "react";
import { db } from "../../firebase";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

const CreateDataModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    sender: "",
    receiver: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = ref(db, "letters");
    push(dbRef, formData)
      .then(() => {
        alert("Data created successfully!");
        onClose();
        navigate("/read");
      })
      .catch((error) => alert("Error creating data: " + error.message));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
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
        <button onClick={onClose} className="block text-center mt-4 text-blue-500 underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateDataModal;