const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/* GET home page. */
router.post('/register', function (req, res, next) {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({ email: newUser.email })
        .then(user => {
            if (user) {
                return res.status(404).json({ "error": "This email is already taken!" });
            }

            newUser.password = bcrypt.hashSync(newUser.password, 12);
            return newUser.save();

        }, err => console.log(err))
        .then(user => {
            if (user._doc) {
                user._doc.password = null;
                return res.json(user._doc);
            }
            return null;
        }, err => console.log(err))
        .catch(err => {
            throw err;
        });
});


router.post('/login', function (req, res, next) {
    const currentUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({ email: currentUser.email })
    .then(user => {
        if (!user) {
            return res.status(404).json({ "error": "Auth Error!" });
        }

       if (!bcrypt.compareSync(currentUser.password, user._doc.password)) {
            return res.status(404).json({ "error": "Auth Error!" });
       } else {

           let userObj = {
               ...user._doc,
                password: null
            }

           let token = jwt.sign(userObj, process.env.passport_secret, { expiresIn: '1h' });
           let resObj = {
               success: true,
               token: 'Bearer ' + token,
               user: userObj
           }
           res.json(resObj);
       }

    }, err => console.log(err))
    .catch(err => console.log(err));
})

module.exports = router;