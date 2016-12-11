/**
 * Created by sitin on 16/12/3.
 */

$(function() {
  $(".fa-lightbulb-o").click(function () {
    if($(".mylogo>a").hasClass("whiteA")){
      $(".whiteA").removeClass("whiteA").addClass("blackA");
      $(".whiteB").removeClass("whiteB").addClass("blackB");
      $(".bg").removeClass("filterBlack").addClass("filterWhite");
      $(".odd-section").css({"background-color":"white","background":"none"});
    }else{
      $(".blackA").removeClass("blackA").addClass("whiteA");
      $(".blackB").removeClass("blackB").addClass("whiteB");
      $(".bg").removeClass("filterWhite").addClass("filterBlack");
      $(".odd-section").css({"background-color":"white","background":"linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.8)"});
    }
  });
  $(".menubarH").mouseenter(function(){
    $(this).stop().fadeOut(0).siblings(".fa-lightbulb-o").animate({left:"5%"},400)
          .siblings(".content-nav").css("visibility","visible").animate({left:"20%"},400)
      });
  $("nav").mouseleave(function(){
    $(".content-nav").animate({left:"95%"},400,function(){
      $(this).css("visibility","hidden")
        .siblings(".menubarH").stop().fadeIn(400)
    })
      .siblings(".fa-lightbulb-o").animate({left:"68%"},400)
  })
  $(".content-data").each(function(){
    var maxwidth = 200;
    if($(this).text().length>maxwidth){
      $(this).html($(this).html().substring(0,maxwidth));
      $(this).html($(this).html()+"......");
    }
  })
  $(".even-section .mask-info").mouseenter(function(){
    $(this).siblings(".img-box").stop().animate({width:"90%",filter:"brightness(0)"},600).css("filter","brightness(0.4)");
    $(this).find(".img-info").fadeIn(400);
  }).mouseleave(function(){
    $(this).siblings(".img-box").stop().animate({width:"100%"},600).css("filter","brightness(1)");
    $(this).find(".img-info").fadeOut(400);
  })

  })

