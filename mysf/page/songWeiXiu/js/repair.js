/**
 * 
 */
//手机品牌
var productbrands =[];//['中国移动','三星','苹果','联想','中兴','华为','小米'];//productbrand
//手机型号
var productSeries = [];//[{"productBrands":'苹果',"productSeries":['iphone4','iphone4c','iphone5','iphone5c','iphone5s','iphone6','iphone6plus','iphone6s']},{"productBrands":'华为',"productSeries":['P8','P7','P6']}];
//手机颜色
var productColors = [];//[{"productBrands":'苹果',"productSeries":'iphone4',"procuctColor":["白色","黑色"]},{"productBrands":'华为',"productSeries":'p8',"procuctColor":["白色","黑色"]}];
//故障大类类别
var productFaultTypes = [];//[{"productBrands":'苹果',"productSeries":'iphone4',"procuctType":['屏幕故障','电池故障','声音故障','按键故障']},{"productBrands":'华为',"productSeries":'p8',"procuctType":['屏幕故障','电池故障','声音故障','按键故障']}];

var productFaultCodes = [];//[{"productBrands":'苹果',"productSeries":'iphone4',"procuctType":'屏幕故障',"productName"['屏幕故障','电池故障','声音故障','按键故障']},{"productBrands":'华为',"productSeries":'p8',"procuctType":['屏幕故障','电池故障','声音故障','按键故障']}];

