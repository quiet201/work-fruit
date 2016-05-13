var bno;
var qxBno='';
$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00503");
	//removeShippingaddress();
	getDescPage("commonPage","/page/common/tips/tips.html");
	var urlParams = {
			bno : ""
		};
	
	init(urlParams);
	
	getData(urlParams.bno);	
	
	//填充页面信息
	//fullInfo();
	
});

function showDiv(){
	if(qxBno !=''){
		$('#showCancel').show();
		$('#reasonDiv').show();	
	}
};

function quitCancle(){
	$('#showCancel').hide();
	$('#reasonDiv').hide();
}

function sureCancle(){
	cancelOrder(qxBno);
}

function otherClick(){
	var canFrom = $('input[name="canFrom"]:checked').val();
	if(canFrom == '6'){
		$('#input-msg-div').show();
	}else{
		$('#input-msg-div').hide();
	}
}
//初始化页面
function init(obj) {
	getUrlParams(obj);
}


//填充
function fullInfo(result){
	$('#bno').text(result.orderNo);
	if(null!=result.antipateConsigneeDate&&''!=$.trim(result.antipateConsigneeDate)){
	 $('#receiveTimes').text(formatDate(result.antipateConsigneeDate));
	}
	$('#name').text(result.senderName);
	$('#tel').text(result.senderPhone);
	$('#address').text(result.senderDetailAddress);
	
	
	//判断是否电子运单
	if(null!=result.consigneeAddress&&''!=$.trim(result.consigneeAddress)){
		$('#sentName').text(result.dContact);
		$('#sentTel').text(result.dPhone);
		$('#sentAddress').text(result.consigneeAddress);	
	
			if('1'==result.payMethod){
			 $('#payMethod').text("寄付现结");
			}else{
			 $('#payMethod').text("到付");	
			}
			//判断是否嘿客寄
		     if('2'==result.sentWay){
				 $('#sentMethod').text("嘿客寄");
				 $('#orderStatus').text("请到附近嘿客店打印订单");
				 $('#orderStatusDiv').hide();
				 //显示打印单号 隐藏上门时间及备注信息
				 $('#printOrderNo').text(result.printOrderNo);
			     $('#printOrderNoDiv').show();
			     $('#receiveTimesDiv').hide();
			     $('#orderRemarkDiv').hide();
			         
			     $('#hkOrder').show();
			     $('#ElePrder').hide();
			    // $("#btnHurryToSend").attr("href", $("#btnHurryToSend").attr("href")+"?flag=hk");
			}else{
				 $('#orderStatusDiv').show();
				 $('#sentMethod').text("上门收件");
				if('1'==result.orderstatus||'3'==result.orderstatus){
					 $('#orderStatus').text("等待收件"); 
				 }else if('5'==result.orderstatus){
					 $('#orderStatus').text("已收件"); 
					 $('#receiveTimesDiv').hide();
				 }else if('6'==result.orderstatus){
					 $('#orderStatus').text("异常收件");
					 $('#receiveTimesDiv').hide();
				 }else if('7'==result.orderstatus){
					 $('#orderStatus').text("取消处理中");
					 $('#receiveTimesDiv').hide();
				 }else if('8'==result.orderstatus){
					 $('#orderStatus').text("已取消");
					 $('#receiveTimesDiv').hide();
				 }
				 //$('#orderStatus').text("等待收件");  
			  
					
			}
     $('#insuredAmount').text(result.insuredAmount);
     $('#depositum').text(result.cargoName);
	
	}else{
		//非电子运单不显示收件人等信息
		$('#sentAddrDiv').hide();
		$('#sentInfoDiv').hide();
		$('#sentMethodDiv').hide();
		$('#payMethodDiv').hide();
		$('#depositumDiv').hide();
		$('#orderRemarkDiv').show();
		
		
		if('1'==result.orderstatus||'3'==result.orderstatus){
			 $('#orderStatus').text("等待收件"); 
		 }else if('5'==result.orderstatus){
			 $('#orderStatus').text("已收件"); 
			 $('#receiveTimesDiv').hide();
		 }else if('6'==result.orderstatus){
			 $('#orderStatus').text("异常收件");
			 $('#receiveTimesDiv').hide();
		 }else if('7'==result.orderstatus){
			 $('#orderStatus').text("取消处理中");
			 $('#receiveTimesDiv').hide();
		 }else if('8'==result.orderstatus){
			 $('#orderStatus').text("已取消");
			 $('#receiveTimesDiv').hide();
		 }
	}
	
	 //$('#orderStatus').text("等待收件");  
 
	
	  //此时判断是否可催派及取消订单
	//判断是否可催收
	if(result.orderstatus == "0" 
		|| result.orderstatus == "1"
			|| result.orderstatus == "2"
			|| result.orderstatus == "3"
			|| result.orderstatus == "6"){
		if('02'==result.wetherUrge){
			
			if('01'!=result.urgeType){
			   //content += '<span class="ui-btn btn-cancel" style="background-color:#69B425;" onclick="hurryToSend(this,\''+orderInfo.orderNo+'\',this)">提醒上门收件 </span>';
				$('#btnHurryToSend').attr('onclick','hurryToSend(this);');
			}else{ 
			   //content += '<span class="ui-btn btn-cancel" style="background-color:#cccccc;" onclick="clickBtn(this);">已提醒收件 </span>';
				$('#btnHurryToSend').css('color','#cccccc');
				$('#btnHurryToSend').css('border-color','#cccccc');
				$('#btnHurryToSend').attr('onclick','alertSuccess("已经提醒过啦")');
				$('#btnHurryToSend').text("已提醒收件");
			}
		}else{
			   $('#btnHurryToSend').css('color','#cccccc');
			   $('#btnHurryToSend').css('border-color','#cccccc');
		}
	}else{
		       $('#btnHurryToSend').css('color','#cccccc');
		       $('#btnHurryToSend').css('border-color','#cccccc');
	}
		
	//判断是否可取消订单
		if(result.orderstatus == "0" 
			|| result.orderstatus == "1"
				|| result.orderstatus == "2"
				|| result.orderstatus == "3"
				|| result.orderstatus == "6"){
			//$('#btnCancel').attr('onclick','confirmCancel(this,\''+result.orderNo+'\');');
			qxBno = result.orderNo;
		}else{
			/*$('#btnCancel').css('color','#cccccc');
		    $('#btnCancel').css('border-color','#cccccc');*/
			qxBno = '';
			$('#qxOrder').css('color','#cccccc');
		    $('#qxOrder').css('border-color','#cccccc');
		}
	
	$('#weight').text(result.weight+"KG");
	if(null!=result.orderRemark&&''!=$.trim(result.orderRemark)){
	 $('#orderRemark').text(result.orderRemark.replace(/\+/g,""));
	}
	
	
	
	
	
}

