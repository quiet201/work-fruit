//隐藏模块滑动效果控制
function slideRoatInfo(resetHeight) {
	var routBullets = $("#routing-bullets").children();
	var flag = 0;
	var swipeRoutingWrapper = $(".swipeRoutingWrapper");
	var swipItems = swipeRoutingWrapper.find(".swipeItem");
	var switchText = $('#switch-text');
	var routingSwipe = Swipe(document.getElementById('swipeRouting'), {
		startSlide : 0,
		speed : 300,
		continuous : false,
		callback : function(index, element) {
			var i = routBullets.length;
			// console.log(index);
			while (i--) {
				routBullets[i].className = " ";
			}
			routBullets[index].className = "on";
		}, 
		transitionEnd : function(index, element) {
			if (index == 1) {
				if (!flag) {
					// $('html, body').animate({scrollTop: 0}, 350);
					window.scrollTo(0, 1);
					var swipHeight = swipItems.eq(index).height();

					swipeRoutingWrapper.height(swipHeight);//.css("height","auto");//height(swipHeight);

					switchText.text("滑动查看新版运单状态");
				}
				flag++;
			} else {
				flag = 0;
				// $('html, body').animate({scrollTop: 0}, 350);
				window.scrollTo(0, 1);
				var swipHeight = swipItems.eq(index).height();

				swipeRoutingWrapper.height(swipHeight);//.css("height","auto");//.height(swipHeight);

				switchText.text("滑动查看旧版运单状态");
			}
		}
	});
	setTimeout(function() {
        if(resetHeight){
            if( swipItems.eq(0).height() < swipItems.eq(1).height()  ){
                //swipeRoutingWrapper.css("height","auto");//.height(swipItems.eq(0).height());
                swipeRoutingWrapper.height(swipItems.eq(0).height());
            }
        }
        // console.log(swipItems.eq(0).height());
    }, 500);
	/*window.onload = function(){
        setTimeout(function() {
            if(resetHeight){
                if( swipItems.eq(0).height() < swipItems.eq(1).height()  ){
                    //swipeRoutingWrapper.css("height","auto");//.height(swipItems.eq(0).height());
                    swipeRoutingWrapper.height(swipItems.eq(0).height());
                }
            }
            // console.log(swipItems.eq(0).height());
        }, 500);
    };*/
};
//获取地址栏信息
function getUrlValueByKey(key){
	   var url=decodeURI(window.location.search);
	   var value="";
	   if(url.indexOf("?")!=-1){
	      	var str =   url.substr(1);
	     	 strs = str.split("&");
	   		for(var i=0;i<strs.length;i++){
	     		if([strs[i].split("=")[0]]==key){
	     			value=unescape(strs[i].split("=")[1]);
	     		} 
	     	}
	   }
	   return value;
}

function getAddressDetail(url){
	var callbackUrl=location.href;
	if(location.href.indexOf("?")!=-1){
		callbackUrl=location.href.substring(0,location.href.indexOf("?"));
	}
	location.href=url+"&forward="+unescape(callbackUrl);
};
//该方法主要用于地址的获取，通过ID直接把值填充进去
function setAddrValueById(id,value){
	var data =$.trim(value);
	//如果参数中直接有
	if(data!=""){//这个参数一般是从地址栏直接过来的
		$("#"+id).text(data);
		setCookie(id,data);
	}else{//有可能用户还没有选地址，也许用户选了地址，信息存放在cookie中
		var temp=getCookie(id);//找不到再到cookie中去找
		if(temp){
			$("#"+id).text(temp);
		}
	}
};
//通过ID设置元素值
function setValueById(id,value){
	var temp=$.trim(value);
	$("#"+id).text(temp!=""?temp:"");
};
//通过Class设置元素值
function setValueByClass(classParam,value){
	var temp=$.trim(value);
	$("."+classParam).text(temp!=""?temp:"");
};
//避免页面上出现NULL
function getValueById(id){
	var temp=$.trim($("#"+id).text());
	return temp==""?"":temp;
};
function getValueByClass(classParam){
	var temp=$.trim($("."+classParam).text());
	return temp==""?"":temp;
};

/**/
function setCookie(name,value){
	var Days = 30; //此 cookie 将被保存 30 天
	var exp= new Date();
	exp.setTime(exp.getTime() +Days*24*60*60*1000);
	document.cookie = name +"="+ escape (value) + ";expires=" + exp.toGMTString();
	//location.href = "Read.htm";//接收页面.
}
/**
 * cookie保存分钟
 * @param name
 * @param value
 * @param min 分钟
 */
function setCookieMin(name,value,min){
	var exp= new Date();
	exp.setTime(exp.getTime() +min*60*1000);
	document.cookie = name +"="+ escape (value) + ";expires=" + exp.toGMTString();
	//location.href = "Read.htm";//接收页面.
}
function getCookie(name)
{
	var arr =document.cookie.match(new RegExp("(^|)"+name+"=([^;]*)(;|$)"));
	if(arr !=null) return unescape(arr[2]); return "";
}
function deleteCookie(name){ 
	var date=new Date(); 
	date.setTime(date.getTime()-10000); 
	document.cookie=name+"=''; expires="+date.toGMTString(); 
};
//设置cookie过期时间
function setCookieTime(name,value){
	var exp= new Date();
	exp.setTime(exp.getTime() +10*60*1000);
	document.cookie = name +"="+ escape (value) + ";expires=" + exp.toGMTString();
}
//添加验证单项:如果该元素为必填，而值为空，则添加ID，
function validateElement(data,arrayParam,tip){
	if(!arrayParam){
		return;
	}
	var temp=$.trim(data);
	if(temp==""){
		arrayParam.push(tip);
		alertErrors(tip);
	}
};
function fillNull(value){
	var temp=$.trim(value);
	return temp==""?"":temp;
}

