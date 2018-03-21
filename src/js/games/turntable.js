//转盘抽奖游戏
$(function () {
	let $start_draw = $('.turntable-box__click--btn');//开始抽奖按钮
	let $draw_result = $('.turntable-box__result');//抽奖结果
	let $draw_result_text = $('.turntable-box__result--text');//抽奖结果展示
	let $draw_result_btn = $('.turntable-box__result--close');//抽奖结果关闭按钮

	$start_draw.on('click', function () {
		var data = [0, 1, 2, 3, 4, 5, 6, 7];
		data = data[Math.floor(Math.random()*data.length)];
		console.log(data);
		switch (data) {
			case 1: 
			  rotateFunc(1, 157, '恭喜你中了一等奖');
			  break;
			case 2: 
			  rotateFunc(2, 65, '恭喜你中了二等奖');
			  break;
			case 3:
			  rotateFunc(3, 335, '恭喜你中了三等奖');
			  break;
			case 4:
			  rotateFunc(4, 247, '恭喜你中了四等奖');
			  break;
			case 5:
			  rotateFunc(5, 114, '谢谢参与，请再接再厉');
			  break;
			case 6:
			  rotateFunc(6, 24, '谢谢参与，请再接再厉');
			  break;
			case 7: 
			  rotateFunc(7, 292, '谢谢参与，请再接再厉');
			  break;
			default:
			  rotateFunc(0, 203, '恭喜你中了参与奖');
		}
	})

	//
	var rotateFunc = function (awards, angle, text) { //awards奖项、angle奖项对应的角度
    $start_draw.stopRotate();
    $start_draw.rotate({
    	angle: 0,
    	duration: 5000,
    	animateTo: angle + 1440,
    	callback: function () {
    		$draw_result_text.html(text);
    		$draw_result.show();
    	}
    })
	}

	$draw_result_btn.on('click', function () {
		$draw_result.hide();
	})
})