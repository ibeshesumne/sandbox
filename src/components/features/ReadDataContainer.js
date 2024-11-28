import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import ReadDataList from './ReadDataList';

function ReadDataContainer({ searchQuery, resetSearch }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const dbRef = ref(db, 'letters');
    onValue(dbRef, (snapshot) => {
      const rawData = snapshot.val() || {};
      // Convert the object to an array of records
      const dataArray = Object.keys(rawData).map((key) => ({
        id: key,
        ...rawData[key],
      }));
      setData(dataArray);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setFilteredData(data);
      resetSearch();
    }
  }, [location, data, resetSearch]);

  useEffect(() => {
    let results = [...data]; // Make a copy of the data array

    if (searchQuery) {
      results = results.filter((record) => {
        const recordString = Object.values(record).join(' ').toLowerCase();
        return recordString.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredData(results);
  }, [data, searchQuery]);

  return <ReadDataList data={filteredData} />;
}

export default ReadDataContainer;
