// src/pages/StatisticsPage.js
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Helmet } from "react-helmet";
import Statistics from "../components/features/Statistics";

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const lettersRef = ref(db, "letters");

      onValue(lettersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const letters = Object.values(data).map((item) => ({
            date: new Date(item.date),
            sender: item.sender,
            receiver: item.receiver,
            notes: item.notes,
          }));

          computeStatistics(letters);
        } else {
          console.warn("No letters data found");
          setStatistics(null);
        }
      });
    };

    fetchData();
  }, []);

  const computeStatistics = (letters) => {
    const totalLetters = letters.length;
    const senders = new Set();
    const receivers = new Set();
    const senderCounts = {};
    const receiverCounts = {};
    const lettersPerYear = {};
    const senderReceiverPairs = {};
    let earliestDate = new Date();
    let latestDate = new Date(0);
    const henriThomasLettersPerYear = {};

    letters.forEach((letter) => {
      const sender = letter.sender;
      const receiver = letter.receiver;
      const date = new Date(letter.date);

      senders.add(sender);
      receivers.add(receiver);

      senderCounts[sender] = (senderCounts[sender] || 0) + 1;
      receiverCounts[receiver] = (receiverCounts[receiver] || 0) + 1;

      const year = date.getFullYear();
      lettersPerYear[year] = (lettersPerYear[year] || 0) + 1;

      const pair = `${sender}-${receiver}`;
      senderReceiverPairs[pair] = (senderReceiverPairs[pair] || 0) + 1;

      if (date < earliestDate) earliestDate = date;
      if (date > latestDate) latestDate = date;

      if (sender === "Henri Thomas" || receiver === "Henri Thomas") {
        henriThomasLettersPerYear[year] = (henriThomasLettersPerYear[year] || 0) + 1;
      }
    });

    const mostFrequentSender = Object.entries(senderCounts).reduce((a, b) => (a[1] > b[1] ? a : b));
    const mostFrequentReceiver = Object.entries(receiverCounts).reduce((a, b) => (a[1] > b[1] ? a : b));
    const mostCommonPair = Object.entries(senderReceiverPairs).reduce((a, b) => (a[1] > b[1] ? a : b));

    const averageLettersPerYear = Object.values(lettersPerYear).reduce((a, b) => a + b, 0) / Object.keys(lettersPerYear).length;

    const henriThomasLetters = letters.filter((letter) => letter.sender === "Henri Thomas" || letter.receiver === "Henri Thomas");
    const henriThomasSent = henriThomasLetters.filter((letter) => letter.sender === "Henri Thomas");
    const henriThomasReceived = henriThomasLetters.filter((letter) => letter.receiver === "Henri Thomas");

    const henriThomasSentCount = henriThomasSent.length;
    const henriThomasReceivedCount = henriThomasReceived.length;

    const henriThomasMostCommonReceiver = Object.entries(henriThomasSent.reduce((acc, letter) => {
      acc[letter.receiver] = (acc[letter.receiver] || 0) + 1;
      return acc;
    }, {})).reduce((a, b) => (a[1] > b[1] ? a : b));

    const henriThomasMostCommonSender = Object.entries(henriThomasReceived.reduce((acc, letter) => {
      acc[letter.sender] = (acc[letter.sender] || 0) + 1;
      return acc;
    }, {})).reduce((a, b) => (a[1] > b[1] ? a : b));

    setStatistics({
      totalLetters,
      uniqueSenders: senders.size,
      uniqueReceivers: receivers.size,
      mostFrequentSender: mostFrequentSender[0],
      mostFrequentReceiver: mostFrequentReceiver[0],
      mostCommonPair: mostCommonPair[0],
      earliestDate: earliestDate.toISOString().split('T')[0],
      latestDate: latestDate.toISOString().split('T')[0],
      averageLettersPerYear,
      lettersPerYear,
      henriThomasSentCount,
      henriThomasReceivedCount,
      henriThomasMostCommonReceiver: henriThomasMostCommonReceiver[0],
      henriThomasMostCommonSender: henriThomasMostCommonSender[0],
      henriThomasLettersPerYear,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <Helmet>
        <title>Statistics - Henri Thomas Archive</title>
        <meta
          name="description"
          content="Statistics about the letters and works of Henri Thomas."
        />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Statistics</h1>
      {statistics ? <Statistics data={statistics} /> : <p>Loading...</p>}
    </div>
  );
};

export default StatisticsPage;