/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;
var getArry = require('./category_tags');

/* GET home page. */
router.get('/', function(req, res, next) {
  var p = req.query.p?req.query.p:1;
  p = parseInt(p);
  console.log("p="+p);



  post.find({},null,{sort:'-date'},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
    var size = docs.length;
    var j = Math.ceil(size/8);
    console.log("size="+size+";j="+j);


    var arry_tags = getArry.getTags(docs)[0];
    var tags_count =getArry.getTags(docs)[1];
    var arry_category = getArry.getCategory(docs)[0];
    var category_count = getArry.getCategory(docs)[1];

    docs.forEach(function(doc){
      doc.content = markdown.toHTML(doc.content);
    })
  res.render('article', {title:'Article | DorisBlog', size:size,j:j,p:p,arry_tags:arry_tags,tags_count:tags_count,arry_category:arry_category,category_count:category_count,content: docs });
});
});

router.post('/', function(req, res) {
  var content = req.body.content;
  var date = req.body.date;

  if (content && date) {
    var newPost = new post({
      content: content,
      date: date
    });

    newPost.save(function (err) {
      if (err) {
        console.error(err);
        return;
      }
      // newPost is saved!
      console.log('保存成功！');
      res.send(200);
    });
  }
  var deleteContent = req.body.deleteContent;
  if(deleteContent) {
    post.remove({content: deleteContent}, function(err){
      if(err) {
        console.error(err);
        return;
      }
      console.log('删除成功!');
      res.send(200);
    })
  }
  var oldContent = req.body.oldContent,
    updateContent = req.body.updateContent;
  if(oldContent && updateContent){
    post.update({content: oldContent},{$set: {'content':updateContent}},function(err){
      if(err){
        console.error(err);
        return;
      }
      console.log('更新成功!');
      res.send(200);
    });
  }
});
module.exports = router;