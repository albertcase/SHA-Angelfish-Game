

function writeTextOnCanvas(ctx, lh, rw, text, text_x, text_y){  // rw 字符长度
	var lineheight = lh; //行高

	function getTrueLength(str){//获取字符串的真实长度（字节长度）
		var len = str.length, truelen = 0;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				truelen += 2;
			}else{
				truelen += 1;
			}
		}
		return truelen;
	}

	function cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
		var len = str.length, tlen = len, nlen = 0;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				if(nlen + 2 < leng){
					nlen += 2;
				}else{
					tlen = x;
					break;
				}
			}else{
				if(nlen + 1 < leng){
					nlen += 1;
				}else{
					tlen = x;
					break;
				}
			}
		}
		return tlen;
	}

	for(var i = 1; getTrueLength(text) > 0; i++){
		var tl = cutString(text, rw);
		ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), text_x, i * lineheight + text_y);
		text = text.substr(tl);
	}
}




var canvasWidth,
	canvasHeight,
	startEvent,
	countdownVal = 30,
	setTime,
	cdStatus = true,
	isover = false,
	countDownNum = 4,
	loadingInt,
	curscore,
	gameType;


// 金币对像
var ball = new Image(),
	fish0 = new Image(),
	fish1 = new Image(),
	fish2 = new Image(),
	fish3 = new Image(),
	fish4 = new Image(),
	fish5 = new Image(),
	wine0 = new Image(),
	wine1 = new Image(),
	wine2 = new Image(),
	wine3 = new Image(),
	wine4 = new Image(),
	wine5 = new Image(),
	wine6 = new Image(),
	wine7 = new Image();

	ball.src = "/angelfish/imgs/gift/ball.png";
	ball.value = 15;
	ball.speed = 12;

	fish0.src = "/angelfish/imgs/gift/fish1.png";
	fish0.value = -15;
	fish0.speed = 12;

	fish1.src = "/angelfish/imgs/gift/fish2.png";
	fish1.value = -15;
	fish1.speed = 9;

	fish2.src = "/angelfish/imgs/gift/fish3.png";
	fish2.value = -15;
	fish2.speed = 10;

	fish3.src = "/angelfish/imgs/gift/fish4.png";
	fish3.value = -15;
	fish3.speed = 11;

	fish4.src = "/angelfish/imgs/gift/fish5.png";
	fish4.value = -15;
	fish4.speed = 12;

	fish5.src = "/angelfish/imgs/gift/fish6.png";
	fish5.value = -15;
	fish5.speed = 10;

	wine0.src = "/angelfish/imgs/gift/wine1.png";
	wine0.value = 50;
	wine0.speed = 7;

	wine1.src = "/angelfish/imgs/gift/wine2.png";
	wine1.value = 50;
	wine1.speed = 7;

	wine2.src = "/angelfish/imgs/gift/wine3.png";
	wine2.value = 50;
	wine2.speed = 7;

	wine3.src = "/angelfish/imgs/gift/wine4.png";
	wine3.value = 50;
	wine3.speed = 7;

	wine4.src = "/angelfish/imgs/gift/wine5.png";
	wine4.value = 50;
	wine4.speed = 7;

	wine5.src = "/angelfish/imgs/gift/wine6.png";
	wine5.value = 50;
	wine5.speed = 7;

	wine6.src = "/angelfish/imgs/gift/wine7.png";
	wine6.value = 50;
	wine6.speed = 7;

	wine7.src = "/angelfish/imgs/gift/wine8.png";
	wine7.value = 50;
	wine7.speed = 7;




var heroImg = new Image();
heroImg.src = "/angelfish/imgs/racket.png";

var bg = new Image();
bg.src = "/angelfish/imgs/bg.jpg";

var score = new Image();
score.src = "/angelfish/imgs/score.png";

