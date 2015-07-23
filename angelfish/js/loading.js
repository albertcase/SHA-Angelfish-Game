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
	"/angelfish/imgs/gift/wine8.png"
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

		TweenMax.to(document.querySelector('#loading'), 0.3, {
	        width: p+"%",
	        opacity: p*0.01,
	        ease: Elastic.easeOut,
	        easeParams: [0.4, 0.3],
	        force3D: false
	    });
		//document.getElementById("loading").innerHTML = p+"%";
		//console.log(p);
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







