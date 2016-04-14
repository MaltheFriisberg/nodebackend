// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('AppUser', new Schema({
    username: String,
    password: String,
    role: String
    //admin: Boolean
}, { collection: 'AppUser' })); //by deafault mongoose will pluralize collection names (flertal)..