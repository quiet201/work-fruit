/**
 * 
 */
// 预付款信息
function redirectAdvancePayment() {
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
						if (/* true || */json.obj == null) {
							alert("亲爱的用户，本活动已结束，");
							return;
							window.location.href = "/page/onlineRetailers/advancePayment/customerInfo.html";
						} else {
							var url = "/page/onlineRetailers/advancePayment/account_Balance.html";
							window.location.href = url;
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



