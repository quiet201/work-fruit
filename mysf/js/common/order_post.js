//**********************************地址簿相关************************************************
/**
 * 保存地址簿[寄件人]
 * @param addressInfo
 * @param callback
 */
function saveAddressInfo_s(addressInfo,callback){
	//特殊规则校验
	var mobile = addressInfo.user_pno;
	if(addressInfo.pct.p.id+"" == "886" && !/^09[0-9]{8}$/.test(mobile)){
		alert(commonI18n.get("I_PNO_NOT_NULL"));
		return;
	}
	if (addressInfo.pct.p.id+"" == "852" && !/^[569][0-9]{7}$/.test(mobile)){
		alert(commonI18n.get("I_PNO_NOT_NULL"));
		return;
	}
	if (addressInfo.pct.p.id+"" == "853" && !/^6[0-9]{7}$/.test(mobile)){
		alert(commonI18n.get("I_PNO_NOT_NULL"));
		return;
	}
	//数据处理[校验+设置默认值]
	if(!addressInfo.isDefault){
		addressInfo.isDefault = false;
	}
	addressInfo.userAddressId = addressInfo.userAddressId;
	//配置参数
	var mm = {};
	mm.nation ="中國";													//中国[写死]
	mm.address = addressInfo.user_address; 								//西乡社区1234号[详细地址]
	mm.addressType = "S";												//S寄件人地址,R收件人地址
	mm.cityId = addressInfo.pct.c.id;									//755[必填]
	mm.cityName = addressInfo.pct.c.name;								//深圳市[必填]
	mm.company	= "";													//[可以不填]
	mm.countyId = addressInfo.pct.t.id;									//宝安区[必填]
	mm.countyName = addressInfo.pct.t.name;								//宝安区[必填]
	mm.extnumber  = "";													//[不知道是个啥反正没有填]	
	mm.fullname = 	addressInfo.user_name;								//孔为佳[必填]
	mm.userAddressId = StringUtils.tremNull(addressInfo.userAddressId);	//0FB412F7F04B4BAE96ED5AF50CC96E94[必填,保持使用地址原样userAddressId]
	mm.isDefault = addressInfo.isDefault;			//[必填,保持使用地址原样]
	mm.mobile = addressInfo.user_pno;									//15013553621[必填,手机号码]
	mm.provinceId = addressInfo.pct.p.id;								//440 [必填]
	mm.provinceName = addressInfo.pct.p.name;							//广东 [必填]
	//数据提交
	$.ajax({
		type : "POST",
		data : mm,
		dataType : "json",
		url : "/service/addrbook/address/save",
		success: function(json){
			if(callback){
				callback.call(this,json);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}


//**********************************港澳台下单簿相关************************************************
/**
 * 下单方法
 * @param orderhtml_publicType 下单来源 21微信,22易信
 * @param rootDiv 根div的id
 * @param info_s 寄件人信息
 * @param info_r 收件人信息
 * @param date 此项有值认为是预约下单
 */
function postOrder(orderhtml_publicType,rootDiv,info_s,info_r,date){
	//防止重复提交
	if(wx_lock.open("subinfo")){
		return;
	}
	//防止空数据
	if(!rootDiv){
		alert("請定義根Div的id");
		return;
	}
	if(!info_s){
		alert("請定義寄件人資訊");
		return;
	}
	//设置是否预约下单
	var booking = "0";
	var	dateStr = "";
	if(date){
		booking = "1";
		dateStr = date;
	}
	//提交订单 : 886台湾 , 852香港 , 853澳门
	var mobile = info_s.user_pno;
	var mobileArea = info_s.pct.p.id;
	var hkmtcourtyarea = "";
	if(info_s.pct.p.id+"" == "886"){
		hkmtcourtyarea = "TW";
		if(/^09[0-9]{8}$/.test(mobile)){
			mobileArea = "886";
		}else{
			alert(commonI18n.get("I_PNO_NOT_NULL"));
			return;
		}
	}else if (info_s.pct.p.id+"" == "852"){
		hkmtcourtyarea = "HKM";
		if(/^[569][0-9]{7}$/.test(mobile)){
			mobileArea = "852";
		}else{
			alert(commonI18n.get("I_PNO_NOT_NULL"));
			return;
		}
	}else if (info_s.pct.p.id+"" == "853"){
		hkmtcourtyarea = "HKM";
		if(/^6[0-9]{7}$/.test(mobile)){
			mobileArea = "853";
		}else{
			alert(commonI18n.get("I_PNO_NOT_NULL"));
			return;
		}
	}
	var orderJSON = '{'
		+'"orders":{'
		+'"orderRemark":"'+info_s.user_remark+'",'			//备注
		+'"orderArea":"' + hkmtcourtyarea + '",'			//地区 HKM , TW
	    +'"material":"'+info_s.user_material+'",'			//物品名称
	    +'"currency":"'+info_s.user_currency+'",'			//币种 "RMB"[写死]
	    +'"materialValue":"'+info_s.user_materialValue+'",'	//价格
		+'"hkmtWeight":"'+info_s.user_weight+'",'
		+'"orderType":"0",'
		+'"isBooking":"'+booking+'",'
		+'"reserveTime":"'+dateStr+'",'
		+'"hkmtDest":"'+info_s.hkmtDest+'",'
		+'"orderSource":"'+orderhtml_publicType+'"'
		+'},'
		+'"orderAddress":{'
		+'"company":"",'
		+'"contactName":"'+info_s.user_name+'",'
		+'"phone":"",'
		+'"mobile":"'+mobile+'",'
		+'"mobileArea":"'+mobileArea+'",'
		+'"countryName":"中國",'
		+'"provinceName":"'+info_s.pct.p.name+'",'
		+'"cityName":"'+info_s.pct.c.name+'",'
		+'"countyName":"'+info_s.pct.t.name+'",'
		+'"provinceId":"'+info_s.pct.p.id+'",'
		+'"cityId":"'+info_s.pct.c.id+'",'
		+'"countyId":"'+info_s.pct.t.id+'",'
		+'"address":"'+info_s.user_address+'"'
		+'}'
	+'}';
	var mm = {};
	mm.orderJSON = orderJSON; //表单数据
	mm.loginStatus = "2"; //用户登录状态  0未登录 , 2已登录
	mm.areaCodeOrderHkmt = info_s.pct.p.id; //地区编号
	
	// 按钮置灰
	document.getElementById("sub").onclick = "";
	document.getElementById("subByBook").onclick = "";
	var subButton = $(".btn-submit");
	subButton.attr("style","background-image: -moz-linear-gradient(top, #DDDDDD, #000000); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #DDDDDD), color-stop(1, #000000)); background-image: -o-linear-gradient(top, #DDDDDD, #000000); background-color:#000000; color:#fff; text-shadow: -1px -1px 0 #000000;");
	
	$.ajax({
		type : "POST",
		data : mm,
		dataType : "json",
		url : "/service/order/orderHkmt/neworder",
		success: function(json){
			var status = json.status;
			if(status == "success"){
				if(info_s.pct.p.id+"" == "886"){
					window.location = "/weiwap/hkm/orderSuccess_hkm.html?dq=tw";
				}else{
					window.location = "/weiwap/hkm/orderSuccess_hkm.html";
				}
			}else if(status == "reservetm_error")
				//超出派送时间范围后预约下单
				showBooking(rootDiv,info_s.pct.p.id,info_s.pct.t.id,function(timestr){
					postOrder(orderhtml_publicType,rootDiv,info_s,info_r,timestr);
				});
			else{
				alert(commonI18n.get("I_ERROR_INFO_03"));
			}
			wx_lock.close("subinfo");
			// 置灰按钮恢复(置红)
			document.getElementById("sub").onclick = doSubmit;
			document.getElementById("subByBook").onclick = doSubmitBybooking;
			subButton.attr("style","background-image: -moz-linear-gradient(top, #f86b8c, #dd1438); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f86b8c), color-stop(1, #dd1438)); background-image: -o-linear-gradient(top, #f86b8c, #dd1438); background-color:#dd1438; color:#fff; text-shadow: -1px -1px 0 #c11933;");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(commonI18n.get("I_ERROR_INFO_02"));
			wx_lock.close("subinfo");
			// 置灰按钮恢复(置红)
			document.getElementById("sub").onclick = doSubmit;
			document.getElementById("subByBook").onclick = doSubmitBybooking;
			subButton.attr("style","background-image: -moz-linear-gradient(top, #f86b8c, #dd1438); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f86b8c), color-stop(1, #dd1438)); background-image: -o-linear-gradient(top, #f86b8c, #dd1438); background-color:#dd1438; color:#fff; text-shadow: -1px -1px 0 #c11933;");
		}
	});
}


//**********************************服务超时预约相关************************************************
/**
 * 下单超服务时间处理一:[显示页面]
 */
//预约回调方法
var showBooking_callback = null;
var booking_rootDiv = null;
//时间数据
var today_Btn_Date = "";
var tomorrow_Btn_Date = "";
var aftertomorrow_Btn_Date = "";
var select_Date = "";
function showBooking(rootDiv,areaCodeOrderHkmt,countyId,callback){
	booking_rootDiv = rootDiv;
	showBooking_callback = callback;
	//查询当天是否显示todayBtn
	syncCallService('/service/order/orderHkmt/compareTime?countyId='+countyId
			+'&areaCodeOrderHkmt='+areaCodeOrderHkmt
			+'&_=1388723836505',
		'get',
		'JSON',
		'',
		function(data){
			if(data.isOrder){
				$("#todayBtn").show();
			}else{
				$("#todayBtn").hide();
			}
		},
		function(data){
		}
	);
	//查询当前地区服务时间,设置3个按钮的时间
	syncCallService('/service/order/orderHkmt/reserveDay?countyId='+countyId
			+'&areaCodeOrderHkmt='+areaCodeOrderHkmt
			+'&_=1388723836505',
		'get',
		'JSON',
		'',
		function(data){
			today_Btn_Date = data[0];
			tomorrow_Btn_Date = data[1];
			aftertomorrow_Btn_Date = data[2];
			$("#todayBtn").val(today_Btn_Date.substr(0,10));
			$("#tomorrowBtn").val(tomorrow_Btn_Date.substr(0,10));
			$("#aftertomorrowBtn").val(aftertomorrow_Btn_Date.substr(0,10));
		},
		function(data){
		}
	);
	//清空之前已经选择的日期
	$("#dateValue").html("請選擇日期");
	$("#timeValue").empty();
	$("#"+booking_rootDiv).hide();
	$("#setBookingTime").show();
}

/**
 * 下单超服务时间处理二:[关闭页面]
 */
function closeBooking(){
	$("#"+booking_rootDiv).show();
	$("#setBookingTime").hide();
};

/**
 * 下单超服务时间处理二:[点击明天、后天，显示时间]
 */
function selectDate(selectType){
	var dateValue = "";
	if(selectType == 'today'){
		dateValue = today_Btn_Date;
	}else if(selectType == 'tomorrow'){
		dateValue = tomorrow_Btn_Date;
	}else if(selectType == 'aftertomorrow'){
		dateValue = aftertomorrow_Btn_Date;
	}
	//获取时间格式2014/01/03 0900-1900
	select_Date = dateValue.substr(0,10);
	var minDate = new Number(dateValue.substr(11,2));
	var maxDate = new Number(dateValue.substr(16,2));
	$("#dateValue").html("已選日期  : " + select_Date);
	$("#timeValue").empty();
	for(var i=minDate; i<=maxDate; i++){
		var tempValue = i;
		if(i<10){
			tempValue = "0"+i;
		}
		$("#timeValue").append('<option value="'+tempValue+'">'+tempValue+'</option>');
	}
}

/**
 * 下单超服务时间处理三:[页面点击提交]
 */
function doSubmitBybooking(){
	var selectTime = $("#timeValue").val();
	if(!selectTime){
		alert("請選擇日期!");
		return;
	}
	//后台接受格式yyyy-mm-dd 00:00:00,因此要转换
	showBooking_callback(select_Date.substr(0,4)+"-"+select_Date.substr(5,2)+"-"+select_Date.substr(8,2)+" "+selectTime+":00:00");
}