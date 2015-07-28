
<article id="dramebox">
	<div id="loading"></div>

	<div id="createTeam">
		<h2>给自己的团队起一个气势如虹的队名吧</h2>
		<input type="text" maxlength="10" name="teamname" id="teamname">
		<p><a href="javascript:submitTeamname();" id="findPartner">找队友</a></p>
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

		<a href="javascript:;" class="rule_link">
			<img src="/angelfish/imgs/rule_text.png" width="100%" />
		</a>
	</section>
</article>

<script type="text/javascript">

function teamCompetition(){
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

function submitTeamname(){
	var createTeamname = $("#teamname").val();
	createTeam(createTeamname);
}



document.addEventListener('touchmove' , function (ev){
	ev.preventDefault();
	return false;
} , false)
</script>
<script type="text/javascript" src="/angelfish/js/loading.js"></script>
