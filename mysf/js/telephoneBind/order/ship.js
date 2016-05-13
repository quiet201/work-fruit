
 //判断当前运单状态 1。电子运单  0.普通运单 默认为电子运单
    var isElectronicAirWaybill=1;
    //var url ='../../telephoneBind/range/ship_submit.html';
	$(document).ready(function(){
		//加日志
		$.post("/service/commonLog/addLog/L00501");
		//加载公共资源,并执行初始化方法
		getDescPage("commonPage","/page/common/tips/tips.html",'init');
	});
	
	
	
	function init(){
		//填充订单信息
		fillOrderInfo();

		
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
		
		//获取寄件人地址
		getSenderAddress();
		getCommonImg("100","N","1");
	}
	
	function pagePosition(e){
		$("html,body").animate({scrollTop:($(e).offset().top)},1000);
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
		if('1'==code){
			$('#jf').attr('class','ui-btn btn-buttom-smsj');
			$('#df').attr('class','ui-btn btn-buttom-hkj');
		}
		else{
			$('#df').attr('class','ui-btn btn-buttom-smsj');
			$('#jf').attr('class','ui-btn btn-buttom-hkj');
		}
		$("#paymentMethod").val(code);
	}

	//选择寄件方式
	function sendWay(code){
		
		 $('#sentWay1').attr('class','ui-btn btn-buttom-smsj');
		   //$('#sentWay2').attr('class','ui-btn btn-buttom-hkj');
		   $('#uMsg').html('收派员将会在1小时内上门收件');
		   $('#uMsg').show();
		   $('#sentWay').val(1);
		   $('#orderRemarkDiv').show();
		   $('#dateTimeInputDiv').show();
		   $('#hintDiv').show();
		   $('#labelDiv').show();
		   $('#uWeight').hide();
		   $('#FeeAndTimeDiv').show();
		   
		   $('#insuredAmountDiv').attr('class','item item-fm');
		/*if(code==1){
		   $('#sentWay1').attr('class','ui-btn btn-buttom-smsj');
		   //$('#sentWay2').attr('class','ui-btn btn-buttom-hkj');
		   $('#uMsg').html('收派员将会在1小时内上门收件');
		   $('#uMsg').show();
		   $('#sentWay').val(1);
		   $('#orderRemarkDiv').show();
		   $('#dateTimeInputDiv').show();
		   $('#hintDiv').show();
		   $('#labelDiv').show();
		   $('#uWeight').hide();
		   $('#FeeAndTimeDiv').show();
		   
		   $('#insuredAmountDiv').attr('class','item item-fm');
		}
		else{
			$('#sentWay2').attr('class','ui-btn btn-buttom-smsj');
			$('#sentWay1').attr('class','ui-btn btn-buttom-hkj');
			$('#uMsg').html('下单后去嘿客店打印运单，立省2元');
			$('#uMsg').show();	
			$('#sentWay').val(2);
			 $('#dateTimeInputDiv').hide();
			//隐藏备注  上门时 间
			$('#orderRemarkDiv').hide();
			$('#hintDiv').hide();
			$('#labelDiv').hide(); 
			$('#uWeight').show();
			$('#FeeAndTimeDiv').hide();
			$('#agreementDiv').show();
			
			$('#insuredAmountDiv').attr('class','item item-fm border-bottom-line');
		}*/
		//$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
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
	
	//服务条款点击事件
	function makeSureClick(){
		var makeSure = $('#makeSure').attr('class');
		if('ui-ico-sfi ico-box'==makeSure){
			$('#makeSure').attr('class','ui-ico-sfi ico-yes2');
		}else{
			$('#makeSure').attr('class','ui-ico-sfi ico-box');
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
			var firstUrl=location.href;
			if(firstUrl && firstUrl.indexOf("?")==-1){
				return;
			}
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
	/*function submitOrder(){
		var orderJSON = packagingOrderData();
		$.ajax({
			type : "POST",
			data : {orderJSON:orderJSON},
			dataType : "json",
			url : "/service/order/order/appointment",
			success: function(json){
				if(json){
					getCommonImg("1103","N","1");
					window.location = "/../../telephoneBind/range/ship_submit.html?orderJson="+encodeURI(json);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				getCommonImg("1103","N","3");
			}
		});
	}*/
	
	/**
	 * 跳转到确认页面
	 */
	function toConfirmPage(){
		var orderJson =  packagingOrderData();
		window.location = "/../../telephoneBind/range/ship_submit.html?orderJson="+encodeURI(orderJson);
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
		var dsentWay = $("#sentWay").val();
		if(!senderCityName || senderCityName == null || $.trim(senderCityName) == ""){
			alertError('请选选择寄件人信息');
			return false;
		} 
		
		//电子运单非空验证
		if(isElectronicAirWaybill==1){
			//保价金额验证
			var shippingCityName = $("#shippingCityName").val();
			if(!shippingCityName || shippingCityName == null || $.trim(shippingCityName) == ""){
				//$("#hintMessage").html("请选择 收 件人信息");
				//$("#hintMessage").show();
				alertError('请选择 收 件人信息');
				return false;
			} 
			
			if(senderCityCode=="755"){
			   
			   if(!dsentWay || dsentWay == null || $.trim(dsentWay) == ""){
				//$("#hintMessage").html("请选择寄件方式");
				//$("#hintMessage").show();
				   alertError('请选择寄件方式');
				return false;
			    } 
		    }
			
			var dpaymentMethod = $("#paymentMethod").val();
			if(!dpaymentMethod || dpaymentMethod == null || $.trim(dpaymentMethod) == ""){
				alertError('请选择付款方式');
				return false;
			} 
			
			//寄托物非空验证
			var depositum = $("#depositum").val();
			if(!depositum || depositum == null || depositum ==""){
				alertError('请填写寄托物');
				
				return false;
			} 
			//验证寄托物名称是否超长
			if(checkStrIsToLong(depositum,30)){
				alertError('寄托物名称超长');
				return false;
			}
			
			var dinsuredAmount = $("#insuredAmount").val();
			if(dinsuredAmount!=null&&dinsuredAmount!=""&&dinsuredAmount>20000){
				alertError('保价金额不能超过20000元，请重新填写');
				return false;
			}else if(dinsuredAmount!=null&&dinsuredAmount<=0&&dinsuredAmount!=""){
				alertError('保价金额不能低于1元，请重新填写');
				return false;
			}else{
			}
			
			if('ui-ico-sfi ico-box'==$('#makeSure').attr('class')){
				alertError('请同意快递运单契约条款');
				return false;
			}
		}
		else{
			//目的地非空验证
			var dCityName = $("#cityName").val();
			if(!dCityName || dCityName == null || $.trim(dCityName) == ""){
				return false;
			} 
		}
		
		//寄托物重量非空验证
		var weight = $("#weight").val();
		if(!weight || weight == null || weight == ""){
			alertError('请填写托寄物重量');
			return false;
		} 
		var re = /^\d+(\.\d{2}|\.\d{1})?$/;
		if(!re.test(weight)){
			alertError("重量输入有误，只能为正数字或数字一位小数");
			//$("#noteTips").text("重量输入有误，只能为正数字或数字两位小数").show();
			//$(".input-text").focus();
			return false;
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
			alertError('托寄物重量应为1kg~999kg');
			    return false;
		 } else {
		}
		
		if(null!=dsentWay&&""!=$.trim(dsentWay)&&dsentWay==2){
			if(weight>99){
				alertError('嘿客下单重量不能超过99kg');
				return false;
			}
		}
		
		
		
		
		var  insuredAmount = $('#insuredAmount').val();
		if(insuredAmount!=null&&insuredAmount!=''){
			var re = /^\d+(\.\d{2}|\.\d{1})?$/;
			if(!re.test(insuredAmount)){
				alertError("保价金额输入有误，只能为正数字");
				//$("#noteTips").text("重量输入有误，只能为正数字或数字两位小数").show();
				//$(".input-text").focus();
				return false;
			}
		}
		//验证备注是否超长
		var orderRemark = $("#orderRemark").val();
		if(checkStrIsToLong(orderRemark,100)){
			alertError('备注太长');
			return false;
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
					alertError("您选择的时间已超过你所选择的寄件地区的上门时间，请选择上门时间预约上门取件。");
					return false;
				} else {
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
			setCookie("asbkId",data.asbkId);
			
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
			$('#sentWayDiv').hide();//隐藏寄件方式
			$('#insuredAmountDiv').hide();//保价金额
			$('#paymentMethodDiv').hide();//隐藏付款方式
			$('#depositumDiv').hide();//隐藏拖寄物
			$('#agreementDiv').hide();//隐藏快递运单契约条款
		}else{
			isElectronicAirWaybill = 1;
			//为电子运单时，显示多项，隐藏目的地
			$('#sentAddreess-navs').show();//显示收件人信息
			$('#sentAddreess').show();//显示收件人地址
			$('#destinationDiv').hide();//隐藏目的地
			$('#paymentMethodDiv').show();//显示付款方式
			$('#insuredAmountDiv').show();
			$('#depositumDiv').show();
			$('#agreementDiv').show();
			if(cityName==755){
				$('#sentWayDiv').show();//显示寄件方式
			}
			else{
				$('#sentWayDiv').hide();//显示寄件方式
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
		var destination = fillNull(getUrlValueByKey("proName")) + " "
		+ fillNull(getUrlValueByKey("destName")) + " "
		+ fillNull(getUrlValueByKey("dcountyName"));
		
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
				destination = fillNull(destinationInfo.provinceName) +" " 
				+ fillNull(destinationInfo.cityName) + " " 
				+ fillNull(destinationInfo.contyName);
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
		
		checkNull();
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
		var shipAskId="";
		if($.trim($("#senderAsbkId").val())!=""){
			shipAskId=$.trim($("#senderAsbkId").val());
		};
		location.href = "/page/telephoneBind/addressbook/send/address_menber1.html?addressToPage=/page/telephoneBind/order/ship.html&shipAskId="+shipAskId;
	}
	
	function toSelectSentAddressBook(url,urlStr,type){
		//将订单信息保存到 cookie 中
		saveOrderInfoToCookie();
		if('1'==type){
			if(null!=bno){
		     setCookie('bno',bno);
			}
		}
		//如果地址簿ID不为空，将地址簿ID保存到cookie中
		var sentAsbkId = getUrlValueByKey("sentAsbkId");
		if(sentAsbkId && sentAsbkId != null && $.trim(sentAsbkId) != ""){
			//setCookie("sentAsbkId",sentAsbkId);
		}
		//location.href = "../range/address_select_sent.html";
		var shipAskId="";
		if($.trim($("#shippingAsbkId").val())!=""){
			shipAskId=$.trim($("#shippingAsbkId").val());
		};
		location.href = url+"?urlStr="+urlStr+"&shipAskId="+shipAskId;
	}
	
	
	/**
	 * 跳转到选择目的地页面
	 */
	function toSelectDestination(){
		//将订单信息保存到 cookie 中
		saveOrderInfoToCookie();
		
		getAddressDetail('../../common/address/province.html?addrName=destName&addrCode=destCode&addrCountyName=dcountyName&addrCountyCode=dcountyCode&type=3&gatChild=-1');
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
	    		//&& (depositum != null && $.trim(depositum) != "")
	    		){
		         $("#orderConfirmBut").removeClass("ui-btn btn-submit-no");
		         $("#orderConfirmBut").addClass("ui-btn btn-submit");
	     }else{
	    	     $("#orderConfirmBut").removeClass("ui-btn btn-submit");
	 	         $("#orderConfirmBut").addClass("ui-btn btn-submit-no");
	      }
	   } 
	    else{
	    	 if((senderCityName != null && $.trim(senderCityName) != ""&&senderCityCode==755) 
			    		&& (weight != null && $.trim(weight) != "") 
			    		&& (depositum != null && $.trim(depositum) != "")
			    		&&(shippingCityName!=null&& $.trim(shippingCityName) != "")
			    		&&(sentWay!=null&& $.trim(sentWay) != "")
			    		&&(paymentMethod!=null&& $.trim(paymentMethod) != "")){
	    		  $("#orderConfirmBut").removeClass("ui-btn btn-submit-no");
		          $("#orderConfirmBut").addClass("ui-btn btn-submit");
			    }else  if((senderCityName != null && $.trim(senderCityName) != ""&&senderCityCode!=755) 
			    		&& (weight != null && $.trim(weight) != "") 
			    		&& (depositum != null && $.trim(depositum) != "")
			    		&&(shippingCityName!=null&& $.trim(shippingCityName) != "")
			    		&&(paymentMethod!=null&& $.trim(paymentMethod) != "")){
			    	 $("#orderConfirmBut").removeClass("ui-btn btn-submit-no");
			         $("#orderConfirmBut").addClass("ui-btn btn-submit");
			    }else{
			    	$("#orderConfirmBut").removeClass("ui-btn btn-submit");
		 	        $("#orderConfirmBut").addClass("ui-btn btn-submit-no");
			    } 
	    	 
	    	  if('ui-ico-sfi ico-yes2'!=$('#makeSure').attr('class')){
	  	    	$("#orderConfirmBut").removeClass("ui-btn btn-submit");
	   	        $("#orderConfirmBut").addClass("ui-btn btn-submit-no");
	  	    }else{
	  	    	$("#orderConfirmBut").removeClass("ui-btn btn-submit-no");
	  	        $("#orderConfirmBut").addClass("ui-btn btn-submit");
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
		
		$("#shippingCityName").change(function(){
			checkNull();
		});
		
		$("#weight").change(function(){
			checkNull();
		});
		$("#depositum").change(function(){
			checkNull();
		});
	}
	
	/**
	 * 根据城市编码获取下单时间
	 */
	function getOrderTimeByCityCode(){
		$("#waitplease1").show();
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

					$("#waitplease1").hide();
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
					
				},
				error : function(e) {
					$("#waitplease1").hide();
					getCommonImg("1101","N","3");
				}
			});
		} else {
			$("#waitplease1").hide();
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
		}, 2500);
	}
	
	
	function alertDialog(content){	
		var $mask = $('<div class="maskboxs"></div>');
		var $dialog = $('<div id="dialog" class="ui-dialogs"></div>');
		var $content = $('<div class="ui-alert-contents"></div>');
		var $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix"></div>');	
		var $btnSubmit = $('<a class="ui-btns btn-submits" href="javascript:void(0);">我知道了</a>');
		var $btnCancel = $('<a class="ui-btns btn-cancels" href="javascript:void(0);">关闭 </a>');
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
	
	function checkFaaAndTime(){
		
		var cityId = $('#senderCityCode').val();
		var cityName = $('#senderCityName').val();
		var srcCounty = $('#senderCountyCode').val();
		var weight = $('#weight').val();
		var params = null;
		var sendTime = $('#dateTimeInput').val();
		
		if(null==cityId||""==$.trim(cityId)||null==cityName||""==$.trim(cityName)||null==srcCounty||''==$.trim(srcCounty)){
			alertError('请选择寄件人信息');
			return "";
		}
		
		if(null==weight||""==$.trim(weight)){
			alertError('请填写重量');
			return "";
		}
		
		var re = /^\d+(\.\d{2}|\.\d{1})?$/;
		if(!re.test(weight)){
			alertError("重量输入有误，只能为正数字或数字一位小数");
			//$("#noteTips").text("重量输入有误，只能为正数字或数字两位小数").show();
			//$(".input-text").focus();
			return "";
		}
		
		if(isElectronicAirWaybill==1){
		
		var destAddr = $('#shippingCityCode').val();
	
		var destCounty = $('#shippingCountyCode').val();
		
		if(null==destAddr||""==$.trim(destAddr)||null==destCounty||""==$.trim(destCounty)){
			alertError('请选择收件人信息');
			//为防止缓存导致非法数据 此时清空所有收件人信息
			$("#selectSentHint").show();
			//deleteCookie("destinationInfo");
	    	$("#sentInfo").hide();
			return "";
		}
		
		//var sendTime = $().val();
			
		//设置参数
		params = {
			"srcAddr":cityId,		//原寄地城市编码
			"srcName":cityName,		//原寄地城市名称
			"destAddr":destAddr,		//目的地市编码,
			"srcCounty":srcCounty,	//原寄地区/县编码
			"destCounty":destCounty,	//目的地区/县
			"goodsWeigth":weight,		//重量
			/*"sentWay":orders.sentWay,
			"paymentMethod":orders.paymentMethod,
			"insuredAmount":orders.insuredAmount,*/
			"type":1,
			"orderType":1,
			"sendTime":sendTime		//下单时间
		 };
		}else{
			//设置参数
			
			var destAddr = $('#cityCode').val();
			var destCounty = $('#countyCode').val();
			//var sendTime = $().val();
			
			if(null==destAddr||""==$.trim(destAddr)||null==destCounty||""==$.trim(destCounty)){
				alertError('请选择送达城市信息');
				//为防止缓存导致非法数据 此时清空所有收件人信息
				$("#destination").text(""); 
				//deleteCookie("destination");
				//deleteCookie("destinationInfo");
				deleteCookie("destinationInfo");
				$("#showFill").show();
				return "";
			}
			
			
			params = {
				"srcAddr":cityId,		//原寄地城市编码
				"srcName":cityName,		//原寄地城市名称
				"destAddr":destAddr,		//目的地市编码,
				"srcCounty":srcCounty,	//原寄地区/县编码
				"destCounty":destCounty,	//目的地区/县
				"goodsWeigth":weight,		//重量
				"type":1,
				"orderType":0,
				"sendTime":sendTime			//下单时间
			};
		}
		
		return params;
		
	}
	
	
	/**
	 * 查询并加载运费与时效
	 */
	function loadFeeAndTime(){
		
		//判断是否展示或隐藏
		if($('#show-explain-id').is(':hidden')){
			//嘿客不加载运费与时效
			if($('#sentWay').text()!=2){
				//$("#waitplease").show();
				//var orderJSON = getUrlParams("orderJSON");
				//var orders = $.parseJSON(orderJSON).orders;				//下单信息
				//var senderInfo = $.parseJSON(orderJSON).senderInfo;		//寄件人信息
				//var destination = $.parseJSON(orderJSON).destination; 	//目的地
				//var shipingInfo = $.parseJSON(orderJSON).shippingAddress;//收 件人信息
				params = checkFaaAndTime();
				if(null!=params&&""!=$.trim(params)){
					queryFreight(params);	
				}
			
				
		  }
		}else{
		  $('.table.table-ship').hide();
		
		}
				
	}
	
	//3：表示国际件 2：表示港澳台 地址栏不带此参数：1表示国内件
	function changeData(param){
		if(!param){
			return;
		}
		//查询地区类型统一修改成简体中文
		var data=param;
		data.type="1";
		if(data.stype=="2" && data.dtype=="2"){
			data.type="2";
		}
		//如果时间不存在
		if(!data.sendTime){
			data.sendTime=new Date().format("yyyy-MM-dd hh:mm");
		}
		return data;
	};
	
	function queryFreight(params){
		
		var queryValue=changeData(params);
		searchFeeAndTime(queryValue);
	};
	
	/**
	 * 查询运费与时效
	 * @param param
	 */
	function searchFeeAndTime(param){
		$("#waitplease").show();
		$.ajax({
			type : "POST",
			data : param,
			dataType : "json",
			url : "/service/alipay/searchFeeAndTime",
			success : function(result) {
				$("#waitplease").hide();
				if(result && result.length>0){
					createDoms(result,param.srcName);
				}else {
					//var goodsWeigth = param.goodsWeigth;
					alertError('系统开了会小差，再试试吧');
					/*$("#conmment-tips").show();
					setTimeout(function() {
						$("#conmment-tips").fadeOut();
					}, 1000);*/
				}
				
			},
			error : function(e) {
				$("#waitplease").hide();
			}
		});
		/*$.post("/service/alipay/searchFeeAndTime",param,function(result){
			if(result && result.length>0){
				$("#waitplease").hide();
				//deleteCookie("queryDto");
				createDoms(result,param.srcName);
			}else {
				var goodsWeigth = param.goodsWeigth;
				$("#waitplease").hide();
				$("#conmment-tips").show();
				setTimeout(function() {
					$("#conmment-tips").fadeOut();
				}, 1000);
			}
		},"json"); */
	}

	/**
	 * 组装数据并将隐藏区域设为显示
	 * @param data
	 * @param name
	 */
	function createDoms(data,name){
		var buff=setAddrDomInfos(data,name);
		$(".tbody").empty().append(buff);
		toggleChanges();
		$(".table.table-ship").show();
	};

	/**
	 * 动态组装价格与时效文本
	 * @param data
	 * @param name
	 * @returns {String}
	 */
	function setAddrDomInfos(data,name){
		var buff="";
		$.each(data,function(i,value){
			//设定时间
			var date=value.deliverTm;
			var time="";
			if($.trim(date)!=""){
				date=new Date(date).format("yyyy-MM-dd hh:mm");
				time=date.split(" ");
				date=time[0];
				time=time[1];
			}else{
				date="";
			}
			var spriceUnit=getCurrencyUnit(name);//原寄地币种
			var productType=data[i].productName;
			if($.trim(productType)==""){
				productType=data[i].limitTypeName;
			}
			var tips=data[i].limitTypeCode=="T4"?"为客户提供的全国各省、直辖市、自治区及港澳台地区的高标准门到门快递服务。时效：中国大陆地区互寄：1-2天，部分偏远地区加0.5-1天。服务范围为中国大陆地区、港澳台地区，韩国，日本，新加坡，马来西亚，美国，泰国，越南，澳大利亚。"
					:"顺丰为您寄递非紧急物品而设计的经济型快递服务。时效：中国大陆地区互寄：2-3天，部分偏远地区加1-2天；中国大陆地区至港澳地区：2.5-3.5天，部分偏远地区加0.5-1天。服务范围：中国大陆地区互寄，中国大陆地区寄往香港、澳门地区。";
			var rmb  =value.currencyCode.trim() == "CNY" ? "&nbsp;&nbsp;元" : spriceUnit;
			var freight =0;
			if($.trim(value.freight)!=""){
				freight=parseFloat(value.freight);
			}
			if($.trim(value.fuelCost)!=""){
				freight=freight+parseFloat(value.fuelCost);
			}
			var priceAndUnit="";
			if(value.currencyCode.trim() == "CNY"){
				priceAndUnit=freight+rmb;
			}else{
				priceAndUnit=rmb+" : "+freight;
			}
			 /*<tr class="tr-top"><td rowspan="2" class="text-center">
			 <i class="ui-ico-sfi ico-parcel-time"></i><br />
             	<span class="s-title">顺丰标快</span></td>
				<td>
					<p>2014-11-10</p>
					<p>16:00-19:00</p>
				</td>
				<td>(周日)</td>
				<td><p class="contract-color">22.00元</p></td>
			</tr>
			<tr class="tr-bottom">
				<td colspan="3">
					<p>全国及港澳台高标准的门到门快件服务</p>
				</td>
			</tr>*/
			
			
			/*buff=buff+"<div class='tr-box' data-toggle='show-explain'><dl class='tr-row'>"+
			"<dd class='td'>"+fillNull(productType)+"</dd>"+
			"<dd class='td'><p>"+fillNull(date)+"</p><p class='hot'>"+fillNull(time)+"</p></dd>"+
			"<dd class='td'><span class='hot'>"+fillNull(priceAndUnit)+"</span></dd>"+
			"<dd class='td'><i class='ui-ico-sfi ico-arrow'></i></dd></dl>"+
			"<div class='explain'>"+fillNull(tips)+"</div></div>";*/
			
			buff += "<tr class='tr-top'>"+
        			"	<td rowspan='1' class='text-center'>"+
        			"		<i class='ui-ico-sfi ico-parcel-time'></i>"+
                    "   </td>"+
        			"	<td>"+
        			"		<span class='s-time'>"+fillNull(date)+getWeekDate(fillNull(date))+fillNull(time)+"</span>"+
        			"	</td>"+
        			"	<td><p class='contract-color'>"+fillNull(priceAndUnit)+"</p></td>"+
        			"</tr>"+
        			"<tr class='tr-bottom'>"+
        			" 	<td rowspan='1' class='text-center'>"+
                    "    	<span class='s-title'>"+fillNull(productType)+"</span>"+
                    "    </td>"+
        			"	<td colspan='2'>"+
        			"		<p>全国及港澳台高标准的门到门快件服务</p>"+
        			"	</td>"+
        			"</tr>";
			
//			buff = buff+"<tr class='tr-top'><td rowspan='2' class='text-center'>"+
//			       "<i class='ui-ico-sfi ico-parcel-time'></i><br/>"+
//			       "<span class='s-title'>"+fillNull(productType)+"</span></td>"+
//			       "<td><p>"+fillNull(date)+"</p><span style='margin-left:5px'>"+fillNull(time)+"</span></td>"+
//			       "<td>"+getWeekDate(fillNull(date))+"</td><td><p style='color:#e65a5a;'>"+fillNull(priceAndUnit)+"</p></td>"+
//			       "<tr class='tr-bottom'><td colspan='3'><p>"+'全国及港澳台高标准的门到门快件服务'+"</p></td></tr>";
		});
		return buff;
	}

	//展开与隐藏切换
	function toggleChanges(){
		$('[data-toggle="show-explain"]').bind("click",function(){
			$(this).toggleClass("open");
		});
	};
	
	
	/**
	 * 提交订单
	 */
	//var param;	
	function submitOrder(){
		//禁用提交按钮
		//forbiddenButton();
		//var param = packagingOrderData();
		/*var className = $('#orderConfirmBut').attr('class'); 
		if(className=="ui-btn btn-submit disable"){
			showDiv();
		}else{*/
		//提交预约
		clearCookie();
		var param = packagingOrderData();
		
		if(checkAddressLength($("#senderAddress").text(),"亲，寄件人地址不能超过50个字哦~",150)&&
				checkAddressLength($("#shippingAddress").text(),"亲，收件人地址不能超过50个字哦~",150)&&
				checkAddressLength($("#senderNameLabel").text(),"亲，寄件人姓名不能超过10个字哦~",30)&&
				checkAddressLength($("#sentNameLabel").text(),"亲，收件人姓名不能超过10个字哦~",30)){
		$.ajax({
			type : "POST",
			data : {orderJSON:param},
			dataType : "json",
			url : "/service/order/order/submitOrder",
			success: function(result){
				if(result){
					if(result.code == "200"){
						//清空寄件相关cookie信息
						clearCookie();
						//跳转成功页面
						window.location = "/page/telephoneBind/order/ship_success.html?resultJson="+JSON.stringify(result);
					} else if(result.code == "201") {
						//tipsDialog("预约失败");
						alertError("预约失败");
						clearCookie();
						startUsingButton();
					} else if(result.code == "203"){
						//tipsDialog("参数错误");
						clearCookie();
						alertError("预约失败");
						startUsingButton();
					}
				} else {
					alertError("服务器未响应");
					startUsingButton();
					clearCookie();
				}
				clearCookie();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alertError("服务器未响应");
				startUsingButton();//启用提交按钮
			}
		});
		//}
		}
	}
	
	
	
	
	/**
	 * 禁用提交按钮
	 */
	function forbiddenButton(){
		$("#orderConfirmBut").removeClass("ui-btn btn-submit");
	    $("#orderConfirmBut").addClass("ui-btn btn-submit disable");
	    //document.getElementById("orderConfirmBut").onclick = "";
	    
		//var subButton = $("#submitBtn");
		//document.getElementById("orderBtn").onclick = "";
		//subButton.attr("style","background-image: -moz-linear-gradient(top, #DDDDDD, #000000); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #DDDDDD), color-stop(1, #000000)); background-image: -o-linear-gradient(top, #DDDDDD, #000000); background-color:#000000; color:#fff; text-shadow: -1px -1px 0 #000000;");
	}
	
	/**
	 * 启用提交按钮
	 */
	function startUsingButton(){
		$("#orderConfirmBut").removeClass("ui-btn btn-submit disable");
	    $("#orderConfirmBut").addClass("ui-btn btn-submit");
	    document.getElementById("orderConfirmBut").onclick = submitOrder;
		//var subButton = $("#submitBtn");
		//document.getElementById("orderBtn").onclick = submitOrder;
		//subButton.attr("style","background-image: -moz-linear-gradient(top, #ec5b5b, #ec5b5b); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ec5b5b), color-stop(1, #ec5b5b)); background-image: -o-linear-gradient(top, #ec5b5b, #ec5b5b); background-color:#ec5b5b; color:#fff; text-shadow: -1px -1px 0 #c11933;");			
	}
	
	/**
	 * 清楚寄件相关cookie信息
	 */
	function clearCookie(){
		deleteCookie("userAddBookCount");
		deleteCookie("orderInfo");
		deleteCookie("destinationInfo");
		deleteCookie("asbkId");
		deleteCookie("userAddress");
		deleteCookie("userDefaultAddress");
		deleteCookie("remarkLabel");
		deleteCookie("orderRemark");
		deleteCookie("insuredAmount");
		deleteCookie("sentAsbkId");
		deleteCookie("destinationInfo");
		deleteCookie("userSentAddress");
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
	
	function alertSuccess(contect){
		$('#MsgInfo').text(contect);
		$('#success').show();
		setTimeout(function () {
			$('#success').fadeOut(500);
		}, 2500);
	}
	
	function alertError(contect){
		$('#errorInfo').text(contect);
		$('#errorMsg').show();
		setTimeout(function () {
			$('#errorMsg').fadeOut(500);
		}, 2500);
	}
	
	
	function cv(n){
//		$(".Amount").val($(".Amount").val().replace(/[^\d]/g,''));
		var amVal = $(".Amount").val().replace(" ",'');
		if(n<0){
			amVal--;
		}else{
			amVal++;
		}
		
		
		if(amVal>=99){
			amVal = 99;
			$(".Increase").addClass("DisIn").removeClass("Increase");
		}else{
			$(".DisIn").addClass("Increase").removeClass("DisIn");
		}
		
		if(amVal<=1){
			amVal = 1;
			$(".Decrease").addClass("DisDe").removeClass("Decrease");
		}else{
			$(".DisDe").addClass("Decrease").removeClass("DisDe");
		}
		$(".Amount").val(amVal);
	}
	
	/*获取寄件人地址*/
	function getSenderAddress(){
		var firstUrl=location.href;
		if(firstUrl && firstUrl.indexOf("?")>-1){
			return;
		}
			// 数据提交
			$.ajax({ 
				type : "POST",
				dataType : "json",
				url : "/service/sendaddress/sendbook/findbooksbyuserId",
				success : function(data) {
					if (data) {
						var defaultAdd="";
						var selectAdd="";
						var firstAdd="";
						var resultAdd="";
						$.each(data,function(index,value){
							if(value.addressStatus=="1"){//1为默认地址
								defaultAdd=value;
							}
							if(value.hasChecked){//1 被选择,2 未被选择
								selectAdd=value;
							}
							if(index==0){
								firstAdd=value;
							}
						});
						if(defaultAdd){
							resultAdd=defaultAdd;
						}else if(!defaultAdd && selectAdd){
							resultAdd=selectAdd;
						}else if(!selectAdd && firstAdd){
							resultAdd=firstAdd;
						}
						setSenderAddFirst(resultAdd);
					}
					
					//清空收件人
					/**
					 * 清楚寄件相关cookie信息
					 */

						deleteCookie("userAddBookCount");
						deleteCookie("orderInfo");
						deleteCookie("destinationInfo");
						//deleteCookie("asbkId");
						//deleteCookie("userAddress");
						deleteCookie("userDefaultAddress");
						deleteCookie("remarkLabel");
						deleteCookie("orderRemark");
						deleteCookie("insuredAmount");
						deleteCookie("sentAsbkId");
						deleteCookie("destinationInfo");
						deleteCookie("userSentAddress");
				},
				error : function(e) {
						console.log("查询失败...");
					}
				});
	}
	
	function setSenderAddFirst(data){//默认第一次设置寄件人地址信息
		if(data && data != null){
			
			// 设置页面文本
			$("#senderNameLabel").text(data.userName); 			// 姓名
			$("#senderPhoneLabel").text(data.telePhoneNuber); 	// 电话
			$("#senderAddress").text(data.areaName+" "+data.detailAdress); 		// 用户地址
			
			// 设置隐藏域信息，用于提交
			$("#senderName").val(data.userName);				// 寄件人姓名
			$("#senderPhone").val(data.telePhoneNuber);			// 寄件人电话
			$("#senderAsbkId").val(data.asbkId);				// 寄件人地址簿ID
			$("#senderProvinceName").val(data.provinceName);	// 寄件人省份名称
			$("#senderProvinceCode").val(data.provinceCode);	// 寄件人省份编码
			$("#senderCityName").val(data.cityName);			// 寄件人城市名称
			$("#senderCityCode").val(data.cityCode);			// 寄件人城市编码
			$("#senderCountyName").val(data.countyName);		// 寄件人区县名称
			$("#senderCountyCode").val(data.countyCode);		// 寄件人区县编码
			$("#senderDetailAddress").val(data.detailAdress);	// 寄件人详细地址
			// 将用户地址簿保存到 Cookie 中
			
			setCookie("asbkId",data.asbkId);
			setCookie("userAddress",JSON.stringify(data));
			
			
		}
		
		// 寄件人信息查询为异步请求，此处需要调用寄件人 提示信息设置和按钮颜色设置
		setSenderHintInfo();
		
		// 判断是否电子运单
		selectTheWaybill($("#senderCityCode").val());
		
		checkNull();
		
	}
	
	function checkAddressLength(text,content,lengths){
		
		 var add = text;
			
			var length = 0;
			for (var i=0;i<add.length;i++){
				
				var str = add.charAt(i);
				//判断是字符长度为1
				if(/\s/.test(str)){
					length+=0;
				}else{
					length+=3;
				}
				/*if(/^[a-zA-Z]*$/.test(str))
				{
				    //alert("“" + str + "”里全是字母！");
				    length++;
				}else if(/^[0-9]*$/.test(str)){
					//判断是数字字符为1
					 length++;
				}*/
				/*else if(/^[\u4e00-\u9fa5]*$/.test(str))
				{
				    //判断是汉字字符为3
				    length+=3;
				}else{
					length++;
				}*/
				
			} 
			if(length>lengths){
				//$("#waitplease").hide();
				alertError(content);
				return false;
			}else{
				return true;
			}
				
			
	}