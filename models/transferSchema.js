const mongoose = require('mongoose'); //import mongoose
const Schema = mongoose.Schema; //initialize schema

//set types for each transfer param
const transferSchema = new Schema({
    user_id: {type: String, required: true},
    amount: Number,
    transfer_type: String,
    update: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Transfer', transferSchema);