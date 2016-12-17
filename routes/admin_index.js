/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  post.find({},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
  res.render('admin_index', { title: '博客后台发布页', name: '发布博客',content: docs.reverse()});
});
});

router.post('/', function(req, res) {
    var content = req.body.content;
    var date = req.body.date;
    var title = req.body.title;
    var tags = req.body.tags;
    var author = req.body.author;
    if (content && date && title && author) {
      var newPost = new post({
        content: content,
        date: date,
        title: title,
        author: author,
        tags: tags
      });
      newPost.save(function (err) {
        if (err) {
          console.error(err);
          return;
        }
        // newPost is saved!
        console.log('保存成功！');
        console.log(tags);
        res.send(200);
      });
    }
  var deleteId = req.body.deleteId;
  if(deleteId){
    post.remove({_id: deleteId}, function(err){
      if(err) {
        console.error(err);
        return;
      }
      console.log('删除成功!');
      res.send(200);
    })
  }
});
module.exports = router;