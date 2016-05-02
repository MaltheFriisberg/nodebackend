var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable

module.exports = {
    tokenHandler: function (req, res, next) {
        
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['fb-access-token'];
        //console.log(token._id);

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    console.log(err);
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    //console.log(decoded._id);
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
    
};




