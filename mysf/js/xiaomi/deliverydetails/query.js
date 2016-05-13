$(document).ready(function(){
	//初始化页面项
	listenEvent();
	//如果不支持扫描，则不显示扫描图标
	callNative(function(api) {
    	try {
    		api.hasScanQR();
    	}catch(e) {
    		$(".qr-icons").hide();
    	}
    });
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
        /*条码扫描点击*/
        Z('#J_barcodeTrigger').on('click',function(e){
            e.preventDefault();
            callNative(function(api) {
            	try {
            		if(!api.hasScanQR()) return;
            	}catch(e) {
            		alert("此系统版本暂时不支持条码扫描功能");
            		return;
            	}
                api.callAsync('scanQR', null, function(res) {
                    Z('#bnoTxtShow').val(res);
                    Z('#bnoTxt').val(res);
                    scanFlag=true;
                });
            });
        });

        //表单提交
	   Z('#J_formSearchByWaybillNumber').on('submit',function(e){
		   var validResult=SF.validForm(Z(this));
		   if(validResult){
			   SF.validTips(validResult,tipsMap);
			   e.preventDefault();
		   }
	   });
       $(".search-text").off("click").on("click", function(){
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
		window.location ='/xiaomi/deliverydetails/my-express.html';
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
};

function show(bno){
	$("#bnoTxtShow").val(bno);
	$("#bnoTxt").val(bno);
	$("#J_formSearchByWaybillNumber").submit();
	getCommonImg("1049","N","1");
};

function creatDom(json){
	var domstr = "";
	for(var i=0; i<json.length; i++){
		domstr = domstr + "<li><a href='#'  onclick=show('" + json[i].orderNo + "')>"+json[i].orderNo+"<span class='icons icons-SVG-13'></span><span class='icons icons-SVG-14'></span></a></li>";
	}
	$("#findListDiv").html(domstr);
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

//文本提示弹出层
function tipsDialog(content){
	var $dialog = $('<div class="dialog-tips"></div>');
	var $content = $('<div class="content"></div>');
	$content.html(content);
	$dialog.append($content);
	$("body").append($dialog);  
	var windowHeight = $(window).height();  
	var popupHeight = $dialog.height(); 
	var top = (windowHeight-popupHeight)/2;
	$dialog.css({"top": top}).fadeIn(500);		
	setTimeout(function () {
		$dialog.fadeOut(500);
	}, 1000);
}
