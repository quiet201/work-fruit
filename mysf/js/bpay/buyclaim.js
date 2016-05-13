$(document).ready(function (){
	//加日志
	$.post("/service/commonLog/addLog/L00904");
	var bjClaims = getCookie('bjClaims');
	bjClaims = $.parseJSON(bjClaims);
	if(null!=bjClaims&&""!=bjClaims){
	if (bjClaims.bNo != null || bjClaims.bNo != undefined || bjClaims.bNo != '') {
		$("#bNo").val(bjClaims.bNo);
	}
	if (bjClaims.phoneNo != null || bjClaims.phoneNo != undefined || bjClaims.phoneNo != '') {
		$("#phoneNo").val(bjClaims.phoneNo);
	}
	if (bjClaims.claimType != null || bjClaims.claimType != undefined || bjClaims.claimType != '') {
		$("#claimType").val(bjClaims.claimType);
	}
	if (bjClaims.claimType != null || bjClaims.claimType != undefined || bjClaims.claimType != '') {
		$("#claimDetil").val(bjClaims.claimDetil);
	}
	if (bjClaims.sign != null || bjClaims.sign != undefined || bjClaims.sign != '') {
		$("#sign").val(bjClaims.sign);
	}
	if(2 == $('#claimType').val()){
		$('#signDiv').show();
		$("#poshun").mousedown();
	}else{
		$('#signDiv').hide();
		$("#yishi").mousedown();
	}
	if(2 == $('#sign').val()){
		$("#sign2").mousedown();
	}else{
		$("#sign1").mousedown();
	}
	}
});


$("#poshun").on('touchstart mousedown',function(e){
	e.preventDefault();
	$("#poshun").removeClass('btn-buttom-hkj');
	$("#poshun").addClass('btn-buttom-smsj');
	$("#yishi").removeClass('btn-buttom-smsj');
	$("#yishi").addClass('btn-buttom-hkj');
	$("#icoposhun").removeClass('ico-poshun-no');
	$("#icoposhun").addClass('ico-poshun');
	$("#icoyishi").removeClass('ico-yishi');
	$("#icoyishi").addClass('ico-yishi-no');
	$('#claimType').val(2);
	$('#uMsg').text("包裹拒签、签收7天内可申请破损理赔，确认后每单赔付100元。");
	$('#claimDetil').attr('placeholder','破损包裹的物品名称、数量、重量、收派员是否提醒验货、您是否当面验货、外包装是否破损。');
	$('#signDiv').show();
});

$("#yishi").on('touchstart mousedown',function(e){
	e.preventDefault();
	$("#yishi").removeClass('btn-buttom-hkj');
	$("#yishi").addClass('btn-buttom-smsj');
	$("#poshun").removeClass('btn-buttom-smsj');
	$("#poshun").addClass('btn-buttom-hkj');
	$('#claimType').val(1);
	$('#uMsg').text("包裹寄出后超过7天未收到可申请遗失理赔，确认后每单赔付500元。");
	$("#icoyishi").removeClass('ico-yishi-no');
	$("#icoyishi").addClass('ico-yishi');
	$("#icoposhun").removeClass('ico-poshun');
	$("#icoposhun").addClass('ico-poshun-no');
	$('#claimDetil').attr('placeholder','遗失包裹是部分遗失还是全部遗失，遗失物品名称、数量、价值，如您是部分遗失，您是否当面验货，外包装是否破损。');
	$('#signDiv').hide();
});

$("#sign1").on('touchstart mousedown',function(e){
	e.preventDefault();
	$("#sign1").removeClass('btn-buttom-wqs');
	$("#sign1").addClass('btn-buttom-yqs');
	$("#sign2").removeClass('btn-buttom-yqs');
	$("#sign2").addClass('btn-buttom-wqs');
	$('#sign').val(1);
	$('#signMsg').text("您成功签收快件。");
	
});

$("#sign2").on('touchstart mousedown',function(e){
	e.preventDefault();
	$("#sign2").removeClass('btn-buttom-wqs');
	$("#sign2").addClass('btn-buttom-yqs');
	$("#sign1").removeClass('btn-buttom-yqs');
	$("#sign1").addClass('btn-buttom-wqs');
	$('#sign').val(2);
	$('#signMsg').text("您已拒签快件。");
	
});

function validateForm(){
	var phoneNo = $('#phoneNo').val();
	var phoneNoFilter=/^(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])\d{8}$/; 
	if(phoneNo.length != 11){
		alertErrors('请输入有效的手机号码!');
	   return false;
	}else if(phoneNo != null && phoneNo != ""){
	   if(!phoneNoFilter.test(phoneNo)){
		   alertErrors("手机号码错误,请重新填写!");
		   return false;
	   }
	}
	
	var bNo = $('#bNo').val();
	var bNoFilter=/\d{12}$/; 
	if(bNo.length != 12){
		alertErrors('请输入有效的运单号码!');
	   return false;
	}else if(bNo != null && bNo != ""){
	   if(!bNoFilter.test(bNo)){
		   alertErrors("运单号码错误,请重新填写!");
		   return false;
	   }
	}
	
	var claimDetil = $('#claimDetil').val();
	if(claimDetil == null || claimDetil == "" || undefined==claimDetil){
	   alertErrors("请输入理赔说明!");
	   return false;
	}
	
	return true;
}
$("#submitFrom").on('touchstart mousedown',function(e){
	submit();
});

function submit(){
	var falg = validateForm();
	if(falg){
		$("#submitFrom").removeClass("btn-submit02");
		$("#submitFrom").addClass("btn-submit02-no");
		$('#submitFrom').unbind();//去掉a标签中的onclick事件
		var bjClaims = {
			phoneNo : $("#phoneNo").val(),
			bNo : $("#bNo").val(),
			claimType : $("#claimType").val(),
			claimDetil : $("#claimDetil").val(),
			sign : $("#sign").val(),
			channel:'1'
		
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
//					$("#submitFrom").removeClass("btn-submit02-no");
//				  	$("#submitFrom").addClass("btn-submit02");
//				  	$("#submitFrom").on('touchstart mousedown',function(e){
//				  		submit();
//				  	});
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

