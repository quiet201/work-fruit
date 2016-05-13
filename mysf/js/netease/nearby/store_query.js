$(document).ready(function(){
	/* proName=广东&proCode=440&srcName=广州&srcCode=020&acountyName=越秀区&acountyCode=020&
	countDistCode=A440104000 */
	//加日志
	$.post("/service/commonLog/addLog/L00803");
	
	var proName=getUrlValueByKey("proName");
	var srcName=getUrlValueByKey("srcName");
	var acountyName=getUrlValueByKey("acountyName");
	var type=getUrlValueByKey("type");
	//设置地址
	if($.trim(type)==""){
		if($.trim(srcName)!=""){
			$("#nearAddress").removeClass("colorgrey02").addClass("colorgrey01");
			$("#nearSubmit").removeClass("disable");
			$("#nearAddress").text(proName+" - "+srcName+" - "+acountyName);
			
		}
	}else{
		if($.trim(srcName)!=""){
			$("#nearAddress").removeClass("colorgrey02").addClass("colorgrey01");
			$("#nearSubmit").removeClass("disable");
			$("#nearAddress").text(srcName);
		}
	}
	
	//设置关键词
	var inputText=getCookie("nearInput");
	if($.trim(inputText)!=""){
		$("#input-text").val(inputText);
	}
	$("#nearSubmit").off("click").on("click",function(){
		var inputValue=$("#input-text").val();
		var addValue=$("#nearAddress").text();
		//$.trim(inputValue)=="" || 
		if($.trim(addValue)=="选择地区" ){
			alertError("请选择地区");
			//$("#errorTips").show();
			return;
		}
		var url="/page/netease/nearby/storeList.html?proName="+proName+"&cityName="+srcName+"&countyName="+acountyName+"&keyWord="+inputValue;
		if($.trim(type)!=""){
			url="/page/netease/nearby/storeList.html?cityName="+srcName+"&countyName="+acountyName+"&keyWord="+inputValue;
		}
		//setCookie("nearInput",fillNull(inputValue));
		//deleteCookie("nearInput");
		location.href=url;
		//tipsDialog("提交成功！");
	});
	
	getCommonImg("1072","N","1");  
	
	checkNull()
});
function getAddress(){
	var inputValue=$("#input-text").val();
	setCookie("nearInput",fillNull(inputValue));
	getAddressDetail('/page/common/address/province.html?addrName=srcName&addrCode=srcCode&addrCountyName=acountyName&addrCountyCode=acountyCode&type=3&gatChild=-2');
};
function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2500);
}

function checkNull(){
	 if('选择地区'==$('#nearAddress').text()){
		 $('#nearSubmit').addClass('disable');
		 $('#nearSubmit').removeClass('btn-submit');
	 }else{
		 $('#nearSubmit').addClass('btn-submit');
		 $('#nearSubmit').removeClass('disable');
	 }
}