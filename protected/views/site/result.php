<div id="wechat">
	<img src="/angelfish/imgs/wechat_tips.png" />
</div>


<article id="dramebox">
	<img src="/angelfish/imgs/bg2.jpg" width="100%" />
	<div id="yourRank">
		<div class="yourRank_con">
			<ul>
				<li>
					<div class="rankli">
						<div class="rankGrade">1</div>
						<div class="rankName">西瓜皮</div>
						<div class="rankScore">999</div>
					</div>
					<img src="/angelfish/imgs/libg.png" width="100%" />
				<li>
			</ul>
			<div class="btnArea">
				<p><a href="javascript:;" id="attentionBtn"><img src="/angelfish/imgs/attentionBtn.png" width="100%" /></a></p>
				<p><a href="javascript:;" id="replayBtn"><img src="/angelfish/imgs/replay.png" width="100%" /></a></p>
			</div>
		</div>
		<img src="/angelfish/imgs/yourRank.png" width="100%" />
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
	function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return unescape(r[2]); return null;
	}

	var  curscore = GetQueryString("fscore");

   	$("#finalScore li").each(function(k){
   		$(this).html(curscore[k]);
   	})

   	$("#telBtn").click(function(){
   		$("#wechat").fadeIn();
   	})

   	$("#wechat").click(function(){
   		$("#wechat").hide();
   	})


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
		force3D: false
	});

	console.log("加载完成!");



	}


	loadingEnd()

</script>