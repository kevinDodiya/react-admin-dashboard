import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Barchart = () => {
  const ref = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/crud/Data/fetch")
      .then(response => {
        const parsedData = response.data
          .map(d => ({
            sector: d.sector,
            intensity: +d.intensity
          }))
          .filter(d => d.sector && !isNaN(d.intensity)); 
        setData(parsedData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; 
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    d3.select(ref.current).select("svg").remove();

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.sector))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)]) 
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.sector))
      .attr("y", (d) => y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.intensity))
      .attr("fill", "#5f0f40");

  }, [data]);

  return <div ref={ref} />;
};

export default Barchart;
