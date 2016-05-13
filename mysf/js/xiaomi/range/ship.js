
 //判断当前运单状态 1。电子运单 0.普通运单 默认为电子运单
    var isElectronicAirWaybill=1;
    //var url ='../../xiaomi/range/ship_submit.html';
	$(document).ready(function(){
		//加日志
		$.post("/service/commonLog/addLog/L00501");
		//填充订单信息
		fillOrderInfo();
		
//		var aaa='遮罩层遮罩层遮罩层';
//		tipsDialog(aaa);
		
		//判断运单状态
		selectTheWaybill($("#senderCityCode").val());
		
		//填充寄件人信息
		fullUserAddressBook();
		
		
		//填充收件人信息;
		fullUserAddressSentBook();
		
		//填充下单时间
		getOrderTimeByCityCode();
		
		//填充目的地信息
		fillAddress();
		
		
		//设置目的地提示信息的显示和隐藏
		setDestinationHintInfo();
		
		//设置收件人地址的显示和隐藏;
		setSentHintInfo();
		
		//验证所有必填项是否为空
		checkNull();
		
		//必填项改变事件
		inputChange();
		
		//遍历复选按钮
		$('[data-btn="checkbox"]').each(function(){
			$(this).click(function(){$(this).toggleClass("selected");});
		});	
		
		getCommonImg("100","N","1");
	});
	
	
	function pagePosition(e){
		$("html,body").animate({scrollTop:($(e).offset().top)},100);
	}
	
	
	function ValidateNumber(e, pnumber)
	{
		if (!/^\d+[.]?[1-9]?$/.test(pnumber)){
		  e.value = /\d+[.]?[1-9]?/.exec(e.value);
		}
		 return false;
	}  
	
	
	
	function fillPaymentMethod(code){
		$('#paymentMethod').val(code);
		checkNull();
	}
	
	function changeRadioVal(code,e){
		var labels = $('#male label');
		var radios = $('#male radio');
		if(code=='1'){
			$(labels[1]).addClass('checkHide');
			$(labels[1]).removeClass('checkShow');
			$(radios[0]).attr("checked",'checked');
		}
		else{
			$(labels[0]).addClass('checkHide');
			$(labels[0]).removeClass('checkShow');
			$(radios[1]).attr("checked",'checked');
		}
		$(e).addClass('checkShow');
		$("#paymentMethod").val(code);
	}


	
	function sendWay(code){
		if(code==1){
		   $('#sentWay1').css('background-color','#ec5b5b');
		   $('#sentWay2').css('background-color','#ffffff');
		   $('#sentWay1').css('border-color','#fff');
		   $('#sentWay2').css('border-color','#000');
		   $('#sentWay1').css('color','#ffffff');
		   $('#sentWay2').css('color','#000');
		   $('#uMsg').html('收派员将会在1小时内上门收件');
		   $('#uMsg').show();
		   $('#sentWay').val(1);
		   $('#orderRemarkDiv').show();
		   $('#dateTimeInputDiv').show();
		   $('#hintDiv').show();
		   $('#labelDiv').show();
		   $('#uWeight').hide();
		}
		else{
			
			$('#sentWay2').css('background-color','#ec5b5b');
			$('#sentWay1').css('background-color','#ffffff');
			$('#sentWay2').css('border-color','#fff');
			$('#sentWay1').css('border-color','#000');
			$('#sentWay2').css('color','#ffffff');
			$('#sentWay1').css('color','#000');
			$('#uMsg').html('下单后去嘿客店打印运单，立省2元');
			$('#uMsg').show();	
			$('#sentWay').val(2);
			 $('#dateTimeInputDiv').hide();
			//隐藏备注  上门时 间
			$('#orderRemarkDiv').hide();
			$('#hintDiv').hide();
			$('#labelDiv').hide(); 
			$('#uWeight').show();
		}
		//$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
		//$(document).scrollTop() 
		//alert();
		if($(document).scrollTop()!=0){
		  $("html,body").animate({scrollTop:50},1000);
		}
		else{
			$("html,body").animate({scrollTop:0},1000);	
		}
		checkNull();
	}
	

	
	/**
	 * 设置添加地址簿信息区域内容
	 */
	function setAddSenderSpan(){
		//从 Cookie中读取用户地址簿数量
		var userAddBookCount =  getCookie("userAddBookCount");
		if(userAddBookCount && userAddBookCount != null){
			if(userAddBookCount == 0){
				document.getElementById("addSenderSpanId").style.display = "block";
			} else {
				document.getElementById("addSenderSpanId").style.display = "none";
			}
		} 
		//如果 cookie 中 不存在，则从后台数据库查询
		else {
			$.ajax({
				type : "get",
				dataType : "json",
				url : "/service/order/findAddBookCountByUserId",
				success : function(data) {
					setCookie("userAddBookCount",data);
					if(data == 0){
						document.getElementById("addSenderSpanId").style.display = "block";
					} else {
						document.getElementById("addSenderSpanId").style.display = "none";
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
				}
			});
		}
	}
	
	
	/**
	 * 填充寄件人地址簿信息
	 */
	function fullUserAddressBook(){
		//从url中获取地址簿ID
		var asbkId = getUrlValueByKey("asbkId");
		
		//如果URL中能取到 地址簿ID,则设置用户选择的地址簿
		if(asbkId && asbkId != null && $.trim(asbkId) != ""){
			//从cookie中获取地址簿ID
			var cookieAsbkId =  getCookie("asbkId");
			
			//如果cookie中的 地址簿ID 和 URL 中的地址簿ID一样，则从 cookie 中获取地址簿数据
			if((cookieAsbkId && cookieAsbkId != null && $.trim(cookieAsbkId) != "") 
					&& cookieAsbkId == asbkId) {
				//从 cookie 中查询用户选择地址簿信息
				var userAddress = getCookie("userAddress");
	
				//如果 cookie 中存在，这设置cookie中的地址簿
				if(userAddress && userAddress != null && $.trim(userAddress) != ""){
					fillSenderInfo(userAddress,"userAddress","cookie");
				}
				//否则，根据地址簿ID查找地址簿，在设置
				else {
					//查询并设置用户地址簿信息
					selectAndSetAddressBook(asbkId);
				}
			} 
			//从后来查询地址簿数据
			else {
				//查询并设置用户地址簿信息
				selectAndSetAddressBook(asbkId);
			}
		}
		else{
			//从 cookie 中查询用户选择地址簿信息
			var userAddress = getCookie("userAddress");
			//如果 cookie 中存在，这设置cookie中的地址簿
			if(userAddress && userAddress != null && $.trim(userAddress) != ""){
				fillSenderInfo(userAddress,"userAddress","cookie");
			} 
			//否则设置地址簿为默认地址
			else {
				setDefaultAddress();
			}
		}

	}
	
	
	/**
	 * 填充收件人地址簿信息
	 */
	function fullUserAddressSentBook(){
		//从url中获取地址簿ID
		var sentAsbkId = getUrlValueByKey("sentAsbkId");
		
		//如果URL中能取到 地址簿ID,则设置用户选择的地址簿
		if(sentAsbkId && sentAsbkId != null && $.trim(sentAsbkId) != ""){
			//从cookie中获取地址簿ID
			var cookieSentAsbkId =  getCookie("sentAsbkId");
			
			//如果cookie中的 地址簿ID 和 URL 中的地址簿ID一样，则从 cookie 中获取地址簿数据
			if((cookieSentAsbkId && cookieSentAsbkId != null && $.trim(cookieSentAsbkId) != "") 
					&& cookieSentAsbkId == sentAsbkId) {
				//从 cookie 中查询用户选择地址簿信息
				var userSentAddress = getCookie("userSentAddress");
				
	
				//如果 cookie 中存在，这设置cookie中的地址簿
				if(userSentAddress && userSentAddress != null && $.trim(userSentAddress) != ""){
					fillSentInfo(userSentAddress,"userSentAddress","cookie");
				}
				//否则，根据地址簿ID查找地址簿，在设置
				else {
					//查询并设置用户地址簿信息
					selectAndSetSentAddressBook(sentAsbkId);
				}
			} 
			//从后来查询地址簿数据
			else {
				//查询并设置用户地址簿信息
				selectAndSetSentAddressBook(sentAsbkId);
			}
		}
		else{
			//从 cookie 中查询用户选择地址簿信息
			var userSentAddress = getCookie("userSentAddress");
			//如果 cookie 中存在，这设置cookie中的地址簿
			if(userSentAddress && userSentAddress != null && $.trim(userSentAddress) != ""){
				fillSentInfo(userSentAddress,"userSentAddress","cookie");
			}
			
		}
		
		var a=$("#senderCityCode").val();
		//判断是否电子运单
		selectTheWaybill(a);
		
	}
	
	/**
	 * 根据地址簿ID从后台查询地址簿
	 */
	function selectAndSetAddressBook(asbkId){
		// 数据提交
		$.ajax({
			type : "POST",
			data : {asbkId:asbkId},
			async : false,
			dataType : "json",
			url : "/service/sendaddress/sendbook/findonebook/"+asbkId,
			success : function(data) {
				if (data && data != null) {
					fillSenderInfo(data,"userAddress","dataBase");
				}else{
					tipsDialog("查询失败");
					getCommonImg("1028","N","2");
				}
			},
			error : function(e) {
				tipsDialog("查询失败");
				getCommonImg("1028","N","3");
			}
		});
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
					tipsDialog("查询失败");
					getCommonImg("1028","N","2");
				}
			},
			error : function(e) {
				tipsDialog("查询失败");
				getCommonImg("1028","N","3");
			}
		});
	}
	
	
	/**
	 * 设置用户默认地址
	 */
	function setDefaultAddress(){
		//从 Cookie中读取用户地址簿
		var userDefaultAddress =  getCookie("userDefaultAddress");
		if(!userDefaultAddress || userDefaultAddress == null || $.trim(userDefaultAddress) == ""){
			$.ajax({
				type : "get",
				dataType : "json",
				url : "/service/order/getDefaultAddress",
				success : function(data) {
					fillSenderInfo(data,"userDefaultAddress","dataBase");
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
				}
			});
		} else {
			fillSenderInfo(userDefaultAddress,"userDefaultAddress","cookie");
		}
	}
	
	/**
	 * 提交
	 */
	function doSubmit(){
		//表单验证
		if(!validateForm()){
			return;
		}
		
		//将订单信息保存到 cookie 中
		saveOrderInfoToCookie();
		
		//预约
		submitOrder();
	}
	
	/**
	 * 提交订单
	 */
	function submitOrder(){
		var orderJSON = packagingOrderData();
		$.ajax({
			type : "POST",
			data : {orderJSON:orderJSON},
			dataType : "json",
			url : "/service/order/order/appointment",
			success: function(json){
				if(json){
					getCommonImg("1103","N","1");
					window.location = "/../../xiaomi/range/ship_submit.html?orderJson="+encodeURI(json);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				getCommonImg("1103","N","3");
			}
		});
	}
	
	/**
	 * 跳转到确认页面
	 */
	function toConfirmPage(){
		var orderJson =  packagingOrderData();
		window.location = "/../../xiaomi/range/ship_submit.html?orderJson="+encodeURI(orderJson);
	}
	
	/**
	 * 封装订单数据
	 */
	function packagingOrderData(){
		//寄件信息
		var weight = $("#weight").val();
		var depositumGoods = $("#depositum").val();
		var orderRemark = $("#orderRemark").val();
		var orderTime = $("#dateTimeInput").val();
		var isBook = "1";	//实时下单

		//如果预约时间不为空，isBook设置为2,表示预约下单
		if(orderTime && orderTime != null && $.trim(orderTime) != ""){
			isBook = "2";
		}
		
		
		//寄件人信息
        var senderName = $("#senderName").val();
        var senderPhone = $("#senderPhone").val();
        var senderAsbkId = $("#senderAsbkId").val();
        var senderProvinceName = $("#senderProvinceName").val();
        var senderProvinceCode = $("#senderProvinceCode").val();
        var senderCityName = $("#senderCityName").val();
        var senderCityCode = $("#senderCityCode").val();
        var senderCountyName = $("#senderCountyName").val();
        var senderCountyCode = $("#senderCountyCode").val();
        var senderDetailAddress = $("#senderDetailAddress").val();
        
        
        
		
		
		//获取标签信息
		var textRemark = orderRemark;
		var labelRemark = "";	//标签备注
		var labels = $(".btn-group .selected");
		if(labels && labels != null){
			for(var i=0; i<labels.length; i++){
				if(!orderRemark || orderRemark == null || $.trim(orderRemark) == ""){
					orderRemark += labels[i].innerHTML;
				} else {
					orderRemark +=","+labels[i].innerHTML;
				}
				
				labelRemark += labels[i].innerHTML;
				if(i != (labels.length - 1)){
					labelRemark += ",";
				}
			}
		}
		
		var orderJSON;
		
		//通过运单类型判断需要传递的参数
		if(isElectronicAirWaybill==1){
			//电子订单为预约下单
			//isBook = "2";
			   //收件人信息
	        var shippingName = $("#shippingName").val();
	        var shippingPhone = $("#shippingPhone").val();
	        var shippingAsbkId = $("#shippingAsbkId").val();
	        var shippingProvinceName = $("#shippingProvinceName").val();
	        var shippingProvinceCode = $("#shippingProvinceCode").val();
	        var shippingCityName = $("#shippingCityName").val();
	        var shippingCityCode = $("#shippingCityCode").val();
	        var shippingCountyName = $("#shippingCountyName").val();
	        var shippingCountyCode = $("#shippingCountyCode").val();
	        var shippingDetailAddress = $("#shippingDetailAddress").val();
	        
	        
	        
	        //寄件方式
	        var sentWay = $('#sentWay').val();
	        
	        //付款方式
	         var paymentMethod = $('#paymentMethod').val();
	        
	        //保价金额
	        var insuredAmount = $('#insuredAmount').val();
		
		    orderJSON = '{'
			+'"orders":{'
			+'"weight":"'+ weight +'",'						//重量
			+'"depositumGoods":"'+ depositumGoods +'",'		//寄托物
			+'"orderTime":"'+ orderTime +'",'				//预约时间
			+'"isBook":"'+ isBook + '",'					//是否预约下单 1:实时 ,2:预约
			+'"textRemark":"'+ textRemark +'",'				//文本备注
			+'"labelRemark":"'+ labelRemark +'",'			//标签备注
			+'"orderRemark":"'+ orderRemark + '",'			//备注	
			+'"sentWay":"'+ sentWay + '",'	
			+'"paymentMethod":"'+ paymentMethod + '",'	
			+'"insuredAmount":"'+ insuredAmount + '"'
			+'},'
			
			//寄件人地址
			+'"senderInfo":{'
			+'"directoryId":"'+ senderAsbkId +'",'			//寄件人地址簿ID
			+'"sender":"'+ senderName +'",'					//寄件人	
			+'"phone":"'+ senderPhone +'",'					//寄件人电话
			+'"provinceName":"'+ senderProvinceName +'",'
			+'"cityName":"'+ senderCityName +'",'
			+'"countyName":"'+ senderCountyName +'",'
			+'"detailedAddress":"'+ senderDetailAddress +'",'
			+'"provinceId":"'+ senderProvinceCode +'",'
			+'"cityId":"'+ senderCityCode +'",'
			+'"countyId":"'+ senderCountyCode +'",'
			+'"orderType":"'+isElectronicAirWaybill+'"'
			+'},'
			
			//收件人
			+'"shippingAddress":{'
			+'"shippingDirectoryId":"'+ shippingAsbkId +'",'			//寄件人地址簿ID
			+'"shippingSender":"'+ shippingName +'",'					//寄件人	
			+'"shippingPhone":"'+ shippingPhone +'",'					//寄件人电话
			+'"shippingProvinceName":"'+ shippingProvinceName +'",'
			+'"shippingCityName":"'+ shippingCityName +'",'
			+'"shippingCountyName":"'+ shippingCountyName +'",'
			+'"shippingDetailedAddress":"'+ shippingDetailAddress +'",'
			+'"shippingProvinceId":"'+ shippingProvinceCode +'",'
			+'"shippingCityId":"'+ shippingCityCode +'",'
			+'"shippingCountyId":"'+ shippingCountyCode +'"'
			+'}'
		+'}';
		}
		else{
			
			//目的地信息
			var destinationProvinceName = $("#provinceName").val();
			var destinationProvinceCode = $("#provinceCode").val();
			var destinationCityName = $("#cityName").val();
			var destinationCityCode = $("#cityCode").val();
			var destinationCountyName = $("#countyName").val();
			var destinationCountyCode = $("#countyCode").val();
			
		    orderJSON = '{'
			+'"orders":{'
			+'"weight":"'+ weight +'",'						//重量
			+'"depositumGoods":"'+ depositumGoods +'",'		//寄托物
			+'"orderTime":"'+ orderTime +'",'				//预约时间
			+'"isBook":"'+ isBook + '",'					//是否预约下单 1:实时 ,2:预约
			+'"textRemark":"'+ textRemark +'",'				//文本备注
			+'"labelRemark":"'+ labelRemark +'",'			//标签备注
			+'"orderRemark":"'+ orderRemark + '",'			//备注	
			+'},'
			
			//寄件人地址
			+'"senderInfo":{'
			+'"directoryId":"'+ senderAsbkId +'",'			//寄件人地址簿ID
			+'"sender":"'+ senderName +'",'					//寄件人	
			+'"phone":"'+ senderPhone +'",'					//寄件人电话
			+'"provinceName":"'+ senderProvinceName +'",'
			+'"cityName":"'+ senderCityName +'",'
			+'"countyName":"'+ senderCountyName +'",'
			+'"detailedAddress":"'+ senderDetailAddress +'",'
			+'"provinceId":"'+ senderProvinceCode +'",'
			+'"cityId":"'+ senderCityCode +'",'
			+'"countyId":"'+ senderCountyCode +'",'
			+'"orderType":"'+isElectronicAirWaybill+'"'
			+'},'
			
			
			//目的地
			+'"destination":{'
			+'"provinceName":"'+ destinationProvinceName +'",'
			+'"cityName":"'+ destinationCityName + '",'
			+'"countyName":"'+ destinationCountyName +'",'
			+'"provinceId":"'+ destinationProvinceCode +'",'
			+'"cityId":"'+ destinationCityCode +'",'
			+'"countyId":"'+ destinationCountyCode +'"'
			+'}'
		+'}';
		}
		return orderJSON;
	}
		
	/**
	 * 表单验证
	 */
	function validateForm(){
		//寄件地非空验证
		var senderCityName = $("#senderCityName").val();
		var senderCityCode = $("#senderCityCode").val();
		if(!senderCityName || senderCityName == null || $.trim(senderCityName) == ""){
			$("#hintMessage").html("请选选择寄件人信息");
			$("#hintMessage").show();
			return false;
		} else {
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}
		
		//电子运单非空验证
		if(isElectronicAirWaybill==1){
			//保价金额验证
			var shippingCityName = $("#shippingCityName").val();
			if(!shippingCityName || shippingCityName == null || $.trim(shippingCityName) == ""){
				$("#hintMessage").html("请选择 收 件人信息");
				$("#hintMessage").show();
				return false;
			} else {
				$("#hintMessage").hide();
				$("#hintMessage").html("");
			}
			
			if(senderCityCode=="755"){
			   var dsentWay = $("#sentWay").val();
			   if(!dsentWay || dsentWay == null || $.trim(dsentWay) == ""){
				$("#hintMessage").html("请选择寄件方式");
				$("#hintMessage").show();
				return false;
			    } else {
				   $("#hintMessage").hide();
				   $("#hintMessage").html("");
			    }
		    }
			
			var dpaymentMethod = $("#paymentMethod").val();
			if(!dpaymentMethod || dpaymentMethod == null || $.trim(dpaymentMethod) == ""){
				$("#hintMessage").html("请选择付款方式");
				$("#hintMessage").show();
				return false;
			} else {
				$("#hintMessage").hide();
				$("#hintMessage").html("");
			}
			
			var dinsuredAmount = $("#insuredAmount").val();
			if(dinsuredAmount!=null&&dinsuredAmount!=""&&dinsuredAmount>20000){
				$("#hintMessage").html('保价金额不能超过20000元，请重新填写');
				$("#hintMessage").show();
				return false;
			}else if(dinsuredAmount!=null&&dinsuredAmount<=0&&dinsuredAmount!=""){
				$("#hintMessage").html('保价金额不能低于1元，请重新填写');
				$("#hintMessage").show();
				return false;
			}else{
				$("#hintMessage").hide();
				$("#hintMessage").html("");
			}
			
			
				
		}
		else{
		//目的地非空验证
		var dCityName = $("#cityName").val();
		if(!dCityName || dCityName == null || $.trim(dCityName) == ""){
			$("#hintMessage").html("请选择目的地");
			$("#hintMessage").show();
			return false;
		} else {
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}
		}
		
		//寄托物重量非空验证
		var weight = $("#weight").val();
		//alert(weight);
		if(!weight || weight == null || weight == ""){
			$("#hintMessage").html("请填写托寄物重量");
			$("#hintMessage").show();
			return false;
		} else {
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}
		
		
		
		
		//var re = /^\d+(\.\d{2}|\.\d{1})?$/;
		//var re= 
		/*if(!/^\d+[.]?[1-9]?[1-9]?$/.test(weight)){
			$("#hintMessage").html("重量输入有误，只能为正数字或数字两位小数");
			$("#hintMessage").show();
			return false;
		}else{
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}*/
		
		
	    
			
		if(weight>999||weight<1){
			$("#hintMessage").html("托寄物重量应为1kg~999kg");
			$("#hintMessage").show();
			    return false;
		 } else {
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}
		
		if(dsentWay!=null&&dsentWay!=""&&dsentWay==2){
			if(weight>99){
				$("#hintMessage").html("嘿客下单重量不能超过99kg");
				$("#hintMessage").show();
				return false;
			}else {
				$("#hintMessage").hide();
				$("#hintMessage").html("");
			}
		}
		
		//寄托物非空验证
		var depositum = $("#depositum").val();
		if(!depositum || depositum == null || depositum ==""){
			$("#hintMessage").html("请填写寄托物");
			$("#hintMessage").show();
			return false;
		} else {
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}
		
		//验证寄托物名称是否超长
		if(checkStrIsToLong(depositum,30)){
			$("#hintMessage").html("寄托物名称超长");
			$("#hintMessage").show();
			return false;
		} else {
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}
		
		//验证备注是否超长
		var orderRemark = $("#orderRemark").val();
		if(checkStrIsToLong(orderRemark,100)){
			$("#hintMessage").html("备注太长");
			$("#hintMessage").show();
			return false;
		} else {
			$("#hintMessage").hide();
			$("#hintMessage").html("");
		}
		var sentWay=$("#sentWay").val();
		if($.trim(sentWay)!=""  && sentWay==2){
			return true;
		}
		//验证当前时间往后推2小时后，是否在下单时间范围内
		var dateTimeInput = $("#dateTimeInput").val();
		if(!dateTimeInput || dateTimeInput == null || $.trim(dateTimeInput) == ""){
			var orderStartTime = $("#orderStartTime").val();
			var orderEndTime = $("#orderEndTime").val();
			
			var isValid = false;
			if(orderStartTime != null && $.trim(orderStartTime) != ""
					&& orderEndTime != null && $.trim(orderEndTime) != ""){
				// 数据提交
				$.ajax({
					type : "GET",
					data : null,
					async : false,
					dataType : "json",
					url : "/service/order/validIsOrderTime/"+orderStartTime+"/"+orderEndTime,
					success : function(data) {
						isValid = data;
					}
				});
				
				if(isValid == false || isValid == "false"){
					tipsDialog("您选择的时间已超过你所选择的寄件地区的寄件时间，请选择寄件时间预约上门取件。");
					//$("#hintMessage").html("您选择的时间已超过你所选择的寄件地区的上门时间，请选择上门时间预约上门取件。");
					//$("#hintMessage").show();
					return false;
				} else {
					//$("#hintMessage").hide();
					//$("#hintMessage").html("");
					return true;
				}
			} else {
				return true;
			}
		}
		return true;
	}
	
	
	/**
	 * 将订单信息保存到 cookie 中
	 */
	function saveOrderInfoToCookie(){
		var orderInfo = {};
		orderInfo["weight"] = $("#weight").val();				//重量
		orderInfo["depositum"] = $("#depositum").val();			//寄件物品
		orderInfo["dateTimeText"] = $("#dateTimeText").text();	//预约时间文本
		orderInfo["orderTime"] = $("#dateTimeInput").val();		//预约时间
		orderInfo["orderRemark"] =$("#orderRemark").val();		//备注
		orderInfo["orderType"]=0;
		if(isElectronicAirWaybill==1){
		//orderInfo["sentWay"] =$("#sentWay").val();
		orderInfo["paymentMethod"]=$('input:radio:checked').val();
		//orderInfo["paymentMethod"] =$("#paymentMethod").val();
		orderInfo["insuredAmount"] =$("#insuredAmount").val();
		orderInfo["orderType"]=1;
		}
		
		//获取标签信息
		var labels = $(".btn-group .selected");
		var remarkLabel = "";
		if(labels && labels != null){
			for(var i=0; i<labels.length; i++){
				remarkLabel += labels[i].innerHTML;
				if(i != (labels.length -1)){
					remarkLabel += ",";
				}
			}
		}
		orderInfo["remarkLabel"] = remarkLabel;	//备注标签
		
		//将订单信息保存到 cookie 中
		setCookie("orderInfo",JSON.stringify(orderInfo));
	}
	
	/**
	 * 填充订单信息
	 */
	function fillOrderInfo(){
		var orderInfo = getCookie("orderInfo");
		if(orderInfo && orderInfo != null){
			orderInfo = $.parseJSON(orderInfo);
			 $("#weight").val(orderInfo.weight);
			 $("#depositum").val(orderInfo.depositum);
			 $("#dateTimeText").text(orderInfo.dateTimeText);
			 $("#dateTimeInput").val(orderInfo.orderTime);
			 $("#orderRemark").val(orderInfo.orderRemark);
			//$("#sentWay").text(orderInfo.sentWay);
			 var labels = $('#male label');
		 	 var radios = $('#male radio');
			if(isElectronicAirWaybill==1){
			 if(orderInfo.paymentMethod!=null&&orderInfo.paymentMethod!=""){
			     if(orderInfo.paymentMethod==1){
			    	 $(labels[1]).addClass('checkHide');
			 		 $(labels[1]).removeClass('checkShow');
			 		 $(labels[0]).addClass('checkShow');
			 		 $(labels[0]).removeClass('checkHide');
			 		 $(radios[0]).attr("checked",'checked'); 
				     //$("input[name=paymentMethod1]:eq(0)").attr("checked",'checked'); 
			      }
			       else{
			    		$(labels[0]).addClass('checkHide');
			 			$(labels[0]).removeClass('checkShow');
			 			$(labels[1]).addClass('checkShow');
			 			$(labels[1]).removeClass('checkHide');
			 			$(radios[1]).attr("checked",'checked');
				    //$("input[name=paymentMethod1]:eq(1)").attr("checked",'checked'); 
				 }
			     $("#paymentMethod").val(orderInfo.paymentMethod);
			 }
			 else{
				 $('#paymentMethod').val(1);
				 $(labels[1]).addClass('checkHide');
		 		 $(labels[1]).removeClass('checkShow');
		 		 $(radios[0]).attr("checked",'checked'); 
		 		 $(labels[0]).addClass('checkShow');
		 		 $(labels[0]).removeClass('checkHide');
			     //$("input[name=paymentMethod1]:eq(0)").attr("checked",'checked'); 
			 }
			 $("#insuredAmount").val(orderInfo.insuredAmount);
			}
			 //设置页面标签
			 var remarkLabel = orderInfo.remarkLabel;
			 if(remarkLabel && remarkLabel != null && $.trim(remarkLabel) != ""){
				 //清除所有标签选中样式
				 $('[data-btn="checkbox"]').each(function(){
					$(this).removeClass("selected");
				 });	
				 
				 if(remarkLabel.indexOf(",") > 0){
					 var labels = remarkLabel.split(",");
					 for(var i=0; i< labels.length ; i++){
						 setSelectLabelByText(labels[i]);
					 }
				 } else {
					 setSelectLabelByText(remarkLabel);
				 }
			 }
		}
		else{
			 $('#paymentMethod').val(1);
		     $("input[name=paymentMethod1]:eq(0)").attr("checked",'checked'); 
		}
	}
	
	/**
	 * 根据标签名称选中标签
	 */
	function setSelectLabelByText(labelText){
		 if(labelText == "请带胶带"){
		 	$("#sellotape").addClass("selected");
		 } else if(labelText == "请带纸箱"){
		 	$("#carton").addClass("selected");
		 } else if(labelText == "需要爬楼") {
			$("#climbStairs").addClass("selected");
		 } else if(labelText == "大件"){
		 	$("#large").addClass("selected");
		 }
	}
	
	/**
	 * 填充寄件人信息
	 * data 地址簿数据
	 * cookieKey 保存到cookie的 key
	 * dataSource 数据来源 --必须参数，此参数不正确可能导致数据乱码
	 */
	function fillSenderInfo(data,cookieKey,dataSource){
		
		if(data && data != null){
			//如果数据来组 cookie 则转换成 json 格式
			if(dataSource == "cookie"){
				data = $.parseJSON(data);
			}
			
			//设置页面文本
			$("#senderNameLabel").text(data.userName); 			//姓名
			$("#senderPhoneLabel").text(data.telePhoneNuber); 	//电话
			$("#senderAddress").text(data.areaName+" "+data.detailAdress); 		//用户地址
			
			//设置隐藏域信息，用于提交
			$("#senderName").val(data.userName);				//寄件人姓名
			$("#senderPhone").val(data.telePhoneNuber);			//寄件人电话
			$("#senderAsbkId").val(data.asbkId);				//寄件人地址簿ID
			$("#senderProvinceName").val(data.provinceName);	//寄件人省份名称
			$("#senderProvinceCode").val(data.provinceCode);	//寄件人省份编码
			$("#senderCityName").val(data.cityName);			//寄件人城市名称
			$("#senderCityCode").val(data.cityCode);			//寄件人城市编码
			$("#senderCountyName").val(data.countyName);		//寄件人区县名称
			$("#senderCountyCode").val(data.countyCode);		//寄件人区县编码
			$("#senderDetailAddress").val(data.detailAdress);	//寄件人详细地址
			//将用户地址簿保存到 Cookie 中
			setCookie(cookieKey,JSON.stringify(data));
			
			
		}
		
		//寄件人信息查询为异步请求，此处需要调用寄件人 提示信息设置和按钮颜色设置
		setSenderHintInfo();
		
		//判断是否电子运单
		selectTheWaybill($("#senderCityCode").val());
		
		checkNull();
		
	}
	
	
	
	/**
	 * 填充收 件人信息
	 * data 地址簿数据
	 * cookieKey 保存到cookie的 key
	 * dataSource 数据来源 --必须参数，此参数不正确可能导致数据乱码
	 */
	function fillSentInfo(data,cookieKey,dataSource){
		
		if(data && data != null){
			//如果数据来组 cookie 则转换成 json 格式
			if(dataSource == "cookie"){
				data = $.parseJSON(data);
			}
			
			//设置页面文本
			$("#sentNameLabel").text(data.userName); 			//姓名
			$("#sentPhoneLabel").text(data.telePhoneNuber); 	//电话
			$("#shippingAddress").text(data.areaName+" "+data.detailAdress); 		//用户地址
			
			//设置隐藏域信息，用于提交
			$("#shippingName").val(data.userName);				//寄件人姓名
			$("#shippingPhone").val(data.telePhoneNuber);			//寄件人电话
			$("#shippingAsbkId").val(data.asbkId);				//寄件人地址簿ID
			$("#shippingProvinceName").val(data.provinceName);	//寄件人省份名称
			$("#shippingProvinceCode").val(data.provinceCode);	//寄件人省份编码
			$("#shippingCityName").val(data.cityName);			//寄件人城市名称
			$("#shippingCityCode").val(data.cityCode);			//寄件人城市编码
			$("#shippingCountyName").val(data.countyName);		//寄件人区县名称
			$("#shippingCountyCode").val(data.countyCode);		//寄件人区县编码
			$("#shippingDetailAddress").val(data.detailAdress);	//寄件人详细地址
			//将用户地址簿保存到 Cookie 中
			setCookie(cookieKey,JSON.stringify(data));
			
			
		}
		
		//收 件人信息查询为异步请求，此处需要调用寄件人 提示信息设置和按钮颜色设置
		setSentHintInfo();
		
		
		checkNull();
		
	}
	
	
	
	//判断是否使用电子运单
	function selectTheWaybill(cityName){
		
		//判断寄件地址
		var cityNames = new Array();
		cityNames[0] = ['010'];
		cityNames[1] = ['021'];
		cityNames[2] = ['020'];
		cityNames[3] = ['755'];
		var isTrue = false;
		for(var i=0;i<cityNames.length;i++){
			if(cityName==cityNames[i]){
				isTrue = true;
			}
		}
		
		//默认为电子运单，当寄件人地址在北上广深以外 时，显示为普通运单，此时隐藏多项内容
		if(!isTrue){
			isElectronicAirWaybill = 0;
			$('#sentAddreess-navs').hide();//隐藏收件人信息
			$('#sentAddreess').hide();//隐藏收件人地址
			$('#destinationDiv').show();//显示目的地
			$('#sentWay').hide();//隐藏寄件方式
			$('#insuredAmountDiv').hide();//保价金额
			$('#paymentMethodDiv').hide();//隐藏付款方式
		}else{
			isElectronicAirWaybill = 1;
			//为电子运单时，显示多项，隐藏目的地
			$('#sentAddreess-navs').show();//显示收件人信息
			$('#sentAddreess').show();//显示收件人地址
			$('#destinationDiv').hide();//隐藏目的地
			$('#paymentMethodDiv').show();//显示付款方式
			$('#insuredAmountDiv').show();
			if(cityName==755){
				$('#sentWayDiv').show();//显示寄件方式
			}
			else{
				$('#sentWayDiv').hide();//显示寄件方式
				}
		}
		
	}
	
	/**
	 * 填充目的地信息
	 */
	function fillAddress(){
		var provinceName = getUrlValueByKey("proName");//省份名称
		var provinceCode = getUrlValueByKey("proCode");//省份编码
		var cityName = getUrlValueByKey("destName");//城市名称
		var cityCode = getUrlValueByKey("destCode");//城市编码
		var contyName = getUrlValueByKey("dcountyName");//区县名称
		var contyCode = getUrlValueByKey("dcountyCode");//区县编码
		var destination = convertNull(getUrlValueByKey("proName")) + " "
		+ convertNull(getUrlValueByKey("destName")) + " "
		+ convertNull(getUrlValueByKey("dcountyName"));
		
		if($.trim(destination) != null && $.trim(destination) != ""){
			//设置页面文本
			$("#destination").text(destination); 
			
			//设置隐藏域信息
			$("#provinceName").val(provinceName);
			$("#provinceCode").val(provinceCode);
			$("#cityName").val(cityName);
			$("#cityCode").val(cityCode);
			$("#countyName").val(contyName);
			$("#countyCode").val(contyCode);
			
			var destinationInfo = {};
			destinationInfo["provinceName"]= provinceName;
			destinationInfo["provinceCode"]= provinceCode;
			destinationInfo["cityName"]= cityName;
			destinationInfo["cityCode"]= cityCode;
			destinationInfo["contyName"]= contyName;
			destinationInfo["countyCode"]= contyCode;
			
			//将目的地信息保存到cookie中
			setCookie("destinationInfo",JSON.stringify(destinationInfo));
		} else {
			//从Cookie中读取目的地信息
			var destinationInfo = getCookie("destinationInfo");

			if(destinationInfo && destinationInfo != null){
				destinationInfo = $.parseJSON(destinationInfo);
				destination = convertNull(destinationInfo.provinceName) +" " 
				+ convertNull(destinationInfo.cityName) + " " 
				+ convertNull(destinationInfo.contyName);
				//设置页面文本
				$("#destination").text(destination); 
				//设置隐藏域信息
				$("#provinceName").val(destinationInfo.provinceName);
				$("#provinceCode").val(destinationInfo.provinceCode);
				$("#cityName").val(destinationInfo.cityName);
				$("#cityCode").val(destinationInfo.cityCode);
				$("#countyName").val(destinationInfo.contyName);
				$("#countyCode").val(destinationInfo.contyCode);
			}
		}
	}
	
	//填充寄件人信息
	function fillAddress(){
		var provinceName = getUrlValueByKey("proName");//省份名称
		var provinceCode = getUrlValueByKey("proCode");//省份编码
		var cityName = getUrlValueByKey("destName");//城市名称
		var cityCode = getUrlValueByKey("destCode");//城市编码
		var contyName = getUrlValueByKey("dcountyName");//区县名称
		var contyCode = getUrlValueByKey("dcountyCode");//区县编码
		var destination = convertNull(getUrlValueByKey("proName")) + " "
		+ convertNull(getUrlValueByKey("destName")) + " "
		+ convertNull(getUrlValueByKey("dcountyName"));
		
		if($.trim(destination) != null && $.trim(destination) != ""){
			//设置页面文本
			$("#destination").text(destination); 
			
			//设置隐藏域信息
			$("#provinceName").val(provinceName);
			$("#provinceCode").val(provinceCode);
			$("#cityName").val(cityName);
			$("#cityCode").val(cityCode);
			$("#countyName").val(contyName);
			$("#countyCode").val(contyCode);
			
			var destinationInfo = {};
			destinationInfo["provinceName"]= provinceName;
			destinationInfo["provinceCode"]= provinceCode;
			destinationInfo["cityName"]= cityName;
			destinationInfo["cityCode"]= cityCode;
			destinationInfo["contyName"]= contyName;
			destinationInfo["countyCode"]= contyCode;
			
			//将目的地信息保存到cookie中
			setCookie("destinationInfo",JSON.stringify(destinationInfo));
		} else {
			//从Cookie中读取目的地信息
			var destinationInfo = getCookie("destinationInfo");

			if(destinationInfo && destinationInfo != null){
				destinationInfo = $.parseJSON(destinationInfo);
				destination = convertNull(destinationInfo.provinceName) +" " 
				+ convertNull(destinationInfo.cityName) + " " 
				+ convertNull(destinationInfo.contyName);
				//设置页面文本
				$("#destination").text(destination); 
				//设置隐藏域信息
				$("#provinceName").val(destinationInfo.provinceName);
				$("#provinceCode").val(destinationInfo.provinceCode);
				$("#cityName").val(destinationInfo.cityName);
				$("#cityCode").val(destinationInfo.cityCode);
				$("#countyName").val(destinationInfo.contyName);
				$("#countyCode").val(destinationInfo.contyCode);
			}
		}
	}
	
	/**
	 * 设置目的地提示信息
	 */
	function setDestinationHintInfo(){
		//如果目的地	
	    var destination = $("#destination").html();
	    if(destination != null && destination != "" && destination.length != 0){
			$("#showFill").hide();
	    }else{
		    $("#showFill").show();
	    }
	}
	
	/**
	 * 设置寄件人选择提示信息的显示与隐藏
	 */
	function setSenderHintInfo(){
	    var senderCityName = $("#senderCityName").val();
	    if(senderCityName && senderCityName != null && $.trim(senderCityName) != ""){
	    	$("#selectSenderHint").hide();
	    	$("#senderInfo").show();
	    } else {
	    	$("#selectSenderHint").show();
	    	$("#senderInfo").hide();
	    }
	}
	
	function setSentHintInfo(){
	    var shippingCityName = $("#shippingCityName").val();
	    if(shippingCityName && shippingCityName != null && $.trim(shippingCityName) != ""){
	    	$("#selectSentHint").hide();
	    	$("#sentInfo").show();
	    } else {
	    	$("#selectSentHint").show();
	    	$("#sentInfo").hide();
	    }
	}
	
	/**
	 * 跳转到选择地址簿页面
	 */
	function toSelectAddressBook(){
		//将订单信息保存到 cookie 中
		saveOrderInfoToCookie();
		
		//如果地址簿ID不为空，将地址簿ID保存到cookie中
		var asbkId = getUrlValueByKey("asbkId");
		if(asbkId && asbkId != null && $.trim(asbkId) != ""){
			setCookie("asbkId",asbkId);
		}
		
		location.href = "../range/address_select.html";
	}
	
	function toSelectSentAddressBook(){
		//将订单信息保存到 cookie 中
		saveOrderInfoToCookie();
		
		//如果地址簿ID不为空，将地址簿ID保存到cookie中
		var sentAsbkId = getUrlValueByKey("sentAsbkId");
		if(sentAsbkId && sentAsbkId != null && $.trim(sentAsbkId) != ""){
			setCookie("sentAsbkId",sentAsbkId);
		}
		
		location.href = "../range/address_select_sent.html";
	}
	
	
	/**
	 * 跳转到选择目的地页面
	 */
	function toSelectDestination(){
		//将订单信息保存到 cookie 中
		saveOrderInfoToCookie();
		
		getAddressDetail('../range/region.html?addrName=destName&addrCode=destCode&addrCountyName=dcountyName&addrCountyCode=dcountyCode&type=3&gatChild=-1')
	}
	
	/**
	 * 验证所有必填项是否都已经填写
	 */
	function checkNull(){
		
		var senderCityName = $("#senderCityName").val();
	    var cityName = $("#cityName").val();
	    var weight = $("#weight").val();
	    var depositum = $("#depositum").val();
	    var shippingCityName = $('#shippingCityName').val();
	    var sentWay = $('#sentWay').val();
	    var paymentMethod = $('#paymentMethod').val();
	    var senderCityCode = $("#senderCityCode").val();
	    
	    
	    //普通运单
	    if(isElectronicAirWaybill==0){
	        if((senderCityName != null && $.trim(senderCityName) != "") 
	    		&& (cityName != null && $.trim(cityName) != "") 
	    		&& (weight != null && $.trim(weight) != "") 
	    		&& (depositum != null && $.trim(depositum) != "")){
		         $("#orderBut").removeClass("ui-btn btn-submit disable");
		         $("#orderBut").addClass("ui-btn btn-submit");
	     }else{
	    	     $("#orderBut").removeClass("ui-btn btn-submit");
	 	        $("#orderBut").addClass("ui-btn btn-submit disable");
	      }
	   } 
	    else{
	    	 if((senderCityName != null && $.trim(senderCityName) != ""&&senderCityCode==755) 
			    		&& (weight != null && $.trim(weight) != "") 
			    		&& (depositum != null && $.trim(depositum) != "")
			    		&&(shippingCityName!=null&& $.trim(shippingCityName) != "")
			    		&&(sentWay!=null&& $.trim(sentWay) != "")
			    		&&(paymentMethod!=null&& $.trim(paymentMethod) != "")){
				    $("#orderBut").removeClass("ui-btn btn-submit disable");
				    $("#orderBut").addClass("ui-btn btn-submit");
			    }else  if((senderCityName != null && $.trim(senderCityName) != ""&&senderCityCode!=755) 
			    		&& (weight != null && $.trim(weight) != "") 
			    		&& (depositum != null && $.trim(depositum) != "")
			    		&&(shippingCityName!=null&& $.trim(shippingCityName) != "")
			    		&&(paymentMethod!=null&& $.trim(paymentMethod) != "")){
				    $("#orderBut").removeClass("ui-btn btn-submit disable");
				    $("#orderBut").addClass("ui-btn btn-submit");
			    }else{
			    	$("#orderBut").removeClass("ui-btn btn-submit");
			 	    $("#orderBut").addClass("ui-btn btn-submit disable");
			    } 
	    }
	}
	
	function inputChange(){
		$("#senderCityName").change(function(){
			checkNull();
		});
		$("#cityName").change(function(){
			checkNull();
		});
		$("#weight").change(function(){
			checkNull();
		});
		$("#depositum").change(function(){
			checkNull();
		});
		
		$("#shippingCityName").change(function(){
			checkNull();
		});
	}
	
	/**
	 * 根据城市编码获取下单时间
	 */
	function getOrderTimeByCityCode(){
		//获取寄件人城市编码
		var cityCode = $("#senderCityCode").val();
		if(cityCode && cityCode != null && $.trim(cityCode) != ""){
			// 数据提交
			$.ajax({
				type : "GET",
				data : null,
				async : false,
				dataType : "json",
				url : "/service/order/getOrderTimeByCityCode/"+cityCode,
				success : function(data) {
					if(data && data != null){
						$("#orderStartTime").val(data.orderStartTime);
						$("#orderEndTime").val(data.orderEndTime);
						
						if(data.orderStartTime != null && data.orderStartTime != ""
								&& data.orderEndTime != null && data.orderEndTime != ""){
							$("#orderTimeTextDiv").html(data.orderStartTime+" - "+data.orderEndTime);
							$("#hintDiv").show();
						}
						getCommonImg("1101","N","1");
					} else {
						$("#orderStartTime").val("");
						$("#orderEndTime").val("");
						$("#orderTimeTextDiv").html("");
						$("#hintDiv").hide();
						getCommonImg("1101","N","2");
					}
				}
			});
		} else {
			$("#orderStartTime").val("");
			$("#orderEndTime").val("");
			$("#orderTimeTextDiv").html("");
			$("#hintDiv").hide();
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////
	//////////////////////          预约时间控件                          /////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	/**
	 * 生成可预约日期和时间(初始化控件)
	 */
	function generateOrderDate(cityCode){
		// 数据提交
		$.ajax({
			type : "GET",
			data : null,
			async : false,
			dataType : "json",
			url : "/service/order/initOrderDateAndTimeList/"+cityCode,
			success : function(data) {
				var dateList = data.dateList;
				
				//生成时间列表
				var dateUlContent = "";
				if(dateList != null && dateList.length == 3){
					var dateUlContent = '<li onclick="selectDate(this,0)" class="selected"><span class="name">今天</span><span class="date">' + dateList[0] +'</span></li>';
					dateUlContent += '<li onclick="selectDate(this,1)"><span class="name">明天</span><span class="date">' + dateList[1] +'</span></li>';
					dateUlContent += '<li onclick="selectDate(this,2)"><span class="name">后天</span><span class="date">' + dateList[2] +'</span></li>';
				}
				
				$("#selectDateValue").val(dateList[0]);	//设置当天的日期为默认值
				$("#orderDateList").html(dateUlContent);
				
				//生成当天的时间列表
				var todayTimeList = data.todayTimeList;
				var todayTimeUlContent = "";
				if(todayTimeList != null && todayTimeList.length > 0){
					for(var i=0; i< todayTimeList.length; i++){
						if(i==0){
							$("#selectTimeValue").val(todayTimeList[i]); //设置第一个时间为默认值
							todayTimeUlContent += '<li  onclick="selectTime(this)" class="current">'+ todayTimeList[i] + '</li>';
						} else {
							todayTimeUlContent += '<li  onclick="selectTime(this)">'+ todayTimeList[i] + '</li>';
						}
					}
				}
				
				//$("#orderTimeList").find("li").remove();
				$("#orderTimeList").html(todayTimeUlContent);
				getCommonImg("1102","N","1");
			},
			error : function(e) {
				getCommonImg("1102","N","3");
			}
		});
	}
	
	/**
	 * 选择日期和时间
	 */
	var liNum = 0; 
	var $picker = $('[data-toggle-content="datePicker"]');
	var $mask;
	var allPage = 0;
	var curPage = 1;
	var pickerTime = $("#orderTimeList");
	var next = $picker.find(".list-next");
	var prev = $picker.find(".list-prev");
	function selectDateAndTime(){
		//获取寄件人城市编码
		var senderCityCode = $("#senderCityCode").val();
		if(!senderCityCode || senderCityCode == null || $.trim(senderCityCode) == ""){
			tipsDialog("请选择寄件人信息");
			return;
		}
		
		//初始化下单日期和时间
		generateOrderDate(senderCityCode);
		
		var defaultDate = 0; //设置默认日期
		var defaultTime = 1; //设置默认时间
		var selectDate = defaultDate;
		var selectTime = defaultTime;			
		
		setPageInfo();
		
		$mask = $('<div class="maskbox" style="z-index:10; opacity:.9;"></div>');
		//e.stopPropagation();			
		$("body").append($mask);
		$picker.slideDown(300);
		
		//选择寄件时间中tabs
		$picker.find("[data-tabs='tabs']").each(function(e){
			var parent= $(this);				 
			parent.find("li").each(function(i){
				$(this).bind("click",function(){
					$(this).siblings("li").removeClass("cur").end().addClass("cur");
					parent.siblings(".ui-tabs-content").hide();
					parent.siblings(".ui-tabs-content").eq(i).show();
				});
			});
		});	
	}
	
	//设置分页信息
	function setPageInfo(){
		curPage = 1;	
		liNum = $("#orderTimeList").find("li").length;
		allPage = Math.ceil(liNum /12);

		if(allPage > 1){
			prev.addClass("disable").show();
			next.removeClass("disable").show();
		}else{
			prev.hide();
			next.hide();
		}
		if(curPage > 1){							
			next.removeClass("disable");
		}
		if(curPage == 1){
			prev.addClass("disable");
		}
	}
	
	//上一页
	function prevPage(){
		if(curPage != 1){
			var top = parseInt(pickerTime.css("top"));
			pickerTime.animate({top:top + 160},300);
			curPage = curPage - 1;
		}
		
		if(curPage > 1){	
			next.removeClass("disable");
		}
		if(curPage == 1){
			prev.addClass("disable");
			next.removeClass("disable");
		}
	}
	
	//下一页
	function nextPage(){
		if(curPage < allPage){
			var top = parseInt(pickerTime.css("top"));
			pickerTime.animate({top:top - 160},300);
			curPage = curPage + 1;	
		}
		if(curPage > 1){							
			prev.removeClass("disable");
		}
		if(curPage == allPage){
			next.addClass("disable");
		}
	}
	
	//选择日期
	function selectDate(obj,dateIndex){
		//获取寄件人城市编码
		var senderCityCode = $("#senderCityCode").val();
		
		$(obj).siblings("li").removeClass("selected").end().addClass("selected");
		pickerTime.css({top:0});
		// 数据提交
		$.ajax({
			type : "GET",
			data : null,
			dataType : "json",
			url : "/service/order/getOrderTimeListByCityCode/"+senderCityCode+"/"+dateIndex,
			success : function(data) {
				$("#orderTimeList").find("li").remove();
				
				var timeList = data.timeList;
				if(timeList == null || timeList.length == 0){
					$("#selectDateValue").val("");
				} else {
					var selectValue = obj.children[1].innerText;
					$("#selectDateValue").val(selectValue);
				}
				
				//生成当天的时间列表
				var timeUlContent = "";
				if(timeList != null && timeList.length > 0){
					for(var i=0; i< timeList.length; i++){
						if(i==0){
							$("#selectTimeValue").val(timeList[i]); //设置第一个时间为默认值
							timeUlContent += '<li onclick="selectTime(this)" class="current">'+ timeList[i] + '</li>';
						} else {
							timeUlContent += '<li onclick="selectTime(this)">'+ timeList[i] + '</li>';
						}
					}
				}
				$("#orderTimeList").html(timeUlContent);
				
				//重新设置分页信息
				setPageInfo();
				
				$picker.find("[data-tabs='tabs']").find("li").removeClass("cur").end().find('[data-menu="time"]').addClass("cur");
				$picker.find(".ui-tabs-content").hide();
				$picker.find('[data-tabs-content="time"]').show();
			},
			error : function(e) {
			}
		});
		$(this).siblings("li").removeClass("selected").end().addClass("selected");
	}
	
	//选择时间事件
	function selectTime(obj){
		$("#selectTimeValue").val(obj.innerText);
		$(obj).siblings("li").removeClass("current").end().addClass("current");
	}
	
	//确定事件
	function confirmEvent(){
		var selectDate = $("#selectDateValue").val();
		var selectTime = $("#selectTimeValue").val();

		if(selectDate && selectDate != "" && selectTime && selectTime != ""){
			$("#dateTimeText").text(selectDate+ " " +selectTime);
			$("#dateTimeInput").val(selectDate+ " " +selectTime);
		} else {
			$("#dateTimeText").text("现在");
			$("#dateTimeInput").val("");
		}
		$picker.slideUp(300,function(){
			$mask.remove();
			$mask = "";
		});
		
		$("#selectDateValue").val("");
		$("#selectTimeValue").val("");
	}
	
	//取消事件
	function cancelEvent(){
		$("#selectDateValue").val("");
		$("#selectTimeValue").val("");

		$picker.slideUp(300,function(){
			$mask.remove();
			$mask = "";
		});	
	}
	
	//文本提示弹出层
	function tipsDialog(content){
//		var $dialog = $('<div class="dialog-tips"></div>');
//		var $content = $('<div class="content"></div>');
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
		}, 5000);
	}
	
	
	function alertDialog(content){	
		var $mask = $('<div class="maskbox"></div>');
		var $dialog = $('<div id="dialog" class="ui-dialog"></div>');
		var $content = $('<div class="ui-alert-content"></div>');
		var $bottom = $('<div class="ui-dialog-bt ui-cols2 clearfix"></div>');	
		var $btnSubmit = $('<a class="ui-btn btn-submit" href="javascript:void(0);">我知道了</a>');
		var $btnCancel = $('<a class="ui-btn btn-cancel" href="javascript:void(0);">关闭 </a>');
		var dialogDocHeight = 0;
		$content.html(content);
		$bottom.append($btnCancel);	
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
			
			/*$mask.remove();
			$dialog.remove();
			$("body").removeAttr("style");	*/
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
	
	
	
	
	/**
	 * 选择日期点击事件，根据城市编码 和 日期序号 生成时间列表
	 */
	//function getOrderTimeListByCityCode(dateIndex){
	//	// 数据提交
	//	$.ajax({
	//		type : "GET",
	//		data : null,
	//		dataType : "json",
	//		url : "/service/order/getOrderTimeListByCityCode/"+12345+"/"+dateIndex,
	//		success : function(data) {
	//			//生成当天的时间列表
	//			var timeList = data.timeList;
	//			var timeUlContent = "";
	//			if(timeList != null && timeList.length > 0){
	//				for(var i=0; i< timeList.length; i++){
	//					timeUlContent += '<li>'+ timeList[i] + '</li>';
	//				}
	//			}
	//			
	//			$("#orderTimeList").html(timeUlContent);
	//		},
	//		error : function(e) {
	//		}
	//	});
	//}