const mongoose = require('mongoose'); //import mongoose
const Schema = mongoose.Schema; //initialize schema

//set type for each param
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    points: {type: Number, default: 0},
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);