// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
//var config = require('../config');
//var SecretSalt = config.secretSalt;

// set up a mongoose model and pass it using module.exports
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true }
    //role: String
    //admin: Boolean
}, { collection: 'AppUser' }); //by deafault mongoose will pluralize collection names (flertal)..
UserSchema.path('username').index({ unique: true }); //unique fields
UserSchema.path('email').index({ unique: true });
UserSchema.pre('save', function (next) {
    var AppUser = this;

    // only hash the password if it has been modified (or is new)
    if (!AppUser.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, SecretSalt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(AppUser.password, SecretSalt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            AppUser.password = hash;
            next();
        });
    });


});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) { //returns true if the candidate password matches the bcrypt hashed one
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('AppUser', UserSchema);