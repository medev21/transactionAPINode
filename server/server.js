//server.js
const express = require('express');
const app = express();
const morgan = require('morgan'); //import morgan for HTTP logs
const bodyParser = require('body-parser'); //to read body params from requests

const userRoutes = require('./routes/users'); //import user routes

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);


module.exports = app;