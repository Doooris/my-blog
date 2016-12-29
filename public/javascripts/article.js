/**
 * Created by sitin on 16/12/16.
 */
'use strict';
$(function(){
  $('header .arrow').click(function(){
    if($(this).children().hasClass('fa-angle-up')) {
      $('.header').animate({top: '-153px'}, 300).parent().animate({'padding-top': '67px'}, 300);
      $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }else{
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
})
