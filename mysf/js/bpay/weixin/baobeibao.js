$(document).ready(function (){
	//加日志
	$.post("/service/commonLog/addLog/L00901");
	
	var channelSource = getUrlValueByKey("channelSource");
	var referenceMobile = getUrlValueByKey("referenceMobile");
	var cookieMobile = getCookie("referenceMobile");
	if(referenceMobile!=cookieMobile){
		if(channelSource!=''){
			setCookie("referenceMobile",getUrlValueByKey("referenceMobile"));
		}
	}
	
	var bpayEntity = {
		openId : $("#openId").val(),
		channel:'2'
	};
	$.ajax({
		type : "POST",
		data : bpayEntity,
		dataType : "json",
		url : "/service/bj/purchaseBj/queryBjOrder",
		success : function(json) {
			var data = JSON.parse(json);
			if(data!=null && data.msg == 'err'){
				alertSuccess("系统繁忙，请重试！");
				getCommonImg("113","N","1");
			}else{
				if(data!=null && data.length>0){
					$("#buyNoneShow").hide();
					var strHtml = '';
					var status = '';
					var ljfkHtml = '';
					var zfbOrYhq = '';
					for(var i=0;i<data.length;i++){
						//alert(data[0].createTimeStr);
						if(data[i].orderStatus=='01' || data[i].orderStatus=='03'){
							status = '待付款';
							ljfkHtml = "<dl class=\"btn\">"+
			    			"<a class=\"btn-submit11\" style=\"float: right;\" onclick=\"payOrder('"+data[i].orderNo+"')\">立即付款</a>"+
			        		"</dl>";
						}else if(data[i].orderStatus=='02'){
							if(data[i].validStatus=='01'){
								status = '已生效';
							}else if(data[i].validStatus=='02'){
								status = '已过期';
							}else{
								status = '付款成功';
							}
						}else if(data[i].orderStatus=='04'){
							status = '订单关闭';
						}
						
						if(data[i].paymentType =='3'){
							zfbOrYhq = "<dd>应付金额：<span>"+data[i].grossPremium+"</span>元</dd>";
						}else if(data[i].paymentType =='2'){
							zfbOrYhq = "<dd>优惠券码：<span>"+data[i].couponCode+"</span></dd>";
						}
						if(i==data.length-1){
	   						strHtml += '<section class="grid-main ui-list" style="margin-bottom: 60px;">';
	   					}else{
	   						strHtml += '<section class="grid-main ui-list" style="margin-bottom: 0px;">';
	   					}
						strHtml=strHtml+
			    		"<dl class=\"order-number\">"+
		    			"<dd><span>订单号：</span><span>"+data[i].orderNo+"</span></dd>"+
		    			
				    		"</dl>"+
				    		"<a onclick=\"orderInfo('"+data[i].validStatus+"','"+data[i].orderStatus+"','"+data[i].orderNo+"','"+data[i].mobileNo+"','"+data[i].clientName+"','"+data[i].payAccountNo+"','"+data[i].grossPremium+"','"+data[i].aipayUrl+"','"+data[i].createTimeStr+"','"+data[i].beginDateStr+"','"+data[i].endDateStr+"','"+data[i].couponCode+"','"+data[i].paymentType+"')\">"+
				    			"<dl class=\"contacts sent arrow\">"+
									"<dt>手机号码：<span>"+data[i].mobileNo+"</span></dt>"+
									zfbOrYhq+
									"<dt class=\"colorred\">"+status+"</dt>"+
								"</dl>"+
				    		"</a>"+ljfkHtml+
				    	"</section>";
						ljfkHtml = '';
					}
					$("#login02").append(strHtml);
				}else{
					$("#buyNoneShow").show();
				}
			}
		},
		error : function(e) {
			console.log("操作失败...");
			getCommonImg("113","N","3");
		}
	});
	
	
	$.ajax({
		type : "POST",
		data : bpayEntity,
		dataType : "json",
		url : "/service/bj/purchaseBj/queryBjClaimList",
		success : function(json) {
			//var data = JSON.parse(json);
			var data = json;
			var strHtml = '';
			if(data!=null && data.length>0){
				$("#lpNoneShow").hide();
				for(var i=0;i<data.length;i++){
   					var status='';
   					var claimType='';
   					var operTypeHtml='';
   					if(data[i].operType=='1'){
   						status = '审核调查中';
   					}else if(data[i].operType=='2'){
   						status = '审核不通过';
   						operTypeHtml = '<dd>原因：<span>客服审核不通过</span></dd>';
   					}else if(data[i].operType=='3'){
   						status = '理赔处理中';
   					}else if(data[i].operType=='4'){
   						status = '注销';
   						operTypeHtml ='<dd>原因：<span>您已取消理赔</span></dd>';
   					}else if(data[i].operType=='5'){
   						status = '理赔成功';
   						operTypeHtml ='<dd>理赔金额：<span>'+data[i].money+'</span>元</dd>';
   					}
   					if(data[i].claimType=='1'){
   						claimType = '遗失';
   					}else if(data[i].claimType=='2'){
   						claimType = '破损';
   					}
   					if(i==data.length-1){
   						strHtml += '<section class="grid-main ui-list" style="margin-bottom: 60px;">';
   					}else{
   						strHtml += '<section class="grid-main ui-list" style="margin-bottom: 5px;">';
   					}
   					strHtml += '<dl class="order-number">'
    					+ '<dd><span>理赔单号：</span><span>'+data[i].orderNo+'</span></dd>'
    					+ '<dt>'+status+'</dt>'
   						+ '</dl>'
 						+ '<a href="javascript:payclaim(\''+data[i].orderNo+'\');">'
		    			+ '<dl class="contacts sent arrow border-bottom0">'
						+ '<dt>理赔运单号：<span>'+data[i].bNo+'</span></dt>'
						+ '<dd>理赔类型：<span>'+claimType+'</span></dd>'
						+ operTypeHtml
						+ '</dl>'
						+ '</a>'	
						+ '</section>';
				}
				$("#login03").append(strHtml);
			}else{
				$("#lpNoneShow").show();
			}
		},
		error : function(e) {
			console.log("操作失败...");
			getCommonImg("113","N","3");
		}
	});
	var tagId = getCookie("bpaytagId");
	if (tagId != null && tagId != undefined && tagId != '') {
		$(".ui-tap-title .active").removeClass('active');
		$('#'+tagId).addClass('active');
		var tagId2 = 'login'+tagId;
		$('.tap-content').each(function(){
			  if($(this).attr('id')==tagId2){
			  	 $(this).show();
			  }else{
			  	$(this).hide();
			  }
		});
		  $(tagId2).show();	
	 }
});

