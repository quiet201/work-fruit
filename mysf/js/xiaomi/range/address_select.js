
$(document).ready(function (){
	queryAjax();
	
	//遍历复选按钮
	$('[data-toggle="select"]').each(function(){
		$(this).click(function(){
			$(this).siblings('[data-toggle="select"]').find('[data-btn="checkbox"]').removeClass("checked");
			$(this).find('[data-btn="checkbox"]').addClass("checked");
			});
	});
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
					var clast = "";
					if(data[i].addressStatus == 1){
						defaul = "【默认】";
						clast = "ui-ico-sfi ico-checkbox checked";
					}else{
						clast = "ui-ico-sfi ico-checkbox";
					}
					str = "<li class='item address-item' data-toggle='select'><div class='ui-flex'><div class='flex-con'><div class='address-top'>"+
					"<span class='name'>"+data[i].userName+"</span><span class='mobilephone'>"+data[i].telePhoneNuber+"</span></div>"+
					"<div class='address-info'><span class='default'>"+defaul+"</span>"+data[i].detailAdress+"</div></div>"+
					"<div class='flex-ico'><a data-btn='checkbox' class='"+clast+"' title='选择'></a></div></div></li>";
					
//					<a href='ship.html?asbkId="+data[i].asbkId+"'></a>
//					str = "<li class='item address-item'><a href='address_info.html?asbkId="+data[i].asbkId+"'><div class='ui-flex'><div class='flex-con'><div class='address-top'><span class='name'>"+data[i].userName+"</span>"+
//					"<span class='mobilephone'>"+data[i].telePhoneNuber+"</span></div>"+
//					"<div class='address-info'><span class='default'>"+defaul+"</span>"+data[i].detailAdress+"</div></div><div class='flex-ico'></div></div></a></li>";
					strHtml = strHtml + str;
				}
				$("#itemListForDefault").html(strHtml);
			}
		},
		error : function(e) {
			console.log("查询失败...");
		}
	});

}

