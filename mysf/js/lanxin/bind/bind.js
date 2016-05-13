var url;
$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00602");
	var urlParams = {
			isTip : "",
			url : ""
	};
	///tencent/getBindPhone
	var countTime=0;
	
	init();
	addListen();
	getUrlParams(urlParams);
	url = null;
	url = urlParams.url;
	if(urlParams.isTip == 'true') {
		alertError("亲，请先绑定您的手机号，谢谢。");
	}
});
function init(){
};
function addListen(){
	//给提交按钮绑定事件
	$("#sub").off("click").on("click",function(){
		dosubmit();
	});
	getCommonImg("1061","N","1");
};
//获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "isTip") {
				urlParams.isTip = unescape($.trim(strs[i].split("=")[1]));
			}
			if ([ strs[i].split("=")[0] ] == "url") {
				urlParams.url = unescape($.trim(strs[i].split("=")[1]));
			}
		}
	}
};
function isButtonEnable(){
	$("#noteTips").hide();
	var mobileVerifyCode = $("#mobileVerifyCode").val();
	if(/^\d{6}$/.test(mobileVerifyCode)){
		$("#sub").removeClass("disable");
   	}else{
   		$("#sub").addClass("disable");
   	}
	var phoneNo = $("#phoneNo").val();
	if(/^\d{11}$/.test(phoneNo)){
		$("#linktext_1").removeClass("disable");
   	}else{
   		$("#linktext_1").addClass("disable");
   	}
	
};
function validateParam(){
	// 按钮置灰
	var phoneNo = $("#phoneNo").val();
	var mobileVerifyCode = $("#mobileVerifyCode").val();
	if(!/^\d{11}$/.test(phoneNo)){
		alertError("请填写11位手机号码");
   		return false;
   	}
	if(!/^\d{6}$/.test(mobileVerifyCode)){
		alertError("请填写6位的验证码");
   		return false;
   	}
	return true;
};
//提交绑定申请
function dosubmit(){
	// 按钮置灰
	var phoneNo = $("#phoneNo").val();
	var mobileVerifyCode = $("#mobileVerifyCode").val();
	if(!validateParam()){
		return false;
	}
	var mm = {};
	mm.phoneNo = phoneNo;
	mm.mobileVerifyCode = mobileVerifyCode;
	$.ajax({
		type : "GET",
		data : mm,
		dataType : "json",
		url : "/service/tencent/buttonToPhonebind",
		success: function(code){
			if(code+"" == "200"){
				if(url){
					window.location = url;				
				}
				else{
					var temp=phoneNo.substring(0,3)+"****"+phoneNo.substring(phoneNo.length-4,phoneNo.length);
					window.location = "/page/lanxin/bind/binded.html?phone="+temp;
				}
			}else{
				alertError(ALI_INFOCODE[code]);
			}
			// 置灰按钮恢复(置红)
			$("#mobileVerifyCode").val("");
			//$("#phoneNo").val("");
			$("#linktext_2").hide();
			$("#sub").addClass("disable");
			$("#linktext_1").show();
			$("#linktext_1").removeAttr("style");
			countDown(0,null,null);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// 置灰按钮恢复(置红)
			$("#mobileVerifyCode").val("");
			 //$("#phoneNo").val("");
			 $("#linktext_2").hide();
			$("#sub").addClass("disable");	
			$("#linktext_1").show();
			$("#linktext_1").removeAttr("style");
			countDown(0,null,null);
			alert("服务器连接失败");
			//$(".ui-btn.btn-normal").attr("style","background-color: #bbb;cursor: not-allowed;");

		}
	});
};
//发送验证码
function sendValidateCode(){
	//先判断按钮是都可用,不可用直接返回
	
	var phoneNo = $("#phoneNo").val();
	if(!/^\d{11}$/.test(phoneNo)){
		alertError("请填写11位的手机号码");
   		return false;
   	}
	if(wx_lock.open("sendCode")){
		return;
	}
	var url = "/service/tencent/phonebindcode/"+$("#phoneNo").val();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : url,
		success: function(code){
			if(code+"" == "200"){
				$("#linktext_1").hide();
				$("#linktext_2").show();
				 $("#timeNo").show();
				var start = countDown(60,function(index){
					$("#timeNo").html(index+"秒");
				},function(){
					$("#linktext_1").show();
					$("#linktext_2").hide();	
				});
				start();
			}else{
				 countDown(0);
				 alertError(ALI_INFOCODE[code]);
			}
			wx_lock.close("sendCode");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
			wx_lock.close("sendCode");
		}
	});
};
function countDown(_time,_everfunction,_endfunction){
	countTime = _time;
    var everfunction = _everfunction;
    var endfunction = _endfunction;
	var f = function(){
		if(countTime < 0){
            if(endfunction){
                endfunction.call();
            }
        }else{
            if(everfunction){
                everfunction.call(null,countTime);
            }
            countTime--;
        	window.setTimeout(f,"1000");
        }
	}
	return f
}

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2500);
}