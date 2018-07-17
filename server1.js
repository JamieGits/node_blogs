const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerObj = multer({dest: './static/upload'});
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const consolidate = require('consolidate');
const expressRouter = require('express-route');


var server = express();
server.listen(8080);
//获取请求数据
//get自带
server.use(multerObj.any());
//cookie
server.use(cookieParser());
//session
(function () {
    var keys = [];
    for (var i = 0; i < 1000; i++) {
        keys[i] = Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20 * 60 * 1000
    }));
})();
//模版引擎
server.set('view engine', 'html');
server.set('views', 'template');
server.engine('html', consolidate.ejs);

//router
server.use('/article', require('./route/router1')());
server.use('/blog',require('./route/router2')());
//静态文件
server.use(static('./static/'));
