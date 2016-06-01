// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8081; // used to create, sign, and verify tokens
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('server is connected to DB '+config.database );
});
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// apply the routes to our application with the prefix /api

var appUser = require('./routes/AppUserRoutes.js');
var athleteRoutes = require('./routes/AthleteRoutes.js');
var sportRoutes = require('./routes/SportRoutes.js');
var competencyRatingRoutes = require('./routes/competencyRatingRoutes');
//var apiDocPath = './apidoc/index.html';
//app.use('/apidoc', express.static(apiDocPath));

app.use(express.static(path.join(__dirname, 'views')));
app.get('/api', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.use('/api/competencyRating', competencyRatingRoutes);
app.use('/api/athlete', athleteRoutes);
app.use('/api/appuser', appUser);
app.use('/api/sport', sportRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);