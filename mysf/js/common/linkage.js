//以下是省市区联动控件,看不懂就别乱改咯
var weixin_order_pram = {};
//记录返回节点
weixin_order_pram.backId = new Array();
//记录收寄状态  s-寄件,r-收件
weixin_order_pram.sorr = "s";
//寄件人省市区
weixin_order_pram.pr = {};
weixin_order_pram.ct = {};
weixin_order_pram.tw = {};
//收件人省市区
weixin_order_pram.pr_r = {};
weixin_order_pram.ct_r = {};
weixin_order_pram.tw_r = {};
//省市区临时缓存区
weixin_order_pram.temppr = {};
weixin_order_pram.tempct = {};
weixin_order_pram.temptw = {};
//用户登录状态  0未登录 , 2已登录
weixin_order_pram.loginStatus = "2";
//设置默认地址
weixin_order_pram.useAddress = {};
weixin_order_pram.useAddress_r = {};
weixin_order_pram.useAddressBook = {};
weixin_order_pram.useAddressBook_r = {};

//初始化检查是否绑定,初始化热点城市和省
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
			weixin_order_pram.hotCityData = temp;
			
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
			weixin_order_pram.provinceData = temp;
			init.call();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
		}
	});
});

/**
 * 主页点击选择地址
 */
function rootClick(){
	//设置返回页面
	weixin_order_pram.backId.push("root");
	//显示hot页面
	$(".topPanel").hide("slow");
	//添加控件
	var domstr = '<!-- 热门城市 -->'+
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
	$("#root").after(domstr);
	//设置热点城市和省
	div_display("hotCityData",weixin_order_pram.hotCityData);
	div_display("provinceData",weixin_order_pram.provinceData);
	$("#hot").show("slow");
}

/**
 * hot页面点击选择省
 */
function hotTopr(){
	//设置返回页面
	weixin_order_pram.backId.push("hot");
	//显示选择省页面
	$(".topPanel").hide("slow");
	$("#pr").show("slow");
	//重新计算新页面高度
	//weixin_display("pr");
}

/**
 * hot页面点击选择热点城市
 */
function hotTotw(name){
	//清空区的数据
	$("#areaData").empty();
	//设置返回页面
	weixin_order_pram.backId.push("hot");
	//显示选择区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定省市
	$(weixin_order_pram.hotCityData).each(function(){
		if(this.name == name){
			var strArray = this.parentId.split("/");
			weixin_order_pram.temppr = {name:strArray[1],id:strArray[0]};
			weixin_order_pram.tempct = {name:this.name,id:this.id};
		}
	});
	//根据点击的市的id查询区,构造选择区页面
	var parentId = weixin_order_pram.tempct.id+"/"+weixin_order_pram.tempct.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
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
			weixin_order_pram.areaData = temp;
			div_display("areaData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
		}
	});
}

/**
 * 选择省页面点击一个省
 */
function prToct(name){
	//清空市的数据
	$("#cityData").empty();
	//设置返回页面
	weixin_order_pram.backId.push("pr");
	//显示选择区市
	$(".topPanel").hide("slow");
	$("#ct").show("slow");
	//确定省
	$(weixin_order_pram.provinceData).each(function(){
		if(this.name == name){
			weixin_order_pram.temppr = {name:this.name,id:this.id};
		}
	});
	//根据点击的省的id查询区,构造选择市页面
	var parentId = weixin_order_pram.temppr.id+"/"+weixin_order_pram.temppr.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
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
			weixin_order_pram.cityData = temp;
			div_display("cityData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
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
	weixin_order_pram.backId.push("ct");
	//显示选择区页面
	$(".topPanel").hide("slow");
	$("#tw").show("slow");
	//确定市
	$(weixin_order_pram.cityData).each(function(){
		if(this.name == name){
			weixin_order_pram.tempct = {name:this.name,id:this.id};
		}
	});
	//根据点击的市的id查询区,构造选择区页面
	var parentId = weixin_order_pram.tempct.id+"/"+weixin_order_pram.tempct.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
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
			weixin_order_pram.areaData = temp;
			div_display("areaData",temp);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器连接失败");
		}
	});
}

