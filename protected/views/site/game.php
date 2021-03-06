<style type="text/css">
	html,body{
		overflow: hidden;
	}
</style>

<div id="wechat">
	<img src="/angelfish/imgs/wechat_tips.png" />
</div>

<article id="dramebox">
	<div id="createTeam">
		<img src="/angelfish/imgs/createTeam.png" width="100%" />
		<div class="createTeam_con">
			<input type="text" maxlength="10" placeholder="团队的名称有十个汉字" name="teamname" id="teamname">
			<p><a href="javascript:submitTeamname();" id="findPartner"><img src="/angelfish/imgs/findBtn.png" width="100%" /></a></p>
		</div>
	</div>

	<div id="readyGo">
		<img src="/angelfish/imgs/readyCon.png" width="100%" />
		<a href="javascript:;" id="startbtn">
			<img src="/angelfish/imgs/ready.png" width="100%" />
		</a>
	</div>
	<div id="loading_countdown" class="loading_countdown"></div>
	<canvas id="canvas"></canvas>
</article>
<script type="text/javascript" src="/angelfish/js/main.js"></script>
<script type="text/javascript">

	function submitTeamname(){
		var createTeamname = $("#teamname").val();
		var gTeamId = $("body").attr("data-team");
	    var gt = getType();

		if(createTeamname == "") {
			alert("团队名字不能为空！");
		}else{
			
			$("#wechat").fadeIn();
			shareData = {
				title: '球王就是你，"'+createTeamname+'"邀你加入网球大师赛',
		   		desc: '您的好友邀您加入TA的"'+createTeamname+'"战队，一起赢取大师杯门票和百瓶葡萄酒。',
		    	descTimeline: '您的好友邀您加入TA的"'+createTeamname+'"战队，一起赢取大师杯门票和百瓶葡萄酒。',
			    link: window.location.host + '/site/share/id/' + gTeamId,
			    imgUrl: 'http://' + window.location.host + '/angelfish/imgs/share.jpg',
			    returnFun: function(){
			    	createTeam(createTeamname);
			    }
			};

			editShare();

		}
	}

</script>