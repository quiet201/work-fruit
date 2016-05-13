$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00804");
	//$("#waitplease").show();
	var storeId=getUrlValueByKey("storeId");
	var mylng=getUrlValueByKey("lng");
	var mylat=getUrlValueByKey("lat");
	var distance=getUrlValueByKey("distance");
	
	if($.trim(mylng)==""){
		getStoreListByLocal();
	}else{
		getStoreListByPoint(mylng,mylat,"100",storeId,distance);
	}	
	
});
/**
 * 通过经纬度查询附近网点
 * @param mylng
 * @param mylat
 * @param myrange
 */
function getStoreListByPoint(mylng,mylat,myrange,storeId,distance){
	$("#waitplease").show();
	var params={
			lng		:mylng,	//经度 
			lat		:mylat,	//纬度
			range	:myrange//范围
	};
	$.ajax({
		type : "GET",
		data:params,
		dataType : "json",
		url : "/service/store/storeinfo/findNearStoreListByPoint",
		success: function(json){
			$("#waitplease").hide();
			if(json.state=="Y"){
				var queryParam= json.data;
				$.each(queryParam,function(index,value){
					if(value.storeId==storeId){
						current=value;
					}
				});
				createNode(current,distance);
				getCommonImg("1073","N","1"); 
			}else{
				getCommonImg("1073","N","2"); 
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#waitplease").hide();
			alert("呜呜，没有获取到门店详情~~(>_<)~~");
			getCommonImg("1073","N","3"); 
		}
	});
};
//创建展示信息
function createNode(current,distance){
	if($.trim(current)==""){
		return;
	}
	$("#storeName").html(fillNull(current.name));
	var contextType=current.serviceContent;
	var typesItems="";
	//服务类型
	if($.trim(contextType)!=""){
		contextType=contextType.split(",");
		$.each(contextType,function(index,value){
            if(value=="1"){
				$("#send").show();
			}
			if(value=="2"){
				$("#receiveThing").show();
			}
			if(value=="3"){
				$("#receiveAndSend").show();
			}
			if(value=="5"){
				$("#receiveMoney").show();
			}
            /*if(value=="1"){
				typesItems=typesItems+"<span class='service-ico'><i class='ui-ico-sfi ico-ship-s'></i>寄件服务</span>";
			}
			if(value=="2"){
				typesItems=typesItems+"<span class='service-ico'><i class='ui-ico-sfi ico-get-s'></i>代收快件</span>";
			}
			if(value=="5"){
				typesItems=typesItems+"<span class='service-ico'><i class='ui-ico-sfi ico-charge-s'></i>代收货款</span>";
			}*/
		});
	}
	//$(".service-item").html(typesItems);
	//门店类型
	st=current.storeType;
	var stUrl="/images/xiaomi/200x200-1.png";
	if($.trim(current.isHk)=="1"){
		stUrl="/images/xiaomi/200x200-4.png";
	}else if($.trim(st)!=""){
		if(st=="1"){
			stUrl="/images/xiaomi/200x200-1.png";
		}else if(st=="2"){
			stUrl="/images/xiaomi/200x200-2.png";
		}else{
			stUrl="/images/xiaomi/200x200-1.png";
		}
		st=st-1;
		//stName=storeType[st];
	}
	$("#store_imageUrl").attr("src",stUrl);
	$("#detailAddress").html(fillNull(current.virtualAddr));
	$("#distanceSpan").html(fillNull(distance)+" m");///距离
	$("#addrCode").html(fillNull(current.storeId));
	var telParam=current.telephone;
	if($.trim(telParam)!=""){
		//如果是多个电话存在，只取首个
		if(telParam.indexOf(",")!=-1){
			telParam=telParam.split(",");
			telParam=telParam[0];
		}
		$("#serviceTEL").html(fillNull(telParam));
		if($.trim(telParam)!=""){
			$("#callTEL").attr("href","tel:"+fillNull(telParam));
		}
	}
	$("#serviceTime").html(fillNull(current.serviceTime));
};
function getStoreListByLocal(){
	function getParameter(name){ 
	    var paramStr=location.search; 
	    if(paramStr.length==0)return null; 
	    if(paramStr.charAt(0)!='?')return null; 
	    paramStr=unescape(paramStr); 
	    paramStr=paramStr.substring(1); 
	    if(paramStr.length==0)return null; 
	    var params=paramStr.split('&'); 
	    var p = null;
	    for(var i=0;i<params.length;i++){
	       if(params[i].indexOf(name) >= 0){           
	        p = params[i].split('=');
	        p = p[1];         
	       }
	   }
	   return p;
	}
	var storeId = getParameter("storeId");
	var distance = getParameter("distance"); //距离,km
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/store/storeinfo/detail?store_id="+storeId,
		success: function(json){
			if(json.result){
				$("#store_imageUrl").attr("src",json.result.store_imageUrl);
				var name=json.result.store_name;
				$("#storeName").html(name);
				var serviceType = json.result.service_content_type;
				var storeType = json.result.store_type;
				if(serviceType == "1"){
					$("#send").show();
				}
				else if(serviceType == "2"){
					$("#receiveThing").show();
				}
				else if(serviceType == "3"){
					$("#send").show();
					$("#receiveThing").show();
				}
				if(storeType == "1" || storeType=="3"){
					$("#receiveMoney").show();
				}
				$("#detailAddress").html(json.result.detailAddress.address);
				$("#distanceSpan").html(distance+" 米");
				$("#addrCode").html(json.result.virtualAddr);
				$("#serviceTEL").html(json.result.phone);
				$("#callTEL").attr("href","tel:"+json.result.phone);
				$("#serviceTime").html(json.result.service_time);
 			    //$("#addrCodeInfo").attr("onclick","showAddrCodeInfo('"+json.result.virtualAddr+"')");
//				$("#waitplease").hide();
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("呜呜，没有获取到门店详情~~(>_<)~~");
		}
	});
}
//function showAddrCodeInfo(code){
//	alert("本店地址代码是"+code+
//			"\n\n什么是地址代码?\n\n"+
//			"地址代码可直接作为您的收件地址,寄"+
//			"件时把它填在运单的'收件地址'栏,顺"+
//			"丰会将快件投递到该服务点,无需填写"+
//			"详细地址,有效保护您的隐私.");
//}