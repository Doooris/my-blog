$(function(){
  $('header .arrow').click(function(){
    if($(this).children().hasClass('fa-angle-up')) {
      $(this).attr("status","0");
      $('.header').animate({top: '-153px'}, 300).parent().animate({'padding-top': '67px'}, 300);
      $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }else{
      $(this).attr("status","1");
      $('.header').animate({top: '0px'}, 600).parent().animate({'padding-top': '220px'}, 600);
      $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
    }
  })
  $(".content_short").each(function(){
    var maxwidth = 250;
    if($(this).text().length>maxwidth){
      $(this).html($(this).html().substring(0,maxwidth));
      $(this).html($(this).html()+"......");
    }
  })
  $(".social-contact .weixin>a").hover(function(){
    $(".code-area").show();
  },function(){
    $(".code-area").hide();
  })

  var text = $('.nav .current').text();
  var search = location.search;
  var $current;
  if(search.indexOf("tag=") === -1) {
    $current = $('.article-guide ul li a:not(.label-box ul li a)');
  } else {
    $current = $('.label-box ul li a')
  }
  $current.each(function (index) {
    if ($(this).text() == text) {
      $(this).css("color", "#62BBC3");
    }
  })
  $('div.bottom>ul>li>a').bind("click",function(){
    $(this).siblings().show().parent('li').css({"border-top":"5px solid #69c9d1","background":"linear-gradient(#B8B3A4,#ded8c6 100%,#ded8c6)"}).
    siblings().css({"border-top":"5px solid transparent","background":"none"}).find('ul').hide();
  })
  $('div.bottom .latest_comments>a').trigger("click");
  $('div.bottom>ul>li').hover(function(){
    $(this).css({"border-top":"5px solid #69c9d1","background":"linear-gradient(#B8B3A4,#ded8c6 100%,#ded8c6)"});
  })

});
