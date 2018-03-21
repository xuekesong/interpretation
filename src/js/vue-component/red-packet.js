//红包雨demo
/*
  title: 红包雨抢红包逻辑
  author: xueke
  version: AMS3.8.0
*/

//canvas 笑脸
let canvas = document.getElementById('canvas-box');
if (canvas.getContext) {
  let ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(75,75,50,0,Math.PI*2, true);//绘制一个圆,Math.PI表示圆周长与直径的比例，约3.14159
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false);//口  顺时针
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI*2, true); //左眼
  ctx.moveTo(95,65);
  ctx.arc(90, 65, 5, 0, Math.PI*2, true); //右眼
  ctx.stroke();
}

//逻辑
let over_time = 20;
let active_num = 5;
$('.active-btn').on('click', function () {
  $('.red-receive').show();
  $('.red-receive__num').show();
  //抢红包动画   5秒倒计时动画
  $('.icon_5').show().addClass('add_active');
  $('.icon_1').hide().removeClass('add_active');
  $('.rain-pop__noWining').hide();
  var timer = setInterval(function (){
    if (0 == active_num){
      clearInterval(timer);
      $(".rain-pop").show();
      $(".red-receive__num").hide();
      var a = 0;
      var num = Math.ceil(Math.random() * 5);
      function clickFun(){
        $(this).attr("src","../../dist/image/empty-packet.png");
        a++;
        if (a == num) {
          $('.rain-pop__noWining').show();
          if (0 == a%2) {
            $('.rain-pop__noWining--content--icon').attr('src', '../../dist/image/winning-prize-invest-5.png');
          } else {
            $('.rain-pop__noWining--content--icon').attr('src', '../../dist/image/winning-prize-invest-50.png');
          }
          
          //抢红包结果展示
          setTimeout(function () {
            $('.vote_btn').show();
            $('.rain-pop__noWining--content').css('margin-top', ($(window).height() - $('.rain-pop__noWining--content').height())/2 + 'px');
          }, 100)
          $(".rain-pop").remove();
          clearInterval(timer);
          clearInterval(interval2);
        }
        $(this).fadeOut(500);
      }
      $('.rain-pop').redEnvelope({'clickFun':clickFun});
      var interval2 = setInterval(function(){
        if (0 == over_time){
          clearInterval(interval2);
          clearInterval(timer);
          $('.rain-pop__noWining').show();
          $('.take_one').show();

          $('.rain-pop__noWining--content--icon').attr('src', '../../dist/image/no-winning.png');//未抢中红包
          //抢红包结果展示
          setTimeout(function () {
            $('.rain-pop__noWining--content').css('margin-top', ($(window).height() - $('.rain-pop__noWining--content').height())/2 + 'px');
          }, 50)
          $(".rain-pop").remove();
        } else {
          over_time--;
          $(".rain-pop__time--num").html(over_time);
        }
      } ,1000);
    } else {
      active_num -= 1;
      $('.icon_'+(active_num + 1)+'').hide().removeClass('add_active');
      $('.icon_'+active_num+'').show().addClass('add_active');
      if (1 == active_num) {
        active_num = 0;
      }
    }
  } ,1000);
})

//去领取点击事件 
$('.vote_btn').on('click', function () {
  window.location.reload();
})
//再抢一次
$('.take_one').on('click', function () {
  window.location.reload();
})

$('body').css('height', $(window).height()+'px');


