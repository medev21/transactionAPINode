const express = require('express');
const router = express.Router();
const Transfer = require('../../models/transferSchema');
const TransferController = require('../../controllers/transfers');

//get all transfers
router.get('/', TransferController.transfer_get_all);

//get tranfer by id
router.get('/:transferId', TransferController.transfer_get);

//create transfer
router.post('/:transferId', TransferController.transfer_create);
// router.post('/:transferId', (req,res) => {
//     const transfer = new Transfer();
//     transfer.user_id = req.body.user_id;
//     transfer.amount = req.body.amount;
//     transfer.transfer_type = req.body.transfer_type;

//     transfer.save().then((data) => {
//         res.status(201).send("save to db");
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(400).send("unable to save to DB")
//     });
// });

module.exports = router;