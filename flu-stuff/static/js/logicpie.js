// Creating map object

  d3.csv('static/data/states_urban_percent.csv', function(data) {
    console.log(data)
    var i;
    for (i = 0; i < data.length; i++) {
      var trace1 = {
        labels: ["Urban", "Rural"],
        values: [data[i].urban, 100-data[i].urban],
        text: data[i].state,
        type: 'pie'
      };
      var layout = {
        title: "Pie of Flu Activity",
      };
  
      Plotly.newPlot("pieplot", [trace1], layout);
    };
  });