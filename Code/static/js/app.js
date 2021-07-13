// Importing JSON data

const url = "samples.json";

const dataPromise = d3.json(url);

// Fetch the JSON data
d3.json(url).then(function(data) {
    console.log(data);

    // Establishing Variables

    var dropDown = d3.select("#selDataset");
    var sampleName = data.names;
    
    sampleName.forEach(function(sample) {
        dropDown.append("option").text(sample).property("value", sample);
    });

    // Grabbing corresponding OTU values from top 10 Sample values

    var top10OTU = data.otu_ids.slice(0, 10);
    console.log(top10OTU);
    



});

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