//复制对象属性
function setDtoParam(dto,param,value){
	if(!dto || !param){
		return;
	}
	dto[param]=value;
};
/*-------------------扩展Date的format方法 ---------------------*/
//format("yyyy-MM-dd hh:mm:ss"); 
Date.prototype.format = function (format) {
	var o = {
    	"M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
     };
     if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     }
     for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
     }
     return format;
};
/**
 *获取币种
 */
function getCurrencyUnit(name){
	var currency = "";
	var temp = new Array(); 
	temp[1] ={abb:"hk",id:"852",name:"香港",parentId:"852/香港",spell:"hongkong",unit:"港币"};
	temp[2] ={abb:"mc",id:"853",name:"澳门",parentId:"853/澳门",spell:"macao",unit:"澳门元"};
	temp[3] ={abb:"tw",id:"886",name:"台湾",parentId:"886/台湾",spell:"taiwan",unit:"新台币"};
	temp[0] ={abb:"bk",id:"BKK",name:"泰国",parentId:"BKK/泰国",spell:"bkk",unit:"泰铢"};
	temp[4] ={abb:"sn",id:"SIN",name:"新加坡",parentId:"SIN/新加坡",spell:"sin",unit:"新加坡币"};
	temp[5] ={abb:"jp",id:"TYO",name:"日本",parentId:"TYO/日本",spell:"tyo",unit:"日元"};
	temp[6] ={abb:"in",id:"ICN",name:"韩国",parentId:"ICN/韩国",spell:"icn",unit:"韩元"};
	temp[7] ={abb:"kl",id:"KUL",name:"马来西亚",parentId:"KUL/马来西亚",spell:"kul",unit:"马来西亚元"};
	temp[8] ={abb:"us",id:"SFO",name:"美国",parentId:"SFO/美国",spell:"usa",unit:"美元"};
	temp[9] ={abb:"sn",id:"SGN",name:"越南",parentId:"SGN/越南",spell:"n",unit:"越南盾"};
	$.each(temp,function(index,value){
		if(value.name==name){
			currency=value.unit;
		}
	});
	return currency;
}

/**
 * 查询运费与时效
 * @param param
 */
function searchFeeAndTime(param){
	$("#waitplease").show();
	$.post("/service/alipay/searchFeeAndTime",param,function(result){
		$("#waitplease").hide();
		if(result && result.length>0){
			//deleteCookie("queryDto");
			createDom(result,param.srcName);
			$('#testPosition001').show();
		}else {
			var goodsWeigth = param.goodsWeigth;
			/*$("#conmment-tips").show();
			setTimeout(function() {
				$("#conmment-tips").fadeOut();
			}, 1000);*/
			alertErrors('系统开了会小差，再试试吧');
		}
	},"json"); 
}

