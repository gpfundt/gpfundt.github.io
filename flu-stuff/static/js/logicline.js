// Creating map object
d3.csv('static/data/flu_weeks_seasons.csv', function(data) {

  var data_range = data.length;
  var xaxis = Array.from(Array(data_range).keys())

  var trace1 = {
    x: data.map(row => row.x),
    y: data.map(row => row.actlevel),
    text: data.map(row => row.x),
    type: 'scatter'
  };


  // Apply the group barmode to the layout
  var layout = {
    title: "Scatter of Flu Activity",
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", [trace1], layout);
});