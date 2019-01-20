//server.js
const express = require('express');
const app = express(); //initialize express in app
const morgan = require('morgan'); //import morgan for HTTP logs
const bodyParser = require('body-parser'); //import body parser
const mongoose = require('mongoose');

require('dotenv').config();
const DBUSER = process.env.DBUSER; //import dbuser env
const DBPASSWORD = process.env.DBPASSWORD; //import dbpassword env

const userRoutes = require('./routes/users'); //import user routes
const transferRoutes = require('./routes/transfers'); //import tranfer routes

app.use(morgan('dev')); //include morgan log in app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connect to MongoDB
mongoose.connect(`mongodb://${DBUSER}:${DBPASSWORD}@ds161794.mlab.com:61794/button`, {useNewUrlParser: true});
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection:'));
conn.once('open', () => {
    console.log('connected to database');
});

app.use('/api/users', userRoutes);
app.use('/api/transfers', transferRoutes);


module.exports = app;