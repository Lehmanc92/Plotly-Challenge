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
            currentID = sample
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

// -------------------------------------------------------------------

    // Capturing data for Bar Chart

    console.log(currentID);
    otuID = currentID.otu_ids;
    otuValues = currentID.sample_values;
    otuLabels = currentID.otu_labels;

    top10OTUids = otuID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    top10OTUvalues = otuValues.slice(0,10).reverse();
    top10OTUlabels = otuLabels.slice(0,10).reverse(); 

    // console.log(top10OTUlabels);

    // Creating Bar Chart

    var bar_data = [
        {
            y:top10OTUids,
            x:top10OTUvalues,
            text:top10OTUlabels,
            type:"bar",
            orientation: "h"
        }
    ];

    var bar_layout = {
        title: "Top 10 Bacteria Cultures Observed"
    };

    Plotly.newPlot("bar", bar_data, bar_layout);

// -------------------------------------------------------------------

    // Bubble Chart

    var bubble_data = {
        x: otuID,
        y: otuValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            color: otuID,
            size: otuValues
        }
    };

    var bubble_layout = {
        showlegend: false
    };

    Plotly.newPlot("bubble", [bubble_data], [bubble_layout]);

    console.log(otuID);
    console.log(otuValues);
    console.log(otuLabels);




});

