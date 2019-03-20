require('rootpath')();

const express = require('express');
const app = express(); // create our app w/ express
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./modules/core/helpers/error');

const port = process.env.PORT || 3000; // set the port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/api/v1/users', require('./modules/users/users.controller'));
app.use('/api/v1/auth', require('./modules/users/auth.controller'));

// error handler
app.use(errorHandler);

// start server
app.listen(port);