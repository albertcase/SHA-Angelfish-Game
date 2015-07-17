var canvasWidth,canvasHeight,startEvent;

<!--
	// 金币对像
	var five = new Image();
	five.src = "/imgs/anchor.gif";
	five.value = 5;
	five.speed = 2;
	var ten = new Image();
	ten.src = "/imgs/flash.gif";
	ten.value = 10;
	ten.speed = 2;
	var twenty = new Image();
	twenty.src = "/imgs/rm.gif";
	twenty.value = 20;
	twenty.speed = 3;
	
	var heroImg = new Image();
	heroImg.src = "/imgs/smiley.png";
	
	var bg = new Image();
	bg.src = "/imgs/bg.jpg";
	
	// 金币类;
	function Money(x,y,speed,img){
		// 没次循环增加的像素数
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.width = img.width;
		this.height = img.height;
		this.img = img;
		this.value = img.value;
	}
	Money.prototype = {
		draw:function(ctx){
			ctx.drawImage(this.img,this.x,this.y);
		},
		move:function(){
			this.y += this.speed;
		}
	}
	// 娃娃脸
	function Hero(x,y,img){
		this.grade = 0;
		this.life = 5;
		this.x = x;
		this.y = y;
		this.img = img;
		this.width = img.width;
		this.height = img.height;
	}
	Hero.prototype = {
		draw:function(ctx){
			ctx.drawImage(this.img,this.x,this.y);
		},
		touch:function(other){  //数据比对
			if(	this.x + this.width > other.x && this.x < other.x + other.width && 
				this.y + this.height > other.y && this.y < other.y + other.height ){
				this.grade += other.value;
				return true;
			}
			return false;
		}
	}
	var App = {
		// 对象
		elements:[],
		backImg:bg,
		imgs:[five,ten,twenty],
		hero:null,
		// 画布
		canvas:null,
		// 绘制工具
		context:null,
		// 定时器
		timer:null,
		// 速度（更新间隔speed * 10）
		speed:0,
		pause:false,
		// 绘制对象
		draw:function(){
			// 清屏

			this.context.clearRect(0,0,this.canvas.width,canvas.height);
			// 绘制背景
			this.context.drawImage(this.backImg,0,0,canvasWidth,canvasHeight);
			// 绘制娃娃脸
			this.hero.draw(this.context,0,50);
			// 绘制金币
			for(var i=0;i<this.elements.length;i++){
				var o = this.elements[i];
				// 清理屏幕外的对象
				if(o.x > this.canvas.width || o.x < 0 || o.y > this.canvas.height || o.y < 0){
					this.elements.splice(i,1);
					this.hero.life--;
				}else if(this.hero.touch(o)){
					this.elements.splice(i,1);
				}else{
					o.draw(this.context);
				}
			}
			// 绘制生命值及得分
			this.context.textAlign = "left";
			this.context.font = 'normal 16px Arial';
			this.context.fillStyle = "#fff";
			this.context.fillText("Life:" + this.hero.life,16,27);
			this.context.fillText("Grade:" + this.hero.grade,16,50);
			// if(this.hero.grade == 100){
			// 	App.pause = false;
			// };

			startEvent.innerHTML="pause";

			this.context.fillStyle="yellow";
			this.context.fillRect(0,this.canvas.height-60,this.canvas.width,60);
		},
		// 循环处理
		loop:function(){

			var me = App;
			if(me.pause){
				return;
			}
			for(var i=0;i<me.elements.length;i++){
				me.elements[i].move();
			}
			var chance = Math.random() * 1000;
			// 1/10的对象添加概率
			if(chance < 40){
				var probability = parseInt(100*Math.random());
				var creatImgNum;   // 1为 80%; 2为18%; 0为2%;
				if(probability <= 70){
					creatImgNum = 0;
				}else if(probability > 70 && probability <= 98){
					creatImgNum = 1;
				}else{
					creatImgNum = 2;
				}
				var img = me.imgs[creatImgNum]; //parseInt(chance%me.imgs.length)

				var x = Math.random()*(me.canvas.width - img.width);
				var y = 0;
				var speed = img.speed;
				var money = new Money(x,y,speed,img);
				if(me.elements.length < 10){
					me.addElement(money);
				};				
			}
			me.draw();
			if(me.hero.life == 0){
				me.gameOver();
			}
		},
		// 开始游戏
		gameStart:function(id,speed){
			var me = this;
			me.canvas = document.getElementById(id);
			me.context = me.canvas.getContext("2d");
			me.speed = speed;
			me.hero = new Hero((this.canvas.width - heroImg.width)/2,me.canvas.height - heroImg.height - 60,heroImg);
			if(this.timer != null) this.gameOver();

			// me.canvas.ontouchstart = function(event){
			// 	//阻止网页默认动作（即网页滚动）
			//     event.preventDefault();

			// 	if(event.touches[0].pageY >= me.canvas.height-60)return false;

			// 	if(App.timer == null){
			// 		App.gameStart("canvas",6);
			// 	}else if(App.pause){
			// 		App.pause = false;
			// 	}else{
			// 		App.gamePause("canvas",6);
			// 	}
	
			// }

			me.canvas.ontouchmove = function(event){

				//阻止网页默认动作（即网页滚动）
			    event.preventDefault();

				//var cpos = App.getEventPosition(event); 
				if(event.touches[0].pageY <= me.canvas.height-60)return false;


			    if (!event.touches.length) return;
			   
			    var x = event.touches[0].pageX - me.canvas.offsetLeft - me.hero.width/2;
				
				if(x > 0 && x < me.canvas.width - me.hero.width){
					me.hero.x = x;
				}

				
			}
			me.timer = setInterval(me.loop,me.speed * 6);

			//启动横竖屏事件监听
			screenOrientationListener();

		},
		// 暂停游戏
		gamePause:function(){
			this.pause = true;
			this.context.textAlign = "center";
			this.context.fillStyle = "#f00";
			this.context.font = 'bold 50px Arial';
			this.context.fillText("Pause!",this.canvas.width/2,this.canvas.height/2);
			this.context.font = 'bold 20px Arial';
			this.context.fillText("Press click screen to continue...",this.canvas.width/2,this.canvas.height/2 + 40);
			startEvent.innerHTML="play";
		},
		// 结束游戏
		gameOver:function(){
			clearInterval(this.timer);
			this.elements = [];
			this.pause = false;
			this.timer = null;
			this.context.textAlign = "center";
			this.context.fillStyle = "#f00";
			this.context.font = 'bold 40px Arial';
			this.context.fillText("Game Over!",this.canvas.width/2,this.canvas.height/2);
		},
		// 添加对象
		addElement:function(o){
			this.elements.push(o);
		}
	}

	window.onload = function (){  // 进入默认状态
		var can = $("canvas");
		canvasWidth = window.document.body.clientWidth,
		canvasHeight = window.document.body.clientHeight,
		can.width = canvasWidth;
		can.height = canvasHeight;
		var ctx = $("canvas").getContext("2d");
		ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);

		ctx.drawImage(heroImg,(can.width - heroImg.width)/2,can.height - heroImg.height - 60); //绘制笑脸
		ctx.textAlign = "center";
		ctx.fillStyle = "#f00";
		ctx.font = 'bold 20px Arial';
		ctx.fillText("Press click screen to start...",can.width/2,can.height/2);
		
		startEvent = document.getElementById("start");
		startEvent.onclick = function(){
			if(App.timer == null){
				App.gameStart("canvas",6);
			}else if(App.pause){
				App.pause = false;
			}else{
				App.gamePause("canvas",6);
			}
			//startEvent.style.display="none";
		}

		can.ontouchstart = function(event){

			//阻止网页默认动作（即网页滚动）
		    event.preventDefault();
			if(event.touches[0].pageY >= can.height-60)return false;
			if(App.timer == null){
				App.gameStart("canvas",6);
			}else if(App.pause){
				App.pause = false;
			}else{
				App.gamePause("canvas",6);
			}

		}

	}
	function $(id){
		return document.getElementById(id);
	}
//-->



//屏幕方向标识，0横屏，其他值竖屏
var orientation=0;
//转屏事件，内部功能可以自定义
function screenOrientationEvent(){
    if(orientation != 0){
		App.gamePause("canvas",6);
	}
}
var innerWidthTmp = window.innerWidth;
//横竖屏事件监听方法
function screenOrientationListener(){
    try{
        var iw = window.innerWidth;     
        //屏幕方向改变处理
        if(iw != innerWidthTmp){
            if(iw>window.innerHeight)orientation = 90;
            else orientation = 0;
            //调用转屏事件
            screenOrientationEvent();
            innerWidthTmp = iw;
        }
    } catch(e){alert(e);};
    //间隔固定事件检查是否转屏，默认500毫秒
    setTimeout("screenOrientationListener()",500);
}
