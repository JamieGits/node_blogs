const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');

module.exports = function () {
    var router = express.Router();
    //创建数据库
    var db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        port: 3308,
        password: '123456',
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
        res.render('admin/login.ejs', {});
    });
    router.post('/login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var password = common.md5(password + common.MD5_SUFFIX);
        db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('database error').end();
            } else {
                if (data.length == 0) {
                    res.status(400).send('no this admin').end();
                } else {
                    if (data[0].password == password) {
                        //成功
                        req.session['admin_id'] = data[0].id;
                        res.redirect('/admin');
                    } else {
                        res.status(400).send('this password is wrong').end();
                    }
                }
            }
        });
    });
    router.get('/', (req, res) => {
        res.render('admin/index.ejs', {});
    });

    router.get('/banners', (req, res) => {
        switch (req.query.act) {
            case 'mod':
                break;
            case 'del':
                db.query(`delete from banner_table where id=${req.query.id}`,(err,data)=>{
                    if(err){
                        console.error(err);
                        res.status(400).send('del error').end();
                    }else{
                        res.redirect('?');
                    }
                });
                break;
            default:
                db.query('select *from banner_table', (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(400).send('database error').end();
                    } else {
                        res.render('admin/banners.ejs', {banners: data});
                    }
                });
        };

    });

    router.post('/admin/banners', (req, res) => {
        console.log(req.body)
        var title = req.body.title;
        var description = req.body.description;
        var href = req.body.href;
        if (!title || !description || !href) {
            res.status(400).send('arg error').end();
        } else {
            db.query(`insert into banner_table(title,description,href)value('${title}',
            '${description}','${href}')`, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('database error').end();
                } else {
                    res.redirect('/admin//banners');
                }
            });
        }
        ;
    });
    return router;
};