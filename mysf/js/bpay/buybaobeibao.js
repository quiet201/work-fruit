$(document).ready(function (){
	//加日志
	$.post("/service/commonLog/addLog/L00902");
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	
	//获取当前登录用户的手机号码
	/*$.ajax({
		type : "POST",
		url : "/service/bj/purchaseBj/getCurUserPhoneNo",
		success : function(data) {
			$("#mobileNo").val(data);
		},
		error : function(e) {
			console.log("处理失败...");
		}
	});*/
});

function init(){
	$("#buyNow").unbind().bind("click",function(){
		buyBPay();
	});
}

function buyBPay(){
	if(validateForm()){
		/*$.ajax({
			type : "POST",
			url : "/service/bj/purchaseBj/validateMumber",
			success : function(data) {
				if(data=='0'){
					$("#confirmWin").show();
					zfbOrQmShow($("#paymentType").val());
					document.getElementById("mobileNo_show").innerHTML=$("#mobileNo").val();
					document.getElementById("alipayAccount_show").innerHTML=$("#alipayAccount").val();
					document.getElementById("accountName_show").innerHTML=$("#accountName").val();
					var premiumHd = document.getElementById("premium_hd").innerHTML;
					if(premiumHd!=null && premiumHd!=''){
						document.getElementById("premium_show").innerHTML=premiumHd;
					}else{
						document.getElementById("premium_show").innerHTML=document.getElementById("premium").innerHTML;
					}
				}else if(data=='-1'){
					alertSuccess("已经卖完了，不允许购买");
					getCommonImg("113","N","1");
				}
			},
			error : function(e) {
				console.log("操作失败...");
				getCommonImg("113","N","3");
			}
		});*/
		
		$("#confirmWin").show();
		zfbOrQmShow($("#paymentType").val());
		document.getElementById("mobileNo_show").innerHTML=$("#mobileNo").val();
		document.getElementById("accountName_show").innerHTML=$("#accountName").val();
		var premiumHd = document.getElementById("premium_hd").innerHTML;
		if(premiumHd!=null && premiumHd!=''){
			document.getElementById("premium_show").innerHTML=premiumHd;
		}else{
			document.getElementById("premium_show").innerHTML=document.getElementById("premium").innerHTML;
		}
	}
}

function zfbOrQmShow(type){
	if(type == '1'){
		$("#fk_show").show();
		$("#qm_show").hide();
		$("#yh_show").hide();
		$("#sf_show").hide();
	}else if(type == '2'){
		$("#fk_show").hide();
		$("#qm_show").show();
		$("#yh_show").show();
		$("#sf_show").show();
		document.getElementById("mortgage_show").innerHTML= $("#mortgage").val();
	}
}

function validateForm(){
	var mobileNo = $("#mobileNo").val();
	var accountName = $("#accountName").val();
	if(mobileNo == null || mobileNo == ""){
		alertError("请填写手机号码");
	    return false;
	}
	var filter=/^(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])\d{8}$/; 
	if(mobileNo.length != 11){
		alertError('请输入有效的手机号码!');
		return false;
	}else{
		if(mobileNo != null && mobileNo != ""){
			if(!filter.test(mobileNo)){
				alertError("手机号码错误,请重新填写!");
				return false;
			}
		}
	}
	if(accountName == null || accountName == ""){
		alertError("请填写姓名");
	    return false;
	}
	var paymentType = $("#paymentType").val();
	if(paymentType == '2'){
		var mortgage = $("#mortgage").val();
		if(mortgage == null || mortgage == ""){
			alertError("请填写有效的优惠券码");
		    return false;
		}
	}
	if('ui-ico-sfi ico-box'==$('#makeSure').attr('class')){
		alertError('请同意宝贝保服务协议');
		return false;
    }
	return true;
}

//服务条款点击事件
function makeSureClick(){
	var makeSure = $('#makeSure').attr('class');
	if('ui-ico-sfi ico-box'==makeSure){
		$('#makeSure').attr('class','ui-ico-sfi ico-yes2');
	}else{
		$('#makeSure').attr('class','ui-ico-sfi ico-box');
	}
	
}

