import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const exportRecordsToCSV = async () => {
  try {
    const dbRef = ref(db, "letters"); // Use 'letters' as in ReadDataContainer
    const dataPromise = new Promise((resolve, reject) => {
      onValue(
        dbRef,
        (snapshot) => {
          const rawData = snapshot.val();
          if (!rawData) {
            console.error("No data available.");
            reject("No data available.");
          }
          // Convert rawData to an array of objects with an id
          const dataArray = Object.keys(rawData).map((key) => ({
            id: key,
            ...rawData[key],
          }));
          resolve(dataArray);
        },
        (error) => reject(error)
      );
    });

    const data = await dataPromise;
    console.log("Exporting data:", data);
    const csvContent = convertToCSV(data);
    downloadCSV(csvContent);
    return true;
  } catch (error) {
    console.error("Error exporting records:", error);
    return false;
  }
};

const convertToCSV = (data) => {
  if (!data || !data.length) return "";

  // Extract headers from the first object's keys
  const headers = Object.keys(data[0]);
  const rows = data.map((record) =>
    headers.map((header) => JSON.stringify(record[header] || "")).join(",")
  );

  // Combine headers and rows into CSV format
  return [headers.join(","), ...rows].join("\n");
};

const downloadCSV = (csvContent) => {
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `exported_letters_${new Date().toISOString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportRecordsToCSV;
