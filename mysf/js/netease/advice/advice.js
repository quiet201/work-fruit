$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L01002")
	//遍历复选按钮
	$("#addButon").click(function (){
		   var suggestContent = $("#backSuggest").val();
		   if(suggestContent == null || suggestContent == ""){
			   alertError("请输入您的意见或建议");
			   return ;
		   }
		   submitAjax();
	   });
});

function submitAjax() {
	
	$('#addButon').attr('class','ui-btn btn-submit-no');
	$('#addButon').attr('onclick','');
	var feedSuggest = {
		suggestContent : $("#backSuggest").val()
	};
	// 数据提交
	$.ajax({
		type : "POST",
		data : feedSuggest,
		dataType : "json",
		url : "/service/feedsuggest/saveback/create",
		success : function(data) {
			alertSuccess("提交成功,感谢您的支持");
			$("#backSuggest").val("");
			setTimeout(function() {
				window.location.href = "/page/netease/index.html";
			},1000);
			
			getCommonImg("113","N","1");
		},
		error : function(e) {
			console.log("新增失败...");
			getCommonImg("113","N","3");
		}
	});

}

function tipsDialog(content){
	var $dialog = $('<div class="dialog-tips"></div>');
	var $content = $('<div class="content"></div>');
	$content.html(content);
	$dialog.append($content);
	$("body").append($dialog);  
	var windowHeight = $(window).height();  
	var popupHeight = $dialog.height(); 
	var top = (windowHeight-popupHeight)/2;
	$dialog.css({"top": top}).fadeIn(500);		
	setTimeout(function () {
		$dialog.fadeOut(500);
	}, 2500);	 
}

function alertSuccess(contect){
	$('#MsgInfo').text(contect);
	$('#success').show();
	setTimeout(function () {
		$('#success').fadeOut(500);
	}, 3000);
}

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 3000);
}