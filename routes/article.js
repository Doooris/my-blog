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

    docs.forEach(function (doc){
      doc.content = markdown.toHTML(doc.content);
    });

    var size = docs.length;
    var j = Math.ceil(size/8);
    console.log("size="+size+";j="+j);


    var arry_init =[];
    var arry_tags =[];
    var arry_count =[];
    docs.forEach(function(doc){
      doc.tags.forEach(function(element){
        arry_init.push(element);
      })
    })
    for(var i=0;i<arry_init.length;i++){
      arry_tags.push(arry_init[i]);
      arry_count[i] = 1;
      for(var m=i+1;m<arry_init.length;m++){
        if(arry_init[i] === arry_init[m]){
          arry_init.splice(m,1);
          arry_count[i]++;
          m--;
        }
      }
    }
  res.render('article', { size:size,j:j,p:p,arry_tags:arry_tags,arry_count:arry_count,content: docs });
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