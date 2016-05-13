$(document).ready(function() {
	getMyExpressListForPage();
});

/**
 * 获取小米用户绑定手机
 */
function getBindedPhone() {
	
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/xiaomi/userIsBind?ts="+new Date().getTime(),
		success: function(json){
			if($.trim(json)!=""){
				$("#bindedPhone").html(json);
				$("#modifyBindedPhone").attr("href","../bind/bind.html?phone="+json);
				$("#relationPhone").hide();
			}else{
				$("#modifyBindedPhone").attr("href","#");
				$("#displayBindedPhone").hide();
				$("#relationPhone").show();
			};
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}

/**
 * 分页查询寄给我的快件
 */
var pageNo = 1;
var pageSize =  10; //每页显示条数ccwp
function getMyExpressListForPage(more) {
	$("#waitplease").show();
	if($.trim(more)!=""){
		getCommonImg("1143","N","1");
	}
	$.ajax({
		type : "get",
		dataType : "json",
		url : "/service/alipay/getMyExpressListForPage?pageNo="+pageNo+"&pageSize="+pageSize+"&ts=" + new Date().getTime(),
		success : function(json) {
			$("#waitplease").hide();
			if($.trim(json)===""){
				$(".history-warpper.noHistory").show();
				return;
			}
			createNewDom(json.result);
			//如果存在下一页，设置 pageNo 为下一页的 pageNo
			if(json.hasNext){
				pageNo = json.nextPage;
				$("#loadBtn").show();
				$('#noDate').hide();
			} else {
				$("#loadBtn").hide();
				$('#noDate').show();
			}
			getCommonImg("1141","N","1");
		}, 
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
			$("#waitplease").hide();
			getCommonImg("1141","N","3");
		}
	});
	getBindedPhone();
};
function createNewDom(json) {
	//判断是否绑定手机
	var ret = errRetProcess(json);
	if(ret || $.trim(json)==""){
		return;
	}
	
	if(json.length >0 && json[0].showFlag != "nobind"){
	if (json) {
		if (json.length > 0) {
			var ulContent = "";
			for ( var i = 0; i < json.length; i++) {
				var hurryContent="";
				var bnoDetail = json[i]; // 运单详情
				var content = "<li onclick='toDetailPage(\"" + bnoDetail.orderNo
				+ "\"," + bnoDetail.opCode + ")'>";
				content += "<div>";
				content += "<span style='font-size: 16px;'>";
				content += convertNull(bnoDetail.orderNo);
				content += "</span>";
				content += "<span>";
				
				var formTo = convertNull(bnoDetail.destination);
				if(formTo && formTo != null && formTo != ""){
					formTo = formTo.replace("市","").replace("市","");
				}
				content += formTo;
				content += "</span>";
				content += "</div>";

				content += "<div>";
				content += "<p>";
				content += "<span style='font-size: 14px;'>";
				if (bnoDetail.opCode == "50") {
					content += "顺丰小哥已经收件啦";
				} else if (bnoDetail.opCode == "44") {
					content += "顺丰小哥正在为您派送快件";
					if(bnoDetail.wetherUrgeType=='02'){
						if(bnoDetail.wetherUrges!='01'){
//						hurryContent+= '<div class="express-btn ui-dialog-bt ui-cols2 clearfix"  style="text-align:center;border-top:0;"><div  id="'+bnoDetail.orderNo+'">'
//						+'<span class="ui-btn btn-submit01" style="text-align:center;" onclick="hurryToSend(\''+bnoDetail.orderNo+'\',this)">优先派送</span></div></div>';
						}else{
//							hurryContent+= '<div class="express-btn ui-dialog-bt ui-cols2 clearfix" style="text-align:center;border-top:0;">'
//							+'<span class="ui-btn btn-submit01" style="background-color:#cccccc;" onclick="clickBtn(this)">已提醒优先</span></div></div>';
							}
					  }else{
						  if(bnoDetail.wetherUrges=='01'){
//							  hurryContent+= '<div class="express-btn ui-dialog-bt ui-cols2 clearfix" style="text-align:center;border-top:0;">'
//								+'<span class="ui-btn btn-submit01" style="background-color:#cccccc;" onclick="clickBtn(this)">已提醒优先</span></div></div>';  
						  }
					  }
				} else if (bnoDetail.opCode == "80" || bnoDetail.opCode == "8000") {
					content += "您的快件已签收，赶紧来表个态吧";
				} else {
					content += "快件已经在运送中啦，妥妥的";
				}
				content += "</span>";
				content += "</p>";

				content += "<p>";
				content += "<span style='font-size: 12px;'>";
				content += convertNull(bnoDetail.acceptTime);
				content += "</span>";
				content += "</p>";

				if (bnoDetail.opCode == "50") {
					content += '<span class="imgWrapper"><i class="icons-SVG-01 icon-received"></i></span>';
				} else if (bnoDetail.opCode == "44") {
					content += '<span class="imgWrapper"><i class="icons-SVG-03 icon-transporting"></i></span>';
				} else if (bnoDetail.opCode == "80" || bnoDetail.opCode == "8000") {
					content += '<span class="imgWrapper"><i class="icons-SVG-05 icon-signed"></i></span>';
				} else {
					content += '<span class="imgWrapper"><i class="icons-SVG-02 icon-delivering"></i></span>';
					
				}
				content += "</div>";
				content += "</li>";
				
//				if(hurryContent!=null&&hurryContent!=''){
//					content+=hurryContent;
//				}

				ulContent += content;
			}

			//$("#myExpress").prepend(ulContent);
			 $("#myExpress").append(ulContent);
		}
	}
	}
}

