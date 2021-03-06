const express = require('express');
const consolidate = require('consolidate');
const static = require('express-static');
const mysql = require('mysql');
const common=require('./libs/common');





var server = express();
server.listen(8081);

//数据库连接
const db =mysql.createPool({
    host:'localhost',
    port:3308,
    user:'root',
    password:'123456',
    database:'blogs'
});


//配置模版引擎
//模版输出什么
    server.set('view engine', 'html');
//模版文件存放目录
server.set('views', './template');
//引用什么模版引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/', (req, res,next) => {
    db.query('select *from banner_table',(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).send('database error').end();
        }else{
            console.log(JSON.stringify(data));
            res.banner=data;
            next();
        }
    });
});
server.get('/', (req, res,next) => {
    //查询文章列表
    db.query('select *from article_table',(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).send('database error').end();
        }else{
            console.log(JSON.stringify(data));
            res.article=data;
            next();
        }
    });
});
server.get('/article',(req,res)=>{
    console.log(req.query);
    if(req.query.id) {
        db.query(`SELECT * FROM article_table WHERE id=${req.query.id}`, (err, data) => {
            if (err) {
                res.status(404).send('数据有误，请稍后再试!').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('你请求的数据不存在').end();
                } else {
                    // console.log(common.time2Date(data[0].post_time));
                    var articleData=data[0];
                    articleData.sData=common.time2Date(articleData.post_time);
                    //文章内容调整
                    articleData.content=articleData.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
                    res.render('conText.ejs', {article_data: articleData});
                }
            }
        });
    }else{
        res.status(404).send('你请求的文章不存在').end();
    }
});

server.get('/',(req,res)=>{
    res.render('index.ejs',{banner:res.banner,article:res.article});
});


//接收静态文件
server.use(static('./www'));