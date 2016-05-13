//获取最新一条路由详情记录
function  getLatestRouteItem(data){
	if($.trim(data)==""){
		return null;
	}
	return data[data.length-1];
};
function getDetailsJson(data){
	if($.trim(data)==""){
		return null;
	}
	var json=$.parseJSON(data);
	var context=json.context;
	var barNewList=dowithBarNewList(json.barNewList);
	
	var detailsJson={
			"waybillno"		:fillNull(context.waybillno),
			"fromCityName"	:fillNull(context.fromCityName),
			"toCityName"	:fillNull(context.toCityName),
			"barNewList"	: barNewList
	};
	return JSON.stringify(detailsJson);
};
function dowithBarNewList(data){
	if($.trim(data)==""){
		return null;
	}
	var result=[];
	$.each(data,function(index,item){
		if($.trim( item.remark)!=""){
			item.remark=item.remark.replace(/&/g, "-");
		}
		var obj={
			barScanDt: item.barScanDt,
			barScanTm:item.barScanTm,
			remark: item.remark
		};
		result.push(obj);
	});
	return result;
	
};
//展示路由详情节点
function routeListResolve(data){
	var showList="";
	if(data && data.length>0){
		for(var i=data.length-1;i>=0;i--){
			param=data[i];
			if($.trim(showList)==""){
				showList="<li><p class='details'>"+param.remark+"</p><p class='date'><span>"+
				" "+param.barScanDt+" "+param.barScanTm+"</span></p><span class='dot'></span></li>";
			}else{
				showList=showList+"<li><p class='details'>"+param.remark+"</p><p class='date'><span>"+
				" "+param.barScanDt+" "+param.barScanTm+"</span></p><span class='dot'></span></li>";
			}
		};
	}
	return showList;
 
};

//订阅成功后的跳转
function getSubscription(bno,id,removeClass,addClass,isMy,channelType){
	 //final String alipaylinkUrl = comp +"service/delivery/detail?bno="+bno+"&userId="+uid+"&channelType=1";
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
				//if(isMy){不判断是否本人
					if($.trim(json)!=""){
						$("#"+id).removeAttr("onclick");//提示
						//如果已经是订阅了运单
						if(json.data && json.state=="Y" && $.trim(json.data)!="" && json.data.state=="1"){
							$("#"+id).removeClass(removeClass).addClass(addClass);
							$("#"+id).html("查看订阅动态");//如果是已经订阅服务
							$("#"+id).attr("href","/page/common/subscription/subscribeMsgSuccess.html?bno="+bno+"&serviceTm="+json.data.serviceTm+"&rate="+json.data.rate+"&page="+location.href);

						//是本人，且没有订阅该运单
						}else{
							$("#"+id).removeClass(removeClass).addClass(addClass);
							$("#"+id).html("订阅快件动态");//如果是已经订阅服务
							$("#"+id).attr("href","/page/common/subscription/subscribeMsg.html?bno="+bno+"&page="+location.href+"&type="+channelType);
						}
					}
					
				//}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				commontipsDialog("系统异常...");
			}
		});

};
