const User = require('../models/userSchema');

exports.users_get_all = (req,res,next) => {
    User.find()
    .exec()
    .then(data => {
        // console.log("ALL USERS GET", data);
        if(data.length > 0){
            res.status(200).json(data)
        }else{
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({error: err});
    });
};

exports.users_create = (req,res) => {
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    user.save().then((data) => {
        // console.log(data);
        res.status(201).json(data);
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({error: err})
    });
};

exports.user_get = (req,res,next) => {
    const userId = req.params.userId;

    User.findById(userId)
    .exec()
    .then(data => {
        if(data){
            // console.log('USER DATA', data);
            res.status(200).json(data);
        }else{
            res.status(404).json({message: "no valid entry found for provided user id"})
        }
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({error: err})
    });
};

// exports.user_delete = (req,res) => {
//     const userId = req.params.userId;

//     User.deleteOne({_id: userId})
//     .exec()
//     .then(result => {
//         res.status(200).json(result);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err})
//     });
// };