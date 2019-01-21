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
        if(data.length > 0){
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
    User.findById(req.params.userId)
    .then(user => {
        //check if user exists
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        //check if user has funds
        const delta = user.points + req.body.amount;
        console.log("delta",delta);
        if(delta < 0){
            return res.status(404).json({message: "Insufficient funds"});
        }

        const transfer = new Transfer();
        transfer.user_id = user._id;
        transfer.amount = req.body.amount;
        transfer.transfer_type = req.body.transfer_type;

        //update user's points
        try{
            user.points = delta;
            user.save(user);
        }
        catch(error){
            console.log(error);
            return res.status(500).json(error);
        }

        transfer.save()
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
};