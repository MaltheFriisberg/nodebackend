var express = require('express');

var testRoutes = express.Router();

testRoutes.get('/test1', function (req, res) {
    res.json({ message: 'welcome to the test1 endpoint' });
});
//simply add the code to authenticate BEFORE the auth protected endpoints
testRoutes.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

testRoutes.get('/protected', function (req, res) {
    res.json({ message: 'welcome to the protected endpoint' });
});

module.exports = testRoutes;
