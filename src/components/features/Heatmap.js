import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { fetchLettersData } from "../../firebase";

const Heatmap = () => {
  const svgRef = useRef();

  useEffect(() => {
    fetchLettersData().then((data) => {
      if (!data) return;

      const letters = Object.values(data)
        .map((item) => ({
          date: new Date(item.date),
          sender: item.sender,
          receiver: item.receiver,
          notes: item.notes,
        }))
        .filter((item) => item.sender === "Henri Thomas" || item.receiver === "Henri Thomas");

      createHeatmap(letters);
    });
  }, []);

  const createHeatmap = (letters) => {
    const svg = d3.select(svgRef.current);
    const width = 1200; // Adjust width for legend
    const cellSize = 20;
    const padding = 80;

    // Group years and calculate frequency of letters by date
    const years = Array.from(new Set(letters.map((d) => d.date.getFullYear()))).sort((a, b) => a - b);

    const correspondenceMap = d3.rollup(
      letters,
      (v) => v.length, // Count the number of letters for each date
      (d) => d3.timeFormat("%Y-%m-%d")(d.date)
    );

    // Define two-color scale
    const colorScale = d3
      .scaleThreshold()
      .domain([1]) // Fixed threshold for 1 letter
      .range(["#deebf7", "#3182bd"]); // Light blue for 1 letter, dark blue for more than 1 letter

    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", years.length * (cellSize * 7 + padding));

    const days = ["M", "T", "W", "T", "F", "S", "S"]; // Labels for days of the week

    svg
      .selectAll(".year-group")
      .data(years)
      .join("g")
      .attr("class", "year-group")
      .attr("transform", (d, i) => `translate(0, ${i * (cellSize * 7 + padding)})`)
      .each(function (year) {
        const group = d3.select(this);

        // Add year label
        group.append("text").attr("x", 10).attr("y", 15).text(year).attr("font-weight", "bold");

        const startOfYear = d3.timeMonday(new Date(year, 0, 1));
        const daysInYear = d3.timeDays(startOfYear, new Date(year + 1, 0, 1));

        // Add week numbers
        const weekNumbers = [...new Set(daysInYear.map((d) => d3.timeWeek.count(startOfYear, d)))];
        group
          .selectAll(".week-label")
          .data(weekNumbers)
          .join("text")
          .attr("class", "week-label")
          .attr("x", (d) => d * cellSize + 40)
          .attr("y", 10)
          .text((d) => d + 1) // Week numbers start at 1
          .attr("font-size", "10px")
          .attr("text-anchor", "middle");

        // Add day labels
        group
          .selectAll(".day-label")
          .data(days)
          .join("text")
          .attr("class", "day-label")
          .attr("x", 30)
          .attr("y", (d, i) => i * cellSize + 35)
          .text((d) => d)
          .attr("font-size", "10px")
          .attr("text-anchor", "end");

        // Add heatmap cells
        group
          .selectAll(".day")
          .data(daysInYear)
          .join("rect")
          .attr("class", "day")
          .attr("x", (d) => d3.timeWeek.count(startOfYear, d) * cellSize + 40) // Weeks start at 1
          .attr("y", (d) => (d.getDay() === 0 ? 6 : d.getDay() - 1) * cellSize + 20) // Start week with Monday
          .attr("width", cellSize - 1)
          .attr("height", cellSize - 1)
          .attr("fill", (d) => {
            const dateKey = d3.timeFormat("%Y-%m-%d")(d);
            const count = correspondenceMap.get(dateKey) || 0;
            return count > 0 ? colorScale(count) : "none"; // Apply color only if there are letters
          })
          .append("title")
          .text((d) => {
            const dateKey = d3.timeFormat("%Y-%m-%d")(d);
            const count = correspondenceMap.get(dateKey) || 0;
            return `${dateKey}: ${count} letters`;
          });

        // Add legend beside each year's grid
        const legendGroup = group.append("g").attr("transform", `translate(${width - 100}, 0)`);

        const legend = [
          { label: "1 letter", color: "#deebf7" },
          { label: ">1 letter", color: "#3182bd" },
        ];

        legendGroup
          .selectAll(".legend-item")
          .data(legend)
          .join("g")
          .attr("class", "legend-item")
          .attr("transform", (d, i) => `translate(0, ${i * 20})`)
          .each(function (d) {
            const item = d3.select(this);
            item
              .append("rect")
              .attr("x", 0)
              .attr("y", 20)
              .attr("width", 15)
              .attr("height", 15)
              .attr("fill", d.color);
            item
              .append("text")
              .attr("x", 20)
              .attr("y", 33)
              .text(d.label)
              .attr("font-size", "10px")
              .attr("alignment-baseline", "middle");
          });
      });
  };

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;