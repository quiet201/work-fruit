

function whetherDoLuckDraw(bno,activityType){
	$.ajax({
		type : "POST",
		dataType : "json",
		data:{
			bNo: bno,
			activityType:activityType
		},
		url : "/service/activity/whetherDoLuckDraw.action",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			if(json!=null)
			{
				 if(activityType=="4"){
					    //评价抽奖
				 	    doResultCss01(json,bno);
				 } 
				 else if(activityType=="2"){
					    //查件抽奖
				 	    doResultCss02(json,bno);
				 }
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){

		}
	});
}

function whetherDoLuckDrawOrderNo(bno,activityType){
	$.ajax({
		type : "POST",
		dataType : "json",
		data:{
			bNo: bno,
			activityType:activityType
		},
		url : "/service/activity/whetherDoLuckDrawOrderNo.action",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			if(json!=null)
			{
				 if(activityType=="7"){
					    //评价抽奖
					 doResultCss02(json,bno);
				 } 
				 /*else if(activityType=="2"){
					    //查件抽奖
				 	    doResultCss02(json,bno);
				 }*/
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){

		}
	});
}



function whetherDoLuckDrawBJ(activityType,order){
	$.ajax({
		type : "POST",
		dataType : "json",
		data:{
			activityType:activityType,
			OrderInfo:order
		},
		url : "/service/activity/whetherDoLuckDrawBJ.action",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			if(json!=null)
			{
				 if(activityType=="8"){
					    //宝贝保抽奖
					 doResultCssBJ(json);
				 } 
				 /*else if(activityType=="2"){
					    //查件抽奖
				 	    doResultCss02(json,bno);
				 }*/
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){

		}
	});
}
//没有小浮层的页面处理
function doResultCss01(json,bno){
   				////1可以抽奖 2系统错误 3 业务异常不可以抽奖 4用户已抽奖
				if(json.resultCode=="4"){
					/*
							var data=json;					
							//operStatus 1为已中奖，中将页面弹出已中奖 2 没有参与抽奖，页面弹出抽奖
							if(data.ccwActivityUserJoin!=null&&data.ccwActivityUserJoin.status=="1")
							{
								url=data.ccwActivityUserJoin.luckpPageUrl;
								getDescPage("LotteryPage",url,'callBackActivityUserJoin');
								$("#LotteryPage").attr("node","bno="+bno+"&operStatus=1&id="+data.ccwActivityUserJoin.id
																        +"&prizeShowPhoneUrl="+data.ccwActivityUserJoin.prizeShowPhoneUrl
																        +"&prizeType="+data.ccwActivityUserJoin.prizeType);
								//$('#jionBig').attr("href",url);
								//$('#jionSmall').attr("href",url);
								//$('#notice').show();
								setTimeout(function () {
									myTime();
								}, 2000);						
							}
					*/					
				}else if(json.resultCode=="1"&&$.trim(json.activityId) !=""){
					//url=json.ccwActivityUserJoin.luckpPageUrl+"?bno="+bno+"&operStatus=2&activityId="+json.activityId;
					url=json.ccwActivityUserJoin.luckpPageUrl;
					$("#LotteryPage").attr("node","bno="+bno+"&operStatus=2&activityId="+json.activityId);
					getDescPage("LotteryPage",url,'callBackActivityUserJoin');
					//$('#jionBig').attr("href",url);
					//$('#jionSmall').attr("href",url);
					//$('#notice').show();
					//setTimeout(function () {
						myTime();
					///}, 2000);
				}	
}

//没有小浮层的页面处理
function doResultCssBJ(json){
   				////1可以抽奖 2系统错误 3 业务异常不可以抽奖 4用户已抽奖
	 if(json.resultCode=="1"&& $.trim(json.activityId) !=""){
			url=json.ccwActivityUserJoin.luckpPageUrl;
			$('#toPage').attr('href',url+"?bno="+"123&operStatus=2&activityId="+json.activityId);
			$("#LotteryPage").show();
			
			/*$("#LotteryPage").attr("node","bno="+"&operStatus=2&activityId="+json.activityId);
			getDescPage("LotteryPage",url,'callBackActivityUserJoinSmallImg');
				myTime();*/
		}		
}

//没有小浮层的页面处理
function doResultCss02(json,bno){

   				////1可以抽奖 2系统错误 3 业务异常不可以抽奖 4用户已抽奖
                 if(json.resultCode=="1"&& $.trim(json.activityId) !=""){
					url=json.ccwActivityUserJoin.luckpPageUrl;
					$("#LotteryPage").attr("node","bno="+bno+"&operStatus=2&activityId="+json.activityId);
					getDescPage("LotteryPage",url,'callBackActivityUserJoinSmallImg');
						myTime();
				}	
}
//没有运单号的抽奖弹出层
function doResultCss03(json){

		////1可以抽奖 2系统错误 3 业务异常不可以抽奖 4用户已抽奖
     if(json.resultCode=="1"&& $.trim(json.activityId) !=""){
		url=json.ccwActivityUserJoin.luckpPageUrl;
		$("#LotteryPage").attr("node","bno="+"&operStatus=2&activityId="+json.activityId);
		getDescPage("LotteryPage",url,'callBackActivityUserJoinSmallImg');
			myTime();
	}	
}
function callBackActivityUserJoin(){
	var data=$("#LotteryPage").attr("node");
	var url=$(".red-submit").attr("href")+"?"+data;
	$(".red-submit").attr("href",url);
}



function callBackActivityUserJoinSmallImg(){
	var data=$("#LotteryPage").attr("node");
	var url=$(".red-submit").attr("href")+"?"+data;
	$(".red-submit").attr("href",url);
	$("#smallhrefId").attr("href",url);
}
function myTime(){
	$('#notice').show();
}

function openNoticesmall(smallImgUrl){
	//
	$('#smallImgId').attr("src",smallImgUrl);	
	$('#noticesmall').show();
	$('#notice').hide();
	$('#maskbox').hide();
	
}
function whetherDoLuckDrawNoBno(activityType){
	
	$.ajax({
		type : "POST",
		dataType : "json",
		data:{
			activityType:activityType
		},
		url : "/service/activity/whetherDoLuckDrawNoBno.action",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
			if(json!=null)
			{
				 if(activityType=="6"){
					    //评价抽奖
				 	    doResultCss06(json);
				 } 				
			}
		}
	});	
}
function doResultCss06(json){	
	if((json.resultCode=="1"||json.resultCode=="4")&& $.trim(json.activityId) !=""){
			url=json.ccwActivityUserJoin.luckpPageUrl;
			window.location.href =url+"?activityId="+json.activityId;			
	}else{
		window.location.href = "/page/common/activity/question_success.html";
	}			
}

