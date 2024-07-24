import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const Linechart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [xField, setXField] = useState('region'); 
  const [yField, setYField] = useState('intensity'); 
  const [availableFields, setAvailableFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/crud/Data/fetch");
        const parsedData = response.data
          .map(d => ({
            end_year: d.end_year,
            intensity: +d.intensity,
            region: d.region,
            start_year: d.start_year,
            impact: d.impact,
            country: d.country,
            relevance: +d.relevance,
            pestle: d.pestle,
            source: d.source,
            title: d.title,
            likelihood: +d.likelihood
          }))
          .filter(d => d.region && !isNaN(d.intensity));

        setData(parsedData);

        if (parsedData.length > 0) {
          setAvailableFields(Object.keys(parsedData[0]).filter(key => key !== 'region'));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0 || !xField || !yField) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };

    const x = d3.scalePoint()
      .domain(data.map(d => d[xField]))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yField])]).nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(d[xField]))
      .y(d => y(d[yField]))
      .defined(d => !isNaN(d[yField]));

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); 

    svg.append("path")
      .data([data])
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Y Axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [data, xField, yField]);

  return (
    <div>
      <div>
        <label htmlFor="x-axis-select">X Axis: </label>
        <select
          id="x-axis-select"
          value={xField}
          onChange={(e) => setXField(e.target.value)}
        >
          {['region', ...availableFields].map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="y-axis-select">Y Axis: </label>
        <select
          id="y-axis-select"
          value={yField}
          onChange={(e) => setYField(e.target.value)}
        >
          {availableFields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>
      <svg ref={svgRef} />
    </div>
  );
};

export default Linechart;
