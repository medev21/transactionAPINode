const express = require('express');
const router = express.Router();
const TransferController = require('../../controllers/transfers');

//get all transfers
router.get('/', TransferController.transfer_get_all);

//create transfer
router.post('/:userId', TransferController.transfer_create);

//get tranfer by id
router.get('/:userId', TransferController.transfer_get);

module.exports = router;