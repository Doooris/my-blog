/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;

/* GET admin page. */
router.get('/', function(req, res, next) {
  post.find({}, null, {sort: {date: -1},},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
    docs.forEach(function (doc){
      doc.content = markdown.toHTML(doc.content);
    });
  res.render('admin_index', { title: '博客后台发布页', name: '发布博客',content: docs});
});
});

router.post('/', function(req, res) {
    var content = req.body.content;
    var date = req.body.date;
    var title = req.body.title;
    var arry_tags = req.body.tags.split(" ");
    var tags = [];
    arry_tags.forEach(function(element) {
    if (element) {
      tags.push(element);
  }
  })
    var author = req.body.author;
    if (content && date && title && author && tags) {
      var newPost = new post({
        content: content,
        date: date,
        title: title,
        author: author,
        tags: tags
      });
      newPost.save(function (err){
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

});
module.exports = router;