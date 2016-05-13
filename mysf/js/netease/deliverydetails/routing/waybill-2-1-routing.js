var bno;
$(function() {
	//加日志
	$.post("/service/commonLog/addLog/L00101");
	//加载公共资源
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});

function init() {
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
	//$("#waitplease").show();
	var routePageId=$("#configPageId").attr("node");
	getUrlParams(urlParams);
	//slideRoatInfo(true);滑块效果
	var replacePoints=getReplacePoint();
	// 设置运单号
	$("#waybill-num").text(urlParams.bno);
	getData(urlParams,ruleConfig);
	var isPushLink=getUrlValueByKey("param");
	if("1"==isPushLink){
		
		getCommonImg("1042","N","1");
	}
	//获取规则匹配
	getRuleReplaceSite(urlParams.bno,routePageId,replacePoints,ruleConfig);
	var configSetting=function setReplace(){
		//如果路由信息已返回数据，那么就可以处理规则映射
		setTimeout(function (){
			if($.trim(ruleConfig.routeData)!="" && $.trim(ruleConfig.ruleData)!="" ){
					//$("#waitplease").hide();
					replaceDom(ruleConfig.ruleData,"testPosition001");
			//报错处理		
			}else if(ruleConfig.routeState=="N" ||ruleConfig.ruleState=="N"){
				//$("#waitplease").hide();
				return;//直接退出
			}else{
				configSetting();
			}},300);
	};
	setTimeout(function (){
		configSetting();//开始执行
	},1000);
	//订阅坚挺subscreptionBno
	subscreptionBno(urlParams.bno);
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
						/*if($.trim(values.consignorContName)!="" && $.trim(nonYou)==""){
							$("#consignorContName").html("寄件方："+fillNull(values.consignorContName)); // 状态
						}else{
							$("#consignorContName").parent().attr("class","msg-content02").empty();
						}*/
						
						//判断安全签收是否可用
						var jf = $.parseJSON(data).jf;
						var imgArea = $.parseJSON(data).imgArea;
						var isBind = $.parseJSON(data).IsBind;
						
						if(jf==true&&imgArea==true&&isBind=="1"){
							//此时显示按钮 
							$('#imgCode').attr('class','ui-btn btn-submitserver');
							$('#imgCode').attr('onclick','createTwoImage('+obj.bno+')');
							
						}else if(isBind!="1"){
							$('#imgCode').attr('class','ui-btn btn-submitserver-no');
							$('#imgCode').attr('onclick',"alertError('不是你的快件不能进行安全签收哦~')");
						}else {
							$('#imgCode').attr('class','ui-btn btn-submitserver-no');
							$('#imgCode').attr('onclick',"alertError('服务持续开放中，敬请期待')");
						}
						
						if(isBind!="1"){
							$('#imgOrder').attr('class','ui-btn btn-submitserver-no');
							$('#imgOrder').attr('onclick',"alertError('不是你的快件不能查看运单哦~')");
						}else{
							$('#imgOrder').attr('class','ui-btn btn-submitserver');
							$('#imgOrder').attr('onclick','queryOrder('+obj.bno+','+values.fromCityName+','+values.toCityName+')');
						}
						/*if('true'==isGaiPai){
							$('#noGaiPai').hide();
							if('true'== doGaiPai){
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
						}*/
						
						if (values) {
							$("#startAdd").text(
									fillNull(values.fromCityName));
							$("#endAdd").text(fillNull(values.toCityName));
							if($.trim(values.expectedDate)!= ""){
								$("#expectedDate").text(formatDate(values.expectedDate));
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
							if(19<=latestItem.barScanTm.length){
								innerItem.html(fillNull(" "+latestItem.barScanTm));	
							}else{
							 innerItem.html(fillNull(latestItem.barScanDt+" "+latestItem.barScanTm));
							}
							$("#latestState").html(latestItem.remark);
							$("#latestState").append(innerItem);
						};
						var jsonDetails=getDetailsJson(data);//去掉路由详情不必要的参数
						//设置跳转链接
						$(".ui-angle-right").attr("href",
								"/page/netease/deliverydetails/routing/routeDetail.html?details="+jsonDetails);
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
function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2500);
}

function showMessage(){
	//提示服务范围开放
	if(null==nonYou){
		alertError('服务持续开放中，敬请期待');	
	}else{
		alertError('不是您的快件，不能使用该服务哦~');
	}
	
}

//调用生成二维码
function createTwoImage(bnos){
	/*var bnos = '755123456789';
	var telephones = '13632957845';*/
	$.ajax({
		type : "POST",
		data :{bno:bnos,channel:'4'},
		async : false,
		dataType : "json",
		url : "/service/delivery/arrive/getTwoImage",
		success : function(data) {
			//alert(data);
			//将此路径转发至安全签收页面
			var imgPath = data;
			var url = "/page/common/qrcode/qrcode_common.html";
			location.href=url+'?bno='+bnos+'&twoImageUrl='+imgPath;
		},
		error : function(e) {
			return;
		}
	});
	
}

function queryOrder(bnos){
	var url='/page/common/qrcode/waybill-data.html';
	location.href=url+'?bno='+bnos;
	
}
