var bno;
var askId;
var orderInfo;
var isOk = false;
var qType;
var wigth;
$(document).ready(function(){
	//removeShippingaddress();

	var urlParams = {
			bno : "",
			hasRoute : false
		};
		
	var ruleConfig={
				routeState:"",
				routeData :"",//路由信息
				ruleState : "",
				ruleData  :""//规则信息
			};
	
	inits(urlParams);
	if(bno!=null&&bno!="" && typeof(bno)!='object'){      
	  setCookie('bno',bno);
	}else{
	 bno = getCookie('bno');	
	 urlParams.bno = getCookie('bno');	
	}
	/*if(null!= urlParams.bno){
	 getData(ruleConfig,urlParams);
	}else{
	}*/
	getData(ruleConfig,getCookie('bno'));	
	//填充地址信息
	fullUserAddressSentBooks();
	
	checkNulls();
	
	 //alert($('#payMethodSec').is(':hidden'));
	
	//$("#shippingCityCode").change(); 
	


	
	//设置返回路径
	/*$('#updateAddressDiv').one("click",function(){  
		toSelectSentAddressBook("../../range/address_select_sent.html","../deliverydetails/no-routing/sf082-1.html?bno="+bno,"1");  
		});  
	*/
	
	//$('#updateAddressDiv').attr('click','toSelectSentAddressBook("../../range/address_select_sent.html","../deliverydetails/no-routing/sf082-1.html?bno="+bno,"1")');
	
	//loadFeeAndTime();

	
});


//初始化页面
function inits(obj) {
	getUrlParams(obj);
}

//获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "bno") {
				urlParams.bno = unescape($.trim(strs[i].split("=")[1]));
				bno = urlParams.bno;
			}
			if ([ strs[i].split("=")[0] ] == "hasRoute") {
				urlParams.hasRoute = unescape(strs[i].split("=")[1]);
			}
		}
	}
}

function getData(ruleConfig,bno) {
	$('#bno').text(bno);
	// 数据提交
			$.ajax({
				type : "POST",
				data : {
					waybillno : bno
				},
				dataType : "json",
				url : "/service/delivery/arrive/wayBillInfo/" + bno,
				success : function(data) {
					ruleConfig.routeData=data;
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						orderInfo = values;
						if (values) {
							wigth = fillNull(values.wigth);
							var toCityName = fillNull(values.toCityName);
							var name = fillNull(values.name);
							var phone = fillNull(values.phone);
							var address = fillNull(values.addressAddr);
							var toCityCode = fillNull(values.senderCityCode);
							qType = fillNull(values.qType);
							//截取城市编码
							if(null!=toCityCode&&''!=$.trim(toCityCode)){
							var reg = /\d+/g;
							var str = toCityCode;
							var ms = str.match(reg);
							 // 12345
							$('#toCityCode').text(ms[0]);
							}
							/*$('#toCityName').text(toCityName);
							$('#senderCityCode').text(toCityCode);*/
							$('#name').text(name);
							$('#phone').text(phone);
							$('#address').text(toCityName+address);
							changeCity();
							
							//addressAddr = convertNull(values.addressAddr);
						};
					};
					getCommonImg("10551","N","1");
				},
				error : function(e) {
					ruleConfig.routeState="N";
					getCommonImg("10551","N","3");
				}
			});
			
		

}

//改变复选框样式及按钮是否可用
function changeStyle(){
	var styles = $('#chImg').attr('class');
	//alert(styles);
	if('ui-ico-sfi ico-box'==styles){
	$('#chImg').attr('class','ui-ico-sfi ico-yes2');
	$('#isCheck').val('yes');
	}else{
		$('#chImg').attr('class','ui-ico-sfi ico-box');	
		$('#isCheck').val('no');
	}
	//$('#isCheck').val('yes');
	checkNulls();
	//alert($('#isCheck').val());
}

//判断必填项事件
function inputChange(){
	$("#shippingCityName").change(function(){
		checkNulls();
	});

	$("#isCheck").change(function(){
		checkNulls();
	});
}