function checkNull(){
	var mobileNo = $("#mobileNo").val();
	var accountName = $("#accountName").val();
	var paymentType = $("#paymentType").val();
	if(paymentType == '1'){
		if((mobileNo != null && $.trim(mobileNo)  != "") && (accountName != null && $.trim(accountName)  != "")){
			var makeSure = $('#makeSure').attr('class');
			if('ui-ico-sfi ico-yes2'==makeSure){
				$("#buyNow").removeClass("btn-submit02-no");
		        $("#buyNow").addClass("btn-submit02");
			}else{
				$("#buyNow").removeClass("btn-submit02");
			    $("#buyNow").addClass("btn-submit02-no");
			}
		}else{
			$("#buyNow").removeClass("btn-submit02");
		    $("#buyNow").addClass("btn-submit02-no");
		}
	}else if(paymentType == '2'){
		var mortgage = $("#mortgage").val();
		if((mobileNo != null && $.trim(mobileNo)  != "") && (accountName != null && $.trim(accountName)  != "") && (mortgage != null && $.trim(mortgage)  != "")){
			var makeSure = $('#makeSure').attr('class');
			if('ui-ico-sfi ico-yes2'==makeSure){
				$("#buyNow").removeClass("btn-submit02-no");
		        $("#buyNow").addClass("btn-submit02");
			}else{
				$("#buyNow").removeClass("btn-submit02");
			    $("#buyNow").addClass("btn-submit02-no");
			}
		}else{
			$("#buyNow").removeClass("btn-submit02");
		    $("#buyNow").addClass("btn-submit02-no");
		}
	}
	
}

function closeWin(){
	$("#confirmWin").hide();
}

//确定购买宝贝保
function surePerchase(){
	$("#waitplease").show();
	var prem = "";
	var premiumHd = document.getElementById("premium_hd").innerHTML;
	if(premiumHd!=null && premiumHd!=''){
		prem = premiumHd.replace("元","");
	}else{
		prem = document.getElementById("premium").innerHTML.replace("元","");
	}
	var referenceMobile=getUrlValueByKey("referenceMobile");
	var filter=/^(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])\d{8}$/; 
	if(referenceMobile.length != 11){
		referenceMobile="";
	}else{
		if(referenceMobile != null && referenceMobile != ""){
			if(!filter.test(referenceMobile)){
				referenceMobile="";
			}
		}
	}
	var bpayEntity = {
		clientName : $("#accountName").val(),
		mobileNo : $("#mobileNo").val(),
		permium : prem,
		channelSource : $("#channel").val(),
		paymentType : $("#paymentType").val(),
		mortgage : $("#mortgage").val(),
		referenceMobile:referenceMobile
	};
	$.ajax({
		type : "POST",
		data : bpayEntity,
		dataType : "json",
		url : "/service/bj/purchaseBj/createBjOrder",
		success : function(json) {
			$("#waitplease").hide();
			var data = JSON.parse(json);
			if(data.msg=='err'){
				alertSuccess("系统繁忙，请重试！");
				getCommonImg("113","N","1");
			}else{
				var paymentType = $("#paymentType").val();
				//支付宝
				if(paymentType == '1'){
					if(data.orderNo !='' && data.payLink !=''){
						setTimeout(function() {
							location.href = data.payLink;
						},80);
					}else{
						var reqMsg = data.requestMessage;
						/*if(reqMsg.indexOf('推荐人')!=-1){
							alertSuccess('推荐人手机号格式不正确。');
						}else */
						if(reqMsg.indexOf('该手机号')!=-1){
							alertSuccess('该手机号'+$("#mobileNo").val()+'在有效期内已经发起申请。');
						}else if(reqMsg.indexOf('您绑定的手机号')!=-1){
							alertSuccess('您绑定的手机号已有购买记录，不能重复购买。');
						}else{
							var reqCode = data.requestCode;
							if(reqCode == '-1'){
								alertSuccess('系统繁忙，请重试！');
							}
						}
						getCommonImg("113","N","1");
					}
				}else if(paymentType == '2'){
					//抵用券
					if(data.orderNo !=''){
						//成功 跳到主页
						alertSuccess('购买成功');
						setTimeout(function() {
							location.href = '/page/bpay/baobeibao.html';
						},800);
					}else{
						//失败
						if(data.seqCode == '25'){//优惠券号码错误
							alertSuccess('您输入的抵用券号码错误，请重新填写提交');
							getCommonImg("113","N","1");
						}else if(data.seqCode == '26'){//优惠券已被使用
							alertSuccess('您的抵用券已使用一次，不能重复使用');
							getCommonImg("113","N","1");
						}else if(data.seqCode == '24'){//优惠券过期
							alertSuccess('您输入的抵用券码暂不能使用，抵用券有效期：'+data.requestMessage);
							getCommonImg("113","N","1");
						}else{
							var reqMsg = data.requestMessage;
							/*if(reqMsg.indexOf('推荐人')!=-1){
								alertSuccess('推荐人手机号格式不正确。');
							}else */
							if(reqMsg.indexOf('该手机号')!=-1){
								alertSuccess('该手机号'+$("#mobileNo").val()+'在有效期内已经发起申请。');
							}else if(reqMsg.indexOf('您绑定的手机号')!=-1){
								alertSuccess('您绑定的手机号已有购买记录，不能重复购买。');
							}else{
								var reqCode = data.requestCode;
								if(reqCode == '-1'){
									alertSuccess('系统繁忙，请重试！');
								}
							}
							getCommonImg("113","N","1");
						}
					}
				}
				
				
			}
		},
		error : function(e) {
			$("#waitplease").hide();
			console.log("购买失败...");
			getCommonImg("1021","N","3");  
		}
	});
}
function showClause(){
	alertDialogs($('#light1').html(),2);
}

