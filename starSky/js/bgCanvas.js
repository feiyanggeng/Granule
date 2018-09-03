(function(){
	var canvas = document.getElementById('bg_canvas'),
		ctx = canvas.getContext('2d'),
		/*
			窗口的文档显示区的高度和宽度，以像素计
			这里的宽度和高度不包括菜单栏、工具栏以及滚动条等的高度
		*/
		w = canvas.width = window.innerWidth,  
		h = canvas.height = window.innerHeight,
		
		hue = 217,
		stars = [],
		count = 0,
		maxStars = 1200,
		
		star_canvas = document.createElement("canvas"),
		ctx2 = star_canvas.getContext("2d");
		star_canvas.width = 100;
		star_canvas.height = 100;
	var  half = star_canvas.width/2,
		gradient2 = ctx2.createRadialGradient(half,half,0,half,half,half);     //绘制渐变圆形图案    createLinearGradient   绘制矩形渐变图案
		gradient2.addColorStop(0.025, '#fff');
		gradient2.addColorStop(0.1,'hsl('+hue+',60%,33%)');   //对色相(H)、饱和度(S)、明度(L)
		gradient2.addColorStop(0.25,'hsl('+hue+',64%,3%)');
		gradient2.addColorStop(1, 'transparent');
		
		ctx2.fillStyle = gradient2;
		ctx2.beginPath();
		ctx2.arc(half, half, half, 0, Math.PI * 2);
		ctx2.fill();
		
		//重写random方法
		function random(min , max){
			if(arguments.length<2){
				max = min ;
				min = 0;
			}
			if(min>max){
				let temp = min;
				min = max;
				max = temp;
			}
			return  Math.floor(Math.random()*(max - min+1))+min;
		}
		
		var maxOrbit = function(w,h){
			let max = Math.max(w,h),
			orbitRadius = Math.round(Math.sqrt(max*max*2));
			return orbitRadius/2;
		} 
		
		//定义star对象
		var star = function(){
			
			this.alpha = random(2,10)/10;
			this.orbitX = w/2
			this.orbitY = h/2;
			this.orbitRadius = random(maxOrbit(w,h));
			this.radius = random(60,this.orbitRadius)/6;
			this.angle = random(360);
			this.rotateSpeed = random(this.orbitRadius)/500000;
			
			count++;
			stars[count]  = this;
			
		}
		
		star.prototype.draw = function(){
			
			var  starflash = random(10),
				x = Math.sin(this.angle)*this.orbitRadius + this.orbitX,
				y = Math.cos(this.angle)*this.orbitRadius + this.orbitY;
			if(starflash === 1 && this.alpha >0){
				this.alpha -= 0.05;
			}else if(starflash === 2 && this.alpha <1){
				this.alpha += 0.05;
			}
			
			ctx.globalAlpha = this.alpha;
			this.angle += this.rotateSpeed;
			ctx.drawImage(star_canvas, x-this.radius/2, y-this.radius/2 , this.radius,this.radius);
			
		}
		
		for(let i =0; i<maxStars; i++){
			
			new star();
			
		}
		
		function animation() {
			ctx.globalCompositeOperation = 'source-over';
			ctx.globalAlpha = 0.8;
			ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';    //hsla记色法 hsla（h,s,l,a） h 取值0~360 ，0代表红色，120代表绿色，240代表蓝色  s代表饱和度  l代表亮度  a代表透明度
			ctx.fillRect(0, 0, w, h);

			ctx.globalCompositeOperation = 'lighter';
			
			for(let i = 1;i<stars.length;i++){
				stars[i].draw();
			}

			window.requestAnimationFrame(animation);//告诉浏览器执行动画，根据指定函数更新画面，回调通常是每秒60次
		}
		
		
	animation();
})()
