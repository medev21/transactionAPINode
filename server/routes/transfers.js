const express = require('express');
const router = express.Router();

//get transfers
router.get('/', (req,res) => {
    res.status(200).json({
        message: 'all transfers are here'
    });
});

//get transfer id
router.get('/:transferId', (req,res) => {
    const transferId = req.params.transferId;

    res.status(200).json({
        message: 'transfer fetched',
        transferId: transferId
    });
});

module.exports = router;