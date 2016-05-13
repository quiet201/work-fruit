//初始化检查是否绑定
$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00402");
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	addlisten();
});
function init(){
	getMyExpressListForPage();
	getMyOrderListForPage();
	var type=getUrlValueByKey("type");
	if($.trim(type)!=""){
		setCookie("activeItem","1");
		location.href=location.href.substring(0, location.href.indexOf("?"));
	}else{
		
		//设置Tab选项
		var activeItem=getCookie("activeItem");
		if($.trim(activeItem)!=""){
			var selectItem="";
			if(activeItem=="1"){//寄给我的快件
				$("#atciveMyExpress").addClass("active");
				$("#atciveSendExpress").removeClass("active");
				selectItem=$("#atciveMyExpress");
				
			}else if(activeItem=="2"){//我寄出的快件
				$("#atciveSendExpress").addClass("active");
				$("#atciveMyExpress").removeClass("active");
				selectItem=$("#atciveSendExpress");
				
			}else{
				$("#atciveMyExpress").addClass("active");
				$("#atciveSendExpress").removeClass("active");
				selectItem=$("#atciveMyExpress");
				
			}
			//设置下边列表展示
			if(selectItem.parent().index()){
				$(".tap-content:first").hide();
				$(".tap-content:last").show();
			}else{
				$(".tap-content:first").show();
				$(".tap-content:last").hide();
			}
		}
	}
};
function addlisten(){

	//设置初始化标签页
	$(".ui-tap-title a").on('touchstart mousedown',function(e){
		e.preventDefault();
		$(".ui-tap-title .active").removeClass('active');
		$(this).addClass('active');
		var tempNode=$(this).attr("node");
		if($.trim(tempNode)!=""){
			setCookie("activeItem",tempNode);
		}
		if($(this).parent().index()){//我的订单
			$("#noResultItem1").hide();
			$(".tap-content:first").hide();
			$(".tap-content:last").show();
			//看是否显示结果
			//看是否显示结果
			/*var $("#sendExpressContain").find("section");
			$("#myExpressContain").find("section");*/
			if($("#sendExpressContain").find("section").length==0){//如果是没有结果显示，则依旧显示
				$("#noResultItem2").show();
			}
			
			
		}else{//寄给我的快件
			$("#noResultItem2").hide();
			$(".tap-content:first").show();
			$(".tap-content:last").hide();
			
			//看是否显示结果
			//看是否显示结果
			/*var $("#sendExpressContain").find("section");
			$("#myExpressContain").find("section");*/
			if($("#myExpressContain").find("section").length==0){//如果是没有结果显示，则依旧显示
				$("#noResultItem1").show();
			}
		}
	});

	$(".ui-tap-title a").click(function(e){
		e.preventDefault();
	});
/*
	function showTip(){
		var $mask = $('<div class="maskbox" style="z-index:10; opacity:.9;"></div>');
		$mask.append($(".tip-box"));
		$("body").append($mask);
		$(".tip-box").show();
	}*/
	
};

