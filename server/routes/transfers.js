const express = require('express');
const router = express.Router();
const Transfer = require('../../models/transferSchema');

//get transfers
router.get('/', (req,res,next) => {
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
});

//get transfer id
router.get('/:transferId', (req,res,next) => {
    const transferId = req.params.transferId;

    Transfer.find({user_id: transferId})
    .exec()
    .then(data => {
        if(data){
            console.log("From database", data);
            res.status(200).json(data);
        }else{
            res.status(404).json({message: "no valid entry found for provided id"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//create transfer
router.post('/:transferId', (req,res) => {
    const transfer = new Transfer();
    transfer.user_id = req.body.user_id;
    transfer.amount = req.body.amount;
    transfer.transfer_type = req.body.transfer_type;

    transfer.save().then((data) => {
        res.status(201).send("save to db");
    })
    .catch(err => {
        console.log(err);
        res.status(400).send("unable to save to DB")
    });
});

module.exports = router;