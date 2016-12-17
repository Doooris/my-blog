/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();

/* GET update page. */
router.get('/update', function(req, res, next) {
  var oldTitle = req.query.Title;
  var oldAuthor = req.query.Author;
  var Id = req.query.Id;
  var oldTags = req.query.Tags;
  post.findOne({'_id':Id},function(err,data){
    if(err){
      console.error(err);
      return;
    }
    var oldContent = data.content.replace(/\<br\/>/g,'\n');
    res.render('admin_update', { title: '博客更新页', name: '博客更新',oldTitle: oldTitle,oldAuthor: oldAuthor,oldContent:oldContent,id: Id,oldTags:oldTags});
  })
});

router.post('/update',function(req,res,next){
  var Id = req.body.updateId,
      updateTitle = req.body.updateTitle,
      updateAuthor = req.body.updateAuthor,
      updateContent = req.body.updateContent,
      updateTags = req.body.updateTags,
      oldTitle = '',
      oldAuthor = '',
      oldContent = '',
      oldTags = '';
  post.findOne({'_id':Id},function(err,data){
    if(err){
      console.error(err);
      return;
    }
    oldAuthor = data.author;
    oldTitle = data.title;
    oldContent = data.content;
    oldTags = data.tags;
    if((oldContent == updateContent) && (oldTitle == updateTitle) && (oldAuthor == updateAuthor) && (oldTags == updateTags)){
      var info = {'msg':'内容没有更新!'};
      res.send({"info":JSON.stringify(info)});
      return;}
    post.update({'_id': Id}, {$set: {'content':updateContent,'title':updateTitle,'author':updateAuthor,'tags':updateTags}}, function(err){
      if(err){
        console.error(err);
        return;
      }
      console.log('更新成功!');
    });
    var info= {"msg": "更新成功!"};
    res.send({"info":JSON.stringify(info)})
  })

})


module.exports = router;