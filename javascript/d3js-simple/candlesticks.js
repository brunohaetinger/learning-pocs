// candlestick-chart.js
console.log('working');
// Sample candlestick data
const candlestickData = [
  { date: "2022-01-01", open: 100, high: 120, low: 90, close: 110 },
  { date: "2022-01-02", open: 110, high: 130, low: 100, close: 120 },
  // Add more data points as needed
];

// Dimensions for the chart
const width = 800;
const height = 400;

// Create an SVG container
const candlesticksSvg = d3.select("candlesticks").append("svg")
            .attr("width", width)
            .attr("height", height);

// Create candlesticks
candlesticksSvg.selectAll("rect")
  .data(candlestickData)
  .enter().append("rect")
  .attr("x", (d, i) => i * (width / candlestickData.length))
  .attr("y", d => Math.min(d.open, d.close))
  .attr("width", width / candlestickData.length - 2) // Gap between candlesticks
  .attr("height", d => Math.abs(d.open - d.close))
  .attr("class", d => d.open > d.close ? "down" : "up");

// Create wicks
candlesticksSvg.selectAll("line")
  .data(candlestickData)
  .enter().append("line")
  .attr("x1", (d, i) => i * (width / candlestickData.length) + width / (2 * candlestickData.length))
  .attr("x2", (d, i) => i * (width / candlestickData.length) + width / (2 * candlestickData.length))
  .attr("y1", d => d.high)
  .attr("y2", d => d.low)
  .attr("class", "candle");
