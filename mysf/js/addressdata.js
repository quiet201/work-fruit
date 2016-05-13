/**
 * 省市区地址控件[大陆]
 */
//省市区空间主体
var PCT = function(){
	this.p = PCT.temppr;
	this.c = PCT.tempct;
	this.t = PCT.temptw;
	PCT.temppr = {};
	PCT.tempct = {};
	PCT.temptw = {};
};
//省市区临时缓存区
PCT.temppr = {};//选中省
PCT.tempct = {};//选中市，区
PCT.temptw = {};//选中县
//记录回调方法
PCT.fn = null;
PCT.div = null;
PCT.notw = null;
PCT.enter = function(div,fn,notw){
	//设置回调和主页面
	PCT.div = div;//隐藏控件显示位置
	PCT.fn = fn;//回调函数
	PCT.notw = notw;//
	//记录返回节点
	PCT.backId = new Array();
	//设置返回页面
	PCT.backId.push(div);
	//显示hot页面
	$("#"+div).hide("slow");
	//添加控件
	//设置头部
	var domstr="<header><h1>选择所在地区</h1></header><!-- header e -->"+
	"<section class='ui-region'><ul class='ui-tabs-menu' data-tabs='tabs'>"+
	"<li class='cur'>中国大陆</li><li>港澳台</li><li>海外</li></ul>";
	
	
	//结尾
	domstr=domstr+"</section>";
	
	
	
	//设置区域 eg;国内，港澳台，国外
	 domstr = '<!-- 热门城市 -->'+
	'<div id="hot" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">选择城市</h2>'+
		'</header>'+
		'<section class="mainContent">'+	
		    '<h2 class="title-style1">热门城市<small></small></h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="hotCityData">'+
		    '</ul>'+
		    '</section>'+
		    '<section class="by-prov">'+
		    '<ul class="city-list">'+
		    	'<li><a href="javascript:void(0)" onclick="hotTopr()">选择省份</a></li>'+            
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>'+
	'<!-- 选择省 -->'+
	'<div id="pr" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">选择省份</h2>'+
		'</header>'+
		'<div class="wrapper">'+	
	        '<h2 class="title-style1">选择省份</h2>'+
	        '<section class="common-city">'+
	        '<ul class="city-list" id="provinceData">'+
	        '</ul>'+
	        '</section>'+
		'</div>'+
	'</div>'+
	'<!-- 选择市 -->'+
	'<div id="ct" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">选择城市</h2>'+
		'</header>'+
		'<section class="wrapper">'+	
		    '<h2 class="title-style1">选择城市</h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="cityData">'+
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>'+
	'<!-- 选择地区 -->'+
	'<div id="tw" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">选择区/县</h2>'+
		'</header>'+
		'<section class="wrapper">'+	
			'<h2 class="title-style1">选择区/县</h2>'+
			'<section class="common-city">'+
			'<ul class="city-list" id="areaData">'+
			'</ul>'+
			'</section>'+
		'</section>'+
	'</div>';
	//附加省市区div
	$(".toDelete").remove();//删除弹出的隐藏选择区域
	$("#"+div).after(domstr);
	//设置热点城市和省
	div_display("hotCityData",PCT.hotCityData);
	div_display("provinceData",PCT.provinceData);
	//显示热点城市
	$("#hot").show("slow");
};

/**
 * hot页面点击选择省
 */
function hotTopr(){
	//设置返回页面
	PCT.backId.push("hot");
	//显示选择省页面
	$(".topPanel").hide("slow");
	$("#pr").show("slow");
}

/**
 * hot页面点击选择热点区，县
 */
function hotTotw(name){
	//清空区的数据
	$("#areaData").empty();
	//设置返回页面
	PCT.backId.push("hot");
	//显示选择区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定省市
	$(PCT.hotCityData).each(function(){
		if(this.name == name){
			var strArray = this.parentId.split("/");
			PCT.temppr = {name:strArray[1],id:strArray[0]};
			PCT.tempct = {name:this.name,id:this.id};
		}
	});
	//若不需要区直接返回
	if(PCT.notw+"" == "0"){
		return callbackInfo();
	}
	//根据点击的市的id查询区,构造选择区页面  TODO
	var parentId = PCT.tempct.id;
	var parentName = PCT.temppr.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId),
			parentName:encodeURI(parentName)
		},
		url : "/service/address/data/area",
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
			PCT.areaData = temp;
			div_display("areaData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
}

/**
 * 选择省获取该省下面的市
 */
function prToct(name){
	//清空市的数据
	$("#cityData").empty();
	//设置返回页面
	PCT.backId.push("pr");
	//显示选择区市
	$(".topPanel").hide("slow");
	$("#ct").show("slow");
	//确定省
	$(PCT.provinceData).each(function(){
		if(this.name == name){
			PCT.temppr = {name:this.name,id:this.id};
		}
	});
	//根据点击的省的id查询区,构造选择市页面
	var parentId = PCT.temppr.id;
	var parentName = PCT.temppr.name;
		$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId),
			parentName:encodeURI(parentName)
		},
		url : "/service/address/data/city",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			var temp = json.cityData;
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
			PCT.cityData = temp;
			div_display("cityData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
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
	PCT.backId.push("ct");
	//显示选择区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定市
	$(PCT.cityData).each(function(){
		if(this.name == name){
			PCT.tempct = {name:this.name,id:this.id};
		}
	});
	//若不需要区直接返回
	if(PCT.notw+"" != "0"){
		return callbackInfo();
	}
	//根据点击的市的id查询区,构造选择区页面
	var parentId = PCT.tempct.id;
	var parentName = PCT.tempct.name;
	
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId),
			parentName: encodeURI(parentName)
		},
		url : "/service/address/data/area",
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
			PCT.areaData = temp;
			div_display("areaData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
}

/**
 * 在选择区的页面点击一个区
 */
function twToroot(name){
	//确定区
	$(PCT.areaData).each(function(){
		if(this.name == name){
			PCT.temptw = {name:this.name,id:this.id};
		}
	});
	//返回页面清空
	callbackInfo();
}

/**
 * 将省市区数据回调
 */
function callbackInfo(){
	var pct = new PCT();
	PCT.backId = new Array();
	$(".toDelete").remove();
	$("#"+PCT.div).show("slow");
	PCT.fn.call(this,pct);
}

/**
 * 点击返回按钮
 */
function callbackClick(){
	$(".topPanel").hide("slow");
	var div_id = PCT.backId.pop();
	$("#"+div_id).show("slow");
	if(PCT.backId.length == 0){
		$(".toDelete").remove();
	}
}

/**
 * 根据不同的id[省市区],来设置设置其中的类容.
 */
function div_display(div_id,jsonList){
	var ms = "";
	if(div_id == "hotCityData"){
		ms = '"hotTotw(\'';
	}
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
function createNode(){
	hotList
	provinceList
};
/**
 *初始化检查是否绑定,初始化热点城市和省 
 */
$(document).ready(function(){
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/address/data/province",
		success: function(json){
			//排序热点城市
			var temp = json.hotCityData;
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
			PCT.hotCityData = temp;
			//排序
			var temp = json.provinceData;
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
			PCT.provinceData = temp;
			
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
		}
	});
});