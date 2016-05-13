var askIdOne = "";

$(document).ready(function (){
	getCookies();
	getCookiedjjs();
	$("#promptMessage").hide();
	var asbkId = getParameter("asbkId")+"";
//	queryOneAjax(asbkId);
	if(asbkId != "" && asbkId != 'null' && asbkId != null){
		queryOneAjax(asbkId);
	}else{
		queryOneAjax(askIdOne);
	}
	fillAddress();
	
	$("#checkedOne").click(function (){
		addCookiejjs();
	   });
	
	 $("#addButton").click(function (){
	   });
	 
	 $("#telePhone").change(function(){
		   var telePhone = $("#telePhone").val();
		   if(telePhone != null && telePhone != ""){
			   $("#promptMessage").html("");
			   $("#promptMessage").hide();
		   }
		   checkNull();
		});
	 setTimeout(function(){
	   var destination1 = $("#destination").html();
	   if(destination1 != null && destination1 != "" && destination1.length != 0){
		   $("#areaName").hide();
	   }else{
		   $("#areaName").show();
	   }
	 }
	   ,100);
	 
	 
	 $("#userName").change(function(){
		   var userName = $("#userName").val();
		   if(userName != null && userName != ""){
			   $("#promptMessage").html("");
			   $("#promptMessage").hide();
		   }
		   checkNull();
	   });
	   $("#provinceName").change(function(){
		   var areaName = $("#provinceName").val();    
		   if(areaName != null && areaName != ""){
			   $("#promptMessage").html("");
			   $("#promptMessage").hide();
		   }
		   checkNull();
	   });
	   $("#detailAdress").change(function(){
		   var detailAdress = $("#detailAdress").val();
		   if(detailAdress != null && detailAdress != ""){
			   $("#promptMessage").html("");
			   $("#promptMessage").hide();
		   }
		   checkNull();
	   });
});

function queryOneAjax(asbkId) {
	// 数据提交
	$.ajax({
		type : "POST",
		data : {asbkId:asbkId},
		dataType : "json",
		url : "/service/sendaddress/sendbook/findonebook/"+asbkId,
		success : function(data) {
			if (data) {
				$("#userName").val(data.userName);
				$("#telePhone").val(data.telePhoneNuber);
				$("#asbkId").val(data.asbkId);
				$("#detailAdress").val(data.detailAdress);
				if(!$("#destination").html()){
					$("#destination").html(data.areaName);
				}
				if(!$("#provinceName").val()){
					$("#provinceName").val(data.provinceName);
					$("#provinceCode").val(data.provinceCode);
					$("#cityName").val(data.cityName);
					$("#cityCode").val(data.cityCode);
					$("#countyName").val(data.countyName);
					$("#countyCode").val(data.countyCode);
				}
				addCookie(data);
				getCommonImg("1028","N","1");
			}else{
				//tipsDialog("查询失败");
				getCommonImg("1028","N","2");
			}
		},
		error : function(e) {
			//tipsDialog("查询失败");
			getCommonImg("1028","N","3");
		}
	});

}

function checkPhone(){
	   var userName = $("#userName").val();
	   var telePhone = $("#telePhone").val();
	   var areaName = $("#provinceName").val();
	   var detailAdress = $("#detailAdress").val();
	   if(userName == null || userName == ""){
//		   alert("请输入姓名");
		   $("#promptMessage").show();
		   $("#promptMessage").html("请输入姓名");
		   return false;
	   }
	   if(telePhone == null || telePhone == ""){
//		   alert("请填写手机号或者固定电话");
		   $("#promptMessage").show();
		   $("#promptMessage").html("请填写手机号");
		   return false;
	   }
	   if(areaName == null || areaName == ""){
//		   alert("请选择所在地区");
		   $("#promptMessage").show();
		   $("#promptMessage").html("请选择所在地区");
		   return false;
	   }
	   if(detailAdress == null || detailAdress == ""){
//		   alert("请填写详细地址");
		   $("#promptMessage").show();
		   $("#promptMessage").html("请填写详细地址");
		   return false;
	   }
//	var telePhone = $("#telePhone").val();
	   var filter=/^(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])\d{8}$/; 
	   if(telePhone.length != 11){
		   $("#promptMessage").show();
//		   alert('请输入有效的手机号码!');
		   $("#promptMessage").html("请输入有效的手机号码");
		   return false;
	   }else{
		   if(telePhone != null && telePhone != ""){
			   if(filter.test(telePhone)){
				   return true;
			   }else{
				   $("#promptMessage").show();
//				   alert("电话号码错误,请重新填写!");
				   $("#promptMessage").html("电话号码错误,请重新填写");
				   return false;
			   }
		   }
	   }
}

