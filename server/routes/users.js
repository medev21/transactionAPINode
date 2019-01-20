const express = require('express');
const router = express.Router();
const User = require('../../models/userSchema');

//get users
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'hello world'
    });
});

//create user
router.post('/', (req,res,next) => {
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    user.save().then((data) => {
        console.log(data);
        res.sendStatus(201);
    })
    .catch(err => {
        res.status(400).send("unable to save to DB")
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