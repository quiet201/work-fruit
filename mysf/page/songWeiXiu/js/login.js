$("#acquire-captcha").click(function(){
		var $this = $(this),
			$captchaSpan = $("#captcha-span"),
			$loginContent = $("#login-content");
		//验证数据
		var customMobile = $("#customMobile").val();
		customMobile = customMobile && customMobile.trim();
		var isMob = /^1[0-9]{10}$/;

		if(!customMobile){
			$loginContent.alert({content:"请输入手机号码！"});
			return ;
		}

		if(!isMob.test(customMobile)){
			$loginContent.alert({content:"请输入正确手机号码！"});
			return ;
		}
		
		//通过校验
		$this.addClass("n");
		$captchaSpan.removeClass("n");
		
		//提交Ajax
		$.get("/service/songweixiu/acquire/captcha/debuger", { customMobile: customMobile },function(result){
			if(result){
				if(result["returnCode"] != 200){
					$loginContent.alert({content:result["returnMesg"]});
					$this.removeClass("n");
					$captchaSpan.addClass("n");
				}else{
					var timeLimit = $("#time-limit");
					var defaultV = 60;
					timeLimit.text(defaultV);
					
					var interval = window.setInterval(function(){
						if(defaultV != 0){
							defaultV -- ;
							timeLimit.text(defaultV);
							return;
						}
						window.clearInterval(interval);
						$this.removeClass("n");
						$captchaSpan.addClass("n");
					},1000);
					$loginContent.alert({content:"验证码生产成功:["+ result["returnMesg"]+"]"});
					
				}
			}
		},"json");
	});
	
	$("#submit-login").click(function(){
		//验证数据
		var customMobile = $("#customMobile").val(),
			authCode = $("#authCode").val();

		customMobile = customMobile && customMobile.trim();
		var isMob = /^1[0-9]{10}$/;

		if(!customMobile){
			$("#login-content").alert({content:"请输入手机号码！"});
			return;
		}

		if(!isMob.test(customMobile)){
			$("#login-content").alert({content:"请输入正确手机号码！"});
			return;
		}

		if(!authCode){
			$("#login-content").alert({content:"请输入验证码！"});
			return;
		}
		
		//提交Ajax
		$.post("/service/songweixiu/login", { customMobile: customMobile,authCode: authCode },function(result){
			if(result){
				if(result["returnCode"] == 200){
					window.location.href = "index.html";
				}else{
					$("#login-content").alert({content:result["returnMesg"]});
				}
			}
		},"json");
	});