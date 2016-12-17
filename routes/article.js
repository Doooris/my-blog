/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/article', function(req, res, next) {
  post.find({},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
  res.render('article', { content: docs.reverse() });
});
});

router.post('/article', function(req, res) {
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