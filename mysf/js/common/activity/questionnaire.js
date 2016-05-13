/* JS is only for label klick on iPad & theming, so you won't need any JS for you homepage (except the iPad part) */

$(document).ready(function() {

	$('.form-wrapper, html').addClass('light');

	$("").click(function(){
		
	});

	/* Label click for iPad iOS  */
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {

		$('label[for]').click(function() {
			var el = $(this).attr('for');
			if ($('#' + el + '[type=radio], #' + el + '[type=checkbox]').attr('selected', !$('#' + el).attr('selected'))) {
				return;
			} else {
				$('#' + el)[0].focus();
			}
		});

	}
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	

	
	
	$("input").change(function(e){
		var  id = $(this).attr('id');
		if('hope_what_service'!=id){
			$(this).blur();
			console.log(id);
			var falg = $(this).is(':checked');
			console.log(falg);
			
			
			if('job_g' == id ){
				$("#jobG").focus();
			}
			else if('interest_i' == id && falg ){
				$("#interestI").focus();
			}
			else if('care_aspect_d' == id && falg ){
				$("#care_aspectD").focus();
			}
			else if('send_tool_type_g' == id && falg ){
				$("#send_tool_typeG").focus();
			}
			else if('query_type_e' == id && falg ){
				$("#query_typeE").focus();
			}
			else if('query_msg_type_g' == id && falg ){
				$("#query_msg_typeG").focus();
			}
			else if('no_msg_remind_e' == id && falg ){
				$("#no_msg_remindE").focus();
			}
			
			if($(this).parent().hasClass('radio')){
				$(this).parent().parent().parent().find('.radio input').attr('checked',false);
				$(this).parent().parent().parent().find('.radio').removeClass('radio_checked');
				
				$(this).attr('checked',true);
				$(this).parent().addClass('radio_checked');
			}
			if($(this).parent().hasClass('radio_checked')){
				$(this).attr('checked',true);
				return;
			}
			
		}
	});
	
	$(".input-wrapper label").on('mousedown',function(e){
		e.preventDefault();
		$(this).children("input").click();
		$(this).children("input").click();
//		$(this).children("input").blur();
		var id = $(this).children("input").attr('id');
		console.log($(this).children("input") );
		if("willing_msg_remind_a"==id){
			location.href = "#dest_17";
		}else if("willing_msg_remind_b"==id){
			location.href = "#dest_16";
		}
		$(this).blur();
	});
	

});

function init(){
	listem();
	var addressObject=getCookie("questionnaireAddress");
	//这是是
	if($.trim(addressObject)){
		addressObject=$.parseJSON(addressObject);
		console.log(addressObject );
		setParams(addressObject);
	}
	$("#submitFrom").unbind().bind("click",function(){
		submit();
	});
};
function listem(){
	$("#checkedOne").unbind().bind("click",function(){
		var queryParam=getParams();
		console.log(queryParam );
		setCookieMin("questionnaireAddress",JSON.stringify(queryParam),60*24);
		getAddressDetail("/page/alipay/address/province.html?addrName=destName&addrCode=destCode&addrCountyName=dcountyName&addrCountyCode=dcountyCode&type=3&gatChild=-1");
	});
};

