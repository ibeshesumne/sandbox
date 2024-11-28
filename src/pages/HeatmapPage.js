import React from "react";
import Heatmap from "../components/features/Heatmap";

const HeatmapPage = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">
        Frequency of Letters Exchanged (2005–2018)
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Visualizing correspondence patterns from archival data.
      </p>
      <div className="flex justify-center">
        <Heatmap />
      </div>
    </div>
  );
};

export default HeatmapPage;
