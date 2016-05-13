$(document).ready(function (){
	
	var urlParams = {
			bno : "",
			name:""
		};
	
	//获取参数
	//bjParam(urlParams);
	
	init(urlParams);
	
	
});

//获取地址栏中的参数信息
function init(obj){
	getUrlParams(obj);
}

function getUrlParams(urlParams) {
	/*var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("=");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "userName") {
				urlParams.name = unescape($.trim(strs[i].split("=")[1]));
				$('#name').text(urlParams.name);
			}
			if ([ strs[i].split("=")[0] ] == "bNo") {
				urlParams.bno = unescape($.trim(strs[i].split("=")[1]));
			}
		}
	}*/
	 var str = getUrlValueByKey("bpayProcess");
	 var bpayProcess = JSON.parse(str); 
	 urlParams.name = bpayProcess.clientName;
	 $('#name').text(urlParams.name);
	 urlParams.bno = bpayProcess.bNo;
}


function submit(){
	
	 var isBtn = checkSub();
	 
	 if("1"==$.trim(isBtn)){
		
		 //此时将参数组合进json数据
		 var str = getUrlValueByKey("bpayProcess");
		 var bpayProcess = JSON.parse(str); //由JSON字符串转换为JSON对象
		/* $('#phoneNo').text(bpayProcess.phoneNo);	
			$('#bNo').text(bpayProcess.bNo);	
			$('#claimType').text(bpayProcess.claimType==1?'遗失':'破损');	
			$('#claimDetil').text(bpayProcess.claimDetil);	
			$('#bpayTm1').text(bpayProcess.bpayTm1.replace('+',' '));
			$('#bpayTm2').text(bpayProcess.bpayTm2.replace('+',' '));*/ 
				var bjClaims = {
					phoneNo : bpayProcess.phoneNo,
					bNo : bpayProcess.bNo,
					claimType : bpayProcess.claimType,
					claimDetil : bpayProcess.claimDetil,
					//sign : $("#sign").val(),
					sign : bpayProcess.sign,
					channel:'1',
					cardCode:$('#cardNum').val(),
					userName:$('#name').text(),
					bankType:$("#band").val(),
					bankName:$('#band  option:selected').text()
					
				};
				setCookieMin("bjClaims",JSON.stringify(bjClaims),60*24);
				$.ajax({
					type : "POST",
					data : bjClaims,
					url : "/service/bj/purchaseBj/createBjClaim",
					success : function(url) {
						 if (url != null || url != undefined || url != '') {
							 window.location.href = url;
						 }else{
//							$("#submitFrom").removeClass("btn-submit02-no");
//						  	$("#submitFrom").addClass("btn-submit02");
//						  	$("#submitFrom").on('touchstart mousedown',function(e){
//						  		submit();
//						  	});
						 }
					},
					error : function(e) {
						alertErrors("系统繁忙，请稍后重试。");
						 setTimeout(function() {
							 $("#submitFrom").removeClass("btn-submit02-no");
							 $("#submitFrom").addClass("btn-submit02");
							 $("#submitFrom").on('touchstart mousedown',function(e){
								submit();
							});
						}, 1000);
						console.log("操作失败...");
						getCommonImg("113","N","3");
					}
				});
			
		 
	 }
	
}

//校验填写是否合法
function checkSub(){
	
	var bindId = $("#band").val();
	var cardNum = $('#cardNum').text();
	//0不能提交 1 提交
	var isBtn = 1;
	if(null==$.trim(bindId)){
		alertError("请选择开卡银行");
		isBtn = 0;
		return isBtn;
	}
	if("chose"==$.trim(bindId)){
		alertError("请选择开卡银行");
		isBtn = 0;
		return isBtn;
	}
	if(null==$.trim(cardNum)){
		alertError("请填写银行卡号");
		isBtn = 0;
		return isBtn;
	}
	/*if(!(/^\d{19}$/.test($.trim(cardNum)))){
		alertError("请填写正确的银行卡号");
		isBtn = 0;
		return isBtn;
	}*/
	return isBtn;
}


function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2500);
}

