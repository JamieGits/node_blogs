const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');

module.exports = function () {
    var router = express.Router();
    //创建数据库
    var db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '2783gjg',
        database: 'learn'
    });

    //检查是否登录
    router.use((req, res, next) => {
        if (!req.session['admin_id'] && req.url != '/login') {
            res.redirect('/admin/login');
        } else {
            next();
        }
    });


    router.get('/login', (req, res) => {
        // res.send('我是admin');
        res.render('admin/login.ejs', {});
    });
    router.post('/login', (req, res) => {
        // console.log(req.body);
        var username = req.body.username;
        var password = common.md5(req.body.password + common.MD5_SUFFIX);
        db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('database error').end();
            } else {
                if (data.length == 0) {
                    res.status(400).send('no this admin').end();
                } else {
                    if (data[0].password == password) {
                        req.session['admin_id'] = data[0].ID;
                        res.redirect('/admin/');
                    } else {
                        res.status(400).send('this password is wrong').end();
                    }
                }
            }
        });
    });
    router.get('/', (req, res) => {
        console.log(req.url)
        res.send('你已经成功登录').end();
    });

    return router;
};