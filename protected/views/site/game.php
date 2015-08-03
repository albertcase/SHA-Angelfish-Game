
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
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		WeixinJSBridge.call('closeWindow');
	});
	function submitTeamname(){
		var createTeamname = $("#teamname").val();
		if(createTeamname == "") {
			alert("团队名字不能为空！")
		}else{
			createTeam(createTeamname);
		}
	}

</script>