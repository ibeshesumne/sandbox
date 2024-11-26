import React, { useState } from "react";
import { db } from "../firebase";
import { ref, push } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

function CreateData() {
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
        navigate("/read");
      })
      .catch((error) => alert("Error creating data: " + error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zenGray dark:bg-zenDark">
      <div className="max-w-xl p-8 bg-zenLight dark:bg-zenDark rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zenDark dark:text-zenDarkText mb-6 text-center">Create Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            required
            className="w-full p-3 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <input
            type="text"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            placeholder="Sender"
            required
            className="w-full p-3 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            placeholder="Receiver"
            required
            className="w-full p-3 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            required
            className="w-full p-3 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText resize-none"
          />
          <button className="w-full bg-zenBlue text-zenLight py-3 rounded-md hover:bg-zenAccent transition">
            Create
          </button>
        </form>
        <Link to="/" className="block text-center mt-4 text-zenAccent underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default CreateData;