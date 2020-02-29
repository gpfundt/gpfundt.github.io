// Creating map object

var myMap = L.map('map').setView([37.8, -96], 3);

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

function getData(dataset) {
  var geodata = [];
    switch (dataset) {
    case "0809":
      geodata = "static/data/flu_act2008-09.json";
      break;
    case "0910":
      geodata = "static/data/flu_act2009-10.json";
      break;
    case "1011":
      geodata = "static/data/flu_act2010-11.json";
      break;
    case "1112":
      geodata = "static/data/flu_act2011-12.json";
      break;
    case "1213":
      geodata = "static/data/flu_act2012-13.json";
      break;
    case "1314":
      geodata = "static/data/flu_act2013-14.json";
      break;
    case "1415":
      geodata = "static/data/flu_act2014-15.json";
      break;
    case "1516":
      geodata = "static/data/flu_act2015-16.json";
      break;
    case "1617":
      geodata = "static/data/flu_act2016-17.json";
      break;
    case "1718":
      geodata = "static/data/flu_act2017-18.json";
      break;
    case "1819":
      geodata = "static/data/flu_act2018-19.json";
      break;
    case "1920":
      geodata = "static/data/flu_act2019-20.json";
      break;
    default:
      geodata = "static/data/flu_act2008-09.json";
    };
    buildMap(geodata);
  };

function buildMap(newdata){
  d3.json(newdata, function(geodata){
    console.log(newdata);
    L.choropleth(geodata, { 
      valueProperty :'fluactivity',
      scale: ["green","yellow", "red"],
      steps: 11,
      mode: 'q',
      style: {
        color: '#fff',
        weight: 1,
        fillOpacity: 0.8
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<br>Flu Level (0-10) :<br>" + feature.properties.fluactivity + 
          '<br> Urban % : <br>' + feature.properties.urban +
          '<br>'+ "<div id='pieplot'></div");
          function BuildPlot(){
            var trace1 = {
              labels: ["Urban", "Rural"],
              values: [feature.properties.urban, 100-feature.properties.urban],
              type: 'pie'
            };
            var layout = {
              title: "Pie of State Urban Density",
            };
            Plotly.newPlot("pieplot", [trace1], layout);
          layer.on({
              click: BuildPlot
          });
        };
      }
    }).addTo(myMap);
  
  });
};