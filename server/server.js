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

//connect to MongoDB
mongoose.connect(`mongodb://${DBUSER}:${DBPASSWORD}@ds161794.mlab.com:61794/button`, {useNewUrlParser: true});
mongoose.Promise = global.Promise; //ignore deprecation warning
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection:'));
conn.once('open', () => {
    console.log('connected to database');
});

//set up morgan for log requests and body parser for requests
app.use(morgan('dev')); //include morgan log in app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS - prevent error 
app.use((req, res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

app.use('/api/users', userRoutes);
app.use('/api/transfers', transferRoutes);


module.exports = app;