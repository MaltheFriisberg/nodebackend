var expresss = require('express');
var AthleteModel = require('../models/athlete.js'); // get our mongoose model
var aathleteRoutes = expresss.Router();
var tokenVerifier = require('../middlewares/tokenVerification.js');

athleteRoutes.use(tokenVerifier.tokenHandler); //load the middleware to require a token

athleteRoutes.get('/', function (req, res) {
    var appUserId = req.decoded._id;
    AthleteModel.findOne({
        appUserId: appUserId
    }, function (err, athlete) {
        if (err) throw err;
        if (!athlete) {
            res.json({message : "Could not get the athlete. Maybe you need a new token?"});
        } else if (athlete) {
            res.json({athlete});
        }
    });
    
});

aathleteRoutes.post('/', function (req, res) {
    var newAthlete = new AthleteModel( {
        appUserId: req.decoded._id,
        competencies: req.body.competencies,
        sport : req.body.sport,
        competencyRatings : req.body.competencyRatings,
        goal : req.body.goal
    });
    newAthlete.save(function (err, athlete) {
        if (athlete) {
            res.json({ athlete });
        } else {
            console.log(err);
            res.json({ error: err });
        }
    });
});

athleteRoutes.put('/', function (req, res) {
    //req.decoded._id  has the users id!!! 
    var appUserId = req.decoded._id;
    console.log(req.decoded);
    res.json({ success: true, message: '/About a birds, this endpoint requires a token' });
});

module.exports = athleteRoutes;