function updateAjax() {
	if(checkPhone()){
		// 获取评价类型
		var addressEntity = {
			userName : $("#userName").val(),
			telePhoneNuber : $("#telePhone").val(),
			detailAdress : $("#detailAdress").val(),
			asbkId : $("#asbkId").val(),
			provinceName : $("#provinceName").val(),
			provinceCode : $("#provinceCode").val(),
			cityName : $("#cityName").val(),
			cityCode : $("#cityCode").val(),
			countyName : $("#countyName").val(),
			countyCode : $("#countyCode").val()

		};
		// 数据提交
		$.ajax({
			type : "POST",
			data : addressEntity,
			dataType : "json",
			url : "/service/sendaddress/sendbook/update",
			success : function(data) {
				if($.trim(data)!="N"){
					
//				alert("变更成功!");
					tipsDialog("变更成功");
					$("#addButton").removeAttr("onclick");
//				$("#addButton").attr("disabled","disabled");
//				clearCookie();
					deleteCookie("userNameOne");
					getCommonImg("1022","N","1");
					setTimeout(window.location.href = "address_select.html",80);
				}else{
					tipsDialog("变更失败...");
					getCommonImg("1022","N","2");
				}
			},
			error : function(e) {
				console.log("变更失败...");
				getCommonImg("1022","N","3");
			}
		});
	}
}

/**
 * 选择地址后填充地址数据
 */
function fillAddress(){
	var provinceName = getUrlValueByKey("proName");//省份名称
	var provinceCode = getUrlValueByKey("proCode");//省份编码
	var cityName = getUrlValueByKey("destName");//城市名称
	var cityCode = getUrlValueByKey("destCode");//城市编码
	var contyName = getUrlValueByKey("dcountyName");//区县名称
	var contyCode = getUrlValueByKey("dcountyCode");//区县编码
	var destination = convertNull(provinceName) + " "
	+ convertNull(cityName) + " " + convertNull(contyName);
	if($.trim(destination) != null && $.trim(destination) != ""){
		$("#destination").text(destination); //寄件人
		$("#provinceName").val(provinceName);
		$("#provinceCode").val(provinceCode);
		$("#cityName").val(cityName);
		$("#cityCode").val(cityCode);
		$("#countyName").val(contyName);
		$("#countyCode").val(contyCode);
	}
}

function addCookie(data){
	var strCookie = "";
	strCookie = "asbkIdthis=" + data.asbkId;
//	strCookie = "userName=" + escape(data.userName) + ";telePhoneNuber="  + data.telePhoneNuber + ";areaName=" + escape(data.areaName) +
//	";asbkId=" + data.asbkId + ";provinceName=" + escape(data.provinceName) + ";provinceCode=" + data.provinceCode + ";cityName=" +
//	escape(data.cityName) + ";cityCode=" + data.cityCode + ";countyName=" + escape(data.countyName) + ";countyCode=" + data.countyCode +
//	";detailAdress=" + escape(data.detailAdress);
	document.cookie = strCookie;
}

function getCookies(){
	var cookieOne = document.cookie;
	if(cookieOne != ""){
		var arrStr = cookieOne.split(";"); 
		for(var i = 0;i < arrStr.length;i ++){ 
			var temp = arrStr[i].split("="); 
			if($.trim(temp[0]) == 'asbkIdthis'){
				askIdOne = unescape(temp[1]);
				$("#asbkId").val(unescape(temp[1]));
			}
		}
	}
}


function addCookiejjs(){
	var userName = $("#userName").val();
	var telePhoneNuber = $("#telePhone").val();
    var detailAdress = $("#detailAdress").val();
    var askId = $("#asbkId").val();
    var expireDate = new Date(); 
    expireDate.setDate(expireDate.getDate());
    var str = "userNameOne=userNameOne<>" + escape(userName) + "{}telePhoneOne<>" + escape(telePhoneNuber) + "{}detailAdressOne<>" + escape(detailAdress) +"{}askId<>"+escape(askId);
    document.cookie = str;// +
}


function getCookiedjjs(){
	var cookieOne = document.cookie;
	if(cookieOne != ""){
		var arrStr = cookieOne.split(";"); 
		for(var i = 0;i < arrStr.length;i ++){ 
			var temp = arrStr[i].split("="); 
			var listr = unescape(temp[1]).split("{}");
			for(var j = 0;j<listr.length;j++){
				var valu = listr[j].split("<>");
				if(unescape(valu[0]) == "userNameOne"){
					$("#userName").val(unescape(valu[1]));
				}
				if(unescape(valu[0]) == "telePhoneOne"){
					$("#telePhone").val(unescape(valu[1]));
				}
				if(unescape(valu[0]) == "detailAdressOne"){
					$("#detailAdress").val(unescape(valu[1]));
				}
				if(unescape(valu[0]) == "askId"){
					$("#asbkId").val(unescape(valu[1]));
				}
			}
		}
	}
}


//清除所有cookie
function clearCookie(){ 
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
	if (keys) { 
	for (var i = keys.length; i--;) 
	document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
	} 
} 

function checkNull(){
	var userName = $("#userName").val();
    var telePhone = $("#telePhone").val();
    var areaName = $("#provinceName").val();
    var detailAdress = $("#detailAdress").val();
    if((userName != null && userName != "") &&
		   (telePhone != null && telePhone != "") &&
		   (areaName != null && areaName != "") &&
		   (detailAdress != null && detailAdress != "")){
	   $("#addButton").removeClass("ui-btn btn-submit disable");
	   $("#addButton").addClass("ui-btn btn-submit");
    }else{
    	$("#addButton").removeClass("ui-btn btn-submit");
 	   $("#addButton").addClass("ui-btn btn-submit disable");
    }
}


//如果对象为空（null），都已""字符替换，
function convertNull(obj){
	return obj?$.trim(obj):"";
};
