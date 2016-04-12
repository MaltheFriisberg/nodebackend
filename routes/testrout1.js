module.exports = function (app) {

    app.get('/login', function (req, res) {
        res.json({ message: 'welcome to the test1 endpoint' });
    });

    //other routes..
}