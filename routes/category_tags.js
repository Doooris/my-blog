/**
 * Created by sitin on 17/1/13.
 */
exports.getCategory = function(docs){
  var category_init = [];
  var arry_category = [];
  var category_count = [];
  docs.forEach(function(doc){
    category_init.push(doc.category[0]);
  })
  for(var x=0;x<category_init.length;x++){
    arry_category.push(category_init[x]);
    category_count[x] = 1;
    for(var n=x+1;n<category_init.length;n++){
      if(category_init[x] === category_init[n]){
        category_init.splice(n,1);
        category_count[x]++;
        n--;
      }
    }
  }
  return([arry_category,category_count]);
};
exports.getTags = function(docs){
  var tags_init =[];
  var arry_tags =[];
  var tags_count =[];
  docs.forEach(function(doc){
    doc.tags.forEach(function(element){
      tags_init.push(element);
    });
  })

  for(var i=0;i<tags_init.length;i++){
    arry_tags.push(tags_init[i]);
    tags_count[i] = 1;
    for(var m=i+1;m<tags_init.length;m++){
      if(tags_init[i] === tags_init[m]){
        tags_init.splice(m,1);
        tags_count[i]++;
        m--;
      }
    }
  }
  return([arry_tags,tags_count]);

};

