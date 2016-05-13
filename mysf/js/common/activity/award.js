$(document).ready(function(){
	//遍历复选按钮
	$("#addButon").click(function (){
		   var userMobile = $("#userMobile").val();
		   var userName = $("#userName").val();
		   var userPhone = $("#userPhone").val();
		   var destination = $("#destination").text();
		   var userReceiveAddress = $("#userReceiveAddress").val();
		   
		   var filter=/^(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])\d{8}$/; 
		   
		   var status = getCookie("status");
			if(status=="noLogin"){
				  if(userMobile == null || userMobile == ""){
					   alertError("请输入中奖手机号");
					   return ;
				   }
				   if(userMobile.length != 11){
					   alertError('请输入有效的中奖手机号!');
					   return ;
				   }else{
					   if(userMobile != null && userMobile != ""){
						   if(!filter.test(userMobile)){
							   alertError("中奖手机号错误,请重新填写!");
							   return ;
						   }
					   }
				   }
			}	
		   if(userName == null || userName == ""){
			   alertError("请输入姓名");
			   return ;
		   }		   
		   if(userPhone == null || userPhone == ""){
			   alertError("请输入领奖手机号码");
			   return ;
		   }
		   if(userPhone.length != 11){
			   alertError('请输入有效的领奖手机号码!');
			   return ;
		   }else{
			   if(userPhone != null && userPhone != ""){
				   if(!filter.test(userPhone)){
					   alertError("领奖电话号码错误,请重新填写!");
					   return ;
				   }
			   }
		   }
		   if(destination == null || destination == ""){
			   alertError("请输入省市区");
			   return ;
		   }
		   if(userReceiveAddress == null || userReceiveAddress == ""){
			   alertError("请输入详细地址");
			   return ;
		   }
		   submitAjax();
	   });
});

function submitAjax() {
	var userMsg = {
		id:$("#id").val(),
		userName : $("#userName").val(),
		userPhone : $("#userPhone").val(),
		userReceiveAddress : $("#destination").text()+"-"+$("#userReceiveAddress").val(),
		userZipCode : $("#userZipCode").val(),
		userMobile : $("#userMobile").val(),
		remark : $("#remark").val()
	};
	// 数据提交
	$.ajax({
		type : "POST",
		data : userMsg,
		dataType : "json",
		url : "/service/activity/addCcwActivityUserJoin",		
		success : function(data) {
			if(data=="success"){
				//alertSuccess("提交成功,感谢您的支持");
				//$("#userName").val("");
				//$("#userPhone").val("");
				//$("#destination").text("");
				//$("#userReceiveAddress").val("");
				//$("#userZipCode").val("");
				location.href = "/page/common/activity/award_success.html?resultJson=1";
				//getCommonImg("113","N","1");
			}
			else{
				alertSuccess(data);
				getCommonImg("113","N","3");
			}
			
		},
		error : function(e) {
			console.log("新增失败...");
			getCommonImg("113","N","3");
		}
	});
	//清空缓存
	setCookie("userInfo",JSON.stringify({}));
	setCookie("destinationInfo",JSON.stringify({}));
}

function getUserJoinInfo(id){
	$.ajax({
		type : "POST",
		url : "/service/activity/getCcwActivityUserJoin",
		data:{id:id},
		async:false, 
		success : function(data) {
			if(data.status=="noLogin"){				
				setCookie("status","noLogin");
			}else{
				setCookie("status","login");
			}
			$("#userName").val(data.userName);
			$("#userPhone").val(data.userPhone);
			var destination = data.userReceiveAddress;
			if($.trim(destination)!=""){
				$("#destination").text(destination.substring(0,destination.indexOf("-")));
				$("#userReceiveAddress").val(destination.substring(destination.indexOf("-")+1,destination.length));
			}
			$("#userZipCode").val(data.userZipCode);
			$("#remark").val(data.remark);
	}});
}

function tipsDialog(content){
	var $dialog = $('<div class="dialog-tips"></div>');
	var $content = $('<div class="content"></div>');
	$content.html(content);
	$dialog.append($content);
	$("body").append($dialog);  
	var windowHeight = $(window).height();  
	var popupHeight = $dialog.height(); 
	var top = (windowHeight-popupHeight)/2;
	$dialog.css({"top": top}).fadeIn(500);		
	setTimeout(function () {
		$dialog.fadeOut(500);
	}, 2500);	 
}

function alertSuccess(contect){
	$('#MsgInfo').text(contect);
	$('#success').show();
	setTimeout(function () {
		$('#success').fadeOut(500);
	}, 3000);
}

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 3000);
}