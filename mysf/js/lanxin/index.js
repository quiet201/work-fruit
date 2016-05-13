$(document).ready(function (){
	//加日志
	$.post("/service/commonLog/addLog/L00401");
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	listem();
	//test();
});

function init(){
	userPhoneIsBind();
	getMyExpressCount();
	getCommonImg("10","N","1");
};
function listem(){
	$("#queryText").focus(function() {
		location.href = "/page/lanxin/deliverydetails/query.html";
	});
	//设置监听效果
	jQuery(".slideBox").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,trigger:"click"});
};

function userPhoneIsBind(){
	$("#waitplease1").show();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/alipay/userIsBind?ts="+new Date().getTime(),
		success: function(json){
			$("#waitplease1").hide();
			if(json){
				$("#phoneNo_show").html(json);
				$("#bindForward").attr("href","/page/lanxin/bind/binded.html?phone="+json);
			}else{
				//如果没有绑定跳转到绑定页面
				$("#bindForward").attr("href","/page/lanxin/bind/bind.html");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#waitplease1").hide();
			$("#bindForward").attr("href","/page/lanxin/bind/bind.html");
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