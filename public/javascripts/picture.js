/**
 * Created by Doris on 17/2/16.
 */
$(function(){
  $(".mask-info").mouseenter(function(){
    $(this).find(".img-info").stop().fadeIn(400).siblings("span.line").stop().animate({width : "40"},400);
    $(this).siblings(".picture-list .img-box").css({"filter" : "brightness(0.6)"});
  }).mouseleave(function(){
    $(this).siblings(".picture-list .img-box").css({"filter":"brightness(1)"});
    $(this).find(".img-info").stop().fadeOut(400).siblings("span.line").stop().animate({width : "0"},400);
  })
  var size = $(".album-outside ul li").size();
  var position;
  var $album =$(".album-outside");
  var $circle = $(".fa-times-circle");
  $(".album-outside .imgs").mouseenter(function(){
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
  $(".picture-list li").dblclick(function(){
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
