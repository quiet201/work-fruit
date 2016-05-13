(function(Z, SF) {
	Z(document).ready(function() {
		//加日志
		$.post("/service/commonLog/addLog/L00803");
		
//		getStoreListByPoint(114.107008,22.537888,3000.0);
//		getStoreListByPoint(114,22,3000.0);
						 手机定位开始
						var uaVersion = SF.APDetect;
						  function limitSize(v){
	                        	if(v&&v.length>20){
	                        		return v.substring(0,20)+"...";
	                        	}
	                        	return v;
							}
						  $("#waitplease1").show();
						if (uaVersion >= 8.1) {
							window
									.callBridge(
											'getLocation',
											function(result) {
												if (result.error) {
													$("#waitplease1").hide();
													$("#showNoStroe").hide();
													SF.alertMsg(
																	'你可以在系统“设置-定位服务”中允许“支付宝钱包”使用你的位置。',
																	'定位未开启' ,
																	'知道了');
													
													getCommonImg("1071","Location is not open","2");
													// 手机定位结束
												} else {
													var isFillHk=getUrlValueByKey("flag");
													if($.trim(isFillHk)=="hk"){
														$(".nearbyTitle").html("附近嘿客");
													}
													/* 附近网点ajax接口 */
													getStoreListByPoint(result.longitude,result.latitude,3000.0);
												}
											});
						} else if (uaVersion != 0) {
							$("#waitplease1").hide();
							SF.alertMsg('您的钱包版本比较旧，升级新版才能使用该功能。');
							getCommonImg("1071","version old","2");
						} else {
							$("#waitplease1").hide();
							SF.alertMsg('您只有在支付宝钱包中才能使用这个功能');
							getCommonImg("1071","only use in alipay","2");
						}
						
					});
					
})(Zepto, SHUNFENG);

function createNode(data) {
	if(data.length==0){
		$("#hadService").hide();
		$("#orderRightNow").hide();
		$("#noService").show();
	}
	else if ($.trim(data) != "") {
		var bf = "";
		// var serviceType=["自寄服务","自取服务","寄、取件服务","个人地址服务","便民服务"];
		// var storeType=["顺丰店","外部资源合作便利店","其他网点类型"];
		for ( var i = 0; i < data.length; i++) {
			if (i / 3) {

			}
		}
		data.sort(function(obj1, obj2) {
			return obj1.distance - obj2.distance;
		});
		
		/*设置节点*/
		var tempData="<dl><a href='#' id='nearDetails'><dt><img src='../../../css/common/img/service-store-sf.png'></dt>"+
        "<dd class='flex-sb'><p class='store-name cell'>"+
        "<span class='store-name-detail' id='shopName'>中心店</span>"+
        "<span class='store-name-lines'></span>"+
        "<span class='store-name-property' id='serviceType'>自营网点</span></p>"+
        "<p class='distance'>距<span id='distance'>495</span>m</p></dd>"+
        "<dd class='store-adress' id='address'>软件产业基地大厦1栋A座首层软件产</dd></a></dl>" ;
		
		var list=$("<p></p>");
		var isFillHk=getUrlValueByKey("flag");
		$.each(data,function(index, value) {
			var tempObject=$(tempData).clone();
			var types = "";
			var typesItems = "";
			// 门店类型
			var st = value.storeType;
			// var stName="";
			var stUrl = "/css/common/img/service-store-heike.png";
			var sc = value.storeType;
//			if ($.trim(value.isHk) == "1") {
//				stUrl = "/css/common/img/hk04.png";
//				typesItems="嘿客店";
//			} else  if($.trim(value.isHk) == "2"){
				if (st == "2") {
					stUrl = "/css/common/img/hk02.png";
					typesItems="合作便利店";
				} else if(st == "1"||st=='4'){
					stUrl = "/css/common/img/service-store-sf.png";
					typesItems="自营网点";
				}
				
				else{
					stUrl = "/css/common/img/service-store-sf.png";
					typesItems="其他网点类型";
				}
				if ($.trim(value.isHk) == "1") {
					stUrl = "/css/common/img/service-store-heike.png";
					typesItems="嘿客店";
				}
				st = st - 1;
				// stName=storeType[st];
//			}
//			else{
//				stUrl = "/css/common/img/service-store-sf.png";
//				typesItems="其他网点类型";
//			}
			
			
			
			tempObject.find("img").attr("src",stUrl);
			// 服务类型
			if ($.trim(sc) != "") {
				sc = sc.split(",");
			}
			
			if($.trim(value.serviceContent) != ""){}
//			if ($.trim(value.serviceContent) != "") {
//				types = value.serviceContent.split(",");
//				/*
//				 * 1,自寄服务 2、自取服务 3、寄、取件服务 4、个人地址服务 5、便民服务
//				 */
//				$.each(types,function(index, value) {
//					if (value == "1") {
//						typesItems = typesItems
//								+ "<a href='#'><i class='ui-ico-sfi ico-upload'></i></a>";
//					}
//					if (value == "2") {
//						typesItems = typesItems
//								+ "<a href='#'><i class='ui-ico-sfi ico-download'></i></a>";
//					}
//					if (value == "3") {
//						typesItems = typesItems
//								+ "<a href='#'><i class='ui-ico-sfi ico-up-down'></i></a>";// 收派件服务
//					}
//					if (value == "5") {
//						typesItems = typesItems
//								+ "<a href='#'><i class='ui-ico-sfi ico-del'></i></a>";
//					}
//				});
//
//		}else{
//			tempObject.find("#serviceType").hide();
//		}
		var hrefUrl="/page/alipay/nearby/store_info.html?storeId="+value.storeId+"&lng="+value.lng+"&lat="+value.lat+"&distance="+value.distance;
		tempObject.find("#nearDetails").attr("href",hrefUrl).removeAttr("id");
		tempObject.find("#serviceType").html(typesItems).removeAttr("id");
		tempObject.find("#shopName").html(fillNull(value.name)).removeAttr("id");
		tempObject.find("#address").html(fillNull(value.virtualAddr)).removeAttr("id");
		tempObject.find("#distance").html(fillNull(value.distance)).removeAttr("id");
//		if($.trim(isFillHk)=="hk" ){
//			if($.trim(value.isHk) == "1"){
//				list.append(tempObject);
//			}
//		}else{
//			list.append(tempObject);
//		}
//		if(value.isHk=='2'||value.isHk=='1'){
			list.append(tempObject);
//		}
		
	});
	$(".module-c").html(list);
	
	$("#orderRightNow").show();
	//document.getElementById('orderRightNow').style.display = "";
 }

};
/**
 * 通过经纬度查询附近网点
 * 
 * @param mylng
 * @param mylat
 * @param myrange
 */
function getStoreListByPoint(mylng, mylat, myrange) {
	var params = {
		lng : mylng, // 经度
		lat : mylat, // 纬度
		range : myrange
	// 范围
	};
	$.ajax({
		type : "GET",
		data : params,
		dataType : "json",
		url : "/service/store/storeinfo/findNearStoreListByPoint",
		success : function(json) {
			$("#waitplease1").hide();
			if (json.state == "Y") {
				createNode(json.data);
				getCommonImg("1071", "not Stores", "1");
			} else {
				alert("呜呜，没有获取到门店详情~~(>_<)~~");
			};
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#waitplease1").hide();
			alert("呜呜，没有获取到门店详情~~(>_<)~~");
			getCommonImg("1071", "not Stores", "3");
		}
	});
}