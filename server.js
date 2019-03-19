const express = require('express');
const app = express(); // create our app w/ express

const port = process.env.PORT || 8080; // set the port

// start server
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});