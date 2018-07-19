const express = require('express');

module.exports = function () {
    var router = express.Router();

    router.get('/1.html', (req, res) => {
        res.send('我是博客').end();
    });
    router.get('/2.html', (req, res) => {
        res.send('我也是博客').end();
    });
    return router;
};