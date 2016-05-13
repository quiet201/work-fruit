$(document).ready(function(){
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});
function init(){
	var proName=getUrlValueByKey("proName");
	var cityName=getUrlValueByKey("cityName");
	var countyName=getUrlValueByKey("countyName");
	var keyWord=getUrlValueByKey("keyWord");
	if($.trim(cityName)=="" || $.trim(countyName)==""){
		commontipsDialog("获取地址失败");
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
};
function getData(proName,cityName,countyName,keyWord){
	$("#waitplease1").show();
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
			$("#waitplease1").hide();
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
			$("#waitplease1").hide();
			$("#conmment-tips").show();
			setTimeout(function() {
				$("#conmment-tips").fadeOut();
			}, 1000);
			getCommonImg("1074","query near store list error","3"); 
		}
	});
};

function createNode(data) {
	if ($.trim(data) != "") {
		var bf = "";
		// var serviceType=["自寄服务","自取服务","寄、取件服务","个人地址服务","便民服务"];
		// var storeType=["顺丰店","外部资源合作便利店","其他网点类型"];
		data.sort(function(obj1, obj2) {
			return obj1.distance - obj2.distance;
		});
		
		/*设置节点*/
		var tempData="<li class='item item-fm'><a href='#' id='nearDetails'><div class='ui-text'><div class='ui-text-left'><div class='ui-text-img' ><img src='../../../css/common/img/hk04.png' alt='' ><i class='ui-ico-sfi'></i></div></div>"
		+"<div class='ui-text-center'><p class='text-fontStyle' id='shopName'></p><p id='serviceType'></p><p class='text-fontStyle2' id='detailAddr'></p>"
		+"</div><div class='ui-text-right'><p class='text-fontStyle2'></p></div></div></a></li>";
		
		var list=$("<p></p>");
		$.each(data,function(index, value) {
			var tempObject=$(tempData).clone();
			
			// 门店类型
			var st = value.storeType;
			// var stName="";
			var stUrl = "/css/common/img/hk01.png";
			var sc = value.storeType;
			if ($.trim(value.isHk) == "1") {
				stUrl = "/css/common/img/hk04.png";
			} else if ($.trim(st) != "") {
				if (st == "1") {
					stUrl = "/css/common/img/hk01.png";
				} else if (st == "2") {
					stUrl = "/css/common/img/hk03.png";
				} else {
					stUrl = "/css/common/img/hk01.png";
				}
				st = st - 1;
				// stName=storeType[st];
			}
			tempObject.find("img").attr("src",stUrl);
			// 服务类型
			if ($.trim(sc) != "") {
				sc = sc.split(",");
			}
			var types = "";
			var typesItems = "";
			if ($.trim(value.serviceContent) != "") {
				types = value.serviceContent.split(",");
				/*
				 * 1,自寄服务 2、自取服务 3、寄、取件服务 4、个人地址服务 5、便民服务
				 */
				$.each(types,function(index, value) {
					if (value == "1") {
						typesItems = typesItems
								+ "<a href='#'><i class='ui-ico-sfi ico-upload'></i></a>";
					}
					if (value == "2") {
						typesItems = typesItems
								+ "<a href='#'><i class='ui-ico-sfi ico-download'></i></a>";
					}
					if (value == "3") {
						typesItems = typesItems
								+ "<a href='#'><i class='ui-ico-sfi ico-up-down'></i></a>";// 收派件服务
					}
					if (value == "5") {
						typesItems = typesItems
								+ "<a href='#'><i class='ui-ico-sfi ico-del'></i></a>";
					}
				});

		}
		//设置跳转链接
		var hrefUrl="/page/alipay/nearby/store_info.html?storeId="+value.storeId+"&lng="+value.lng+"&lat="+value.lat+"&distance="+value.distance;
		tempObject.find("#nearDetails").attr("href",hrefUrl).removeAttr("id");
		//填充数据
		tempObject.find("#serviceType").html(typesItems).removeAttr("id");
		tempObject.find("#shopName").html(fillNull(value.name)).removeAttr("id");
		tempObject.find("#detailAddr").html(fillNull(value.virtualAddr)).removeAttr("id");
		tempObject.find("#distanceAddr").html(fillNull(value.distance)).removeAttr("id");
		list.append(tempObject);
	});
	$(".ui-fm.timing-form").html(list);
 }
};
