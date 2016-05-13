$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00801");
	/*var refer=document.referrer;
	if(refer.indexOf("?")!=-1&&refer.indexOf("ALIPAY_TO_TIMING")==-1){
		$("#waitplease2").show();
		$("#wrapper").css('display','none');
		window.setTimeout("wait()",1000);
	}*/
	queryDto={"srcAddr":"",//原寄地市编码
			"srcName":"",
			"srcCounty":"",//原寄地区/县
			"scName":"",
			"stype":"",//标示为是 原寄地类型，1：表示国际件 2：表示港澳台 地址栏不带此参数：表示国内件
			"destAddr":"",//目的地市编码
			"destName":"",
			"destCounty":"",//目的地区/县
			"dcName":"",
			"dtype":"",//标示为是 目的地类型，1：表示国际件 2：表示港澳台 地址栏不带此参数：表示国内件
			"goodsWeigth":"1",//重量
			"sendTime":"",
			"type":"" //查询类型  1：表示国际件 2：表示港澳台 地址栏不带此参数：表示国内件
	}; 
	//加载公共资源,并执行初始化方法
	/*getDescPage("commonPage","/page/common/tips/tips.html",'init');*/
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
//	init();
});

function init(){
	
	$('[data-toggle="show-explain"]').bind("click",function(){
		$(this).toggleClass("open");
	});
	//地址信息
	var proName=getUrlValueByKey("proName");
	var proCode=getUrlValueByKey("proCode");
	var srcName=getUrlValueByKey("srcName");//
	var srcCode=getUrlValueByKey("srcCode");
	var acountyName=getUrlValueByKey("acountyName");
	var acountyCode=getUrlValueByKey("acountyCode");
	var destName=getUrlValueByKey("destName");
	var destCode=getUrlValueByKey("destCode");
	var dcountyName=getUrlValueByKey("dcountyName");
	var dcountyCode=getUrlValueByKey("dcountyCode");
	var dateTime=getUrlValueByKey("dateTime");
	var interType=getUrlValueByKey("type");
	//如果获取的是原寄地信息
	var queryParam=getCookie("queryDto");
	if(!queryParam){
		queryParam=queryDto;
	}else{
		queryParam=$.parseJSON(queryParam);
	}
	if(srcCode){
		setDtoParam(queryParam,"srcAddr",srcCode);
		setDtoParam(queryParam,"srcName",srcName);
		setDtoParam(queryParam,"srcCounty",acountyCode);
		setDtoParam(queryParam,"scName",acountyName);
		setDtoParam(queryParam,"stype",interType);
		setDtoParam(queryParam,"sproName",proName);
		setDtoParam(queryParam,"sproCode",proCode);
		var dtoJson=JSON.stringify(queryParam);
		//setCookie("queryDto",dtoJson);
		setCookieTime('queryDto',dtoJson);
	}
	if(destCode){
		setDtoParam(queryParam,"destAddr",destCode);
		setDtoParam(queryParam,"destName",destName);
		setDtoParam(queryParam,"destCounty",dcountyCode);
		setDtoParam(queryParam,"dcName",dcountyName);
		setDtoParam(queryParam,"dtype",interType);
		setDtoParam(queryParam,"dproName",proName);
		setDtoParam(queryParam,"dproCode",proCode);
		var dtoJson=JSON.stringify(queryParam);
		//setCookie("queryDto",dtoJson);
		setCookieTime('queryDto',dtoJson);
	}
	if(dateTime){
		setDtoParam(queryParam,"sendTime",dateTime);
		var dtoJson=JSON.stringify(queryParam);
		//setCookie("queryDto",dtoJson);
		setCookieTime('queryDto',dtoJson);
	}
	if(location.href.indexOf("?")!=-1 && location.href.indexOf("ALIPAY_TO_TIMING") == -1){
		location.href=location.href.substring(0, location.href.indexOf("?"));
	}
	//给参数设置
	queryParam=getCookie("queryDto");
	if(queryParam){
		queryParam=$.parseJSON(queryParam);
		//如果是国际件  1：为原寄地，2为目的地
		setAddrInputValue(queryParam);
		//给查询按钮设置颜色
		//去掉选择时校验，改为点击查询时才校验
		//var validateInfo=validateQueryFreight();
		//if($.trim(validateInfo)==""){
		//	$(".ui-btn.btn-submit").removeClass("disable");
		//}
	}
	//隐藏提示语
	//$("#noteTips").hide();
	getCommonImg("1091","N","1");
	addListen();
	checkNull();
};

