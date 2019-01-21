const express = require('express');
const router = express.Router();
const User = require('../../models/userSchema');

//get users
router.get('/', (req,res,next) => {
    User.find()
    .exec()
    .then(data => {
        console.log("ALL USERS GET", data);
        if(data.length > 0){
            res.status(200).json(data)
        }else{
            res.status(404).json({
                message: 'No entries found'
            });
        }
        res.status(200).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
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
        res.status(201).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
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
// router.patch('/:userId', (req,res) => {
//     const userId = req.params.userId;

//     res.status(200).json({
//         message: "user fetched",
//         userId: userId
//     });
// });

router.delete('/:userId',(req,res) => {
    const userId = req.params.userId;

    User.remove({_id: userId})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});
module.exports = router;