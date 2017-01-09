/**
 * Created by sitin on 16/11/3.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');

var blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  date: String,
  tags: [{type:String}],
  category: [{type:String}]
  //article_id: {type: Number, unique:true},
  //about_id: {
  //  prev_id: Number,
  //  next_id: Number
  //}
}, {collection: 'post'});

var post = mongoose.model('post', blogSchema);

module.exports = post;