/**
 * 弹出框
 * @param content
 * @param type
 */
function alertDialogs(content,type){
	//type 1 提示框  2条款  3 改派确认
	var $mask = $('<div class="maskboxs"></div>');
	var $dialog = $('<div id="dialog" class="ui-dialogs"></div>');
	var $content = $('<div class="ui-alert-contents"></div>');
	var $bottom;
	var $btnSubmit;
    var $btnCancel = $('<a class="ui-btns btn-cancels" href="javascript:void(0);">关闭 </a>');
	if(type==1){
	    $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix"></div>');
	    $btnSubmit = $('<a class="ui-btns btn-submits" href="javascript:void(0);">确认</a>');
	}else{
		 $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix" style="text-align:center;border-top: 1px solid rgba(0,0,0,.2);padding-top: 1px;"></div>');
		 $btnSubmit = $('<a class="ui-btns btn-submit01" href="javascript:void(0);">我知道了</a>');
	}
	var dialogDocHeight = 0;
	$content.html(content);
	if(type!=2){
	  $bottom.append($btnCancel);	
	}
	$bottom.append($btnSubmit);
	$dialog.append($content).append($bottom);
	$mask.css({height:$(document).height()});
	$("body").append($mask);
	$("body").append($dialog);
	dialogDocHeight = $dialog.height();
	
	centerDialog($dialog);
	
	$(window).resize(function(){		
	  centerDialog($dialog);	  
	 }); 
	
	$mask.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});
	
	$btnSubmit.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
		if('3'==type){
			isOk = true;
		}
		if(null!=onclose){
			
		}
	});
	
	$btnCancel.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});
	
	//垂直居中
	function centerDialog(obj){
		var windowWidth = $(window).width();   
		var windowHeight = $(window).height();  
		var popupHeight = $(obj).height();   
		var popupWidth = $(obj).width();
		var top = (windowHeight-popupHeight)/2; 
		var left = (windowWidth-popupWidth)/2;
		var objHeight = "auto";
		
		$mask.css({height:$(document).height()});
		
		if(dialogDocHeight > windowHeight){		
			top = windowHeight * 0.1;
			objHeight = windowHeight - top * 2;					
		}
		
		var bottomHeight = $bottom.outerHeight() + 1;			
		var contentHeight = (objHeight - bottomHeight);
		
		$(obj).css({ 
				"top": top,   
				"left": left ,
				"height":objHeight,
				"overflow":"hidden"
			});
				
		if(dialogDocHeight > windowHeight){	
			$content.css({ 
				"height":contentHeight
			});			
		}else{			
			$content.removeAttr("style"); 
		}
		$("body").css({
				"overflow":"hidden"
			});		
		
	}
	
}
function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 1500);
}

function alertSuccess(contect){
	$('#MsgInfo').text(contect);
	$('#success').show();
	setTimeout(function () {
		$('#success').fadeOut(500);
	}, 3000);
}
//支付宝优惠券按钮切换
$("#alipay").on('touchstart mousedown',function(e){
	e.preventDefault();
	$("#alipay").removeClass('btn-buttom-hkj');
	$("#alipay").addClass('btn-buttom-smsj');
	$("#coupon").removeClass('btn-buttom-smsj');
	$("#coupon").addClass('btn-buttom-hkj');
	$("#icoalipay").removeClass('ico-alipay-no');
	$("#icoalipay").addClass('ico-alipay');
	$("#icocoupon").removeClass('ico-coupon');
	$("#icocoupon").addClass('ico-coupon-no');
	$('#couponMumber').hide();
	$("#paymentType").val('1');
	$('#alipayMoney').show();
	checkNull();
});

$("#coupon").on('touchstart mousedown',function(e){
	e.preventDefault();
	$("#coupon").removeClass('btn-buttom-hkj');
	$("#coupon").addClass('btn-buttom-smsj');
	$("#alipay").removeClass('btn-buttom-smsj');
	$("#alipay").addClass('btn-buttom-hkj');
	$("#icocoupon").removeClass('ico-coupon-no');
	$("#icocoupon").addClass('ico-coupon');
	$("#icoalipay").removeClass('ico-alipay');
	$("#icoalipay").addClass('ico-alipay-no');
	$('#alipayMoney').hide();
	$('#couponMumber').show();
	//抵用券
	$("#paymentType").val('2');
	checkNull();
});