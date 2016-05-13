$(document).ready(function() {
	init();//初始化页面参数
	//添加监听
	listenEvent();
	//获取提交数据
	//subData();
	getCommonImg("11011","N","1");
});

function init(){
	getCityList();
};

//内陆地区，省份为必填参数
function getCityList(){
	var proParam={
			parentId:"",	
			parentName:""
	}
	var gatAddr=getUrlValueByKey("gat");
	var proInfo=getUrlValueByKey("pro");
	//如果是港澳台地区
	/* if($.trim(gatAddr)!=""){
		var tempPro=setGATDom(gatAddr);
		if($.trim(tempPro)!=""){
			tempPro=tempPro.split(",");
			proParam.parentId=tempPro[0];
			proParam.parentName=tempPro[1];
		}else{
			return;
		}
	}else{//内陆 */
		if($.trim(proInfo)!=""){
				var param=proInfo.split(",");
				$(".province-title").text(param[1]);
				proParam.parentId=param[2];
				proParam.parentName=param[1];
		}else{
				return;
		}
//	}
	var urlParam="/service/address/newAddr/getNewSubAddress";
	if(gatAddr){
		urlParam="/service/address/newAddr/getNewSubAddress";
		proParam.gatCity=gatAddr;
	}
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentCode:proParam.parentId
		},
		url :urlParam,
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
				createNode(temp,proInfo);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("服务器连接失败");
		}
	});
}
function setGATDom(addr){
	var temp = new Array();
	temp[0] ={abb:"cn",id:"986",name:"中国大陆",parentId:"986/中国大陆",spell:"china"};
	temp[1] ={abb:"hk",id:"852",name:"香港",parentId:"852/香港",spell:"hongkong"};
	temp[2] ={abb:"mc",id:"853",name:"澳门",parentId:"853/澳门",spell:"macao"};
	temp[3] ={abb:"tw",id:"886",name:"台湾",parentId:"886/台湾",spell:"taiwan"};
	var addrParam="";
	$.each(temp,function(index,data){
		if(addr == data.name){
			addrParam = data.id+","+data.name;
		}
	});
	return addrParam;
};
function createNode(cityList,proInfo){
		var cityBuff="";
		$.each(cityList,function(index,data){
			cityBuff=cityBuff+"<li><a href='/page/tencent/address/county.html?city="+data.distCityCode+","+data.distCnName+","+data.distCode+"&pro="+proInfo+"'>"+data.distCnName+"</a></li>";
		});
		$("#cityList").empty().html(cityBuff);
};
function redirectProvice(){
	var interType=getCookie("interType");
	location.href="/page/tencent/address/province.html?type="+interType;
};
function listenEvent(){
};