jQuery(document).ready(function($) {
	//加日志
	$.post("/service/commonLog/addLog/L00104");
	var details=getUrlValueByKey("details");
	init(details);
});
function init(data){
	
	if($.trim(data)!=""){
		var jsonData=$.parseJSON(data);
		$("#waybill-num").text(fillNull(jsonData.waybillno)); // 运单号
		$("#fromCityName").text(fillNull(jsonData.fromCityName)); // 原寄地
		$("#toCityName").text(fillNull(jsonData.toCityName)); // 目的地
		
		var temp="<div class='cd-timeline-block cd-container'><div class='cd-timeline-img cd-hui'></div><div class='cd-timeline-content' style='margin-top: -5px;'><h2></h2><span class='cd-date'></span></div></div>";
		var first="<div class='cd-timeline-block cd-container'><div class='cd-timeline-img cd-red'></div><div class='cd-timeline-content font-red' style='margin-top: -5px;'><h2></h2><span class='cd-date'></span></div></div>";
		var objTemp=$(temp);
		var list=$("#cd-timeline");
		var listLength=jsonData.barNewList.length-1;
		$.each(jsonData.barNewList,function(index,item){
			
			/*cd-timeline-img cd-red
			cd-timeline-content font-red*/
			var routeItem=objTemp.clone();
			if(index == listLength){
				routeItem=$(first).clone();
			}
			routeItem.find("h2").html(fillNull(item.remark));
			if(19<=item.barScanTm.length){
				routeItem.find(".cd-date").html(fillNull(item.barScanTm));	
			}else{
			routeItem.find(".cd-date").html(fillNull(item.barScanDt)+"  "+fillNull(item.barScanTm));
			}
			list.prepend(routeItem);
		});
	}
};