function checkNulls(type){
    var shippingCityName = $('#shippingCityName').val();
    var isCheck = $("#isCheck").val();
    var cityCode =  $("#shippingCityCode").val();
    var oldCityCode =  $("#toCityCode").text();
    var isBtn = "false";
       //改派地址
        if(shippingCityName != null && $.trim(shippingCityName) != ""){
	         $("#btnOk").removeClass("ui-btn btn-submit-no");
	         $("#btnOk").addClass("ui-btn btn-submit");
	         isBtn = "true";
        }else{
    	    $("#btnOk").removeClass("ui-btn btn-submit");
 	        $("#btnOk").addClass("ui-btn btn-submit-no");
 	        if(null!=type){
 	        	alertError('请选择收货地址');
 	        	$("#btnOk").removeClass("ui-btn btn-submit");
 	  	        $("#btnOk").addClass("ui-btn btn-submit-no");
 	        }
 	     return  isBtn = "false";
 	        
      }
        if(null!=cityCode&&null!=oldCityCode&&''!=$.trim(cityCode)&&''!=$.trim(oldCityCode)){
        if(cityCode==oldCityCode&&'0'==$("#payMethodCode").val()){
        	 $("#btnOk").removeClass("ui-btn btn-submit-no");
	         $("#btnOk").addClass("ui-btn btn-submit");
	         isBtn = "true";
  	        
        }else if(cityCode!=oldCityCode&&'0'!=$("#payMethodCode").val()){
        	 $("#btnOk").removeClass("ui-btn btn-submit-no");
	         $("#btnOk").addClass("ui-btn btn-submit");
	         isBtn = "true";
        }else{
        	 $("#btnOk").removeClass("ui-btn btn-submit-no");
	         $("#btnOk").addClass("ui-btn btn-submit");
	         
	         if(null!=type){
	        	 alertError('请选择付款方式');
	 	        }
	         return  isBtn = "false";
        }
        }else{
        	$("#btnOk").removeClass("ui-btn btn-submit");
  	        $("#btnOk").addClass("ui-btn btn-submit-no");
        	 return isBtn = "false";
        }
        if('no'==$.trim(isCheck)){
        	$("#btnOk").removeClass("ui-btn btn-submit");
  	        $("#btnOk").addClass("ui-btn btn-submit-no");
  	       if(null!=type){
  	    	 alertError('请确认改派条款');
	         }
  	      return isBtn = "false";
  	     
        }
        else{
        	 $("#btnOk").removeClass("ui-btn btn-submit-no");
	         $("#btnOk").addClass("ui-btn btn-submit");
	       
	         isBtn = "true";
        }
        
      return isBtn;
       /* if(!$('#payMethodSec').is(':hidden')){
        	
        }*/
    
}

function fullUserAddressSentBooks(){
	//从url中获取地址簿ID
	var sentAsbkId = getUrlValueByKey("sentAsbkId");
	selectAndSetSentAddressBooks(sentAsbkId);

}


function selectAndSetSentAddressBooks(asbkId){
	if($.trim(asbkId)==""){
		return;
	}
	// 数据提交
	$.ajax({
		type : "POST",
		data : {sentAsbkId:asbkId},
		async : false,
		dataType : "json",
		url : "/service/sendaddress/sendbook/findonebook/"+asbkId,
		success : function(data) {
			if (data && data != null) {
				fillSentInfos(data,"userSentAddress","dataBase");
			}else{
				alertError("查询失败");
			}
		},
		error : function(e) {
		}
	});
}

function fillSentInfos(data,cookieKey,dataSource){
	
	if(data && data != null){
		//如果数据来组 cookie 则转换成 json 格式
		/*if(dataSource == "cookie"){
			data = $.parseJSON(data);
		}*/
		
		//设置页面文本
		$('#sentInfo').show();
		$('#selectSentHint').hide();
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
		//setCookie(cookieKey,JSON.stringify(data));
		changeCity();
			
	}
	//loadFeeAndTime();
	checkNulls();
	
}


/**
 * 封装订单数据
 */
function packagingAddress(){
	
	
	var orderJSON;
	
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
    var oldCityCode = $('#toCityCode').text();
    var oldName = $('#name').text();
    var oldPhone = $('#phone').text();
    var oldAddress = $('#address').text();
    var payMethod = $('#payMethodCode').val();
    
    var freight = $('#priceSpan').text();
    
    askId = shippingAsbkId;

    orderJSON = '{'
		+'"orders":{'
		+'"bno":"'+ bno +'"'  //运单号
		+'},'
		//收件人
		+'"shippingAddress":{'
		+'"payMethod":"'+ payMethod +'",'
		+'"freight":"'+ freight +'",'
		+'"oldAddress":"'+ oldAddress +'",'
		+'"oldCityCode":"'+ oldCityCode +'",'
		+'"oldName":"'+ oldName +'",'
		+'"oldPhone":"'+ oldPhone +'",'
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
	return orderJSON;
}

