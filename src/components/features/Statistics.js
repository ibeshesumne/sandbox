// src/components/features/Statistics.js
import React from "react";

const Statistics = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">General Statistics</h2>
        <ul>
          <li><strong>Total Number of Letters:</strong> {data.totalLetters}</li>
          <li><strong>Unique Senders:</strong> {data.uniqueSenders}</li>
          <li><strong>Unique Receivers:</strong> {data.uniqueReceivers}</li>
          <li><strong>Most Frequent Sender:</strong> {data.mostFrequentSender}</li>
          <li><strong>Most Frequent Receiver:</strong> {data.mostFrequentReceiver}</li>
          <li><strong>Most Common Pair of Sender-Receiver:</strong> {data.mostCommonPair}</li>
          <li><strong>Earliest Letter Date:</strong> {data.earliestDate}</li>
          <li><strong>Latest Letter Date:</strong> {data.latestDate}</li>
          <li><strong>Average Number of Letters per Year:</strong> {data.averageLettersPerYear.toFixed(2)}</li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Henri Thomas Statistics</h2>
        <ul>
          <li><strong>Total Letters Involved:</strong> {data.henriThomasSentCount + data.henriThomasReceivedCount}</li>
          <li><strong>Letters Sent:</strong> {data.henriThomasSentCount}</li>
          <li><strong>Letters Received:</strong> {data.henriThomasReceivedCount}</li>
          <li><strong>Most Common Receiver:</strong> {data.henriThomasMostCommonReceiver}</li>
          <li><strong>Most Common Sender:</strong> {data.henriThomasMostCommonSender}</li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Letters per Year</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Year</th>
              <th className="border border-gray-300 p-2 text-center">Total Letters</th>
              <th className="border border-gray-300 p-2 text-center">Henri Thomas Letters</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.lettersPerYear).map(([year, count]) => (
              <tr key={year}>
                <td className="border border-gray-300 p-2 text-left">{year}</td>
                <td className="border border-gray-300 p-2 text-center">{count}</td>
                <td className="border border-gray-300 p-2 text-center">{data.henriThomasLettersPerYear[year] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;