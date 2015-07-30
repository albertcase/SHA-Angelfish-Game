var wechatParameter = {};
var shareData = {
    title: '路易威登基金会·起航',
    desc: '艺术与建筑的碰撞，一个美梦成真的故事',
    descTimeline: '路易威登基金会·艺术与建筑的碰撞，一个美梦成真的故事 ',
    link: window.location.host,
    imgUrl: 'http://' + window.location.host + '/angelfish/imgs/share.jpg',
    returnFun: function(){

    }
}

function wechatFun(){
    $.ajax({
        type: "POST",
        url: "/weixin/jssdk/url/" + window.location.href,
        dataType:"json"
    }).done(function(data){
        wechatParameter = {
            "_appid":data.appid,
            "_time": data.time,
            "_sign": data.sign
        }
        wechatShare();
    }).fail(function() {
        console.log("请求接口失败！");
    });
}



function wechatShare(){
    alert(wechatParameter._appid);
    alert(wechatParameter._sign);
  wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: wechatParameter._appid, // 必填，公众号的唯一标识
      timestamp: wechatParameter._time, // 必填，生成签名的时间戳
      nonceStr: 'asdkhaedhqwui', // 必填，生成签名的随机串
      signature: wechatParameter._sign,// 必填，签名，见附录1
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });

  editShare();

}



function editShare(){   ///
     wx.onMenuShareTimeline({
            title: shareData.descTimeline, // 分享标题
            link: shareData.link, // 分享链接
            imgUrl: shareData.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                shareData.returnFun();
                //alert('分享成功');
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
                // alert("分享失败")
            }
        });
        
        
        wx.onMenuShareAppMessage({
            title: shareData.title, // 分享标题
            link: shareData.link, // 分享链接
            imgUrl: shareData.imgUrl, // 分享图标
            desc: shareData.desc,
            success: function () { 
                // 用户确认分享后执行的回调函数

                shareData.returnFun();

                //alert('分享成功');
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
               // alert("分享失败")
            }
        });
}





wechatFun();


