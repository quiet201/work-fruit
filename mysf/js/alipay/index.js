$(document).ready(function (){
	//加日志
	$.post("/service/commonLog/addLog/L00401");
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	listem();
	//test();
});
/*function test(){
	var param={
			"sign":"SSK/h9WV8H+ObDwOGEItQOGPocc4IgpRPHgwUZiSU2DSGNC2o+EsYm8ajJZ6EkEWcvKcVyPiUNU1p7vzjrhv/T+KJ1Z5+BFTJ3ibrCZaZppoMk47se5LjjTDUwaKDDAb2zmK85ZOTt+8LkB3MEiPG/kiYomud7r7kvnoRCEixbY=",
			"biz_content":"<XML><Text><Content><![CDATA[在线客服]]></Content></Text><AppId><![CDATA[2014070200006769]]></AppId><MsgType><![CDATA[text]]></MsgType><CreateTime><![CDATA[1434606680157]]></CreateTime><FromUserId><![CDATA[pnvCeDEkaQs-4-VnMja2zmcTDbmpvKZWm7oa+WtN3mUQCYxETDvGao+ZLzOHbRwk01]]></FromUserId><MsgId><![CDATA[150618435120000001]]></MsgId><UserInfo><![CDATA[{\"logon_id\":\"186****3204\",\"user_name\":\"*忠贤\"}]]></UserInfo></XML>",
			"sign_type":"RSA",
			"service":"alipay.mobile.public.message.notify",
			"charset":"GBK"
			};
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "/service/alipay/alipayCheck",
		data:param,
		success: function(json){
			$("#waitplease1").hide();
			if(json){
				$("#phoneNo_show").html(json);
				$("#bindForward").attr("href","/page/alipay/bind/binded.html?phone="+json);
			}else{
				//如果没有绑定跳转到绑定页面
				$("#bindForward").attr("href","/page/alipay/bind/bind.html");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#waitplease1").hide();
			$("#bindForward").attr("href","/page/alipay/bind/bind.html");
		}
	});
}

*/
function test(){
/*var param={
		"bno":"755123456789",
		 "userId":"pnvCeDEkaQs-4-VnMja2zmcTDbmpvKZWm7oa+WtN3mUQCYxETDvGao+ZLzOHbRwk01",
		 "serviceTm":"3",
		 "state":"1"
		};*/
	var param={
			"bno":"755123456789",
			 "userId":"2.0:cDSjNgHaDltfpuYIsZs3/jVdCqI=",
			 "serviceTm":"8:00-22:00",
			 "rate":"3",
			 "state":"1"
			};

$.ajax({
	type : "POST",
	dataType : "json",
	url : "/service/subscription/sub",
	data:param,
	success: function(json){
		$("#waitplease1").hide();
		if(json){
			$("#phoneNo_show").html(json);
			$("#bindForward").attr("href","/page/alipay/bind/binded.html?phone="+json);
		}else{
			//如果没有绑定跳转到绑定页面
			$("#bindForward").attr("href","/page/alipay/bind/bind.html");
		}
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
		$("#waitplease1").hide();
		$("#bindForward").attr("href","/page/alipay/bind/bind.html");
	}
});
}

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
                    	location.href = "/page/alipay/deliverydetails/query.html?waybill="+result.barCode;
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
		location.href = "/page/alipay/deliverydetails/query.html";
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
				$("#bindForward").attr("href","/page/alipay/bind/binded.html?phone="+json);
			}else{
				//如果没有绑定跳转到绑定页面
				$("#bindForward").attr("href","/page/alipay/bind/bind.html");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#waitplease1").hide();
			$("#bindForward").attr("href","/page/alipay/bind/bind.html");
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