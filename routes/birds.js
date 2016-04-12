var expresss = require('express');
var birdRoutes = expresss.Router();
var tokenVerifier = require('../middlewares/tokenVerification.js');

// define the home page route
birdRoutes.get('/', function (req, res) {
    res.json({message: 'Hi from the birdRoute' });
});
//load the middleware to require a token
birdRoutes.use(tokenVerifier.tokenHandler);
// define the about route
birdRoutes.get('/about', function (req, res) {
    res.json({ success: false, message: '/About a birds, this endpoint requires a token' });
});

module.exports = birdRoutes;