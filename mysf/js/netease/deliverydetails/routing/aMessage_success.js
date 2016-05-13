var selectedLabel;
var labelMsg;
$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00202");
	//获取参数 查询路由信息
	var urlParams = {
			bno : ""
		};
	
	//初始化方法填充页面
	init(urlParams);
	
	//填充页面信息
	//fillPage(urlParams);
	
	//填充页面信息
	getData(urlParams);
	
	
	$('#btnBack').attr('href','/page/netease/deliverydetails/routing/waybill-3-1-routing.html?bno='+urlParams.bno+'&&hasRoute=true');

	
});

//初始化页面
function init(obj) {
	getUrlParams(obj);
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
				$('#waybill-num').text(bno);
			}
		}
	}
}


function fillPage(obj){
	//运单号
	$('#waybill-num').text(fillNull(obj.bno));
	//小哥信息  收货地址
	var value = obj.waybillInfo.employ;
	if(value){
	$('#empName').text(fillNull(obj.waybillInfo.employ.empName));
	//如果图片不存在后缀，需要加上后缀
	var imgUrl = values.employ.photoUrl ? value.employ.photoUrl
				: "../../../images/xiaomi/defalut-image.png";
		if(imgUrl.lastIndexOf(".")==-1 || !((imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".gif")
				|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".jpg")
				|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".png"))){
			$("#bigPhoto").attr("href",imgUrl+".jpg");
		}
		$("#photoUrl").attr("src", imgUrl);
	}
	//捎话内容
	$('#labelMsg').text(fillNull(obj.labelMsg));
}

//根据运单号查询相关信息填充页面
function getData(obj) {
	// 数据提交
			$.ajax({
				type : "POST",
				data : {
					bno: obj.bno,
					type:"1"
				},
				dataType : "json",
				url : "/service/delivery/arrive/getLabelInfo",
				success : function(data) {
					if ($.trim(data) != "") {
						var msg = $.parseJSON(data).msg;
						$('#labelMsg').text(msg);
					};
					getCommonImg("10562","N","1");
				},
				error : function(e) {
					getCommonImg("10562","N","3");
				}
			});
			
		

}			
		


