
$(document).ready(function (){
	var asbkId = getParameter("asbkId")+"";
	$("#asbkId").val(asbkId);
	queryOneAjax(asbkId);
	
	
	$("#defaultAddress").click(function (){
		var asbkid = $("#asbkId").val();
		$.ajax({
			type : "POST",
			data : {asbkId:asbkId},
			dataType : "json",
			url : "/service/sendaddress/sendbook/updefault/"+asbkId,
			success : function(data) {
//				alert("设为默认地址成功");
				if($.trim(data)!=""){
					tipsDialog("设为默认地址成功");
					getCommonImg("1024","N","1");
					
				}else{
					tipsDialog("默认设置失败...");
					getCommonImg("1024","N","2");
				}
			},
			error : function(e) {
				console.log("默认设置失败...");
				getCommonImg("1024","N","3");
			}
		});
	});
	
	$("#deleteAddress").click(function (){
		if(alertDialog("确定删除该地址？")){
		}
	});
});

function deleteOne(){
	var asbkid = $("#asbkId").val();
	$.ajax({
					type : "POST",
					data : {asbkId:asbkid},
					dataType : "json",
					url : "/service/sendaddress/sendbook/delete/"+asbkid,
					success : function(data) {
//						alert("删除成功!");
						if($.trim(data)!=""){
							
							tipsDialog("删除成功");
							getCommonImg("1023","N","1");
							setTimeout(function() {
								window.location.href = "address.html";
							},80);
						}else{
							tipsDialog("删除失败");
							console.log("删除失败...");
							getCommonImg("1023","N","2");
						}
					},
					error : function(e) {
						tipsDialog("删除失败");
						console.log("删除失败...");
						getCommonImg("1023","N","3");
					}
				});
//			}
//		},
//		error : function(e) {
//			console.log("删除失败...");
//		}
//	});
	
}

function queryOneAjax(asbkId) {
	// 数据提交
	$.ajax({
		type : "POST",
		data : {asbkId:asbkId},
		dataType : "json",
		url : "/service/sendaddress/sendbook/findonebook/"+asbkId,
		success : function(data) {
			if (data) {
				$("#userName").html(data.userName);
				$("#telePhone").html(data.telePhoneNuber);
				$("#addressOne").html(data.areaName);
				$("#detailAddress").html(data.detailAdress);
				$("#asbkId").val(data.asbkId);
				$("#editeAddress").html('<a class="ui-btn btn-top" href="address_edite.html?asbkId='+data.asbkId+'"title="编辑" onclick="commonEventPush(\''+"寄件"+'\''+","+'\''+"页面统计"+'\''+","+'\''+"编辑详情"+'\''+","+'\''+"address_info.html"+'\')">编辑</a>');
				getCommonImg("1028","N","1");
			}else{
				//tipsDialog("查询失败");
				getCommonImg("1028","N","2");
			}
		},
		error : function(e) {
			console.log("查询失败...");
			getCommonImg("1028","N","3");
		}
	});

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

//确定取消弹出层
function alertDialog(content){	
	var $mask = $('<div class="maskbox"></div>');
	var $dialog = $('<div id="dialog" class="ui-dialog"></div>');
	var $content = $('<div class="ui-alert-content"></div>');
	var $bottom = $('<div class="ui-dialog-bt ui-cols2 clearfix"></div>');	
	var $btnSubmit = $('<a class="ui-btn btn-submit" href="javascript:deleteOne();">确定</a>');
	var $btnCancel = $('<a class="ui-btn btn-cancel" href="javascript:void(0);">取消</a>');
	var dialogDocHeight = 0;
	$content.html(content);
	$bottom.append($btnCancel);	
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
		/*  
			执行删除数据代码
		*/
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});
	
	$btnCancel.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});
	
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

