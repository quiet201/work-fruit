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
	
	getData(urlParams);	
	
	addListen();
	
	//填充页面信息
	//fullInfo(null);
	
});

(function(Z,SF){
    Z(document).ready(function(){
        /*
         * 本页面相关交互
         */
        /*表单验证输入错误提示*/
        var tipsMap={
            'waybillNumber':{
                'required':'运单号不能为空',
                'regRule':'运单号为12位数字'
            }
        }; 
        var scanFlag=false;
        var uaVersion=SF.APDetect;
        /*条码扫描点击*/
        Z('#J_barcodeTrigger').on('click',function(e){
        	if($('#J_barcodeTrigger .ico-no').length>0){
        		$("#bnoTxt").val("");
        		$(".ico-no").removeClass("ico-no").addClass("ico-scanning");
        		
        		$('#btn').css('border','#cccccc 1px solid');
        		$('#btn').css('color','#cccccc');	
        		return;
        	}
        	
            e.preventDefault();
            if(uaVersion>=8.1){
                window.callBridge('scan', {
                    type: 'bar'
                }, function (result) {
                    if(result.barCode){
                   var barCode = result.BarCode;
                   var orders={
           	 			orderNo : "",
           	 			devlceid :"",
           	 			deviceType :""
           	 		};
           	 	   orders.orderNo = $("#bno").html();	
           		   if (barCode.indexOf("?") != -1) 
           			var url = barCode.substr(barCode.indexOf("?")+1,barCode.length);{
           			//var str = url.substr(1);
           			strs = url.split("&");
           			for (var i = 0; i < strs.length; i++) {
           				if ([ strs[i].split("=")[0] ] == "printId") {
           					orders.devlceid = unescape($.trim(strs[i].split("=")[1]));
           					
           				}
           				if ([ strs[i].split("=")[0] ] == "printType") {
           	                //对页面做填充
           					orders.deviceType=unescape($.trim(strs[i].split("=")[1]));
           	              
           				}
           			}
           		   
               		
               		ajaxSub(orders);
               	}
                    	
                    	
                    	
                       /* Z('#bnoTxtShow').val(result.barCode);
                        Z('#bnoTxt').val(result.barCode);
                        scanFlag=true;
                        
                        //此时进行提交操作
                        $("#queryBtn").click();*/
                        
                    }
                });
            }else if(uaVersion!=0){
                SF.alertMsg('您的钱包版本比较旧，升级新版才能使用该功能。');
            }else{
                SF.alertMsg('您只有在支付宝钱包中才能使用这个功能');
            }
        });
        /*照片上传点击*/
        Z('#J_pictureTrigger').on('click',function(e){
            e.preventDefault();
            if(uaVersion>=8.1){
            	// 图片的临时目录
            	//var path = "";
            	// 获取图片临时目录
            	$.ajax({
            		type : "GET",
            		url : "/service/alipay/getTmpUri",
            		success: function(data){
            			path = data;
            		},
            		error:function(){alert("系统繁忙,请稍后重试!");}
            	});
            }else if(uaVersion!=0){
                SF.alertMsg('您的钱包版本比较旧，升级新版才能使用该功能。');
            }else{
                SF.alertMsg('您只有在支付宝钱包中才能使用这个功能');
            }
        });

        //表单提交
 	   Z('#J_formSearchByWaybillNumber').on('submit',function(e){
 		   var validResult=SF.validForm(Z(this));
 		   if(validResult){
 			   SF.validTips(validResult,tipsMap);
 			   e.preventDefault();
 		   }
 	   });
       $("#btn").off("click").on("click", function(){
    		$("#queryBtn").click();
    		if(scanFlag){
    			getCommonImg("1044","N","1");
    		}else{
    			getCommonImg("1043","N","1");
    		}
       });
       
       $(".icons-SVG-12").off("click").on("click", function(){
    		$("#queryBtn").click();
    		if(scanFlag){
    			getCommonImg("1044","N","1");
    		}else{
    			getCommonImg("1043","N","1");
    		}
       });
    });
})(Zepto,SHUNFENG);

