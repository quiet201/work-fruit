/**
 * 省市区地址控件[港澳台]
 */
//省市区空间主体
var PCT_GAT = function(){
	this.p = PCT_GAT.temppr;
	this.c = PCT_GAT.tempct;
	this.t = PCT_GAT.temptw;
	PCT_GAT.temppr = {};
	PCT_GAT.tempct = {};
	PCT_GAT.temptw = {};
};
//省市区临时缓存区
PCT_GAT.temppr = {};
PCT_GAT.tempct = {};
PCT_GAT.temptw = {};
//记录回调方法
PCT_GAT.fn = null;
PCT_GAT.div = null;
PCT_GAT.notw = null;
//初始化页面入口.
PCT_GAT.enter = function(div,fn,notw){
	//设置回调和主页面
	PCT_GAT.div = div;
	PCT_GAT.fn = fn;
	PCT_GAT.notw = notw;
	//记录返回节点
	PCT_GAT.backId = new Array();
	//设置返回页面
	PCT_GAT.backId.push(div);
	//显示hot页面
	$("#"+div).hide("slow");
	//添加控件
	var domstr = '<!-- 選擇地區 -->'+
	'<div id="pr" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇地區</h2>'+
		'</header>'+
		'<div class="wrapper">'+	
	        '<h2 class="title-style1">選擇地區</h2>'+
	        '<section class="common-city">'+
	        '<ul class="city-list" id="provinceData">'+
	        '</ul>'+
	        '</section>'+
		'</div>'+
	'</div>'+
	'<!-- 選擇城區 -->'+
	'<div id="ct" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇城區</h2>'+
		'</header>'+
		'<section class="wrapper">'+	
		    '<h2 class="title-style1">選擇城區</h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="cityData">'+
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>'+
	'<!-- 選擇區-->'+
	'<div id="tw" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇區</h2>'+
		'</header>'+
		'<section class="wrapper">'+	
			'<h2 class="title-style1">選擇區</h2>'+
			'<section class="common-city">'+
			'<ul class="city-list" id="areaData">'+
			'</ul>'+
			'</section>'+
		'</section>'+
	'</div>';
	//附加省市区div
	$(".toDelete").remove();
	$("#"+div).after(domstr);
	//设置省
	div_display("provinceData",PCT_GAT.provinceData);
	//显示省
	$("#pr").show("slow");
};

/**
 * 选择省页面点击一个省
 */
function prToct(name){
	//清空市的数据
	$("#cityData").empty();
	//设置返回页面
	PCT_GAT.backId.push("pr");
	//显示选择区市
	$(".topPanel").hide("slow");
	$("#ct").show("slow");
	//确定省
	$(PCT_GAT.provinceData).each(function(){
		if(this.name == name){
			PCT_GAT.temppr = this;
		}
	});
	//根据点击的省的id查询区,构造选择市页面
	var parentId = PCT_GAT.temppr.id;
	var parentCode = PCT_GAT.temppr.code;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
		},
		url : "/service/address/data/city/"+parentCode+"/tc",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			var temp = json.cityData;
			for(var i=0; i<temp.length; i++){
				temp[i].code = parentCode;
			}
			PCT_GAT.cityData = temp;
			div_display("cityData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(commonI18n.get("I_ERROR_INFO_02"));
		}
	});
}

/**
 * 选择城市页面点击一个城市
 */
function ctTotw(name){
	//清空区的数据
	$("#areaData").empty();
	//设置返回页面
	PCT_GAT.backId.push("ct");
	//显示选择区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定市
	$(PCT_GAT.cityData).each(function(){
		if(this.name == name){
			PCT_GAT.tempct = this;
		}
	});
	//若不需要区直接返回
	if(PCT_GAT.notw+"" == "0"){
		return callbackInfo();
	}
	//根据点击的市的id查询区,构造选择区页面
	var parentId = PCT_GAT.tempct.id+"/"+PCT_GAT.tempct.name;
	var parentCode = PCT_GAT.tempct.code;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
		},
		url : "/service/address/data/area/"+parentCode+"/tc",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			var temp = json.areaData;
			for(var i=0; i<temp.length-1; i++){
				for(var j=i+1; j<temp.length; j++){
					var n = "";
					if(temp[i].abb>temp[j].abb){
						n = temp[j];
						temp[j] = temp[i];
						temp[i] = n;
					}
				}
			}
			PCT_GAT.areaData = temp;
			div_display("areaData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(commonI18n.get("I_ERROR_INFO_02"));
		}
	});
}

/**
 * 在选择区的页面点击一个区
 */
function twToroot(name){
	//确定区
	$(PCT_GAT.areaData).each(function(){
		if(this.name == name){
			PCT_GAT.temptw = {name:this.name,id:this.id};
		}
	});
	//返回页面清空
	callbackInfo();
}

/**
 * 将省市区数据回调
 */
function callbackInfo(){
	var pct = new PCT_GAT();
	PCT_GAT.backId = new Array();
	$(".toDelete").remove();
	$("#"+PCT_GAT.div).show("slow");
	PCT_GAT.fn.call(this,pct);
}

/**
 * 点击返回按钮
 */
function callbackClick(){
	$(".topPanel").hide("slow");
	var div_id = PCT_GAT.backId.pop();
	$("#"+div_id).show("slow");
	if(PCT_GAT.backId.length == 0){
		$(".toDelete").remove();
	}
}

/**
 * 根据不同的id[省市区],来设置设置其中的类容.
 */
function div_display(div_id,jsonList){
	var ms = "";
	if(div_id == "provinceData"){
		ms = '"prToct(\'';
	}
	if(div_id == "cityData"){
		ms = '"ctTotw(\'';
	}
	if(div_id == "areaData"){
		ms = '"twToroot(\'';
	}
	var strHtml = '';
	$(jsonList).each(function(){
		strHtml = strHtml + '<li onclick='+ms+this.name+'\')" ><a href="javascript:void(0)">'+this.name+'</a></li>';
	});
	$("#"+div_id).html(strHtml);
}

/**
 *初始化检查是否绑定,初始化热点城市和省 
 */
$(document).ready(function(){
	PCT_GAT.provinceData = new Array();
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/address/data/province/HKM/tc",
		success: function(json){
			var temp = json.provinceData;
			for(var i=0; i<temp.length; i++){
				temp[i].code = "HKM";
				PCT_GAT.provinceData.push(temp[i]);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(commonI18n.get("I_ERROR_INFO_02"));
		}
	});
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/address/data/province/TW/tc",
		success: function(json){
			var temp = json.provinceData;
			for(var i=0; i<temp.length; i++){
				temp[i].code = "TW";
				PCT_GAT.provinceData.push(temp[i]);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(commonI18n.get("I_ERROR_INFO_02"));
		}
	});
});