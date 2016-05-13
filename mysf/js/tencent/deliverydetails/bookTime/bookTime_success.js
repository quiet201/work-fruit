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
	getData(urlParams);
	
	
	$('#btnBack').attr('href','/page/tencent/deliverydetails/routing/waybill-3-1-routing.html?bno='+urlParams.bno+'&&hasRoute=true');

	
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

//根据运单号查询相关信息填充页面
function getData(obj) {
	// 数据提交
			$.ajax({
				type : "POST",
				data : {
					bno: obj.bno,
					type:"2"
				},
				dataType : "json",
				url : "/service/delivery/arrive/getLabelInfo",
				success : function(data) {
					if ($.trim(data) != "") {
						var msg = $.parseJSON(data).msg;
						var createtm = $.parseJSON(data).createtm;
							$('#bookSendTime').text(msg);
							//将时间戳转换为时间显示
							commitTime=changeTimestampToTime(createtm.time);
						$('#commitTime').text(commitTime);
					};
					getCommonImg("10562","N","1");
				},
				error : function(e) {
					getCommonImg("10562","N","3");
				}
			});
}			
		
//将时间戳转化为时间2016-03-16 13:30(周二)格式，这里的时间戳不用*1000，因为本来已经是乘过的
function changeTimestampToTime(timestamp){
	var a = new Array("日", "一", "二", "三", "四", "五", "六");  
	var date=new Date(timestamp);
	var week = date.getDay();
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+
	     (date.getMonth()+1) : date.getMonth()+1) + '-';
	D = (date.getDate() < 10 ? '0'+
	     (date.getDate()) : date.getDate())  + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes()< 10 ? '0'+
		     date.getMinutes() : date.getMinutes() ;
    var str = "(周"+ a[week]+")";  
	time=Y+M+D+h+m+str;
	return time;
}


