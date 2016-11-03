/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '博客首页', name: '博客'});
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
});
module.exports = router;