
$(document).ready(function (){
	  getCookieds();
	   fillAddress();
	   checkNull();
	   $("#promptMessage").hide();
	   $("#addBut").click(function (){
	   });
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
	   
	   
	   $("#telePhone").change(function(){
		   var telePhone = $("#telePhone").val();
		   if(telePhone != null && telePhone != ""){
			   $("#promptMessage").html("");
			   $("#promptMessage").hide();
		   }
		   checkNull();
		 });
	   
	   $("#checkedOne").click(function (){
		   addCookie();
	   });
	   
	   var destination = $("#destination").html();
	   if(destination != null && destination != "" && destination.length != 0){
		   $("#showclick").hide();
	   }else{
		   $("#showclick").show();
	   }
	   
});

function submitAjax() {
	if(checkPhone()){
		var addressEntity = {
				userName : $("#userName").val(),
				telePhoneNuber : $("#telePhone").val(),
				detailAdress : $("#detailAdress").val(),
				provinceName : $("#provinceName").val(),
				provinceCode : $("#provinceCode").val(),
				cityName : $("#cityName").val(),
				cityCode : $("#cityCode").val(),
				countyName : $("#countyName").val(),
				countyCode : $("#countyCode").val(),
				hasChecked : 2,
				sourceType : 2
			};
			// 数据提交
			$.ajax({
				type : "POST",
				data : addressEntity,
				dataType : "json",
				url : "/service/sendaddress/sendbook/create",
				success : function(data) {
					if(data){ 
						alert(data);
						getCommonImg("1021","N","2");  
					}else{
						tipsDialog("保存成功！");
						$("#addBut").removeAttr("onclick");
//						document.getElementById("addBut").id = "";
						deleteCookie("userNameOne");
						getCommonImg("1021","N","1");  
						setTimeout(function() {
							window.location.href = "address_select.html";
						},80);
					}
				},
				error : function(e) {
					console.log("新增失败...");
					getCommonImg("1021","N","3");  
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


function addCookie(){
	var userName = $("#userName").val();
	var telePhoneNuber = $("#telePhone").val();
    var detailAdress = $("#detailAdress").val();
    var expireDate = new Date(); 
    expireDate.setDate(expireDate.getDate());
    var str = "userNameOne=userNameOne<>" + escape(userName) + "{}telePhoneOne<>" + escape(telePhoneNuber) + "{}detailAdressOne<>" + escape(detailAdress);
    document.cookie = str;// +
}


function getCookieds(){
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
			}
		}
	}
}

function checkPhone(){
	var userName = $("#userName").val();
	   var telePhone = $("#telePhone").val();
	   var areaName = $("#provinceName").val();
	   var detailAdress = $("#detailAdress").val();
	   if(userName == null || userName == ""){
		   $("#promptMessage").show();
		   $("#promptMessage").html("请输入姓名");
		   return false;
	   }
	   if(telePhone == null || telePhone == ""){
		   $("#promptMessage").show();
		   $("#promptMessage").html("请填写手机号");
		   return false;
	   }
	   if(areaName == null || areaName == ""){
		   $("#promptMessage").show();
		   $("#promptMessage").html("请选择所在地区");
		   return false;
	   }
	   if(detailAdress == null || detailAdress == ""){
		   $("#promptMessage").show();
		   $("#promptMessage").html("请填写详细地址");
		   return false;
	   }
//	var telePhone = $("#telePhone").val();
	   var filter=/^(13[0-9]|15[0-9]|18[0-9]|14[7]|17[0-9])\d{8}$/; 
	   if(telePhone.length != 11){
		   $("#promptMessage").show();
		   $("#promptMessage").html("请输入有效的手机号码");
		   return false;
	   }else{
		   if(telePhone != null && telePhone != ""){
			   if(filter.test(telePhone)){
				   return true;
			   }else{
				   $("#promptMessage").show();
				   $("#promptMessage").html("电话号码错误,请重新填写");
				   return false;
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
//    var detailAdress = $("#detailAdress").val(); &&
//	   (detailAdress != null && detailAdress != "")
    if((userName != null && userName != "") &&
		   (telePhone != null && telePhone != "") &&
		   (areaName != null && areaName != "")){
	   $("#addBut").removeClass("ui-btn btn-submit disable");
	   $("#addBut").addClass("ui-btn btn-submit");
    }else{
    	$("#addBut").removeClass("ui-btn btn-submit");
 	   $("#addBut").addClass("ui-btn btn-submit disable");
    }
}

