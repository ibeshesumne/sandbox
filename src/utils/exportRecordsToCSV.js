import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const formatDate = (value) => {
  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  }
  return value; // Return the original value if not a valid date
};

const exportRecordsToCSV = async () => {
  try {
    const dbRef = ref(db, "letters"); // Fetch data from the 'letters' node
    const dataPromise = new Promise((resolve, reject) => {
      onValue(
        dbRef,
        (snapshot) => {
          const rawData = snapshot.val();
          if (!rawData) {
            reject("No data available.");
            return;
          }
          // Transform rawData into an array
          const dataArray = Object.keys(rawData).map((key) => ({
            id: key, // Use the Firebase key as the ID
            ...rawData[key],
          }));
          resolve(dataArray);
        },
        (error) => reject(error)
      );
    });

    const data = await dataPromise;
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
    headers
      .map((header) => {
        const value = record[header];
        if (header === "id") {
          // Prefix ID with an apostrophe to treat it as text in Excel
          return `"'${value}"`;
        }
        // Format date fields
        const formattedValue = formatDate(value) || "";
        // Ensure strings are quoted
        return typeof formattedValue === "string" ? `"${formattedValue.replace(/"/g, '""')}"` : formattedValue;
      })
      .join(",")
  );

  // Combine headers and rows
  return [headers.join(","), ...rows].join("\n");
};

const downloadCSV = (csvContent) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `exported_letters_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportRecordsToCSV;