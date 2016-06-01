var expresss = require('express');
var CompetencyRatingModel = require('../models/competencyRating.js'); // get our mongoose model
var competencyRatingRoutes = expresss.Router();
var tokenVerifier = require('../middlewares/tokenVerification.js');
var putHelper = require('../utility/putHelper.js');

competencyRatingRoutes.use(tokenVerifier.tokenHandler); //load the middleware to require a token

competencyRatingRoutes.get('/', function (req, res) {
    var appUserId1 = req.decoded._id;
    
    CompetencyRatingModel.findOne({
        appUserId: appUserId1
    }, function (err, competencyRating) {
        if (err) throw err;
        if (!competencyRating) {
            res.json({success:false, message : "Could not get the competencyRatings. Are you sure there is an competencyRating for the appUserId? "+appUserId1+ " username "+ req.decoded.username});
        } else if (competencyRating) {
            res.json({competencyRating});
        }
    });
    
});

competencyRatingRoutes.post('/', function (req, res) {
    console.log(req.body.appUserId);
    var CompetencyRatingModel = new CompetencyRatingModel( {
        appUserId: req.body.appUserId,
        competencies: req.body.competencies,
        
    });
    CompetencyRatingModel.save(function (err, competencyRating) {
        if (competencyRating) {
            res.json( competencyRating );
        } else {
            console.log(err);
            res.json({ error: err });
        }
    });
});

/*competencyRatingRoutes.put('/', function (req, res) {
    
    AthleteModel.findOne({ appUserId: req.decoded._id }, function (err, athlete) {
        if (err) {
            res.send(err);
        } else {
            putHelper.updateDocument(athlete, AthleteModel, req.body);
        }
        athlete.save();
        res.send(athlete);
        
    });
});*/

module.exports = competencyRatingRoutes;