// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("static/data/fluDeathDataCleaned.csv", function(fluData) {  
  
  console.log(fluData);
    fluData.forEach(function(d) {
        d["Year"] = +d["Year"];
        d["Influenza_Deaths"] = +d["Influenza_Deaths"];
      });
  // Print the tvData
  console.log(fluData[0]);


  var barSpacing = 10; // desired space between each bar
  var scaleY = .05; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (fluData.length - 1))) / fluData.length;
  
  var NOPE = +d3.max(fluData, data => data.Influenza_Deaths);
      console.log(NOPE);
  
  //start of axes
  var yScale = d3.scaleLinear()//og()
  .domain([0, NOPE])
  .range([chartHeight, 0]);

// scale x to chart width
var xScale = d3.scaleBand()
  .domain(fluData.map( data => data.Year ))
  .range([0, chartWidth]);
  

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
  .call(yAxis);
  //end of axes

  
  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
    .data(fluData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", xScale.bandwidth()- 2)
    .attr("height", d => chartHeight - yScale(d.Influenza_Deaths)) 
    .attr("x", d=> xScale(d.Year))
    .attr("y", d => yScale(d.Influenza_Deaths));
}).catch(function(error) {
  console.log(error);
});
