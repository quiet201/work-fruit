$(document).ready(function() {
		init();//初始化页面参数
		//添加监听
		listenEvent();
		//获取提交数据
		//subData();
		getCommonImg("11012","N","1");
	});

	function init(){
		var cityInfo=getUrlValueByKey("city");
		var proInfo=getUrlValueByKey("pro");
		var cityParam={
				parentId:"",	
				parentName:"",
				parentCode:""
		}
		if($.trim(cityInfo)!="" ){
			var param=cityInfo.split(",");
			cityParam.parentCode=param[2];
			cityParam.parentId=param[0];
			cityParam.parentName=param[1];
		}else{
			return;
		}
		if( $.trim(proInfo)!=""){
			var proParam=proInfo.split(",");
			$(".province-title").text(proParam[1]);
			$(".city-title").text(param[1]);
		}
		var url="/service/address/newAddr/getNewSubAddress";
		if($.trim(cityParam.parentCode)==""){
			url="/service/address/newAddr/getNewSubAddressByParams";
		}
		$.ajax({
			type : "GET",
			dataType : "json",
			data:cityParam,
			url : url,
			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
			success: function(json){
				if(json.state=="Y"){
					var temp = json.subAddressList;
					/* for(var i=0; i<temp.length-1; i++){
						for(var j=i+1; j<temp.length; j++){
							var n = "";
							if(temp[i].abb>temp[j].abb){
								n = temp[j];
								temp[j] = temp[i];
								temp[i] = n;
							}
						}
					} */
					createNode(temp);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				//alert("服务器连接失败");
			}
		});
	};
	function forwardRoot(id,name,distCode){
		//获取键
		var proInfo=getUrlValueByKey("pro");
		if($.trim(proInfo)=="" ){
			return;
		}else{
			proInfo=proInfo.split(",");
		}
		var nameKey=getCookie("addrName");
		var codeKey=getCookie("addrCode");
		var countyName=getCookie("addrCountyName");
		var countyCode=getCookie("addrCountyCode");
		//设置键值对
		var cityParam=getUrlValueByKey("city");
		if($.trim(cityParam)!=""){
			cityParam=cityParam.split(",");
		}
		var url=getCookie("SET_PAGE_URL")+"?proName="+proInfo[1]+"&proCode="+proInfo[0]+
			"&"+nameKey+"="+cityParam[1]+"&"+codeKey+"="+cityParam[0]+"&"
			+countyName+"="+name+"&"+countyCode+"="+id+"&countDistCode="+distCode;
		if(proInfo[2]){
			url=url+"&proDistCode="+proInfo[2]+"&cityDistCode="+cityParam[2];
		}
		location.href=url;
	};
	function createNode(countyList){
			var countyBuff="";
			$.each(countyList,function(index,data){
				countyBuff=countyBuff+"<li><a href='javascript:void(0)' onclick=forwardRoot('"+data.distCityCode+"','"+data.distCnName+"','"+data.distCode+"')>"+data.distCnName+"</a></li>";
			});
			$("#areaList").empty().html(countyBuff);
	};
	function listenEvent(){
		
	};
	function redirectProviceOrCity(forwardType){
		 var pro=getUrlValueByKey("pro");
		var interType=getCookie("interType");
		if(forwardType){
			location.href="/page/netease/address/city.html?type="+interType+"&pro="+pro;
		}else{
			location.href="/page/netease/address/province.html?type="+interType;
		}
		
	};