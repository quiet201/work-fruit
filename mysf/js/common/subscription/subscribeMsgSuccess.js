$(document).ready(function(){
	
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});

function init(){
	function makeSureClick(index){
		var item = '#makeSure'+index;
		var makeSure = $(item).attr('class');
		
		if('ui-ico-sfi ico-box'==makeSure){
			//$('#makeSure').attr('class','ui-ico-sfi ico-yes2');
			$(item).attr('class','ui-ico-sfi ico-yes2');
		}else{
			//$('#makeSure').attr('class','ui-ico-sfi ico-box');
			$(item).attr('class','ui-ico-sfi ico-box');
		}
		
	}
	var bno=getUrlValueByKey("bno");
	var serviceTm=getUrlValueByKey("serviceTm");
	var rate=getUrlValueByKey("rate");
	$("#bno").text(bno);
	$("#serviceTm").text(serviceTm);
	$("#rate").text(rate+"小时一次");
	
	$("#unsub").unbind().bind("click",function(){
		showTip2(1,null,null,"取消订阅","是否取消订阅此运单号的快件动态？","否","是");
		
	});
	var page=getUrlValueByKey("page");
	if($.trim(page)!=""){
		page=page.substr(0,page.indexOf("?"))+"?bno="+bno+"&hasRoute=true";;
		$(".ui-btn.btn-back").attr("href",page);
	}
}

//删除动作
function tipsCancel2(index){
	$("body .maskbox").hide();
	var bno=getUrlValueByKey("bno");
	var page=getUrlValueByKey("page");
	 page=page.substr(0,page.indexOf("?"));
	location.href=page+"?bno="+bno+"&hasRoute=true";
};

function tipsSubmit2(index){
	unsub();
};

function unsub(){
	var bno=getUrlValueByKey("bno");
	var page=getUrlValueByKey("page");
	if($.trim(bno)==""){
		commontipsDialog("关联运单号不存在...");
		return;
	}
	
	var param={
			"bno":bno
	};
	
	$("#waitplease1").show();
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "/service/subscription/unsub",
		data:param,
		success: function(json){
			$("#waitplease1").hide();
			if(json && json.state=="Y"){
				page=page.substr(0,page.indexOf("?"));
				location.href=page+"?bno="+bno+"&hasRoute=true";
			}else{
				commontipsDialog("该运单号已经取消订阅了...");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#waitplease1").hide();
			commontipsDialog("系统异常...");
		}
	});
}