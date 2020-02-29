// from data.js
var tableData = data;
console.log(tableData);

// YOUR CODE HERE!
var tbody = d3.select("tbody");

data.forEach(function(alienData) {
    //console.log(alienData);
    var row = tbody.append("tr");
    Object.entries(alienData).forEach(function([key, value]) {
      var cell = row.append("td");
      cell.text(value);
    });
  });

const timebutton = d3.select("#filter-btn");
timebutton.on("click", function() {

    var dateinputValue = d3.select("#datetime").property("value");  
    var cityinputValue = d3.select("#city").property("value").toLowerCase();
    var stateinputValue = d3.select("#state").property("value").toLowerCase();
    var countryinputValue = d3.select("#country").property("value").toLowerCase();
    var shapeinputValue = d3.select("#shape").property("value").toLowerCase();
    
    inputs = [dateinputValue, cityinputValue, stateinputValue, countryinputValue, shapeinputValue];
    realinputs = inputs.filter(Boolean);

    console.log(inputs);
    console.log(realinputs);

    realinputs.forEach(function(in) {
      var filterdata = data.filter(x=>x.y === fcsz)
    });

    console.log(filterdata);

    tbody.html("");

    filterdata.forEach(function(go) {
    var row = tbody.append("tr");
    Object.entries(go).forEach(function([key, value]) {
      var cell = row.append("td");
      cell.text(value);
      console.log(value);
    });
  });
});
