<script type="text/javascript" src="/angelfish/js/swiper.min.js"></script>

<div id="wechat">
	<img src="/angelfish/imgs/wechat_tips.png" />
</div>


<article id="dramebox">
	<img src="/angelfish/imgs/bg2.jpg" width="100%" />

	<div class="scoreList">
		<!-- Swiper -->
	    <div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide">
	            	<img src="/angelfish/imgs/single.png" class="scorebg singlebg" width="100%" />
					<div class="scoreList_con">
						<ul id="singleList">
							<p>暂无数据</p>		
						</ul>
						<div class="owen single_owen"></div>	
					</div>
	            </div>
	            <div class="swiper-slide">
	            	<img src="/angelfish/imgs/doubles.png" class="scorebg doublesbg" width="100%" />
	            	<div class="scoreList_con">
						<ul id="doublesList">
							<p>暂无数据</p>
						</ul>
						<div class="owen doubles_owen"></div>		
					</div>
	            </div>
	        </div>
	        <!-- Add Arrows -->
	        <div class="swiper-button-next">
	        	<img src="/angelfish/imgs/arr_r.png" width="100%" />
	        </div>
	        <div class="swiper-button-prev">
	        	<img src="/angelfish/imgs/arr_l.png" width="100%" />
	        </div>
	    </div>


		<div class="btnArea">
			<p><a href="javascript:;" id="attentionBtn"><img src="/angelfish/imgs/attentionBtn.png" width="100%" /></a></p>
			<p><a href="/" id="replayBtn"><img src="/angelfish/imgs/replay.png" width="100%" /></a></p>
		</div>

		
	</div>

	<div id="finalScore">
		<img src="/angelfish/imgs/timesup.png" width="100%" />
		<ul>
			<li>9</li>
			<li>9</li>
			<li>9</li>
			<li>9</li>
			<li>9</li>
		</ul>
		<a href="javascript:;" id="telBtn"><img src="/angelfish/imgs/telBtn.png" width="100%" /></a>
	</div>
</article>

<script type="text/javascript">
	
	var  curscore = GetQueryString("fscore");
	var gt = GetQueryString("gameType");

	function loadingEndDoing(){
		if(!curscore){ 
			scoreList("1");
			scoreList("2");
			$(".scoreList").show();

			var swiper = new Swiper('.swiper-container', {
			    nextButton: '.swiper-button-next',
			    prevButton: '.swiper-button-prev',
			    effect : 'cube'
			});

			if(gt == 2){
				swiper.slideTo(gt, 600, true);
			}
		}else{

			/* 单人成绩 share */
			shareData = {
				title: '球王就是你，快来加入网球大师赛！',
			    desc: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
			    descTimeline: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
			    link: window.location.host,
			    imgUrl: 'http://' + window.location.host + '/angelfish/imgs/share.png',
			    returnFun: function(){
			    	submitScore(gt,curscore);
			    	window.location.href = "/site/result?gameType=" + gt;
			    }
			};

			editShare();

			document.getElementById("finalScore").style.display = "block";
			TweenMax.staggerFromTo("#finalScore",1,{
				scale:0.1,
				autoAlpha:0,
				opacity:0
			},{
				scale:1,
				autoAlpha:1,
				opacity:1,
				ease: Elastic.easeOut
			},0.3)
			$("#finalScore li").each(function(k){
		   		$(this).html(curscore[k]);
		   	})
		}
	}
   	

	function loadingEnd(){
		TweenMax.fromTo(document.querySelector('#dramebox'), 0.6, {
			x: -10,
			y:-100,
			z:200,
			rotationY:0,
			rotationX:"0",
			rotationZ:0,
			scale:3,
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
				loadingEndDoing();
			}
		});

		console.log("加载完成!");

	}


	loadingEnd();



$("#telBtn").click(function(){
    $("#wechat").fadeIn();
})




</script>






