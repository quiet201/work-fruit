jQuery(document).ready(
		function($) {
			//加日志
			$.post("/service/commonLog/addLog/L00103"); 
			//加载公共资源,并执行初始化方法
			getDescPage("commonPage","/page/common/tips/tips.html",'init');
});
function activeSubmit() {
	var $subBtn = $("#subBtn");
	if ($subBtn.attr("disabled")) {
		$subBtn.removeAttr("disabled");
	}
};
function init() {
	//初始化页面参数
	//slideRoatInfo(true);
	var urlParams = {
		bno : "",
		hasRoute : true
	};
	getUrlParams(urlParams);
	var billNo = $.trim(urlParams.bno);
	$("#waybill-num").text(billNo);
	//获取动态数据，添加监听
	//getEvaluationAjax(billNo);
	// urlParams.bno="134545590677";
	//数据展示 
	getDeliverySignAjax(urlParams);
	
	var isPushLink=getUrlValueByKey("param");
	if("1"==isPushLink){
		
		getCommonImg("1042","N","1");
	}
	whetherDoLuckDraw(urlParams.bno,2);//活动
};


// 获取评价参数
function getEvaluationAjax(waybillno) {
	// 数据提交
	$.ajax({
		type : "POST",
		data : {
			waybillNo : waybillno,
			evalType:'2'
		},
		dataType : "json",
		url : "/service/deliveryDetails/queryEvaluationService",
		success : function(data) {
			var urlEvaluate="1";//1 已经评价过 2：没有评价
			// 如果是有数据，并且是再次访问
			if (data.state == "Y") {
				
				$("#evaluates").append(data.lables);
				//如果是对该运单已经评价过了
				if( data.data.length > 0){
					urlEvaluate="1";//1 已经评价过 2：没有评价
				}else{
					urlEvaluate="2";//1 已经评价过 2：没有评价
					//setListen();//因为有动态数据读取，添加事件需要获取到数据后再添加监听
				};
				$("#evaluateItem").attr("type",urlEvaluate);
				$("#evaluateItem").unbind().bind("click",function(){
					var json=$("#evaluateItem").attr("node");
					var tpye=$("#evaluateItem").attr("type");
					location.href="/page/lanxin/deliverydetails/routing/evaluate.html?type="+tpye+"&json="+json;
				});
			}
		},
		error : function(e) {
			console.log("获取评论失败...");
		}
	});

};
// 获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for ( var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "bno") {
				urlParams.bno = unescape(strs[i].split("=")[1]);
			}
			if ([ strs[i].split("=")[0] ] == "hasRoute") {
				urlParams.hasRoute = unescape(strs[i].split("=")[1]);
			}
		}
	}
}
// 签收查询
function getDeliverySignAjax(obj) {
	$("#waitplease1").show();
	// 数据提交
	$.ajax({
				type : "POST",
				data : {
					waybillNo : obj.bno
				},
				dataType : "json",
				url : "/service/delivery/signed/" + obj.bno + "/true",
				success : function(data) {
					$("#waitplease1").hide();
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						var routes = $.parseJSON(data).routeNodes;
						var routesDetails = $.parseJSON(data).barNewList;
						var IsBind=$.parseJSON(data).IsBind;
						
						//判断安全签收是否可用
						var jf = $.parseJSON(data).jf;
						var imgArea = $.parseJSON(data).imgArea;
						var isBind = IsBind;
						
						if(jf==true&&imgArea==true&&isBind=="1"){
							//此时显示按钮 
							$('#imgCode').attr('class','ui-btn btn-submitserver');
							$('#imgCode').attr('onclick','createTwoImage('+obj.bno+')');
							
						}else if($.trim(isBind)!="1"){
							$('#imgCode').attr('class','ui-btn btn-submitserver-no');
							$('#imgCode').attr('onclick','alertError("不是收件人不能使用该服务")');
						}else {
							$('#imgCode').attr('class','ui-btn btn-submitserver-no');
							$('#imgCode').attr('onclick','alertError("服务持续开放中，敬请期待")');
						}
						
						if($.trim(isBind)!="1"){
							$('#imgOrder').attr('class','ui-btn btn-submitserver-no');
							$('#imgOrder').attr('onclick','alertError("不是收件人不能使用该服务")');
						}else{
							$('#imgOrder').attr('class','ui-btn btn-submitserver');
							$('#imgOrder').attr('onclick',"queryOrder('"+obj.bno+"','"+fillNull(values.fromCityName)+"','"+fillNull(values.toCityName)+"')");
						}
						if (values) {
							$("#startAdd").text(
									fillNull(values.fromCityName));
							$("#endAdd").text(fillNull(values.toCityName));
							/*var businesstype=fillNull(values.businesstype);*/
							/*$("#signPerson").html(fillNull(values.status));*/
							// 签收时间处理
							if($.trim(values.signTime)!= ""){
								$("#signTime").text(formatDate(values.signTime));
								//$("#signTime").text(fillNull(values.signTime));
								
								//根据签收时间判断是否可以进行评价操作
								var nowDate = getNowFormatDate();
								var days = getDateDiff(values.signTime,nowDate);
								//判断结果不为null且小于30的 可以进行评价操作
								if(null!=days&&days<30){
									getEvaluationAjax(obj.bno);
								}else{
									$('#evaluateItem').hide();
									$('#onEvaluateItem').show();
									$('#onEvaluateItem').attr("onclick","alertError('已超过服务评价时间');");
								}
							}else{
								$("#signTime").parent().hide();
							}
							
							if($.trim(values.consignorContName)!=""  && $.trim(IsBind)=="1"){
								$("#consignorContName").html("寄件方："+fillNull(values.consignorContName)); // 状态
							}else{
								$("#consignorContName").parent().attr("class","msg-content02").empty();
							}

						}
						
						//寄件方活动配置
						var comInfo = $.parseJSON(data).comInfo;
						var comInfoWj = $.parseJSON(data).comInfoWj;
						if(comInfo) {
							var activityStatus = comInfo.activityStatus;
							if(activityStatus == '2') {
								var jjf = "<a class='ui-angle-right2' id='comInfo' onclick=jumptoUrl('"+comInfo.hyperlinkUrl+"')><span><img src='"+comInfo.logoPath+"' width='100' height='40'></span><span class=''>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;"+comInfo.compName+"</span><span class='ui-btn btn-Abnormal'>"+comInfo.hyperlinkText+"</span></a>";
								$("#consignorContName").html(jjf);
							}
						}
						
						if(comInfoWj) {
							var investStatus = comInfoWj.investStatus;
							if(investStatus == '2') {
								var investigationUrl= comInfoWj.investigationUrl;
								if(investigationUrl != null && investigationUrl != '' && investigationUrl != 'undefined') {
									$('#investigation').attr('class','ui-btn btn-submitserver');
									$('#investigation').attr('onclick',"jumptoUrl('"+investigationUrl+"')");
									$('#investigation').show();
								}
							}
						}
						
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
						$(".ui-angle-right").attr("href","/page/lanxin/deliverydetails/routing/routeDetail.html?bno="+obj.bno);
						//小哥详情
						if (values.employ) {
							// 派送员手机
							//values.employ.deliveryPhone="";
							if(!fillNull(values.employ.deliveryPhone)){
								$("#tellPhone").addClass("phoneDisabled");
							}
							$("#deliveryPhone").text(
									fillNull(values.employ.deliveryPhone));
							 
							//快速呼叫href="tel:13457835604"
							if($.trim(values.employ.deliveryPhone)!=""){
								//$("#tellPhone").attr("href","tel:"+fillNull(values.employ.deliveryPhone));
							}
							//$("#tellPhone").attr("href","tel:"+fillNull(values.employ.deliveryPhone));
							// 派送员工号
							/*$("#empCode").text(
									fillNull(values.employ.empCode));*/
							var empName = fillNull(values.employ.empName);
							//此时对小哥姓名进行截取
							if(null!=empName&&empName.length>3){
								empName = empName.substr(0,3)+"...";
							}else if(null==empName||''==$.trim(empName)){
								empName = '顺丰小哥';
							}
							if(!variable1ObjectIsNull(empName)){
								empName = '顺丰小哥';
							}
							$("#empName").text(empName);
							/*$("#empName").text(
									fillNull(values.employ.empName));*/
							var imgUrl = values.employ.photoUrl ? values.employ.photoUrl
									: "../../../../css/common/img/sfman_2.jpg";
							//如果图片不存在后缀，需要加上后缀
							if(imgUrl.lastIndexOf(".")==-1 || !((imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".gif")
									|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".jpg")
									|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".png"))){
								$("#bigPhoto").attr("href",imgUrl+".jpg");
							}
							$("#photoUrl").attr("src", imgUrl);
							//小哥详情
							/*var deliverName = fillNull(values.employ.empName);//收派员名字
							var deliverPhone =fillNull(values.employ.deliveryPhone);//手拍员手机
							var deliverNo = fillNull(values.employ.empCode);//收派员工号
							var deliverImg =imgUrl;//收派员照片
							var xiaogeDs="/page/common/accepted/accepted.html?empName="+deliverName+"&mobile="+
							deliverPhone+"&empNo="+deliverNo+"&imgUrl="+deliverImg;
							$("#xiaogeDetails").attr("href",xiaogeDs);*/
						} else {
							$("#empName").text("顺丰小哥");
							//默认图片
							$("#photoUrl").attr("src",
											"../../../../css/common/img/sfman_2.jpg");
						};
						/*获取评价参数*/
						//是否能够评价
						if($.trim(IsBind)=="1"){
							getEvaluateParams(data);
						}else{
							//设置评价置灰
							$("#evaluateItem").hide();
							$('#onEvaluateItem').show();
						}
					}
					getCommonImg("10541","N","1");
				},
				error : function(e) {
					$("#waitplease1").hide();
					$("#waitplease").hide();
					console.log("服务器连接失败...");
					getCommonImg("10541","N","3");
				}
			});
};
function getEvaluateParams(data){
	var evaluateParams={};
	if($.trim(data)==""){
		return null;
	}else{
		var values = $.parseJSON(data).context;
		evaluateParams={
				fromCityName: values.fromCityName,
				toCityName	: values.toCityName,
				waybillno	: values.waybillno,
				signTime	: values.signTime,
				employ		: values.employ
		};
		$("#evaluateItem").attr("node",JSON.stringify(evaluateParams));
/*		location.href="/page/lanxin/deliverydetails/routing/evaluate.html?json="+JSON.stringify(evaluateParams);;*/
	}
};

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 1500);
}

function queryOrder(bnos,fromCity,toCity){
	var url='/page/common/qrcode/waybill-data.html?bno='+bnos+'&fromCity='+encodeURI(encodeURI(fromCity))+'&toCity='+encodeURI(encodeURI(toCity));
	location.href=url;	
}

function jumptoUrl(url){
	location.href=url;
}