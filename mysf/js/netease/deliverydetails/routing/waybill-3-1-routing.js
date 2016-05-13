var bno;
var isBind;
$(function() {
	//加日志
	$.post("/service/commonLog/addLog/L00102"); 
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');	
});
function init(obj) {
	$('#isMessage').hide();
	$('#noMessage').hide();
	$('#doMessage').hide();
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
	//$("#waitplease").show();
	var routePageId=$("#configPageId").attr("node");
	getUrlParams(urlParams);
	setOpenId(urlParams);
	bno = urlParams.bno;
	
	var replacePoints=getReplacePoint();
	// 设置运单号
	$("#waybill-num").text(urlParams.bno);
	getData(ruleConfig,urlParams);
	
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
	$("#tellPhone").off("click").on("click",function(){
		if($.trim($("#tellPhone").attr("href"))==""){
			$("#conmment-tips").show();
			setTimeout(function() {
				$("#conmment-tips").fadeOut();
			}, 1000);
		}
	});
	
}

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
	if($.trim(openId)==""){
		return;
	}
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
	$("#waitplease1").show();
	// 数据提交
	$.ajax({
				type : "POST",
				data : {
					waybillno : obj.bno
				},
				dataType : "json",
				url : "/service/delivery/arrive/query44BarWayBill/" + obj.bno + "/" + obj.hasRoute,
				success : function(data) {
					$("#waitplease1").hide();
					ruleConfig.routeData=data;
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						/*var routes = $.parseJSON(data).routeNodes;*/
						var routesDetails = $.parseJSON(data).barNewList;
						var isMessage = $.parseJSON(data).isMessage;
						var noMessage = $.parseJSON(data).doMessage;
						//nonYou = $.parseJSON(data).nonYou;
						if('true'==isMessage){
							$('#noMessage').hide();
							if('true'== noMessage){
								//此时后台未查到改派记录
								$('#isMessage').show();
								$('#doMessage').hide();
							}else{
								$('#doMessage').show();
								$('#isMessage').hide();
							}
						}
						else{
							$('#noMessage').show();
							$('#isMessage').hide();
						}
						
						var wetherUrgeType = $.parseJSON(data).wetherUrgeType;
						var wetherUrges = $.parseJSON(data).wetherUrges;
						    isBind = $.parseJSON(data).IsBind;
						isUragType(wetherUrgeType,wetherUrges,obj.bno,isBind);
						
						
						if (values) {
							//1为本人，0为非本人
							if(isBind=="1"){
								$("#consignorContName").html("寄件方："+fillNull(values.consignorContName)); // 状态
							}else{
								$("#consignorContName").parent().attr("class","msg-content02").empty();
							}
							$("#startAdd").text(
									fillNull(values.fromCityName));
							$("#endAdd").text(fillNull(values.toCityName));
							/*var businesstype=fillNull(values.businesstype);*/
							
							if($.trim(values.expectedDate)!= ""){
								$("#expectedDate").text(formatDate(values.expectedDate));
								//$("#expectedDate").text(fillNull(values.expectedDate)); // 预计送达时间
							}else{
								$("#expectedDate").parent().hide();
							}
							/*$("#beginTime").text(fillNull(values.beginTime));*/
							/*$("#receivertips").html(fillNull(values.status));*/
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
									$("#tellPhone").attr("href","tel:"+fillNull(values.employ.deliveryPhone));
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
								$("#empName").text(empName);
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
								var deliverName = fillNull(values.employ.empName);//收派员名字
								var deliverPhone =fillNull(values.employ.deliveryPhone);//手拍员手机
								var deliverNo = fillNull(values.employ.empCode);//收派员工号
								var deliverImg =imgUrl;//收派员照片
								var xiaogeDs="/page/netease/accepted/accepted.html?empName="+deliverName+"&mobile="+
								deliverPhone+"&empNo="+deliverNo+"&imgUrl="+values.employ.mendianUrl;
								$("#xiaogeDetails").attr("href",xiaogeDs);
								
								//判断安全签收是否可用
								var jf = $.parseJSON(data).jf;
								var imgArea = $.parseJSON(data).imgArea;
								
								
								if(jf==true&&imgArea==true&&isBind=="1"){
									//此时显示按钮 
									$('#imgCode').attr('class','ui-btn btn-submitserver');
									$('#imgCode').attr('onclick','createTwoImage('+obj.bno+')');
									
								}else if(isBind!="1"){
									$('#imgCode').attr('class','ui-btn btn-submitserver-no');
									$('#imgCode').attr('onclick','alertError("不是你的快件不能进行安全签收哦~")');
								}else {
									$('#imgCode').attr('class','ui-btn btn-submitserver-no');
									$('#imgCode').attr('onclick','alertError("服务持续开放中，敬请期待")');
								}
								
								if(isBind!="1"){
									$('#imgOrder').attr('class','ui-btn btn-submitserver-no');
									$('#imgOrder').attr('onclick','alertError("不是你的快件不能查看运单哦~")');
								}else{
									$('#imgOrder').attr('class','ui-btn btn-submitserver');
									$('#imgOrder').attr('onclick','queryOrder('+obj.bno+')');
								}
							} else {
								//默认图片
								$("#photoUrl").attr("src",
												"../../../../css/common/img/sfman_2.jpg");
							};
							
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
						$(".ui-angle-right").attr("href","/page/netease/deliverydetails/routing/routeDetail.html?details="+jsonDetails);
					};
					getCommonImg("10531","N","1");
				},
				error : function(e) {
					$("#waitplease1").hide();
					ruleConfig.routeState="N";
					getCommonImg("10531","N","3");
				}
			});
	
}

