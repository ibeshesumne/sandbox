import React from 'react';
import { Link } from 'react-router-dom';

const ReadDataList = React.memo(({ data }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zenGray dark:bg-zenDark">
      <div className="max-w-4xl p-8 bg-zenLight dark:bg-zenDark rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zenDark dark:text-zenDarkText mb-6 text-center">
          View Records
        </h2>
        <Link
          to="/"
          className="block text-zenAccent text-center mb-4 underline"
        >
          Back to Home
        </Link>
        {Object.keys(data).length > 0 ? (
          Object.keys(data).map((key) => (
            <div
              key={key}
              className="mb-4 p-4 border rounded-lg bg-zenGray dark:bg-zenDark text-zenDark dark:text-zenDarkText shadow-sm"
            >
              <h3 className="text-lg font-bold">ID: {key}</h3>
              <p>Date: {data[key].date}</p>
              <p>Sender: {data[key].sender}</p>
              <p>Receiver: {data[key].receiver}</p>
              <p>Notes: {data[key].notes}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No records found.</p>
        )}
      </div>
    </div>
  );
});

export default ReadDataList;