function createFeeDomForShip(json,params){
	
	var objParent = $("#timecontainerDiv >ul");
	//删除所有非种子列表,种子列的名称统一为seed
	objParent.children(("li[name='seed']")).attr("style","display:none");
	objParent.children(("li[name!='seed']")).remove();
	//产品数组结果集为空判断
	if(json==null ||json.length==0){
		$("#id_div_noProduct").show();
		return;
	}else{
		$("#id_div_noProduct").hide();
	}
//	objParent.html("");
	//是否是国内件判断
	var isDALU = params.stype==""&&params.dtype=="";
	
	//获取到付数据对象
	//遍历数据
	$.each(json ,function(index,item){
		//郊区与非郊区判断，当同一产品有多个产品时，只显示非郊区产品  suburbFlg==true?"郊区":"非郊区"
		if(item.sameProductCount != 0 && item.sameProductCount != 1){
			if(item.suburbFlg==true){
				return true;
			}
		}
		
		var selectorProd = "li[name='seed']";
		//$(objParent).children(selectorProd).attr("style","display:none");
		var obj = $(objParent).children(selectorProd).clone();
		objParent.append(obj);
		
		
		
		obj.attr("name","name_li_show");//更改名称，与种子列不一样，以便删除
		obj.attr("style","display:block");//设置为展示状态
		//产品不可用时置灰 class dated
		if(false == item.canWork){
//			obj = $(temp).clone();
			obj.addClass("dated");
		}else{
			obj.removeClass("dated");
		}
		
		//将对象放置进隐藏域
		
		
		//设置产品名称
		obj.find("[name=cplxName]").text(item.productName);
		//如果是非大陆互寄的快递，则更改时效提示
		if(isDALU==false){
			var tipText = "价格时效稳定";
			if(item.productCode=="T6"){
				tipText = "性价比高";
			}
			obj.find("[name='name_span_productTip']").text(tipText);
		}
		//设置产品价格
		//寄付币种
//		obj.find("[name=input_name_currency]").val(item.currencyCode);
		
		//产品时效item.firstFreight+item.firstFuelFreight==0?"暂无数据":item.firstFreight+item.firstFuelFreight+"元起"
		//首重费用
		obj.find("[name='firstFreight']").text(addFreight(item.firstFreight,item.firstFuelFreight));
		obj.find("[name='destFirstFreight']").text(addFreight(item.destFirstFreight,item.destFirstFuelFreight));
		/*setFreight(obj.find("[name=firstFreight]"),obj.find("[name=first_freight_currency]"),item.firstFreight,item.firstFuelFreight,item.currencyCode,item.currencyCodeCHNName);
		
		setFreight(obj.find("[name=destFirstFreight]"),obj.find("[name=first_freight_destcurrency]"),item.destFirstFreight,item.destFirstFuelFreight,item.currencyCode,item.currencyCodeCHNName);*/
	/*	var insuredAmount=$("#insuredAmountText").text().substring(0,$("#insuredAmountText").text().indexOf("元"))==""?0:$("#insuredAmountText").text().substring(0,$("#insuredAmountText").text().indexOf("元"));
		$("#yuguFright").text(item.destFreight+item.destFuelCost==0?"暂无数据":item.destFreight+item.destFuelCost+parseInt(insuredAmount)+"元");
		$("#destyuguFright").text(item.destFreight+item.destFuelCost==0?"暂无数据":item.destFreight+item.destFuelCost+parseInt(insuredAmount)+"元");*/
		/*$("#savePrice").text(insuredAmount=="选填"?"":insuredAmount);*/
		obj.find("[name='hideFreight']").text(item.destFreight+item.destFuelCost);
		obj.find("[name='hideDestFreight']").text(item.destFreight+item.destFuelCost);
		obj.find("[name='deliverTm']").text(item.strDeliverTm);
		
		//obj.find(":input").val(item.productCode);
		//截单时间tmp.setWorkStatus(1L);//1:表示正常   2:已过截单日期   3:截单日期未查到   4:早于服务开始时间   5:非服务日期
		//产品时效
		obj.find("[name='deliverTm']").text(item.strDeliverTm);
		//截单时间
		
		
		//截单时间tmp.setWorkStatus(1L);//1:表示正常   2:已过截单日期   3:截单日期未查到   4:早于服务开始时间   5:非服务日期
		//var objDdDeleverTm =  obj.find("[name='dd_name_deliverTm']");//预计送达时间
		var objDdTimeLast =  obj.find("[name='dd_name_time_last']");//预计送达时间
		if(5!=item.workStatus&&null!=item.workEndTime){
			obj.find("[name=dd_name_time_last]").show();
		  obj.find("[name='timeLast']").text("当日" + item.workEndTime);
		}else{
		  obj.find("[name=dd_name_time_last]").hide();
		}
		//obj.find("[name=itemStr]").val(JSON.stringify(item));
		
		//click event
		$(obj).bind("click", function(){
			setProudctType(obj,JSON.stringify(item));
		});
	
	});
	//寄付-到付显示处理
	showPriceTable();
	
}

//计算运费
function addFreight(freight,destFreight){
	if(freight+destFreight==0){
		return "暂无数据";
	}else{
		return freight+destFreight+"元";
	}
	
}

