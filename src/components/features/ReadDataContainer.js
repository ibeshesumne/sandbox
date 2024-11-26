// ReadDataContainer.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import ReadDataList from "./ReadDataList";

function ReadDataContainer() {
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data || {});
    });
  }, []);

  return <ReadDataList data={data} />;
}

export default ReadDataContainer;