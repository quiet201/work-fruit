(function(Z, SF) {
	Z(document).ready(function() {
		//加日志
		$.post("/service/commonLog/addLog/L00803");
						// 手机定位开始
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
						
					})
					
})(Zepto, SHUNFENG);

function createNode(data) {
	if ($.trim(data) != "") {
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
		var tempData="<li class='item item-fm'><a href='#' id='nearDetails'><div class='ui-text'><div class='ui-text-left'><div class='ui-text-img' ><img src='../../../css/common/img/hk04.png' alt='' ><i class='ui-ico-sfi'></i></div></div>"
		+"<div class='ui-text-center'><p class='text-fontStyle'style='height:100%' id='shopName'></p><p id='serviceType'></p><p class='text-fontStyle2' id='detailAddr'></p>"
		+"</div><div class='ui-text-right'><p class='text-fontStyle2'></p></div></div></a></li>";
		
		var list=$("<p></p>");
		var isFillHk=getUrlValueByKey("flag");
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

		}else{
			tempObject.find("#serviceType").hide();
		}
		var hrefUrl="/page/tencent/nearby/store_info.html?storeId="+value.storeId+"&lng="+value.lng+"&lat="+value.lat+"&distance="+value.distance;
		tempObject.find("#nearDetails").attr("href",hrefUrl).removeAttr("id");
		tempObject.find("#serviceType").html(typesItems).removeAttr("id");
		tempObject.find("#shopName").html(fillNull(value.name)).removeAttr("id");
		tempObject.find("#detailAddr").html(fillNull(value.virtualAddr)).removeAttr("id");
		tempObject.find("#distanceAddr").html(fillNull(value.distance)).removeAttr("id");
		if($.trim(isFillHk)=="hk" ){
			if($.trim(value.isHk) == "1"){
				list.append(tempObject);
			}
		}else{
			list.append(tempObject);
		}
		
	});
	$(".ui-fm.timing-form").html(list);
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
};