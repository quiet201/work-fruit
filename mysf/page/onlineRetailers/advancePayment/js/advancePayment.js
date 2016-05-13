/**
 * 
 */

function makeSureClick(){
	var makeSure = $('#makeSure').attr('class');
	if('ui-ico-sfi ico-box'==makeSure){
		$('#makeSure').attr('class','ui-ico-sfi ico-yes2');
	}else{
		$('#makeSure').attr('class','ui-ico-sfi ico-box');
	}
	
}



// 预付款客户信息提交
var submitAdvancePaymentFlat = false;
function submitAdvancePaymentCus() {
//	if('ui-ico-sfi ico-box'==$('#makeSure').attr('class')){
//		alert("亲，请先阅读并同意活动规则，并勾选按纽才能提交！");
//		return;
//	}
	var newFlag = true;
	if($("#id").val()){
		newFlag = false;
	}
	var monthCard = $("#monthCard").val();
	var linkMan = $("#linkMan").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var qq = $("#qq").val();
	var provinceName = $("#provinceName").val();
	var provinceCode = $("#provinceCode").val();
	var cityName = $("#cityName").val();
	var cityCode = $("#cityCode").val();
	var countyName = $("#countyName").val();
	var countyCode = $("#countyCode").val();
	var address = $("#address").val();
	var orderNo = $("#orderNo").val();
	var status = $("#status").val();
	if (!monthCard) {
		alert("月结卡号不能为空！");
		return;
	}else{
		if(false == checkCustomerCardNumber($("#monthCard").get(0))){
			return;
		}
	}
	if (!linkMan) {
		alert("联系人不能为空！");
		return;
	}
	if (!phone) {
		alert("手机号码不能为空！");
		return;
	} else {
		var flag = !!phone.match(/^1[0-9]{10}$/);
		if (flag == false) {
			alert("手机号码是以1开头的11位数字组合！");
			return;
		}
	}
	if(email){
		if(-1 == email.indexOf("@")){
			alert("邮箱地址必须包含@符号！");
			return;
		}
	}
	if (!provinceCode) {
		alert("收货地址不能为空！");
		return;
	}
	if (!address) {
		alert("详细地址不能为空！");
		return;
	}


	var urlParam = "/service/onlineretailers/saveOrUpdateAdvancePaymentCus";
	var params = {};
	if($("#id").val()){
		params.id=$("#id").val();
	}
	
	params.customerCard = monthCard;
	params.linkman = linkMan;
	params.phone = phone;
	params.email = email;
	params.qq = qq;
	// params.area = area;
	params.provinceName = provinceName;
	params.provinceCode = provinceCode;
	params.cityName = cityName;
	params.cityCode = cityCode;
	params.countyName = countyName;
	params.countyCode = countyCode;
	params.orderNo = orderNo;
	params.address = address;
	params.status = status;
	if(true == submitAdvancePaymentFlat){
		return;
	}else{
		submitAdvancePaymentFlat = true;
	}
	
	$.ajax({
		type : "POST",
		dataType : "json",
		data : params,
		url : urlParam,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		success : function(json) {
			submitAdvancePaymentFlat = false;
			var code = json.code;
			if (code == "404") {
				alert("月结卡号不存在，请核对！");
				return;
			}
			if(code=="405"){
				alert("该月结卡号类型为非月结类型，不能参与活动，请提供月结类型的月结卡号！");
				return;			
			}
			if (code == "402") {
				alert("后台服务器异常，请重新提交！");
				return;
			}
			if (code == "200") {
				// 跳转到理财页面
				// josn.url="./sfbank.html";
				if(newFlag){
					$("#id").val(json.id);
					//$("#status").val(json.status);
					$("#monthCard").attr("readonly","readonly");
					window.location.href = "account_Balance.html";
				}else{
					alert("数据保存成功！");
				}
				
				
			}
			if (code == "401") {
				alert("后台获取服务器信息异常，请退出当前页面，重新从顺手付菜单点击电商之家菜单！");
				return;
			}
			if(code=="501"){
				alert("该月结卡号已注册申领过，不能重复进行申领！");
				return;
			}
			if(code=="502"){
				alert("一个顺手付账号只能支付一笔申领订单！");
				return;
			}
			if (code == "-1") {
				alert("保存失败，请重新提交！");
				return;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
			submitAdvancePaymentFlat = false;
		}
	});
}

//预付款信息
function fillAdvancePaymentCusInfo() {
	var urlParam = "/service/onlineretailers/queryAdvancePaymentCus";
	var params = {};

	$
			.ajax({
				type : "GET",
				dataType : "json",
				data : params,
				url : urlParam,
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				success : function(json) {
					if (json.code == "200") {
						var obj = json.obj;
						$("#id").val(obj.id);
						//$("#status").val(obj.status);
						$("#monthCard").val(obj.customerCard);
						$("#linkMan").val(obj.linkman);
						$("#phone").val(obj.phone);
						if(obj.email){
							$("#email").val(obj.email);
						}
						$("#qq").val(obj.qq);
						$("#provinceName").val(obj.provinceName);
						$("#provinceCode").val(obj.provinceCode);
						$("#cityName").val(obj.cityName);
						$("#cityCode").val(obj.cityCode);
						$("#countyName").val(obj.countyName);
						$("#countyCode").val(obj.countyCode);
						$("#address").val(obj.address);
						var destination = fillNull(obj.provinceName) + " "
								+ fillNull(obj.cityName) + " "
								+ fillNull(obj.countyName);
						$("#destination").text(destination);
					}else{
						alert(json.msg);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert("服务器连接失败");
				}
			});
}

//预付款信息
function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0;
}
var submitThawAdvancePaymentFlag = false;
function submitThawAdvancePayment() {
	var obj = {};
	obj.type=2;
	obj.amount=Number($("#idUnfrezonAmount").val());
	obj.blanceAmount=Number($("#idBlanceAmount").text());
	if(!obj.amount){
		alert("解冻金额必须是大于0的数字！");
		return;
	}
	if(false == isInteger(obj.amount)){
		alert("解冻金额必须是整数！");
		return;
	}
	if(obj.amount<=0){
		alert("解冻金额必须是大于0的整数！");
		return;
	}
	if(obj.amount>obj.blanceAmount){
		alert("解冻金额不能大于冻结金额，请重新输入！");
		return;
	}
	
	if(submitThawAdvancePaymentFlag){
		return;
	}else{
		submitThawAdvancePaymentFlag = true;
	}
	var urlParam = "/service/onlineretailers/saveAdvancePaymentRec";
	var params = obj;

	$
			.ajax({
				type : "POST",
				dataType : "json",
				data : params,
				url : urlParam,
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				success : function(json) {
					submitThawAdvancePaymentFlag = false;
					var code = json.code;

					if (code == "-1") {
						alert(json.msg);
						return;
					}
					if (code == "200") {
						// 跳转到理财页面
						// josn.url="./sfbank.html";
//						if(!$("#orderNo").val()){
//							$("#orderNo").val(json.orderNo);
							//$("#status").val(json.status);
							//$("#monthCard").attr("readonly","readonly");
//						}
						//$("#amount").val(0);
						$("#idBlanceAmount").text("0.00");
						$("#idUnfrezonAmount").val("0.00");
						window.location.href = "account_Balance.html";
						
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert("服务器连接失败");
					submitThawAdvancePaymentFlag = false;
				}
			});
}

//充值金额
var submitFrozenAmountFlag = false;
function submitFrozenAdvancePayment() {
	if('ui-ico-sfi ico-box'==$('#makeSure').attr('class')){
		alert("亲，请先阅读并同意活动规则，并勾选按钮才能提交！");
		return;
	}
	var obj = {};
	obj.type=1;
	obj.amount=Number($("#amount").val());
	if(obj.amount<=0){
		alert("充值金额必须是大于0的的整数！");
		return;
	}
	if(false == isInteger(obj.amount)){
		alert("充值金额必须是整数！");
		return;
	}
	obj.frozen=1;
//	if(obj.amount<=0){
//		alert("冻结金额不能小于0");
//		return;
//	}
	//saveAdvancePaymentRec(obj);
	var params = obj;
	if(submitFrozenAmountFlag){
		return;
	}else{
		submitFrozenAmountFlag = true;
	}
	var urlParam = "/service/onlineretailers/saveAdvancePaymentRec";
	//var params = {};

	$
			.ajax({
				type : "POST",
				dataType : "json",
				data : params,
				url : urlParam,
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				success : function(json) {
					submitFrozenAmountFlag = false;
					var code = json.code;

					if (code == "402") {
						alert("后台服务器异常，请重新提交！");
						return;
					}
					if (code == "-1") {
						alert("后台服务器异常，请重新提交！");
						return;
					}
					if (code == "200") {
						// 跳转到理财页面
						// josn.url="./sfbank.html";
//						if(!$("#orderNo").val()){
//							$("#orderNo").val(json.orderNo);
							//$("#status").val(json.status);
							//$("#monthCard").attr("readonly","readonly");
//						}
						//$("#amount").val(0);
						window.location.href = json.url;
						
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert("服务器连接失败");
					submitFrozenAmountFlag = false;
				}
			});
}

//function saveAdvancePaymentRec(params){
//	if(submitAdvancePaymentFlag){
//		return;
//	}else{
//		submitAdvancePaymentFlag = true;
//	}
//	var urlParam = "/service/onlineretailers/saveAdvancePaymentRec";
//	//var params = {};
//
//	$
//			.ajax({
//				type : "POST",
//				dataType : "json",
//				data : params,
//				url : urlParam,
//				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
//				success : function(json) {
//					submitAdvancePaymentFlag = false;
//					var code = json.code;
//
//					if (code == "402") {
//						alert("后台服务器异常，请重新提交！");
//						return;
//					}
//					if (code == "200") {
//						// 跳转到理财页面
//						// josn.url="./sfbank.html";
////						if(!$("#orderNo").val()){
////							$("#orderNo").val(json.orderNo);
//							//$("#status").val(json.status);
//							//$("#monthCard").attr("readonly","readonly");
////						}
//						//$("#amount").val(0);
//						window.location.href = json.url;
//						
//					}
//				},
//				error : function(XMLHttpRequest, textStatus, errorThrown) {
//					// alert("服务器连接失败");
//					submitAdvancePaymentFlag = false;
//				}
//			});
//}

function queryAdvancePaymentRecs(callBackFun){

	var urlParam = "/service/onlineretailers/queryAdvancePaymentRecs";
	var params = {};
	$.ajax({
		type : "GET",
		dataType : "json",
		data : params,
		url : urlParam,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		success : function(json) {
			var code = json.code;
			if (code == "402") {
				alert("后台服务器异常，请重新提交！");
				return;
			}
			if (code == "200") {
				var objs = json.obj;
				if(typeof callBackFun == 'function'){
					callBackFun(objs);
				}
			}

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
		}
	});

}

function redirectRechargeClick(){
	//活动已结束，停止充值功能
	alert("亲爱的用户，本服务已下线，如需解冻资金请直接解冻！");
	return;
	window.location.href="account_Refill.html";
}

function redirectThawClick(){
	
	var blanceAmount = $("#idBlanceAmount").text();
	window.location.href="account_Unfreeze.html?blanceAmount="+blanceAmount;
}

function queryAdvancePaymentBlanceAmount(){
	var urlParam = "/service/onlineretailers/queryAdvancePaymentRecFrozenTotal";
	var params = {};
	$.ajax({
		type : "GET",
		dataType : "json",
		data : params,
		url : urlParam,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		success : function(json) {
			var code = json.code;
			if (code == "402") {
				alert("后台服务器异常！");
				return;
			}
			if (code == "200") {
				var obj = json.obj;
				if(obj){
					$("#idBlanceAmount").text(obj);
				}
				
			}

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
		}
	});
}	







