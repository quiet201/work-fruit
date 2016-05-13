$(document).ready(function(){
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});
function init(){
	getDate();
};
function getDate(){
	var userId=getUrlValueByKey("userId");
	var timestamp=getUrlValueByKey("timestamp");
	var hashCode=getUrlValueByKey("hashCode");
	var params={
		"userId":userId,
		"timestamp":timestamp,
		"hashCode":hashCode
	};
	$.ajax({
		type : "POST",
		data : params,
		dataType : "json",
		url : "/service/online/service/"+userId+"/"+timestamp+"/"+hashCode,
		success: function(data){
			createDom(data);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			commontipsDialog("加载客服名片异常...");
		}
	});
};
function createDom(data){
	if($.trim(data)!=""){
		//用户信息
		$("#cusName").text("姓名："+fillNull(data.name));
		$("#cusSex").text("性别："+fillNull(data.sex));
		$("#cusChannel").text("用户来源："+fillNull(data.channelType));
		$("#cusAccount").text("账户："+fillNull(data.accounts));
		$("#cusAddress").text("常用收件地："+fillNull(data.sefulRecipientAddresses));
		$("#cusCard").text("月结卡号："+fillNull(data.monthlyCard));
		
		//寄给我的快件
		$("#receiveExpressCount").text("7天内收件信息("+fillNull(data.receiveExpressCount)+")");
		$("#receiveExpressBtn").text("加载更多("+fillNull(data.receiveExpressCount)+")");
		if($.trim(data.receiveExpressList)!=""){
			$.each(data.receiveExpressList,function(index,value){
				var temp=$("#receiveExpressTemp").clone();
				temp.removeAttr("id");//取掉ID
				temp.find("#receiveExpressBno").text("运单号："+fillNull(value.bno)).removeAttr("id");
				temp.find("#receiveExpressAdd").text(fillNull(value.srcAdd)+"——"+fillNull(value.descAdd)).removeAttr("id");
				temp.find("#receiveExpressExpTm").text("预计送达时间："+fillNull(value.predictTm)).removeAttr("id");
				temp.find("#receiveExpressRemark").text("最新动态："+fillNull(value.latestState)).removeAttr("id");
				temp.find("#receiveExpressTm").text(""+fillNull(value.latestTm)).removeAttr("id");
				//控制显示10条记录
				if(index<9){
					temp.show();
				}else{
					$("#receiveExpressMore").show();
				}
				$("#receiveExpressDetail ul:first").append(temp);
			});
		}
		
		//我寄出的快件
		$("#sendExpressCount").text("3天内寄件信息("+fillNull(data.sendExpressCount)+")");
		$("#sendExpressBtn").text("加载更多("+fillNull(data.sendExpressCount)+")");
		if($.trim(data.sendExpressList)!=""){
			$.each(data.sendExpressList,function(index,value){
				var temp=$("#sendExpressTemp").clone();
				temp.removeAttr("id");//取掉ID
				temp.find("#sendExpressBno").text("运单号："+fillNull(value.bno)).removeAttr("id");
				temp.find("#sendExpressOrderTm").text("下单时间："+fillNull(value.orderTm)).removeAttr("id");
				temp.find("#sendExpressRemark").text("最新动态："+fillNull(value.orderState)).removeAttr("id");
				temp.find("#sendExpressName").text(fillNull(value.orderName)).removeAttr("id");
				temp.find("#sendExpressPhone").text(fillNull(value.phone)).removeAttr("id");
				temp.find("#sendExpressAdd").text(fillNull(value.sendAdd)).removeAttr("id");
				//控制显示10条记录
				if(index<9){
					temp.show();
				}else{
					$("#sendExpressMore").show();
				}
				$("#sendExpressDetail ul:first").append(temp);
				//tempSum=tempSum+temp[0];
			});
			//$("#sendExpressTemp").after(tempSum);
			
		}
		
		//我的查件
		$("#queryExpressCount").text("3天内查件信息("+fillNull(data.queryExpressCount)+")");
		$("#queryExpressBtn").text("加载更多("+fillNull(data.queryExpressCount)+")");
		if($.trim(data.queryExpressList)!=""){
			$.each(data.queryExpressList,function(index,value){
				var temp=$("#queryExpressTemp").clone();
				temp.removeAttr("id");//取掉ID
				temp.find("#queryExpressBno").text("运单号："+fillNull(value.bno)).removeAttr("id");
				temp.find("#queryExpressAdd").text(fillNull(value.srcAdd)+"——"+fillNull(value.descAdd)).removeAttr("id");
				temp.find("#queryExpressExpTm").text("预计送达时间："+fillNull(value.predictTm)).removeAttr("id");
				temp.find("#queryExpressQueryTm").text(""+fillNull(value.queryBnoTm)).removeAttr("id");
				temp.find("#queryExpressRemark").text("最新动态："+fillNull(value.latestState)).removeAttr("id");
				temp.find("#queryExpressTm").text(""+fillNull(value.latestTm)).removeAttr("id");
				//控制显示10条记录
				if(index<9){
					temp.show();
				}else{
					//$("#queryExpressMore .btn-submit").attr("class","colorgray");
					$("#queryExpressMore").show();
					
				}
				$("#queryExpressDetail ul:first").append(temp);
			});
			
		}
	}else{
		commontipsDialog("加载客服名片出错...");
	}
	
};
// type  1：寄给我的快件    2：我寄出的快件   3：我的查件历史
function showMore(id,expId,butId){
	$("#"+id+" li").show();
	//模板需要隐藏
	$("#"+expId).hide();
	//$("#queryExpressMore .btn-submit").attr("class","colorgray");
	$("#"+butId).attr("class","colorgray");
	$("#"+butId).text("已全部加载完成");
}