/**
 * 提交改派地址
 */
function btnClick(){
	
	if('false'==checkNulls(1)){
		
	}
	/*//首先判断此时提交按钮状态  若是不可用 则提示信息不完整
	var className = $('#btnOk').attr('class'); 
	//禁用样式时不予处理
	if("ui-btn btn-submit-no"==className){
		
	}*/else{
	//判断服务时间 弹出相应提示
   	 var param = packagingAddress();
	//提交预约
	$.ajax({
		type : "POST",
		data : {orderJSON:param},
		dataType : "json",
		url : "/service/order/orderContro/gaipai",
		success: function(result){
			if(null!=result){
				if("0"==$.trim(result)){
					alertError('该运单已申请改派');
				}else if("isGaiPai"==$.trim(result)){
					alertError('该运单已申请改派');
				}else{
					//提交成功清空缓存信息
					getNowTime();	
					deleteCookie("sentAsbkId");
					window.location = "gaiPaiInfo.html?bno="+getCookie('bno');
				}
			} else {
				alertError("服务器未响应");
			}
			
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alertError("服务器未响应");
			//startUsingButton();//启用提交按钮
		}
	});
	}

}


function showAgreement(){
	alertDialogs($("#light1").html(),2);
}
function alertDialogs3(contect,type){
	var $mask = $('<div class="maskbox" style="z-index:10; opacity:.9;" id="showCancel"></div>');
	var $tip = $('<div class="tip-box"></div>');
	var $content = $('<h2>'+contect+'</h2>');
	var $tipBtn = $('<div class="tip-btn"></div>');
	var $bottom;
	var $btnSubmit;
	if(1==type){
		$bottom = $('<a class="tip-btn-a1" href="javascript:closealertDialogs();" id="btnCancel" onclick="closealertDialogs();">'+
				'<div class="tip-btn-a-div">取消</div></a>');
	    $btnSubmit = $('<a class="tip-btn-a2" href="javascript:closealertDialogs();" id="btnOk" onclick="closealertDialogs();">'+
				'<div class="tip-btn-a-div">确认</div></a>');
		    	//</a><a class="ui-btn btn-submit" href="javascript:cancelOrder(\''+orderNo+'\');">确定</a>');
	}else{
		$bottom = $('<a class="tip-btn-a1" href="javascript:closealertDialogs();" id="btnCancel" onclick="closealertDialogs();">'+
		        '<div class="tip-btn-a-div">取消</div></a>');
        $btnSubmit = $('<a class="tip-btn-a2" href="javascript:closealertDialogs();" id="btnOk" onclick="closealertDialogs();">'+
		'<div class="tip-btn-a-div">确认</div></a>');
	}
	
	//将各部分标签组合起来
	$tipBtn.append($bottom);
	$tipBtn.append($btnSubmit);
	$tip.append($content);
	$tip.append($tipBtn);
	$mask.append($tip);
	$("body").append($mask);
	
	
}

function closealertDialog3(){
	$('#showCancel').hide();
}

function closealertDialogs(){
	$('#showCancel').remove();
}

function changeCity(){
	//判断是否同城改派
	if(null!=$('#toCityCode').text()&&''!= $.trim($('#toCityCode').text())&&null!=$('#shippingCityCode').val()&&''!=$.trim($('#shippingCityCode').val())){
		if($('#toCityCode').text()!=$('#shippingCityCode').val()){
			alertDialogs3('您更改的新的收货地址与原收货地址不在同一个城市，更改将会产生运费，是否确定更改？',3);
			$('#payMethodSec').show();
			loadFeeAndTimes();
		}else if($('#toCityCode').text() == $('#shippingCityCode').val() ){
			$('#payMethodSec').hide();
		}
	}
}

function btnClick1(){
	 var url ='sf082-5.html?bno='+UrlDecode(getCookie('bno'))+'&askId='+askId;
	 window.location = url;
}



/**
 * 查询并加载运费与时效
 */
function loadFeeAndTimes(){
	
	
	//使用方法
	var now = new Date();
	var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); 
					
			//设置参数
			var params = {
				"srcAddr":$('#toCityCode').text(),		//原寄地城市编码
				"srcName":$('#shippingCityCode').val(),		//原寄地城市名称
				"destAddr":$('#shippingCityCode').val(),		//目的地市编码,
				"srcCounty":$('#shippingCountyCode').val(),	//原寄地区/县编码
				"destCounty":$('#shippingCountyName').val(),	//目的地区/县
				"goodsWeigth":wigth,		//重量
				"type":1,
				"orderType":1,
				"qType":qType,
				"sendTime":nowStr			//下单时间
			};
			 getFeeAndTime(params);
	
}