var timeimg = new Image();
timeimg.src = "/angelfish/imgs/time.png";


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
	this.life = -1;
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
			this.y + this.height > other.y && this.y < other.y + other.height -35 ){
			this.grade += other.value;
			return true;
		}
		//return false;
	}
}
var App = {
	// 对象
	elements:[],
	backImg:bg,
	imgs: {
		"ball" : [ball],
		"fish" : [fish0,fish1,fish2,fish3,fish4,fish5],
		"wine" : [wine0,wine1,wine2,wine3,wine4,wine5,wine6,wine7]
	},
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
	countdown:function(){
		if(countdownVal<=0)return false;
		countdownVal --;	
	},
	loadingCountdown: function(){
		if(countDownNum=="0"){
			clearInterval(loadingInt);
			TweenMax.to(".loading_countdown", 0.3, {
		        scale:0.1,
	    		autoAlpha:0,
	    		opacity:0,
	    		onComplete:function(){
					App.gameStart("canvas",6);
	    		}
		    });
			
		}else{
			countDownNum --;
			document.getElementById("loading_countdown").innerHTML = '<img src="/angelfish/imgs/'+countDownNum+'.png" width="100%" />';;
			TweenMax.staggerFromTo(".loading_countdown",1,{
	    		scale:0.1,
	    		autoAlpha:0,
	    		opacity:0
	    	},{
	    		scale:1,
	    		autoAlpha:1,
	    		opacity:1,
	    		ease: Elastic.easeOut
	    	},1)
		}
	},
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
		this.context.drawImage(score,3,-8,this.canvas.width*0.6,50);

		this.context.textAlign = "left";
		this.context.font = 'normal 18px HelveticaNeue';
		this.context.fillStyle = "#fff";

		
		var defaultScore = "00000"; 
		curscore = String(this.hero.grade);
     	curscore = defaultScore.substring(0, defaultScore.length- curscore.length) + curscore; 

		// this.context.fillText("Life: " + this.hero.life,16,27);
		//this.context.fillText("Grade: " + this.hero.grade,16,50);
		this.context.fillText(curscore[0],this.canvas.width*0.235,26);
		this.context.fillText(curscore[1],this.canvas.width*0.30,26);
		this.context.fillText(curscore[2],this.canvas.width*0.365,26);
		this.context.fillText(curscore[3],this.canvas.width*0.43,26);
		this.context.fillText(curscore[4],this.canvas.width*0.495,26);


		// 倒计时
		this.context.drawImage(timeimg,this.canvas.width*0.65,-8,this.canvas.width*0.36,52);

		this.context.font = 'normal 18px digiface';
		this.context.fillStyle = "#b1ff26";
		parseInt(countdownVal)<10 ? countdownVal = String(0)+parseInt(countdownVal) : countdownVal;
		this.context.fillText("00",this.canvas.width*0.805,27);
		this.context.fillText(countdownVal,this.canvas.width*0.905,27);


		
		this.context.fillStyle="transparent";
		this.context.fillRect(0,this.canvas.height-this.canvas.height*0.4,this.canvas.width,this.canvas.height*0.4);

		if(cdStatus){
			setTime = setInterval('App.countdown()',1000);
			cdStatus = false;
		}


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
		if(chance < 80){
			var probability = parseInt(100*Math.random());
			var creatImgNum;   // 1为 80%; 2为18%; 0为2%;  0:球，1:鱼，2:酒
			var img;
			var imgRandom;
			if(probability <= 80){
				creatImgNum = 0;
				imgRandom = parseInt(0*Math.random());
				img = me.imgs.ball[imgRandom];
			}else if(probability > 80 && probability <= 90){
				creatImgNum = 1;
				imgRandom = parseInt(5*Math.random());
				img = me.imgs.fish[imgRandom];
			}else{
				creatImgNum = 2;
				imgRandom = parseInt(7*Math.random());
				img = me.imgs.wine[imgRandom];
			}

			var x = Math.random()*(me.canvas.width - img.width);
			if(x < 20){
				x = 20;
			}

			if(x > me.canvas.width-20){
				x = me.canvas.width-20;
			}
			var y = 0;
			var speed = img.speed;
			var money = new Money(x,y,speed,img);
			if(me.elements.length < 25){
				me.addElement(money);
			};				
		}
		
		me.draw();

		if(me.hero.life != 0 && me.hero.grade >= 30 && countdownVal == 0){
			me.gameSuccess();
		}else if(me.hero.life == 0 || countdownVal == 0 && me.hero.grade < 30){
			me.gameOver();
		}else{}
	},
	// 开始游戏
	gameStart:function(id,speed){
		var me = this;
		me.canvas = document.getElementById(id);
		me.context = me.canvas.getContext("2d");
		me.speed = speed;
		me.hero = new Hero((this.canvas.width - heroImg.width)/2,me.canvas.height - heroImg.height,heroImg);
		if(this.timer != null) this.gameOver();

		me.canvas.ontouchmove = function(event){

			//阻止网页默认动作（即网页滚动）
		    event.preventDefault();

			//var cpos = App.getEventPosition(event); 
			if(event.touches[0].pageY <= me.canvas.height-me.canvas.height*0.4)return false;


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
		this.context.fillStyle = "#b1ff26";
		this.context.font = 'bold 50px Arial';
		//this.context.fillText("Pause!",this.canvas.width/2,this.canvas.height/2);
		this.context.font = 'bold 27px Arial';

		writeTextOnCanvas(this.context,40, 18, "           Pause!   点击屏幕继续", this.canvas.width/2, this.canvas.height/2 - 90);

		clearInterval(setTime);
		cdStatus = true;
	},
	// 结束游戏
	gameOver:function(){
		clearInterval(this.timer);
		this.elements = [];
		this.pause = false;
		this.timer = null;
		this.context.textAlign = "center";
		this.context.fillStyle = "#b1ff26";
		this.context.font = 'bold 27px Arial';

		writeTextOnCanvas(this.context,40, 18, "       Game Over! 很遗憾，挑战失败", this.canvas.width/2, this.canvas.height/2 - 80);
		//this.context.fillText("Game Over!很遗憾，挑战失败",this.canvas.width/2,this.canvas.height/2);

		clearInterval(setTime);
		isover = true;
		document.getElementById("replay").innerHTML = "重新挑战";
		document.getElementById("replay").style.display = "block";
	},
	// 闯关成功！
	gameSuccess:function(){
		clearInterval(this.timer);
		this.elements = [];
		this.pause = false;
		this.timer = null;
		this.context.textAlign = "center";
		this.context.fillStyle = "#b1ff26";
		this.context.font = 'bold 27px Arial';

		//writeTextOnCanvas(this.context,40, 18, "          恭喜你! 获得 "+this.hero.grade+" 分", this.canvas.width/2, this.canvas.height/2 - 80);

		clearInterval(setTime);
		isover = true;

		window.location.href = "/site/result?fscore=" + curscore +"&gameType=" + gameType;

	},
	// 添加对象
	addElement:function(o){
		this.elements.push(o);
	}
}

