/**
 * Created by sitin on 16/12/16.
 */
'use strict';
$(function(){
  $('header .arrow').click(function(){
    if($(this).children().hasClass('fa-angle-up')) {
      $('.header').animate({top: '-220px'}, 300).parent().animate({'padding-top': '30px'}, 300);
      $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }else{
      $('.header').animate({top: '0px'}, 600).parent().animate({'padding-top': '250px'}, 600);
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
  //var str_search = location.search;
  //var arry_search = str_search.substring(1).split("&");
  //var arry_size = arry_size[3].split("=");
  //var size = parseInt(arry_size[1]);
  //alert("size="+size);
  //if(($(".plink a").attr("order") !== -1) && ($(".plink a").attr("order") !== size)){
  //
  //}else{
  //  $(".plink").css("display","none");
  //}

})