function getParams(){
	var destination="";
	//参数
	if($.trim($("#destination").html())=="请选择地区"){
		destination="";
	}else{
		destination=$.trim($("#destination").html());
	}
	//参数
	var queryParam={
				sex : getCheckbox("sex"),
				age : getCheckbox("age"),
				provinceName : $("#provinceName").val(),
				provinceCode : $("#provinceCode").val(),
				cityName : $("#cityName").val(),
				cityCode : $("#cityCode").val(),
				countyName : $("#countyName").val(),
				countyCode : $("#countyCode").val(),
				destination	:destination,
				job : getCheckbox("job"),
				jobG : $("#jobG").val(),
				interest : getCheckbox("interest"),
				interestI : $("#interestI").val(),
				month_sign_count : getCheckbox("month_sign_count"),
				care_aspect : getCheckbox("care_aspect"),
				care_aspectD : $("#care_aspectD").val(),
				send_tool_type : getCheckbox("send_tool_type"),
				send_tool_typeG : $("#send_tool_typeG").val(),
				start_query_time : getCheckbox("start_query_time"),
				interval_query_time :  getCheckbox("interval_query_time"),
				query_type : getCheckbox("query_type"),
				query_typeE : $("#query_typeE").val(),
				query_msg_type : getCheckbox("query_msg_type"),
				query_msg_typeG : $("#query_msg_typeG").val(),
				interest_exclusive_service : getCheckbox("interest_exclusive_service"),
				use_exclusive_service : getCheckbox("use_exclusive_service"),
				willing_msg_remind : getCheckbox("willing_msg_remind"),
				no_msg_remind : getCheckbox("no_msg_remind"),
				no_msg_remindE : $("#no_msg_remindE").val(),
				hope_remind_node : getCheckbox("hope_remind_node"),
				hope_what_service : $("#hope_what_service").val(),
				channel : getUrlValueByKey("channel")
	};
	console.log(queryParam );
	return queryParam;
};
function setParams(data){
	console.log(data );
	if (data) {
		$("#detailAdress").val(data.detailAdress);
		setCheckbox("sex",data.sex);
		setCheckbox("age",data.age);
		setCheckbox("job",data.job);
		$("#jobG").val(data.jobG),
		setCheckbox("interest",data.interest);
		$("#interestI").val(data.interestI);
		setCheckbox("month_sign_count",data.month_sign_count);
		setCheckbox("care_aspect",data.care_aspect);
		$("#care_aspectD").val(data.care_aspectD);
		setCheckbox("send_tool_type",data.send_tool_type);
		$("#send_tool_typeG").val(data.send_tool_typeG);
		setCheckbox("start_query_time",data.start_query_time);
		setCheckbox("interval_query_time",data.interval_query_time);
		setCheckbox("query_type",data.query_type);
		$("#query_typeE").val(data.query_typeE);
		setCheckbox("query_msg_type",data.query_msg_type);
		$("#query_msg_typeG").val(data.query_msg_typeG);
		setCheckbox("interest_exclusive_service",data.interest_exclusive_service);
		setCheckbox("use_exclusive_service",data.use_exclusive_service);
		setCheckbox("willing_msg_remind",data.willing_msg_remind);
		setCheckbox("no_msg_remind",data.no_msg_remind);
		$("#no_msg_remindE").val(data.no_msg_remindE);
		setCheckbox("hope_remind_node",data.hope_remind_node);
		$("#hope_what_service").val(data.hope_what_service);
		$("#channel").val(data.channel);
		if($.trim(getUrlValueByKey("destCode"))!="" && "请选择地区"!=$.trim(data.areaName)){
			
			$("#destination").html(data.destination).removeClass("placeholder");
		}
		
		 var destCode=getUrlValueByKey("destCode");
		 //如果地址栏中没有获取新的地址数据，就以data为主，否则以地址栏的参数为主
		if($.trim(destCode)==""){
			$("#provinceName").val(data.provinceName);
			$("#provinceCode").val(data.provinceCode);
			$("#cityName").val(data.cityName);
			$("#cityCode").val(data.cityCode);
			$("#countyName").val(data.countyName);
			$("#countyCode").val(data.countyCode);
			$("#destination").html(data.destination).removeClass("placeholder");
		}else{
			var provinceName = getUrlValueByKey("proName");//省份名称
			var provinceCode = getUrlValueByKey("proCode");//省份编码
			var cityName = getUrlValueByKey("destName");//城市名称
			var cityCode = getUrlValueByKey("destCode");//城市编码
			var contyName = getUrlValueByKey("dcountyName");//区县名称
			var contyCode = getUrlValueByKey("dcountyCode");//区县编码
			var destination = fillNull(provinceName) + " "
			+ fillNull(cityName) + " " + fillNull(contyName);
			if($.trim(destination) != null && $.trim(destination) != ""){
				$("#destination").text(destination); //寄件人
				$("#provinceName").val(provinceName);
				$("#provinceCode").val(provinceCode);
				$("#cityName").val(cityName);
				$("#cityCode").val(cityCode);
				$("#countyName").val(contyName);
				$("#countyCode").val(contyCode);
			}
		}
	}
};
function Validate(){
	 //1. 您的性别
	 var sex = getCheckbox("sex");
	 if(!ObjectIsNull(sex)){
		 location.href = "#dest_01";
		 alertErrors('请选择性别');
		 return ;
	 }
	 //2. 您的年龄
	 var age = getCheckbox("age");
	 if(!ObjectIsNull(age)){
		 location.href = "#dest_02";
		 alertErrors('请选择年龄');
		 return ;
	 }
	 //3. 您所在的地区是
	 var province= $("#provinceCode").val();
	 var city = $("#cityCode").val();
	 var county = $("#countyCode").val();
	 if(!variable1ObjectIsNull(province) || !variable1ObjectIsNull(city) || !variable1ObjectIsNull(county)){
		 location.href = "#dest_03";
		 alertErrors('请选择所在地区');
		 return ;
	 }
	 //4. 您的职业
	 var job = getCheckbox("job");
	 if(!variable1ObjectIsNull(job)){
		 location.href = "#dest_04";
		 alertErrors('请选择职业');
		 return ;
	 }else{
		 if(job=='G'){
			 var jobG =$("#jobG").val();
			 job.push(jobG);
		 }
	 }
	 
	 //5. 您的兴趣爱好（多选）
	 var interest = getCheckbox("interest");
	 if(!ObjectIsNull(interest)){
		 location.href = "#dest_05";
		 alertErrors('请选择兴趣爱好');
		 return ;
	 }
	 if("I" == interest[interest.length-1]){
		 var interestI = $("#interestI").val();
		 interest.push(interestI);
	 }
	 
	 // 6. 您平均每月收几次顺丰快件？
	 var monthSignCount = getCheckbox("month_sign_count");
	 if(!ObjectIsNull(monthSignCount)){
		 location.href = "#dest_06";
		 alertErrors('请选择您平均每月收几次顺丰快件');
		 return ;
	 }
	 //7. 您最关心快件的哪些方面（多选）
	 var careAspect = getCheckbox("care_aspect");
	 if(!ObjectIsNull(careAspect) || careAspect.length<=0){
		 location.href = "#dest_07";
		 alertErrors('请选择您最关心快件的哪些方面');
		 return ;
	 }
	 if("D" == careAspect[careAspect.length-1]){
		 var care_aspectD = $("#care_aspectD").val();
		 careAspect.push(care_aspectD);
	 }
	 
	 //8. 您平时都使用顺丰速运哪些自助服务平台或工具？（多选
	 var sendToolType = getCheckbox("send_tool_type");
	 if(!ObjectIsNull(sendToolType) || sendToolType.length<=0){
		 location.href = "#dest_08";
		 alertErrors('请选择您平时都使用顺丰速运哪些自助服务平台或工具');
		 return ;
	 }
	 if("G" == sendToolType[sendToolType.length-1]){
		 var send_tool_typeG = $("#send_tool_typeG").val();
		 sendToolType.push(send_tool_typeG);
	 }
	 
	 //9. 您一般多久会开始查询收到的快件？
	 var startQueryTime = getCheckbox("start_query_time");
	 if(!ObjectIsNull(startQueryTime)){
		 location.href = "#dest_09";
		 alertErrors('请选择您一般多久会开始查询收到的快件');
		 return ;
	 }
	 //10. 您平均间隔多久查询一次快件？
	 var intervalQueryTime = getCheckbox("interval_query_time");
	 if(!ObjectIsNull(intervalQueryTime)){
		 location.href = "#dest_10";
		 alertErrors('请选择您平均间隔多久查询一次快件');
		 return ;
	 }
	 //11. 您一般通过什么方式查询快件信息？（多选）
	 var queryType = getCheckbox("query_type");
	 if(!ObjectIsNull(queryType) || queryType.length<=0){
		 location.href = "#dest_11";
		 alertErrors('请选择您一般通过什么方式查询快件信息');
		 return ;
	 }
	 if("E" == queryType[queryType.length-1]){
		 var query_typeE = $("#query_typeE").val();
		 queryType.push(query_typeE);
	 }
	 
	 //12. 您希望查询快件时可以看到哪些相关信息？（多选）
	 var queryMsgType = getCheckbox("query_msg_type");
	 if(!ObjectIsNull(queryMsgType) || queryMsgType.length<=0){
		 location.href = "#dest_12";
		 alertErrors('请选择您希望查询快件时可以看到哪些相关信息');
		 return ;
	 }
	 if("G" == queryMsgType[queryMsgType.length-1]){
		 var query_msg_typeG = $("#query_msg_typeG").val();
		 queryMsgType.push(query_msg_typeG);
	 }
	 
	 
	 //13. 顺丰已推出如下专享服务，您比较感兴趣的有哪些？（多选
	 var interestExclusiveService = getCheckbox("interest_exclusive_service");
	 if(!ObjectIsNull(interestExclusiveService) || interestExclusiveService.length<=0){
		 location.href = "#dest_13";
		 alertErrors('请选择您一般通过什么方式查询快件信息');
		 return ;
	 }
	 
	 //14. 您使用过以下哪些专享服务？（多选）
	 var useExclusiveService= getCheckbox("use_exclusive_service");
	 if(!ObjectIsNull(useExclusiveService) || useExclusiveService.length<=0){
		 location.href = "#dest_14";
		 alertErrors('请选择您使用过以下哪些专享服务');
		 return ;
	 }
	 //15. 您是否愿意收到物流消息提醒？【选择不愿意跳转到16，选择愿意跳转到17】
	 var willingMsgRemind = getCheckbox("willing_msg_remind");
	 if(!ObjectIsNull(willingMsgRemind)){
		 location.href = "#dest_15";
		 alertErrors('请选择您是否愿意收到物流消息提醒');
		 return ;
	 }
	 //16. 您不愿意收到物流消息提醒是因为以下哪些原因？（多选）
	 var noMsgRemind = getCheckbox("no_msg_remind");
	 if('B' == willingMsgRemind && !ObjectIsNull(noMsgRemind) ){
		 alertErrors('请选择您不愿意收到物流消息提醒是因为以下哪些原因');
		 return ;
	 }
	 if(ObjectIsNull(noMsgRemind) && "E" == noMsgRemind[noMsgRemind.length-1]){
		 var no_msg_remindE = $("#no_msg_remindE").val();
		 noMsgRemind.push(no_msg_remindE);
	 }
	 
	 //17. 您希望在哪些环节收到物流消息提醒呢？（多选）
	 var hopeRemindNode = getCheckbox("hope_remind_node");
	 if('A' == willingMsgRemind && !ObjectIsNull(hopeRemindNode) ){
		 alertErrors('请选择您希望在哪些环节收到物流消息提醒呢');
		 return ;
	 }
	 //18. 您还希望有神马定制化的物流服务呢？
	 var hopeWhatService =$("#hope_what_service").val();
	 
	 var questionnaireDto = {};
	 questionnaireDto.sex = sex.join(",");
	 questionnaireDto.age = age.join(",");
	 questionnaireDto.job = job.join(",");;
	 questionnaireDto.interest = interest.join(",");
	 questionnaireDto.monthSignCount = monthSignCount.join(",");
	 questionnaireDto.careAspect = careAspect.join(",");
	 questionnaireDto.sendToolType = sendToolType.join(",");
	 questionnaireDto.startQueryTime = startQueryTime.join(",");
	 questionnaireDto.intervalQueryTime = intervalQueryTime.join(",");
	 questionnaireDto.queryType = queryType.join(",");
	 questionnaireDto.queryMsgType = queryMsgType.join(",");
	 questionnaireDto.interestExclusiveService = interestExclusiveService.join(",");
	 questionnaireDto.useExclusiveService = useExclusiveService.join(",");
	 questionnaireDto.willingMsgRemind = willingMsgRemind.join(",");
	 questionnaireDto.noMsgRemind = null==noMsgRemind?'':noMsgRemind.join(",");
	 questionnaireDto.hopeRemindNode = null==hopeRemindNode?'':hopeRemindNode.join(",");
	 questionnaireDto.hopeWhatService = hopeWhatService;
	 questionnaireDto.province = province;
	 questionnaireDto.city = city;
	 questionnaireDto.county = county;
	 questionnaireDto.channel = $("#channel").val();
	 console.log(questionnaireDto);
	 return questionnaireDto;
}

