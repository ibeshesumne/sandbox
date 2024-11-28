import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

const AdvancedSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Define the debounced function outside of useCallback
  const debouncedSearch = debounce((searchQuery) => {
    onSearch(searchQuery);
  }, 300);

  // Memoize the handleSearch function
  const handleSearch = useCallback(debouncedSearch, [
    debouncedSearch,
    onSearch,
  ]);

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </form>
  );
};

export default AdvancedSearch;
