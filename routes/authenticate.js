var express = require('express');
var app = express();
var AppUser = require('../models/user.js'); // get our mongoose model
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var authenticateRoutes = express.Router();

authenticateRoutes.post('/authenticate', function (req, res) {
    console.log('authenticating');
    //console.log(req.body.username);
    // find the user
    AppUser.findOne({
        username: req.body.username
    }, function (err, user) {
        
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                //console.log("Authenticating " + user);
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

        }

    });
});
module.exports = authenticateRoutes;