//改变样式，移除单击熟悉
function changeColorStyle(event){
	$(event).css('background-color','#cccccc');
	$(event).text('已提醒优先');
	$(event).removeAttr("onclick");
}

function clickBtn(e){
	$("html,body").animate({scrollTop:($(e).offset().top)},1500);	
}

// 跳转到详细页面
function toDetailPage(orderNo, opCode) {
	var url = "/xiaomi/deliverydetails/routing/";
	if (opCode == "50") {
		url += "waybill-1-1-routing.html";
	} else if (opCode == "44") {
		url += "waybill-3-1-routing.html";
	} else if (opCode == "80" || opCode == "8000") {
		url += "waybill-4-1-routing.html";
	} else {
		url += "waybill-2-1-routing.html";
	}
	getCommonImg("1046","N","1");
	window.location = url + "?bno=" + orderNo + "&hasRoute=true";
}


function hurryToSend(orderNo,e){
	//var orderNo='444003477932';	
	$.ajax({
		type : "POST",
		data : null,
		dataType : "json",
		url : "/service/order/orderContro/hastenBill/"+orderNo+"/1",
		success: function(json){
			if(json && json != null){
				if(json=='1'){
				alertDialog('已成功提醒收派员优先派送您的快件');
				changeColorStyle(event);
				getCommonImg("1144","N","1");
			 }
				else{
					alertDialog('系统繁忙，请稍后再试！');
					getCommonImg("1144","N","2");
				}
			}
			else{
				alertDialog('系统繁忙，请稍后再试！');
				getCommonImg("1144","N","2");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alertDialog('系统繁忙，请稍后再试！');
			getCommonImg("1144","N","3");
		}
	});
	$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
}

function errRetProcess(json){
	
	if(json){
		if(json.length == 1 && json[0].showFlag == "nobind"){
			/*var nobind = '<span style="color: red;">亲，要使用这个功能需要先绑定手机号码哦~ 【绑定操作指南：服务——>关联手机号码】</span><hr>';
			$("#findListDiv").html(nobind);*/
			return 1;
		}
	}
	return 0;
}

function alertDialog(content){	
	var $mask = $('<div class="maskbox"></div>');
	var $dialog = $('<div id="dialog" class="ui-dialog"></div>');
	var $content = $('<div class="ui-alert-content"></div>');
	var $bottom = $('<div class="ui-dialog-bt ui-cols2 clearfix" style="text-align:center;"></div>');
	
	
	
	
	var  $btnSubmit = $('<a class="ui-btn btn-submit01" href="javascript:void(0);">我知道了</a>');
	//var $btnCancel = $('<a class="ui-btn btn-cancel" href="javascript:void(0);">取消</a>');
	var dialogDocHeight = 0;
	$content.html(content);
	//$bottom.append($btnCancel);	
	$bottom.append($btnSubmit);
	$dialog.append($content).append($bottom);
	$mask.css({height:$(document).height()});
	$("body").append($mask);
	$("body").append($dialog);
	dialogDocHeight = $dialog.height();
	
	centerDialog($dialog);
	
	$(window).resize(function(){		
	  centerDialog($dialog);	  
	 }); 
	
	$mask.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});
	
	$btnSubmit.click(function(){
		//执行删除数据代码
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");
	});
	
	/*$btnCancel.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});*/
	
	//垂直居中
	function centerDialog(obj){
		var windowWidth = $(window).width();   
		var windowHeight = $(window).height();  
		var popupHeight = $(obj).height();   
		var popupWidth = $(obj).width();
		var top = (windowHeight-popupHeight)/2; 
		var left = (windowWidth-popupWidth)/2;
		var objHeight = "auto";
		
		$mask.css({height:$(document).height()});
		
		if(dialogDocHeight > windowHeight){		
			top = windowHeight * 0.1;
			objHeight = windowHeight - top * 2;					
		}
		
		var bottomHeight = $bottom.outerHeight() + 1;			
		var contentHeight = (objHeight - bottomHeight);
		
		$(obj).css({ 
				"top": top,   
				"left": left ,
				"height":objHeight,
				"overflow":"hidden"
			});
				
		if(dialogDocHeight > windowHeight){	
			$content.css({ 
				"height":contentHeight
			});			
		}else{			
			$content.removeAttr("style"); 
		}
		$("body").css({
				"overflow":"hidden"
			});		
		
	}
	
}

