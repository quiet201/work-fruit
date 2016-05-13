$(document).ready(function(){
	//加日志
	var phone=getUrlValueByKey("phone");
	$("#bindedPhone").text(phone);
	$(".ui-btn.btn-buttom-line").attr("href","bind.html?phone="+phone);
	getCommonImg("1062","N","1");
});

function showTip(){
	var $mask = $('<div class="maskbox" style="z-index:10; opacity:.9;"></div>');
	$mask.append($(".prompt-box"));
	$("body").append($mask);
}