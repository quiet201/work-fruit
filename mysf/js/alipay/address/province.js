/**
 * 	
 * forward:过来获取地址参数的页面
 * addrName：寄地市名字
 * addrCode：寄地市编码
 * addrCountyName ：寄地县/区名字
 * addrCountyCode ：寄地县/区编码
 * type:区分是原寄地3，还是目的的4
 * gatChild:-1:表示屏蔽GAT，国际地区查询 -2：表示屏蔽国际地区查询
 * 
 * 返回参数：
 *  proName表示省名字 港澳台，国际件不会传次参数
 *  proCode表示省编码 港澳台，国际件不会传次参数
 * 	addrName 对应的value值会作为KEY返回键值对
 * 	addrCode 对应的value值会作为KEY返回键值对
 * 	addrCountyName	对应的value值会作为KEY返回键值对 港澳台，国际件不会传次参数
 *  addrCountyCode	对应的value值会作为KEY返回键值对 港澳台，国际件不会传次参数
 *  type:地址类型：1：表示国际件 2：表示港澳台 地址栏不带此参数：表示国内件
 */
$(document).ready(function() {
	init();// 初始化页面参数
	// 添加监听
	listenEvent();
	// 获取提交数据
	// subData();
 
});
// 初始化页面参数
function init() {
	var callbackUrl = getUrlValueByKey("forward");
	var addrName = getUrlValueByKey("addrName");// 需要返回给调用页面的地名
	var addrCode = getUrlValueByKey("addrCode");// 需要返回给调用页面该地址的编码
	// addrCountyName=dcountyName&addrCountyCode=dcountyCode
	var countyName = getUrlValueByKey("addrCountyName");// 需要返回给调用页面该地址的编码
	var countyCode = getUrlValueByKey("addrCountyCode");// 需要返回给调用页面该地址的编码
	var interType=getUrlValueByKey("type");
	var gatChild=getUrlValueByKey("gatChild");
	
	if ($.trim(callbackUrl) != "") {//表示刚被调用页面进入值
		// 如果是地址栏有参数过来，需要去掉参数
		if (callbackUrl.indexOf("?") != -1) {
			callbackUrl = callbackUrl.substring(0, callbackUrl.indexOf("?"));
		}
		setCookie("SET_PAGE_URL", callbackUrl);
		setCookie("addrName", addrName);
		setCookie("addrCode", addrCode);
		setCookie("addrCountyName", countyName);
		setCookie("addrCountyCode", countyCode);
		setCookie("interType", interType);
		setCookie("gatChild", gatChild);
		//如果存在，这需要隐藏GAT和国际查询
		if(gatChild=="-1"){
			$("#gatAddrInfor").hide();
			$("#countryAddrInfor").hide();
		}
		//只屏蔽国际
		if(gatChild=="-2"){
			$("#countryAddrInfor").hide();
		}
	}else if(interType){//选择了城市后，退回省情况
		console.info("退回城市获取省份");
	} else {//异常情况
		console.info("获取地址信息回调页面出错");
		return;
	}
	//是否要屏蔽GAT，国际地址
	if(!gatChild){
		gatChildVisiable();
	}
	getHeadAddressManage();
	
	getCommonImg("11010","N","1");
};
function gatChildVisiable(){
	var gatChild=getCookie("gatChild");
	if($.trim(gatChild)=="-1"){
		$("#gatAddrInfor").hide();
		$("#countryAddrInfor").hide();
	}
};
// 添加监听
function listenEvent() {
	setTabChange();
};
/*
 * //提交数据 function subData() {
 *  };
 */
