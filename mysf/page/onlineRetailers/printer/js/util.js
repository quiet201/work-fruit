/**
 * 
 */


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
							}else if(status==2){
								strStatus = "已支付";
							}else if(status==2){
								strStatus = "客服审核";
							}else if(status==2){
								strStatus = "已安装";
							}else if(status==2){
								strStatus = "已取消";
							}
							$("#spanIdStatus").text(strStatus);
						}
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert("服务器连接失败");
				}
			});
}