//选项卡切换事件
function addListen(){
	$(".module-c dl").click(function(){
		 $(this).addClass("cur").siblings().removeClass("cur"); //切换选中的按钮高亮状态
		 var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
		 //$(".box-coupons-con").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
		 //$(".box-coupons-con").eq(index).show();
		/* var deviceType =$(".module-c .cur span").html();
		 alert(deviceType);*/
		 //选中按钮时设置提交按钮变成红色
		 $("#btnSubmit").removeClass("btn-cancel");
		 $("#btnSubmit").attr("onclick","submitDate()");
		 });
}



//初始化页面
function init(obj) {
	getUrlParams(obj);
}

function otherClick(){
	var canFrom = $('input[name="canFrom"]:checked').val();
	if(canFrom == '6'){
		$('#input-msg-div').show();
	}else{
		$('#input-msg-div').hide();
	}
}

//点击立即打印提交数据到后台
function submitDate(){	
	//获取数据
	var bno = $("#bno").html();
	var devlce = $(".module-c .cur .store-name-device").html();
	var device_Type =$(".module-c .cur span").html();
	var orders={
		orderNo : bno,
		devlceid :devlce,
		deviceType :device_Type
	};
	
	// 数据提交
	ajaxSub(orders);
	
	
}


function  ajaxSub(orders){
	
	
	
	$.ajax({
		type : "POST",
		data : orders,
		async : false,
		dataType : "json",
		url : "/service/order/printOrder",
		success : function(data) {
			if (data && data != null) {
				//fillSenderInfo(data,"userAddress","dataBase");
				//无论成功或是失败 统统跳转页面
				var json = eval(data);
				window.location = "/page/alipay/sinceorder/ship-print-state.html?status="+json.status+"&orderNo="+bno;
				
			}else{
				tipsDialog("查询失败");
				getCommonImg("1028","N","2");
			}
		},
		error : function(e) {
			//tipsDialog("查询失败");
			getCommonImg("1028","N","3");
		}
	});
}
//填充数据到页面
function fullInfo(result){
	//若查询到打印设备数据为null  进行空数据处理
	if(null==result){
		$("#data_order").hide();
		$("#btnSubmit").hide();
		$("#no_date").show();
	}else{
	//查询到数据，展示给用户
	var  dateTemp = "<dl><span hidden='hidden' id='deviceType'></span><dd class='box-radio-device'><input type='radio' class='radio-device'></dd>"+
                     "<dt><label class='store-name-device cell' id='edviceId'></label></dt>"+
                     "<dd class='store-adress' id='storeName'>白石龙一区100栋<input/></dd></dl>";
	
	
	
	var configList = $("#data_order");
	$.each(result ,function(index,item){
		var obj  = $(dateTemp).clone();
		
		obj.find("#deviceType").text(fillNull(item.deviceType)).removeAttr("id");
		obj.find("#edviceId").text(fillNull(item.deviceId)+fillNull(item.invalidDate)).removeAttr("id");
		obj.find("#storeName").text(fillNull(item.storeName)).removeAttr("id");
		configList.append(obj);
	
	});
	
	//为空时显示空图片
	if($("#data_order > dl").length==0){
		$("#data_order").hide();
		$("#btnSubmit").hide();
		$("#no_date").show();
	}else{
		$("#data_order").show();
		$("#no_date").hide();
	}
	
	
	}

	
}

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


//获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "orderNo") {
				urlParams.bno = unescape($.trim(strs[i].split("=")[1]));
				bno = urlParams.bno;
			}
		
		}
	}
}


function getData(result){	

	//将订单号展示在页面上
	$("#bno").html(result.bno);
	
	//获取设备
	
	getConfigList();
	
	
	
	
}
//获取设备列表
function getConfigList(){
	$.ajax({
		type : "POST",
		data : null,
		async : false,
		dataType : "json",
		url : "/service/order/queryZnzdConfig",
		success : function(data) {
			fullInfo(data);
		},
		error : function(e) {
			//tipsDialog("查询失败");
			getCommonImg("1028","N","3");
		}
	});
}














	
	







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












