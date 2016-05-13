 function submitForm(){
	
	 
		var companyName = $.trim($('#companyName').val());
		if(companyName==""){
			$('#companyNameTips').html("请输入公司名称");
			$('#companyNameTips').show();
			setTimeout(function () {
			$('#companyNameTips').fadeOut(500);
		}, 2000);
			return;
		}else{
			if(companyName.length>90){
				$('#companyNameTips').html("公司名称应少于30个汉字");
				$('#companyNameTips').show();
				setTimeout(function () {
				$('#companyNameTips').fadeOut(500);
			}, 2000);
				return;
			}
			
		}
		var companyAddress = $.trim($('#companyAddress').val());
		if(companyAddress==""){
			$('#companyAddressTips').html("请输入公司地址");
			$('#companyAddressTips').show();
			setTimeout(function () {
				$('#companyAddressTips').fadeOut(500);
			}, 2000);
			return;
		}else{
			if(companyAddress.length>150){
				$('#companyAddressTips').html("公司地址应少于50个汉字");
				$('#companyAddressTips').show();
				setTimeout(function () {
					$('#companyAddressTips').fadeOut(500);
				}, 2000);
				return;
			}
		}
		var companyContactor = $.trim($('#companyContactor').val());
		if(companyContactor==""){
			$('#companyContactorTips').html("请输入联系人姓名");
			$('#companyContactorTips').show();
			setTimeout(function () {
				$('#companyContactorTips').fadeOut(500);
			}, 2000);
			return;
		}else{
			if(companyAddress.length>150){
				$('#companyContactorTips').html("联系人姓名应少于10个汉字");
				$('#companyContactorTips').show();
				setTimeout(function () {
					$('#companyContactorTips').fadeOut(500);
				}, 2000);
				return;
			}
			
		}
		var companyContactorPhone = $.trim($('#companyContactorPhone').val());
		if(companyContactorPhone==""){
			$('#companyContactorPhoneTips').html("请输入联系电话");
			$('#companyContactorPhoneTips').show();
			setTimeout(function () {
				$('#companyContactorPhoneTips').fadeOut(500);
			}, 2000);
			return;
		}else{
			if(companyContactorPhone.length>11){
				$('#companyContactorPhoneTips').html("联系电话应少于或等于11位");
				$('#companyContactorPhoneTips').show();
				setTimeout(function () {
					$('#companyContactorPhoneTips').fadeOut(500);
				}, 2000);
				return;
			}
		}
		var leaveMessage = $.trim($('#leaveMessage').val());
		if(leaveMessage==""){
			$('#leaveMessageTips').html("请输入合作内容");
			$('#leaveMessageTips').show();
			setTimeout(function () {
				$('#leaveMessageTips').fadeOut(500);
			}, 2000);
			return;
		}else{
			if(companyContactorPhone.length>200){
				$('#leaveMessageTips').html("合作内容应少于200个汉字");
				$('#leaveMessageTips').show();
				setTimeout(function () {
					$('#leaveMessageTips').fadeOut(500);
				}, 2000);
				return;
			}
		}
		$('#companyNameTips').hide();
		$('#companyAddressTips').hide();
		$('#companyContactorTips').hide();
		$('#companyContactorPhoneTips').hide();
		$('#leaveMessageTips').hide();
		var urlParam = "/service/companyCooperation/commitCompanyCooperation.action";
		var aaa={				
				"companyName" : companyName,
				"companyAddress":companyAddress,
				"companyContactor":companyContactor,
				"companyContactorPhone":companyContactorPhone,
				"leaveMessage":leaveMessage
		};
		
		$.ajax({
			type : "POST",
			data :aaa ,
			dataType : "json",
			url : urlParam,
			success : function(json) {
				alert("提交成功");				
				resetInput();
			},error:function(XMLHttpRequest, textStatus, errorThrown){
				alert("服务器连接失败");
			},			
		}); 
		
		
		
 }
 function resetInput(){
	 $('#companyName').val("");
	 $('#companyAddress').val("");
	 $('#companyContactor').val("");
	 $('#companyContactorPhone').val("");
	 $('#leaveMessage').val("");
	 $('#btnQuery').attr('class','disable');
 }
 
 /*function checkNull(){
 if(''==$('#companyName').val()){
	 $('#btnQuery').addClass('disable');
	 $('#btnQuery').removeClass('btn-submit');
 }else if(''==$('#companyAddress').val()){
	 $('#btnQuery').addClass('disable');
	 $('#btnQuery').removeClass('btn-submit');
 }else if(''==$('#companyContactor').val()){
	 $('#btnQuery').addClass('disable');
	 $('#btnQuery').removeClass('btn-submit');
 }else if(''==$('#companyContactorPhone').val()){
	 $('#btnQuery').addClass('disable');
	 $('#btnQuery').removeClass('btn-submit');
 }else if(''==$('#leaveMessage').val()){
	 $('#btnQuery').addClass('disable');
	 $('#btnQuery').removeClass('btn-submit');
 }else{
	 $('#btnQuery').addClass('btn-submit');
	 $('#btnQuery').removeClass('disable');
  }
 }*/
