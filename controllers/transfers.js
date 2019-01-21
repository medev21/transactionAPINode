const mongoose = require('mongoose');
const Transfer = require('../models/transferSchema');
const User = require('../models/userSchema');

exports.transfer_get_all = (req,res,next) => {
    Transfer.find()
    .exec()
    .then(data => {
        console.log("ALL TRANSFERS", data);
        if(data.length > 0){
            res.status(200).json(data)
        }else{
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.transfer_get = (req,res,next) => {
    const transferId = req.params.transferId;

    Transfer.find({user_id: transferId})
    .exec()
    .then(data => {
        if(data){
            console.log("FROM TRANSFER COLLECTION", data);
            res.status(200).json(data);
        }else{
            res.status(404).json({message: "no valid entry found for provided id"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.transfer_create = (req,res) => {
    const transfer = new Transfer();
    transfer.user_id = req.body.user_id;
    transfer.amount = req.body.amount;
    transfer.transfer_type = req.body.transfer_type;

    transfer.save().then((data) => {
        res.status(201).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({error: err});
    });
};