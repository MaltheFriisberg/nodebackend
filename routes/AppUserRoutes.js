var express = require('express');
var app = express();
var AppUser = require('../models/appuser.js'); // get our mongoose model
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt');
var appUserRoutes = express.Router();
/**
 * @api {GET} /appuser/authenticate/facebook Request an access token
 * @apiName Authenticate
 * @apiGroup AppUser
 *
 * @apiHeader {string} username Username in plaintext
 * @apiHeader {string} facebook oath token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *       "message": "enjoy your token",
 *       "token": "/&/&87dsasdjdsa0!adsjkl"
 *     }
 */

appUserRoutes.get('/authenticate/facebook', function (req, res) {
    
    console.log(req.get("FacebookId"));
    console.log(req.get("username"));
    AppUser.findOne({
        //username: req.get("username"),
        facebookId: req.get("FacebookId"),
    }, function (err, user) {
        console.log(user);
        if (err) throw err;
        if (!user) {
            res.json({success: false, message:"User not found"});
        } else {
            var userTokenCredentials = { '_id': user._id, 'username': user.username };
            var token = jwt.sign(userTokenCredentials, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
            });
            res.json({ success: true, token: token });
        }
    });
        
});
/**
 * @api {GET} /appuser/authenticate Request an access token
 * @apiName Authenticate
 * @apiGroup AppUser
 *
 * @apiHeader {string} username Username in plaintext
 * @apiHeader {string} password Password in plaintext
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *       "message": "enjoy your token",
 *       "token": "/&/&87dsasdjdsa0!adsjkl"
 *     }
 */
appUserRoutes.get('/authenticate', function (req, res) { //get a token
    console.log(req.get("username"));
    //console.log(req.get("password"));
    console.log(req.get("FacebookId"));

    
    // find the user
    AppUser.findOne({
        username: req.get("username")
    }, function (err, user) {
        if (err) throw err;
        
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            user.comparePassword(req.get("password"), function (err, isMatch) {
                if (err) throw err;
                console.log(req.get("password"), isMatch);
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

/**
 * @api {post} /appuser Register a new user
 * @apiName AppUser
 * @apiGroup AppUser
 *
 * @apiParam {string} username Username in plaintext
 * @apiParam {string} password Password in plaintext
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *       "message": "enjoy your token",
 *       "token": "/&/&87dsasdjdsa0!adsjkl"
 *     }
 */
appUserRoutes.post('/', function (req, res) { //register
    
    var user = req.body;
    console.log(user);
    //res.json({ username: req.body.username, password: req.body.password });
    var newUser = AppUser();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    if (req.body.FbUser) {
        newUser.facebookId = req.body.facebookId;
        newUser.faceBookUser = true;
    }
    newUser.save(function (err, user) {
        if (user) {
            res.json({ username: req.body.username, password: req.body.password });
        } else {
            console.log(err);
            res.json({ error: err });
        }
    });
});
appUserRoutes.post('/facebook', function (req, res) { //register

    var user1 = req.body;
    console.log(user1);
    //res.json({ username: req.body.username, password: req.body.password });
    var newUser = AppUser();
    newUser.facebookId = req.body.FacebookId;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.gender = req.body.gender;

    //newUser.facebookToken = req.body.facebookToken;
    console.log(newUser);
    newUser.save(function (err, user) {
        if (user) {
            var userTokenCredentials = { '_id': user._id, 'username': user.username };
            var token = jwt.sign(userTokenCredentials, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.json({ username: req.body.username, token });
        } else {
            console.log(err);
            res.json({ error: err });
        }
    });
});
module.exports = appUserRoutes;