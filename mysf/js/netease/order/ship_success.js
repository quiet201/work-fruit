var orderNo;
$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00502");
		$('[data-toggle="show-explain"]').bind("click",function(){
			$(this).toggleClass("open");
		});
		
		loadPage();
		
		clearCookie();
		
		
	});
	
	/**
	 * 页面加载时显示下单成功信息
	 */
	function loadPage(){
		var resutl = getUrlValueByKey("resultJson");
		var params=resutl;
		if(resutl && resutl != null){
			resutl = $.parseJSON(resutl);
			
			orderNo = fillNull(resutl.orderNo);
			//设置查看详情链接地址
			$('#seeOrder').attr('href','../orderlist/orderDetails.html?bno='+orderNo);
			$("#receiveAddress").text(fillNull(resutl.receiveAddress));
			//$("#orderNoSpan").text();
			getCommonImg("1004",resutl.orderNo,"1");
			$("#senderNameLabel").text(fillNull(resutl.contact)+" "); //寄件人
			$("#senderPhoneLabel").text(AesDecrypt(fillNull(resutl.phone))); //寄件人电话
				//寄件人详细地址  = 省份名称 + 城市名称 + 区县名称 + 详细地址
			$("#senderAddress").text(fillNull(resutl.receiveAddress));					
				//判断是否嘿客运单
				var orderNo = fillNull(resutl.orderNo);
				
				$("#orderNoSpan1").text(fillNull(resutl.orderNo));
				var printOrderNo = fillNull(resutl.printOrderNo);
				if(null!=printOrderNo&&""!=$.trim(printOrderNo)){
					//此时为嘿客
					$('#hkInfo').show();
					$('#printOrderNo').text(printOrderNo);
					$('#receiveTimesDiv').hide();//不显示预计上门时间
					$('#receiveTimes').hide();
				}else{
					/*var date  = fillNull(resutl.receiveTime).substr(0,10);
		            var time = fillNull(resutl.receiveTime).substr(11,resutl.receiveTime.length-1);
					var arys1= date.split('-'); 
				    var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);  
				    var item =  ssdate.getDay();
		            var showDate = null;
				      //计算日期 0代表周日
				      switch(item){
				      case 0:
				    	  showDate = date + ' 周日  '+time; 
				    	  break;
				      case 1:
				    	  showDate = date + ' 周一 '+time; 
				    	  break;
				      case 2:
				    	  showDate = date + ' 周二 '+time; 
				    	  break;
				      case 3:
				    	  showDate = date + ' 周三  '+time; 
				    	  break;
				      case 4:
				    	  showDate = date + ' 周思  '+time; 
				    	  break;
				      case 5:
				    	  showDate = date + ' 周五  '+time; 
				    	  break;
				      case 6:
				    	  showDate = date + ' 周六  '+time; 
				    	  break;
				      }*/
				      if(null!=resutl.receiveTime&&''!=$.trim(resutl.receiveTime)){
				    	  $("#receiveTimes").text(formatDate(resutl.receiveTime));  
				      }
				      
				}
				
			
				getCommonImg("1004",orderNo,"1");
			//}
			var tempBtn=$(".ui-btn.btn-submit").attr("href");
			$(".ui-btn.btn-submit").attr("href",tempBtn+"?resultJson="+params);
		
		}
		
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
	/**
	 * 清除下单页面缓存
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
		deleteCookie("sentAsbkId");
		deleteCookie("destinationInfo");
		deleteCookie("userSentAddress");
	}