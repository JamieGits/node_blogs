const express = require('express');


module.exports = function () {
    var router = express.Router();
    router.get('/1.html', (req, res) => {
        // res.send('我是文章').end();
        res.render('2.ejs', {title: '测测', a: 12, b: 3})
    });
    router.get('/2.html', (req, res) => {
        res.send('我也是文章').end();
    });
    return router;
};