function wait(){
	$("#waitplease2").hide();
	$("#wrapper").css('display','block');
}
//页面展示信息设置
function setAddrInputValue(queryParam){
	//原寄地
	if(queryParam.srcName){
		if(queryParam.stype){
			setValueById("srcName",queryParam.srcName);
		}else{
			setValueById("srcName",queryParam.sproName+" - "+queryParam.srcName+" - "+queryParam.scName);
		}
		$("#srcName").removeClass("colorgrey02");
		$("#srcName").addClass("colorgrey01");
	}
	if(queryParam.destName){
		if(queryParam.dtype){
			setValueById("destName",queryParam.destName);
		}else{
			setValueById("destName",queryParam.dproName+" - "+queryParam.destName+" - "+queryParam.dcName);
		}
		$("#destName").removeClass("colorgrey02");
		$("#destName").addClass("colorgrey01");
	}
	if(queryParam.sendTime){
		$("#dateTime").html(queryParam.sendTime);
	}
	
	checkNull();
};
function addListen(){
	//切换地址icon-timing icon-refresh
	
	//$(".ui-ico-sfi02.ico-swap.ico-exchange").off("click").on("click",function(){
	$(".icon-timing.icon-refresh").off("click").on("click",function(){
		var temp=getValueById("srcName");
		var temp2=getValueById("destName");
		setAddrValueById("srcName",temp2);
		setAddrValueById("destName",temp);
		
		//百度统计
		commonEventPush('寄件','页面统计','价格与时效','timing.html');
	});
	//查询
	/*$("#btnQuery").off("click").on("click",function(){
		
	});*/
	$("input[class='Amount']").bind("focus",function(){
		$("#noteTips").hide();
	});
	
	$(".ui-btn.btn-buttom-line3").unbind().bind("click",function(){
		location.href="/page/lanxin/order/ship.html";
	});
};
function btnClick(){
	var validateInfo=validateQueryFreight();
	if($.trim(validateInfo)!=""){
		alertError(validateInfo[0]);
		//$("#noteTips").text(validateInfo[0]).show();
		return;
	}
	var queryParam=getCookie("queryDto");
	queryParam=$.parseJSON(queryParam);
	var weight = $("#weight").text();
	queryParam.goodsWeigth=weight.substring(0,weight.indexOf("kg"));//重量
	var re = /^\d+(\.\d{2}|\.\d{1})?$/;
	if(!re.test(queryParam.goodsWeigth)){
		alertError("重量输入有误，只能为正数字或数字两位小数");
		//$("#noteTips").text("重量输入有误，只能为正数字或数字两位小数").show();
		//$(".input-text").focus();
		return;
	}
	if(queryParam.goodsWeigth>130 || queryParam.goodsWeigth<1){
		alertError("托寄物重量应为1kg~130kg之间");
		//$("#noteTips").text("托寄物重量应为1kg~999kg之间").show();
		//$(".input-text").focus();
		return;
	}
	//没有错误信息才去提交
	if($.trim(validateInfo)==""&&validateInfo.length==0){
		queryFreight(queryParam);
	}
	//此时清除cookie
	//deleteCookie('queryDto');
	//百度统计
	commonEventPush('寄件','页面统计','价格与时效','timing.html');
}
//校验查件信息
function validateQueryFreight(){
	var validateArray=[];
	var queryParam=getCookie("queryDto");
	if(queryParam){
		queryParam=$.parseJSON(queryParam);
		var weight = $("#weight").text();
		queryParam.goodsWeigth=weight.substring(0,weight.indexOf("kg"));//重量
		validateElement(queryParam.srcAddr,validateArray,"请选择原寄地地区");
		validateElement(queryParam.destAddr,validateArray,"请选择目的地地区");
		//对国际件，区县市不需要参加校验的
		if(queryParam.stype==""){
			validateElement(queryParam.srcCounty,validateArray,"请选择原寄地地区");
		}
		if(queryParam.dtype==""){
			validateElement(queryParam.destCounty,validateArray,"请选择目的地地区");
		}
		validateElement(queryParam.goodsWeigth,validateArray,"请填写重量");
	}else{
		validateArray.push("请选择原寄地地区");
	}
	return validateArray;
};
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
	$("#waitplease").show();
	
	var queryValue=changeData(params);
	//searchFeeAndTime(queryValue);
	matrixSearchFeeAndTime(queryValue,"2");
};


function getSendingTime(url){
	location.href=url+"?forward="+location.href;
};

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2000);
}

function cv(n){
//	$(".Amount").val($(".Amount").val().replace(/[^\d]/g,''));
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

/**
 * 判断非空项是否已填
*/
function checkNull(){
	 $(".dev-search-show").hide();
	 if('请选择寄件城市'==$('#srcName').text() || '请选择寄送城市'==$('#destName').text()){
		 $('#btnQuery').addClass('disable');
		 $('#btnQuery').removeClass('btn-submit');
		 //隐藏我要寄件、列表框
//		 $(".dev-search-show").hide();
		 
	/* }else if('请选择寄送城市'==$('#destName').text()){
		 $('#btnQuery').addClass('disable');
		 $('#btnQuery').removeClass('btn-submit');*/
	 }else{
		 $('#btnQuery').addClass('btn-submit');
		 $('#btnQuery').removeClass('btn-cancel');
		//显示我要寄件、列表框
	 }
}

function setWeightValue(_this){

	
	if(_this){
		//填其它重量文本框删除KG
		var value = $(_this).val();
		if(value.indexOf("kg")>-1){
			value = value.replace("kg","");
			$(_this).val(value);
		}
		
	}else{
		//设置重量
		var obj = $("#weight");
		var value = $(obj).text();
		if(value){
			if(value.indexOf("kg")<0){
				$(obj).text(value+"kg");
			}
		}
	}
	checkNull();
}

///**
// * 切换表格
// */
//function switchTable(obj){
//	var className = $(obj).attr("class");
//	var priceDiv = $(".price");
//	if("send"==className){
////		$(obj).attr("class","return");
////		$(obj).text("到付");
////		//并且隐藏下面的寄付价格
////		$(priceDiv).children(".jfPrice").hide();
////		$(priceDiv).children(".dfPrice").show();
//	}else{
////		$(obj).attr("class","send");
////		$(obj).text("寄付");
////		//并且隐藏下面的寄付价格
////		$(priceDiv).children(".dfPrice").hide();
////		$(priceDiv).children(".jfPrice").show();
//	}
//	/*$.each(priceDiv ,function(index,item){
//		//寄付时显示寄付价格表
//		if("send"==className){
//			
//			$(item)
//		}
//		
//	});*/
//	
//}
