var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var duoshuo = require('duoshuo');

var index = require('./routes/index');
var article = require('./routes/article');
var article_detail = require('./routes/article_detail');
var article_tags = require('./routes/article_tags');
var article_category = require('./routes/article_category');
var picture = require('./routes/picture');
var about = require('./routes/about');
var admin_index = require('./routes/admin_index');
var admin_update = require('./routes/admin_update');

var auth = require('http-auth');
var basic = auth.basic({
  realm: "Simon Area.",
  file: __dirname + "/users.htpasswd"
});
var app = express();

global.post = require('./data/mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require("ejs").__express);


app.get('/admin_index', function(req, res) {
        res.send("Hello from express - " + req.user + "!");

});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
  dest: './public/images/article-images',
  rename: function (fieldname, filename) {
    return filename;
  }
}));

app.use('/', index);
app.use('/article', article);
app.use('/article', article_detail);
app.use('/article', article_tags);
app.use('/article', article_category);
app.use('/picture',picture);
app.use('/about',about);
app.use('/admin',auth.connect(basic));
app.use('/admin', admin_index);
app.use('/admin', admin_update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});

module.exports = app;
