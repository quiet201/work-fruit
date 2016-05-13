(function ($) { 
jQuery.ccPlugins_alipay_location= {
		getLocation : function() {
			if(navigator.userAgent.indexOf("AlipayClient")===-1){
		    alert('请在支付宝钱包内运行');
		}else{
		    if((Ali.alipayVersion).slice(0,3)>=8.1){
		        Ali.geolocation.getCurrentPosition({
		            timeout: 5000 //超时时间
		        }, function(result) {
		            if(result.errorCode){
		                //没有定位的情况
		                //errorCode=5，调用超时
		            }else{
		                //成功定位的情况
		                //alert(result.coords.latitude); //	double	纬度
		               // alert(result.coords.longitude);	//double	经度
		               // alert(result.city);		//城市
		               // alert(result.province);		//省份
		               // alert(result.cityCode);		//城市编码
		               // alert(result.address);		//地址
		            	return result;
		            }
		        });
		    }else{
		        Ali.alert({
		            title: '亲',
		            message: '请升级您的钱包到最新版',
		            button: '确定'
		        });
		    }
		}
},

};
})(jQuery);