window.onload = function (){  // 进入默认状态

	gameType = getType();

	var can = _g("canvas");
	canvasWidth = window.document.body.clientWidth,
	canvasHeight = window.document.body.clientHeight,
	can.width = canvasWidth;
	can.height = canvasHeight;
	var ctx = _g("canvas").getContext("2d");
	ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);

	ctx.drawImage(heroImg,(can.width - heroImg.width)/2,can.height - heroImg.height); //绘制笑脸

	
	// 绘制生命值及得分
	ctx.drawImage(score,3,-8,can.width*0.6,50);


	ctx.textAlign = "left";
	ctx.font = 'normal 18px HelveticaNeue';
	ctx.fillStyle = "#fff";
	//ctx.fillText("Life: 0",16,27);
	//ctx.fillText("Grade: 0",16,50);
	ctx.fillText("0",can.width*0.235,26);
	ctx.fillText("0",can.width*0.30,26);
	ctx.fillText("0",can.width*0.365,26);
	ctx.fillText("0",can.width*0.43,26);
	ctx.fillText("0",can.width*0.495,26);

	// 倒计时
	ctx.drawImage(timeimg,can.width*0.65,-8,can.width*0.36,52);

	ctx.font = 'normal 18px digiface';
	ctx.fillStyle = "#b1ff26";
	ctx.fillText("00",can.width*0.805,27);
	ctx.fillText("00",can.width*0.905,27);

	var readyGo = document.getElementById("readyGo");
	readyGo.ontouchstart = function(event){
		//阻止网页默认动作（即网页滚动）
	    event.preventDefault();
		//if(event.touches[0].pageY >= can.height-can.height*0.4 || isover)return false;

		TweenMax.to("#readyGo", 0.3, {
	        scale:1.2,
			autoAlpha:0,
			opacity:0,
			onComplete:function(){
				if(App.timer == null && countDownNum >=4){
					document.getElementById("loading_countdown").style.display = "block";
					loadingInt = setInterval("App.loadingCountdown()",1000)
				}
			}
		})
		
	}

}






function _g(id){
	return document.getElementById(id);
}




//屏幕方向标识，0横屏，其他值竖屏
var orientation=0;
//转屏事件，内部功能可以自定义
function screenOrientationEvent(){
    if(orientation != 0 && !isover){
		App.gamePause("canvas",6);
	}else if(App.pause){
		App.pause = false;
	}else{
		App.gameStart("canvas",6);
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




function loadingEnd(){
	TweenMax.fromTo(document.querySelector('#dramebox'), 0.6, {
        x: -10,
        y:-100,
        z:200,
        rotationY:0,
        rotationX:"-90",
        rotationZ:0,
        scale:8,
        autoAlpha:0,
        blurFilter:{blurX:50, blurY:10},
        opacity:0
    }, {
        delay: 0.3,
        autoAlpha:1,
    	rotationY:0,
    	rotationX:0,
    	rotationZ:0,
    	scale:1,
    	opacity:1,
        x: 0,
        y: 0,
        z: 0,
        ease: Elastic.easeOut,
        easeParams: [0.2, 0.7],
        force3D: false,
        onComplete:function(){

        	if($("body").attr("data-team") == "false" && getType() == 2){
	        	$("#createTeam").show();
				TweenMax.staggerFromTo("#createTeam",1,{
					scale:1.2,
					autoAlpha:0,
					opacity:0
				},{
					scale:1,
					autoAlpha:1,
					opacity:1,
					ease: Elastic.easeOut
				},0.2)
	        }else{
	        	$("#readyGo").show();
	        	TweenMax.staggerFromTo("#readyGo",0.3,{
					scale:0.8,
					autoAlpha:0,
					opacity:0
				},{
					scale:1,
					autoAlpha:1,
					opacity:1
				},0.2)
	        }

        }
    });

    //console.log("加载完成!");

    

}


loadingEnd()