function createFeeDom(json,params){
	
	$(".dev-search-show").show();
	var objParent = $("#timecontainerDiv >ul");
	//删除所有非种子列表,种子列的名称统一为seed
	objParent.children(("li[name='seed']")).attr("style","display:none");
	objParent.children(("li[name!='seed']")).remove();
	//产品数组结果集为空判断
	if(json==null ||json.length==0){
		$("#id_div_noProduct").show();
		return;
	}else{
		$("#id_div_noProduct").hide();
	}
//	objParent.html("");
	//是否是国内件判断
	var isDALU = params.stype==""&&params.dtype=="";
	
	//获取到付数据对象
	//遍历数据
	$.each(json ,function(index,item){
        //郊区与非郊区判断，当同一产品有多个产品时，只显示非郊区产品  suburbFlg==true?"郊区":"非郊区"
		if(item.sameProductCount != 0 && item.sameProductCount != 1){
			if(item.suburbFlg == true){
				return true;
			}
		}
		
		var selectorProd = "li[name='seed']";
		//$(objParent).children(selectorProd).attr("style","display:none");
		var obj = $(objParent).children(selectorProd).first().clone();
		objParent.append(obj);
		obj.attr("name","name_li_show");//更改名称，与种子列不一样，以便删除
		obj.attr("style","display:block");//设置为展示状态
		//产品不可用时置灰 class dated
		if(false == item.canWork){
//			obj = $(temp).clone();
			obj.addClass("dated");
		}else{
			obj.removeClass("dated");
		}
		

		//设置产品名称
		obj.find("[name='cplxName']").text(item.productName);
		//如果是非大陆互寄的快递，则更改时效提示
//		if(isDALU==false){
//			var tipText = "价格时效稳定";
//			if(item.productCode=="T6"){
//				tipText = "性价比高";
//			}
//			obj.find("[name='name_span_productTip']").text(tipText);
//		}
		//效区非郊区处理，如果同产品数超过1个，则显示郊区与郊区提示

//		if(item.sameProductCount != 0 && item.sameProductCount != 1){
//			obj.find("[name='name_span_productTip']").text(item.suburbFlg==true?"郊区":"非郊区");
//		}else{
//			obj.find("[name='name_span_productTip']").attr("style","display:none");
//		}
		
		//设置产品名称
		obj.find("[name=cplxName]").text(item.productName);
		//如果是非大陆互寄的快递，则更改时效提示
		if(isDALU==false){
			var tipText = "价格时效稳定";
			if(item.productCode=="T6"){
				tipText = "性价比高";
			}
			obj.find("[name='name_span_productTip']").text(tipText);
		}
		//设置产品价格
		//寄付币种
//		obj.find("[name=input_name_currency]").val(item.currencyCode);
		//寄付费用
		setFreight(obj.find("[name='price']"),obj.find("[name='name_span_currency']"),item.freight,item.fuelCost,item.currencyCode,item.currencyCodeCHNName);
		//到付币种
//		obj.find("[name=input_name_destcurrency]").val(item.destCurrencyCode);
		//到付费用
		setFreight(obj.find("[name='destPrice']"),obj.find("[name='name_span_destcurrency']"),item.destFreight,item.destFuelCost,item.destCurrencyCode,item.destCurrencyCodeCHNName);
		//产品时效
		
		setFreight(obj.find("[name='destFirstFreight']"),obj.find("[name='first_freight_destcurrency']"),item.destFirstFreight,item.destFirstFuelFreight,item.currencyCode,item.currencyCodeCHNName);
		obj.find("[name='deliverTm']").text(item.strDeliverTm);
		
		
		//截单时间tmp.setWorkStatus(1L);//1:表示正常   2:已过截单日期   3:截单日期未查到   4:早于服务开始时间   5:非服务日期
//		alert("截单时间是否取到："+obj.find("[name='timeLast'").size());
//		alert("截单时间赋值前："+obj.find("[name='timeLast'").text());
//		alert("截单时间赋值前："+obj.find("[name='timelast'").text());
		var objTimeLast = obj.find("[name='timeLast']");
		//var objDdDeleverTm =  obj.find("[name='dd_name_deliverTm']");//预计送达时间
		var objDdTimeLast =  obj.find("[name='dd_name_time_last']");//预计送达时间
		
		if(5!=item.workStatus&&null!=item.workEndTime){
			obj.find("[name=dd_name_time_last]").show();
		  obj.find("[name='timeLast']").text("当日" + item.workEndTime);
		}else{
		  obj.find("[name=dd_name_time_last]").hide();
		}

		/*if(item.workStatus == 1){
			objTimeLast.text("当日" + item.workEndTime);
		}else{
			if(item.workStatus==2){
				objDdDeleverTm.text("已超过截单时间");
			}else if(item.workStatus==3){
				objDdDeleverTm.text("暂无法提供服务");
				objDdTimeLast.hide();//隐藏截单时间
			}else if(item.workStatus==4){
				objDdDeleverTm.text("非服务时间不提供服务");
			}else if(item.workStatus==5 ){
				objDdDeleverTm.text("非服务时间不提供服务");
			}
		}*/
	});
	//寄付-到付显示处理
	showPriceTable();
	//cargoTypeCode: "C201"cargoTypeName: nullcurrencyCode: "CNY"deliverTm: nulldestCurrencyCode: nulldestFreight: 0destFuelCost: 0distanceTypeCode: nulldistanceTypeName: nullexpressTypeCode: "B1"freight: 16fuelCost: 0invalidTm: nulllimitTypeCode: "T104"limitTypeName: nullnotServiceDay: nullproductCode: "T1"productName: "即日2000"workBeginTime: "09:00"workEndTime: "20:30"
}

//赋值的jquery对象，快递费用,附加费用，币种，币种中文名称
function setFreight(obj,objCurrency,freight,freightOthers,currencyCode,currencyCodeCHNName){
	//费用数据未查询到
	if(freight==null || freight==0){
//		obj.text("&nbsp;&nbsp;");
//		objCurrency.text("&nbsp;&nbsp;");
		obj.text("");
		objCurrency.html("暂无数据");
		return;
	}
	var totalFreight = freight+freightOthers;
	obj.text(totalFreight);
	//人民币及外币
	if(currencyCode=="CNY"){
		objCurrency.text("元");
	}else{
//		obj.text(currencyCodeCHNName+":"+totalFreight);
		objCurrency.text(currencyCodeCHNName);
	}
}

/**
 * 矩阵项目查询运费与时效
 * @param param
 */
function matrixSearchFeeAndTime(param,type){
	$("#waitplease").show();
	if(type=='1'){//矩阵项目下单页面需要查询首重，时效查询页面不需要
		param["queryFirstHeavyFee"] = 1;//查询首重参数, 0：不查询  1：查询 
	}else{
		param["queryFirstHeavyFee"] = 0;//查询首重参数
	}
	$.post("/service/alipay/matrixSearchFeeAndTime",param,function(result){
		$("#waitplease").hide();
		if("2" == type){//时效查询页面请求
			createFeeDom(result,param);
			return;
		}
		if(result && result.length>0){
			createFeeDomForShip(result,param);
			/*if("1"==type){
				//寄件页面的请求
				
				$("#div_id_prodect_show").show();
				//createFeeDomForShip(result);	
			}*/
			//$('#testPosition001').show();
		}else {
			var goodsWeigth = param.goodsWeigth;
			$(".box-timecontainer-store").hide();
			$("#id_div_noProduct").show();
			//$("#id_div_noProduct").hide();
			/*$("#conmment-tips").show();
			setTimeout(function() {
				$("#conmment-tips").fadeOut();
			}, 1000);*/
			//alertErrors('系统开了会小差，再试试吧');
		}
	},"json"); 
}

