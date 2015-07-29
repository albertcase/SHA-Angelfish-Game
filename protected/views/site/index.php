<div class="scoreList">
	<div class="scoreList_title"><span>排名</span><span>玩家昵称</span><span>积分</span></div>
	<ul id="singleList">
		<p>暂无数据</p>
	</ul>
	<ul id="doublesList">
		<p>暂无数据</p>
	</ul>

	<div class="scoreArr_l">
		<img src="/angelfish/imgs/arr_l.png" width="100%" />
	</div>
	<div class="scoreArr_r">
		<img src="/angelfish/imgs/arr_r.png" width="100%" />
	</div>
</div>

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

		<a href="javascript:playersRanking();" class="playersRanking_link">
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


scoreList("1");
scoreList("2");



function playersRanking(){
	$(".scoreList").show();
	TweenMax.staggerFromTo(".scoreList",1,{
		scale:0,
		rotationY:0,
		rotationX:0,
		rotationZ:0,
		autoAlpha:0,
		opacity:0
	},{
		scale:1,
		rotationY:0,
		rotationX:0,
		rotationZ:0,
		autoAlpha:1,
		opacity:1,
		ease: Back.easeOut,
		onComplete:function(){
			$("#singleList").css("display","inline-block");
			TweenMax.staggerFromTo("#singleList li",0.8,{
	    		scale:1.2,
	    		autoAlpha:0,
	    		opacity:0
	    	},{
	    		scale:1,
	    		autoAlpha:1,
	    		opacity:1,
	    		ease: Elastic.easeOut
	    	},0.2);

		}
	},0.5)
}



$(".scoreArr_r").click(function(){
	$(this).hide();
	TweenMax.to("#singleList", 0.3, {
        x:-1000,
		autoAlpha:0,
		opacity:0,
		onComplete:function(){
			$("#singleList").css("display","none");
			TweenMax.staggerFromTo("#doublesList",0.8,{
				x:0,
				autoAlpha:0,
				opacity:0
			},{
				autoAlpha:1,
				opacity:1,
				onComplete:function(){
					$("#doublesList").css("display","inline-block");
					TweenMax.staggerFromTo("#doublesList li",0.8,{
			    		scale:1.2,
			    		autoAlpha:0,
			    		opacity:0
			    	},{
			    		scale:1,
			    		autoAlpha:1,
			    		opacity:1,
			    		ease: Elastic.easeOut
			    	},0.2)
			    	$(".scoreArr_l").show();
				},
				ease: Elastic.easeOut
			},0.2)
		}
    });

	
})


$(".scoreArr_l").click(function(){
	$(this).hide();
	TweenMax.to("#doublesList", 0.3, {
        x:1000,
		autoAlpha:0,
		opacity:0,
		onComplete:function(){
			$("#doublesList").css("display","none");
			
			TweenMax.staggerFromTo("#singleList",0.8,{
				x:0,
				autoAlpha:0,
				opacity:0
			},{
				autoAlpha:1,
				opacity:1,
				onComplete:function(){
					$("#singleList").css("display","inline-block");
					TweenMax.staggerFromTo("#singleList li",0.8,{
			    		scale:1.2,
			    		autoAlpha:0,
			    		opacity:0
			    	},{
			    		scale:1,
			    		autoAlpha:1,
			    		opacity:1,
			    		ease: Elastic.easeOut
			    	},0.2)
			    	$(".scoreArr_r").show();
				},
				ease: Elastic.easeOut
			},0.2)
		}
    });

	
})

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