// 设置TAB切换
function setTabChange() {
	$("[data-tabs='tabs']").each(
			function() {
				var parent = $(this);
				parent.find("li").each(
						function(i) {
							$(this).click(
									function() {
										$(this).siblings("li").removeClass(
												"cur").end().addClass("cur");
										parent.siblings(".ui-tabs-content")
												.hide();
										parent.siblings(".ui-tabs-content").eq(
												i).show();
									});
						});
			});
};
// 创建节点
function createNode(hotList,provinceList,countryList, gatList) {
	var hostBuff = "";
	var proBuff = "";
	var specialProvinceArray=["内蒙古","黑龙江"];
	$.each(hotList, function(index, data) {
		var temp = data.parentId;
		temp = temp.split("/");
		var hotProName = temp[1];
		var hotProCode = temp[0];
		hostBuff = hostBuff + "<li><a href='/page/alipay/address/county.html?city="
				+ data.id + "," + data.name + "&pro=" + hotProCode + ","
				+ hotProName + "'>" + data.name + "</a></li>";
	});
	$.each(provinceList, function(index, data) {
		var name=data.distCnName;
		//要对内蒙古，黑龙江处理
		if(name.indexOf(specialProvinceArray[0])!=-1 || name.indexOf(specialProvinceArray[1])!=-1){
			name=name.substring(0,3);
		}else {
			name=name.substring(0,2);
		}
		proBuff = proBuff + "<li><a href='/page/alipay/address/city.html?pro=" +data.distCityCode
				+ "," + name + ","+ data.distCode+"'>" + name + "</a></li>";
	});
	$("#hotList").empty().html(hostBuff);
	$("#provinceList").empty().html(proBuff);
	//显示热门城市和省份信息显示 ，在加载国际和港澳台信息
	var gatBf="";
	var countryBf="";
	$.each(gatList, function(index, data) {
		/*gatBf = gatBf + "<li><a href='/alipay/range/city.html?pro=" +data.distCityCode
		+ "," + data.distCnName + ","+ data.distCode+"'>" + data.distCnName + "</a></li>";*/
		gatBf = gatBf + "<li><a href='#' onClick=interAddr('"+data.distCityCode+"','"+data.distCnName+"','"+
		data.distCode+"',2) >" +data.distCnName + "</a></li>";
	});
	/*$.each(countryList, function(index, data) {  //如果以后有数据 ，国际信息可以直接获取到市，区，可以用此来处理
		countryBf = countryBf + "<li><a href='#' onClick=interAddr('"+data.distCityCode+"','"+data.distCnName+"','"+
		data.distCode+"',1) >" +data.distCnName + "</a></li>";
		
		//countryBf = countryBf + "<li><a href='/alipay/range/city.html?pro=" +data.distCityCode
		//+ "," + data.distCnName + ","+ data.distCode+"'>" + data.distCnName + "</a></li>";
	});*/
	countryList=interCountryParams();
	$.each(countryList, function(index, data) {
		countryBf = countryBf + "<li><a href='#' onClick=interAddr('"+data.id+"','"+data.name+"','',1) >" +data.name + "</a></li>";
	});
	$("#gatAddr").html(gatBf);
	$("#countryAddr").html(countryBf);
};
// 获取热门城市，省、直辖市
function getHeadAddressManage() {
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/address/newAddr/getAddressManage",
		success : function(json) {
			// 排序热点城市
			if ($.trim(json) != "" && json.state=="Y") {
				var countryList=json.countryList;//国家
				var gatList=json.gatList;// 港澳台
				var hotCityList=json.hotCityList;//热门城市
				var provinceList=json.provinceList;//省信息
				createNode(hotCityList,provinceList,countryList, gatList);
			};
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器连接失败");
		}
	});
};


 //直接跳会调转页面
function interAddr(code,name,distCode,type){
	var url=getCookie("SET_PAGE_URL");
	var addrName=getCookie("addrName");
	var addrCode=getCookie("addrCode");
	var addrCountyName=getCookie("addrCountyName");
	var addrCountyCode= getCookie("addrCountyCode");
	if(distCode){
		location.href=url+"?"+addrName+"="+name+"&"+addrCode+"="+code+"&"+addrCountyName+"="+name+
		"&"+addrCountyCode+"="+code+"&type="+type+"&distCode="+distCode;
	}else{
		location.href=url+"?"+addrName+"="+name+"&"+addrCode+"="+code+"&"+addrCountyName+"="+name+
		"&"+addrCountyCode+"="+code+"&type="+type;
	}
};

function interCountryParams(){
	 var temp=[];//印度尼西亚, 蒙古   ,澳大利亚
	temp[0] ={abb:"bk",id:"BKK",name:"泰国",parentId:"BKK/泰国",spell:"bkk"};
	temp[1] ={abb:"us",id:"SFO",name:"美国",parentId:"SFO/美国",spell:"usa"};
	temp[2] ={abb:"sn",id:"SGN",name:"越南",parentId:"SGN/越南",spell:"n"};
	temp[3] ={abb:"jp",id:"TYO",name:"日本",parentId:"TYO/日本",spell:"tyo"};
	temp[4] ={abb:"in",id:"ICN",name:"韩国",parentId:"ICN/韩国",spell:"icn"};
	temp[5] ={abb:"sn",id:"SIN",name:"新加坡",parentId:"SIN/新加坡",spell:"sin"};
	temp[6] ={abb:"kl",id:"KUL",name:"马来西亚",parentId:"KUL/马来西亚",spell:"kul"};
	return temp;
};