/**
 * 组装数据并将隐藏区域设为显示
 * @param data
 * @param name
 */
function createDom(data,name){
	
	var buff=setAddrDomInfo(data,name);
	$(".tbody").empty().append(buff.join(""));
	toggleChange();
	$(".table.table-ship").show();
};

/**
 * 动态组装价格与时效文本
 * @param data
 * @param name
 * @returns {String}
 */
function setAddrDomInfo(data,name){
//	var buff=$("<p></p>");
	var buff=[];
	
	//标快
	
//	var tempT4="<div class='tr-box' data-toggle='show-explain'><dl class='tr-row'> <dd class='td text-align-center'><i class='ui-ico-sfi ico-parcel-time'></i><br /><span class='s-title'>顺丰标快</span></dd><dd class='td2'><div class='d1-1'><div class='div-left'><p class='text-fontStyle' id='dateItem'>2014-11-10</p><p class='text-fontStyle' id='timeItem'>16:00-19:00</p>"+
//	"</div><div class='div-center text-fontStyle' id='weekDay'></div><div class='div-right '><p class='contract-color'>22.00元</p></div></div><div class='d1-2'>全国及港澳台高标准的门到门快件服务</div></dd></dl></div>";
//	var tempObjectT4=$(tempT4);
	//特惠
//	var tempT7=" <div class='tr-box' data-toggle='show-explain'><dl class='tr-row'><dd class='td text-align-center'><i class='ui-ico-sfi ico-parcel-money'></i><br /><span class='s-title'>顺丰特惠</span></dd><dd class='td2'><div class='d1-1'><div class='div-left'><p id='dateItem'>2014-11-10</p><p  id='timeItem'>16:00-19:00</p></div><div class='div-center text-fontStyle'>(周一)</div>"+
//	"<div class='div-right '><p class='contract-color'>18.00元</p></div></div><div class='d1-2'>全国及港澳台经济型快递服务</div> </dd></dl></div>";
//	var tempObjectT7=$(tempT7);
	$.each(data,function(i,value){
		var resultItem="";
//		if(data[i].limitTypeCode=="T4"){
//			resultItem=tempObjectT4.clone();
//		}else{
//			resultItem=tempObjectT7.clone();
//		}
		//设定时间
		var date=value.deliverTm;
		var time="";
		if($.trim(date)!=""){
			date=new Date(date).format("yyyy-MM-dd hh:mm");
			time=date.split(" ");
			date=time[0];
			time=time[1];
		}else{
			date="";
		}
		var spriceUnit=getCurrencyUnit(name);//原寄地币种
		var productType=data[i].productName;
		if($.trim(productType)==""){
			productType=data[i].limitTypeName;
		}
		
		var rmb  =value.currencyCode.trim() == "CNY" ? "&nbsp;&nbsp;元" : spriceUnit;
		var freight =0;
		if($.trim(value.freight)!=""){
			freight=parseFloat(value.freight);
		}
		if($.trim(value.fuelCost)!=""){
			freight=freight+parseFloat(value.fuelCost);
		}
		var priceAndUnit="";
		if(value.currencyCode.trim() == "CNY"){
			priceAndUnit=freight+rmb;
		}else{
			priceAndUnit=rmb+" : "+freight;
		}
		
		
		var tm_lg = data[i].limitTypeCode=="T4"?"ico-parcel-time":"ico-parcel-money";
		var zsStr = data[i].limitTypeCode=="T4"?"全国及港澳台高标准的门到门快件服务":"全国及港澳台经济型快递服务";
		resultItem="<tr class='tr-top'>"+
			"	<td rowspan='1' class='text-center'>"+
			"		<i class='ui-ico-sfi "+tm_lg+"'></i>"+
		    "   </td>"+
			"	<td>"+
			"		<span class='s-time' >"+fillNull(date)+""+getWeekDate(fillNull(date))+fillNull(time)+"</span>"+
			"	</td>"+
			"	<td><p class='contract-color'>"+fillNull(priceAndUnit)+"</p></td>"+
			"</tr>"+
			"<tr class='tr-bottom'>"+
			" 	<td rowspan='1' class='text-center'>"+
		    "    	<span class='s-title'>"+fillNull(productType)+"</span>"+
		    "    </td>"+
			"	<td colspan='2'>"+
			"		<p>"+zsStr+"</p>"+
			"	</td>"+
			"</tr>";
		
//		resultItem.find(".s-title").html(fillNull(productType));//类型
//		resultItem.find("#dateItem").html(fillNull(date)).removeAttr("id");
//		resultItem.find("#timeItem").html(fillNull(date)+""+getWeekDate(fillNull(date))+fillNull(time)).removeAttr("id");//时间
//		resultItem.find(".contract-color").html(fillNull(priceAndUnit)).removeAttr("id");//价格
//		resultItem.find("#weekDay").html(getWeekDate(fillNull(date))).removeAttr("id");
		buff.push(resultItem);
		/*buff =buff+"<tr class='tr-top'><td rowspan='2' class='text-center'>"+
		"<i class='ui-ico-sfi ico-parcel-time'></i><br /><span class='s-title'>"+
		fillNull(productType)+"</span></td><td><p>"+fillNull(date)+"</p><p>"+fillNull(time)+
		"</p></td><td>(周日)</td><td><p class='contract-color'>"+fillNull(priceAndUnit)+"</p></td>";*/
		
	});
	return buff;
}

