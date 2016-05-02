var expresss = require('express');
var SportModel = require('../models/sport.js'); // get our mongoose model
var sportRoutes = expresss.Router();
var tokenVerifier = require('../middlewares/tokenVerification.js');
var putHelper = require('../utility/putHelper.js');

sportRoutes.use(tokenVerifier.tokenHandler); //load the middleware to require a token

/*
 * Get an array with all Sports
 */
sportRoutes.get('/', function (req, res) {

    SportModel.find(function (err, sports) {
        if (err) throw err;
        res.send(sports);
    });

});

module.exports = sportRoutes;

