
<div id="rule">
	<img src="/angelfish/imgs/rule.jpg" width="100%" />
	<a href="javascript:;" class="back">
		<img src="/angelfish/imgs/backBtn.png" width="100%" />
	</a>
</div>

<article id="dramebox">
	<div id="loading"></div>

	<div id="createTeam">
		<img src="/angelfish/imgs/createTeam.png" width="100%" />
		<div class="createTeam_con">
			<input type="text" maxlength="10" placeholder="团队的名称有十个汉字" name="teamname" id="teamname">
			<p><a href="javascript:submitTeamname();" id="findPartner"><img src="/angelfish/imgs/findBtn.png" width="100%" /></a></p>
		</div>
	</div>

	<section class="container">
		<img src="/angelfish/imgs/home_bg.jpg" width="100%" />
		<div class="menu">
			<div class="ball1">
				<img src="/angelfish/imgs/ball1.png" width="100%" />
			</div>
			<div class="ball2">
				<img src="/angelfish/imgs/ball2.png" width="100%" />
			</div>
			<a href="/site/game/type/1" class="startP-1" title="个人赛">
				<img src="/angelfish/imgs/1p.png" width="100%" />
			</a>
			<a href="javascript:teamCompetition();" class="startP-2" title="双打赛">
				<img src="/angelfish/imgs/2p.png" width="100%" />
			</a>
		</div>

		<a href="/site/result" class="playersRanking_link">
			<img src="/angelfish/imgs/playersRanking.png" width="100%" />
		</a>
		<a href="javascript:;" class="rule_link">
			<img src="/angelfish/imgs/rule_text.png" width="100%" />
		</a>
	</section>
</article>

<script type="text/javascript">

function teamCompetition(){
	if($("body").attr("data-type") > 0){
		window.location.href = "/site/game/type/2";
	}else{
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
	}
}

function submitTeamname(){
	var createTeamname = $("#teamname").val();
	createTeam(createTeamname);
}


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


document.addEventListener('touchmove' , function (ev){
	ev.preventDefault();
	return false;
} , false)
</script>
<script type="text/javascript" src="/angelfish/js/loading.js"></script>