/**
 * 在选择区的页面点击一个区
 */
function twToroot(name){
	//确定区
	$(weixin_order_pram.areaData).each(function(){
		if(this.name == name){
			weixin_order_pram.temptw = {name:this.name,id:this.id};
		}
	});
	//提交值赋值
	if(weixin_order_pram.sorr == "s"){
		weixin_order_pram.pr = weixin_order_pram.temppr;
		weixin_order_pram.ct = weixin_order_pram.tempct;
		weixin_order_pram.tw = weixin_order_pram.temptw;
	}else{
		weixin_order_pram.pr_r = weixin_order_pram.temppr;
		weixin_order_pram.ct_r = weixin_order_pram.tempct;
		weixin_order_pram.tw_r = weixin_order_pram.temptw;
	}
	//root页面地址显示改变
	var user_show = weixin_order_pram.temppr.name + " " + weixin_order_pram.tempct.name + " " + weixin_order_pram.temptw.name;
	$("#user_show_all").val(user_show);
	//返回页面清空
	weixin_order_pram.backId = new Array();
	//回到主页面
	$(".topPanel").hide("slow");
	$("#root").show("slow");
	$(".toDelete").remove();
}

/**
 * 点击返回按钮
 */
function callbackClick(){
	$(".topPanel").hide("slow");
	var div_id = weixin_order_pram.backId.pop();
	$("#"+div_id).show("slow");
	if(weixin_order_pram.backId.length == 0){
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
 * 设置地址
 */
function setAddress(json){
	//省
	var province = json.province;
	//市
	var city = json.city;
	//区
	var district = json.district;
	//确定省
	var flag = "false";
	$(weixin_order_pram.provinceData).each(function(){
		if(province.indexOf(this.name) != -1 || this.name.indexOf(province) != -1){
			weixin_order_pram.temppr = {name:this.name,id:this.id};
			flag = "true";
		}
	});
	$(weixin_order_pram.hotCityData).each(function(){
		if(province.indexOf(this.name) != -1 || this.name.indexOf(province) != -1){
			weixin_order_pram.temppr = {name:this.name,id:this.id};
			flag = "true";
		}
	});
	if(flag == "false"){
		alert("对不起该地址不在我们的配送范围,请手动选择地址");
		return;
	}
	//根据点击的省的id查询区,构造选择市页面
	var parentId = weixin_order_pram.temppr.id+"/"+weixin_order_pram.temppr.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
		},
		url : "/service/address/data/city",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			weixin_order_pram.cityData = json.cityData;
			//确定市
			var flag = "false";
			$(weixin_order_pram.cityData).each(function(){
				if(city.indexOf(this.name) != -1 || this.name.indexOf(city) != -1){
					weixin_order_pram.tempct = {name:this.name,id:this.id};
					flag = "true";
				}
			});
			if(flag == "false"){
				alert("对不起该地址不在我们的配送范围,请手动选择地址");
				return;
			}
			//根据点击的市的id查询区,构造选择区页面
			var parentId = weixin_order_pram.tempct.id+"/"+weixin_order_pram.tempct.name;
			$.ajax({
				type : "GET",
				dataType : "json",
				data:{
					parentId: encodeURI(parentId)
				},
				url : "/service/address/data/area",
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				success: function(json){
					weixin_order_pram.areaData = json.areaData;
					//确定区
					var flag = "false";
					$(weixin_order_pram.areaData).each(function(){
						if(district.indexOf(this.name) != -1 || this.name.indexOf(district) != -1){
							weixin_order_pram.temptw = {name:this.name,id:this.id};
							flag = "true";
						}
					});
					if(flag == "false"){
						alert("对不起该地址不在我们的配送范围,请手动选择地址");
						return;
					}
					//提交值赋值
					if(weixin_order_pram.sorr == "s"){
						weixin_order_pram.pr = weixin_order_pram.temppr;
						weixin_order_pram.ct = weixin_order_pram.tempct;
						weixin_order_pram.tw = weixin_order_pram.temptw;
					}else{
						weixin_order_pram.pr_r = weixin_order_pram.temppr;
						weixin_order_pram.ct_r = weixin_order_pram.tempct;
						weixin_order_pram.tw_r = weixin_order_pram.temptw;
					}
					//root页面地址显示改变
					var user_show = weixin_order_pram.temppr.name + " " + weixin_order_pram.tempct.name + " " + weixin_order_pram.temptw.name;
					$("#user_show_all").val(user_show);
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
				}
			});
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});			
}

