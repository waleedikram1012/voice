import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function MetricsVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cpuUsage, setCpuUsage] = useState(32);
  const [ramUsage, setRamUsage] = useState(45);
  const [batteryLevel, setBatteryLevel] = useState(88);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(10, Math.min(100, prev + (Math.random() * 20 - 10))));
      setRamUsage(prev => Math.max(20, Math.min(90, prev + (Math.random() * 5 - 2.5))));
      setBatteryLevel(prev => Math.max(0, prev - (Math.random() * 0.1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = 300;
    
    d3.select(containerRef.current).selectAll("*").remove();
    
    const svg = d3.select(containerRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Add grids
    const gridColor = "rgba(0, 209, 255, 0.1)";
    for(let i=0; i<height; i+=30) {
      svg.append("line")
        .attr("x1", 0).attr("y1", i)
        .attr("x2", width).attr("y2", i)
        .attr("stroke", gridColor).attr("stroke-dasharray", "4,4");
    }

    const drawGauge = (x: number, y: number, radius: number, value: number, color: string, label: string) => {
      const g = svg.append("g").attr("transform", `translate(${x},${y})`);
      
      // Background arc
      const arcBg = d3.arc()
        .innerRadius(radius - 10)
        .outerRadius(radius)
        .startAngle(-Math.PI / 1.5)
        .endAngle(Math.PI / 1.5);
        
      g.append("path")
        .attr("d", arcBg as any)
        .attr("fill", "rgba(0, 66, 90, 0.5)");

      // Value arc
      const arcVal = d3.arc()
        .innerRadius(radius - 10)
        .outerRadius(radius)
        .startAngle(-Math.PI / 1.5)
        .endAngle(-Math.PI / 1.5 + (value / 100) * (Math.PI / 0.75));

      g.append("path")
        .attr("d", arcVal as any)
        .attr("fill", color)
        .style("filter", `drop-shadow(0 0 5px ${color})`);

      // Text
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .attr("fill", "#fff")
        .attr("font-size", "24px")
        .attr("font-weight", "bold")
        .text(`${Math.round(value)}%`);

      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", radius + 20)
        .attr("fill", "#00D1FF")
        .attr("font-size", "12px")
        .attr("letter-spacing", "2px")
        .text(label);
    };

    drawGauge(width / 6, 120, 60, cpuUsage, "#00FF94", "CPU LOAD");
    drawGauge(width / 2, 120, 80, ramUsage, "#00D1FF", "RAM USAGE");
    drawGauge(width * 5/6, 120, 60, batteryLevel, "#FF4B4B", "BATTERY");

  }, [cpuUsage, ramUsage, batteryLevel]);

  return (
    <div className="bg-[#00D1FF]/5 border border-[#00D1FF]/20 p-6 my-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D1FF]/50 to-transparent"></div>
      <h3 className="text-xs font-bold text-[#00D1FF] uppercase tracking-widest mb-4 flex items-center">
        <span className="w-2 h-2 bg-[#00FF94] rounded-full mr-2 animate-pulse"></span>
        Live System Telemetry
      </h3>
      <div ref={containerRef} className="w-full h-[300px]"></div>
    </div>
  );
}
