$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00205");
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	
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
	forword();
});
function addListen(){
	$("#serviceToday").unbind().bind("click",function(){
		$("#serviceRange").removeClass("btn-data").addClass("btn-time");
		$(this).removeClass("btn-time").addClass("btn-data");
	});
	$("#serviceRange").unbind().bind("click",function(){
		$("#serviceToday").removeClass("btn-data").addClass("btn-time");
		$(this).removeClass("btn-time").addClass("btn-data");
	});
	$("#rate3").unbind().bind("click",function(){
		$("#rate5").removeClass("btn-data").addClass("btn-time");
		$(this).removeClass("btn-time").addClass("btn-data");
	});
	$("#rate5").unbind().bind("click",function(){
		$("#rate3").removeClass("btn-data").addClass("btn-time");
		$(this).removeClass("btn-time").addClass("btn-data");
	});
}
function init(){
	getSubscription();
	addListen();
	var bno=getUrlValueByKey("bno");
	if($.trim(bno)==""){
		commontipsDialog("关联运单号不存在...");
		return;
	}
	
	
	$("#waybill").text(bno);
};

//删除动作
function tipsCancel2(index){
	$("body .maskbox").hide();
};

function tipsSubmit2(index){
	
	sub();
};
function sub(){
		//类型 
		var type=getUrlValueByKey("type");
		var bno=getUrlValueByKey("bno");
		var page=getUrlValueByKey("page");
		var userId=getUrlValueByKey("userId");
		var serviceTm=$("#serviceTm .btn-data").attr("value");
		var rate=$("#rate .btn-data").attr("value");
		var backPage=$("#pageForward").attr("node");
		if($.trim(page)=="" && $.trim(backPage)!=""){
			page=backPage;
		}
		if($.trim(bno)==""){
			commontipsDialog("关联运单号不存在...");
			return;
		}
		if($.trim(serviceTm)==""){
			commontipsDialog("服务时间不能为空...");
			return;
		}
		if($.trim(rate)==""){
			commontipsDialog("消息频率不能为空...");
			return;
		}
		var param={
			 "bno":bno,
			 "serviceTm":serviceTm,
			 "userId":userId,
			 "channelType":type,
			 "rate":rate
		};
		
		$("#waitplease1").show();
		$.ajax({
			type : "POST",
			dataType : "json",
			url : "/service/subscription/sub",
			data:param,
			success: function(json){
				$("#waitplease1").hide();
				if(json && json.state=="Y"){
						location.href="/page/common/subscription/subscribeMsgSuccess.html?bno="+bno+"&serviceTm="+serviceTm+"&rate="+rate+"&page="+page;
				}else{
					commontipsDialog("系统异常...");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$("#waitplease1").hide();
				commontipsDialog("系统异常...");
			}
		});
};
//订阅成功后的跳转
 function forword(){
	 var type=getUrlValueByKey("type");
	var bno=getUrlValueByKey("bno");
	var userId=getUrlValueByKey("userId");
	if($.trim(bno)=="" || $.trim(userId)==""  ){
		return;
	}
	 if(type==1 || type==2 || type==3 ){
		
		 $.ajax({
				type : "GET",
				dataType : "json",
				url : "/service/ajax/express/detail?bno="+bno+"&userId="+userId+"&channelType="+type,
				//data:param,
				success: function(json){
					if($.trim(json)!="" && json.state=="Y" ){
						$("#pageForward").attr("node", json.data);
					}else{
						commontipsDialog("系统异常...");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					commontipsDialog("系统异常...");
				}
			});
	 }
 };
 
//订阅成功后的跳转
 function getSubscription(){
 	 //final String alipaylinkUrl = comp +"service/delivery/detail?bno="+bno+"&userId="+uid+"&channelType=1";
	 var bno=getUrlValueByKey("bno");
	 param={
 			 "bno":bno
 	 };
 	 $.ajax({
 			type : "POST",
 			dataType : "json",
 			url : "/service/subscription/querySub",
 			data:param,
 			success: function(json){
 				//如果是本人
 				if($.trim(json)!=""){
 						//如果已经是订阅了运单
 						if(json.data && json.state=="Y" && $.trim(json.data)!="" && json.data.state=="1"){
 							//已订阅处理
 						//是本人，且没有订阅该运单
 						}else{
 							$("#subButton").removeAttr("onclick").removeClass("btn-submit-grey").addClass("btn-submit");
 							
 							$("#subButton").unbind().bind("click",function(){
 								showTip2(1,null,null,"立即订阅","订阅快件动态，系统将会推送多条消息给您，确定订阅此运单号动态？","取消","确定");
 							});
 						}
 				}
 			},
 			error:function(XMLHttpRequest, textStatus, errorThrown){
 				commontipsDialog("系统异常...");
 			}
 		});

 };