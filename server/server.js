//server.js
const express = require('express');
const app = express(); //initialize express in app
const morgan = require('morgan'); //import morgan for HTTP logs
const bodyParser = require('body-parser'); //to read body params from requests

const userRoutes = require('./routes/users'); //import user routes
const transferRoutes = require('./routes/transfers'); //import tranfer routes

app.use(morgan('dev')); //include morgan log in app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/transfers', transferRoutes);


module.exports = app;