/**
 * 设置地址数据
 */
function setInfo(json,addressType){
	//设置默认地址
	if(addressType == 'r'){
		if(json){
			weixin_order_pram.useAddress_r = json;
		}
		//设置省市区
		weixin_order_pram.pr_r = {name:json.provinceName,id:json.countyId};
		weixin_order_pram.ct_r = {name:json.cityName,id:json.cityId};
		weixin_order_pram.tw_r = {name:json.countyName,id:json.countyId};
	}else{
		if(json){
			weixin_order_pram.useAddress = json;
		}
		//设置省市区
		weixin_order_pram.pr = {name:json.provinceName,id:json.countyId};
		weixin_order_pram.ct = {name:json.cityName,id:json.cityId};
		weixin_order_pram.tw = {name:json.countyName,id:json.countyId};
	}
	//设置填写的各个值
	$("#user_name").val(json.fullname);
	var mobile =""+json.mobile; //手机
	if( /\s*null\s*/.test(mobile)){
		mobile =""; 
	}
	var phone = ""+json.phone; //电话
	if(/\s*null\s*/.test(phone)){
		phone="";
	}
	if(isMobel(mobile)){
	    $("#user_pno").val(mobile); //手机号码
	}else{
		$("#user_pno").val(phone);//电话
	}	
	$("#user_address").val(json.address);
	$("#user_show_all").val(json.provinceName + " " + json.cityName + " " + json.countyName);
	
}

//是否是正确的手机号码
function isMobel(value) {  
	if(/^13\d{9}$/g.test(value)||/^14[5,7]\d{8}$/g.test(value)||(/^15[0-35-9]\d{8}$/g.test(value))||  
		(/^18[0-35-9]\d{8}$/g.test(value))  || (/^17\d{9}$/g.test(value)) ){    
		return true;  
	}else{  
        return false;  
	}  
}

/**
 * 保存寄件人地址地址数据
 */
