import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import ReadDataList from './ReadDataList';

function ReadDataContainer({ searchQuery, resetSearch }) {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const dbRef = ref(db, 'letters');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() || {};
      setData(data);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setFilteredData(data);
      resetSearch();
    }
  }, [location, data, resetSearch]);

  useEffect(() => {
    let results = { ...data };

    if (searchQuery) {
      results = Object.keys(results).reduce((acc, key) => {
        const record = results[key];
        const recordString = Object.values(record).join(' ').toLowerCase();
        if (recordString.includes(searchQuery.toLowerCase())) {
          acc[key] = record;
        }
        return acc;
      }, {});
    }

    setFilteredData(results);
  }, [data, searchQuery]);

  return <ReadDataList data={filteredData} />;
}

export default ReadDataContainer;
