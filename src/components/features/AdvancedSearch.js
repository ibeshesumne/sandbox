import React, { useState } from "react";

const AdvancedSearch = ({ onSearch }) => {
  const [filters, setFilters] = useState({ sender: "", receiver: "", dateRange: "", notes: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Advanced Search</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="sender"
          placeholder="Sender"
          value={filters.sender}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="receiver"
          placeholder="Receiver"
          value={filters.receiver}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={filters.notes}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
