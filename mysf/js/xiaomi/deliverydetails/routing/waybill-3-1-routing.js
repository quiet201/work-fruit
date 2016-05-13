$(function() {
	//加日志
	$.post("/service/commonLog/addLog/L00102"); 
	var urlParams = {
		bno : "",
		hasRoute : true,
		openId : ""
	};
	var ruleConfig={
			routeState:"",
			routeData :"",//路由信息
			ruleState : "",
			ruleData  :""//规则信息
		};
	$("#waitplease").show();
	var routePageId=$("#configPageId").attr("node");
	
	var replacePoints=getReplacePoint();
	$('.fancybox').fancybox();
	init(urlParams);
	setOpenId(urlParams);
	roatInfor();
	// 设置运单号
	$("#waybill-num").text(urlParams.bno);
	// 设置有参数的单号 "134545590677";
	// urlParams.bno= "134545590677";
	getData(ruleConfig,urlParams);
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
	$("#tellPhone").off("click").on("click",function(){
		if($.trim($("#tellPhone").attr("href"))==""){
			$("#conmment-tips").show();
			setTimeout(function() {
				$("#conmment-tips").fadeOut();
			}, 1000);
		}
	});
});
function init(obj) {
	getUrlParams(obj);
}
function roatInfor() {
	slideRoatInfo(true);

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
			if ([ strs[i].split("=")[0] ] == "openId") {
				urlParams.openId = unescape(strs[i].split("=")[1]);
			}
		}
	}
}

//设置openId到session
function setOpenId(urlParams) {
	var openId = urlParams.openId;
	$.ajax({
		type : "POST",
		data : {openId:openId},
		async : false,
		dataType : "json",
		url : "/service/setOpenId/"+openId,
		success : function(data) {
			return;
		},
		error : function(e) {
			return;
		}
	});
}
function getData(ruleConfig,obj) {
	// 数据提交
	$.ajax({
				type : "POST",
				data : {
					waybillno : obj.bno
				},
				dataType : "json",
				url : "/service/delivery/arrive/" + obj.bno + "/" + obj.hasRoute,
				success : function(data) {
					ruleConfig.routeData=data;
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						var routes = $.parseJSON(data).routeNodes;
						var routesDetails = $.parseJSON(data).barNewList;
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
							if (values.employ) {
								// 派送员手机
								//values.employ.deliveryPhone="";
								if(!convertNull(values.employ.deliveryPhone)){
									$("#tellPhone").addClass("phoneDisabled");
								}
								$("#deliveryPhone").text(
										convertNull(values.employ.deliveryPhone));
								 
								//快速呼叫href="tel:13457835604"
								if($.trim(values.employ.deliveryPhone)!=""){
									$("#tellPhone").attr("href","tel:"+convertNull(values.employ.deliveryPhone));
								}
								//$("#tellPhone").attr("href","tel:"+convertNull(values.employ.deliveryPhone));
								// 派送员工号
								$("#empCode").text(
										convertNull(values.employ.empCode));
								$("#empName").text(
										convertNull(values.employ.empName));
								var imgUrl = values.employ.photoUrl ? values.employ.photoUrl
										: "../../../images/xiaomi/defalut-image.png";
								//如果图片不存在后缀，需要加上后缀
								if(imgUrl.lastIndexOf(".")==-1 || !((imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".gif")
										|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".jpg")
										|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".png"))){
									$("#bigPhoto").attr("href",imgUrl+".jpg");
								}
								$("#photoUrl").attr("src", imgUrl);
							} else {
								$("#photoUrl").attr("src",
												"../../../images/xiaomi/defalut-image.png");
							};
							
						}
						;
						var routeDetails = routeListResolve(routesDetails);
						$("#routeDetailsList").prepend(routeDetails);
						if (routes) {
							for ( var i = 1; i < 3; i++) {
								var time=(routes["time" + i]?routes["time" + i]:"？？？");
								$("#imgRouteTops" + i).text(routes["node" + i]);
								$("#imgRouteDate" + i).text(time);
							}
						}
						//广告设置  填充下拉图片url
						if ($.trim(values.interactiveRing)!="") {
							$("#advi-img").attr("src", values.interactiveRing);
						} else {
							$("#advi-img").attr("src","../../../images/ad/../../../images/ad/xiaomi900X100.png");
						}
					};
					getCommonImg("10531","N","1");
				},
				error : function(e) {
					ruleConfig.routeState="N";
					getCommonImg("10531","N","3");
				}
			});
	
}

