import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const PieChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [selectedField, setSelectedField] = useState('relevance');
  const [availableFields, setAvailableFields] = useState([]);

  useEffect(() => {
    // Fetch data from local API
    axios.get("http://localhost:8000/crud/Data/fetch")
      .then(response => {
        // Assuming response.data is an array of objects
        const parsedData = response.data.map(d => ({
          region: d.region,
          relevance: +d.relevance,
          intensity: +d.intensity,
          likelihood: +d.likelihood
        })).filter(d => d.region);

        // Extract available fields from the first entry
        if (parsedData.length > 0) {
          setAvailableFields(Object.keys(parsedData[0]).filter(key => key !== 'region'));
        }

        setData(parsedData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; // Exit if data is empty

    // Count occurrences of each unique value in the selected field
    const aggregatedData = data.reduce((acc, curr) => {
      const region = curr.region;
      const value = curr[selectedField]; // Dynamic value based on selected field
      if (!isNaN(value)) {
        const existingRegion = acc.find(d => d.region === region);
        if (existingRegion) {
          existingRegion.value += value;
        } else {
          acc.push({ region, value });
        }
      }
      return acc;
    }, []);

    const width = 800;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.value)(aggregatedData);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = d3.arc()
      .innerRadius(radius - 40)
      .outerRadius(radius - 40);

    d3.select(svgRef.current).selectAll("*").remove(); // Clear previous chart

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const g = svg.selectAll(".arc")
      .data(pie)
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.region))
      .on("mouseover", function (event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`${d.data.region}: ${d.data.value}`)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    g.append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text(d => d.data.region)
      .style("font-size", "12px")
      .style("text-anchor", "middle");

    // Tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  }, [data, selectedField]);

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="field-select">Select Field: </label>
        <select id="field-select" onChange={handleFieldChange} value={selectedField}>
          {availableFields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PieChart;
