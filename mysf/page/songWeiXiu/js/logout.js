$(function($){
	$.get("/service/songweixiu/private/single", {},function(result){
		if(result){
			$("#customMobile").html(result['customMobile']);
		}
	},"json");
	
	$("#logout").click(function(){
		//提交Ajax
		$.get("/service/songweixiu/logout", {},function(result){
			if(result){
				if(result["returnCode"] == 200){
					window.location.href = "index.html";
				}else{
					$("#login-content").alert({content:result["returnMesg"]});
				}
			}
		},"json");
	});
});


