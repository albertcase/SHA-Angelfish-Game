<script type="text/javascript" src="/angelfish/js/swiper.min.js"></script>

<div id="wechat">
	<img src="/angelfish/imgs/wechat_tips2.png" />
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

					<div class="btnArea single_btnArea">
						<a href="http://mp.weixin.qq.com/s?__biz=MzAxMzYzNDk0NQ==&mid=214589606&idx=1&sn=fd4b37b8cd6b7b70d25904b9c5645c99&scene=1&key=dffc561732c22651cbcc4f3be8c3a0234e34dc707bc1dd5f4dc9608f86c04a971f7a9ddfe1845ae2f59c10168f797482&ascene=1&uin=MjE2MTM5OTIw&devicetype=Windows+7&version=61020019&pass_ticket=u05cTItgMVJ5KRisxWM%2F%2FUWIgVXbUDpGYGIZlVVtx38%3D" class="attentionBtn"><img src="/angelfish/imgs/attentionBtn.png" width="100%" /></a>
						<a href="/site/game/type/1" class="replayBtn"><img src="/angelfish/imgs/replay.png" width="100%" /></a>
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

					<div class="btnArea doubles_btnArea">
						<a href="http://mp.weixin.qq.com/s?__biz=MzAxMzYzNDk0NQ==&mid=214589606&idx=1&sn=fd4b37b8cd6b7b70d25904b9c5645c99&scene=1&key=dffc561732c22651cbcc4f3be8c3a0234e34dc707bc1dd5f4dc9608f86c04a971f7a9ddfe1845ae2f59c10168f797482&ascene=1&uin=MjE2MTM5OTIw&devicetype=Windows+7&version=61020019&pass_ticket=u05cTItgMVJ5KRisxWM%2F%2FUWIgVXbUDpGYGIZlVVtx38%3D" class="attentionBtn"><img src="/angelfish/imgs/attentionBtn.png" width="100%" /></a>
						<a href="/site/game/type/2" class="replayBtn"><img src="/angelfish/imgs/replay.png" width="100%" /></a>
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
	var  curscore,gt,islist = GetQueryString("islist");

	if(islist){
		loadingEnd();
	}else{
		$.ajax({
		    type: "GET",
		    url: "/api/getscore",  //X 1为单人，2为双人
		    dataType:"json"
	    }).done(function(data){
	    	var defaultScore = "00000"; 
			curscore = String(data.score);
	     	curscore = defaultScore.substring(0, defaultScore.length- curscore.length) + curscore; 

	     	gt = data.type;
			loadingEnd();
	    })
	}
	
	

	// var  curscore = GetQueryString("fscore");
	// var gt = GetQueryString("gameType");

	function loadingEndDoing(){
		if(islist){ 
			scoreList("1");
			scoreList("2");
			$(".scoreList").show();

			var swiper = new Swiper('.swiper-container', {
			    nextButton: '.swiper-button-next',
			    prevButton: '.swiper-button-prev',
			    effect : 'cube'
			});

			if(islist == 2){
				swiper.slideTo(islist, 600, true);
			}
		}else{

			/* 单人成绩 share */
			shareData = {
				title: '球王就是你，快来加入网球大师赛！',
			    desc: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
			    descTimeline: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
			    link: window.location.host,
			    imgUrl: 'http://' + window.location.host + '/angelfish/imgs/share.jpg',
			    returnFun: function(){
			    	submitScore(gt,curscore);
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
			},0.3);

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





$("#telBtn").click(function(){
    $("#wechat").fadeIn();
})




</script>






