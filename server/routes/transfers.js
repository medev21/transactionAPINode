const express = require('express');
const router = express.Router();
const Transfer = require('../../models/transferSchema');

//get transfers
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'all transfers are here'
    });
});

//get transfer id
router.get('/:transferId', (req,res,next) => {
    const transferId = req.params.transferId;

    Transfer.find({user_id: transferId})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: error})
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