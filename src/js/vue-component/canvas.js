//canvas 绘制图形
let canvasFun = function () {
  let canvasVue = new Vue({
  	el: '#canvas-box',
  	template: `
  	  <div>
		  	<p>绘制形状</p>
		  	<ul class="canvas-ul">
		  		<li>栅格</li>
		  		<li @click="rectangle()" v-text="rectangle_text"></li>
		  		<li @click="triangle()">绘制三角形</li>
          <li @click="arc()">绘制圆弧</li>
          <li @click="moveToFun()">移动触笔-face</li>
          <li @click="quadraticCurveTo()">二次贝塞尔曲线</li>
          <li @click="bezierCurveTo()">三次贝塞尔曲线</li>
          <li @click="drawMixUse()">组合使用</li>
		  	</ul>
        <p>设置样式</p>
        <ul>
          <li @click="squareFn()">实心色板</li>
          <li @click="strokeFn()">stroke色框</li>
          <li @click="alphaFn()">globalAlpha</li>
          <li @click="rgbaFn()">rgba</li>
          <li @click="lineCap()">lineCap</li>
          <li @click="lineJoin()">lineJoin</li>
          <li @click="dashFn()">dash</li>
          <li @click="linearGradientFn()">linearGradient</li>
          <li @click="radiaGradientFn()">radiaGradient</li>
          <li @click="textShadowFn()">textShadow</li>
        </ul>
        <p>绘制文本</p>
        <ul>
          <li @click="textStyleFn()">textBaseline</li>
          <li @click="fillTextFn()">fillText</li>
        </ul>
        <p>绘制图片</p>
        <ul>
          <li @click="drawImageFn()">drawImage</li>
          <li @click="scalingFn()">scaling</li>
          <li @click="slicingFn()">slicing</li>
        </ul>
        <p>绘制动画</p>
        <ul>
          <li @click="animationFn()">controlling an animation</li>
        </ul>
		  	<canvas id="tutorial" width="300" height="300"></canvas>
		  </div>
  	`,
  	data: {
  		rectangle_page: 1, //矩形
  		rectangle_text: '矩形', // 矩形类型
      sun: new Image(),
      moon: new Image(),
      earth: new Image(),
  	},
  	watch: {

  	},
  	methods: {
  	  rectangle() { //矩形
        this.clearRect(); //先清空原有图像
  	  	let canvas = document.getElementById('tutorial');
  	  	if (canvas.getContext) {
  	  		let ctx = canvas.getContext('2d');
  	  		if (1 == this.rectangle_page) {
  	  			ctx.fillRect(25, 25, 100, 200); //充实矩形
  	  			this.rectangle_page += 1;
  	  			this.rectangle_text = '充实矩形';
  	  		} else if (2 == this.rectangle_page) {
  	  			ctx.clearRect(45,45,60,60); //清除指定矩形区域，让清除部分完全透明。
  	  			this.rectangle_page += 1;
  	  			this.rectangle_text = '清除指定矩形区域，让清除部分完全透明';
  	  		} else if (3 == this.rectangle_page) {
  	  			ctx.strokeRect(50,50,50,50); //绘制一个矩形的边框
  	  			this.rectangle_page = 1;
  	  			this.rectangle_text = '边框矩形';
  	  		}
	  	  }
  	  },
  	  triangle() { //三角形
        this.clearRect();
  	  	let canvas = document.getElementById('tutorial');
  	  	if (canvas.getContext) {
  	  		let ctx = canvas.getContext('2d');
  	  		ctx.beginPath(); //新建一条路径
  	  		ctx.moveTo(75,50); //将笔触移动到指定的x以及y轴上
  	  		ctx.lineTo(100,75); //绘制一条从当前位置到指定x以及y轴上的线
  	  		ctx.lineTo(100,25); //绘制一条从当前位置到指定x以及y轴上的线
  	  		ctx.fill(); //通过填充路径的内容区域生成实心的图形。
  	  	}
  	  },
      arc() { //绘制圆弧
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
              ctx.beginPath();
              let x = 25 + j * 50;//x坐标值
              let y = 25 + i * 50;//y坐标值
              let radius = 20;//圆弧半径
              let startAngle = 0; //开始点
              let endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
              let anticlockwise = i % 2 == 0 ? false : true;//顺时针或逆时针

              ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

              if (i > 1) {
                ctx.fill(); //绘制实心图形
              } else {
                ctx.stroke();//通过线条绘制轮廓
              }
            }
          }
        }
      },
      clearRect() { //清空图像
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.globalAlpha = 1;
          ctx.shadowOffsetX = 2; 
          ctx.shadowOffsetY = 2; 
          ctx.shadowBlur = 2;
          ctx.clearRect(0, 0, 300, 300);
          ctx.stroke();
        }
      },
      moveToFun() { //移动触笔
        this.clearRect();

        let canvas = document.getElementById('tutorial');
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
      },
      quadraticCurveTo() { //二次贝塞尔曲线
        this.clearRect();

        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');

          ctx.beginPath();
          ctx.moveTo(75, 25);
          ctx.quadraticCurveTo(25, 25, 25, 62.5);//左上角曲线
          ctx.quadraticCurveTo(25, 100, 50, 100);//左下角曲线
          ctx.quadraticCurveTo(50, 120, 65, 100);//左下角角角
          ctx.quadraticCurveTo(50, 120, 65, 100);
          ctx.quadraticCurveTo(125, 100, 125, 62.5);//右下角曲线
          ctx.quadraticCurveTo(125, 25, 75, 25);//右上角曲线
          ctx.stroke();

        }
      },
      bezierCurveTo() { //三次贝塞尔曲线
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');

          ctx.beginPath();
          ctx.moveTo(75, 40);
          ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);//左上角心半角
          ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);//左上角心半角扩大
          ctx.bezierCurveTo(20, 80, 40, 102,  75, 120);//左半边心下半部分
          ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);//右边心下半部分
          ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);//右边心上半角角
          ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);//右边心上半角半角
          ctx.fill();
        }
      },
      drawMixUse() { //混合一起使用
        this.clearRect();

        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');

          this.roundedRect(ctx, 12, 12, 150, 150, 15);//大矩形
          this.roundedRect(ctx, 19, 19, 150, 150, 9); //大矩形
          this.roundedRect(ctx, 53, 53, 49, 33, 10);//左边中小矩形
          this.roundedRect(ctx, 53, 119, 49, 16, 6); //左边最小矩形
          this.roundedRect(ctx, 135, 53, 49, 33, 10); //右边中小矩形
          this.roundedRect(ctx, 135, 119, 25, 49, 10);//右边竖矩形

          ctx.beginPath();
          ctx.arc(37, 37, 13, Math.PI/7, -Math.PI/7, false);//圆弧
          ctx.lineTo(31, 37);
          ctx.fill();//通过填充路径的内容区域生成实心的图形

          for (let i = 0; i < 8; i++) {
            ctx.fillRect(51 + i * 16, 35, 4, 4);//绘制一个充实的矩形 顶部实心小点点
          }

          for (let i = 0; i < 6; i ++) {
            ctx.fillRect(115, 51 + i * 16, 4, 4); //两列矩形中间的实心小点点 x, y, width, height
          }

          for (let i = 0; i < 8; i++) {
            ctx.fillRect(51 + i * 16, 99, 4 ,4);//两行矩形中间的实心小点点
          }

          ctx.beginPath(); //绘制矩形中间的小动物，目前只是勾画出实心轮廓
          ctx.moveTo(83, 116);
          ctx.lineTo(83, 102);
          ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);//绘制三次贝塞尔曲线
          ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
          ctx.lineTo(111, 116);
          ctx.lineTo(106.333, 111.333);
          ctx.lineTo(101.666, 116);
          ctx.lineTo(97, 111.333);
          ctx.lineTo(92.333, 116);
          ctx.lineTo(87.666, 111.333);
          ctx.lineTo(83, 116);
          ctx.fill();

          //两只白底小眼睛
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.moveTo(91, 96);
          ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
          ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
          ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
          ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
          ctx.moveTo(103, 96);
          ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
          ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
          ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
          ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
          ctx.fill();

          //右眼小黑珠
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(101, 102, 2, 0, Math.PI*2, true);
          ctx.fill();
          //左眼小黑珠
          ctx.beginPath();
          ctx.arc(89, 102, 2, 0, Math.PI*2, true);
          ctx.fill();

        }
      },
      roundedRect(ctx, x, y, width, height, radius) {//绘制圆角矩形的函数
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);//绘制二次贝尓曲线
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        ctx.stroke();
      },
      squareFn() { //实心色板
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
              ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ',0)';
              ctx.fillRect(j*25, i*25, 25, 25);
            }
          }
        }
      },
      strokeFn() { //线框颜色
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          ctx.lineWidth = 1;
          for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
              ctx.strokeStyle = 'rgb(0,' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 *j) + ')';
              ctx.beginPath();
              ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
              ctx.stroke();
            }
          }
        }
      },
      alphaFn() { //透明度globalAlpha
        this.clearRect();

        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          ctx.fillStyle = '#fd0';
          ctx.fillRect(0, 0, 75, 75);
          ctx.fillStyle = '#6c0';
          ctx.fillRect(75, 0, 75, 75);
          ctx.fillStyle = '#09f';
          ctx.fillRect(0, 75, 75, 75);
          ctx.fillStyle = '#f30';
          ctx.fillRect(75, 75, 75, 75);
          ctx.fillStyle = '#fff';

          ctx.globalAlpha = 0.2; //设置透明度
          //画半透明圈
          for (let i = 0; i < 7; i++) {
            ctx.beginPath();
            ctx.arc(75, 75, 10+10*i, 0, Math.PI*2, true);
            ctx.fill();
          }
        }
      }, 
      rgbaFn() { //透明度 rgba
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          //画背景
          ctx.fillStyle = 'rgb(255, 221, 0)';
          ctx.fillRect(0, 0, 150, 37.5);
          ctx.fillStyle = 'rgb(204, 204, 0)';
          ctx.fillRect(0, 37.5, 150, 37.5);
          ctx.fillStyle = 'rgb(0, 153, 255)';
          ctx.fillRect(0, 75, 150, 37.5);
          ctx.fillStyle = 'rgb(255, 51, 0)';
          ctx.fillRect(0, 112.5, 150, 37.5);
          //画半透明矩形
          for (let i = 0; i < 10; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, '+ (i+1)/10 +')';
            for (let j = 0; j < 4; j++) {
              ctx.fillRect(5 + i * 14, 5 + j *37.5, 14, 27.5);
            }
          }
        }
      },
      lineCap() { //线条两端样式
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          let lineCap = ['butt', 'round', 'square'];
          //创建路径
          ctx.strokeStyle = '#09f';//线框颜色
          ctx.beginPath();
          ctx.moveTo(10, 10);
          ctx.lineTo(140, 10);
          ctx.moveTo(10, 140);
          ctx.lineTo(140, 140);
          ctx.stroke();//通过线条绘制图形轮廓
          //画线条
          ctx.strokeStyle = '#000';
          for (let i = 0; i < lineCap.length; i++) {
            ctx.lineWidth = 15;//设置线宽
            ctx.lineCap = lineCap[i];
            ctx.beginPath();
            ctx.moveTo(25 + i * 50, 10);
            ctx.lineTo(25 + i * 50, 140);
            ctx.stroke();
          }
        }
      },
      lineJoin() { //线条与线条间接合处的样式
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          let lineJoin = ['round', 'bevel', 'miter'];
          ctx.lineWidth = 10;
          for (let i = 0; i < lineJoin.length; i++) {
            ctx.lineJoin = lineJoin[i];
            ctx.beginPath();
            ctx.moveTo(15, 5 + i * 40);
            ctx.lineTo(55, 45 + i * 40);
            ctx.lineTo(85, 5 + i * 40);
            ctx.lineTo(125, 45 + i * 40);
            ctx.lineTo(165, 5 + i * 40);
            ctx.stroke();
          }
        }
      },
      dashFn() { // 使用虚线
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          let offset = 0;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.setLineDash([4, 2]);//指定线段与间隙的交替
          ctx.lineDashOffset = -offset; //设置起始偏移量
          ctx.strokeRect(10, 10, 100, 100);//绘制矩形边框
        }
      },
      linearGradientFn() { //背景色渐变
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          let lingrad = ctx.createLinearGradient(0, 0, 0, 150);
          lingrad.addColorStop(0, '#00abeb');
          lingrad.addColorStop(0.5, '#fff');
          lingrad.addColorStop(0.5, '#26c000');
          lingrad.addColorStop(1, '#fff');

          let lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
          lingrad2.addColorStop(0.5, '#000');
          lingrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = lingrad;
          ctx.strokeStyle = lingrad2;

          ctx.fillRect(10, 10, 130, 130);
          ctx.strokeRect(50, 50, 50, 50);
        }
      },
      radiaGradientFn() { //径向渐变
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');

          let radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
          radgrad.addColorStop(0, '#a7d30c');
          radgrad.addColorStop(0.9, '#019f62');
          radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');

          let radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
          radgrad2.addColorStop(0, '#ff5f98');
          radgrad2.addColorStop(0.75, '#ff0188');
          radgrad2.addColorStop(1, 'rgba(255, 1, 136, 0)');

          let radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
          radgrad3.addColorStop(0, '#00c9ff');
          radgrad3.addColorStop(0.8, '#00b5e2');
          radgrad3.addColorStop(1, 'rgba(0, 201, 255, 0)');

          let radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
          radgrad4.addColorStop(0, '#f4f201');
          radgrad4.addColorStop(0.8, '#e4c700');
          radgrad4.addColorStop(1, 'rgba(288, 199, 0, 0)');

          ctx.fillStyle = radgrad4;
          ctx.fillRect(0, 0, 150, 150);
          ctx.fillStyle = radgrad3;
          ctx.fillRect(0, 0, 150, 150);
          ctx.fillStyle = radgrad2;
          ctx.fillRect(0, 0, 150, 150);
          ctx.fillStyle = radgrad;
          ctx.fillRect(0, 0, 150, 150);
        }
      },
      textShadowFn() { //文字阴影
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          ctx.shadowOffsetX = 2; 
          ctx.shadowOffsetY = 2; 
          ctx.shadowBlur = 2;
          ctx.shadowColor = 'rgba(0, 0, 0, .5)';

          ctx.font = '20px Times New Roman';
          ctx.fillStyle = '#000';
          ctx.fillText('Sample String', 5, 30);
        }
      },
      textStyleFn() { //边框文本样式
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          ctx.font = '48px serif';
          ctx.textBaseline = 'hanging';
          ctx.strokeText('Hello world', 0, 100);
        }
      },
      fillTextFn() { //填充文本样式
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          ctx.font = '48px serif';
          ctx.fillText('Hello world', 10, 100);
        }
      },
      drawImageFn() { //绘制图片
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          let img = new Image();
          img.onload = function () {
            ctx.drawImage(img, 0, 0);
            ctx.beginPath();
            ctx.moveTo(30, 96);
            ctx.lineTo(70, 66);
            ctx.lineTo(103, 76);
            ctx.lineTo(170, 15);
            ctx.stroke();
          }
          img.src = '../../dist/image/index-icon.png';
        }
      },
      scalingFn() { //图片缩放
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          let img = new Image();
          img.onload = function () {
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 3; j++) {
                ctx.drawImage(img, j * 50, i * 38, 100, 70);
              }
            }
          }
          img.src = '../../dist/image/index-icon.png';
        }
      },
      slicingFn() { //图片切片
        this.clearRect();
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          let img = new Image();
          img.src = '../../dist/image/index-icon.png';
          ctx.drawImage(img, 33, 71, 104, 124, 21, 20, 87, 104);

          // ctx.drawImage(img)
          
        }
      },
      animationFn() {//绘制动画、太阳系
        this.clearRect();
        this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
        this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
        this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
        requestAnimationFrame(this.animationDrawFn);
      },
      animationDrawFn() { //动画逻辑
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext('2d')) {
          let ctx = canvas.getContext('2d');
          ctx.globalCompositeOperation = 'destination-over';
          ctx.clearRect(0,0,300,300); // clear canvas

          ctx.fillStyle = 'rgba(0,0,0,0.4)';
          ctx.strokeStyle = 'rgba(0,153,255,0.4)';
          ctx.save();
          ctx.translate(150,150);

          // Earth
          let time = new Date();
          ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
          ctx.translate(105,0);
          ctx.fillRect(0,-12,50,24); // Shadow
          ctx.drawImage(this.earth,-12,-12);

          // Moon
          ctx.save();
          ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
          ctx.translate(0,28.5);
          ctx.drawImage(this.moon,-3.5,-3.5);
          ctx.restore();

          ctx.restore();
          
          ctx.beginPath();
          ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
          ctx.stroke();
         
          ctx.drawImage(this.sun,0,0,300,300);

          window.requestAnimationFrame(this.animationDrawFn);
        }
      }
  	}
  })
}
canvasFun();