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
  var str_oldTags = oldTags.replace( /,/g,' ');
  post.findOne({'_id':Id},function(err,data){
    if(err){
      console.error(err);
      return;
    }
    var oldContent = data.content;
    //var oldCategory = data.category;
    res.render('admin_update', { title: '博客更新页', name: '博客更新',oldTitle: oldTitle,oldAuthor: oldAuthor,oldContent: oldContent,id: Id,oldTags: str_oldTags});
  })
});

router.post('/update',function(req,res,next){
  var Id = req.body.updateId;
  var updateTitle = req.body.updateTitle;
  var updateAuthor = req.body.updateAuthor;
  var updateContent = req.body.updateContent;
  var arry_updateTags = req.body.updateTags.split(" ");
  var updateTags = [];
  arry_updateTags.forEach(function(element) {
    if (element) {
      updateTags.push(element);
    }
  })
  var updateCtags = updateTags.join(",");
  var oldTitle = '';
  var oldAuthor = '';
  var oldContent = '';
  var oldTags = '';
  post.findOne({'_id':Id},function(err,data){
    if(err){
      console.error(err);
      return;
    }
    oldAuthor = data.author;
    oldTitle = data.title;
    oldContent = data.content;
    oldTags = data.tags;
    var oldCtags = oldTags.join(",");
    if((oldContent == updateContent) && (oldTitle == updateTitle) && (oldAuthor == updateAuthor) && (oldCtags == updateCtags)){
      var info = {'msg':'内容没有更新!'};
      res.send({"info":JSON.stringify(info)});
      console.log('内容没有更新!');
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

router.post('/delete',function(req,res,next){
  var deleteId = req.body.deleteId;
  console.log(deleteId);
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
})


module.exports = router;