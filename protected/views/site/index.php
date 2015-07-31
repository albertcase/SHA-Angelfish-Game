
<div id="loading">
	<div class="loadingImg">
		<img src="/angelfish/imgs/loading.png" width="100%" />
		<span>正在加载...</span>
	</div>
</div>

<article id="dramebox">
	<div id="rule">
		<img src="" sourcesrc="/angelfish/imgs/rule.jpg" width="100%" />
		<a href="javascript:;" class="back">
			<img src="" sourcesrc="/angelfish/imgs/backBtn.png" width="100%" />
		</a>
	</div>

	<section class="container">
		<img src="" sourcesrc="/angelfish/imgs/home_bg.jpg" width="100%" />
		<div class="menu">
			<div class="ball1">
				<img src="" sourcesrc="/angelfish/imgs/ball1.png" width="100%" />
			</div>
			<div class="ball2">
				<img src="" sourcesrc="/angelfish/imgs/ball2.png" width="100%" />
			</div>
			<a href="/site/game/type/1" class="startP-1" title="个人赛">
				<img src="" sourcesrc="/angelfish/imgs/1p.png" width="100%" />
			</a>
			<a href="/site/game/type/2" class="startP-2" title="双打赛">
				<img src="" sourcesrc="/angelfish/imgs/2p.png" width="100%" />
			</a>
		</div>

		<a href="/site/result" class="playersRanking_link">
			<img src="" sourcesrc="/angelfish/imgs/playersRanking.png" width="100%" />
		</a>
		<a href="javascript:;" class="rule_link">
			<img src="" sourcesrc="/angelfish/imgs/rule_text.png" width="100%" />
		</a>
	</section>
</article>

<script type="text/javascript">

$(document).ready(function(){
 	
 	/* rule */
	$(".back").click(function(){
		TweenMax.to("#rule", 0.3, {
	        x:0,
			autoAlpha:0,
			opacity:0,
			onComplete:function(){
				$("#rule").hide();
			}
		})
	})

	$(".rule_link").click(function(){
		$("#rule").show();
		TweenMax.to("#rule", 0.3, {
	        x:0,
			autoAlpha:1,
			opacity:1
		})
	})

});


// document.addEventListener('touchmove' , function (ev){
// 	ev.preventDefault();
// 	return false;
// } , false)
</script>
<script type="text/javascript" src="/angelfish/js/loading.js"></script>
