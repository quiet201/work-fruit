$(document).ready(function (){
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});
function init(){
	listem();
	var asbkId = getUrlValueByKey("asbkId");
	//首次进入
	if(asbkId != "" && asbkId != 'null' && asbkId != null){
		setCookie("asbkId",asbkId);
		queryOneAjax(asbkId);
	}else{
		asbkId=getCookie("asbkId");
		var addressObject=getCookie("currentAddress");
		//这是是
		if($.trim(addressObject)){
			addressObject=$.parseJSON(addressObject);
			setParams(addressObject);
		}else{
			queryOneAjax(asbkId);
		}
	}
	
	//添加监听
	$("#setDefaultAddress").unbind().bind("click",function(){
		if(checkPhone()){
			var defaultAdd=$("#asbkId").val();
			setDefaultAddress(defaultAdd);
		} 
	});
};


/*设置为默认地址簿*/
function setDefaultAddress(asbkId){
	if($.trim(asbkId)==""){
		alert("更新ID号不存在");
		return;
	}
	$("#waitplease").show();
	$.ajax({
		type : "POST",
		data : {asbkId:asbkId},
		dataType : "json",
		url : "/service/sendaddress/sendbook/updefault/"+asbkId,
		success : function(data) {
			$("#waitplease").hide();
//			alert("设为默认地址成功");
			if($.trim(data)!="N"){
				commontipsDialog("设为默认地址成功");
				getCommonImg("1024","N","1");
				
			}else{
				commontipsDialog("默认设置失败...");
				getCommonImg("1024","N","2");
			}
		},
		error : function(e) {
			$("#waitplease").hide();
			commontipsDialog("默认设置失败...");
			console.log("默认设置失败...");
			getCommonImg("1024","N","3");
		} 
	});
};
function getParams(){
	var tempAreaName="";
	//参数
	if($.trim($("#destination").html())=="请选择地区"){
		tempAreaName="";
	}else{
		tempAreaName=$.trim($("#destination").html());
	}
	var queryParam={
				userName : $("#userName").val(),
				telePhoneNuber : $("#telePhone").val(),
				detailAdress : $("#detailAdress").val(),
				asbkId : $("#asbkId").val(),
				provinceName : $("#provinceName").val(),
				provinceCode : $("#provinceCode").val(),
				cityName : $("#cityName").val(),
				cityCode : $("#cityCode").val(),
				countyName : $("#countyName").val(),
				countyCode : $("#countyCode").val(),
				areaName	:tempAreaName
	};
	return queryParam;
};
function setParams(data){
	if (data) {
		$("#userName").val(data.userName);
		$("#telePhone").val(data.telePhoneNuber);
		$("#asbkId").val(data.asbkId);
		$("#detailAdress").val(data.detailAdress);
		if($.trim(getUrlValueByKey("destCode"))!="" && "请选择地区"!=$.trim(data.areaName)){
			
			$("#destination").html(data.areaName).removeClass("placeholder");
		}
		
		 var destCode=getUrlValueByKey("destCode");
		 //如果地址栏中没有获取新的地址数据，就以data为主，否则以地址栏的参数为主
		if($.trim(destCode)==""){
			$("#provinceName").val(data.provinceName);
			$("#provinceCode").val(data.provinceCode);
			$("#cityName").val(data.cityName);
			$("#cityCode").val(data.cityCode);
			$("#countyName").val(data.countyName);
			$("#countyCode").val(data.countyCode);
		}else{
			var provinceName = getUrlValueByKey("proName");//省份名称
			var provinceCode = getUrlValueByKey("proCode");//省份编码
			var cityName = getUrlValueByKey("destName");//城市名称
			var cityCode = getUrlValueByKey("destCode");//城市编码
			var contyName = getUrlValueByKey("dcountyName");//区县名称
			var contyCode = getUrlValueByKey("dcountyCode");//区县编码
			var destination = fillNull(provinceName) + " "
			+ fillNull(cityName) + " " + fillNull(contyName);
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
	}
};
function listem(){
	$("#checkedOne").unbind().bind("click",function(){
		var queryParam=getParams();
		setCookie("currentAddress",JSON.stringify(queryParam));
		getAddressDetail("/page/common/address/province.html?addrName=destName&addrCode=destCode&addrCountyName=dcountyName&addrCountyCode=dcountyCode&type=3&gatChild=-1");
	});
	
	$("#saveEditAddress").unbind().bind("click",function(){
		updateAjax();
	});
};

function queryOneAjax(asbkId) {
	$("#waitplease1").show();
	// 数据提交
	$.ajax({
		type : "POST",
		data : {asbkId:asbkId},
		dataType : "json",
		url : "/service/sendaddress/sendbook/findonebook/"+asbkId,
		success : function(data) {
			$("#waitplease1").hide();
			if (data) {
				$("#userName").val(data.userName);
				$("#telePhone").val(data.telePhoneNuber);
				$("#asbkId").val(data.asbkId);
				$("#detailAdress").val(data.detailAdress);
				if($.trim(data.areaName)!=""){
					
					$("#destination").html(data.areaName).removeClass("placeholder");
				}
				if(!$("#provinceName").val()){
					$("#provinceName").val(data.provinceName);
					$("#provinceCode").val(data.provinceCode);
					$("#cityName").val(data.cityName);
					$("#cityCode").val(data.cityCode);
					$("#countyName").val(data.countyName);
					$("#countyCode").val(data.countyCode);
				}
				/*JSON.stringify(queryParam);
				$.parseJSON(queryParam);*/
				getCommonImg("1028","N","1");
			}else{
				commontipsDialog("查询失败");
				getCommonImg("1028","N","2");
			}
		},
		error : function(e) {
			$("#waitplease1").hide();
			console.log("查询失败...");
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
		   alertError("请输入姓名");
		   //$("#promptMessage").show();
		   //$("#promptMessage").html("请输入姓名");
		   return false;
	   }
	   if(telePhone == null || telePhone == ""){
		   alertError("请填写手机号或固定电话");
		   //$("#promptMessage").show();
		   //$("#promptMessage").html("请填写手机号");
		   return false;
	   }
	   if(areaName == null || areaName == ""){
		   alertError("请选择所在地区");
		   //$("#promptMessage").show();
		   //$("#promptMessage").html("请选择所在地区");
		   return false;
	   }
	   if(detailAdress == null || detailAdress == ""){
		   alertError("请填写详细地址");
		   //$("#promptMessage").show();
		   //$("#promptMessage").html("请填写详细地址");
		   return false;
	   }
	   var filter=/^(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])\d{8}$/; 
	   var filterGh=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,4}))?$/; 
	   if(!filter.test(telePhone)){
		   if(!filterGh.test(telePhone)){
			   alertError("请正确填写手机或固话，固话格式：区号(3-4位)-号码(7-8位)-分机号(3-4位)");
			   return false;
		   }
	   }

	   return true;
}

function updateAjax() {
	if(checkPhone()){
		
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
		
		 var add = $("#destination").text()+$("#detailAdress").val();
			
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
			
			
			
			if(length>150){
				$("#waitplease").hide();
				alertError("亲，地址不能超过50个字哦~");
				return;
			}else{
		// 数据提交
		$.ajax({
			type : "POST",
			data : addressEntity,
			dataType : "json",
			url : "/service/sendaddress/sendbook/update",
			success : function(data) {
				if($.trim(data)!="N"){
					
					commontipsDialog("变更成功");
					$("#addButton").removeAttr("onclick");
					deleteCookie("userNameOne");
					getCommonImg("1022","N","1");
					setTimeout(location.href = "/page/alipay/addressbook/receive/address_menber2.html",80);
				}else{
			 		commontipsDialog("变更失败");
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
}


function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2500);
}