$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00301"); 
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	//初始化页面项
	//init();
	listenEvent();
	getCommonImg("12","N","1");
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
                        Z('#bnoTxtShow').val(result.barCode);
                        Z('#bnoTxt').val(result.barCode);
                        scanFlag=true;
                        
                        //此时进行提交操作
                        $("#queryBtn").click();
                        
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
function init(){
	/*$("#noHistoryResult").hide();
	$("#clernHistory").hide();
	$('#queryHistory').hide();*/
	
	var hasData=getUrlValueByKey("hasRoute");
	if($.trim(hasData)!==""){
		$("#noResult").show();
		$("#clernHistory").hide();
		//同时隐藏插件历史
		$('#queryHistory').hide();
	}
	var waybill=getUrlValueByKey("waybill");
	if($.trim(waybill)!==""){
		if(waybill.length==12) {
			$("#bnoTxtShow").val(waybill);
            $("#bnoTxt").val(waybill);
			$("#queryBtn").click();
		}else {
			
		}
	}
	getMyExpressCount();
	getBillsByUser();
	//cleanFindList();
};


function changeBtnColor(text){
	//判断是否有值
    if(text!=null && text!=""){
  	  $(".ico-scanning").removeClass("ico-scanning").addClass("ico-no");
    }else{
    	$(".ico-no").removeClass("ico-no").addClass("ico-scanning");
    }
	
	if(text!=null&&text!=''&&text.length==12){
		$('#btn').css('border','#E65A5A  1px solid');
		$('#btn').css('color','#E65A5A');	
	}else{
		$('#btn').css('border','#cccccc 1px solid');
		$('#btn').css('color','#cccccc');	
	}
}


function listenEvent(){
	$("#list-tab").off("click").on("click", function(){
		window.location ='/alipay/deliverydetails/my-express.html';
    });
	$("#bnoTxtShow").off("keydown").on("keydown",function(e){
	      if( e.keyCode != 8 ){
	          //获取值
	          var num = $(this).val();
	          //去掉空格
	          num = num.replace(/\s+/g, "");
	          $("#bnoTxt").val($.trim(num));
	          //获取长度
	          //var length = num.length;
	          //每三个字符插入一个空格
	          num=$.trim(num.replace(/(.{3})/g,"$1 "));
	          //回显
	          $(this).val(num); 
	          
	      }

	 });
	$("#forwardMyExpress").unbind().bind("click",function(){
		location.href="/page/alipay/member.html";
	});
	$("#clernHistory").unbind().bind("click",function(){
		showTip("+data[i].asbkId+",tipsCancel,tipsSubmit);
	});
	
};
//删除动作
function tipsCancel(index){};
//确定删除
function tipsSubmit(index){
	cleanFindList();
};

function cleanFindList(){
	var reqObj = {
			type : "get",
			dataType : "json",
			async: false,
			url : "/service/alipay/cleanFindList?ts="+new Date().getTime(),
			success: function(json){
				$("#findListDiv").html("");
				commontipsDialog("成功清除!");
				
				getCommonImg("1048","N","1");
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				getCommonImg("1048","N","3");
			}
		};
		if(true){
			$("#noResult").show();
			$("#clernHistory").hide();
			//同时隐藏插件历史
			$('#queryHistory').hide();
		}
		//$("#waitplease").show();
		$.ajax(reqObj);
}
function show(bno){
	$("#bnoTxtShow").val(bno);
	$("#bnoTxt").val(bno);
	$("#J_formSearchByWaybillNumber").submit();
	getCommonImg("1049","N","1");
};

//获取用户用户订单历史列表
function getBillsByUser(){
	$("#waitplease1").show();
	$.ajax({
		type : "get",
		dataType : "json",
		url : "/service/alipay/cachelist?ts="+new Date().getTime(),
		success: function(json){
			//如果有历史记录就创建节点
			if($.trim(json)!=""){
				var hasData=getUrlValueByKey("hasRoute");
				if($.trim(hasData)!==""){
					$("#noHistoryResult").show();
					$("#clernHistory").hide();
				}else{
					creatDom(json);
				}
				
			//否则隐藏接口，显示提示信息
			}else{
				if(!$("#noResult").is(":visible")){
					$("#noHistoryResult").show();
					$("#clernHistory").hide();
					//同时隐藏插件历史
					$('#queryHistory').show();			
				}
			}
			$("#waitplease1").hide();
			getCommonImg("1047","N","1");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//alert("系统繁忙,请稍后重试!");
			$("#waitplease1").hide();
			getCommonImg("1047","N","3");
			
		}
	});
};

//查询寄给我的快件数量
function getMyExpressCount(){
	$.ajax({
		type : "get",
		dataType : "json",
		url : "/service/alipay/getMyExpressCount",
		success: function(data){
			if(data && data >0){
				$("#getMyExpressCount").text(data);
				$("#getMyExpressCount").show();
			} else {
				$("#getMyExpressCount").hide();
			}
			getCommonImg("1141","N","1");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			getCommonImg("1141","N","3");
		}
	});
};

function creatDom(json){
	/*findListDiv*/
	var temp="<li class='item item-fm'><div class='ui-flex div-padding-top-buttom10'> <div class='query-history-list'><span class='lable-fontStyle'><i class='ui-ico-sfi ico-time ico-time-style'></i><i id='tempBno'></i></span></div><div><a class='ui-btn-right' data-toggle='datePicker' href='javascript:void(0);'></a></div></div></li>";
	var tempObj=$(temp);
	if(json.length>0){
		for(var i=0; i<json.length; i++){
			var itemResult=tempObj.clone().first();
			itemResult.find("#tempBno").text(fillNull(json[i].orderNo));
			itemResult.attr("onclick","show('"+json[i].orderNo+"')");
			//domstr = domstr + "<li><a href='#'  onclick=show('" + json[i].orderNo + "')>"+json[i].orderNo+"<span class='icons icons-SVG-13'></span><span class='icons icons-SVG-14'></span></a></li>";
			$("#findListDiv").append(itemResult);
		}
		$("#findListDiv").show();
		$("#clernHistory").show();
	}else{
		$("#noHistoryResult").show();
		/*findListDiv
		clernHistory
		noHistoryResult*/
	}
	$("#queryHistory").show();
	//$("#findListDiv").html(domstr);
}
//列表组装展示
function showBillList(data){
	//如果
	var showList="";
	if(data && data.length>0){
		$.each(data,function(index,param){
			if($.trim(showList)==""){
				showList="<li><a href='#'>"+param.billNo+"<span class='icons icons-SVG-13'></span><span class='icons icons-SVG-14'></span></a></li>";
			}else{
				showList=showList+"<li><a href='#'>"+param.billNo+"<span class='icons icons-SVG-13'></span><span class='icons icons-SVG-14'></span></a></li>";
			}
		});
	}
	return showList;

};

function showTip(){
	var $mask = $('<div class="maskbox" style="z-index:2; opacity:.9;"></div>');
	$mask.append($(".tip-box"));
	$("body").append($mask);
}