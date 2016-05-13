(function(Z, SF) {
	Z(document)
			.ready(
					function() {
						//加日志
						$.post("/service/commonLog/addLog/L00803");
						$("#waitplease").show();
						// 手机定位开始
						  function limitSize(v){
	                        	if(v&&v.length>20){
	                        		return v.substring(0,20)+"...";
	                        	}
	                        	return v;
							}
						  callNative(function(api) {
													/* 附近网点ajax接口 */
													 api.callAsync('getLocation', null, function(o) {
														 var loc = $.parseJSON(o);
														 getStoreListByPoint(loc.longitude,loc.latitude,3000.0);
												    });
											});
						  $("#waitplease").hide();
					});
					
})(Zepto, SHUNFENG);
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
/**
 * 通过经纬度查询附近网点
 * @param mylng
 * @param mylat
 * @param myrange
 */
function getStoreListByPoint(mylng,mylat,myrange){
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
				createNode(json.data);
			}else{
				alert("呜呜，没有获取到门店详情~~(>_<)~~");
			};
			getCommonImg("1071","not Stores","1");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#waitplease").hide();
			alert("呜呜，没有获取到门店详情~~(>_<)~~");
			getCommonImg("1071","not Stores","3");
		}
	});
};