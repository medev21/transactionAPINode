const express = require('express');
const router = express.Router();

//get users
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'hello world'
    });
});

//create user
router.post('/', (req,res,next) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        points: 0
    }
    res.status(201).json({
        message: 'creating an user....',
        user: user
    });
});

//get user
router.get('/:userId', (req,res) => {
    const userId = req.params.userId;

    res.status(200).json({
        message: "user fetched",
        userId: userId
    });
});

//update user
router.patch('/:userId', (req,res) => {
    const userId = req.params.userId;

    res.status(200).json({
        message: "user fetched",
        userId: userId
    });
});

router.delete('/:userId',(req,res) => {
    const userId = req.params.userId;

    res.status(200).json({
        message: "user fetched",
        userId: userId
    });
});
module.exports = router;