//展开与隐藏切换
function toggleChange(){
	$('[data-toggle="show-explain"]').bind("click",function(){
		$(this).toggleClass("open");
	});
};


/**
 * 验证文本框是否超长
 * str 校验字符串
 * maxLength 最大长度
 */
function checkStrIsToLong(str,maxLength) {
	if(!str || str == null || $.trim(str) == "" || maxLength == 0){
		return false;
	}
	var s = 0;   
	for(var i = 0; i < str.length; i++) {   
        if(str.charAt(i).match(/[\u0391-\uFFE5]/)) {   
            s += 3;	//UTF-8 一个汉字等于3个字符
        } else {   
            s++;   
        }   
	}   
	return s > maxLength;   
}
function btnBack(url){
	location.href=url;
}
function getReplacePoint(){
	var bf="";
	if($.trim($(".replaces"))!=""){
		$.each($(".replaces"),function(index,value){
			bf=bf+$(value).attr("id")+",";
		});
	}
	if(bf.substring(bf.length-1,bf.length)==","){
		bf=bf.substring(0, bf.length-1);
	}
	return bf;
};
/**
 * getRuleReplaceSite 获取引擎规则
 * @param bno
 * @param pageId
 * @param sites
 */
function getRuleReplaceSite(bno,pageId,sites,ruleConfig){
	if($.trim(bno)=="" || bno.length!=12 || $.trim(pageId)==""  ||$.trim(sites)==""  ){
		$("#waitplease").hide();
		console.info("参数不符合规则，匹配规则终止");
		return;
	}
	var param={
		"bno"	:bno,	
		"pageId":pageId,
		"channelType":"1",
		"sites"	:sites
	};
	$.ajax({
		type 	: "POST",
		data	:param,
		dataType : "json",
		url 	: "/service/alipay/getRuleReplaceSite",
		success: function(json){
			ruleConfig.ruleData= json;//获取规则值
			
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			ruleConfig.ruleState="N";
		}
	});
};

/**
 * 
 * @param data
 */
function replaceDom(data,bodyShow){
	//考虑到一种情况：规则获取的数据先到 ，路由信息后到，这种情况先让规则数据先等500毫秒，然后执行替换操作
	setTimeout(function (){
		createReplaceDom(data,bodyShow);
	},500);
};
/**
 * 处理替换值
 * @param obj
 */
function createReplaceDom(obj,bodyShow){
	if(obj.state=="Y"){
		for(var item in obj.data){
			if($.trim($("#"+item))!="" ){
				$("#"+item).html(obj.data[item]);
			}
		}
		//展示更改后的BODY
		$("#"+bodyShow).show();
		
	}else{
		$("#"+bodyShow).show();
	}
	//slideRoatInfo(true);
}



function getCommonImg(code,flag,result){
	$.post("/service/common/img/"+code+"/"+flag+"/"+result,null,null,"json"); 
}

/**
 * 格式化时间日期
 * @param times
 * @returns
 */
function formatDate(times){
	var date  = fillNull(times).substr(0,times.length);
	var reg = new RegExp("^[0-9]*$");
	if(reg.test(date)){
		date = new Date(date*1).format("yyyy-MM-dd hh:mm");
	}
	/*var time = fillNull(times).substr(11,times.length-1);
	var arys1= date.split('-'); 
    var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);  
    var item =  ssdate.getDay();
    var showDate = null;
      //计算日期 0代表周日
      switch(item){
      case 0:
    	  showDate = date + ' 周日  '+time; 
    	  break;
      case 1:
    	  showDate = date + ' 周一 '+time; 
    	  break;
      case 2:
    	  showDate = date + ' 周二 '+time; 
    	  break;
      case 3:
    	  showDate = date + ' 周三  '+time; 
    	  break;
      case 4:
    	  showDate = date + ' 周四  '+time; 
    	  break;
      case 5:
    	  showDate = date + ' 周五  '+time; 
    	  break;
      case 6:
    	  showDate = date + ' 周六  '+time; 
    	  break;
      }
      return showDate;*/
    return date+" 前";
      //$("#receiveTimes").text(showDate);
}


function getWeekDate(times){
	var date  = fillNull(times).substr(0,10);
    //var time = fillNull(times).substr(11,times.length-1);
	var arys1= date.split('-'); 
    var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);  
    var item =  ssdate.getDay();
    var showDate = null;
      //计算日期 0代表周日
      switch(item){
      case 0:
    	  showDate = '(周日)'; 
    	  break;
      case 1:
    	  showDate = '(周一)'; 
    	  break;
      case 2:
    	  showDate = '(周二) '; 
    	  break;
      case 3:
    	  showDate = '(周三 )'; 
    	  break;
      case 4:
    	  showDate = '(周四 )'; 
    	  break;
      case 5:
    	  showDate = '(周五)'; 
    	  break;
      case 6:
    	  showDate = '(周六 )'; 
    	  break;
      }
      return showDate;
      //$("#receiveTimes").text(showDate);
}
/*//文本提示弹出层
function tipsDialog(content){
	var $dialog = $('<div class="dialog-tips"></div>');
	var $content = $('<div class="content"></div>');
	$content.html(content);
	$dialog.append($content);
	$("body").append($dialog);  
	var windowHeight = $(window).height();  
	var popupHeight = $dialog.height(); 
	var top = (windowHeight-popupHeight)/2;
	$dialog.css({"top": top}).fadeIn(500);		
	setTimeout(function () {
		$dialog.fadeOut(500);
	}, 2500);	 
}*/


