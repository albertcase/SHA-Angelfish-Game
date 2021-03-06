<html>
<head>
	<title>ANGELFISH</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="format-detection" content="telephone=no">
	<!--禁用手机号码链接(for iPhone)-->
	<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0,minimal-ui" />
	<!--自适应设备宽度-->
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<!--控制全屏时顶部状态栏的外，默认白色-->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="Keywords" content="">
	<meta name="Description" content="...">
	<link rel=”shortcut icon” href=”/favicon.ico” />   
	<link rel="stylesheet" type="text/css" href="/angelfish/css/reset.css" />
	<link rel="stylesheet" type="text/css" href="/angelfish/css/swiper.min.css">
	<link rel="stylesheet" type="text/css" href="/angelfish/css/style.css" />
	<link id="skin_style" href="/css/emoji.css" type="text/css" rel="stylesheet" charset="utf-8" /> 
	<script type="text/javascript" src="/angelfish/js/jquery.js"></script>
	<script type="text/javascript" src="/angelfish/js/jweixin.js"></script>
	<script type="text/javascript" src="/angelfish/js/PxLoader.js"></script>
	<script type="text/javascript" src="/angelfish/js/tweenMax.min.js"></script>
	<script type="text/javascript" src="/angelfish/js/interface.js"></script>
	<script type="text/javascript" src="/angelfish/js/wechat.js"></script>
	<script type="text/javascript">
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?5df892c138f345d54d06afc3b26c0a14";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	</script>

</head>
<body>
	<?php echo $content; ?>

	<!-- 横屏代码 -->
	<div id="orientLayer" class="mod-orient-layer">
	    <div class="mod-orient-layer__content">
	        <i class="icon mod-orient-layer__icon-orient"></i>
	        <div class="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>
	    </div>
	</div>


	<script type="text/javascript">
		
		/* 横屏 js */

		function orientationChange() {
		switch(window.orientation) {
		　　case 0:
		document.getElementById('orientLayer').style.display="none";
		break;
		　　case -90:
		document.getElementById('orientLayer').style.display="block";
		break;
		　　case 90:
		document.getElementById('orientLayer').style.display="block";
		break;
		　　case 180:
		　　document.getElementById('orientLayer').style.display="none";
		　　break;
		};

		};


		addEventListener('load', function(){
			orientationChange();
			window.onorientationchange = orientationChange;
		});

	</script>

</body>
</html>

