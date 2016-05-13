jQuery(document).ready(function($) {
	//加载公共资源
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});
function init(){
	var ruleConfig={
			routeState:"",
			routeData :"",//路由信息
			ruleState : "",
			ruleData  :""//规则信息
		}; 
	$("#waitplease").show();
	var routePageId=$("#configPageId").attr("node");
	var replacePoints=getReplacePoint();
	//slideRoatInfo(true);滑动功能模块
	queryData(ruleConfig);
	var isPushLink=getUrlValueByKey("param");
	if("1"==isPushLink){
		
		getCommonImg("1042","N","1");
	}
	//获取规则匹配
	var bno = getQueryString("bno");
	getRuleReplaceSite(bno,routePageId,replacePoints,ruleConfig);
	var configSetting=function setReplace(){
		//如果路由信息已返回数据，那么就可以处理规则映射
		setTimeout(function (){
			if($.trim(ruleConfig.routeData)!="" && $.trim(ruleConfig.ruleData)!="" ){
					$("#waitplease").hide();
					replaceDom(ruleConfig.ruleData,"waybill");
			//报错处理		
			}else if(ruleConfig.routeState=="N" ||ruleConfig.ruleState=="N"){
				$("#waitplease").hide();
				return;//直接退出
			}else{
				configSetting();
			}},300);
	};
	setTimeout(function (){
		configSetting();//开始执行
	},1000);
	whetherDoLuckDraw(urlParams.bno,2);//活动
}
function queryData(ruleConfig) {
	// 获取运单号
	var waybillNo = getQueryString("bno");
	var url = "/service/delivery/onRoad/" + waybillNo + "/true";
	$("#waitplease1").show();
	$.ajax({
		type : "POST",
		data : null,
		dataType : "json",
		url : url,
		success : function(json) {
			$("#waitplease1").hide();
			ruleConfig.routeData=json;
			//$("#waitplease").hide();
			if ($.trim(json) != "") {
				// alert(json);
				var jsonData = $.parseJSON(json).context;
				var routesDetails = $.parseJSON(json).barNewList;
				$("#waybill-num").text(fillNull(jsonData.waybillno)); // 运单号
				$("#fromCityName").text(fillNull(jsonData.fromCityName)); // 原寄地
				$("#toCityName").text(fillNull(jsonData.toCityName)); // 目的地
				if($.trim(jsonData.expectedDate)!= ""){
					$("#expectedDate").text(formatDate(jsonData.expectedDate));
					//$("#expectedDate").text(fillNull(jsonData.expectedDate)); // 预计送达时间
				}else{
					$("#expectedDate").parent().hide();
				}
				$("#status").html(fillNull(jsonData.status)); // 状态
				//寄件方
				if($.trim(jsonData.consignorContName)!=""){
					$("#consignorContName").html("寄件方："+fillNull(jsonData.consignorContName)); // 状态
				}else{
					$("#consignorContName").parent().attr("class","msg-content02").empty();
				}
				/*$("#beginTime").text(fillNull(jsonData.beginTime));*/

				/*var businesstype=fillNull(jsonData.businesstype);运送状态： 飞机  汽车 */
				var latestItem=getLatestRouteItem(routesDetails);
				//设置最新状态记录
				if($.trim(latestItem) != ""){
					var innerItem=$("#latestTm").clone();
					innerItem.html(fillNull(latestItem.barScanDt+" "+latestItem.barScanTm));
					$("#latestState").html(latestItem.remark);
					$("#latestState").append(innerItem);
				};
				var jsonDetails=getDetailsJson(json);//去掉路由详情不必要的参数
				//设置跳转链接
				$(".ui-angle-right").attr("href","/page/xiaomi/deliverydetails/routing/routeDetail.html?details="+jsonDetails);
				/*var routeDetails = routeListResolve(routesDetails);
				$("#routeDetailsList").prepend(routeDetails);*/
			}
			getCommonImg("10511","N","1");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#waitplease1").hide();
			ruleConfig.routeState="N";
			getCommonImg("10511","N","3");
		}
	});

}

// 获取URL参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}