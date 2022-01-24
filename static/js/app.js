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

    // if input is empty, display all data
    var filteredData = tableData;
    
    // select class within the form
    var inputId = document.getElementsByClassName("form-control");

    // for each input field
    for (var i = 0; i < inputId.length; i++) {
        // 
        var idName = inputId[i].id;
        var fieldInput = d3.select('#' + idName).property('value');
        // console.log(fieldInput);

        // only filter if input is not empty
        if (fieldInput.trim() !== "") {
            // filter data and convert field name using .toUpperCase()
            // use same filteredData to ensure continuous filtering
            var filteredData = filteredData.filter(ufoSighting =>
                ufoSighting[idName].toUpperCase().trim() ===
                fieldInput.toUpperCase().trim());
        };
    };

    // console.log(filteredData);
    tableDisplay(filteredData);
});
