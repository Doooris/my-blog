/**
 * Created by Doris on 17/2/19.
 */

var express = require('express');
var router = express.Router();
//var markdown = require('markdown').markdown;
//var getArry = require('./category_tags');


router.get('/',function(req,res,next){

  res.render('about',{title:'about | DorisBlog'});
});


module.exports = router;
