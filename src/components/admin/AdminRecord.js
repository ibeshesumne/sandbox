import React, { useState } from "react";
import { db } from "../../firebase";
import { ref, update, remove } from "firebase/database";

const AdminRecord = ({ record }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    date: record.date,
    sender: record.sender,
    receiver: record.receiver,
    notes: record.notes,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const dbRef = ref(db, `letters/${record.id}`);
    update(dbRef, formData)
      .then(() => {
        alert("Record updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => alert("Error updating record: " + error.message));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete record ID: ${record.id}?`)) {
      const dbRef = ref(db, `letters/${record.id}`);
      remove(dbRef)
        .then(() => alert(`Record ${record.id} deleted successfully!`))
        .catch((error) => alert("Error deleting record: " + error.message));
    }
  };

  return (
    <div className="p-4 border rounded-md mb-2 bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText">
      {isEditing ? (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <input
            type="text"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            placeholder="Sender"
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            placeholder="Receiver"
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            required
            className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText resize-none"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Save
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3 className="text-lg font-bold">ID: {record.id}</h3>
          <p>Date: {record.date}</p>
          <p>Sender: {record.sender}</p>
          <p>Receiver: {record.receiver}</p>
          <p>Notes: {record.notes}</p>
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
            Edit
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default AdminRecord;