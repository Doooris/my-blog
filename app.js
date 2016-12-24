var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var index = require('./routes/index');
var article = require('./routes/article');
var article_detail = require('./routes/article_detail');
var admin_index = require('./routes/admin_index');
var admin_update = require('./routes/admin_update');

var app = express();
global.post = require('./data/mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require("ejs").__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/article', article);
app.use('/article', article_detail);
app.use('/admin', admin_index);
app.use('/admin', admin_update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//给express注册markdown渲染器
//app.configure('development', function(){
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//});
//
//app.configure('production', function(){
//  app.use(express.errorHandler());
//});
//
//app.register('.md',{
//  compile:function(str,options){
//    var html=markdown.makeHtml(str);
//    return function(locals){
//      return html.replace(/\{([^}]+)\}/g,function(_,name){
//        return locals[name];
//      });
//    }
//  }
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
