/**
 * Created by sitin on 16/12/18.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;
//var duoshuo = require('duoshuo');
//
//var duoshuo = new Duoshuo({
//  short_name: 'abc', // 站点申请的多说二级域名。
//  secret: 'xxx' // 站点密钥
//})

router.get('/details', function(req, res, next) {
  var order = parseInt(req.query.order);
  post.find({},null,{sort:'-date'},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
    var size = docs.length;
    docs.forEach(function (doc){
      doc.content = markdown.toHTML(doc.content);
    });
    console.log("order="+order);
    res.render('article_detail', {order: order,size:size,content: docs });
  });
});
//router.post('/details',function(req,res){
//
//})

module.exports = router;
