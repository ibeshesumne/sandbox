import React, { useState } from "react";
import { db } from "../../firebase"; // Correct relative path
import { ref, push } from "firebase/database"; // Ensure this import is uncommented
import { useNavigate } from "react-router-dom";
import CreateDataForm from "./CreateDataForm";

const CreateDataContainer = () => {
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

  return <CreateDataForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default CreateDataContainer;