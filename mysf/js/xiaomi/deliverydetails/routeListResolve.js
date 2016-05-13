
//列表组装展示
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
function getReplacePoint(){
	var bf="";
	if($.trim($(".replaces"))!=""){
		$.each($(".replaces"),function(index,value){
			bf=bf+$(value).attr("id")+",";
		});
	}
	if(bf.substring(bf.length-1,bf.length)==","){
		bf=bf.substring(0, bf.length-1);
	}
	return bf;
};
/**
 * getRuleReplaceSite 获取引擎规则
 * @param bno
 * @param pageId
 * @param sites
 */
function getRuleReplaceSite(bno,pageId,sites,ruleConfig){
	if($.trim(bno)=="" || bno.length!=12 || $.trim(pageId)==""  ||$.trim(sites)==""  ){
		$("#waitplease").hide();
		console.info("参数不符合规则，匹配规则终止");
		return;
	}
	var param={
		"bno"	:bno,	
		"pageId":pageId,
		"channelType":"2",
		"sites"	:sites
	};
	$.ajax({
		type 	: "POST",
		data	:param,
		dataType : "json",
		url 	: "/service/alipay/getRuleReplaceSite",
		success: function(json){
			ruleConfig.ruleData= json;//获取规则值
			
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			ruleConfig.ruleState="N";
			alert("获取规则失败");
		}
	});
};
