import React from 'react';
import { Link } from 'react-router-dom';

const ReadDataList = React.memo(({ data }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          View Records
        </h2>
        <Link
          to="/"
          className="block text-blue-500 dark:text-blue-400 text-center mb-4 underline hover:no-underline"
        >
          Back to Home
        </Link>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((record) => (
              <div
                key={record.id}
                className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">ID: {record.id}</h3>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span> {record.date}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Sender:</span> {record.sender}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Receiver:</span> {record.receiver}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Notes:</span> {record.notes}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No records found.
          </p>
        )}
      </div>
    </div>
  );
});

export default ReadDataList;
