/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;
var CATEGORY = [
  {'css相关': 'css'},
  {'js相关': 'js'},
  {'html相关': 'html'},
  {'web综合': 'web'},
  {'ps相关': 'ps'},
  {'工具&平台': 'tools'},
  {'生活点滴': 'life'},
  {'工作': 'work'},
  {'旅游': 'travel'}];



/* GET admin page. */
router.get('/', function(req, res, next) {
  var CATEGORYNAME = [];
  var CATEGORYE = [];
  var media = [];
  CATEGORY.forEach(function(element){
    for(var key in element){
      media.push(key);
    }
  })
  post.distinct("category",function(err,result){
    if(err){
      console.error(err);
      return;
    }
    var distinct_length = result.length/2;
    var distinct_ca = [];
    var distinct_caE = [];
    for(var a =0; a < distinct_length; a++){
     distinct_caE.push(result[2*a]);
      distinct_ca.push(result[2*a+1]);
    }

    for(var j = 0; j < distinct_length; j++){
      var match = media.every(function (item) {
        return (distinct_ca[j] !== item)
      });
      //console.log('result=' + match);
      if (match) {
        var new_category = {};
        new_category[distinct_ca[j]] = distinct_caE[j];
        console.log(new_category);
        CATEGORY.push(new_category);
      }
    }
    })
  CATEGORY.forEach(function(element){
    for(var key in element){
      CATEGORYNAME.push(key);
      CATEGORYE.push(element[key]);
    }
  })
  post.find({}, null, {sort: {date: -1}},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
    docs.forEach(function (doc){
      doc.content = markdown.toHTML(doc.content);
    });
  res.render('admin_index', { title: '博客后台发布页', name: '发布博客',CATEGORYNAME:CATEGORYNAME,CATEGORYE:CATEGORYE,content: docs});
});
});

router.post('/', function(req, res) {
    var content = req.body.content;
    var date = req.body.date;
    var category = req.body.category.split(",");
    var title = req.body.title;
    var arry_tags = req.body.tags.split(" ");
    var tags = [];

    arry_tags.forEach(function(element) {
    if (element) {
      tags.push(element);
  }
  })
    var author = req.body.author;

    if (content && date && title && author && tags && category) {
      var newPost = new post({
        content: content,
        date: date,
        title: title,
        author: author,
        tags: tags,
        category: category
      });
      newPost.save(function (err){
        if (err) {
          console.error(err);
          return;
        }
        // newPost is saved!
        console.log('保存成功！');
        console.log("tags:"+tags);
        console.log("category:"+category);
        res.send(200);
      });
    }

});
module.exports = router;