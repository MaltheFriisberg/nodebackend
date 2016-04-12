var expresss = require('express');
var birdRoutes = expresss.Router();
var tokenVerifier = require('../middlewares/tokenVerification.js');

// middleware that is specific to this router
/*birdRoutes.use(function timeLog(req, res, next) {
    console.log("birdroutes");
    console.log('Time: ', Date.now());
    next();
});*/

// define the home page route
birdRoutes.get('/', function (req, res) {
    res.json({ success: false, message: 'Hi from the birdRoute' });
});
birdRoutes.use(tokenVerifier.tokenHandler);
// define the about route
birdRoutes.get('/about', function (req, res) {
    res.json({ success: false, message: '/About a birds' });
});

module.exports = birdRoutes;