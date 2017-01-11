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
  var tags_init =[];
  var arry_tags =[];
  var tags_count =[];
  var category_init = [];
  var arry_category = [];
  var category_count = [];
  var articleId;
  var order = parseInt(req.query.order?req.query.order:1);

  post.find({},null,{sort:'-date'},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
    docs.forEach(function(doc){
      doc.tags.forEach(function(element){
        tags_init.push(element);
      });
      category_init.push(doc.category[0]);
      doc.content = markdown.toHTML(doc.content);
    });
    for(var i=0;i<tags_init.length;i++){
      arry_tags.push(tags_init[i]);
      tags_count[i] = 1;
      for(var m=i+1;m<tags_init.length;m++){
        if(tags_init[i] === tags_init[m]){
          tags_init.splice(m,1);
          tags_count[i]++;
          m--;
        }
      }
    }
    for(var x=0;x<category_init.length;x++){
      arry_category.push(category_init[x]);
      category_count[x] = 1;
      for(var n=x+1;n<category_init.length;n++){
        if(category_init[x] === category_init[n]){
          category_init.splice(n,1);
          category_count[x]++;
          n--;
        }
      }
    }
    if(req.query.order){
      order = parseInt(req.query.order);
    }else {
      articleId = req.query.articleId;
      for(var position = 0; position < docs.length; position++){
        if(articleId == docs[position]._id){
          order = position + 1;
        }
      }
    }


    console.log("order="+order);
    console.log(arry_tags);
    console.log(tags_count);
    //
    console.log(arry_category);
    //console.log(arry_category.length);
    console.log(category_count);
    var size = docs.length;
    res.render('article_detail', {order: order,size:size,arry_tags:arry_tags,tags_count:tags_count,arry_category:arry_category,category_count:category_count,content: docs });
  });
});
//router.post('/details',function(req,res){
//
//})

module.exports = router;
