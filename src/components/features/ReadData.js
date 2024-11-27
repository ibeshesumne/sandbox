// ReadData.js
import React from "react";
import ReadDataContainer from "./ReadDataContainer";

function ReadData({ searchQuery, searchFilters }) {
  return <ReadDataContainer searchQuery={searchQuery} filters={searchFilters} />;
}

export default ReadData;
