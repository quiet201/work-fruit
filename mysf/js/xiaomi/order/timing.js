$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00801");
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
	init();
	addListen();
});

function init(){
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
		setCookie("queryDto",dtoJson);
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
		setCookie("queryDto",dtoJson);
	}
	if(dateTime){
		setDtoParam(queryParam,"sendTime",dateTime);
		var dtoJson=JSON.stringify(queryParam);
		setCookie("queryDto",dtoJson);
	}
	if(location.href.indexOf("?")!=-1){
		location.href=location.href.substring(0, location.href.indexOf("?"));
	}
	//给参数设置
	queryParam=getCookie("queryDto");
	if(queryParam){
		queryParam=$.parseJSON(queryParam);
		//如果是国际件  1：为原寄地，2为目的地
		setAddrInputValue(queryParam);
		//给查询按钮设置颜色
		var validateInfo=validateQueryFreight();
		if($.trim(validateInfo)==""){
			$(".ui-btn.btn-submit").removeClass("disable");
		}
	}
	//隐藏提示语
	//$("#noteTips").hide();
	getCommonImg("1091","N","1");
	
};
//页面展示信息设置
function setAddrInputValue(queryParam){
	//原寄地
	if(queryParam.srcName){
		if(queryParam.stype){
			setValueById("srcName",queryParam.srcName);
		}else{
			setValueById("srcName",queryParam.sproName+" - "+queryParam.srcName+" - "+queryParam.scName);
		}
		$("#srcName").removeClass("placeholder");
	}
	if(queryParam.destName){
		if(queryParam.dtype){
			setValueById("destName",queryParam.destName);
		}else{
			setValueById("destName",queryParam.dproName+" - "+queryParam.destName+" - "+queryParam.dcName);
		}
		$("#destName").removeClass("placeholder");
	}
	if(queryParam.sendTime){
		$("#dateTime").html(queryParam.sendTime);
	}
};
function addListen(){
	//切换地址
	$(".ui-ico-sfi.ico-exchange").off("click").on("click",function(){
		var temp=getValueById("srcName");
		var temp2=getValueById("destName");;
		setAddrValueById("srcName",temp2);
		setAddrValueById("destName",temp);
		
		//百度统计
		commonEventPush('寄件','页面统计','价格与时效','timing.html');
	});
	//查询
	$(".ui-btn.btn-submit").off("click").on("click",function(){
		var validateInfo=validateQueryFreight();
		if($.trim(validateInfo)!=""){
			$("#noteTips").text(validateInfo[0]).show();
			return;
		}
		var queryParam=getCookie("queryDto");
		queryParam=$.parseJSON(queryParam);
		queryParam.goodsWeigth=$(".input-text").val();//重量
		var re = /^\d+(\.\d{2}|\.\d{1})?$/;
		if(!re.test(queryParam.goodsWeigth)){
			$("#noteTips").text("重量输入有误，只能为正数字或数字两位小数").show();
			//$(".input-text").focus();
			return;
		}
		if(queryParam.goodsWeigth>999 || queryParam.goodsWeigth<1){
			$("#noteTips").text("托寄物重量应为1kg~999kg之间").show();
			//$(".input-text").focus();
			return;
		}
		queryFreight(queryParam);
		
		//百度统计
		commonEventPush('寄件','页面统计','价格与时效','timing.html');
	});
	$(".input-text").bind("focus",function(){
		$("#noteTips").hide();
	});
};
//校验查件信息
function validateQueryFreight(){
	var validateArray=[];
	var queryParam=getCookie("queryDto");
	if(queryParam){
		queryParam=$.parseJSON(queryParam);
		queryParam.goodsWeigth=$(".input-text").val();//重量
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
	searchFeeAndTime(queryValue);
	
	//$.post("/service/alipay/searchFeeAndTime",
	//		queryValue,
	//		function(result){
	//			if(result && result.length>0){
	//				$("#waitplease").hide();
	//				//deleteCookie("queryDto");
	//				createDom(result,queryValue.srcName);
	//			}else {
	//				$("#waitplease").hide();
	//				alert("系统繁忙,请稍后重试!");
	//			}
	//		},"json"); 
};

//function createDom(data,name){
//	var buff=setAddrDomInfo(data,name);
//	$(".tbody").empty().append(buff);
//	toggleChange();
//	$(".table.table-ship").show();
//};

//展开与隐藏切换
//function toggleChange(){
//	$('[data-toggle="show-explain"]').bind("click",function(){
//		$(this).toggleClass("open");
//	});
//};
function getSendingTime(url){
	location.href=url+"?forward="+location.href;
};

