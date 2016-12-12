/**
 * Created by sitin on 16/11/3.
 */
var express = require('express');
var router = express.Router();

/* GET update page. */
router.get('/update', function(req, res, next) {
  res.render('update', { title: '博客更新页', name: '博客更新'});
});


module.exports = router;