//获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "bno") {
				urlParams.bno = unescape($.trim(strs[i].split("=")[1]));
				bno = urlParams.bno;
			}
		}
	}
}


function getData(bno){	
	$.ajax({
		type : "get",
		dataType : "json",
		url : "/service/order/getMyOrderByBno/"+bno,
		success : function(data) {
			if(null!=data){
			 fullInfo(data);
			 getCommonImg("1005","N","1");
			}else{
				getCommonImg("1005","N","2");
				alert("系统繁忙，请稍后再试");
			}
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			getCommonImg("1005","N","3");
		}
	});
}

//催收
function hurryToSend(e){
	//var orderNo='C000000413';	
		$.ajax({
			type : "POST",
			data : null,
			dataType : "json",
			url : "/service/order/orderContro/changeOrder/"+bno+"/4",
			success: function(json){
				if(json && json != null){
					if(json=='1'){
					alertSuccess("已成功提醒收派员上门收件");
					$(e).text("已提醒收件");
					$(e).removeAttr("onclick");
					$(e).css('color','#cccccc');
					$(e).css('border-color','#cccccc');
					getCommonImg("1144","N","1");
					}
					else{
						alertError("系统繁忙，请稍后再试！");
						getCommonImg("1144","N","2");
					}
				}
				else{
					alertError("系统繁忙，请稍后再试！");
					getCommonImg("1144","N","2");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alertError('系统繁忙，请稍后再试！');
				getCommonImg("1144","N","3");
			}
		});
		
		//$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);
		
	}

//取消订单弹出框
function confirmCancel(e,orderNo){
	alertDialog3('确定取消该订单？',orderNo,2);
	//showTip("确定取消该订单？",tipsCancel,tipsSubmit);
	/*$('#showCancel').show();
	$('#btnOk').attr('onclick','cancelOrder(\''+orderNo+'\');removeDialogs();');
	$('#btnCancel').attr('onclick',"removeDialogs();");*/
	/*if(alertDialog("是否要取消该订单?",orderNo,1)){
	}
	$("html,body").animate({scrollTop:($(e).offset().top)-30},1000);*/
}

//删除动作
//function tipsCancel(index){};
//确定删除
/*function tipsSubmit(orderNo){
	cancelOrder(orderNo);
};*/



function alertDialog(content,orderNo,type){	
	//type为1，取消订单，type为2，催收
	var $mask = $('<div class="maskboxs"></div>');
	var $dialog = $('<div id="dialog" class="ui-dialogs"></div>');
	var $content = $('<div class="ui-alert-contents"></div>');
	var $bottom;
	var $btnSubmit;
	if(type==1){
		$bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix"></div>');
	    $btnSubmit = $('<a class="ui-btns btn-submits" href="javascript:cancelOrder(\''+orderNo+'\');">确定</a>');
      
	}else{

		 $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix" style="text-align:center;">取消</div>');
		 $btnSubmit = $('<a class="ui-btns btn-submit01" href="javascript:void(0);">确定</a>');
	
	}
	var  $btnCancel = $('<a class="ui-btns btn-cancels" href="javascript:void(0);">取消</a>');
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

function removeDialogs(){
	$('#showCancel').remove();
	/*$('#showCancel').hide();
	$("body").remove('#showCancel');*/
	//$('#showCancel').hide();
}



/*function alertDialogs(content,orderNo,type){

}*/

/*<div class="maskbox" style="z-index:10; opacity:.9;" id="showCancel" hidden="true"><div class="tip-box">
	<h2>确认删除运单记录？</h2>
<div class="tip-content"><p>确定取消该订单？</p></div>
<div class="tip-btn">
    	<a class="tip-btn-a1" href="javascript:void(0);" id="btnCancel">
			<div class="tip-btn-a-div">取消</div>
    	</a>
    	<a class="tip-btn-a2" href="javascript:void(0);" id="btnOk">
			<div class="tip-btn-a-div">确认</div>
    	</a>
</div>
</div>*/


function alertDialog3(contect,orderNo,type){
	var $mask = $('<div class="maskbox" style="z-index:10; opacity:.9;" id="showCancel"></div>');
	var $tip = $('<div class="tip-box"></div>');
	var $content = $('<h2>'+contect+'</h2>');
	var $tipBtn = $('<div class="tip-btn"></div>');
	var $bottom;
	var $btnSubmit;
	if(1==type){
		$bottom = $('<a class="tip-btn-a1" href="javascript:void(0);" id="btnCancel">'+
				'<div class="tip-btn-a-div">取消</div></a>');
	    $btnSubmit = $('<a class="tip-btn-a2" href="javascript:cancelOrder(\''+orderNo+'\');" id="btnOk">'+
				'<div class="tip-btn-a-div">确认</div></a>');
		    	//</a><a class="ui-btn btn-submit" href="javascript:cancelOrder(\''+orderNo+'\');">确定</a>');
	}else{
		$bottom = $('<a class="tip-btn-a1" href="javascript:void(0);" id="btnCancel" onclick="removeDialogs();">'+
		        '<div class="tip-btn-a-div">否</div></a>');
        $btnSubmit = $('<a class="tip-btn-a2" href="javascript:cancelOrder(\''+orderNo+'\');" id="btnOk">'+
		'<div class="tip-btn-a-div">是</div></a>');
	}
	
	//将各部分标签组合起来
	$tipBtn.append($bottom);
	$tipBtn.append($btnSubmit);
	$tip.append($content);
	$tip.append($tipBtn);
	$mask.append($tip);
	$("body").append($mask);
	
	
}


//确定取消弹出层
function alertDialogs(content,type){	
	//type为1，取消订单，type为2，催收
	var $mask = $('<div class="maskboxs"></div>');
	var $dialog = $('<div id="dialog" class="ui-dialogs"></div>');
	var $content = $('<div class="ui-alert-contents"></div>');
	var $bottom;
	var $btnSubmit;
	if(type==1){
		$bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix"></div>');
	    $btnSubmit = $('<a class="ui-btns btn-submits" href="javascript:cancelOrder(\''+orderNo+'\');">确定</a>');
      
	}else{

		 $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix" style="text-align:center;"></div>');
		 $btnSubmit = $('<a class="ui-btns btn-submit01" href="javascript:void(0);">我知道了</a>');
	
	}
	var  $btnCancel = $('<a class="ui-btns btn-cancels" href="javascript:void(0);">取消</a>');
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
		  
			//执行删除数据代码
		
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

/**
 * 取消订单
 */
function cancelOrder(orderNo){
	//百度统计
	//commonEventPush('寄件','页面统计','收送范围','index.html');
	var canReason = $('input[name="canFrom"]:checked').val();
	if(canReason == '6'){
		var msg= $('#input-msg-div').val();
		if(msg !=''){
			canReason = msg;
		}
	}
	//关闭弹出框
	$('#showCancel').remove();
	$.ajax({
		type : "POST",
		data : {cancleReason:canReason},
		dataType : "json",
		url : "/service/order/cancelOrder/"+orderNo,
		success: function(json){
			if(json && json != null){
				if(json.code == "200"){
					$('#MsgInfo').text('订单取消中，已提交系统处理');
					$('#success').show();
					setTimeout(function () {
						$('#success').fadeOut(500);
					}, 2500);
					$('#orderStatus').text('订单取消中');
					//("订单取消中，已提交系统处理");
					//window.location.href="/page/netease/orderlist/orderDetails.html?bno="+orderNo;
					/*var pstatusId = "pstatusId"+orderNo;
					var dtImgId = "dtImgId"+orderNo;
					document.getElementById(orderNo).style.display = "none";
					document.getElementById(pstatusId).innerText = "订单取消中，已提交系统处理";
					document.getElementById(dtImgId).innerHTML = '<i class="ui-ico-sfi ico-express-cancel"></i>';*/
				} else if(json.code == "201"){
					$('#errorInfo').text(json.message);
					$('#errorMsg').show();
					setTimeout(function () {
						$('#errorMsg').fadeOut(500);
					}, 2500);
					//tipsDialog(json.message);
				}
				//修改按钮样式
				$('#btnCancel').css('color','#cccccc');
			    $('#btnCancel').css('border-color','#cccccc');
			    $('#btnCancel').attr('onclick','');
			    $('#qxOrder').css('color','#cccccc');
			    $('#qxOrder').css('border-color','#cccccc');
			    $('#qxOrder').attr('onclick','');
			    //同时修改催收按钮样式
			    $('#btnHurryToSend').css('color','#cccccc');
			    $('#btnHurryToSend').css('border-color','#cccccc');
			    $('#btnHurryToSend').attr('onclick','');
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});
}

/*function showTip(){
	var $mask = $('<div class="maskbox" style="z-index:2; opacity:.9;"></div>');
	$mask.append($(".tip-box"));
	$("body").append($mask);
}*/


/*function formatDate(times){
	var date  = fillNull(times).substr(0,10);
    var time = fillNull(times).substr(11,resutl.receiveTime.length-1);
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
      }
      return showDate;
      //$("#receiveTimes").text(showDate);
}*/

function alertSuccess(contect){
	$('#MsgInfo').text(contect);
	$('#success').show();
	setTimeout(function () {
		$('#success').fadeOut(500);
	}, 2500);
}

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 2500);
}










