// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var SportSchema = new Schema({
    name: { type: String, required: true }, //required: true, index: { unique: true } },
    description: { type: String, required: true },
    competencies: { type: Array, "default": [] },
    
    
    
}, { collection: 'Sports' });

module.exports = mongoose.model('Sport', SportSchema);