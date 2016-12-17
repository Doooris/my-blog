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

  $(".even-section .mask-info").mouseenter(function(){
    $(this).siblings(".img-box").stop().animate({width:"90%",filter:"brightness(0)"},600).css("filter","brightness(0.4)");
    $(this).find(".img-info").fadeIn(400);
  }).mouseleave(function(){
    $(this).siblings(".img-box").stop().animate({width:"100%"},600).css("filter","brightness(1)");
    $(this).find(".img-info").fadeOut(400);
  })
  var size = $(".album-outside ul li").size();
  var position;
  var $album =$(".album-outside");
  var $circle = $(".fa-times-circle");
  $(".imgs").mouseenter(function(){
    $circle.stop().css("visibility","visible");
  }).mouseleave(function(){
    $circle.stop().css("visibility","hidden");
  })
  $circle.hover(function(){
    $(this).css("visibility","visible");
  })
  $circle.click(function(){
    $(this).css("display","none");
    $album.css("visibility","hidden");
  })
  $(".even-section ul li").dblclick(function(){
    position = $(this).index();
    $(".album-outside .position-info .num").val(position+1);
    $(".album-outside .position-info .totlepages").text("of"+" "+size);
    $(".album-outside .imgs li").eq(position).show().siblings().hide();
    $album.css("visibility","visible");
    $circle.css("display","block");
  })
  $(".album-outside .position-info .goto").click(function(){
    var val = $(".album-outside .position-info .num").val();
    if(val == position){return;}
    else{
       if(!val || !(val%1 ===0)  || val<1 || val>size){
         $(".album-outside .position-info .warn").text("请输入1到"+size+"之间的有效整数!");
         }else {
      $(".album-outside .position-info .warn").text("");
         position = val-1;
      $(".album-outside .imgs li").eq(position).stop().fadeIn().siblings().stop().fadeOut();
    }}
  })
  //$(".album-outside .position-info .goto").
  $(".album-outside .next").click(function(){
    moveR();
  })
  $(".prev").click(function(){
    moveL();
  })
  function moveR(){
    position++;
    if(position == size -1){
      $(".album-outside .prompt-lastpic").stop().animate({opacity:"1"},200)
        .delay(1000)
        .animate({opacity:"0"},400);
    }
    if(position == size){
      position = 0;
    }
    $(".album-outside .position-info .num").val(position+1);
    $(".album-outside .imgs li").eq(position).stop().fadeIn().siblings().stop().fadeOut();


  }
  function moveL(){
    position--;
    if(position == 0){
      $(".album-outside .prompt-firstpic").stop().animate({opacity:"1"},200)
        .delay(1000)
        .animate({opacity:"0"},400);
    }
    if(position == -1){
      position = size -1;
    }
    val = position;
    $(".album-outside .position-info .num").val(position+1);
    $(".album-outside .imgs li").eq(position).stop().fadeIn().siblings().stop().fadeOut();

  }

  })

