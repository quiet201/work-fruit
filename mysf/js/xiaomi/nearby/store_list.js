$(document).ready(function(){
	var proName=getUrlValueByKey("proName");
	var cityName=getUrlValueByKey("cityName");
	var countyName=getUrlValueByKey("countyName");
	var keyWord=getUrlValueByKey("keyWord");
	if($.trim(cityName)=="" || $.trim(countyName)==""){
		tipsDialog("获取地址失败");
		return;
	}
	var keyWordDisplay="/"+keyWord;
	if($.trim(keyWord)==""){
		keyWordDisplay="";
	}
	var naviValue="网点查询-"+cityName+countyName+keyWordDisplay;
	if($.trim(proName)==""){
		naviValue="网点查询-"+cityName+countyName+keyWordDisplay;
		countyName="";//查询时将县屏蔽
	}
	$("#addressNavige").html(naviValue);
	getData(proName,cityName,countyName,keyWord);//获取数据
});
function getData(proName,cityName,countyName,keyWord){
	$("#waitplease").show();
	var params={
			"proName"		:proName,
			"cityName"		:cityName,
			"countyName"	:countyName,
			"keyWord"		:keyWord
	};
	$.ajax({
		type : "GET",
		dataType : "json",
		data:params,
		url : "/service/store/storeinfo/queryStoreList",
		success : function(data) {
			$("#waitplease").hide();
			if (data.state == "Y") {
				createNode(data.storeList);	
			} else {
				$("#showNoStroe").show();
				$("#conmment-tips").show();
				setTimeout(function() {
					$("#conmment-tips").fadeOut();
				}, 1000);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#waitplease").hide();
			$("#conmment-tips").show();
			setTimeout(function() {
				$("#conmment-tips").fadeOut();
			}, 1000);
			getCommonImg("1074","query near store list error","3"); 
		}
	});
};

function createNode(data){
	if($.trim(data)!=""){
		var bf="";
		//var serviceType=["自寄服务","自取服务","寄、取件服务","个人地址服务","便民服务"];
		//var storeType=["顺丰店","外部资源合作便利店","其他网点类型"];
		for(var i=0;i<data.length;i++){
			if(i/3){
				
			}
		}
		data.sort(function(obj1,obj2){
			return obj1.distance-obj2.distance;
		});
		$.each(data,function(index,value){
			//门店类型
			var st=value.storeType;
			//var stName="";
			var stUrl="/images/xiaomi/200x200-1.png";
			var sc=value.storeType;
			if($.trim(value.isHk)=="1"){
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
			if($.trim(sc)!=""){
				sc=sc.split(",");//服务类型
			}
			var types="";
			var typesItems="";
			if($.trim(value.serviceContent)!=""){
				types=value.serviceContent.split(",");
				/*1,自寄服务
				2、自取服务
				3、寄、取件服务
				4、个人地址服务
				5、便民服务*/
				$.each(types,function(index,value){
					if(value=="1"){
						typesItems=typesItems+"<i class='ui-ico-sfi ico-ship-s'></i>";
					}
					if(value=="2"){
						typesItems=typesItems+"<i class='ui-ico-sfi ico-get-s'></i>";
					}
					if(value=="3"){
						typesItems=typesItems+"<i><img src='/../../css/sc/xiaomi/img/shoupai.png' style='width:16px;height: 16px;'/></i>";//收派件服务
					}
					if(value=="5"){
						typesItems=typesItems+"<i><img src='/../../css/sc/xiaomi/img/bianmin.png' style='width:16px;height: 16px;'/></i>";
					}
				});
				
			}
			bf=bf+"<li class='item'><a href='/xiaomi/nearby/store_info.html?storeId="+value.storeId+"&lng="+value.lng+"&lat="+value.lat+"&distance="+value.distance+"'><div class='store-item'>"+
			"<dl class='ui-flex'><dt class='flex-ico'><div class='imgbox'><img src='"+stUrl+"' /><span class='favorited'></span></div></dt>"+
			"<dd class='flex-con'><h3>"+fillNull(value.name)+"</h3> <div class='service-item'>"+fillNull(typesItems)+
			"</div><p>"+fillNull(value.virtualAddr)+"</p></dd> </dl><span class='distance'>"+fillNull(value.distance)+"m</span>"+
			"</div></a></li>";
			/*bf=bf+"<li class='item'><a href='store_info.html?storeId="+value.storeId+"&distance="+value.distance+"'><div class='store-item'>"+
			"<dl class='ui-flex'><dt class='flex-ico'><div class='imgbox'><img src='"+stUrl+"' /><span class='favorited'></span></div></dt>"+
			"<dd class='flex-con'><h3>"+value.name+"</h3> <div class='service-item'><i class='ui-ico-sfi ico-ship-s'></i><i class='ui-ico-sfi ico-get-s'></i>"+
			"<i class='ui-ico-sfi ico-charge-s'></i></div><p>"+value.virtualAddr+"</p></dd> </dl><span class='distance'>"+value.distance+"</span>"+
			"</div></a></li>";*/
		});
		$(".ui-list").html(bf);
	}
};

function valueReplace(v){ 
		v=v.toString().replace(new RegExp('(["\"])', 'g'),"\\\""); 
		    return v; 
} 
