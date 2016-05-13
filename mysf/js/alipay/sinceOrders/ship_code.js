var orderNo;
$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00502");
		$('[data-toggle="show-explain"]').bind("click",function(){
			$(this).toggleClass("open");
		});
		
		loadPage();
		
		
		
		
	});
	
	/**
	 * 页面加载时显示下单成功信息
	 */
	function loadPage(){
		var bno = getUrlValueByKey("orderNo");
		//将运单号注入页面
		$("#orderNo").html(bno);
		
		//初始化时生成寄件二维码
		createbarCode(bno);
				
	}
	
	function createbarCode(bnos){
		$.ajax({
			type : "POST",
			data :{bno:bnos,channel:'1'},
			async : false,
			dataType : "json",
			url : "/service/order/getBarCodeUrl",
			success : function(data) {
				//alert(data);
				//将此路径转发至安全签收页面
				var imgPath = data;
				//set到页面
				$("#barCode").attr("src",imgPath);
			},
			error : function(e) {
				return;
			}
		});
		
	}
	
	/**
	 * 获取URL参数
	 */
	function getUrlValueByKey(name) {
		var url = window.location.search;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				if ([ strs[i].split("=")[0] ] == name) {
					return unescape($.trim(strs[i].split("=")[1]));
				}
			}
		}
	}
