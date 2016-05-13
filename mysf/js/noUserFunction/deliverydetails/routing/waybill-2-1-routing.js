var bno;
$(function() {
	//加载公共资源
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});

function init() {
	$('#noGaiPai').hide();
	$('#isGaiPai').hide();
	$('#doGaiPai').hide();
	
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
	getUrlParams(urlParams);
	//slideRoatInfo(true);滑块效果
	var replacePoints=getReplacePoint();
	// 设置运单号
	$("#waybill-num").text(urlParams.bno);
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
				bno = urlParams.bno;
			}
			if ([ strs[i].split("=")[0] ] == "hasRoute") {
				urlParams.hasRoute = unescape(strs[i].split("=")[1]);
			}
		}
	}
};
function getData(obj,ruleConfig) {
	$("#waitplease1").show();
	// 数据提交
	$.ajax({
				type : "POST",
				data : {
					waybillno : obj.bno
				},
				dataType : "json",
				url : "/service/delivery/onRoad/" + obj.bno + "/true",
				success : function(data) {
					$("#waitplease1").hide();
					ruleConfig.routeData=data;
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						var routes = $.parseJSON(data).routeNodes;
						var routesDetails = $.parseJSON(data).barNewList;
						var pageIds=$.parseJSON(data).pageIds;
						var pageSites=$.parseJSON(data).pageSites;
						
						
						var isGaiPai = $.parseJSON(data).isGaiPai;
						var doGaiPai = $.parseJSON(data).doGaiPai;
						if($.trim(values.consignorContName)!=""){
							//$("#consignorContName").html("寄件方："+fillNull(values.consignorContName)); // 状态
						}else{
							//$("#consignorContName").parent().attr("class","msg-content02").empty();
						}
						if('true'==isGaiPai){
							$('#noGaiPai').hide();
							if('true'== doGaiPai){
								/*/page/common/addressbook/receive/address_menber2.htm*/
								//此时后台未查到改派记录
								$('#isGaiPai').show();
								$('#doGaiPai').hide();
							}else{
								$('#doGaiPai').show();
								$('#isGaiPai').hide();
							}
						}
						else{
							$('#noGaiPai').show();
							$('#isGaiPai').hide();
						}
						
						if (values) {
							$("#startAdd").text(
									fillNull(values.fromCityName));
							$("#endAdd").text(fillNull(values.toCityName));
							if($.trim(values.expectedDate)!= ""){
								$("#expectedDate").text(formatDate(jsonData.expectedDate));
								//$("#expectedDate").text(fillNull(values.expectedDate)); // 预计送达时间
							}else{
								$("#expectedDate").parent().hide();
							}
							//$("#beginTime").text(fillNull(values.beginTime));
							/*$("#receivertips").html(fillNull(values.status));*/
							
						};
						var latestItem=getLatestRouteItem(routesDetails);
						//设置最新状态记录
						if($.trim(latestItem) != ""){
							var innerItem=$("#latestTm").clone();
							innerItem.html(fillNull(latestItem.barScanDt +" "+latestItem.barScanTm));
							$("#latestState").html(latestItem.remark);
							$("#latestState").append(innerItem);
						};
						var jsonDetails=getDetailsJson(data);//去掉路由详情不必要的参数
						//设置跳转链接
						$(".ui-angle-right").attr("href",
								"/page/noUserFunction/deliverydetails/routing/routeDetail.html?details="+jsonDetails);
					};
					getCommonImg("10521","N","1");
				},
				error : function(e) {
					$("#waitplease1").hide();
					ruleConfig.routeState="N";
					getCommonImg("10521","N","3");
				}
			});

};

function alertSuccess(contect){
	$('#MsgInfo').text(contect);
	$('#success').show();
	setTimeout(function () {
		$('#success').fadeOut(500);
	}, 2500);
}

function showMessage(){
	//提示服务范围开放
	alertSuccess('服务持续开放中，敬请期待');
}

function changeAddress(){
	var url='/page/noUserFunction/gaipai/gaipai.html';
	location.href = url+"?bno="+bno;
}

function changeAddressStatus(){
	var url='/page/noUserFunction/gaipai/gaiPaiInfo.html';
	location.href = url+"?bno="+bno;
}
