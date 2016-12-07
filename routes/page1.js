/**
 * Created by sitin on 16/12/3.
 */

$(function() {
  $(".fa-lightbulb-o").click(function () {
    if($(".mylogo>a").hasClass("whiteA")){
      $(".whiteA").removeClass("whiteA").addClass("blackA");
      $(".whiteB").removeClass("whiteB").addClass("blackB");
      $(".bg").removeClass("filterBlack").addClass("filterWhite");
      //$(".wrapper").removeClass("blackB").addClass("whiteB");
    }else{
      $(".blackA").removeClass("blackA").addClass("whiteA");
      $(".blackB").removeClass("blackB").addClass("whiteB");
      $(".bg").removeClass("filterWhite").addClass("filterBlack");
      //$(".wrapper").removeClass("whiteB").addClass("blackB");
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

  })

