var mysql = require("mysql");
var config = require("./config");

const connection = mysql.createConnection(config.db);

function connect() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

function endConnection() {
    connection.end(function(err) {
        // The connection is terminated now
    });
}

function queryCallback(sql, callback) {
    connection.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function query(sql) {
    console.log("test")

    connection.query(sql, function (err, result) {

        if (err) throw err;
        console.log(result)

        console.log("query success");
    });
}

function queryValues(sql, values) {
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}

async function fetchData() {
    connect();

    console.log("test");
    const pullRequests = await query("SELECT * FROM pull_request")
    console.log("pull requests", pullRequests);

    const tableBody = document.getElementById('tableBody');


    pullRequests.forEach(pr => {
        const row = document.createElement('tr');

        Object.keys(pr).forEach(key => {
          const cell = document.createElement('td');
          cell.id = key;
          cell.textContent = pr[key];
          row.appendChild(cell);
        });
    
        tableBody.appendChild(row);
    })

    endConnection();

}
/*

async function fetchData() {
    const res=await fetch ("https://api.coronavirus.data.gov.uk/v1/data");
    const record=await res.json();
    document.getElementById("date").innerHTML=record.data[0].date;
    document.getElementById("areaName").innerHTML=record.data[0].areaName;
    document.getElementById("latestBy").innerHTML=record.data[0].latestBy;
    document.getElementById("deathNew").innerHTML=record.data[0].deathNew;
}
*/

fetchData();