$(".ui-tap-title a").on('touchstart mousedown',function(e){
	e.preventDefault();
	$(".ui-tap-title .active").removeClass('active');
	$(this).addClass('active');
	var tagId = 'login'+$(this).attr('id');
	setCookie("bpaytagId",$(this).attr('id'));
	$('.tap-content').each(function(){
		  if($(this).attr('id')==tagId){
		  	 $(this).show();
		  }else{
		  	$(this).hide();
		  }
	});
	  $(tagId).show();	
});


//宝贝保购买数量验证
function validateBpayMumber(){
	/*$.ajax({
		type : "POST",
		url : "/service/bj/purchaseBj/validateMumber",
		success : function(data) {
			if(data=='0'){
				setTimeout(function() {
					window.location.href = "/page/bpay/buybaobeibao.html";
				},1000);
			}else if(data=='-1'){
				alertSuccess("已经卖完了，不允许购买");
				getCommonImg("113","N","1");
			}else if(data=='err'){
				alertSuccess("系统繁忙，请重试！");
				getCommonImg("113","N","1");
			}
		},
		error : function(e) {
			console.log("操作失败...");
			getCommonImg("113","N","3");
		}
	});*/
	var referenceMobile=getCookie("referenceMobile");
	window.location.href = "/page/bpay/weixin/buybaobeibao.html?openId="+$("#openId").val()+"&referenceMobile="+referenceMobile;
}


function alertSuccess(contect){
	$('#MsgInfo').text(contect);
	$('#success').show();
	setTimeout(function () {
		$('#success').fadeOut(500);
	}, 3000);
}