/*************************************分页查询寄给我的快件**************************************/
var pageNo = 1;
var pageSize =  10; //每页显示条数
function getMyExpressListForPage(more) {
	$("#waitplease1").show();
	if($.trim(more)!=""){
		getCommonImg("1143","N","1");
	}
	$.ajax({
		type : "get",
		dataType : "json",
		url : "/service/alipay/getMyExpressListForPage?pageNo="+pageNo+"&pageSize="+pageSize+"&ts=" + new Date().getTime(),
		success : function(json) {
			$("#waitplease1").hide();
			if(!json || $.trim(json.result)===""){
				if($(".ui-tap-btn .active").attr("node")!="2"){
					
					$("#noResultItem1").show();
					$("#myExpressContain").parent().hide();
				}
				
				return;
			}
			createNewDom(json.result);
			//如果存在下一页，设置 pageNo 为下一页的 pageNo
			if(json.hasNext){
				pageNo = json.nextPage;
				$("#myExpressLoadBtn").show();
				$('#nomyExpress').hide();
			} else {
				$("#myExpressLoadBtn").hide();
				$('#nomyExpress').show();
			}
			getCommonImg("1141","N","1");
		}, 
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
			$("#waitplease1").hide();
			getCommonImg("1141","N","3");
		}
	});
};
function createNewDom(json) {
	if($.trim(json)==""){
		return;
	}
	var temp="<section class='grid-main'><ul class='ui-fm'><li class='item item-fm-m'><div class='ui-div-right' style='padding: 5px 0;' >"+
	"<span class='placeholder'>运单号：<span name='ydNo' id='bno'></span><span class='lab-state' id='bnoState'>派送中</span></span></div>"+
	"</li><li class='item item-fm'><a href='#' class='right_click' ><div class='ui-text express-msg' ><div class='div_right_btn'></div>"+
	"<div class='se-add'><span id='srcAdd'>北京</span><span class='line-fx'> —</span><i class='ui-ico-sfi ico-brackets'></i><span class='line-fx'>— </span><span id='descAdd'>深圳</span>"+
	" </div><div><span style='float: left;' class='jijianfang'>寄件方：</span><div class='lab-ellipsis' id='sendName'></div></div><div><span class='yuji-time ui-ico-sfi ico-time-t' "+
	"id='expectedDate'></span></div></div> </a></li></ul></section>";
	
	var signTemp="<section class='grid-main' style='margin-top: 10px;'><form><ul class='ui-fm'><li class='item item-fm-m'><div class='ui-div-right' style='padding: 5px 0;' >"+
	"<span class='placeholder'>运单号：<span name='ydNo' id='bno'></span></span></div> </li><li class='item item-fm'><a href='#' class='right_click' > <div class='ui-text express-msg' style='padding: 5px 0px 8px 0;'><div class='div_right_btn'></div>"+
	"<div class='se-add'><span id='srcAdd'></span><span class='line-fx'> —</span><i class='ui-ico-sfi ico-brackets'></i><span class='line-fx'>— </span><span id='descAdd'></span>"+
	" </div><div><span style='float: left;'  class='jijianfang'>寄件方：</span><div class='lab-ellipsis' id='sendName'></div></div>"+
	"<div><span class='yuji-time ui-ico-sfi ico-time-t' id='signIm'></span></div></div></a></li>" +
	
	"<li class='item item-fm-m'><div class='ui-div-right' style='padding: 5px 0; text-align:right'> <a class='ui-btn btn-delete-line'  href='#' id='deleteItem'>删除运单</a>"+
	"<a class='ui-btn btn-evaluate-line' id='evaluateId' href='javascript:void(0);'>服务评价</a></div></li>" +
	"</ul> </form>"+
	"<div class='box-yc02'><img src='../../../css/common/img/yc_icon.png'></div></section>";
	var splitLine=$("<div class='div-service'><div class='ico-yqskj'></div></div>");
	var tmepObj=$(temp);
	var signTempObj=$(signTemp);
	var _myExpress=$("#myExpress");
	var _mySignExpress=$("#mySignExpress");
	$.each(json ,function(index,item){
		/*obj.find("#descAdd").html(getAddressType(item.destination,2)).removeAttr("id");*/
		//obj.find("#expectedDate").html().removeAttr("id");
		if("80"==$.trim(item.opCode) || "8000"==$.trim(item.opCode)){
			var obj=signTempObj.clone();
			obj.find("#bno").html(fillNull(item.orderNo)).removeAttr("id");
			obj.find("#srcAdd").html(getAddressType(item.destination,1)).removeAttr("id");
			obj.find("#descAdd").html(getAddressType(item.destination,2)).removeAttr("id");
			obj.find("#bnoState").html(opcode2State(item.opCode)).removeAttr("id");
			obj.find("#deleteItem").attr("onclick","deleteMyExpress('"+item.orderNo+"','"+1+"')").html("删除运单").removeAttr("id");
			if($.trim(item.sendName)==""){
				obj.find("#sendName").hide();
				obj.find(".jijianfang").hide();
				
			}
			obj.find("#sendName").html(fillNull(item.sendName)).removeAttr("id");
			if($.trim(item.signIm)==""){
				obj.find("#signIm").hide();
			}
			obj.find("#signIm").html(fillNull(item.signIm)).removeAttr("id");
			obj.find(".right_click").attr("onclick","myExpressForward('"+item.orderNo+"','"+item.opCode+"')");
			
			//添加寄给我的快件删除按钮
			
		if($.trim(item.routeJson)!=''){//组合路由链表
				/*if( "8000"==$.trim(item.opCode)){
					obj.find("#evaluateId").hide();
				}else{*/
					
					//type=2&json={"fromCityName":"深圳","toCityName":"广州","waybillno":"939659732549","signTime":"2015-08-17%2015:53:53","employ":{}}
					var evaluateLink="/page/alipay/deliverydetails/routing/evaluate.html?json="+item.routeJson;
					obj.find("#evaluateId").attr("href",evaluateLink).removeAttr("id");
				//}
			}
			//安全签收类型
			if(0){
				obj.find("img").attr("src","../../../css/common/img/qrocde-watermark.png").parent()
				.removeClass("box-yc02").addClass("box-yc03");
			}
			_mySignExpress.append(obj);
		}else{
			var obj=tmepObj.clone();
			obj.find("#bno").html(fillNull(item.orderNo)).removeAttr("id");
			obj.find("#srcAdd").html(getAddressType(item.destination,1)).removeAttr("id");
			obj.find("#descAdd").html(getAddressType(item.destination,2)).removeAttr("id");
			obj.find("#bnoState").html(opcode2State(item.opCode)).removeAttr("id");
			if($.trim(item.sendName)==""){
				obj.find("#sendName").hide();
				obj.find(".jijianfang").hide();
			}
			if($.trim(item.expectedDate)==""){
				obj.find("#expectedDate").hide();
			}
			obj.find("#sendName").html(fillNull(item.sendName)).removeAttr("id");
			obj.find("#expectedDate").html(fillNull(item.expectedDate)).removeAttr("id");
			obj.find(".right_click").attr("onclick","myExpressForward('"+item.orderNo+"','"+item.opCode+"')");
			_myExpress.append(obj);
		}
	});
	
	var splitLineSize=$("#myExpressContain").find(".div-service");
	if(_mySignExpress.find(".grid-main").length>0 && splitLineSize && splitLineSize.size()==0){
		_mySignExpress.prepend(splitLine);
	}
};

