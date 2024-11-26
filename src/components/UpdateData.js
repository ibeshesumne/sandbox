import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import { Link } from "react-router-dom";

function UpdateData() {
  const [records, setRecords] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    sender: "",
    receiver: "",
    notes: "",
  });

  // Fetch records from Firebase
  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRecords(data || {});
    });
  }, []);

  // Filter records based on search query
  const filteredRecords = Object.keys(records).filter((key) => {
    const record = records[key];
    return (
      record.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

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

  // Handle record selection
  const handleSelectRecord = (id) => {
    setSelectedId(id);
    const record = records[id];
    if (record) {
      setFormData({
        date: record.date || "",
        sender: record.sender || "",
        receiver: record.receiver || "",
        notes: record.notes || "",
      });
    }
  };

  // Submit updated record to Firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("Please select a record to update.");
      return;
    }

    const dbRef = ref(db, `letters/${selectedId}`);
    update(dbRef, formData)
      .then(() => {
        alert(`Record ID: ${selectedId} updated successfully!`);
        setSelectedId("");
        setFormData({
          date: "",
          sender: "",
          receiver: "",
          notes: "",
        });
      })
      .catch((error) => {
        alert("Error updating record: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zenGray dark:bg-zenDark">
      <div className="w-full max-w-6xl p-6 bg-zenLight dark:bg-zenDark rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zenDark dark:text-zenDarkText text-center mb-6">
          Update Records
        </h2>
        <Link to="/" className="block text-zenAccent text-center mb-4 underline">
          Back to Home
        </Link>

        {/* Search and Records List */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Records List with Pagination */}
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

          {/* Edit Form */}
          <div className="flex-1">
            {selectedId ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-semibold text-zenDark dark:text-zenDarkText">
                  Editing Record ID: {selectedId}
                </h3>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
                />
                <input
                  type="text"
                  name="sender"
                  value={formData.sender}
                  onChange={(e) =>
                    setFormData({ ...formData, sender: e.target.value })
                  }
                  placeholder="Sender"
                  required
                  className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
                />
                <input
                  type="text"
                  name="receiver"
                  value={formData.receiver}
                  onChange={(e) =>
                    setFormData({ ...formData, receiver: e.target.value })
                  }
                  placeholder="Receiver"
                  required
                  className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText"
                />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Notes"
                  required
                  className="w-full p-2 border rounded-md bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-zenBlue text-zenLight py-2 rounded-md hover:bg-zenAccent transition"
                >
                  Update Record
                </button>
              </form>
            ) : (
              <p className="text-gray-600">
                Select a record to edit from the list.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateData;