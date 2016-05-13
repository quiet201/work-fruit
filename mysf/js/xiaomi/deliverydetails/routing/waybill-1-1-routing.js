jQuery(document).ready(function($) {
	var ruleConfig={
			routeState:"",
			routeData :"",//路由信息
			ruleState : "",
			ruleData  :""//规则信息
		};
	$("#waitplease").show();
	var routePageId=$("#configPageId").attr("node");
	slideRoatInfo(true);
	var replacePoints=getReplacePoint();
	queryData(ruleConfig);
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
});

function queryData(ruleConfig) {
	// 获取运单号
	var waybillNo = getQueryString("bno");
	var hasRoute = getQueryString("hasRoute");
	var url = "/service/delivery/onRoad/" + waybillNo + "/true";
	$.ajax({
		type : "POST",
		data : null,
		dataType : "json",
		url : url,
		success : function(json) {
			ruleConfig.routeData=json;
			//$("#waitplease").hide();
			if ($.trim(json) != "") {
				// alert(json);
				var jsonData = $.parseJSON(json).context;
				var routesDetails = $.parseJSON(json).barNewList;
				$("#waybill-num").text(convertNull(jsonData.waybillno)); // 运单号
				$("#fromCityName").text(convertNull(jsonData.fromCityName)); // 原寄地
				$("#toCityName").text(convertNull(jsonData.toCityName)); // 目的地
				$("#expectedDate").text(convertNull(jsonData.expectedDate)); // 预计送达时间
				$("#status").html(convertNull(jsonData.status)); // 状态
				$("#beginTime").text(convertNull(jsonData.beginTime));

				var businesstype=convertNull(jsonData.businesstype);
				
				// 运输方式图片处理
				// 空运
				//if (businesstype == '2'){
				if (false){
					$(".icons-process img").attr("src",
					"../../../images/xiaomi/icons-process-plane.png");
				}else{
					$(".icons-process img").attr("src",
					"../../../images/xiaomi/icons-process-car.png");
				}

				// 填充下拉图片url
				if ($.trim(jsonData.interactiveRing)!="") {
					$("#advi-img").attr("src", jsonData.interactiveRing);
				} else {
					$("#advi-img").attr("src",
							"../../../images/ad/../../../images/ad/xiaomi900X100.png");
				}

				var routeDetails = routeListResolve(routesDetails);
				$("#routeDetailsList").prepend(routeDetails);
			}
			getCommonImg("10511","N","1");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
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