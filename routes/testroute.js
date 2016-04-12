var express = require('express');
var testRoutes = express.Router();
var tokenVerifier = require('../middlewares/tokenVerification.js');

testRoutes.get('/test1', function (req, res) {
    res.json({ message: 'welcome to the test1 endpoint' });
});
//simply add the code to authenticate BEFORE the auth protected endpoints
testRoutes.use(tokenVerifier.tokenHandler);

testRoutes.get('/protected', function (req, res) {
    res.json({ message: 'welcome to the protected endpoint' });
});

module.exports = testRoutes;
