// Creating map object

var myMap2 = L.map('map2').setView([37.8, -96], 3);

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap2);

function getData2(dataset2) {
  var geodata2 = [];
    switch (dataset2) {
    case "0910":
      geodata2 = "static/data/imz2009-10.json";
      break;
    case "1011":
      geodata2 = "static/data/imz2010-11.json";
      break;
    case "1112":
      geodata2 = "static/data/imz2011-12.json";
      break;
    case "1213":
      geodata2 = "static/data/imz2012-13.json";
      break;
    case "1314":
      geodata2 = "static/data/imz2013-14.json";
      break;
    case "1415":
      geodata2 = "static/data/imz2014-15.json";
      break;
    case "1516":
      geodata2 = "static/data/imz2015-16.json";
      break;
    case "1617":
      geodata2 = "static/data/imz2016-17.json";
      break;
    case "1718":
      geodata2 = "static/data/imz2017-18.json";
      break;
    case "1819":
      geodata2 = "static/data/imz2018-19.json";
      break;
    default:
      geodata2 = "static/data/imz2008-09.json";
    };
    buildMap2(geodata2);
  };

function buildMap2(newdata2){
  d3.json(newdata2, function(geodata2){
    console.log(newdata2);
    L.choropleth(geodata2, { 
      valueProperty :'imzactivity',
      scale: ["green","yellow", "red"],
      steps: 11,
      mode: 'q',
      style: {
        color: '#fff',
        weight: 1,
        fillOpacity: 0.8
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<br>Flu Immunization Coverage :<br>" + feature.properties.imzactivity);
      }  
    }).addTo(myMap2);
  });
};
