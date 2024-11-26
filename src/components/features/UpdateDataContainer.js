// UpdateDataContainer.js
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue, update } from "firebase/database";
import UpdateDataList from "./UpdateDataList";
import UpdateDataForm from "./UpdateDataForm";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function UpdateDataContainer() {
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

        {/* Flex container for side-by-side layout */}
        <div className="flex flex-col md:flex-row gap-4">
          <UpdateDataList
            records={records}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            recordsPerPage={recordsPerPage}
            currentRecords={currentRecords}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            selectedId={selectedId}
            handleSelectRecord={handleSelectRecord}
          />
          <UpdateDataForm
            selectedId={selectedId}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateDataContainer;