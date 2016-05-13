/**
 * 省市区地址控件[港澳台]
 */
var GJ = function(){
	this.p = GJ.temppr;
	this.c = GJ.tempct;
	this.t = GJ.temptw;
	GJ.temppr = {};
	GJ.tempct = {};
	GJ.temptw = {};
};
//省市区临时缓存区
GJ.temppr = {};
GJ.tempct = {};
GJ.temptw = {};
//记录回调方法
GJ.fn = null;
GJ.div = null;
GJ.notw = null;
GJ.enter = function(div,fn,notw){
	//设置回调和主页面
	GJ.div = div;
	GJ.fn = fn;
	GJ.notw = notw;
	//记录返回节点
	GJ.backId = new Array();
	//设置返回页面
	GJ.backId.push(div);
	//显示hot页面
	$("#"+div).hide("slow");
	//添加控件
	var domstr = '<!-- 国际-->'+
	'<div id="hot" style="display: none;" class="topPanel toDelete">'+
		'<header class="header">'+
			'<a onclick="callbackClickGJ()" class="goback" href="javascript:void(0)">返回</a><h2 class="header-title">選擇國家</h2>'+
		'</header>'+
		'<section class="mainContent">'+	
		    '<h2 class="title-style1">國家<small></small></h2>'+
		    '<section class="common-city">'+
		    '<ul class="city-list" id="hotCityData">'+
		    '</ul>'+
		    '</section>'+
		'</section>'+
	'</div>';
	//附加省市区div
	$(".toDelete").remove();
	$("#"+div).after(domstr);
	//设置热点城市和省
	div_displayGJ("hotCityData",GJ.hotCityData);
	//显示热点城市
	$("#hot").show("slow");
};

/**
 * hot页面点击选择热点城市
 */
function hotTotwGJ(name){
	//清空区的数据
	$("#areaData").empty();
	//设置返回页面
	GJ.backId.push("hot");
	//显示选择区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定省市
	$(GJ.hotCityData).each(function(){
		if(this.name == name){
			var strArray = this.parentId.split("/");
			GJ.temppr = {name:strArray[1],id:strArray[0]};
			GJ.tempct = {name:this.name,id:this.id};
		}
	});
	//若不需要区直接返回
	if(GJ.notw+"" == "0"){
		return callbackInfoGJ();
	}
}

/**
 * 将省市区数据回调
 */
function callbackInfoGJ(){
	var pct = new GJ();
	GJ.backId = new Array();
	$(".toDelete").remove();
	$("#"+GJ.div).show("slow");
	GJ.fn.call(this,pct);
}

/**
 * 点击返回按钮
 */
function callbackClickGJ(){
	$(".topPanel").hide("slow");
	var div_id = GJ.backId.pop();
	$("#"+div_id).show("slow");
	if(GJ.backId.length == 0){
		$(".toDelete").remove();
	}
}

/**
 * 根据不同的id[省市区],来设置设置其中的类容.
 */
function div_displayGJ(div_id,jsonList){
	var ms = "";
	if(div_id == "hotCityData"){
		ms = '"hotTotwGJ(\'';
	}
	var strHtml = '';
	$(jsonList).each(function(){
		strHtml = strHtml + '<li onclick='+ms+this.name+'\')" ><a href="javascript:void(0)">'+this.name+'</a></li>';
	});
	$("#"+div_id).html(strHtml);
}

/**
 * 原地址
 */
function selectGjSrcAddr(){
	getGaojiSrcData();
	/*  
	 * root: 根节点的id
	 * fn: 回调方法
	 * code: 是否需要区,0-不需要,1-需要
	 */
	GJ.enter("root",function(pct){
		$("#GJsrcSendAddr").val(pct.c.name);
		$("#srcAddr").text(pct.c.id);
	} ,0);
}

/**
 * 目的地
 */
function selectGjDestAddr(){
	getGaojiDestData();
	/*  
	 * root: 根节点的id
	 * fn: 回调方法
	 * code: 是否需要区,0-不需要,1-需要
	 */
	GJ.enter("root",function(pct){
		$("#GJdestSendAddr").val(pct.c.name);
		$("#destAddr").text(pct.c.id);
	} ,0);
}

/**
 *原始地
 */
function getGaojiSrcData(){
	var temp = new Array();
	temp[0] ={abb:"cn",id:"010",name:"中國大陸",parentId:"010/中國大陸",spell:"china"};
	temp[1] ={abb:"hk",id:"852",name:"香港",parentId:"852/香港",spell:"hongkong"};
	temp[2] ={abb:"mc",id:"853",name:"澳門",parentId:"853/澳門",spell:"macao"};
	temp[3] ={abb:"tw",id:"886",name:"台灣",parentId:"886/台灣",spell:"taiwan"};
	temp[4] ={abb:"sn",id:"SIN",name:"新加坡",parentId:"SIN/新加坡",spell:"sin"};
	temp[5] ={abb:"jp",id:"TYO",name:"日本",parentId:"TYO/日本",spell:"tyo"};
	temp[6] ={abb:"in",id:"ICN",name:"韓國",parentId:"ICN/韓國",spell:"icn"};
	temp[7] ={abb:"kl",id:"KUL",name:"馬來西亞",parentId:"KUL/馬來西亞",spell:"kul"};
	GJ.hotCityData = temp;
}
/**
 *目的地
 */
function getGaojiDestData(){
	var temp = new Array();
	temp[0] ={abb:"bk",id:"BKK",name:"泰國",parentId:"BKK/泰國",spell:"bkk"};
	temp[1] ={abb:"us",id:"SFO",name:"美國",parentId:"SFO/美國",spell:"usa"};
	temp[2] ={abb:"sn",id:"SGN",name:"越南",parentId:"SGN/越南",spell:"n"};
	temp[3] ={abb:"jp",id:"TYO",name:"日本",parentId:"TYO/日本",spell:"tyo"};
	temp[4] ={abb:"in",id:"ICN",name:"韓國",parentId:"ICN/韓國",spell:"icn"};
	temp[5] ={abb:"sn",id:"SIN",name:"新加坡",parentId:"SIN/新加坡",spell:"sin"};
	temp[6] ={abb:"kl",id:"KUL",name:"馬來西亞",parentId:"KUL/馬來西亞",spell:"kul"};
	GJ.hotCityData = temp;
}

/**
 *获取币种
 */
function getPCurrency(id){
	var currency = "";
	if(id == "852"){
		currency = "港幣";
	}else if(id == "853"){
		currency = "澳門元";
	}else if(id == "886"){
		currency = "新台幣";
	}else if(id == "SIN"){
		currency = "新加坡幣";
	}else if(id == "TYO"){
		currency = "日元";
	}else if(id == "ICN"){
		currency = "韓元";
	}else if(id == "KUL"){
		currency = "馬來西亞元";
	}else if(id == "BKK"){
		currency = "泰銖";
	}else if(id == "SFO"){
		currency = "美元";
	}else if(id == "SGN"){
		currency = "越南盾";
	}else{
		currency = "人民幣";
	}
	return currency;
}
/***
 * 港澳台和国际查询显示结果
 */
function getResultMoney(selInput){
	var srcAddr = $("#srcAddr").text();
	var destAddr = $("#destAddr").text();
	var srcCurrency = getPCurrency(srcAddr); //寄付币种
	var destCurrency = getPCurrency(destAddr); //到付币种
	if(selInput){
		var priceResultHtml = "";
		var priceArray = priceSet[selInput.value];
		for(var i in priceArray){
			var freight = priceArray[i].freight;   //寄付运费
			var fuelCostHTML = "";
			var fuelCost = priceArray[i].fuelCost; //寄付燃油附件费
			var sumPriceHtml = ""; //总价   运费+燃油附件费
			if(fuelCost != ""){
				fuelCostHTML = "&nbsp;燃油附件費："+fuelCost;
				var sumPrice = parseFloat(freight) + parseFloat(fuelCost);
				sumPriceHtml = "總運費："+sumPrice+"<br/>";
			}
			priceResultHtml += "<span style='font-weight:bold'>" + priceArray[i].limitTypeName + 
				"</span>&nbsp;<br/>寄付：&nbsp;<span>" + srcCurrency+" "+freight + fuelCostHTML + sumPriceHtml+"</span>";
			//到付
			var destFreight = priceArray[i].destFreight;   //到付运费
			var destFuelCostHTML = "";
			var destFuelCost = priceArray[i].destFuelCost; //到付燃油附件费
			var destSumPriceHtml = ""; //总价   运费+燃油附件费
			if(destFuelCost != ""){
				destFuelCostHTML = "&nbsp;燃油附件費："+destFuelCost;
				var destSumPrice = parseFloat(destFreight) + parseFloat(destFuelCost);
				destSumPriceHtml = "總運費："+destSumPrice+"<br/>";
			}
			priceResultHtml += "<span>" +
			"</span>&nbsp;到付：&nbsp;<span>" + destCurrency+" "+destFreight + destFuelCostHTML + destSumPriceHtml+"</span></br>";
		}
		$("#ferightTD").html(priceResultHtml);
	}
}