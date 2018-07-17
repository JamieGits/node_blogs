const express=require('express');

module.exports=function () {
  var router=express.Router();
  router.get('/login',(req,res)=>{
      // res.send('我是admin');
      res.render('admin/login.ejs',{});
  });
  return router;
};