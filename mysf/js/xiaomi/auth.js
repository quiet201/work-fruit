$(document).ready(function() {
	var accessToken = getQueryString("access_token");
	var macKey = getQueryString("mac_key");
	var state = getQueryString("state");
	if($.trim(accessToken)!="" &&$.trim(macKey)!="" &&$.trim(state)!=""){
		getXiaomiInfo(accessToken,macKey,state);
	}else{
		location.href = "/commonError.html";
	}	
});

//请求小米授权
function init(state) {
	$("#waitplease").show();
	var mm = {};
	mm.state = state;
	$.ajax({
		type : "get",
		data : mm,
		dataType : "json",
		url : "/service/xiaomi/xiaomiAccess",
		success : function(json) {
			$("#waitplease").hide();
			if(json != null){				
				location.href =json.url;
				return;
			}			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#waitplease").hide();
			location.href = "/commonError.html";
		}
	});
}

/**
 * 获取URL参数
 */
function getUrlParams(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return null;
}

function getQueryString(key){
	//获取地址栏信息
   var url=decodeURI(window.location.href);
   var value="";
   if(url.indexOf("#")!=-1){
      	var str = url.substr(url.indexOf("#")+1,url.length);
     	 strs = str.split("&");
   		for(var i=0;i<strs.length;i++){
     		if(strs[i].split("=")[0]==key){
     			value=unescape(strs[i].split("=")[1]);
     		} 
     	}
   }
   return value;
}

function getXiaomiInfo(accessToken,macKey,state) {
	$.ajax({
		type : "POST",
		data : {'accessToken':accessToken,'macKey':macKey,'state':state},
		dataType : "json",
		url : "/service/xiaomi/getInfo/" + accessToken +"/" + macKey+"/" + state,
		success: function(json){
			location.href = json;
			return;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			location.href = "/commonError.html";
		}
	});
}