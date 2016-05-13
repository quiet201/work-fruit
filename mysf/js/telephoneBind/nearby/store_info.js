$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00804");
	//加载公共资源
	function init(){
		getDescPage("commonPage","/page/common/tips/tips.html");
	};
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
			};
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
	var temp="<li class='item item-fm'><div class='ui-text'><div class='ui-text-left'><div class='ui-text-img' ><img src='../../../css/common/img/hk04.png' alt='' ></div></div>"+
	"<div class='ui-text-center-right'><p class='text-fontStyle' id='storeName'></p></div></div></li>";
	var tempObject=$(temp);
	tempObject.find("#storeName").html(fillNull(current.name));
	var contextType=current.serviceContent;
	//服务类型
	var types = "";
	var typesItems = "";
	if ($.trim(current.serviceContent) != "") {
		types = current.serviceContent.split(",");
		/*
		 * 1,自寄服务 2、自取服务 3、寄、取件服务 4、个人地址服务 5、便民服务
		 */
		/*<p>
		<a href="#"><i class="ui-ico-sfi ico-upload"></i><label class="lab-p">自寄服务&nbsp;&nbsp;&nbsp;</label></a>
		<a href="#" style="margin-left: 15%;"><i class="ui-ico-sfi ico-download"></i><label class="lab-p">代收快件</label></a>
	</p>
	<p class="">
		<a href="#"><i class="ui-ico-sfi ico-up-down"></i><label class="lab-p">收派件服务</label></a>
		<a href="#" style="margin-left: 15%;"><i class="ui-ico-sfi ico-del"></i><label class="lab-p">便民服务</label></a>
	</p>*/
		var count=0;
		$.each(types,function(index, value) {
			if (value == "1") {
				count++;
				typesItems = typesItems
						+ "<a href='#'><i class='ui-ico-sfi ico-upload'></i><label class='lab-p'>自寄服务　</label></a>";
			}
			if (value == "2") {
				count++;
				typesItems = typesItems
						+ "<a href='#' style='margin-left: 15%;'><i class='ui-ico-sfi ico-download'></i><label class='lab-p'>代收快件</label></a>";
			}
			if (value == "3") {
				count++;
				typesItems = typesItems
						+ "<a href='#'><i class='ui-ico-sfi ico-up-down'></i><label class='lab-p'>收派件服务</label></a>";// 收派件服务
			}
			if (value == "5") {
				count++;
				typesItems = typesItems
						+ "<a href='#' style='margin-left: 15%;'><i class='ui-ico-sfi ico-del'></i><label class='lab-p'>便民服务</label></a>";
			}
			if( count == 2){
				typesItems="<p>"+typesItems+"</p><p>";
			}
		});
		if(count>=2){
			typesItems=typesItems+"</p>";
		}
	};
	tempObject.find(".ui-text-center-right").append(typesItems);
	//门店类型
	st=current.storeType;
	var stUrl = "/css/common/img/hk01.png";
	if ($.trim(current.isHk) == "1") {
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
	$(".ui-fm.timing-form").append(tempObject);
	
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
	
	var storeId = getUrlValueByKey("storeId");
	var distance = getUrlValueByKey("distance"); //距离,km
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
