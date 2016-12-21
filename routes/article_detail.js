/**
 * Created by sitin on 16/12/18.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;

router.get('/details', function(req, res, next) {
  var articleId = req.query.articleId;
  var articleTitle = req.query.articleTitle;
  var prevId = req.body.prevId;
  var nextId = req.body.nextId;
  var prevTitle = req.body.prevTitle;
  var nextTitle = req.body.nextTitle;
  console.log('prevId:'+prevId);
  console.log('nextId:'+nextId);
  post.findOne({'_id':articleId},function(err, doc){
    if(err){
      console.error(err);
      return;
    }
      doc.content = markdown.toHTML(doc.content);
    //var author = doc.author;
    //var tags = doc.tags;
    res.render('article_detail', {prevId:prevId,prevTitle: prevTitle,nextId: nextId,nextTitle: nextTitle,content: doc });
  });
});

module.exports = router;
