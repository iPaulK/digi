const express = require('express');
const app = express(); // create our app w/ express
const mongodb = require('mongodb');

const port = process.env.PORT || 8080; // set the port

const db = require('./config/db'); // load the database config
const client = mongodb.MongoClient;

client.connect(db.connectionString, function(err, db) {
    if(err) {
        console.log('database is not connected', err)
    }
    else {
        console.log('connected!!')
    }
});

app.get('/', function(req, res) {
    res.json({"hello": "world"});
});

// start server
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});