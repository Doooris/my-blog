
$(function(){
  var oldCategory = $('.category').attr("oldCategory");
  var oldCategoryE = $('.category').attr("oldCategoryE");
  var $radios = $('.category input:radio');
  var $textname = $('input#categoryname');
  var $textnameE = $('input#categorynameE');
  $radios.each(function(index){
    if(oldCategory == $(this).val()){
      $(this).attr("checked",true);
    }
  })
  if(!$('.category input:radio:checked').val()){
    $('.box-category_add').fadeIn();
    $textname.val(oldCategory);
    $textnameE.val(oldCategoryE);
  }
  $('.btn-plus').click(function(){
    $radios.attr("checked",false);
    $('.box-category_add').fadeIn();
  })
  $('.btn-cancle').click(function(){
    $textname.val("");
    $textnameE.val("");
    $('.box-category_add').fadeOut();
  })
  // 发布
  $radios.click(function(){
    $textname.val("");
    $textnameE.val("");
  })
  $textname.change(function(){
    $radios.attr("checked",false);
  })

  $('.btn-update').on('click',function(){
    var updateTitle = $('#title').val().trim();
    var updateAuthor = $('#author').val().trim();
    var updateTags = $('#tags').val().trim();
    var updateContent = $('.textarea-add').val();
    var updateCategoryName = '';
    var updateCategoryNameE = '';
    if($('.category input:radio:checked').val()){
      updateCategoryName = $('.category input:radio:checked').val();
      updateCategoryNameE = $('.category input:radio:checked').attr('id');
    }else{
      updateCategoryName = $textname.val().trim();
      updateCategoryNameE  = $textnameE.val().trim();
    }
    var updateId = $('.id').val();
    var updateCategory = updateCategoryName +"," +updateCategoryNameE;

    if(!updateTitle){
      alert('请添加上标题!');
      return;
    }
    if (!updateAuthor) {
      alert('请输入作者!');
      return;
    }
    if (!updateContent) {
      alert('内容不能为空!');
      return;
    }
    if(!updateTags){
      alert('请添加至少一条标签!');
      return;
    }
    if(!updateCategory){
      alert('请添加文章分类!');
      return;
    }
    if($textname.val() && !$textnameE.val()){
      alert("请输入分类英文!");
      return;
    }
    var postData= {
      'updateId':updateId,
      'updateTitle': updateTitle,
      'updateContent':updateContent,
      'updateAuthor':updateAuthor,
      'updateTags':updateTags,
      'updateCategory':updateCategory
    };
    $.ajax({
      url: '/admin/update',
      type: 'post',
      data: postData,
      success: function(data){
        info = JSON.parse(data.info);
        alert(info.msg);
        location.href = '/admin';
      },
      error: function(data){
        alert('更新失败!');
        location.href = 'error';
      }
    });
  });

})
