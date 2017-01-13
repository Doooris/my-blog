/**
 * Created by sitin on 17/1/10.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;
var getArry = require('./category_tags');

router.get('/category',function(req,res,next){
  var category = req.query.category;
  post.find({},null,{sort:'-date'},function(err,docs){
    if(err){
      console.error(err);
      return;
    }
    var arry_tags = getArry.getTags(docs)[0];
    var tags_count =getArry.getTags(docs)[1];
    var arry_category = getArry.getCategory(docs)[0];
    var category_count = getArry.getCategory(docs)[1];

    post.find({'category':category},null,{sort:'-date'},function(err,datas){
      var p = req.query.p?req.query.p:1;
      p = parseInt(p);
      if(err){
        console.error(err);
        return;
      }
      datas.forEach(function(data){
        data.content = markdown.toHTML(data.content);
      });
      var size = datas.length;
      var j = Math.ceil(size/8);
      console.log("size="+size+";j="+j+"p="+p);

      res.render('article_category',{title:category+'| Article | DorisBlog',name:category,size:size,j:j,p:p,arry_tags:arry_tags,tags_count:tags_count,arry_category:arry_category,category_count:category_count,content:docs,datas:datas});

    })

    console.log(arry_category);
    console.log(category_count);
  });
});
module.exports = router;