function alertDialog3(contect,type){
	var $mask = $('<div class="maskbox" style="z-index:1001; opacity:.9;" id="showCancel"></div>');
	var $tip = $('<div class="tip-box"></div>');
	var $content = $('<h2 style="text-align:left;padding: 0 10%;">'+contect+'</h2>');
	var $tipBtn = $('<div class="tip-btn"></div>');
	var $bottom;
	var $btnSubmit;
	
	$bottom = $('<a class="tip-btn-a1" href="javascript:closealertDialogs();" id="btnCancel" onclick="closealertDialogs();">'+
    '<div class="tip-btn-a-div">取消</div></a>');
	if('xiaomi'==type){
	$btnSubmit = $('<a class="tip-btn-a2" href="javascript:closealertDialogs();" id="btnOk" onclick="xiaomiService();">'+
		    '<div class="tip-btn-a-div">确认</div></a>');	
	}else if('tencent'==type) {
		$btnSubmit = $('<a class="tip-btn-a2" href="javascript:closealertDialogs();" id="btnOk" onclick="tencentService();">'+
	    '<div class="tip-btn-a-div">确认</div></a>');	
	}else{
    $btnSubmit = $('<a class="tip-btn-a2" href="javascript:closealertDialogs();" id="btnOk" onclick="service();">'+
    '<div class="tip-btn-a-div">确认</div></a>');
	}
	//将各部分标签组合起来
	$tipBtn.append($bottom);
	$tipBtn.append($btnSubmit);
	$tip.append($content);
	$tip.append($tipBtn);
	$mask.append($tip);
	$("body").append($mask);
	
	
}

function xiaomiService(){
	location.href='http://sf-ocs.sf-express.com:8080/live800/chatClient/chatbox.jsp?companyID=8935&configID=34&skillId=32&enterurl=xmi';
}

function tencentService(){
	location.href='http://sf-ocs.sf-express.com:8080/live800/chatClient/chatbox.jsp?companyID=8935&configID=35&skillId=33&enterurl=mpqq';
}

function service(){
	location.href='http://sf-ocs.sf-express.com:8080/live800/chatClient/chatbox.jsp?companyID=8935&configID=19&skillId=15&enterurl=ZFB';
}
function closealertDialogs(){
	$('#showCancel').remove();
}

function alertErrors(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2500);
}

/**
 * String是否为空
 * return 空 false,非空 true
 */
function variable1ObjectIsNull(obj){
	if(null==obj || undefined==obj || ''==obj){
		return false;
	}else{
		return true;
	}
	
}

/**
 * 对像是否为空
 * return 空 false,非空 true
 */
function ObjectIsNull(obj){
	if(null==obj || undefined==obj){
		return false;
	}else{
		return true;
	}
	
}
/**URL加日志*/
function toUrlOfLog(url,key){
	$.post("/service/commonLog/addLog/"+key); 
	location.href=url;
}


function AesDecrypt(word){  
    var key = CryptoJS.enc.Utf8.parse("0102030405060708");   
    var iv  = CryptoJS.enc.Utf8.parse('0102030405060708');   
    var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv,mode:CryptoJS.mode.CBC});  
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();  
}  

function checkAddressLength(text,content,lengths){
	
	 var add = text;
		
		var length = 0;
		for (var i=0;i<add.length;i++){
			
			var str = add.charAt(i);
			
			//判断是字符长度为1
			
			if(/\s/.test(str)){
				length+=0;
			}else{
				length+=3;
			}
			/*if(/^[a-zA-Z]*$/.test(str))
			{
			    //alert("“" + str + "”里全是字母！");
			    length++;
			}else if(/^[0-9]*$/.test(str)){
				//判断是数字字符为1
				 length++;
			}*/
			/*else if(/^[\u4e00-\u9fa5]*$/.test(str))
			{
			    //判断是汉字字符为3
			    length+=3;
			}else{
				length++;
			}*/
			
		} 
		if(length>lengths){
			//$("#waitplease").hide();
			alertError(content);
			return false;
		}else{
			return true;
		}
}

//判断两时间的日期差
function  getDateDiff(date,endTime){
	
	var beginTime  = fillNull(date).substr(0,date.length);
	var reg = new RegExp("^[0-9]*$");
	if(reg.test(date)){
		beginTime = new Date(beginTime*1).format("yyyy-MM-dd hh:mm:ss");
	}
	
	var result = null;
	//返回值代表时间差
	if(null!=beginTime&&fillNull(beginTime).length>1&&null!=endTime&&fillNull(endTime).length>1){
		//当开始时间截止时间都不为null的时候开始判断   ("2014-01-01 10:15:00").replace(/-/g,"/");
		var end_str = (endTime).replace(/-/g,"/");//一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。  
		var end_date = new Date(end_str);//将字符串转化为时间  
		//开始时间  
		var sta_str = (beginTime).replace(/-/g,"/");  
		var sta_date = new Date(sta_str);  
		var num = (end_date-sta_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
		//判断是否小于0
		result = num;
		/*if(num<=0){
			result = num;
		}else{
			result = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了） 	
		}*/
		
	}
	return result;
	
	
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
} 

function  getsystemName(){
	var sysName = null; 
	var u = navigator.userAgent;
	// 1 安卓  2  苹果 3 wp
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        //return alert('安卓');
    	sysName = '1';
    } else if (u.indexOf("iPhone") > -1) {
         //alert('苹果');
        sysName = '2';
    } else if (u.indexOf("Windows Phone") > -1) {
         //alert('wp');
        sysName = '3';
    }
    
    return sysName;
}

