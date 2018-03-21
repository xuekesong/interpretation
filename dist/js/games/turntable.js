/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//转盘抽奖游戏
$(function () {
	var $start_draw = $('.turntable-box__click--btn'); //开始抽奖按钮
	var $draw_result = $('.turntable-box__result'); //抽奖结果
	var $draw_result_text = $('.turntable-box__result--text'); //抽奖结果展示
	var $draw_result_btn = $('.turntable-box__result--close'); //抽奖结果关闭按钮

	$start_draw.on('click', function () {
		var data = [0, 1, 2, 3, 4, 5, 6, 7];
		data = data[Math.floor(Math.random() * data.length)];
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
	});

	//
	var rotateFunc = function rotateFunc(awards, angle, text) {
		//awards奖项、angle奖项对应的角度
		$start_draw.stopRotate();
		$start_draw.rotate({
			angle: 0,
			duration: 5000,
			animateTo: angle + 1440,
			callback: function callback() {
				$draw_result_text.html(text);
				$draw_result.show();
			}
		});
	};

	$draw_result_btn.on('click', function () {
		$draw_result.hide();
	});
});

/***/ })
/******/ ]);