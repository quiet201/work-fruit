$(document).ready(function (){
	//加日志
	$.post("/service/commonLog/addLog/L00401");
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	listem();
});
(function(Z,SF){
	Z(document).ready(function(){
		/*条码扫描点击*/
		var uaVersion=SF.APDetect;
		Z('#J_barcodeTrigger').on('click',function(e){
			e.preventDefault();
            if(uaVersion>=8.1){
                window.callBridge('scan', {
                    type: 'bar'
                }, function (result) {
                    if(result.barCode){
                    	getCommonImg("1044","N","1");
                    	location.href = "/page/xiaomi/deliverydetails/query.html?waybill="+result.barCode;
                    }
                });
            }else if(uaVersion!=0){
                SF.alertMsg('您的钱包版本比较旧，升级新版才能使用该功能。');
                getCommonImg("1043","N","1");
            }else{
                SF.alertMsg('您只有在支付宝钱包中才能使用这个功能');
                getCommonImg("1043","N","1");
            }
        });
	});
})(Zepto,SHUNFENG);
function init(){
	userPhoneIsBind();
	getMyExpressCount();
	getCommonImg("10","N","1");
};
function listem(){
	$("#queryText").focus(function() {
		location.href = "/page/xiaomi/deliverydetails/query.html";
	});
	//设置监听效果
	jQuery(".slideBox").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,trigger:"click"});
};

function userPhoneIsBind(){
	$("#waitplease1").show();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/xiaomi/userIsBind?ts="+new Date().getTime(),
		success: function(json){
			$("#waitplease1").hide();
			if(json){
				$("#phoneNo_show").html(json);
				$("#bindForward").attr("href","/page/xiaomi/bind/binded.html?phone="+json);
			}else{
				//如果没有绑定跳转到绑定页面
				$("#bindForward").attr("href","/page/xiaomi/bind/bind.html");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#waitplease1").hide();
			$("#bindForward").attr("href","/page/xiaomi/bind/bind.html");
		}
	});
};
//查询寄给我的快件数量
function getMyExpressCount(){
	$.ajax({
		type : "get",
		dataType : "json",
		url : "/service/alipay/getMyExpressCount",
		success: function(data){
			if(data && data >0){
				$("#getMyExpressCount").text(data);
				$("#getMyExpressCount").show();
			} else {
				$("#getMyExpressCount").hide();
			}
			getCommonImg("1141","N","1");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			getCommonImg("1141","N","3");
		}
	});
};