var LoadingImg = [
	"/angelfish/fonts/digiface.TTF",
	"/angelfish/fonts/HelveticaNeueLTPro-XBlkCn.otf",
	"/angelfish/imgs/1p.png",
	"/angelfish/imgs/2p.png",
	"/angelfish/imgs/ball1.png",
	"/angelfish/imgs/ball2.png",
	"/angelfish/imgs/bg.jpg",
	"/angelfish/imgs/h.png",
	"/angelfish/imgs/home_bg.jpg",
	"/angelfish/imgs/racket.png",
	"/angelfish/imgs/rule_text.png",
	"/angelfish/imgs/score.png",
	"/angelfish/imgs/time.png",
	"/angelfish/imgs/gift/ball.png",
	"/angelfish/imgs/gift/fish1.png",
	"/angelfish/imgs/gift/fish2.png",
	"/angelfish/imgs/gift/fish3.png",
	"/angelfish/imgs/gift/fish4.png",
	"/angelfish/imgs/gift/fish5.png",
	"/angelfish/imgs/gift/fish6.png",
	"/angelfish/imgs/gift/wine1.png",
	"/angelfish/imgs/gift/wine2.png",
	"/angelfish/imgs/gift/wine3.png",
	"/angelfish/imgs/gift/wine4.png",
	"/angelfish/imgs/gift/wine5.png",
	"/angelfish/imgs/gift/wine6.png",
	"/angelfish/imgs/gift/wine7.png",
	"/angelfish/imgs/gift/wine8.png",
	"/angelfish/imgs/0.png",
	"/angelfish/imgs/1.png",
	"/angelfish/imgs/2.png",
	"/angelfish/imgs/3.png",
	"/angelfish/imgs/arr_l.png",
	"/angelfish/imgs/arr_r.png",
	"/angelfish/imgs/attentionBtn.png",
	"/angelfish/imgs/backBtn.png",
	"/angelfish/imgs/bg2.jpg",
	"/angelfish/imgs/createTeam.png",
	"/angelfish/imgs/doubles.png",
	"/angelfish/imgs/findBtn.png",
	"/angelfish/imgs/libg.png",
	"/angelfish/imgs/playersRanking.png",
	"/angelfish/imgs/ready.png",
	"/angelfish/imgs/readyCon.png",
	"/angelfish/imgs/replay.png",
	"/angelfish/imgs/rule.jpg",
	"/angelfish/imgs/share.png",
	"/angelfish/imgs/single.png",
	"/angelfish/imgs/telBtn.png",
	"/angelfish/imgs/timesup.png",
	"/angelfish/imgs/wechat_tips.png"
]


function LoadFn ( arr , fn , fn2){
		var loader = new PxLoader();
		for( var i = 0 ; i < arr.length; i ++)
		{
			loader.addImage(arr[i]);
		};
		
		loader.addProgressListener(function(e) {
				var percent = Math.round( e.completedCount / e.totalCount * 100 );
				if(fn2) fn2(percent)
		});	
		
		
		loader.addCompletionListener( function(){
			if(fn) fn();	
		});
		loader.start();	
}



function loading(allAmg){
	LoadFn(allAmg , function (){

		$("#dramebox img").each(function(){ 
			$(this).attr("src",$(this).attr("sourcesrc"));
		})

		TweenMax.to(document.querySelector('#loading'), 0.3, {
	       autoAlpha: 0
	    });

	    TweenMax.fromTo(document.querySelector('#dramebox'), 3.6, {
	        x: 0,
	        y:-10,
	        z:0,
	        rotationY:0,
	        rotationX:0,
	        rotationZ:0,
	        scale:1,
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
	        force3D: false
	    });

	    ballAnimate();
  		
	} , function (p){

		$("#loading span").html(p+"%");

		TweenMax.to(document.querySelector('.loadingImg img'), 0.3, {
	        opacity: p*0.01,
	        ease: Elastic.easeOut,
	        easeParams: [0.4, 0.3],
	        force3D: false
	    });
		console.log(p);
	});
}

loading(LoadingImg);



function ballAnimate(){
	TweenMax.fromTo(document.querySelector('.ball1'), 1.6, {
        x: 200,
        y:-200,
        z:0,
        rotationY:0,
        rotationX:0,
        rotationZ:-80,
        scale:0,
        blurFilter:{blurX:50, blurY:10}
    }, {
    	rotationY:0,
    	rotationX:0,
    	rotationZ:0,
    	scale:1,
        x: 0,
        y: 0,
        z: 0,
        ease: Elastic.easeOut,
        easeParams: [0.6, 0.8],
        force3D: false
    });

    TweenMax.fromTo(document.querySelector('.ball2'), 2.6, {
        x: -100,
        y: -300,
        z:0,
        rotationY:0,
        rotationX:0,
        rotationZ: 80,
        scale:0.1,
        blurFilter:{blurX:50, blurY:10}
    }, {
    	rotationY:0,
    	rotationX:0,
    	rotationZ:0,
    	scale:1,
        x: 0,
        y: 0,
        z: 0,
        ease: Elastic.easeOut,
        easeParams: [0.6, 0.8],
        force3D: false
    });
}







