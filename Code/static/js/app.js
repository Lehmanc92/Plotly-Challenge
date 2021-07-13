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

    // Defining variable for the current subject selected

    var currentSubject = dropDown.property("value");
    console.log(currentSubject);

    var samples = data.samples;
    var metadata = data.metadata;

    // Grabbing corresponding OTU values from top 10 Sample values 

    // Creating empty variables for forEach loop
    var currentID;
    var currentMetadata;
    var currentNames;

    samples.forEach( sample => {
        if (sample.id == currentSubject) {
            currentID = sample.id
        }
        // console.log(currentID)
    });

    metadata.forEach( metadatum => {
        if (metadatum.id == currentSubject) {
            currentMetadata = metadatum           
        }
        // console.log(currentMetadata)
    });

    // Dynamically updating HTML

    d3.select("#sample-metadata").html("");

    for (item in currentMetadata) {
        d3.select("#sample-metadata").append("ul").text(item + ": " + currentMetadata[item]);
    }


});

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
