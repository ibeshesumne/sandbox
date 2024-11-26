// DeleteDataContainer.js
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue, remove } from "firebase/database";
import DeleteDataList from "./DeleteDataList";

function DeleteDataContainer() {
  const [records, setRecords] = useState({});

  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRecords(data || {});
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete record ID: ${id}?`)) {
      const dbRef = ref(db, `letters/${id}`);
      remove(dbRef)
        .then(() => alert(`Record ${id} deleted successfully!`))
        .catch((error) => alert("Error deleting record: " + error.message));
    }
  };

  return <DeleteDataList records={records} handleDelete={handleDelete} />;
}

export default DeleteDataContainer;