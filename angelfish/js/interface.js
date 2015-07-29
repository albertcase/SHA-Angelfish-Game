	//@charset "utf-8";

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
    			$("body").attr("data-type",data.team);
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
    			window.location.href = "/site/game/type/2";
    		}
	    });
	}

	// 加入团队
	function joinTeam(_id){
		$.ajax({
		    type: "POST",
		    url: "/api/joinTeam",  //X 1为单人，2为双人
		    data: {
		    	"id": _id
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
    			alert("站队名额已满");
    		}else{
    			//创建成功
    			window.location.href = "/site/game/type/2";
    		}
	    });
	}


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
    			//alert("未登录");
    		}else{
    			var scoreListHtml = $.map(data.msg,function(v,key){
 					return "<li><span>"+parseInt(key+1)+"</span><span>"+v.nickname+"</span><span>"+v.score+"</span></li>";
				}).join(" ");

				if(x == 1){
					$("#singleList").html(scoreListHtml);
				}else{
					$("#doublesList").html(scoreListHtml);
				}
    		}
	    });
	}





islogin();

//分享地址
// /site/share/id/1


	