function saveInfo_s(callback){
	var user_name = $("#user_name").val(); //用户姓名
    if(!user_name || $.trim(user_name) == ""){
    	alert("请填写用户姓名");
    	return false;
    }
    var user_pno = $("#user_pno").val(); //用户电话号码
    if(!/^1[0-9]{10}$/.test(user_pno)
    		&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}$/.test(user_pno)
    		&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}-[0-9]{1,5}$/.test(user_pno)
    ){
    	alert("请填写正确的手机或固话号码,固话号码的格式为:区号-号码-分机号");
		return false;
	}
    var pr_name = weixin_order_pram.pr.name; //省名称
    if(!pr_name){
    	alert("请选择地址!");
    	return false;
    }
    var ct_name = weixin_order_pram.ct.name; //市名称
    if(!ct_name){
    	alert("请选择地址!");
    	return false;
    }
    var tw_name = weixin_order_pram.tw.name; //区名称
    if(!tw_name){
    	alert("请选择地址!");
    	return false;
    }
    var pr_id = weixin_order_pram.pr.id;	//省id
    if(!pr_id){
    	alert("请选择地址!");
    	return false;
    }
    var ct_id = weixin_order_pram.ct.id;	//市id
    if(!ct_id){
    	alert("请选择地址!");
    	return false;
    }
    var tw_id = weixin_order_pram.tw.id;	//区id
    if(!tw_id){
    	alert("请选择地址!");
    	return false;
    }
    var user_address = $("#user_address").val(); //用户详细地址
    if(!user_address || $.trim(user_address) == ""){
    	alert("请填写详细地址");
    	return false;
    }
	var mm = {};
	mm.nation ="中国";										//中国[写死]
	mm.address = $("#user_address").val(); 					//西乡社区1234号[详细地址]
	mm.addressType = "S";									//S寄件人地址,R收件人地址
	mm.cityId = weixin_order_pram.ct.id;					//755[必填]
	mm.cityName = weixin_order_pram.ct.name;				//深圳市[必填]
	mm.company	= "";										//[可以不填]
	mm.countyId = weixin_order_pram.tw.id;					//宝安区[必填]
	mm.countyName = weixin_order_pram.tw.name;				//宝安区[必填]
	mm.extnumber  = "";										//[不知道是个啥反正没有填]	
	mm.fullname = 	$("#user_name").val();					//孔为佳[必填]
	mm.userAddressId = weixin_order_pram.useAddress.userAddressId;	//0FB412F7F04B4BAE96ED5AF50CC96E94[必填,保持使用地址原样userAddressId]
	mm.isDefault = weixin_order_pram.useAddress.isDefault;	//[必填,保持使用地址原样]
	mm.mobile = $("#user_pno").val();						//15013553621[必填,手机号码]
	mm.provinceId = weixin_order_pram.pr.id;				//440 [必填]
	mm.provinceName = weixin_order_pram.pr.name;			//广东 [必填]
	$.ajax({
		type : "POST",
		data : mm,
		dataType : "json",
		url : "/service/addrbook/userAddress/save",
		success: function(json){
			weixin_order_pram.useAddress.userAddressId = json;
			if(json == "-1"){
				alert("保存地址薄信息失败");
				return;
			}
			if(callback){
				callback.call();
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
	return true;
}

/**
 * 保存收件人地址地址数据
 */
function saveInfo_r(callback){
	var user_name = $("#user_name").val(); //用户姓名
    if(!user_name  || $.trim(user_name) == ""){
    	alert("请填写用户姓名");
    	return false;
    }
    var user_pno = $("#user_pno").val(); //用户[手机固话]号码
    if(!/^1[0-9]{10}$/.test(user_pno)
    		&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}$/.test(user_pno)
    		&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}-[0-9]{1,5}$/.test(user_pno)
    ){
    	alert("请填写正确的手机或固话号码,固话号码的格式为:区号-号码-分机号");
		return false;
	}
    var pr_name = weixin_order_pram.pr_r.name; //省名称
    if(!pr_name){
    	alert("请选择地址!");
    	return false;
    }
    var ct_name = weixin_order_pram.ct_r.name; //市名称
    if(!ct_name){
    	alert("请选择地址!");
    	return false;
    }
    var tw_name = weixin_order_pram.tw_r.name; //区名称
    if(!tw_name){
    	alert("请选择地址!");
    	return false;
    }
    var pr_id = weixin_order_pram.pr_r.id;	//省id
    if(!pr_id){
    	alert("请选择地址!");
    	return false;
    }
    var ct_id = weixin_order_pram.ct_r.id;	//市id
    if(!ct_id){
    	alert("请选择地址!");
    	return false;
    }
    var tw_id = weixin_order_pram.tw_r.id;	//区id
    if(!tw_id){
    	alert("请选择地址!");
    	return false;
    }
    var user_address = $("#user_address").val(); //用户详细地址
    if(!user_address || $.trim(user_address) == ""){
    	alert("请填写详细地址");
    	return false;
    }
	var mm = {};
	mm.nation ="中国";										//中国[写死]
	mm.address = $("#user_address").val(); 					//西乡社区1234号[详细地址]
	mm.addressType = "R";									//S寄件人地址,R收件人地址
	mm.cityId = weixin_order_pram.ct_r.id;					//755[必填]
	mm.cityName = weixin_order_pram.ct_r.name;				//深圳市[必填]
	mm.company	= "";										//[可以不填]
	mm.countyId = weixin_order_pram.tw_r.id;				//宝安区[必填]
	mm.countyName = weixin_order_pram.tw_r.name;			//宝安区[必填]
	mm.qh  = "";											//[区号]	
	mm.phone  = "";											//[固定电话号码]	
	mm.extnumber  = "";										//[分机号]
	mm.fullname = 	$("#user_name").val();					//收件人姓名[必填]
	mm.userAddressId = weixin_order_pram.useAddress_r.userAddressId;	//0FB412F7F04B4BAE96ED5AF50CC96E94[必填,保持使用地址原样userAddressId]
	mm.isDefault = weixin_order_pram.useAddress_r.isDefault;	//[必填,保持使用地址原样]
	mm.mobile = $("#user_pno").val();						//15013553621[必填,手机号码]
	mm.provinceId = weixin_order_pram.pr_r.id;				//440 [必填]
	mm.provinceName = weixin_order_pram.pr_r.name;			//广东 [必填]  
	$.ajax({
		type : "POST",
		data : mm,
		dataType : "json",
		url : "/service/addrbook/userAddress/save",
		success: function(json){
			weixin_order_pram.useAddress_r.userAddressId = json;
			if(json == "-1"){
				alert("保存地址薄信息失败");
				return;
			}
			if(callback){
				callback.call();
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
	return true;
}

/**
 * 以下为html5代码,获取地理位置
 */
function getLocation() {
	//检查浏览器是否支持地理位置获取
	if (navigator.geolocation) {
		//若支持地理位置获取,成功调用showPosition(),失败调用showError
		dialog("正在努力获取位置...");
		var config = {enableHighAccuracy:true,timeout:5000,maximumAge:30000};
		navigator.geolocation.getCurrentPosition(showPosition, showError,config);
	} else {
		//alert("Geolocation is not supported by this browser.");
		alert("定位失败,用户已禁用位置获取权限");
	}
}

/**
 * 获取地址位置成功
 */
function showPosition(position) {
	closeDialog();
	//获得经度纬度
	var x = position.coords.latitude;	//纬度
	var y = position.coords.longitude;	//经度
	//配置Baidu Geocoding API
	var url = "http://api.map.baidu.com/geocoder/v2/?ak=E6f6f20e7e9e3dbc485672feba6294d9"+
			"&callback=renderReverse"+
			"&location="+x+","+y+
			"&output=json"+
			"&pois=0";
	//jsonp方式跨域调用
	/**
	 * 相应数据实例
		{"status":0,
		"result":{
			"location":{"lng":114.057868,"lat":22.543098999645},
			"formatted_address":"广东省深圳市福田区福华一路138",
			"business":"新洲,购物公园,香蜜湖",
			"addressComponent":{
				"city":"深圳市",
				"district":"福田区",
				"province":"广东省",
				"street":"福华一路",
				"street_number":"138"
			},
			"cityCode":340}
		}
	 */
	$.ajax({
		type : "GET",
		dataType : "jsonp",
		url : url,
		success: function(json){
			if(json==null || typeof(json)=="undefined"){
				return;
			}
			if(json.status != "0"){
				return;
			}
			setAddress(json.result.addressComponent);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("[x:"+x+",y:"+y+"]地址位置获取失败,请手动选择地址");
		}
	});
}

/**
 * 获取地址位置失败[暂不处理]
 */
function showError(error) {
	switch (error.code) {
	case error.PERMISSION_DENIED:
		closeDialog();
		alert("定位失败,用户拒绝请求地理定位");
		//x.innerHTML = "User denied the request for Geolocation.[用户拒绝请求地理定位]"
		break;
	case error.POSITION_UNAVAILABLE:
		closeDialog();
		alert("定位失败,位置信息是不可用");
		//x.innerHTML = "Location information is unavailable.[位置信息是不可用]"
		break;
	case error.TIMEOUT:
		closeDialog();
		alert("定位失败,请求获取用户位置超时");
		//x.innerHTML = "The request to get user location timed out.[请求获取用户位置超时]"
		break;
	case error.UNKNOWN_ERROR:
		closeDialog();
		alert("定位失败,定位系统失效");
		//x.innerHTML = "An unknown error occurred.[未知错误]"
		break;
	}
}