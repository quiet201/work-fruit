/**
 * 省市区地址控件[港澳台]
 */
var GAT = function(){
	this.p = GAT.temppr;
	this.c = GAT.tempct;
	this.t = GAT.temptw;
	GAT.temppr = {};
	GAT.tempct = {};
	GAT.temptw = {};
};
//省市区临时缓存区
GAT.temppr = {};
GAT.tempct = {};
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
	var domstr = '<!-- 港澳台 -->'+
	'<div id="hot" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClickG()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇港澳台</h2>'+
		'</header>'+
		'<section class="mainContent">'+	
		    '<h2 class="title-style1">港澳台<small></small></h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="hotCityData">'+
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>'+
	'<!-- 選擇省 -->'+
	'<div id="pr" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClickG()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇省份</h2>'+
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
			'<a onclick="callbackClickG()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇城市</h2>'+
		'</header>'+
		'<section class="wrapper">'+	
		    '<h2 class="title-style1">選擇城市</h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="cityData">'+
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>';
	//附加省市区div
	$(".toDelete").remove();
	$("#"+div).after(domstr);
	//设置热点城市和省
	div_displayG("hotCityData",GAT.hotCityData);
	//显示热点城市
	$("#hot").show("slow");
};

/**
 * hot页面点击選擇热点城市
 */
function hotTotwG(name){
	//清空区的数据
	$("#areaData").empty();
	//设置返回页面
	GAT.backId.push("hot");
	//显示選擇区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定省市
	$(GAT.hotCityData).each(function(){
		if(this.name == name){
			var strArray = this.parentId.split("/");
			GAT.temppr = {name:strArray[1],id:strArray[0]};
			GAT.tempct = {name:this.name,id:this.id};
		}
	});
	//若不需要区直接返回
	if(GAT.notw+"" == "0"){
		return callbackInfoG();
	}
}

/**
 * 将省市区数据回调
 */
function callbackInfoG(){
	var pct = new GAT();
	GAT.backId = new Array();
	$(".toDelete").remove();
	$("#"+GAT.div).show("slow");
	GAT.fn.call(this,pct);
}

/**
 * 点击返回按钮
 */
function callbackClickG(){
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
function div_displayG(div_id,jsonList){
	var ms = "";
	if(div_id == "hotCityData"){
		ms = '"hotTotwG(\'';
	}
	if(div_id == "provinceData"){
		ms = '"prToctG(\'';
	}
	if(div_id == "cityData"){
		ms = '"ctTotwG(\'';
	}
	var strHtml = '';
	$(jsonList).each(function(){
		if(this.id == "986"){
			strHtml = strHtml + '<li onclick="hotToprG()"><a href="javascript:void(0)">'+this.name+'</a></li>';
		}else{
			strHtml = strHtml + '<li onclick='+ms+this.name+'\')" ><a href="javascript:void(0)">'+this.name+'</a></li>';
		}
	});
	$("#"+div_id).html(strHtml);
}

/**
 * 原地址
 */
function selectGatSrcAddr(){
	getGangaotaiData();
	//移除中国大陆
	if(GAT.hotCityData){
		GAT.hotCityData.shift();
	}
	/*  
	 * root: 根节点的id
	 * fn: 回调方法
	 * code: 是否需要区,0-不需要,1-需要
	 */
	GAT.enter("root",function(pct){
		$("#GTIsrcSendAddr").val(pct.c.name);
		$("#srcAddr").text(pct.c.id);
	} ,0);
}

/**
 * 目的地
 */
function selectGatDestAddr(){
	getGangaotaiData();
	/*  
	 * root: 根节点的id
	 * fn: 回调方法
	 * code: 是否需要区,0-不需要,1-需要
	 */
	GAT.enter("root",function(pct){
		$("#GTIdestSendAddr").val(pct.c.name);
		$("#destAddr").text(pct.c.id);
	} ,0);
}

/**
 *初始化检查是否绑定,初始化热点城市和省 
 */
function getGangaotaiData(){
	var temp = new Array();
	temp[0] ={abb:"cn",id:"986",name:"中國大陸",parentId:"986/中國大陸",spell:"china"};
	temp[1] ={abb:"hk",id:"852",name:"香港",parentId:"852/香港",spell:"hongkong"};
	temp[2] ={abb:"mc",id:"853",name:"澳門",parentId:"853/澳門",spell:"macao"};
	temp[3] ={abb:"tw",id:"886",name:"台灣",parentId:"886/台灣",spell:"taiwan"};
	GAT.hotCityData = temp;
	GAT.provinceData = PCT.provinceData;
}

/**
 * hot页面点击選擇省
 */
function hotToprG(){
	//设置返回页面
	GAT.backId.push("hot");
	div_displayG("provinceData",GAT.provinceData);
	//显示選擇省页面
	$(".topPanel").hide("slow");
	$("#pr").show("slow");
}
/**
 * 選擇省页面点击一个省
 */
function prToctG(name){
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
			div_displayG("cityData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
}
/**
 * 選擇城市页面点击一个城市
 */
function ctTotwG(name){
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
			GAT.tempct = {name:this.name,id:this.id};
		}
	});
	//若不需要区直接返回
	if(GAT.notw+"" == "0"){
		return callbackInfoG();
	}
}