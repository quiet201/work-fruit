var bno;
$(function() {
	var urlParams = {
		bno : "",
		result:"",
		askId :""
	}; 
	init(urlParams);

	//getData(urlParams,ruleConfig);
	
	checkStyle(urlParams.bno);
	//当地址栏传递的地址簿ID不为空时查询 
	/*if($.trim(urlParams.askId) != ""){
	 selectAndSetSentAddressBook(urlParams.askId);
	}*/
	
	$('#btnBack').attr('href','/page/alipay/deliverydetails/routing/waybill-2-1-routing.html?bno='+urlParams.bno+'&&hasRoute=true');
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
				bno = urlParams.bno ;
			}
			if ([ strs[i].split("=")[0] ] == "result") {
				urlParams.result = unescape(strs[i].split("=")[1]);
			}
			if ([ strs[i].split("=")[0] ] == "askId") {
				urlParams.askId = unescape(strs[i].split("=")[1]);
			}
		}
	}
};

function checkStyle(bno){
	$.ajax({
		type : "POST",
		data : {},
		async : false,
		dataType : "json",
		url : "/service/order/orderContro/getGaiPaistatus/"+bno,
		success : function(data) {
			if (data && data != null) {
				var result = $.parseJSON(data);
				var status = result.status;
				var progresss = result.progresss;
				if('1'==progresss&&'1'==status){
					 $('#gaipai0').show();
					 $('#btnWay').show();
					}else if('2'==progresss){
					 $('#gaipai1').show();	
					 $('#btnWay').show();
					}else if('3'==progresss){
					 $('#gaipai2').show();
					 $('#btnWay').show();
					 //$('#btnService1').show();
					}else if('4'==progresss){
						//此时判断是否异常
						var reasonCode = result.reasonCode;
						
						var method = result.payMethod;
						var payMethod = result.payMethod;
						
						var freight = result.freight;
						
						if('1' == method ){
							method ='商家付';
						}else if('2' == method ){
							method = '收件人付';
						}else{
							method = null;
						}
						
						$('#payMethod').text(method);
						$('#freight').text(freight);
						
						if('05'==reasonCode){
							$('#gaipai3').show();
							$('#gaipai3-1').show();	
							$('#btnService1').show();
							$('#freightInfo').show();
						}else if('06'==reasonCode){
							 $('#gaipai4').show();
							 $('#gaipai4-1').show();
							 $('#btnService').show();
							 $('#freightInfo').show();
							 $('#errorMsg').text('更改收货地址失败：快件在快递小哥手上，请与他直接联系吧！联系方式点击“查件”、输入单号即可看到。');
						}else if('07'==reasonCode){
							 $('#gaipai4').show();
							 $('#gaipai4-1').show();
							 $('#btnService').show();
							 $('#freightInfo').show();
							 $('#errorMsg').text('更改收货地址失败：寄件人不同意更改收货地址，请与他（她）直接沟通吧！');
						}else if('08'==reasonCode){
							 $('#gaipai4').show();
							 $('#gaipai4-1').show();
							 $('#btnService').show();
							 $('#freightInfo').show();
							 $('#errorMsg').text('更改收货地址失败：寄件人不同意支付运费，请与他（她）直接沟通吧！');
						}else if('09'==reasonCode){
							 $('#gaipai4').show();
							 $('#gaipai4-1').show();
							 $('#btnService').show();
							 $('#freightInfo').show();
							 $('#errorMsg').text('地址更改失败：顺丰联系不到寄件人，无法为您办理服务。请您通过旺旺、QQ等途径获取寄件人联系方式，然后联系顺丰在线客服为您办理。');
						}else if('10'==reasonCode){
							 $('#gaipai4').show();
							 $('#gaipai4-1').show();
							 $('#btnService').show();
							 $('#freightInfo').show();
							 $('#errorMsg').text('更改收货地址失败：请联系在线客服。');
						}else if('11'==reasonCode){
							 $('#gaipai4').show();
							 $('#gaipai4-1').show();
							 $('#btnService').show();
							 $('#freightInfo').show();
							 $('#errorMsg').text('更改收货地址失败：新地址不在顺丰服务范围内，您不同意使用其他快递公司承运。');
						}else if('12'==reasonCode){
							 $('#gaipai4').show();
							 $('#gaipai4-1').show();
							 $('#btnService').show();
							 $('#freightInfo').show();
							 $('#errorMsg').text('更改收货地址失败，您已取消更改收货地址。');
						}
						
						
						if(payMethod=='0'){
							$('#freightInfo').hide();
						}
					
					}else{
					// $('#gaipai1').show();
					   $('#gaipai0').show();
					}
				
				var address = result.newAddress;
				var array = address.split(",");
				
				$("#name").text(array[0]); 			//姓名
				$("#tel").text(array[1]); 	//电话
				$("#address").text(array[2]); 
			}else{
				alert("查询失败");
				//tipsDialog("查询失败");
				//getCommonImg("1028","N","2");
			}
		},
		error : function(e) {
			//tipsDialog("查询失败");
			//getCommonImg("1028","N","3");
		}
	});

	// $('#gaipai1').show();	
	
	/*if('1'==result){
	 $('#gaipai1').show();	
	}else if('2'==result){
	 $('#gaipai2').show();	
	}else if('3'==result){
	 $('#gaipai3').show();
	 $('#gaipai3-1').show();
	}else if('4'==result){
	 $('#gaipai4').show();
	 $('#gaipai4-1').show();
	}else if('5'==result){
		
	}*/
	
}


function selectAndSetSentAddressBook(asbkId){
	// 数据提交
	$.ajax({
		type : "POST",
		data : {sentAsbkId:asbkId},
		async : false,
		dataType : "json",
		url : "/service/sendaddress/sendbook/findonebook/"+asbkId,
		success : function(data) {
			if (data && data != null) {
				fillSentInfo(data,"userSentAddress","dataBase");
			}else{
				alert("查询失败");
				//tipsDialog("查询失败");
				//getCommonImg("1028","N","2");
			}
		},
		error : function(e) {
			//tipsDialog("查询失败");
			//getCommonImg("1028","N","3");
		}
	});
}


function fillSentInfo(data,cookieKey,dataSource){
	
	if(data && data != null){
		//如果数据来组 cookie 则转换成 json 格式
		if(dataSource == "cookie"){
			data = $.parseJSON(data);
		}
		
		//设置页面文本
		$("#name").text(data.userName); 			//姓名
		$("#tel").text(data.telePhoneNuber); 	//电话
		$("#address").text(data.areaName+" "+data.detailAdress); 		//用户地址
		
	
			
	}
	
}


function toWayBill(){
	var url = '/page/alipay/deliverydetails/routing/waybill-2-1-routing.html';
	window.location = url+'?bno='+bno+'&hasRoute=true';
}