function removeHiddenStarClass(item){
	var $stars = item;
	if(null!=$stars&&$stars.length>0){
	$stars.each(function(){
		$(this).removeClass("current").addClass("ui-btn btn-submitapprisal");
		  });
	}
	
	
}

/*设置按钮样式监听*/
function addButtonListem(){
	/*if($("#evaluateScore .ui-ico.ico-star02.able").length>0 && $(".clearfix .current").length>0){*/
	if($("#evaluateScore .ui-ico.ico-star02.able").length>0){
		$("#subBtn").removeClass("btn-cancel").addClass("btn-submit");
	}else{
		$("#subBtn").removeClass("btn-submit").addClass("btn-cancel");
	};
};

/**
 * 寄付-到付切换表格click
 */
function switchPriceTable(){
	var showObj = $("#timecontainerDiv >ul");
	var obj = $("#tableType");
	var className = null;
	//type 1 页面点击事件  2 查询列表方法内部调用
	if($(obj).hasClass("send")){
		obj.removeClass("send");
		obj.addClass("return");
		obj.text("到付");
	}else{
		obj.removeClass("return");
		obj.addClass("send");
		obj.text("寄付");
	}
	
	showPriceTable();
	
	
}

function showPriceTable(){
	var showObj = $("#timecontainerDiv >ul");
	var showReturn = $("#tableType").hasClass("return");
	if(true == showReturn){
//		obj.removeClass("send");
//		obj.addClass("return");
//		obj.text("到付");
		//费用显示
		showObj.find("[name=price]").hide();
		showObj.find("[name=destPrice]").show();
		//币种显示
		showObj.find("[name='name_span_currency']").hide();
		showObj.find("[name='name_span_destcurrency']").show();
		
		showObj.find("[name=firstFreight]").hide();
		showObj.find("[name=destFirstFreight]").show();
		//币种显示
		showObj.find("[name='first_freight_currency']").hide();
		showObj.find("[name='first_freight_destcurrency']").show();
		
		$("#yuguFright").hide();
		$("#destyuguFright").show();


	}else{
//		obj.removeClass("return");
//		obj.addClass("send");
//		obj.text("寄付");
		//费用显示
		showObj.find("[name=price]").show();
		showObj.find("[name=destPrice]").hide();
		//费用币种显示
		showObj.find("[name='name_span_currency']").show();
		showObj.find("[name='name_span_destcurrency']").hide();
		
		showObj.find("[name=firstFreight]").show();
		showObj.find("[name=destFirstFreight]").hide();
		//币种显示
		showObj.find("[name='first_freight_currency']").show();
		showObj.find("[name='first_freight_destcurrency']").hide();
		
		$("#yuguFright").show();
		$("#destyuguFright").hide();
//		//费用显示
//		showObj.find("li[name='seed']").find("[name=price]").each(function(index, tmpObj){
//			if(!isNaN($(tmpObj).text())){
//				//隐藏显示相关币种名称字段
//				$(tmpObj).siblings("[name='name_span_currency']").show();
//				$(tmpObj).siblings("[name='name_span_destcurrency']").hide();
//			}
//		});
		
	}
}


function validWeight(_this){
	//寄托物重量非空验证
	var weight = $(_this).val();
	if(!weight || weight == null || weight == ""){
		alertError('请填写物品重量');
		return false;
	} 
	var re = /^\d+(\.\d{1})?$/;
	if(!re.test(weight)){
		//$(_this).val('')
		alertError("重量输入有误，只能为正数字或数字一位小数");
		return false;
	}
	if(weight>130||weight<1){
		//$(_this).val('');
		alertError('你托寄的物品已超出重量标准，无法选择快递产品，请致电95338咨询');
		return false;
	}
	if(weight>50){
		alertError('你的物品已超过50公斤，将收取超重费用');
	}
	return true;
}

//判断当前时间是否在截单时间以后
function  isWorkEndTime(workEndTime){
	
	if(null!=workEndTime&&""!=workEndTime){
	//获取当前时间的小时 和分钟数
	var nowDate = new Date();
	var nowHours = nowDate.getHours();
	var nowMinutes = nowDate.getMinutes();
	//当截单时间大于当前时间时  说明未超时
	   if(workEndTime.substr(0,workEndTime.indexOf(":"))>nowHours){
		   return true;
	   }else if(workEndTime.substr(0,workEndTime.indexOf(":"))==nowHours){
		   //通过分钟数进行判断  小时相等 分钟大于当前分钟时  仍然有效
		   if(workEndTime.substr(workEndTime.indexOf(":"),workEndTime.length)>nowMinutes){
			   return true;
		   }else{
			   return false;
		   }
	   }else{
		   //小时数小于截单小时 直接返回
		   return false;
	   }
	   
	}else{
		return false;
	}
}

