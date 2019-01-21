const mongoose = require('mongoose'); //import mongoose
const Schema = mongoose.Schema; //initialize schema

//set types for each transfer param
const transferSchema = new Schema({
    user_id: {type: String, required: true},
    amount: {type: Number, default: 0},
    transfer_type: {type: String, default: "n/a"},
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Transfer', transferSchema);