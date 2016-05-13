
//默认电子订单确认页面
  var orderType=1;
	$(document).ready(function(){
		//加载订单信息
		loadOrderInfo();
		//加载运费与时效
		loadFeeAndTime();
		
		forbiddenButton();
		
		//判断契约条款是否同意
		 inputChange();
		
		
		$('[data-toggle="show-explain"]').bind("click",function(){
			$(this).toggleClass("open");
		});
		
		getCommonImg("100_3","N","1");
	});
	
	function showClause(){
		alertDialog($('#light1').html(),2);
		 
		
		 
	}
	
	
	function alertDialog(content,type){
		//type 1 提示框  2条款 
		var $mask = $('<div class="maskbox"></div>');
		var $dialog = $('<div id="dialog" class="ui-dialog"></div>');
		var $content = $('<div class="ui-alert-content"></div>');
		var $bottom;
		var $btnSubmit;
        var $btnCancel = $('<a class="ui-btn btn-cancel" href="javascript:void(0);">关闭 </a>');
		   
		if(type==1){
		    $bottom = $('<div class="ui-dialog-bt ui-cols2 clearfix"></div>');
		    $btnSubmit = $('<a class="ui-btn btn-submit" href="javascript:void(0);">我知道了</a>');
		}else{
			 $bottom = $('<div class="ui-dialog-bt ui-cols2 clearfix" style="text-align:center;"></div>');
			 $btnSubmit = $('<a class="ui-btn btn-submit01" href="javascript:void(0);">我知道了</a>');
		}
		
		
		
		
		
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
			$mask.remove();
			$dialog.remove();
			$("body").removeAttr("style");	
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
	
	
	
	
	function showDiv(){
		alertDialog("请同意<a class='span-red' href='javascript:void(0);' onclick='javascript:$('#light').hide();$('#light1').show();'>《快递运单契约条款》</a>",1); 
		
	}
	
	function hideDiv(){
		 $('#light1').hide();
		 $('#fade').hide();
		 $('body').css("overflow","auto");
	}
	
	
	function loadOrderInfo(){
		var orderJSON = getUrlParams("orderJSON");
		if(orderJSON && orderJSON != null && orderJSON != ""){
			var orders = $.parseJSON(orderJSON).orders;	//下单信息
			var senderInfo = $.parseJSON(orderJSON).senderInfo;	//寄件人信息
			var shipingInfo = $.parseJSON(orderJSON).shippingAddress;//收 件人信息
			var destination = $.parseJSON(orderJSON).destination; //目的地 

			//获取订单类型 
			orderType = convertNull(senderInfo.orderType);
			
			
			//寄件人信息
			$("#sender").text(convertNull(senderInfo.sender)); //寄件人
			$("#phone").text(convertNull(senderInfo.phone)); //寄件人电话
			//寄件人详细地址  = 省份名称 + 城市名称 + 区县名称 + 详细地址
			var senderAddress = convertNull(senderInfo.provinceName) +" "+ convertNull(senderInfo.cityName) + 
			" "+convertNull(senderInfo.countyName) + " "+convertNull(senderInfo.detailedAddress);
			$("#mailingAddress").text(senderAddress);
			
			if(orderType==1&&shipingInfo!=null){
				 $('#destinationAddressDiv').hide();
				 $('#sentAddressDiv').show();
						//收件人信息
						$("#sent").text(convertNull(shipingInfo.shippingSender)); //寄件人
						$("#shippingPhone").text(convertNull(shipingInfo.shippingPhone)); //寄件人电话
						//收件人详细地址  = 省份名称 + 城市名称 + 区县名称 + 详细地址
						var shippingAddress = convertNull(shipingInfo.shippingProvinceName) +" "+ convertNull(shipingInfo.shippingCityName) + 
						" "+convertNull(shipingInfo.shippingCountyName) + " "+convertNull(shipingInfo.shippingDetailedAddress);
						$("#shippingAddress").text(shippingAddress);
						
						
						$('#sentWayDiv').show();
						$('#orderRemarkDiv').show();
                        if(orders.sentWay!=null){
						var sentWay = "上门收件";
						$('#antipateConsigneeDateDiv').show();
						$('#selectLabelDiv').show();
						if(orders.sentWay==2){
							sentWay = "嘿客寄";
							$('#antipateConsigneeDateDiv').hide();
							$('#orderRemarkDiv').hide();
							$('#selectLabelDiv').hide();
						}
						 $('#sentWay').text(orders.sentWay);
						 $('#sentWayCode').text(sentWay);
						
                        }
                       
						
							var paymentMethod = "寄付现结";
							if(orders.paymentMethod==2){
								paymentMethod = "到付";
							}
							$('#paymentMethodCode').text(paymentMethod);
							$('#paymentMethod').text(orders.paymentMethod);
							$('#paymentMethodDiv').show();
						
						
					
						      $('#insuredAmount').text(orders.insuredAmount);
						      $('#insuredAmountDiv').show();
							
			
		}else{
			//目的地
			var destinationAddress = convertNull(destination.provinceName) + " " + convertNull(destination.cityName) + 
			" " + convertNull(destination.countyName) + " " + convertNull(destination.detailedAddress);
			$("#destinationAddress").text(destinationAddress);
			$("#destinationAddress").show();
			$('#sentAddressDiv').hide();
			$('#sentWayDiv').hide();
			$('#paymentMethodDiv').hide();
			$('#insuredAmountDiv').hide();
		}
			//订单信息
			$("#weight").text(convertNull(orders.weight)+"kg");	//重量
			
			$("#depositumGoods").text(convertNull(orders.depositumGoods)); //寄托物
			$("#orderRemark").text(convertNull(orders.textRemark)); //文本备注
			$("#antipateConsigneeDate").text(convertNull(orders.antipateConsigneeDate)); //寄托物
			
			//动态加载备注标签
			var remarkLabels = orders.labelRemark;
			if(remarkLabels && remarkLabels != null && $.trim(remarkLabels) != ""){
				var ulContent = "";
				if(remarkLabels.indexOf(",") > 0){
					var labels = remarkLabels.split(",");
					for(var i=0; i< labels.length; i++){
						ulContent += '<span class="ui-btn btn-item selected">'+labels[i]+'</span>';
					}
				} else {
					ulContent += '<span class="ui-btn btn-item selected">'+remarkLabels+'</span>';
				}
				$("#selectLabel").prepend(ulContent);
			}
			
			param = orderJSON;
		}
	}
	
	function inputChange(){
		
		$("#makeSure").change(function(){
			if(!$('#makeSure').attr("checked")==true){
			forbiddenButton();
		   }else{
			   startUsingButton();
		   }
		});
	}

	/**
	 * 查询并加载运费与时效
	 */
	function loadFeeAndTime(){
		//嘿客不加载运费与时效
		if($('#sentWay').text()!=2){
				$("#waitplease").show();
				var orderJSON = getUrlParams("orderJSON");
				var orders = $.parseJSON(orderJSON).orders;				//下单信息
				var senderInfo = $.parseJSON(orderJSON).senderInfo;		//寄件人信息
				var destination = $.parseJSON(orderJSON).destination; 	//目的地
				var shipingInfo = $.parseJSON(orderJSON).shippingAddress;//收 件人信息
				
				if(senderInfo.orderType==1){
				
				//设置参数
				var params = {
					"srcAddr":senderInfo.cityId,		//原寄地城市编码
					"srcName":senderInfo.cityName,		//原寄地城市名称
					"destAddr":shipingInfo.shippingCityId,		//目的地市编码,
					"srcCounty":senderInfo.countyId,	//原寄地区/县编码
					"destCounty":shipingInfo.shippingCountyId,	//目的地区/县
					"goodsWeigth":orders.weight,		//重量
					/*"sentWay":orders.sentWay,
					"paymentMethod":orders.paymentMethod,
					"insuredAmount":orders.insuredAmount,*/
					"type":1,
					"orderType":1,
					"sendTime":orders.orderTime			//下单时间
				};
				}
				else{
					//设置参数
					var params = {
						"srcAddr":senderInfo.cityId,		//原寄地城市编码
						"srcName":senderInfo.cityName,		//原寄地城市名称
						"destAddr":destination.cityId,		//目的地市编码,
						"srcCounty":senderInfo.countyId,	//原寄地区/县编码
						"destCounty":destination.countyId,	//目的地区/县
						"goodsWeigth":orders.weight,		//重量
						"type":1,
						"orderType":0,
						"sendTime":orders.orderTime			//下单时间
					};
				}
				 getFeeAndTime(params);
		}
	}
	
	/**
	 * 查询运费与时效
	 * @param param
	 */
	function getFeeAndTime(param){
		$.post("/service/alipay/searchFeeAndTime",param,function(result){
			if(result && result.length>0){
				$("#waitplease").hide();
				createDom(result,param.srcName);
				$("#freightTimelinessDiv").show();
			}else {
				$("#waitplease").hide();
				$("#freightTimelinessDiv").hide();
			}
		},"json"); 
	}
	
	
	/**
	 * 提交订单
	 */
	var param;	
	function submitOrder(){
		//禁用提交按钮
		//forbiddenButton();
		
		var className = $('#orderConfirmBut').attr('class'); 
		if(className=="ui-btn btn-submit disable"){
			showDiv();
		}else{
		//提交预约
		$.ajax({
			type : "POST",
			data : {orderJSON:param},
			dataType : "json",
			url : "/service/order/order/submitOrder",
			success: function(result){
				if(result){
					if(result.code == "200"){
						//清空寄件相关cookie信息
						clearCookie();
						//跳转成功页面
						window.location = "/../../xiaomi/range/ship_success.html?resultJson="+JSON.stringify(result);
					} else if(result.code == "201") {
						tipsDialog("预约失败");
						startUsingButton();
					} else if(result.code == "203"){
						tipsDialog("参数错误");
						startUsingButton();
					}
				} else {
					tipsDialog("服务器未响应");
					startUsingButton();
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				tipsDialog("服务器未响应");
				startUsingButton();//启用提交按钮
			}
		});
		}
	}
	
	
	
	
	/**
	 * 禁用提交按钮
	 */
	function forbiddenButton(){
		$("#orderConfirmBut").removeClass("ui-btn btn-submit");
	    $("#orderConfirmBut").addClass("ui-btn btn-submit disable");
	    //document.getElementById("orderConfirmBut").onclick = "";
	    
		//var subButton = $("#submitBtn");
		//document.getElementById("orderBtn").onclick = "";
		//subButton.attr("style","background-image: -moz-linear-gradient(top, #DDDDDD, #000000); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #DDDDDD), color-stop(1, #000000)); background-image: -o-linear-gradient(top, #DDDDDD, #000000); background-color:#000000; color:#fff; text-shadow: -1px -1px 0 #000000;");
	}
	
	/**
	 * 启用提交按钮
	 */
	function startUsingButton(){
		$("#orderConfirmBut").removeClass("ui-btn btn-submit disable");
	    $("#orderConfirmBut").addClass("ui-btn btn-submit");
	    document.getElementById("orderConfirmBut").onclick = submitOrder;
		//var subButton = $("#submitBtn");
		//document.getElementById("orderBtn").onclick = submitOrder;
		//subButton.attr("style","background-image: -moz-linear-gradient(top, #ec5b5b, #ec5b5b); background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ec5b5b), color-stop(1, #ec5b5b)); background-image: -o-linear-gradient(top, #ec5b5b, #ec5b5b); background-color:#ec5b5b; color:#fff; text-shadow: -1px -1px 0 #c11933;");			
	}
	
	/**
	 * 清楚寄件相关cookie信息
	 */
	function clearCookie(){
		deleteCookie("userAddBookCount");
		deleteCookie("orderInfo");
		deleteCookie("destinationInfo");
		deleteCookie("asbkId");
		deleteCookie("userAddress");
		deleteCookie("userDefaultAddress");
		deleteCookie("remarkLabel");
		deleteCookie("orderRemark");
		deleteCookie("insuredAmount");
	}
	
	/**
	 * 获取URL参数
	 */
	function getUrlParams(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURI(r[2]);
		}
		return null;
	}