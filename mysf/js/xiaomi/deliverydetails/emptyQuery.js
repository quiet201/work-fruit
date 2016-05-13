$(document).ready(function(){
	//初始化页面项
	init();
	listenEvent();
	//如果不支持扫描，则不显示扫描图标
	callNative(function(api) {
    	try {
    		api.hasScanQR();
    	}catch(e) {
    		$(".qr-icons").hide();
    	}
    });
	
	getCommonImg("10410","N","1");
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

function init(){
	//设置查询过的运单号
	$(".history-empty-text").text("没有查到运单号“"+getUrlParamByKey("bno")+"”相关的路由信息，请仔细核对运单号。");
	
};

function listenEvent(){
	$(".icons-uniE602").off("click").on("click", function(){
		location.href='my-express.html';
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