var productSolveCodes = [];
//型号ID
var SERIES_ID = "series_id";
//颜色ID
var COLOR_ID = "color_id";
//故障大类ID
var FAULTTYPE_ID = "faulttype_id";
//故障详细ID
var FAULTCODE_ID = "faultcode_id";
//故障解决方案
var SOLVECODE_ID = "solvecode_id";
//var productFaultDetails=[{"factorymaterialprice":1024,"faultcode":"0101","faultname":"MonitorBroke","faulttype":"屏幕问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"玫瑰金","productbrand":"Apple","productseries":"6s","solvecode":"01","solvename":"换屏幕","warranttypestate":"2","workfee":24}];
//初始化数据
function initProductDatas(){
	//productFaultDetails js文件变量
	var initDatas=[];
	if(typeof(productFaultDetails)=='undefined'){
		alert("读取文件/songweixiuresource/js/productFaultDetailInfo.js失败，获取productFaultDetails");
		initDatas = [{"factorymaterialprice":1024,"faultcode":"0101","faultname":"iphone6sMonitor broke","faulttype":"屏幕问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"玫瑰金","productbrand":"Apple","productseries":"iphone6s","solvecode":"001","solvename":"iphone6s换屏幕","warranttypestate":"2","workfee":24},
          		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"iphone6plusMonitor broke","faulttype":"屏幕问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"玫瑰金","productbrand":"Apple","productseries":"iphone6plus","solvecode":"001","solvename":"iphone6plus换屏幕","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"huwei1Monitor broke","faulttype":"荣耀6屏幕问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"荣耀6玫瑰金","productbrand":"HuaWei","productseries":"honor6","solvecode":"001","solvename":"荣耀6玫瑰金换屏幕","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"huwei2Monitor broke","faulttype":"荣耀7屏幕问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"荣耀7玫瑰金","productbrand":"HuaWei","productseries":"honor7","solvecode":"001","solvename":"荣耀7玫瑰金换屏幕","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"huwei3Monitor broke","faulttype":"荣耀8屏幕问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"荣耀8玫瑰金","productbrand":"HuaWei","productseries":"honor8","solvecode":"001","solvename":"荣耀8玫瑰金换屏幕","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"iphone6sMonitor broke","faulttype":"电池问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"白色","productbrand":"Apple","productseries":"iphone6s","solvecode":"001","solvename":"iphone6s换屏幕2","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"iphone6plusMonitor broke","faulttype":"电池问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"白色","productbrand":"Apple","productseries":"iphone6plus","solvecode":"001","solvename":"iphone6plus换屏幕2","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"huwei1Monitor broke","faulttype":"荣耀6电池问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"荣耀6白色","productbrand":"HuaWei","productseries":"honor6","solvecode":"001","solvename":"荣耀6玫瑰金换屏幕2","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"huwei2Monitor broke","faulttype":"荣耀7电池问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"荣耀7白色","productbrand":"HuaWei","productseries":"honor7","solvecode":"001","solvename":"荣耀7玫瑰金换屏幕2","warranttypestate":"2","workfee":24},
         		{"factorymaterialprice":1024,"faultcode":"0101","faultname":"huwei3Monitor broke","faulttype":"荣耀8电池问题","fdescription":"没钱啊","gradelevel":"1","id":"1","isdisable":1,"marketmaterialprice":34,"modifier":"admin","modifytime":"2015-10-24 15:34:04.0","productColor":"荣耀8白色","productbrand":"HuaWei","productseries":"honor8","solvecode":"001","solvename":"荣耀8玫瑰金换屏幕2","warranttypestate":"2","workfee":24}];//初始化数据

	}else{
		initDatas = productFaultDetails;
	}

	
	var row;
	var strBrands = "";
	var find = false;
	var tmpObj = {};
	var tmpSeries={};
	var tmpColor={};
	var tmpFaultType={};
	var tmpFaultCode={};
	var tmpSolveCode={};
	var value = {};
	for(var i=0; i<initDatas.length; i++){
		find=false;
		row = initDatas[i];
		//手机品牌筛选
		for(var k=0; k<productbrands.length; k++){
			if(productbrands[k]==row.productbrand){
				find = true;
				break;
			}
		}
		if(find==false){
			productbrands.push(row.productbrand);
		}
		//parent,obj,id,objs
		//添加手机型号
		tmpSeries = addRowObj(row.productbrand,row.productseries,SERIES_ID+i,productSeries);
		//添加手机大类
		tmpColor = addRowObj(tmpSeries.id,row.productColor,COLOR_ID+i,productColors);
		//添加手机故障大类
		tmpFaultCode = addRowObj(tmpColor.id,row.faulttype,FAULTTYPE_ID+i,productFaultTypes);
		//添加手机详细故障
		value = {};
		value.productFaultCode = row.faultcode;
		value.productFaultName = row.faultname;
		tmpFaultType = addRowObj(tmpFaultCode.id,value,FAULTCODE_ID+i,productFaultCodes);
		//添加手机解决方案
		value = {};
		value.solveCode = row.solvecode;
		value.solveName = row.solvename;
		tmpSolveCode = addRowObj(tmpFaultType.id,value,SOLVECODE_ID+i,productSolveCodes);

	}
}

//根据父对象检测是否有该子象，如有则直接返回该子对象，没有则添加后返回该子对象
function addRowObj(parent,value,id,objs){
	for(var i=0; i<objs.length; i++){
		if(objs[i].parent==parent && objs[i].value==value){
			return objs[i];
		}
	}
	var tmpObj={};
	tmpObj.parent = parent;
	tmpObj.value= value;
	tmpObj.id=id;
	objs.push(tmpObj);
	return tmpObj;
}

//获取指定父对象的子集
function getChirlds(parent,allChirlds){
	var chirlds = [];
	for(var i=0; i<allChirlds.length; i++){
		if(allChirlds[i].parent==parent){
			chirlds.push(allChirlds[i]);
		}
	}
	return chirlds;
}


function setProductBrandValue(brand){
	$("#id_span_productBrand").text(brand);
	$("#id_div_productBrand_list").attr("style","display:none");
	$("#id_i_productBrandShow").removeClass();
	$("#id_i_productBrandShow").addClass("arrow-r");
	changeProductBrand();
}
function productBrandDivController(objs){
	if(!objs){
		objs = productbrands;
	}
	var html = "";
	var brands="";
	for(var i=0; i<objs.length; i++){
		var obj = objs[i];
		brands = brands+'<li class="list-gzlb"><a class="btn-gzlb" href="javascript:void(0)" onClick="setProductBrandValue(\''+obj+'\');" >'+ obj + '</a></li>';
	}
	html = brands;
	document.getElementById("id_ul_productBrandDetail").innerHTML = html;
	if($("#id_div_productBrand_list").attr("style") != "display:block"){
		$("#id_div_productBrand_list").attr("style","display:block");
	}else{
		$("#id_div_productBrand_list").attr("style","display:none");
	}
	$("#id_i_productBrandShow").removeClass();
	$("#id_i_productBrandShow").addClass("arrow-bx right");
}

function setProductSeriesValue(model,id){
	$("#id_input_id_productSeries").val(id);
	$("#id_span_productSeries").text(model);
	$("#id_div_productSeries_list").attr("style","display:none");
	$("#id_i_productSeriesShow").removeClass();
	$("#id_i_productSeriesShow").addClass("arrow-r");
	changeProductSeries();
}
function productSeriesDivController(objs){
	if(!objs){
		var parent = $("#id_span_productBrand").text();
		if(!parent){
			return;
		}
		objs = getChirlds(parent,productSeries);
	}
	
	var html = "";
	var series="";
	for(var i=0; i<objs.length; i++){
		var obj = objs[i];
		series = series+'<li class="list-gzlb"><a class="btn-gzlb" href="javascript:void(0)" onClick="setProductSeriesValue(\''+obj.value+'\',\''+obj.id+'\');" >'+ obj.value + '</a></li>';
	}
	html = series;
	document.getElementById("id_ul_productSeriesDetail").innerHTML = html;
	if($("#id_div_productSeries_list").attr("style") != "display:block"){
		$("#id_div_productSeries_list").attr("style","display:block");
	}else{
		$("#id_div_productSeries_list").attr("style","display:none");
	}
	$("#id_i_productSeriesShow").removeClass();
	$("#id_i_productSeriesShow").addClass("arrow-bx right");
}

function showIMEItip(){
	//$("#id_div_IMEItip").attr("style","display:block");
	alert("#06#查询或者查看包装盒标签及手机背面");
}

function setProductColorValue(color,id){
	//alert(color);
	$("#id_input_id_productColor").val(id);
	$("#id_span_productColor").text(color);
	$("#id_div_productColor_list").attr("style","display:none");
	$("#id_i_productColorShow").removeClass();
	$("#id_i_productColorShow").addClass("arrow-r");
	changeProductColor();
}
function productColorDivController(objs){
	//var objs = ['白色','黑色','粉红色','紫色'];
	if(!objs){
		var parent = $("#id_input_id_productSeries").val();
		if(!parent){
			return;
		}
		objs = getChirlds(parent,productColors);
	}
	
	var html = "";
	var colors="";
	for(var i=0; i<objs.length; i++){
		var obj = objs[i];
		colors = colors+'<li class="list-gzlb"><a class="btn-gzlb" href="javascript:void(0)" onClick="setProductColorValue(\''+obj.value+'\',\''+obj.id+'\');" >'+ obj.value + '</a></li>';
	}
	html = colors;
	document.getElementById("id_ul_productColorDetail").innerHTML = html;
	if($("#id_div_productColor_list").attr("style") != "display:block"){
		$("#id_div_productColor_list").attr("style","display:block");
	}else{
		$("#id_div_productColor_list").attr("style","display:none");
	}
	$("#id_i_productColorShow").removeClass();
	$("#id_i_productColorShow").addClass("arrow-bx right");
}

function setProductFaultTypeValue(faultName,id){
	//alert(faultName);
	$("#id_input_id_productFaultType").val(id);
	$("#id_span_productFaultType").text(faultName);
	$("#id_div_productFaultType_list").attr("style","display:none");
	$("#id_i_productFaultTypeShow").removeClass();
	$("#id_i_productFaultTypeShow").addClass("arrow-r");
	changeProductFaultType();
}
function productFaultTypeDivController(objs){
	//var objs = ['屏幕故障','电池故障','声音故障','按键故障'];
	if(!objs){
		var parent = $("#id_input_id_productColor").val();
		if(!parent){
			return;
		}
		objs = getChirlds(parent,productFaultTypes);
	}
	var html = "";
	var faultType="";
	for(var i=0; i<objs.length; i++){
		var obj = objs[i];
		faultType = faultType+'<li class="list-gzlb1"><a class="btn-gzlb1" href="javascript:void(0)" onClick="setProductFaultTypeValue(\''+obj.value+'\',\''+obj.id+'\');" >'+ obj.value + '</a></l>';
	}
	html = faultType;
	document.getElementById("id_ul_productFaultType").innerHTML = html;
	if($("#id_div_productFaultType_list").attr("style") != "display:block"){
		$("#id_div_productFaultType_list").attr("style","display:block");
	}else{
		$("#id_div_productFaultType_list").attr("style","display:none");
	}
	$("#id_i_productFaultTypeShow").removeClass();
	$("#id_i_productFaultTypeShow").addClass("arrow-bx right");
}


function setProductFaultNameValue(faultName,faultCode,id){
	$("#id_input_id_productFaultCode").val(id);
	$("#id_span_productFaultName").text(faultName);
	$("#id_input_productFaultCode").val(faultCode);
	$("#id_div_productFaultName_list").attr("style","display:none");
	$("#id_i_productFaultNameShow").removeClass();
	$("#id_i_productFaultNameShow").addClass("arrow-r");
	if(faultName && faultName!=regionProductFaultNameText){
		createProductFaultDescription();
	}
	
}
function productFaultNameDivController(objs){
	//var objs = [{"productFaultName":"屏幕碎裂（显示不正常）","productFaultCode":"001"},{"productFaultName":"显示屏花屏/黑白屏/漏光等","productFaultCode":"002"}];
	if(!objs){
		var parent = $("#id_input_id_productFaultType").val();
		if(!parent){
			return;
		}
		objs = getChirlds(parent,productFaultCodes);
	}
	var html = "";
	for(var i=0; i<objs.length; i++){
		//<li class="list-gzlb sl ml10"> <a class="btn-gzlb1" href="#">屏幕碎裂（显示不正常）</a> </li>
		var obj = objs[i];
		html = html+'<li name="name_li_productFaultName" class="list-gzlb1 sl ml10"> <a class="btn-gzlb1" href="javascript:void(0)" onClick="setProductFaultNameValue(\''+obj.value.productFaultName+"\',\'"+obj.value.productFaultCode+'\',\''+obj.id+'\');" >'+ obj.value.productFaultName + '</a> </li>';
	}
	document.getElementById("id_ul_productFaultName").innerHTML = html;
	if($("#id_div_productFaultName_list").attr("style") != "display:block"){
		$("#id_div_productFaultName_list").attr("style","display:block");
	}else{
		$("#id_div_productFaultName_list").attr("style","display:none");
	}
	$("#id_i_productFaultNameShow").removeClass();
	$("#id_i_productFaultNameShow").addClass("arrow-bx right");
}

function createProductFaultDescription(){
	if($("li[name='name_li_productFaultDescription']").size()>4){
		alert("故障数最多只能添加3个！");
		return;
	}
	var faultType = $("#id_span_productFaultType").text();
	var faultName = $("#id_span_productFaultName").text();
	var faultCode = $("#id_input_productFaultCode").val();
	var desc = "故障:" + faultType + "-" + faultName;
	var productFaultCodeID = $("#id_input_id_productFaultCode").val();
	var faultCodeIDs = $("[name='name_input_id_productFaultCodeID']").get();
	for(var i=0; i<faultCodeIDs.length; i++){
	   var obj = faultCodeIDs[i];
	   if(productFaultCodeID == $(obj).val()){
	  		return;
	   }
	}
	
	
    //{'type':'2','amount':'1000','createTime':'2015/8/24 11:34:31','blanceAmount':'0'}];
    var target = $("li[name='name_li_productFaultDescription'][style='display:none']").get(0);
    var objClone = $(target).clone(true);
    $(objClone).find("span[name='name_span_productFaultDescription']").text(desc);
    $(objClone).find("input[name='name_input_productFaultType']").val(faultType);
    $(objClone).find("input[name='name_input_productFaultName']").val(faultName);
    $(objClone).find("input[name='name_input_productFaultCode']").val(faultCode);
    $(objClone).find("input[name='name_input_id_productFaultCodeID']").val(productFaultCodeID);
    $(objClone).attr('style','display:block');
    $(objClone).appendTo("#id_ul_productFaultDescription"); 
    
    //维修方案
    
    $(objClone).find("span[name='name_span_productFaultDescription']").text(desc);
    $(objClone).find("input[name='name_input_productFaultCode']").val(faultCode);
    createProductFaultSolve(objClone);
}

function createProductFaultSolve(parent,objs){
	//objs = [{"solveCode":"001&更换显示屏幕总成","solveName":"更换显示屏幕总成","solvePrice":"1200"},{"solveCode":"002&维修显示屏幕总成","solveName":"维修显示屏幕总成","solvePrice":"900"}];
	if(!objs){
		var parentID = $("#id_input_id_productFaultCode").val();
		if(!parentID){
			return;
		}
		objs = getChirlds(parentID,productSolveCodes);
	}
	for(var i=0; i<objs.length; i++){
    	var obj = objs[i];
    	var target = $(parent).find("li[name='name_li_productFaultSolve'][style='display:none!important']").get(0);
        var objClone = $(target).clone(true);
        $(objClone).find("label[name='name_label_productFaultSolveName']").text(obj.value.solveName);
        $(objClone).find("input[name='name_input_productFaultSolveCode']").val(obj.value.solveCode+"&"+obj.value.solveName);
        $(objClone).attr('style','display:block');
        $(target).parents("ul[name='name_ul_productFaultSolve']").append(objClone); 
    }
}

//删除故障描述信息
function removeProductFaultDescription(_this){
	$(_this).parents("li[name='name_li_productFaultDescription']").remove();
}

//更改手机品牌时的清理方法
function changeProductBrand(){
	$('li[name="name_li_productBrand"]').remove();
	changeProductSeries();
	setProductSeriesValue(regionProductSeriesText);
}
//更改手机型号时的清理方法
function changeProductSeries(){
	$('li[name="name_li_productColor"]').remove();
	changeProductColor();
	setProductColorValue(regionProductColorText);
}

//更改颜色时的清理方法
function changeProductColor(){
	$('li[name="name_li_productFaultType"]').remove();
	changeProductFaultType();
	clearnProductFaultDescription();
	setProductFaultTypeValue(regionProductFaultTypeText);
}

//更改故障类别时的清理方法
function changeProductFaultType(){
	$('li[name="name_li_productFaultName"]').remove();
	setProductFaultNameValue(regionProductFaultNameText);
}

//更改故障详细时的清理方法
function changeProductFaultName(){

}

//清除故障描述
function clearnProductFaultDescription(){
	if($("li[name='name_li_productFaultDescription'][style='display:block']").size()>0){
		$("li[name='name_li_productFaultDescription'][style='display:block']").remove();
	}
} 


function productBuyTimeClick(_this, buyDay){
	$("[name='name_div_productModify']").attr("style","display:block");
	$("[name='name_div_productReturn']").attr("style","display:block");
	$("[name='name_div_productChange']").attr("style","display:block");
	
	if(buyDay==15){
		$("[name='name_div_productReturn']").attr("style","display:none");
	}else if(buyDay>15){
		$("[name='name_div_productReturn']").attr("style","display:none");
		$("[name='name_div_productChange']").attr("style","display:none");	
	}
}

function repair1NextClick(){
	var faults = $("li[name='name_li_productFaultDescription'][style='display:block']").get();
	if(faults==0){
		alert("请填写最少一个故障描述！最多能填写三个，");
		return;
	}
	//检测用户填写的参数
	var urlParams = "";
	var productBrand = $("#id_span_productBrand").text();
	var imel =  $("#id_input_IMEI").val();
	var productSeries = $("#id_span_productSeries").text();
	var productColor = $("#id_span_productColor").text();
	var buyTime = $("#id_input_buyTime").val();
	var productModifyType = $("#id_productModifyType").val();
	var timeOfAppointment = $("#id_input_timeOfAppointment").val();

	var obj={};
	obj.productbrand = productBrand;
	obj.imei = imel;
	obj.productseries = productSeries;
	obj.productcolor = productColor;
	obj.buytime = buyTime;
	obj.warranttype = productModifyType;
	obj.communiticationtime = timeOfAppointment;
//
    for(var i=0; i<faults.length; i++){
    	var target = faults[i];
    	var productFaultType = $(target).find("input[name='name_input_productFaultType']").val();
    	var productFaultName = $(target).find("input[name='name_input_productFaultName']").val();
    	var productFaultCode = $(target).find("input[name='name_input_productFaultCode']").val();
    	var productFaultDescription = $(target).find("textarea[name='name_textarea_productFaultCustomerDescription']").val();
    	var productSolveValue = $(target).find("input[name='name_input_select_productFaultSolve']").val();
    	if(!productSolveValue){
    		alert("故障"+productFaultName+"未选择维修方案，请选择！");
    		return;
    	}
    	obj["customerbigfaultcode"+(i+1)]=productFaultType;
    	obj["customerfaultdesc"+(i+1)]=productFaultName;
    	obj["customersmallfaultcode"+(i+1)]=productFaultCode;
    	obj["productFaultDescription"+(i+1)]=productFaultDescription;
    	var solveIndex = productSolveValue.indexOf("&");
    	obj["maintenancesolution"+(i+1)]=productSolveValue.substr(0,solveIndex);
    	obj["maintenancesolution1name"+(i+1)]=productSolveValue.substr(solveIndex+1);
    }
    $.ajax({
		type : "POST",
		dataType : "json",
		data : obj,
		url : "/service/songweixiu/sfWxOrder/saveOrderInfoToSession.action",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		success : function(json) {
		    if(json.result=="success"){
		        if(buyTime==4){
		        	var params = "";
		        	var solves = json.solves;
		        	for(var i=0; i<solves.length;i++){
		        		if(i!=0){
		        			params = "&";
		        		}
		        		params += "&solveName"+i+"="+solves[i].solvename+"&price"+i+"="+solves[i].price;
		        	}
		        	if(params==""){
		        		window.location.href=encodeURI("repair3.html");
		        	}else{
		        		window.location.href=encodeURI("repair2.html?"+params.substr(1));
		        	}
		        }else{
		        	window.location.href=encodeURI("repair3.html");
		        }
		    }else{
		    	if(json.msg){
		    		alert(json.msg);
		    	}else{
		    		alert("订单保存失败，服务器异常，请稍后重试！");
		    	}
		    	
		    }
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
		}
	});
}