function myExpressForward(orderNo,opCode,type){
		// 跳转到详细页面
		var url = "/page/alipay/deliverydetails/routing/";
		/**if (opCode == "50") {
			url += "waybill-1-1-routing.html";
		} else */ if (opCode == "44") {
			url += "waybill-3-1-routing.html";
		} else if (opCode == "80" || opCode == "8000") {
			url += "waybill-4-1-routing.html";
		} else {
			url += "waybill-2-1-routing.html";
		}
		var tempUrl= url + "?bno=" + orderNo + "&hasRoute=true";
		if($.trim(type)!=""){
			return tempUrl;
		}
		getCommonImg("1046","N","1");
		location.href=tempUrl;
		
};
/**
 *  获取地址参数 type 1始发地，2：目的地
 * @param value
 * @param type
 * @returns
 */
function getAddressType(value,type){
	if($.trim(value)==""){
		return "";
	}
	var array=value.split("-");
	return type=="1"?$.trim(array[0]):$.trim(array[1]);
};
function opcode2State(opCode){
	var result="运送中";
	/*if("50"==$.trim(opCode)){
		result="已收件";
	}else */if("44"==$.trim(opCode)){
		result="派送中";
	}else if("80"==$.trim(opCode) || "8000"==$.trim(opCode)){
		result="已签收";
	}else{
		result="运送中";
	}
	return result;
}
/*************************************分页查询我的寄件预约**************************************/
var orderPageNo = 1;
var orderPageSize =  10; //每页显示条数
function getMyOrderListForPage(more){
	if($.trim(more)!=""){
		getCommonImg("1013","N","1");
	}
	$("#waitplease1").show();
	$.ajax({
		type : "get",
		dataType : "json",
		//dataType : "text",
		url : "/service/order/getMyOrderList/page?pageNo="+orderPageNo+"&pageSize="+orderPageSize,
		success : function(json) {
			$("#waitplease1").hide();
			if(json != null){
				if($.trim(json.result)===""){
					if($(".ui-tap-btn .active").attr("node")=="2"){
						$("#noResultItem2").show();
						$("#sendExpressContain").parent().hide();
					}
					return;
				}
				//加载数据列表
				loadOrderList(json.result);
				
				//如果存在下一页，设置 pageNo 为下一页的 pageNo
				if(json.hasNext){
					orderPageNo = json.nextPage;
					$("#sendExpressLoadBtn").show();
					$('#nosendExpressLoadBtn').hide();
				} else {
					$("#sendExpressLoadBtn").hide();
					$('#nosendExpressLoadBtn').show();
				}
				getCommonImg("1011","N","1");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#waitplease1").hide();
			getCommonImg("1011","N","3");
		}
	});
};

/**
 * 加载数据列表
 */
function loadOrderList(orderList){
	if($.trim(orderList)==""){
		return;
	}
	
	
	//普通订单未收件
	var orderTemp="<section class='grid-main'><form><ul class='ui-fm'><li class='item item-fm-m'><div class='ui-div-right2' style='padding: 5px 0;' >"+
	"<span class='placeholder'>订单号：<span name='ydNo' id='orderNo'></span><span class='lab-state'>等待收件</span></span>"+
	"</div></li> <li class='item item-fm-m'><a href='#' class='ui-btn-right-click' id='forwardUrl'> <div class='ui-text express-msg' style='margin: 5px 0 5px 0;'><div class='div_right_btn'></div>" +
	"<div class='yjsm-time'><p class='yuji-time ui-ico-sfi ico-time-style'>预计上门时间：</p>"+
	"<p  id='orderExpectedDate'></p> </div> <div  class='sm-addr'><p class='yuji-time ui-ico-sfi ico-location-style'>上门地址：</p><p id='addressDetails'>深圳市福田区田面设计之都7栋</p> </div><div><span id='s2dAdd'></span>"+
	"<span class='lab-state-hui'>刚刚下单</span></div></div></a></li> </ul></form> </section>";
	//普通订单未收件
	var hkOrderTemp="<section class='grid-main'><form><ul class='ui-fm'><li class='item item-fm-m'><div class='ui-div-right' style='margin: 5px 0;' >"+
	"<span class='placeholder'>订单号：<span name='ydNo' id='orderNo'></span><span class='lab-state'>嘿客店打印运单</span></span></div> </li> <li class='item item-fm'>"+
	"<a href='#' id='forwardUrl' class='ui-btn-right-click' ><div class='ui-text express-msg' style='padding: 5px 0px 8px 0;'><div class='div_right_btn'></div>" +
	"<div class='sm-addr'><p style='color:#cccccc;line-height:25px'>打印单号：</p><p id='printOrderNo'></p></div>"+
	"<div><span  id='s2dAdd'></span><span class='lab-state-hui'>30分钟前下单</span></div></div></a> </li></ul></form></section>";
	//分割线
	var splitLine=$("<div class='div-service'><div class='ico-ywcdd'></div></div>");
	//订单运送中
	var sindingOrder=" <section class='grid-main' style='margin-top: 10px;'><form><ul class='ui-fm'><li class='item item-fm-m'><div class='ui-div-right' style='padding: 5px 0;' >" +
			"<span class='placeholder'>运单号：<span name='ydNo' id='bno'></span><span class='lab-state' id='sendingState'>运送中</span></span> </div></li> <li class='item item-fm'><a href='#' id='forwardUrl' class='' >" +
			"<div class='ui-text express-msg' style='padding: 5px 0px 8px 0;'><div class='div_right_btn'></div>" +
			"<div class='se-add'><span id='srcAddr'></span><span class='line-fx'> —</span><i class='ui-ico-sfi ico-brackets'></i>" +
			"<span class='line-fx'>— </span><span id='descAddr'></span> </div><div><span style='float: left;' class='jijianfang'>寄件方：</span><div class='lab-ellipsis' id='sendName'></div></div> <div>" +
			"<span class='yuji-time ui-ico-sfi ico-time-style' id='orderExpectedDate'></span></div></div> </a></li><li class='item item-fm-m'><a href='#' class='ui-btn-right3' >"+
			"<div class='ui-div-right' style='padding: 5px 0;' ><span>订单号：<span name='ydNo' id='orderNo'></span></span></div></a></li><li class='item item-fm-m'>"+
			"<div class='ui-div-right' style='padding: 5px 0; text-align:right' >"+
			"<a class='ui-btn btn-evaluate-line' id='evaluateBtn' href=''>服务评价</a></div></li></ul></form></section>";
	//已完成订单
	var completeOrder="<section class='grid-main' ><form><ul class='ui-fm'><li class='item item-fm-m'><div class='ui-div-right' style='padding: 5px 0;' ><span class='placeholder'>运单号：<span name='ydNo'  id='bno'></span><span class='lab-state'>" +
			"<a class='ui-btn btn-del-line' id='deleteItem' href='#'>删除</a></span></span></div></li> <li class='item item-fm'><a href='#' id='forwardUrl'>" +
	"<div class='ui-text express-msg' style='padding: 5px 0px 8px 0;'><div class='div_right_btn'></div>" +
	"<div class='se-add'><span id='srcAddr'></span><span class='line-fx'> —</span><i class='ui-ico-sfi ico-brackets'></i><span class='line-fx'>—</span><span id='descAddr'></span> </div><div>" +
	"<span style='float: left;' class='jijianfang'>寄件方：</span><div class='lab-ellipsis' id='sendName'></div></div><div><span class='yuji-time ui-ico-sfi ico-time-style'  id='orderExpectedDate'></span></div> </div></a></li><li class='item item-fm-m'>" +
	"<a href='#' class='ui-btn-right3' ><div class='ui-div-right' style='padding: 5px 0;color: rgb(172,172,172);' ><span>订单号：<span name='ydNo'  id='orderNo'></span></span></div></a></li><li class='item item-fm-m'>"+
			"<div class='ui-div-right' style='padding: 5px 0; text-align:right' >"+
			"<a class='ui-btn btn-evaluate-line' id='evaluateBtn' href=''>服务评价</a></div></li></ul></form> <div class='box-yc'><img src='../../../css/common/img/yc_icon.png'></div><div class='clearall'></div></section>";
	//取消订单
	var cancelOrder="<section class='grid-main' style='margin-top: 10px;'><form><ul class='ui-fm'><li class='item item-fm-m'><div class='' style='padding: 5px 0;' ><span class='placeholder'>订单号：<span name='ydNo' id='orderNo'></span>" +
	"<span class='lab-state'><a class='ui-btn btn-del-line' href='#' id='deleteItem'>删除</a></span></span> </div></li><li class='item item-fm'><a href='#' class='ui-btn-right-click' id='forwardUrl'>" +
	"<div class='ui-text express-msg' style='padding: 5px 0px 0px 0;'><div class='div_right_btn'></div>" +
	"<div><span class='yuji-time ui-ico-sfi ico-time-style' >下单时间</span></div> <div><span style='float: left;' id='orderTm'></span></div><div class='clearall'></div><div>" +
	"<span class='yuji-time ui-ico-sfi ico-time-style'>订单取消时间</span></div><div><span style='float: left;' id='cancelOrderTm'></span></div><div class='clearall'></div></div></a></li> </ul></form></section>";

	//0正在受理1已受理2下订单失败3已通知业务员收件5已取件6异常收件7取消处理中8已取消
	var downList=$("#downList");
	var evaluateSend = "/page/alipay/deliverydetails/routing/evaluateSend.html";
	$.each(orderList,function(index,orderInfo){
		
		//var orderType = orderInfo.orderType;	//订单类型  普通单 预约单 
		var sentWay = orderInfo.sentWay;		//寄件方式 上面 为1 黑客为2
		var printOrderNo = orderInfo.printOrderNo;//黑客 ，否则普通运单  
		var bno = orderInfo.bno;				//运单号
		var opCode = orderInfo.opCode;		//操作吗
		var orderNo =orderInfo.orderNo;		//订单号
		var antipateConsigneeDate =orderInfo.antipateConsigneeDate;//预计上门时间
		var addressDetails= orderInfo.senderDetailAddress;
		var s2dAdd=fillNull(orderInfo.fromCityName).replace("市","")+" - "+fillNull(orderInfo.toCityName).replace("市","");
		var time  = formate(fillNull(orderInfo.orderDate));
		var formatTime = getNiceDate(time);
		var empNo = fillNull(orderInfo.empNo);
		var date;
		if(formatTime!=""&&formatTime!=null){
			date = getNiceDate(time)+"下单";
		}else{
			date = fillNull(orderInfo.orderDate)+"下单";
		}
		if(orderInfo.orderstatus == "0" 
				|| orderInfo.orderstatus == "1"//已收件
				|| orderInfo.orderstatus == "3"//取消订单
				|| orderInfo.orderstatus == "6"){//
			
			//黑客
			if(sentWay=='2'){
				var hkOrderTempObj=$(hkOrderTemp).clone();
				hkOrderTempObj.find("#orderNo").html(fillNull(orderNo)).removeAttr("id");
				hkOrderTempObj.find("#s2dAdd").html(fillNull(s2dAdd)).removeAttr("id");
				hkOrderTempObj.find("#printOrderNo").html(fillNull(printOrderNo)).removeAttr("id");
				hkOrderTempObj.find("#forwardUrl").attr("href","/page/alipay/orderlist/orderDetails.html?bno="+orderNo).removeAttr("id");
				hkOrderTempObj.find(".lab-state-hui").html(fillNull(date));
				$("#upList").append(hkOrderTempObj);
			}else{
				var orderTempObj=$(orderTemp).clone();
				orderTempObj.find("#orderNo").html(fillNull(orderNo)).removeAttr("id");
				orderTempObj.find("#orderExpectedDate").html(fillNull(antipateConsigneeDate)).removeAttr("id");
				orderTempObj.find("#addressDetails").html(fillNull(addressDetails)).removeAttr("id");
				orderTempObj.find("#s2dAdd").html(fillNull(s2dAdd)).removeAttr("id");
				orderTempObj.find("#forwardUrl").attr("href","/page/alipay/orderlist/orderDetails.html?bno="+orderNo).removeAttr("id");
				orderTempObj.find(".lab-state-hui").html(fillNull(date));
				$("#upList").append(orderTempObj);
			}
			
		} else if(orderInfo.orderstatus == "5"){
			var paramUrl ="?type=1&orderNo="+orderNo+"&bno="+bno;
			if(opCode=="80" || opCode=="8000"){
				
					
				var completeOrderObj=$(completeOrder).clone();
				completeOrderObj.find("#bno").html(fillNull(bno)).removeAttr("id");
				completeOrderObj.find("#srcAddr").html(fillNull(orderInfo.fromCityName).replace("市","")).removeAttr("id");
				completeOrderObj.find("#descAddr").html(fillNull(orderInfo.toCityName).replace("市","")).removeAttr("id");
				completeOrderObj.find("#orderNo").html(fillNull(orderNo)).removeAttr("id");
				completeOrderObj.find("#forwardUrl").attr("href","/page/alipay/deliverydetails/routing/waybill-4-1-routing.html?bno="+bno+"&hasRoute=true").removeAttr("id");
				completeOrderObj.find("#deleteItem").attr("onClick","deleteMyExpress('"+orderNo+"','"+2+"')").removeAttr("id");
				if(null!=bno&&""!=bno&&null!=empNo&&""!=empNo){
				   completeOrderObj.find("#evaluateBtn").attr("href",evaluateSend+paramUrl).removeAttr("id");
				}else{
					completeOrderObj.find("#evaluateBtn").hide().removeAttr("id");	
				}
				//怎加完成订单后点击订单链接
				completeOrderObj.find(".ui-btn-right3").attr("href","/page/alipay/orderlist/orderDetails.html?bno="+orderNo);
				//completeOrderObj.find("#orderExpectedDate").hide().removeAttr("id");
				if($.trim(orderInfo.senderName)==""){
					completeOrderObj.find("#sendName").hide();
					completeOrderObj.find(".jijianfang").hide();
					
				}
				
				completeOrderObj.find("#sendName").html(fillNull(orderInfo.senderName)).removeAttr("id");
				//如果预计送达时间为空
				if($.trim(orderInfo.expectedDate)==""){
					completeOrderObj.find("#orderExpectedDate").hide().removeAttr("id");
				}else{
					
					completeOrderObj.find("#orderExpectedDate").html(fillNull(orderInfo.expectedDate)).removeAttr("id");
				}
				downList.append(completeOrderObj);
			}else{
				var sindingOrderObj=$(sindingOrder).clone();
				sindingOrderObj.find("#bno").html(fillNull(bno)).removeAttr("id");
				sindingOrderObj.find("#srcAddr").html(fillNull(orderInfo.fromCityName).replace("市","")).removeAttr("id");
				sindingOrderObj.find("#descAddr").html(fillNull(orderInfo.toCityName).replace("市","")).removeAttr("id");
				if(null!=bno&&""!=bno&&null!=empNo&&""!=empNo){
				sindingOrderObj.find("#evaluateBtn").attr("href",evaluateSend+paramUrl).removeAttr("id");
				}else{
					sindingOrderObj.find("#evaluateBtn").hide().removeAttr("id");	
				}
				if($.trim(orderInfo.senderName)==""){
					sindingOrderObj.find(".jijianfang").hide();
					sindingOrderObj.find("#sendName").hide().removeAttr("id");
				}else{
					
					sindingOrderObj.find("#sendName").html(fillNull(orderInfo.senderName)).removeAttr("id");
				}
				sindingOrderObj.find("#orderNo").html(fillNull(orderNo)).removeAttr("id");
				sindingOrderObj.find("#sendingState").html(opcode2State(opCode)).removeAttr("id");
				//sindingOrderObj.find("#sendName").html(fillNull("?????")).removeAttr("id");
				
				
				sindingOrderObj.find("#forwardUrl").attr("href",myExpressForward(bno,opCode,"1")).removeAttr("id");
				sindingOrderObj.find(".ui-btn-right3").attr("href","/page/alipay/orderlist/orderDetails.html?bno="+orderNo);
				//如果预计送达时间为空
				if($.trim(orderInfo.expectedDate)==""){
					sindingOrderObj.find("#orderExpectedDate").hide().removeAttr("id");
				}else{
					
					sindingOrderObj.find("#orderExpectedDate").html(fillNull(orderInfo.expectedDate)).removeAttr("id");
				}
				
				downList.append(sindingOrderObj);
			}
			
		} else if(orderInfo.orderstatus == "7"){//取消订单
			var cancelOrderObj=$(cancelOrder).clone();
			cancelOrderObj.find("#orderNo").html(fillNull(orderNo)).removeAttr("id");
			cancelOrderObj.find("#orderTm").html(fillNull(orderInfo.orderDate)).removeAttr("id");
			cancelOrderObj.find("#forwardUrl").attr("href","/page/alipay/orderlist/orderDetails.html?bno="+orderNo).removeAttr("id");
			if(!orderInfo.cancelDate){
				cancelOrderObj.find("#cancelOrderTm").parent().prev().hide();
				cancelOrderObj.find("#cancelOrderTm").hide().removeAttr("id");
			}else{
				cancelOrderObj.find("#cancelOrderTm").html(fillNull(orderInfo.cancelDate)).removeAttr("id");
			}
			cancelOrderObj.find("#deleteItem").attr("onClick","deleteMyExpress('"+orderNo+"','"+2+"')").removeAttr("id");
			downList.append(cancelOrderObj);
		} else if(orderInfo.orderstatus == "8"){//已完成订单
			  
				var cancelOrderObj=$(cancelOrder).clone();
				cancelOrderObj.find("#orderNo").html(fillNull(orderNo)).removeAttr("id");
				cancelOrderObj.find("#orderTm").html(fillNull(orderInfo.orderDate)).removeAttr("id");
				if(!orderInfo.cancelDate){
					cancelOrderObj.find("#cancelOrderTm").parent().prev().hide();
					cancelOrderObj.find("#cancelOrderTm").hide().removeAttr("id");
				}else{
					cancelOrderObj.find("#cancelOrderTm").html(fillNull(orderInfo.cancelDate)).removeAttr("id");
				}
				cancelOrderObj.find("#forwardUrl").attr("href","/page/alipay/orderlist/orderDetails.html?bno="+orderNo).removeAttr("id");
				cancelOrderObj.find("#deleteItem").attr("onClick","deleteMyExpress('"+orderNo+"','"+2+"')").removeAttr("id");
				downList.append(cancelOrderObj);
		}
		var sendLine=$("#sendExpressContain").find(".div-service");
		if(downList.find("section").length>0 && sendLine && sendLine.size()==0){
			downList.prepend(splitLine);
		}
		//已收件订单
		
	});
	
};
function deleteMyExpress(bno,type){
	showTip3(bno,type);
};

function showTip3(index,type){
	var $mask = $('<div class="maskbox" style="z-index:1005; opacity:.9;"></div>');
	$mask.append($(".tip-box"));
	$("body").append($mask);
	$("#tipsMaskbox").show();
	$("#tip-btn-a1").unbind().bind("click",function(){tipsCancel3(index,type);});
	$("#tip-btn-a2").unbind().bind("click",function(){tipsSubmit3(index,type);});
}
//删除动作
function tipsCancel3(index,type){};
//确定删除
function tipsSubmit3(bno,type){
	
	if($.trim(bno)=="" || $.trim(type)==""){
		commontipsDialog("删除失败!");
		return;
	}
	/*var tempParams={
			type	:type,
			bno		:	bno
	};*/
	
	$.ajax({
		type : "GET",
		url : "/service/alipay/shanchuMyExpress?type="+type+"&bno="+bno,
		dataType : "json",
		async: false,
		contentType: "application/json; charset=utf-8",
		success : function(data) {
			$("#waitplease1").hide();
			if(data && data.state == "Y"){
				commontipsDialog("删除成功!");
			}else{
				commontipsDialog("删除失败!");
			}
			location.reload();//刷新页面
		}, 
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("服务器连接失败");
			$("#waitplease1").hide();
			commontipsDialog("删除异常!");
		}
	});
};

