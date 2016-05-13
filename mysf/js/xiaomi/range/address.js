
$(document).ready(function (){
	queryAjax();
});

function queryAjax() {
	// 数据提交
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "/service/sendaddress/sendbook/findbooksbyuserId",
		success : function(data) {
			if (data) {
				var strHtml = "";
				for(var i=0;i<data.length;i++){
					var defaul = "";
					var str = "";
					if(data[i].addressStatus == 1){
						defaul = "【默认】";
					}
					str = "<li class='item address-item'><a href='address_info.html?asbkId="+data[i].asbkId+"'><div class='ui-flex'><div class='flex-con'><div class='address-top'><span class='name'>"+data[i].userName+"</span>"+
					"<span class='mobilephone'>"+data[i].telePhoneNuber+"</span></div>"+
					"<div class='address-info'><span class='default'>"+defaul+"</span>"+data[i].areaName+data[i].detailAdress+"</div></div><div class='flex-ico'></div></div></a></li>";
					strHtml = strHtml + str;
				}
				$("#itemListFor").html(strHtml);
			}
		},
		error : function(e) {
			console.log("查询失败...");
		}
	});

}

