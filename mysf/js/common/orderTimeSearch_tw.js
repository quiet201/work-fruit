/**
 * 省市区地址控件[港澳台]
 */
//省市区空间主体
var GAT = function(){
	this.p = GAT.temppr;
	this.c = GAT.temGAT;
	this.t = GAT.temptw;
	GAT.temppr = {};
	GAT.temGAT = {};
	GAT.temptw = {};
};
//省市区临时缓存区
GAT.temppr = {};
GAT.temGAT = {};
GAT.temptw = {};
//记录回调方法
GAT.fn = null;
GAT.div = null;
GAT.notw = null;
GAT.enter = function(div,fn,notw){
	//设置回调和主页面
	GAT.div = div;
	GAT.fn = fn;
	GAT.notw = notw;
	//记录返回节点
	GAT.backId = new Array();
	//设置返回页面
	GAT.backId.push(div);
	//显示hot页面
	$("#"+div).hide("slow");
	//添加控件
	var domstr = '<!-- 热门城市 -->'+
	'<div id="hot" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇城市</h2>'+
		'</header>'+
		'<section class="mainContent">'+	
		    '<h2 class="title-style1">熱門城市<small></small></h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="hotCityData">'+
		    '</ul>'+
		    '</section>'+
		    '<section class="by-prov">'+
		    '<ul class="city-list">'+
		    	'<li><a href="javascript:void(0)" onclick="hotTopr()">中國大陸</a></li>'+            
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>'+
	'<!-- 選擇省 -->'+
	'<div id="pr" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇省份</h2>'+
		'</header>'+
		'<div class="wrapper">'+	
	        '<h2 class="title-style1">選擇省份</h2>'+
	        '<section class="common-city">'+
	        '<ul class="city-list" id="provinceData">'+
	        '</ul>'+
	        '</section>'+
		'</div>'+
	'</div>'+
	'<!-- 選擇市 -->'+
	'<div id="ct" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇城市</h2>'+
		'</header>'+
		'<section class="wrapper">'+	
		    '<h2 class="title-style1">選擇城市</h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="cityData">'+
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>'+
	'<!-- 選擇地区 -->'+
	'<div id="tw" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClick()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇區/縣</h2>'+
		'</header>'+
		'<section class="wrapper">'+	
			'<h2 class="title-style1">選擇區/縣</h2>'+
			'<section class="common-city">'+
			'<ul class="city-list" id="areaData">'+
			'</ul>'+
			'</section>'+
		'</section>'+
	'</div>';
	//附加省市区div
	$(".toDelete").remove();
	$("#"+div).after(domstr);
	//设置热点城市和省
	div_display("hotCityData",GAT.hotCityData);
	div_display("provinceData",GAT.provinceData);
	//显示热点城市
	$("#hot").show("slow");
};

/**
 * hot页面点击選擇省
 */
function hotTopr(){
	//设置返回页面
	GAT.backId.push("hot");
	//显示選擇省页面
	$(".topPanel").hide("slow");
	$("#pr").show("slow");
}

/**
 * hot页面点击選擇热点城市
 */
function hotTotw(name){
	//清空区的数据
	$("#areaData").empty();
	//设置返回页面
	GAT.backId.push("hot");
	//显示選擇区页面
	$(".topPanel").hide("slow");	
	//确定省市
	$(GAT.hotCityData).each(function(){
		if(this.name == name){
			var strArray = this.parentId.split("/");
			GAT.temppr = {name:strArray[1],id:strArray[0]};
			GAT.temGAT = {name:this.name,id:this.id};
		}
	});
	
	if(name!="台灣"){
		return callbackInfo();
	}else{
		$("#ct").show("slow");
	}
	//根据点击的市的id查询区,构造選擇区页面
	var parentId = GAT.temGAT.id+"/"+GAT.temGAT.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
		},
		url : "/service/address/data/city/TW/tc",
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
			GAT.cityData = temp;
			div_display("cityData",temp);		
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
}

/**
 * 選擇省页面点击一个省
 */
function prToct(name){
	//清空市的数据
	$("#cityData").empty();
	//设置返回页面
	GAT.backId.push("pr");
	//显示選擇区市
	$(".topPanel").hide("slow");
	$("#ct").show("slow");
	//确定省
	$(GAT.provinceData).each(function(){
		if(this.name == name){
			GAT.temppr = {name:this.name,id:this.id};
		}
	});
	//根据点击的省的id查询区,构造選擇市页面
	var parentId = GAT.temppr.id+"/"+GAT.temppr.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
		},
		url : "/service/address/data/city/CN/tc",
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
			GAT.cityData = temp;
			div_display("cityData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
}

/**
 * 選擇城市页面点击一个城市
 */
function ctTotw(name){
	//清空区的数据
	$("#areaData").empty();
	//设置返回页面
	GAT.backId.push("ct");
	//显示選擇区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定市
	$(GAT.cityData).each(function(){
		if(this.name == name){
			GAT.temGAT = {name:this.name,id:this.id};
		}
	});
	//若不需要区直接返回
	if(GAT.notw+"" == "0"){
		return callbackInfo();
	}
	//根据点击的市的id查询区,构造選擇区页面
	var parentId = GAT.temGAT.id+"/"+GAT.temGAT.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
		},
		url : "/service/address/data/area/CN/tc",
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
			GAT.areaData = temp;
			div_display("areaData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
}

/**
 * 在選擇区的页面点击一个区
 */
function twToroot(name){
	//确定区
	$(GAT.areaData).each(function(){
		if(this.name == name){
			GAT.temptw = {name:this.name,id:this.id};
		}
	});
	//返回页面清空
	callbackInfo();
}

/**
 * 将省市区数据回调
 */
function callbackInfo(){
	var gat = new GAT();
	GAT.backId = new Array();
	$(".toDelete").remove();
	$("#"+GAT.div).show("slow");
	GAT.fn.call(this,gat);
}

/**
 * 点击返回按钮
 */
function callbackClick(){
	$(".topPanel").hide("slow");
	var div_id = GAT.backId.pop();
	$("#"+div_id).show("slow");
	if(GAT.backId.length == 0){
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

/**
 *初始化检查是否绑定,初始化热点城市和省 
 */
$(document).ready(function(){
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/address/data/province/CN/tc",
		success: function(json){
			//排序热点城市			
			var temp = new Array();
			temp[0] ={abb:"HK",id:"852",name:"香港",parentId:"852/香港",spell:"hongkong"};
			temp[1] ={abb:"MC",id:"853",name:"澳門",parentId:"853/澳門",spell:"macao"};
			temp[2] ={abb:"TW",id:"886",name:"台灣",parentId:"886/台灣",spell:"taiwan"};
			GAT.hotCityData = temp;
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
			GAT.provinceData = temp;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
});

/**
 * 原地址
 */
function selectGatSrcAddr(){	
	GAT.enter("root",function(gat){
		$("#originalAddress").val(gat.c.name);
		$("#hidOri").val(gat.c.id);
	} ,0);
}
/**
 * 目的地
 */
function selectGatDestAddr(){
	GAT.enter("root",function(gat){
		$("#destination").val(gat.c.name);
		$("#hidDes").val(gat.c.id);
	} ,0);
}
