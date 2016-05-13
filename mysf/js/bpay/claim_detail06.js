$().ready(function () {
	//加日志
	$.post("/service/commonLog/addLog/L00905");
	//获取地址栏信息
	var str = getUrlValueByKey("bpayProcess");
	var bpayProcess = JSON.parse(str); //由JSON字符串转换为JSON对象
	$('#phoneNo').text(bpayProcess.phoneNo);	
	$('#bNo').text(bpayProcess.bNo);	
	$('#claimType').text(bpayProcess.claimType==1?'遗失':'破损');	
	$('#claimDetil').text(bpayProcess.claimDetil);	
	$('#bpayTm1').text(bpayProcess.bpayTm1.replace('+',' '));
	$('#msg').text('失败原因：'+bpayProcess.msg);
});
