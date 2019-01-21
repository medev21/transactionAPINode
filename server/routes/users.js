const express = require('express');
const router = express.Router();
const User = require('../../models/userSchema');
const UserController = require('../../controllers/users');

//get users
router.get('/', UserController.users_get_all);

//create user
router.post('/', UserController.users_create);

//get user
router.get('/:userId', UserController.user_get);

//delete user
router.delete('/:userId', UserController.user_delete);

// update user
// router.patch('/:userId', (req,res) => {
//     const userId = req.params.userId;

//     res.status(200).json({
//         message: "user fetched",
//         userId: userId
//     });
// });

module.exports = router;