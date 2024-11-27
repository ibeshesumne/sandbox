// src/pages/AdvancedSearchPage.js
import React, { useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdvancedSearchPage = () => {
  const [filters, setFilters] = useState([{ key: "", value: "" }]);
  const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [startDate, endDate] = dateRange;

  const handleFilterChange = (index, field, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index][field] = value;
    setFilters(updatedFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { key: "", value: "" }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const executeSearch = async () => {
    setLoading(true);
    const db = getDatabase();
    const recordsRef = ref(db, "letters");

    let filteredResults = [];
    const snapshot = await get(recordsRef);
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val());

      // Apply filters dynamically
      filteredResults = data.filter((letter) => {
        const dateInRange =
          (!startDate || new Date(letter.date) >= startDate) &&
          (!endDate || new Date(letter.date) <= endDate);

        return (
          dateInRange &&
          filters.every((filter) => {
            if (!filter.key || !filter.value) return true;
            return letter[filter.key]?.toLowerCase().includes(filter.value.toLowerCase());
          })
        );
      });
    }

    setResults(filteredResults);
    setLoading(false);
  };

  const saveSearch = () => {
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
    savedSearches.push({ filters, dateRange });
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    alert("Search criteria saved!");
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Advanced Search</h1>

      {/* Filters Section */}
      <div className="mb-6">
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center mb-4">
            <select
              className="border p-2 mr-4"
              value={filter.key}
              onChange={(e) => handleFilterChange(index, "key", e.target.value)}
            >
              <option value="">Select Filter</option>
              <option value="sender">Correspondent Name</option>
              <option value="receiver">Recipient Name</option>
              <option value="notes">Mentioned Topics</option>
              <option value="date">Date</option>
            </select>
            <input
              className="border p-2 flex-grow"
              type="text"
              placeholder="Enter value"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, "value", e.target.value)}
            />
            <button
              className="bg-red-500 text-white py-1 px-3 rounded ml-2 hover:bg-red-600"
              onClick={() => removeFilter(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={addFilter}
        >
          Add Filter
        </button>
      </div>

      {/* Date Range Picker Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter by Date Range</h2>
        <p className="text-gray-600 mb-2">
          Select a start and end date using the calendar.
        </p>
        <div className="flex items-center">
          <div className="mr-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="start-date">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setDateRange([date, endDate])}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              showYearDropdown
              dateFormat="yyyy-MM-dd"
              className="border p-2 w-full"
              placeholderText="Select start date"
              id="start-date"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="end-date">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setDateRange([startDate, date])}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showYearDropdown
              dateFormat="yyyy-MM-dd"
              className="border p-2 w-full"
              placeholderText="Select end date"
              id="end-date"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded mr-4 hover:bg-green-600"
          onClick={executeSearch}
        >
          Search
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={saveSearch}
        >
          Save Search
        </button>
      </div>

      {/* Results Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <ul>
            {results.map((letter, index) => (
              <li key={index} className="mb-4 border-b pb-2">
                <strong>Sender:</strong> {letter.sender} <br />
                <strong>Receiver:</strong> {letter.receiver} <br />
                <strong>Date:</strong> {letter.date} <br />
                <strong>Notes:</strong> {letter.notes}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