function orderInfo(validStatus,orderStatus,orderNo,phoneNo,clientName,payAccountNo,uwPremium,aipayUrl,createTime,beginDate,endDate,couponCode,paymentType){
	var hrefTo = '';
	if(orderStatus=='01' || orderStatus=='03'){
		//待付款
		hrefTo = '/page/bpay/weixin/order_detail.html?orderNo='+orderNo+'&phoneNo='+phoneNo+'&clientName='+encodeURI(clientName)+'&uwPremium='+uwPremium+'&createTime='+encodeURI(createTime)+'&paymentType='+paymentType;
	}else if(orderStatus=='02'){
		if(validStatus=='01'){
			//已生效
			hrefTo = '/page/bpay/weixin/order_detail01.html?orderNo='+orderNo+'&phoneNo='+phoneNo+'&clientName='+encodeURI(clientName)+'&uwPremium='+uwPremium+'&beginDate='+encodeURI(beginDate)+'&endDate='+encodeURI(endDate)+'&couponCode='+couponCode+'&paymentType='+paymentType;
		}else if(validStatus=='02'){
			//已过期
			hrefTo = '/page/bpay/weixin/order_detail03.html?orderNo='+orderNo+'&phoneNo='+phoneNo+'&clientName='+encodeURI(clientName)+'&uwPremium='+uwPremium+'&beginDate='+encodeURI(beginDate)+'&endDate='+encodeURI(endDate)+'&couponCode='+couponCode+'&paymentType='+paymentType;
		}else{
			//付款成功
			hrefTo = '/page/bpay/weixin/order_detail04.html?orderNo='+orderNo+'&phoneNo='+phoneNo+'&clientName='+encodeURI(clientName)+'&uwPremium='+uwPremium+'&couponCode='+couponCode+'&paymentType='+paymentType;
		}
	}else if(orderStatus=='04'){
		//订单关闭
		hrefTo = '/page/bpay/weixin/order_detail02.html?orderNo='+orderNo+'&phoneNo='+phoneNo+'&clientName='+encodeURI(clientName)+'&createTime='+encodeURI(createTime)+'&paymentType='+paymentType;
	}
	location.href = hrefTo;
}

function payOrder(orderNo){
	/*setTimeout(function() {
		location.href = aipayUrl;
	},80);*/
	$.ajax({
		type : "POST",
		data : {'orderNo':orderNo},
		url : "/service/bj/purchaseBj/getWxZfData",
		success : function(data) {
			//微信支付
			function onBridgeReady(){
				WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', {
				    	   "appId":data.appId,//公众号名称，由商户传入     
				           "timeStamp":data.timeStamp,//时间戳，自1970年以来的秒数     
				           "nonceStr":data.nonceStr,//随机串
				           "package":data.prepayIdEX,
				           "signType":data.signType,//微信签名方式：     
				           "paySign":data.paySign//微信签名
				       },
				       function(res){
				    	   //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
				           if(res.err_msg == "get_brand_wcpay_request:ok" ){
				        	  // location.href = "http://ccwpyang.ngrok.natapp.cn/page/bpay/weixin/baobeibao.html?openId="+$("#openId").val();
				        	   location.href = "/page/bpay/weixin/baobeibao.html?openId="+data.openId;
				           }
				       }
				   );
				}
			
				if (typeof WeixinJSBridge == "undefined"){
				   if( document.addEventListener ){
				       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				   }else if (document.attachEvent){
				       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
				       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				   }
				}else{
				   onBridgeReady();
				}
		},
		error : function(e) {
			console.log("操作失败...");
			getCommonImg("113","N","3");
		}
	});
}

function payclaim(orderNo){
	$.ajax({
		type : "POST",
		data : {'orderNo':orderNo},
		url : "/service/bj/purchaseBj/queryBjClaim",
		success : function(url) {
			 if (url != null && url != undefined && url != '') {
				 window.location.href = url;
			 }
		},
		error : function(e) {
			console.log("操作失败...");
			getCommonImg("113","N","3");
		}
	});
}