function formate(d) {
	  if(d==null||d==''){
		return d;
	  }
	  if(d.length==16){
		  d+=':00';
	  }
	  
	  //2015-03-25 12:00:00
	  var array = d.replace(" ","-").split("-");
	  return array[1]+"/"+array[2]+"/"+array[0]+" "+array[3];
	  
	}


function getNiceDate(d) {
	  var date = new Date(d).getTime();
	  var now = new Date().getTime();  
	  var minutesDifference =  parseInt((now - date) / (60 * 1000));

	  if  (minutesDifference < 2) {
	    return "刚刚";
	  } else if (minutesDifference < 60) {
	    return minutesDifference + "分钟前";
	  } else if (minutesDifference < 60 * 24) {
	    var hoursDifference = parseInt(minutesDifference / 60);
	    return hoursDifference + "个小时前";
	  }
	  else if (minutesDifference < 60 * 24 * 30) {
		    var dayDifference = minutesDifference / (60*24);
		    var showDay = parseInt(minutesDifference / (60*24));
		    if(dayDifference<=3){
		      return showDay + "天前";
		    }else{
		     return "";
		    }
	}
	/*  else if (minutesDifference < 60 * 24 * 30 * 7) {
		    var weekDifference = parseInt(minutesDifference / (60*24*7));
		    return weekDifference + "周前";
		  }
	  else if (minutesDifference < 60 * 24 * 30 * 365) {
		    var mouthDifference = parseInt(minutesDifference / (60*24*30));
		    return mouthDifference + "个月前";
		  }
   */
	 // return date.toString("yyyy-MM-dd HH:mm"); 
	  
	}