function getRadio(name){
	var sex =$("input[name="+name+"]:checked").val();
	return sex;
}
function setRadio(name,value){
	console.log(name +":"+value );
	$("input[name="+name+"][value="+value+"]").attr("checked",true);//指定值的项选中
}

function getCheckbox(name){
	var array= new Array();
	$(":checked[name='"+name+"']").each(function(){  
		array.push(this.value);
		})  ;
	console.log(array);
	if(array.length<=0){
		return null;
	}else{
		return array;
	}	
}

function setCheckbox(name,values){
	console.log(name +":"+values );
	if(null != values && undefined != values){
		for ( var i = 0; i < values.length; i++) {
			$("input[name="+name+"][value="+values[i]+"]").attr("checked",true);//指定值的项选中
		}
	}
}
$("#submitFrom").unbind().bind("click",function(){
	submit();
});

function submit(){
	var queryParam=getParams();
	console.log(queryParam );
	setCookieMin("questionnaireAddress",JSON.stringify(queryParam),60*24);
	var questionnaireDto = Validate();
	if(!questionnaireDto){
		return ;
	};
	$('#submitFrom').hide();
	$('#submitFrom').unbind();//去掉a标签中的onclick事件
	$.ajax({
		type : "POST",
		data : questionnaireDto,
		url : "/service/activity/questionnaire/saveQuestionnaire",
		success : function(data) {
			 if (2==data) {
				 whetherDoLuckDrawNoBno(6);
				// window.location.href = "/page/common/activity/question_success.html";
			 }else{
				 alertErrors("系统繁忙，请稍后重试。");
				 setTimeout(function() {
					 $('#submitFrom').show();
					 $("#submitFrom").on('touchstart mousedown',function(e){
						submit();
					});
				}, 1000);
			 }
		},
		error : function(e) {
			alertErrors("系统繁忙，请稍后重试。");
			 setTimeout(function() {
				 $('#submitFrom').show();
				 $("#submitFrom").on('touchstart mousedown',function(e){
					submit();
				});
			}, 1000);
			console.log("操作失败...");
			getCommonImg("113","N","3");
		}
	});
}