/**
 * 查询运费与时效
 * @param param
 */
function getFeeAndTime(param){
	$.post("/service/alipay/searchFeeAndTime",param,function(result){
		if(result && result.length>0){
			
			//createDom(result,param.srcName);
		  
			
			$.each(result,function(i,value){
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
				var spriceUnit=getCurrencyUnit(param.srcName);//原寄地币种
				/*var productType=data[i].productName;
				if($.trim(productType)==""){
					productType=data[i].limitTypeName;
				}*/
				/*var tips=result[i].limitTypeCode=="T4"?"为客户提供的全国各省、直辖市、自治区及港澳台地区的高标准门到门快递服务。时效：中国大陆地区互寄：1-2天，部分偏远地区加0.5-1天。服务范围为中国大陆地区、港澳台地区，韩国，日本，新加坡，马来西亚，美国，泰国，越南，澳大利亚。"
						:"顺丰为您寄递非紧急物品而设计的经济型快递服务。时效：中国大陆地区互寄：2-3天，部分偏远地区加1-2天；中国大陆地区至港澳地区：2.5-3.5天，部分偏远地区加0.5-1天。服务范围：中国大陆地区互寄，中国大陆地区寄往香港、澳门地区。";*/
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
				$('#priceSpan').html(priceAndUnit);
			});
			
			
			/*$("#waitplease").hide();
			createDom(result,param.srcName);
			$("#freightTimelinessDiv").show();*/
			
			
			
		}else {
			//$("#waitplease").hide();
			//$("#freightTimelinessDiv").hide();
		}
	},"json"); 
}


function alertDialogs2(content){

	var $mask = $('<div class="maskboxs"></div>');
	var $dialog = $('<div id="dialog" class="ui-dialogs"></div>');
	var $content = $('<div class="ui-alert-contents"></div>');
	var $bottom;
	var $btnSubmit;
    var $btnCancel = $('<a class="ui-btns btn-cancels" href="javascript:void(0);">取消 </a>');
	    $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix"></div>');
	    $btnSubmit = $('<a class="ui-btns btn-submits" href="javascript:void(0);">确认</a>');
	
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

function changePayMenthod(event,type){
	$('#payMethodCode').val(type);
	if('1'==type){
		$('#PayMenthod1').attr('class','btn-buttom-smsj');
		$('#PayMenthod2').attr('class','btn-buttom-hkj text-margin-left-10');
	}else{
		$('#PayMenthod1').attr('class',' btn-buttom-hkj text-margin-left-10');
		$('#PayMenthod2').attr('class',' btn-buttom-smsj');
	}
	//$('#isCheck').val('yes');
	checkNulls();
}



Date.prototype.format = function(format){
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format)) {
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
	if(new RegExp("("+ k +")").test(format)) {
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	}
	}
	return format;
	}

//获取当前时间
function getNowTime(){
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var time = hour+':'+minute;
	var str = time_range ("9:00", "21:00", time);
	if(null!=str){
		alertDialogs3(str);
		//tipsDialog(str);
	}
}

//判断服务时间
var time_range = function (beginTime, endTime, nowTime) {
	      var strb = beginTime.split (":");
	      if (strb.length != 2) {
	          return false;
	      }
	 
	      var stre = endTime.split (":");
	      if (stre.length != 2) {
	         return false;
	     }
	 
	     var strn = nowTime.split (":");
	     if (stre.length != 2) {
	         return false;
	    }
	     var b = new Date ();
	     var e = new Date ();
	     var n = new Date ();
	 
	     b.setHours (strb[0]);
	     b.setMinutes (strb[1]);
	     e.setHours (stre[0]);
	     e.setMinutes (stre[1]);
	     n.setHours (strn[0]);
	     n.setMinutes (strn[1]);
	 
	     if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
	         return null;
	     } else {
	    	 return '您好！现在是非办公时间。您可以继续提交服务需求，顺妞上班(09:00-21:00)后第一时间为您办理。';
	    	 //alertDialogs2('您好！现在是非办公时间。您可以继续提交服务需求，顺妞上班(09:00-21:00)后第一时间为您办理。');
	        // return false;
	     }
	 }

	

