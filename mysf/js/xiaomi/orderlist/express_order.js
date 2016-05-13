 //默认不催件
    var urge = 0;
	$(document).ready(function(){
		//分页查询我的订单
		getMyOrderListForPage();
		
		//alert(getDateDiff(new Date('2015-03-17 13:40 ').getTime()));
	});
	
	
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
	

	/**
	 * 分页查询我的寄件预约
	 */
	var pageNo = 1;
	var pageSize =  10; //每页显示条数
	function getMyOrderListForPage(more){
		if($.trim(more)!=""){
			getCommonImg("1013","N","1");
		}
		$.ajax({
			type : "get",
			dataType : "json",
			//dataType : "text",
			url : "/service/order/getMyOrderList/page?pageNo="+pageNo+"&pageSize="+pageSize,
			success : function(json) {
				if(json != null){
					//加载数据列表
					loadOrderList(json.result);
					
					//如果存在下一页，设置 pageNo 为下一页的 pageNo
					if(json.hasNext){
						pageNo = json.nextPage;
						$("#loadBtn").show();
						$('#noDate').hide();
					} else {
						$("#loadBtn").hide();
						$('#noDate').show();
						
					}
					getCommonImg("1011","N","1");
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				getCommonImg("1011","N","3");
			}
		});
	}
	
	/**
	 * 点击事件 展示盒隐藏 预约事件 收件地址
	 */
	function openOrCloseExpressInfo(e,expressId,div){
		//百度统计
		//commonEventPush('寄件','页面统计','收送范围','index.html');
		//$(selector).offset().top

		//alert($(e).offset().top);
	
	
		var  testExp = document.getElementById(expressId);
		
		if($(testExp).is(':hidden')){
			$(testExp).show();
			$("#"+div).addClass("open");
		}
		else{
			
			$(testExp).hide();
			$("#"+div).removeClass("open");
		}
		$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
	}
	
	/**
	 * 根据地址簿ID查询地址簿信息
	 */
	//function getConsigneeAddressByAddBookId(addInfoId,asbkId){
	//	var addInfo = document.getElementById(addInfoId);
	//	if(!addInfo || addInfo.innerText == null || $.trim(addInfo.innerText) == ""){
	//		$.ajax({
	//			type : "GET",
	//			data : null,
	//			dataType : "json",
	//			url : "/service/order/getAddressBookByAddBookId/"+asbkId,
	//			success: function(json){
	//				if(json && json != null){
	//					addInfo.innerText = json.areaName+" "+json.detailAdress;
	//				}
	//			},
	//			error:function(XMLHttpRequest, textStatus, errorThrown){
	//			}
	//		});
	//	}
	//}
	
	function confirmCancel(e,orderNo){
		if(alertDialog("是否要取消该订单?",orderNo,1)){
		}
		$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
	}
	
	//催派
	function hurryToSend(e,orderNo,event){
	//var orderNo='C000000413';	
		$.ajax({
			type : "POST",
			data : null,
			dataType : "json",
			url : "/service/order/orderContro/changeOrder/"+orderNo+"/2",
			success: function(json){
				if(json && json != null){
					if(json=='1'){
					alertDialog("已成功提醒收派员上门收件",orderNo,2);
					changeColorStyle(event);
					getCommonImg("1144","N","1");
					}
					else{
						alertDialog("系统繁忙，请稍后再试！",orderNo,2);
						getCommonImg("1144","N","2");
					}
				}
				else{
					alertDialog("系统繁忙，请稍后再试！",orderNo,2);
					getCommonImg("1144","N","2");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert('系统繁忙，请稍后再试！');
				getCommonImg("1144","N","3");
			}
		});
		
		$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
	}
	
	/**
	 * 取消订单
	 */
	function cancelOrder(orderNo){
		//百度统计
		commonEventPush('寄件','页面统计','收送范围','index.html');
		
		$.ajax({
			type : "POST",
			data : null,
			dataType : "json",
			url : "/service/order/cancelOrder/"+orderNo,
			success: function(json){
				if(json && json != null){
					if(json.code == "200"){
						tipsDialog("订单取消中，已提交系统处理");
						var pstatusId = "pstatusId"+orderNo;
						var dtImgId = "dtImgId"+orderNo;
//						alert($('#'+orderNo).html());
						document.getElementById(orderNo).style.display = "none";
						document.getElementById(pstatusId).innerText = "订单取消中，已提交系统处理";
						document.getElementById(dtImgId).innerHTML = '<i class="ui-ico-sfi ico-express-cancel"></i>';
					} else if(json.code == "201"){
						tipsDialog(json.message);
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
			}
		});
	}
	

	
	
	/**
	 * 加载数据列表
	 */
	function loadOrderList(orderList){
		if(orderList != null && orderList.length > 0){
			var content = "";
			for(var i=0; i<orderList.length; i++){
				var orderInfo = orderList[i];
				if(orderInfo != null){
					
					var orderType = orderInfo.orderType;
					
					var sentWay = orderInfo.sentWay;
					
					var orderId = orderInfo.printOrderNo;
					
					var bno = orderInfo.bno;
//					
					var orderQuery ="";
					
					var opCode = orderInfo.opCode;
					
					var orderStatus = "";
					var pstatusId = "pstatusId"+orderInfo.orderNo;	//订单状态P标签ID
					var img = "";
					var dtImgId = "dtImgId"+orderInfo.orderNo;		//订单状态图标 dt 区域ID
					if(orderInfo.orderstatus == "0" 
							|| orderInfo.orderstatus == "1"
							|| orderInfo.orderstatus == "3"
							|| orderInfo.orderstatus == "6"){
						img = '<i class="ui-ico-sfi ico-express-waiting"></i>';
						orderStatus = "等待顺丰小哥上门收件";
						if(sentWay=='2'){
							orderStatus = "请到附近嘿客店打印运单寄件 ";
						}
						
					} else if(orderInfo.orderstatus == "5"){
						img = '<i class="ui-ico-sfi ico-express-finish"></i>';
						orderStatus = "顺丰小哥已完成收件";
						orderQuery += '<div class="express-btn01 ui-dialog-bt ui-cols2 clearfix">';
						orderQuery += '<a href="javascript:queryOrderDetails('+opCode+',\''+bno+'\');"><p><span class="hot">运单号：</span>';
						orderQuery += '<span>';
						orderQuery +=  convertNull(bno);
						orderQuery += '<i class="ui-ico-sfi ico-fromto01" style="float:right" ></i>';
						orderQuery += '</span>';
						orderQuery += '</p></a>';
						orderQuery += '</div>';
					} else if(orderInfo.orderstatus == "7"){
						img = '<i class="ui-ico-sfi ico-express-cancel"></i>';
						orderStatus = "订单取消中，已提交系统处理";
					} else if(orderInfo.orderstatus == "8"){
						img = '<i class="ui-ico-sfi ico-express-cancel"></i>';
						orderStatus = "已取消";
					}
					
					var expressId = "EXP"+convertNull(orderInfo.orderNo);
					var outerDivId = "AUTER"+convertNull(orderInfo.orderNo);
					

					content += '<li class="item-m">';
						content += '<a href="#">';
							content += '<div class="express-top">';
							content += '<span class="express-code">';
							content += '订单号：'+convertNull(orderInfo.orderNo);
							content += '</span>';
							content += '<span class="express-city">';
							content += convertNull(orderInfo.fromCityName).replace("市","");
							content += '<i class="ui-ico-sfi ico-fromto"></i>';
							content += convertNull(orderInfo.toCityName).replace("市","");
							content += '</span>';
							content += '</div>';
							
							content += '<div class="express-status-max" id="'+outerDivId+'" onclick="openOrCloseExpressInfo(this,\''+expressId+'\''+","+'\''+outerDivId+'\')">';
							content += '<dl class="ui-flex">';
							content += '<dt class="flex-ico" id="'+dtImgId+'">'+img+'</dt>';
							content += '<dd class="flex-con"><p id="'+pstatusId+'">';
							content += orderStatus;
							content += '</p><p class="order-time">';
							
							
							//计算下单时间
							var time  = formate(convertNull(orderInfo.orderDate));
							var formatTime = getNiceDate(time);
							if(formatTime!=""&&formatTime!=null){
								content += getNiceDate(time)+"下单";
							}else{
								content += convertNull(orderInfo.orderDate)+"下单";
							}
							
							//计算下单时间
							/*var time  = formate(convertNull(orderInfo.orderDate));
							content += getNiceDate(time)+"下单";*/
							content += '</p><p class="order-time">';
							content += '</p>';
							content += '</dd>';
							content += '</dl>';
							content += '<i class="ui-ico-sfi ico-arrow"></i>';
							content += '</div>';
							//电子订单打印寄件人信息   
							
							//寄件方style="display:none;"
							content += '<div class="express-info" id="'+expressId+'" hidden="true" >';
							content += '<p><span class="hot">寄件人：</span>'+convertNull(orderInfo.senderName)+" "+convertNull(orderInfo.senderPhone)+'</p>';
							content += '<p>';
							content +=  convertNull(orderInfo.senderDetailAddress);
							content += '</p>';
							if(orderType==1){
							//收件方
							content += '<p><span class="hot">收件人：</span>'+convertNull(orderInfo.dContact)+" "+convertNull(orderInfo.dPhone)+'</p>';
							content += '<p>';
							content +=  convertNull(orderInfo.consigneeAddress);
							content += '</p>';
							
							}
							//content += '<div class="express-info">';
							
							if(sentWay!='2'){
								content += '<p>预约上门收件时间：</p>';
								content += '<p class="hot">';
								content +=  convertNull(orderInfo.antipateConsigneeDate);
								content += '</p>';
							}
							
							content += '</div>';
							if(sentWay=='2'){
								//嘿客不显示催收和取消订单按钮
								content += '<div class="express-btn ui-dialog-bt ui-cols2 clearfix" style="border-bottom:0">';
								content += '<p><span class="hot">打印单号：</span>';
								content += '<span>';
								content +=  convertNull(orderId);
								content += '</span>';
								content += '</p>';
								
								
							}else{
							if(orderInfo.orderstatus == "0" 
								|| orderInfo.orderstatus == "1"
									|| orderInfo.orderstatus == "2"
									|| orderInfo.orderstatus == "3"
									|| orderInfo.orderstatus == "6"){
								content += '<div class="express-btn ui-dialog-bt ui-cols2 clearfix" id="'+orderInfo.orderNo+'" style="border-bottom:0">'
								+'<span class="ui-btn btn-submit01"  onclick="confirmCancel(this,\''+orderInfo.orderNo+'\')">取消预约</span>';
								if(orderInfo.wetherUrge=='02'){
									
									if(orderInfo.urgeType!='01'){
//									   content += '<span class="ui-btn btn-cancel" style="background-color:#69B425;" onclick="hurryToSend(this,\''+orderInfo.orderNo+'\',this)">提醒上门收件 </span>';
									}else{
//									   content += '<span class="ui-btn btn-cancel" style="background-color:#cccccc;" onclick="clickBtn(this);">已提醒收件 </span>';
									}
								}
								
							}
							}
						
						/*if(orderInfo.orderstatus == "0" 
							|| orderInfo.orderstatus == "1"
							|| orderInfo.orderstatus == "3"
							|| orderInfo.orderstatus == "6"&&){
							
					}
						if(orderInfo.orderstatus == "0" 
							|| orderInfo.orderstatus == "1"
							|| orderInfo.orderstatus == "3"
							|| orderInfo.orderstatus == "6"&&){
							
						}*/
					content+='</div>';
					content += '</a>';
					
					if(orderQuery!=null&&orderQuery!=""){
						content += orderQuery;
					}
					
					
					content += '</li>';
				}
			}
			
			$("#orderList").append(content);
			//addClickEvent();
		}
	}
	
	//改变样式，移除单击熟悉
	function changeColorStyle(event){
		$(event).css('background-color','#cccccc');
		$(event).text('已提醒收件 ');
		$(event).removeAttr("onclick");
	}

	
	function clickBtn(e){
		$("html,body").animate({scrollTop:($(e).offset().top)},1500);	
	}
	//确定取消弹出层
	function alertDialog(content,orderNo,type){	
		//type为1，取消订单，type为2，催收
		var $mask = $('<div class="maskbox"></div>');
		var $dialog = $('<div id="dialog" class="ui-dialog"></div>');
		var $content = $('<div class="ui-alert-content"></div>');
		var $bottom;
		var $btnSubmit;
		if(type==1){
			$bottom = $('<div class="ui-dialog-bt ui-cols2 clearfix"></div>');
		    $btnSubmit = $('<a class="ui-btn btn-submit" href="javascript:cancelOrder(\''+orderNo+'\');">确定</a>');
	      
		}else{

			 $bottom = $('<div class="ui-dialog-bt ui-cols2 clearfix" style="text-align:center;"></div>');
			 $btnSubmit = $('<a class="ui-btn btn-submit01" href="javascript:void(0);">我知道了</a>');
		
		}
		var  $btnCancel = $('<a class="ui-btn btn-cancel" href="javascript:void(0);">取消</a>');
		var dialogDocHeight = 0;
		$content.html(content);
		if(type==1){
		$bottom.append($btnCancel);	
		}
		$bottom.append($btnSubmit);
		$dialog.append($content).append($bottom);
		$mask.css({height:$(document).height()});
		$("body").append($mask);
		$("body").append($dialog);
		dialogDocHeight = $dialog.height();
		
		centerDialog($dialog);
		
		$(window).resize(function(){		
		  centerDialog($dialog);	  
		 }); 
		
		$mask.click(function(){
			$mask.remove();
			$dialog.remove();
			$("body").removeAttr("style");	
		});
		
		$btnSubmit.click(function(){
			/*  
				执行删除数据代码
			*/
			if(type==1){
			$mask.remove();
			$dialog.remove();
			$("body").removeAttr("style");	
			}
			else{
				$mask.remove();
				$dialog.remove();
				$("body").removeAttr("style");		
			}
		});
		
		$btnCancel.click(function(){
			$mask.remove();
			$dialog.remove();
			$("body").removeAttr("style");	
		});
		
		//垂直居中
		function centerDialog(obj){
			var windowWidth = $(window).width();   
			var windowHeight = $(window).height();  
			var popupHeight = $(obj).height();   
			var popupWidth = $(obj).width();
			var top = (windowHeight-popupHeight)/2; 
			var left = (windowWidth-popupWidth)/2;
			var objHeight = "auto";
			
			$mask.css({height:$(document).height()});
			
			if(dialogDocHeight > windowHeight){		
				top = windowHeight * 0.1;
				objHeight = windowHeight - top * 2;					
			}
			
			var bottomHeight = $bottom.outerHeight() + 1;			
			var contentHeight = (objHeight - bottomHeight);
			
			$(obj).css({ 
					"top": top,   
					"left": left ,
					"height":objHeight,
					"overflow":"hidden"
				});
					
			if(dialogDocHeight > windowHeight){	
				$content.css({ 
					"height":contentHeight
				});			
			}else{			
				$content.removeAttr("style"); 
			}
			$("body").css({
					"overflow":"hidden"
				});		
			
		}
		
		
	}
	
	
	function queryOrderDetails(opCode,bno){
		
		getCommonImg("1045","N","1");
		var url = "../../../xiaomi/deliverydetails/routing/";
		if (opCode == "50") {
			url += "waybill-1-1-routing.html";
		} else if (opCode == "44") {
			url += "waybill-3-1-routing.html";
		} else if (opCode == "80" || opCode == "8000") {
			url += "waybill-4-1-routing.html";
		} else {
			url += "waybill-2-1-routing.html";
		}
		
		window.location = url + "?bno=" + bno + "&hasRoute=true";
		
		//location.href ="../../../xiaomi/deliverydetails/no-routing/waybill-4-1.html?bno="+bno+"&hasRoute=true";
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

		  return date.toString("yyyy-MM-dd HH:mm"); 
		  
		  //Problem with the format here?   */ 
		}
	
	
	/**
	 * 点击事件 展示和隐藏 预约事件 收件地址
	 */
	//function addClickEvent(){
	//	$('[data-toggle="expressInfo"]').bind("click",function(){
	//		$(this).toggleClass("open");
	//		$(this).next(".express-info").toggle();
	//	})
	//}	
	
	/**
	 * 隐藏预约内容 
	 */
	//function hideOrderContent(){
	//	$('[data-toggle="tabs"]').find("li").bind("click",function(){
	//		$(this).siblings("li").removeClass("cur").end().addClass("cur");
	//		var tabsContent = $(this).attr("data-menu");
	//		$('[data-content="' + tabsContent +'"]').siblings(".ui-tabs-content").hide().end().show();
	//	})
	//}
	
	/**
	 * 查询我的订单列表 不分页方法
	 */
	//function getMyOrderList(){
	//	$.ajax({
	//		type : "get",
	//		dataType : "json",
	//		url : "/service/order/getMyOrderList",
	//		success : function(json) {
	//			loadOrderList(json);
	//		},
	//		error : function(XMLHttpRequest, textStatus, errorThrown) {
	//		}
	//	});
	//}