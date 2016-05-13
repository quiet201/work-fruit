//初始化检查是否绑定
$(document).ready(function(){
	init();
	addlisten();
});
function init(){
	userPhoneIsBind();
	getMyExpressCount();
};
function addlisten(){
	
};
function userPhoneIsBind(){
	$("#waitplease").show();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/xiaomi/userIsBind?ts="+new Date().getTime(),
		success: function(json){
			if(json){
				$("#phoneNo_show").html(json);
				$("#bindForward").attr("href","/xiaomi/bind/binded.html?phone="+json);
			}else{
				//如果没有绑定跳转到绑定页面
				$("#bindForward").attr("href","/xiaomi/bind/bind.html");
			}
			$("#waitplease").hide();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#bindForward").attr("href","/xiaomi/bind/bind.html");
				$("#waitplease").hide();
		}
	});
};
//提交绑定申请
function dosubmit(){
	// 按钮置灰
	document.getElementById("sub").onclick = "";
	var subButton = $(".btn-submit");
	subButton.attr("style","background-image: -moz-linear-gradient(top, #DDDDDD, #000000); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #DDDDDD), color-stop(1, #000000)); background-image: -o-linear-gradient(top, #DDDDDD, #000000); background-color:#000000; color:#fff; text-shadow: -1px -1px 0 #000000;");

	var phoneNo = $("#phoneNo").val();
	var mobileVerifyCode = $("#mobileVerifyCode").val();
	if(!/^\d{11}$/.test(phoneNo)){
   		alert("请填写正确的手机号码");
   		return false;
   	}
	if(!/^\d{6}$/.test(mobileVerifyCode)){
   		alert("请填写6位的验证码");
   		return false;
   	}
	
	var mm = {};
	mm.phoneNo = phoneNo;
	mm.mobileVerifyCode = mobileVerifyCode;
	$.ajax({
		type : "GET",
		data : mm,
		dataType : "json",
		url : "/service/alipay/buttonToPhonebind",
		success: function(code){
			if(code+"" == "200"){
				window.location = "/xiaomi/phonebindSuccess.html";
			}else{
				alert(ALI_INFOCODE[code]);
			}
			// 置灰按钮恢复(置红)
			document.getElementById("sub").onclick = doSubmit;
			subButton.attr("style","background-image: -moz-linear-gradient(top, #f86b8c, #dd1438); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f86b8c), color-stop(1, #dd1438)); background-image: -o-linear-gradient(top, #f86b8c, #dd1438); background-color:#dd1438; color:#fff; text-shadow: -1px -1px 0 #c11933;");			

		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// 置灰按钮恢复(置红)
			document.getElementById("sub").onclick = doSubmit;
			subButton.attr("style","background-image: -moz-linear-gradient(top, #f86b8c, #dd1438); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f86b8c), color-stop(1, #dd1438)); background-image: -o-linear-gradient(top, #f86b8c, #dd1438); background-color:#dd1438; color:#fff; text-shadow: -1px -1px 0 #c11933;");			

		}
	});
}
//发送验证码
function sendCode(){
	var phoneNo = $("#phoneNo").val();
	if(!/^\d{11}$/.test(phoneNo)){
   		alert("请填写正确的手机号码");
   		return false;
   	}
	if(wx_lock.open("sendCode")){
		return;
	}
	var url = "/service/alipay/phonebindcode/"+$("#phoneNo").val();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : url,
		success: function(code){
			if(code+"" == "200"){
				$("#linktext_1").hide();
				$("#linktext_2").show();
				var start = countDown(90,function(index){
					$("#timeNo").html(index);
				},function(){
					$("#linktext_1").show();
					$("#linktext_2").hide();	
				});
				start();
			}else{
				alert(ALI_INFOCODE[code]);
			}
			wx_lock.close("sendCode");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
			wx_lock.close("sendCode");
		}
	});
}

function countDown(_time,_everfunction,_endfunction){
	var time = _time;
    var everfunction = _everfunction;
    var endfunction = _endfunction;
	var f = function(){
		if(time < 0){
            if(endfunction){
                endfunction.call();
            }
        }else{
            if(everfunction){
                everfunction.call(null,time);
            }
            time--;
        	window.setTimeout(f,"1000");
        }
	};
	return f;
}

//在已绑定页面显示解除绑定页面
function unBind(){
	$("#bind_true").hide();
	$("#un_bind").show();
}

//在解除绑定页面返回到已绑定页面
function doBack(){
	$("#un_bind").hide();
	$("#bind_true").show();
}

//解除绑定
function doUnnd(){
	var unbind_phoneNo = $("#unbind_phoneNo").val();
	if(!/^\d{11}$/.test(unbind_phoneNo)){
   		alert("请填写正确的手机号码");
   		return false;
   	}
	var url = "/service/alipay/phoneunbind?phoneNo="+unbind_phoneNo;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : url,
		success: function(code){
			if(code=="false"){
				alert("您输入的手机号码和绑定的号码不匹配,不能解除绑定");
			}else{
				alert("绑定解除成功");
				window.location = "/xiaomi/phonebind.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
		}
	});
}


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
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
	getCommonImg("11","N","1");
};