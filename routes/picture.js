var express = require('express');
var router = express.Router();
//var markdown = require('markdown').markdown;
//var getArry = require('./category_tags');


router.get('/',function(req,res,next){

  res.render('picture',{title:'picture | DorisBlog'});
});


module.exports = router;

