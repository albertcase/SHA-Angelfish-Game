	//@charset "utf-8";


	function getType(){
		var str = window.location.pathname;
		var pos = str.indexOf('type/');
		return str.substring(pos+5,pos+6);
	}

	function GetQueryString(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return unescape(r[2]); return null;
	}




	//判断登录
	function islogin(){
		$.ajax({
		    type: "GET",
		    url: "/api/islogin",  //X 1为单人，2为双人
		    dataType:"json"
	    }).done(function(data){
    		if(data.code == 0){
    			window.location.href="/weixin/oauth?callback="+window.location.href;
    			//alert("未登录");
    		}else{
    			$("body").attr("data-team",data.team); //是否已经有团队
    			if($("#loading").length > 0){
    				var objImg=new Image();
					objImg.src="/angelfish/imgs/loading.png";
					objImg.onload=function(){
						loading(LoadingImg);  
					}
    			}else{

    				if($("canvas").length > 0){

    				var gTeamId = data.team;
	    			var gt = getType();
					if(gt == 2 && gTeamId){
						shareData = {
							title: '球王就是你，快来加入网球大师赛！',
					   		desc: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
					    	descTimeline: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
						    link: window.location.host + '/site/share/id/' + gTeamId,
						    imgUrl: 'http://' + window.location.host + '/angelfish/imgs/share.png',
						    returnFun: function(){
						    	window.location.href = "/site/game/type/2"
						    }
						};
						editShare();
					}

					}

    			}

    			

    		}
	    });
	}

	// 创建团队
	function createTeam(_teamname){
		$.ajax({
		    type: "POST",
		    url: "/api/createTeam",  //X 1为单人，2为双人
		    data: {
		    	"teamname": _teamname
		    },
		    dataType:"json"
	    }).done(function(data){
    		if(data.code == 0){
    			window.location.href="/weixin/oauth?callback="+window.location.href;
    			//alert("未登录");
    		}else if(data.code == 2){
    			alert("参数错误");
    		}else if(data.code == 3){
    			alert("已经有站队");
    		}else if(data.code == 4){
    			alert("站队名已经存在");
    		}else{
    			//创建成功
    			$("#wechat").fadeIn();
				shareData = {
					title: '球王就是你，快来加入网球大师赛！',
			   		desc: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
			    	descTimeline: '您的好友邀您征战大师杯，快来赢取大师杯门票和百瓶葡萄酒吧！',
				    link: window.location.host + '/site/share/id/' + data.msg,
				    imgUrl: 'http://' + window.location.host + '/angelfish/imgs/share.png',
				    returnFun: function(){
				    	window.location.href = "/site/game/type/2"
				    }
				};

				editShare();
    		}
	    });
	}

	// 加入团队
	// function joinTeam(_id){
	// 	$.ajax({
	// 	    type: "POST",
	// 	    url: "/api/joinTeam",  //X 1为单人，2为双人
	// 	    data: {
	// 	    	"id": _id
	// 	    },
	// 	    dataType:"json"
	//     }).done(function(data){
 //    		if(data.code == 0){
 //    			window.location.href="/weixin/oauth?callback="+window.location.href;
 //    			//alert("未登录");
 //    		}else if(data.code == 2){
 //    			alert("参数错误");
 //    		}else if(data.code == 3){
 //    			alert("已经有站队");
 //    		}else if(data.code == 4){
 //    			alert("站队名额已满");
 //    		}else{
 //    			//创建成功
 //    			window.location.href = "/site/game/type/2";
 //    		}
	//     });
	// }


	// 提交分数
	function submitScore(x, _score){
		$.ajax({
		    type: "POST",
		    url: "/api/subscore/type/" + x,  //X 1为单人，2为双人
		    data: {
		    	"score": _score
		    },
		    dataType:"json"
	    }).done(function(data){
    		if(data.code == 0){
    			window.location.href="/weixin/oauth?callback="+window.location.href;
    			//alert("未登录");
    		}else{
    			alert(_score)
    		}
	    });
	}


	// 排行榜
	function scoreList(x){
		$.ajax({
		    type: "GET",
		    url: "/api/scoreList/type/" + x,  //X 1为单人，2为双人
		    dataType:"json"
	    }).done(function(data){
    		if(data.code == 0){
    			window.location.href="/weixin/oauth?callback="+window.location.href;
    		}else{
    			var scoreListHtml = $.map(data.msg,function(v,key){
 					return '<li><div class="rankli"><div class="rankGrade">'+parseInt(key+1)+'</div><div class="rankName">'+v.nickname+'</div><div class="rankScore">'+v.score+'</div></div><img src="/angelfish/imgs/libg.png" width="100%" /></li>';
				}).join(" ");

				if(x == 1){
					scoreListHtml == "" ? scoreListHtml = "<p style='width:96%; text-align:center; padding:15px 0; margin:0 0 0 4%; color:#f60; font-size:14px;'>暂无数据！</p>" : scoreListHtml = scoreListHtml;
					$("#singleList").html(scoreListHtml);

					if(data.score == 0 || !data.score){
						$(".single_owen").html('<div class="rankli"><div class="rankGrade"></div><div class="rankName">暂无您的数据!</div><div class="rankScore"></div></div><img src="/angelfish/imgs/libg.png" width="100%" />');
					}else{
						$(".single_owen").html('<div class="rankli"><div class="rankGrade">'+data.ranking+'</div><div class="rankName">'+data.nickname+'</div><div class="rankScore">'+data.score+'</div></div><img src="/angelfish/imgs/libg.png" width="100%" />');
					}
				}else{
					scoreListHtml == "" ? scoreListHtml = "<p style='width:96%; text-align:center; padding:15px 0; margin:0 0 0 4%; color:#f60; font-size:14px;'>暂无数据！</p>" : scoreListHtml = scoreListHtml;
					$("#doublesList").html(scoreListHtml);

					if(data.score == 0 || !data.score){
						$(".doubles_owen").html('<div class="rankli"><div class="rankGrade"></div><div class="rankName">暂无您的数据!</div><div class="rankScore"></div></div><img src="/angelfish/imgs/libg.png" width="100%" />');
					}else{
						$(".doubles_owen").html('<div class="rankli"><div class="rankGrade">'+data.ranking+'</div><div class="rankName">'+data.nickname+'</div><div class="rankScore">'+data.score+'</div></div><img src="/angelfish/imgs/libg.png" width="100%" />');
					}
				}

    		}
	    });
	}



   	$("#wechat").click(function(){
   		$(this).hide();
   	})


    islogin();









　document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.call('hideToolbar');
    WeixinJSBridge.call('hideOptionMenu');
  })





	