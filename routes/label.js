/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/label', function(req, res, next) {
    post.distinct("tags",function(err,data){
      if(err){
        console.error(err);
        return;
      }
      console.log(data);
    })
    res.render('article', {tags:data});
});

module.exports = router;
