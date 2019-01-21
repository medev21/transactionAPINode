const express = require('express');
const router = express.Router();
const TransferController = require('../../controllers/transfers');

//get all transfers
router.get('/', TransferController.transfer_get_all);

//get tranfer by id
router.get('/:transferId', TransferController.transfer_get);

//create transfer
router.post('/:userId', TransferController.transfer_create);

module.exports = router;