function doMessage(){
	var urls='aMessage.html';
	window.location = urls+"?bno="+bno;	
}

function queryMessage(){
	var urls='aMessage_success.html';
	window.location = urls+"?bno="+bno;
}

function showMessage(){
	//提示服务范围开放
	if("1"==isBind){
		alertError('服务持续开放中，敬请期待');	
	}else{
		alertError('不是收件人不能使用该服务');
	}
	
}

//判断是否可催派
function isUragType(wetherUrgeType,wetherUrges,orderNo,isBind){
	if('02'==wetherUrgeType){
		if('01'!=wetherUrges){
			$('#priority').attr('class','ui-btn btn-submitserver');
			$('#priority').attr("onclick","hurryToSend(\'"+orderNo+"\',this)");
		}else{
			$('#priority').attr('class','ui-btn btn-submitserver-no');
			$('#priority').attr("onclick","alertError('已经提醒过啦！')");
			$('#priority').text('已提醒优先');
			}
	  }else{
		 /* if('01'==wetherUrges){
			  $('#priority').attr('class','ui-btn btn-submitserver-no');
			  $('#priority').attr("onclick","");
			  $('#priority').text('提醒优先');  
		  }*/
		  $('#priority').attr('class','ui-btn btn-submitserver-no');
		  $('#priority').attr("onclick","showMessage();");
		  $('#priority').text('优先派送'); 
	  }
}



//文本提示弹出层
function tipsDialog(content){
	//var $dialog = $('<div class="dialog-tips"></div>');
	//var $content = $('<div class="content"></div>');
	var $dialog = $('<div class="black_overlay"></div>');
	var $content = $('<div class="white_content"></div>');
	var $content1 = $('<div style="text-align: right; cursor: default; height: 40px;"></div>');
	$content.html("<p>"+content+"</p>");
	$dialog.append($content);
	$("body").append($dialog);  
	var windowHeight = $(window).height();  
	var popupHeight = $dialog.height(); 
	var top = (windowHeight-popupHeight)/2+(windowHeight-popupHeight)/5;
	$dialog.css({"top": top}).fadeIn(500);		
	setTimeout(function () {
		$dialog.fadeOut(500);
	}, 2500);
}


function tipsDialog3(contect,orderNo,type){
	var $mask = $('<div class="maskbox" style="z-index:10; opacity:.9;" id="showCancel"></div>');
	var $tip = $('<div class="tip-box"></div>');
	var $content = $('<h2>'+contect+'</h2>');
	var $tipBtn = $('<div class="tip-btn"></div>');
	var $bottom;
	var $btnSubmit;
	if(1==type){
		$bottom = $('<a class="tip-btn-a1" href="javascript:void(0);" id="btnCancel">'+
				'<div class="tip-btn-a-div">取消</div></a>');
	    $btnSubmit = $('<a class="tip-btn-a2" href="javascript:cancelOrder(\''+orderNo+'\');" id="btnOk">'+
				'<div class="tip-btn-a-div">确认</div></a>');
		    	//</a><a class="ui-btn btn-submit" href="javascript:cancelOrder(\''+orderNo+'\');">确定</a>');
	}else{
		$bottom = $('<a class="tip-btn-a1" href="javascript:void(0);" id="btnCancel" onclick="removeDialogs();">'+
		        '<div class="tip-btn-a-div">取消</div></a>');
        $btnSubmit = $('<a class="tip-btn-a2" href="javascript:cancelOrder(\''+orderNo+'\');" id="btnOk">'+
		'<div class="tip-btn-a-div">确认</div></a>');
	}
	
	//将各部分标签组合起来
	$tipBtn.append($bottom);
	$tipBtn.append($btnSubmit);
	$tip.append($content);
	$tip.append($tipBtn);
	$mask.append($tip);
	$("body").append($mask);
	
	
}

function alertSuccess(contect){
	$('#MsgInfo').text(contect);
	$('#success').show();
	setTimeout(function () {
		$('#success').fadeOut(500);
	}, 1500);
}

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 1500);
}

//催派
function hurryToSend(orderNo){	
	$.ajax({
		type : "POST",
		data : null,
		dataType : "json",
		url : "/service/order/orderContro/hastenBill/"+orderNo+"/4",
		success: function(json){
			if(json && json != null){
				if(json=='1'){	
				alertSuccess('已成功提醒收派员优先派送您的快件');
				getCommonImg("1144","N","1");
				//修改按钮样式
				$('#priority').attr('class','ui-btn btn-submitserver-no');
				$('#priority').attr("onclick","");
				$('#priority').text('已提醒优先');
				}
			else{
				    alertError('系统繁忙，请稍后再试！');
					getCommonImg("1144","N","2");
				}
			}
			else{
				alertError('系统繁忙，请稍后再试！');
				getCommonImg("1144","N","2");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alertError('系统繁忙，请稍后再试！');
			getCommonImg("1144","N","3");
		}
	});
	//$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
}

/*//改变样式，移除单击熟悉
function changeColorStyle(event){
	$(event).css('background-color','#cccccc');
	$(event).text('已提醒收件 ');
	$(event).removeAttr("onclick");
}*/

//调用生成二维码
function createTwoImage(bnos){
	/*var bnos = '755123456789';
	var telephones = '13632957845';*/
	$.ajax({
		type : "POST",
		data :{bno:bnos},
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



