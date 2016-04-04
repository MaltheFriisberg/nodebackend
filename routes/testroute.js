var express = require('express');

var apiRoutes = express.Router();

apiRoutes.get('/test1', function (req, res) {
    res.json({ message: 'welcome to the test1 endpoint' });
});

module.exports = apiRoutes;
