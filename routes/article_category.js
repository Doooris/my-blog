/**
 * Created by sitin on 17/1/10.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;

router.get('/category',function(req,res,next){
    var tags_init =[];
    var arry_tags =[];
    var tags_count =[];
    var category_init = [];
    var arry_category = [];
    var category_count = [];
    var category = req.query.category;
    //var allArticles = [];
    var category_search = [];
  post.find({},null,{sort:'-date'},function(err,allArticle){
    if(err){
      console.error(err);
      return;
    }
    //allArticles = allArticle;
    allArticle.forEach(function(article){
      article.tags.forEach(function(element){
        tags_init.push(element);
      });
      category_init.push(article.category[0]);
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
    post.find({'category':category},null,{sort:'-date'},function(err,docs){
      if(err){
        console.error(err);
        return;
      }
      docs.forEach(function(doc){
        doc.content = markdown.toHTML(doc.content);
      });
      category_search = docs;

      res.render('article_category',{name:category,arry_tags:arry_tags,tags_count:tags_count,arry_category:arry_category,category_count:category_count,allArticles:allArticle,content:category_search});

    })

    //console.log(allArticles);
    ////console.log(docs);
    //console.log(category);
    //console.log(arry_tags);
    //console.log(tags_count);
    //
    console.log(arry_category);
    //console.log(arry_category.length);
    console.log(category_count);
  });



});






module.exports = router;
