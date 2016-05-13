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
	if(callbackUrl.indexOf("?")!=-1 && callbackUrl.indexOf("callback",0) < 0){
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
	exp.setTime(exp.getTime() +3*60*1000);
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
	$.post("/service/alipay/searchFeeAndTime",param,function(result){
		if(result && result.length>0){
			$("#waitplease").hide();
			//deleteCookie("queryDto");
			createDom(result,param.srcName);
			$('#testPosition001').show();
		}else {
			var goodsWeigth = param.goodsWeigth;
			$("#waitplease").hide();
			$("#conmment-tips").show();
			/*setTimeout(function() {
				$("#conmment-tips").fadeOut();
			}, 1000);*/
			alertError('系统繁忙');
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
	$(".tbody").empty().append(buff);
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
	var buff="";
	$.each(data,function(i,value){
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
		var tips=data[i].limitTypeCode=="T4"?"为客户提供的全国各省、直辖市、自治区及港澳台地区的高标准门到门快递服务。时效：中国大陆地区互寄：1-2天，部分偏远地区加0.5-1天。服务范围为中国大陆地区、港澳台地区，韩国，日本，新加坡，马来西亚，美国，泰国，越南，澳大利亚。"
				:"顺丰为您寄递非紧急物品而设计的经济型快递服务。时效：中国大陆地区互寄：2-3天，部分偏远地区加1-2天；中国大陆地区至港澳地区：2.5-3.5天，部分偏远地区加0.5-1天。服务范围：中国大陆地区互寄，中国大陆地区寄往香港、澳门地区。";
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
		
		buff=buff+"<div class='tr-box' data-toggle='show-explain'><dl class='tr-row'>"+
		"<dd class='td'>"+fillNull(productType)+"</dd>"+
		"<dd class='td'><p>"+fillNull(date)+"</p><p class='hot'>"+fillNull(time)+"</p></dd>"+
		"<dd class='td'><span class='hot'>"+fillNull(priceAndUnit)+"</span></dd>"+
		"<dd class='td'><i class='ui-ico-sfi ico-arrow'></i></dd></dl>"+
		"<div class='explain'>"+fillNull(tips)+"</div></div>";
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
	slideRoatInfo(true);
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
		"channelType":"2",
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
function getCommonImg(code,flag,result){
	$.post("/service/common/img/"+code+"/"+flag+"/"+result,null,null,"json"); 
}