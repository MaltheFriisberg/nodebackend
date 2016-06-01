var expresss = require('express');
var AthleteModel = require('../models/athlete.js'); // get our mongoose model
var athleteRoutes = expresss.Router();
var tokenVerifier = require('../middlewares/tokenVerification.js');
var putHelper = require('../utility/putHelper.js');

athleteRoutes.use(tokenVerifier.tokenHandler); //load the middleware to require a token

athleteRoutes.get('/', function (req, res) {
    var appUserId1 = req.decoded._id;
    
    AthleteModel.findOne({
        appUserId: appUserId1
    }, function (err, athlete) {
        if (err) throw err;
        if (!athlete) {
            res.json({success:false, message : "Could not get the athlete. Are you sure there is an athlete for the appUserId? "+appUserId1+ " username "+ req.decoded.username});
        } else if (athlete) {
            res.json({ success: true, athlete:athlete });
        }
    });
    
});

athleteRoutes.post('/', function (req, res) {
	console.log(req.decoded._id);
    //console.log(req.body.appUserId);
    var newAthlete = new AthleteModel( {
        appUserId: req.decoded._id,
        competencies: req.body.competencies,
        sport : req.body.sport,
        //competencyRatings : req.body.competencyRatings,
        goal : req.body.goal
    });
    newAthlete.save(function (err, athlete) {
        if (athlete) {
			console.log(athlete);
            res.json( athlete );
        } else {
            console.log(err);
            res.json({ error: err });
        }
    });
});

athleteRoutes.put('/', function (req, res) {
    
    AthleteModel.findOne({ appUserId: req.decoded._id }, function (err, athlete) {
        if (err) {
            res.send(err);
        } else {
            putHelper.updateDocument(athlete, AthleteModel, req.body);
        }
        athlete.save();
        res.send(athlete);
        
    });
});

module.exports = athleteRoutes;