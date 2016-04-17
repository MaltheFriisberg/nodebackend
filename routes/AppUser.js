var express = require('express');
var app = express();
var AppUser = require('../models/user.js'); // get our mongoose model
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt');
var appUserRoutes = express.Router();

appUserRoutes.post('/authenticate', function (req, res) { //get a token
    // find the user
    AppUser.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                console.log(req.body.password, isMatch);
                if (!isMatch) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var userTokenCredentials = { '_id': user._id, 'username': user.username };
                    var token = jwt.sign(userTokenCredentials, app.get('superSecret'), {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            });
        }
    });
});
appUserRoutes.post('/', function (req, res) { //register
    
    var user = req.body;
    //res.json({ username: req.body.username, password: req.body.password });
    var newUser = AppUser();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.save(function (err, user) {
        if (user) {
            res.json({ username: req.body.username, password: req.body.password });
        } else {
            console.log(err);
            res.json({ error: err });
        }
    });
});
module.exports = appUserRoutes;