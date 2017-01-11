/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;

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


    var tags_init =[];
    var arry_tags =[];
    var tags_count =[];
    var category_init = [];
    var arry_category = [];
    var category_count = [];
    docs.forEach(function(doc){
      doc.tags.forEach(function(element){
        tags_init.push(element);
      });
      category_init.push(doc.category[0]);
      doc.content = markdown.toHTML(doc.content);
    })
    //console.log(category_init);
    //console.log(category_init.length);

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
  res.render('article', { size:size,j:j,p:p,arry_tags:arry_tags,tags_count:tags_count,arry_category:arry_category,category_count:category_count,content: docs });
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