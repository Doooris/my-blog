/**
 * Created by sitin on 16/12/18.
 */
var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;
var getArry = require('./category_tags');
var Duoshuo = require('duoshuo');
var duoshuo = new Duoshuo({
  short_name: 'idoris', // 站点申请的多说二级域名。
  secret: '32ff43e9e6d85a9a0aba05a226e94fda' // 站点密钥
})

router.get('/details', function(req, res, next) {
    var order;
  post.find({},null,{sort:'-date'},function(err, docs){
    if(err){
      console.error(err);
      return;
    }
    var arry_tags = getArry.getTags(docs)[0];
    var tags_count = getArry.getTags(docs)[1];
    var arry_category = getArry.getCategory(docs)[0];
    var category_count = getArry.getCategory(docs)[1];
    if(req.query.order){
      order = parseInt(req.query.order);
    }else {
      var articleId = req.query.articleId;
      for (var position = 0; position < docs.length; position++) {
        if (articleId == docs[position]._id) {
          order = position + 1;
        }
      }
    }
    var size = docs.length;
    var title = docs[order-1].title;
    docs.forEach(function(doc){
      doc.content = markdown.toHTML(doc.content);
    });
    res.render('article_detail', {title: title+'| Article | DorisBlog',order: order,size:size,arry_tags:arry_tags,tags_count:tags_count,arry_category:arry_category,category_count:category_count,content: docs });
  });
});

module.exports = router;
