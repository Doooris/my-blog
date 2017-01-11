/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();
var CATEGORY = [
  {'css相关': 'css'},
  {'js相关': 'js'},
  {'html相关': 'html'},
  {'web综合': 'web'},
  {'ps相关': 'ps'},
  {'工具/平台': 'tools'},
  {'生活点滴': 'life'},
  {'工作': 'work'},
  {'旅游': 'travel'}];

/* GET update page. */
router.get('/update', function(req, res, next) {
  var CATEGORYNAME = [];
  var CATEGORYE = [];
  CATEGORY.forEach(function(element) {
    for (var key in element) {
      CATEGORYNAME.push(key);
      CATEGORYE.push(element[key]);
    }
  })
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
    var oldCategory = data.category[0];
    var oldCategoryE = data.category[1];
    //console.log(oldCategory);
    res.render('admin_update', { title: '博客更新页', name: '博客更新',oldTitle: oldTitle,oldAuthor: oldAuthor,oldContent: oldContent,id: Id,oldTags: str_oldTags,CATEGORYNAME:CATEGORYNAME,CATEGORYE:CATEGORYE,oldCategory:oldCategory,oldCategoryE:oldCategoryE});
  })
});

router.post('/update',function(req,res,next){
  var Id = req.body.updateId;
  var updateTitle = req.body.updateTitle;
  var updateAuthor = req.body.updateAuthor;
  var updateContent = req.body.updateContent;
  var arry_updateTags = req.body.updateTags.split(" ");
  var updateTags = [];
  var updateCategory = req.body.updateCategory.split(",");
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
  var oldCategory_string = '';
  var updateCategory_string = req.body.updateCategory;
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
    oldCategory_string = data.category.join(",");
    if((oldContent == updateContent) && (oldTitle == updateTitle) && (oldAuthor == updateAuthor) && (oldCtags == updateCtags) && (oldCategory_string == updateCategory_string)){
      var info = {'msg':'内容没有更新!'};
      res.send({"info":JSON.stringify(info)});
      console.log('内容没有更新!');
      return;}
    post.update({'_id': Id}, {$set: {'content':updateContent,'title':updateTitle,'author':updateAuthor,'tags':updateTags},'category':updateCategory}, function(err){
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