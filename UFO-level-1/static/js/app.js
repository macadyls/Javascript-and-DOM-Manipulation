// from data.js
var tableData = data;

var tbody = d3.select('tbody');

// function to display all UFO sightings
function tableDisplay(ufoSighting) {
    // add row for each record
    ufoSighting.forEach( (ufoRecord) => {
        // console.log(ufoRecord);
        var row = tbody.append('tr');

        // add value for each column/key 
        Object.entries(ufoRecord).forEach( ([key, value]) => {
            // console.log(key,value);
            var cell = row.append('td');
            cell.text(value);
        });
    });
};

// function to clear table
function clearTable() {
    tbody
        .selectAll('tr').remove()
        .selectAll('td').remove();
};

// display initial table
tableDisplay(tableData);

// 'Filter Table' button
var button = d3.select('#filter-btn');

button.on('click', function() {
    // prevent the page from refreshing
    d3.event.preventDefault();

    // clear table
    clearTable();

    // Select user input element
    var dateInput = d3.select('#datetime').property('value');
    // console.log(dateInput);

    // add .trim for user friendliness
    if (dateInput.trim() === "") {
        // display initial table if input is empty
        var filteredData = tableData;
    } else {
        // filter data according to tableDisplay function and user input
        var filteredData = tableData.filter(ufoSighting => 
            ufoSighting.datetime === dateInput.trim());

    };

    // console.log(filteredData);
    tableDisplay(filteredData);
});