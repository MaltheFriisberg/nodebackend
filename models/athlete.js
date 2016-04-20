// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var config = require('../config');
//var SecretSalt = config.secretSalt;

// set up a mongoose model and pass it using module.exports
var AthleteSchema = new Schema({
    appUserId: { type: int, required: true, index: { unique: true } },
    competencies : { type : Array , "default" : [] },
    sport: { type: String, required: true },
    competencyRatings: [{ type: ObjectId, ref: 'CompetencyRating' }], //http://stackoverflow.com/questions/22244421/how-to-create-mongoose-schema-with-array-of-object-ids
    goal: {type: String, required: true}
}, { collection: 'Athlete' }); //by deafault mongoose will pluralize collection names (flertal)..
AthleteSchema.path('username').index({ unique: true }); //unique fields

AthleteSchema.pre('save', function (next) {
    var athlete = this;

    if (athlete.competencies.length < 15) {
        next();
    }
        

});

module.exports = mongoose.model('Athlete', AthleteSchema);