jQuery(document).ready(function($) {
	//加日志
	$.post("/service/commonLog/addLog/L00104"); 
	var bno =getUrlValueByKey("bno");
	getData(bno);
	
});

function getData(bno) {
	//$("#waitplease1").show();
	// 数据提交
	$.ajax({
				type : "POST",
				data : {
					waybillno : bno
				},
				dataType : "json",
				url : "/service/delivery/onRoad/" + bno + "/true",
				success : function(data) {
					var jsonDetails=getDetailsJson(data);
					//$("#waitplease1").hide();
					/*if ($.trim(data) != "") {

						$(".ui-angle-right").attr("href",
								"/page/tencent/deliverydetails/routing/routeDetail.html?details="+jsonDetails);
					};*/
					getCommonImg("10521","N","1");
					var details  = jsonDetails;
					init(details);
					
				},
				error : function(e) {
					$("#waitplease1").hide();
					//ruleConfig.routeState="N";
					getCommonImg("10521","N","3");
				}
			});

};

function init(data){
	
	if($.trim(data)!=""){
		var jsonData=$.parseJSON(data);
		$("#waybill-num").text(fillNull(jsonData.waybillno)); // 运单号
		$("#fromCityName").text(fillNull(jsonData.fromCityName)); // 原寄地
		$("#toCityName").text(fillNull(jsonData.toCityName)); // 目的地
		
		var temp="<div class='cd-timeline-block cd-container'><div class='cd-timeline-img cd-hui'></div><div class='cd-timeline-content' style='margin-top: -5px;'><h2></h2><span class='cd-date'></span></div></div>";
		var first="<div class='cd-timeline-block cd-container'><div class='cd-timeline-img cd-red'></div><div class='cd-timeline-content font-red' style='margin-top: -5px;'><h2></h2><span class='cd-date'></span></div></div>";
		var last="<div class='cd-timeline-block cd-container'><div class='cd-timeline-img cd-hui'></div><div class='cd-timeline-content02' style='margin-top: -5px;'><h2></h2><span class='cd-date'></span></div></div>";
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
			if(index==0){
				routeItem=$(last).clone();
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