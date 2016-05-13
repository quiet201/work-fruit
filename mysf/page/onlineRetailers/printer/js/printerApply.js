/**
 * 
 */
// 打印机申领信息
function printerApply() {
	var urlParam = "/service/onlineretailers/getPrinterApply";
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
						if (/* true || */json.obj == null || json.obj.status==1 || json.obj.status==5) {
							//window.location.href = "./apply.html";
							window.location.href = "./stoped.html";
						} else {
							var obj = json.obj;
							var params = "linkman=pLinkman&phone=pPhone&provinceName=pProvinceName&cityName=pCityName&countyName=pCountyName&address=pAddress&status=pStatus&orderNo=pOrderNo";
							params = params.replace("pLinkman", obj.linkman);
							params = params.replace("pPhone", obj.phone);
							params = params.replace("pProvinceName",
									obj.provinceName);
							params = params.replace("pCityName", obj.cityName);
							params = params.replace("pCountyName",
									obj.countyName);
							params = params.replace("pAddress", obj.address);
							params = params.replace("pStatus", obj.status);
							params = params.replace("pOrderNo", obj.orderNo);
							var url = encodeURI("process.html?" + params);
							window.location.href = "./stoped.html?url=" + url;
						}
					}else{
						if(json.msg){
							alert(json.msg);
						}else{
							alert("后台服务器异常，请从顺手付重新进入电商之家！");
						}
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert("服务器连接失败");
				}
			});
}
function makeSureClick(){
	var makeSure = $('#makeSure').attr('class');
	if('ui-ico-sfi ico-box'==makeSure){
		$('#makeSure').attr('class','ui-ico-sfi ico-yes2');
	}else{
		$('#makeSure').attr('class','ui-ico-sfi ico-box');
	}
	
}

// 打印机申领信息
function getPrinterApplyByOrderNo() {
	var urlParam = "/service/onlineretailers/getPrinterApplyByOrderNo";
	var params = {};
	params.orderNo = $("#orderNo").val();
	//alert(params.orderNo);
	$.ajax({
		type : "GET",
		dataType : "json",
		data : params,
		url : urlParam,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		success : function(json) {
			if (json.code == "200") {
				var obj = json.obj;
				$("#orderNo").val(obj.orderNo);
				$("#status").val(obj.status);
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
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
		}
	});
}

// 打印机申领 信息提交
var submitingFlat = false;
function submitPrinterApply() {
	if('ui-ico-sfi ico-box'==$('#makeSure').attr('class')){
		alert("亲，请先阅读并同意活动规则，并勾选按纽才能提交！");
		return;
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


	var urlParam = "/service/onlineretailers/savePrinterApply";
	var params = {};
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
	if(true == submitingFlat){
		return;
	}else{
		submitingFlat = true;
	}
	
	$.ajax({
		type : "POST",
		dataType : "json",
		data : params,
		url : urlParam,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		success : function(json) {
			submitingFlat = false;
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
//				if(!$("#orderNo").val()){
					$("#orderNo").val(json.orderNo);
					$("#status").val(json.status);
					$("#monthCard").attr("readonly","readonly");
//				}
				
				window.location.href = json.url;
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
			submitingFlat = false;
		}
	});
}

function processInit() {
	var params = getURLParams();
	// 设置隐藏域信息
	$("#orderNo").val(params.orderNo);
	$("#linkman").text(params.linkman);
	// $("#provinceCode").val(provinceCode);
	$("#phone").text(params.phone);
	// $("#cityCode").val(cityCode);
	$("#address").text(params.address);
	// $("#countyCode").val(contyCode);
	// $("#destination").text(destination);
	$("#status01").attr("style", "display:none");
	$("#status02").attr("style", "display:none");
	$("#status03").attr("style", "display:none");
	$("#status04").attr("style", "display:none");
	$("#status05").attr("style", "display:none");
	
	$("#status4a").attr("style", "display:none");
	$("#status1a").attr("style", "display:none");
	var status = params.status;
	$("#status").val(status);
	if (1 == status) {
		$("#status01").attr("style", "display:block");
		$("#status1a").attr("style", "display:block");
	} else if (2 == status) {
		$("#status02").attr("style", "display:block");
		$("#status4a").attr("style", "display:block");
	} else if (3 == status) {
		$("#status04").attr("style", "display:block");
		$("#status4a").attr("style", "display:block");
	} else if (4 == status) {
		$("#status05").attr("style", "display:block");
		$("#status4a").attr("style", "display:block");
	} else if (5 == status) {
		$("#status03").attr("style", "display:block");
		$("#status1a").attr("style", "display:block");
	}
}

function getURLParams() {
	var obj = {};
	if (location.href.indexOf("?") != -1) {
		var strParams = location.href.substring(location.href.indexOf("?") + 1);
		var params = strParams.split("&");
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split("=");
			obj[param[0]] = decodeURI(param[1]);
		}
	}
	return obj;
}

function redirectPrinterApplyPage() {
	var url = "apply.html?orderNo=" + $("#orderNo").val()+"&status="+$("#status").val();
	location.href = encodeURI(url);
}

function checkPhone(_this){
	var phone = _this.value;
	var flag = !!phone.match(/^1[0-9]{10}$/);
	if (flag == false) {
		alert("手机号码是以1开头的11位数字组合！");
		return;
	}
}

function checkPhoneIsAllNumber(_this){
	var phone = _this.value;
	var flag = !!phone.match(/^1[0-9]*$/);
	if (flag == false) {
		alert("手机号码是以1开头的11位数字组合！");
		return;
	}
}

function checkIsAllNumber(value){
	var flag = !!value.match(/^[0-9]*$/);
	return flag;
}

function checkCustomerCardValid(_this){
	if(_this.value){
		var flag = checkIsAllNumber(_this.value);
		if(flag==false){
			alert("月结卡号是由纯数字组成。");
		}
		return flag;
	}
	
}


function checkCustomerCardNumber(_this){
	var value = _this.value;
	if(value){
		var flag = checkIsAllNumber(value);
		if(flag==false){
			alert("月结卡号是由纯数字组成。");
			return false;
		}
		if(value.length>=10){
			return true;
		}else{
			alert("月结卡号长度至少是10位或以上，请检查月结卡号。");
			return false;
		}
	}else{
		alert("请填写月结卡号。");
		return false;
	}
	
}

//打印机申领信息
function indexPrinterApplySearch() {
	var urlParam = "/service/onlineretailers/getPrinterApply";
	var params = {};
	$.ajax({
				type : "GET",
				dataType : "json",
				data : params,
				url : urlParam,
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				success : function(json) {
					if (json.code == "200") {
						if (json.obj == null) {
							$("#divIdStatus").attr("style","disploy:none");
							return;
						} else {
							var obj = json.obj;
							var status = json.obj.status;
							var strStatus="";
							if(status==1){
								strStatus = "已申领";
								$("#divIdStatus").attr("style","disploy:none");
								return;
							}else if(status==2){
								strStatus = "已支付";
							}else if(status==3){
								strStatus = "客服审核";
							}else if(status==4){
								strStatus = "已安装";
							}else if(status==5){
								strStatus = "已取消";
								$("#divIdStatus").attr("style","disploy:none");
								return;
							}
							$("#spanIdStatus").text(strStatus);
							$("#divIdStatus").attr("style","disploy:block");
						}
					}else{
						if(json.msg){
							alert(json.msg);
						}else{
							alert("后台服务器异常，请从顺手付重新进入电商之家！");
						}
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert("服务器连接失败");
				}
			});
}


