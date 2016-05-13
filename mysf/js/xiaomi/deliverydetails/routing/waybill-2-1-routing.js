$(function() {
	//加日志
	$.post("/service/commonLog/addLog/L00101");
	var urlParams = {
		bno : "",
		hasRoute :true
	};
	var ruleConfig={
		routeState:"",
		routeData :"",//路由信息
		ruleState : "",
		ruleData  :""//规则信息
	};
	$("#waitplease").show();
	var routePageId=$("#configPageId").attr("node");
	init(urlParams);
	slideRoatInfo(true);
	var replacePoints=getReplacePoint();
	// 设置运单号
	$("#waybill-num").text(urlParams.bno);
	// 设置有参数的单号 "134545590677";
	// urlParams.bno= "134545590677";
	//测试异步数据
	/*setTimeout(function (){
		getData(urlParams,ruleConfig);
	},5000);*/
	getData(urlParams,ruleConfig);
	
	//获取规则匹配
	getRuleReplaceSite(urlParams.bno,routePageId,replacePoints,ruleConfig);
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

function init(obj) {
	getUrlParams(obj);
};

// 获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "bno") {
				urlParams.bno = unescape($.trim(strs[i].split("=")[1]));
			}
			if ([ strs[i].split("=")[0] ] == "hasRoute") {
				urlParams.hasRoute = unescape(strs[i].split("=")[1]);
			}
		}
	}
};
function getData(obj,ruleConfig) {
	
	// 数据提交
	$.ajax({
				type : "POST",
				data : {
					waybillno : obj.bno
				},
				dataType : "json",
				url : "/service/delivery/onRoad/" + obj.bno + "/true",
				success : function(data) {
					ruleConfig.routeData=data;
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						var routes = $.parseJSON(data).routeNodes;
						var routesDetails = $.parseJSON(data).barNewList;
						var pageIds=$.parseJSON(data).pageIds;
						var pageSites=$.parseJSON(data).pageSites;
						
						if (values) {
							$("#startAdd").text(
									convertNull(values.fromCityName));
							$("#endAdd").text(convertNull(values.toCityName));
							var businesstype=convertNull(values.businesstype);
							
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
							
							$(".expected-process strong").text(
									convertNull(values.expectedDate));
							$("#beginTime").text(convertNull(values.beginTime));
							// <span id="receivertips">快件正在派送中,派件人罗莉莉,电话<span
							// id="deliveryPhone">15013883053</span></span>
							$("#receivertips").html(convertNull(values.status));
							//设置运送中图片
							if(businesstype == '2'){
								$(".img-wrapper img")
								.attr("src",
								"../../../images/xiaomi/senddingPlane.gif");
							}else{
								$(".img-wrapper img")
								.attr("src",
								"../../../images/xiaomi/senddingCar.gif");
							}
						};
						//广告设置  填充下拉图片url
						if ($.trim(values)!="" &&  $.trim(values.interactiveRing)!="") {
							$("#advi-img").attr("src", values.interactiveRing);
						} else {
							$("#advi-img").attr("src","../../../images/ad/../../../images/ad/xiaomi900X100.png");
						}
						
						if (routes) {
							for ( var i = 1; i < 2; i++) {
								$("#imgRouteTops" + i).text(routes["node" + i]);
								$("#imgRouteDate" + i).text(routes["time" + i]);
							}
						}
						var routeDetails = routeListResolve(routesDetails);
						$("#routeDetailsList").prepend(routeDetails);
					};
					getCommonImg("10521","N","1");
				},
				error : function(e) {
					ruleConfig.routeState="N";
					getCommonImg("10521","N","3");
				}
			});

};
