var waybillInfo;
var bno;
var msg='';
var addressAddr = null;
var noMessage;
$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00201");
		//获取参数 查询路由信息
		var urlParams = {
				bno : "",
				hasRoute : false
			};
			
		var ruleConfig={
					routeState:"",
					routeData :"",//路由信息
					ruleState : "",
					ruleData  :""//规则信息
				};
		init(urlParams);	
		getData(ruleConfig,urlParams);
		
		//填充页面信息
		$('#waybill-num').text(urlParams.bno);
		
		//generateOrderDate($('#senderCityCode').val());
		
});

//初始化页面
function init(obj) {
	getUrlParams(obj);
}

//获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "bno") {
				urlParams.bno = unescape($.trim(strs[i].split("=")[1]));
				bno = urlParams.bno;
			}
			if ([ strs[i].split("=")[0] ] == "hasRoute") {
				urlParams.hasRoute = unescape(strs[i].split("=")[1]);
			}
		}
	}
}


function getData(ruleConfig,obj) {
	// 数据提交
			$.ajax({
				type : "POST",
				data : {
					waybillno : obj.bno
				},
				dataType : "json",
				url : "/service/delivery/arrive/query44WayInfoNoAddSeleNum/" + obj.bno+"/false",
				success : function(data) {
					ruleConfig.routeData=data;
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						waybillInfo = values;
						if (values) {
							var toCityName = fillNull(values.toCityName);
							var toCityCode = fillNull(values.toCityCode);//收货城市编码
							noMessage = $.parseJSON(data).doBookSendTime;
							
							$('#senderCityCode').val(toCityCode);
							console.log($('#senderCityCode').val());
							addressAddr = fillNull(values.addressAddr);
							console.log(addressAddr);
							//$('#toCityName').text(addressAddr);
							//初始化时间
							generateOrderDate(toCityCode);
							if (values.employ) {
								$("#empName").text(
										fillNull(values.employ.empName));
								var imgUrl = values.employ.photoUrl ? values.employ.photoUrl
										: "/image/tencent/defalut-image.png";
								//如果图片不存在后缀，需要加上后缀
								if(imgUrl.lastIndexOf(".")==-1 || !((imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".gif")
										|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".jpg")
										|| (imgUrl.substr(imgUrl.lastIndexOf("."),imgUrl.length)==".png"))){
									$("#bigPhoto").attr("href",imgUrl+".jpg");
								}
								$("#photoUrl").attr("src", imgUrl);
							} else {
								$("#photoUrl")
										.attr("src",
												"/image/tencent/defalut-image.png");
							};
						};
					};
					getCommonImg("10561","N","1");
				},
				error : function(e) {
					ruleConfig.routeState="N";
					getCommonImg("10561","N","3");
				}
			});
}


//点击提交按钮 提交数据 成功时跳转页面
function btnClick(){
	if('false'== noMessage){
		alertError('已经预约过派件了');
	}
	else{
		var sub = 1;
			if(''!=$.trim($('#dateTimeInput').val())&&null!=$('#dateTimeInput').val()){
				 msg =$('#dateTimeInput').val();
				 sub = 1;
			}else{
				alertError('请选择派件时间！');
				sub = 0;
			}
			
		if(1==sub){
			selectedLabel='7';//这个字段随便填，因为之前是标签码，现在不用。
		$.ajax({
			type : "GET",
			data : null,//{'bno':bno,'labelType':'1','labelCode':selectedLabel,'msg':msg},
			async : false,
			dataType : "json",
			url : "/service/order/orderContro/aMessage/"+bno+"/2/"+selectedLabel+"/"+encodeURI(encodeURI(msg))+"/3",
			success : function(data) {
				if('0'==data||null==data){
					alertError('系统繁忙，请稍后再试');	
				}
				else{
					var url = 'bookSendTime_success.html'+'?bno='+bno;
					window.location.href = url;	
				}
			},
			error : function(e) {
			}
		});
		}
	}
}

function generateOrderDate(cityCode){
	// 数据提交
	$.ajax({
		type : "GET",
		data : null,
		async : false,
		dataType : "json",
		url : "/service/order/initOrderDateAndTimeList/"+cityCode,
		success : function(data) {
			var dateList = data.dateList;
			
			//生成时间列表
			var dateUlContent = "";
			if(dateList != null && dateList.length == 3){
				var dateUlContent = '<li onclick="selectDate(this,0)" class="selected"><span class="name">今天</span><span class="date">' + dateList[0] +'</span></li>';
				dateUlContent += '<li onclick="selectDate(this,1)"><span class="name">明天</span><span class="date">' + dateList[1] +'</span></li>';
				dateUlContent += '<li onclick="selectDate(this,2)"><span class="name">后天</span><span class="date">' + dateList[2] +'</span></li>';
			}
			
			$("#selectDateValue").val(dateList[0]);	//设置当天的日期为默认值
			$("#orderDateList").html(dateUlContent);
			
			//生成当天的时间列表
			var todayTimeList = data.todayTimeList;
			var todayTimeUlContent = "";
			if(todayTimeList != null && todayTimeList.length > 0){
				for(var i=0; i< todayTimeList.length; i++){
					if(i==0){
						$("#selectTimeValue").val(todayTimeList[i]); //设置第一个时间为默认值
						todayTimeUlContent += '<li  onclick="selectTime(this)" class="current">'+ todayTimeList[i] + '</li>';
					} else {
						todayTimeUlContent += '<li  onclick="selectTime(this)">'+ todayTimeList[i] + '</li>';
					}
				}
			}
			
			//$("#orderTimeList").find("li").remove();
			$("#orderTimeList").html(todayTimeUlContent);
			
			getCommonImg("1102","N","1");
		},
		error : function(e) {
			getCommonImg("1102","N","3");
		}
	});
}


/**
 * 选择日期和时间
 */
var liNum = 0; 
var $picker = $('[data-toggle-content="datePicker"]');
var $mask;
var allPage = 0;
var curPage = 1;
var pickerTime = $("#orderTimeList");
var next = $picker.find(".list-next");
var prev = $picker.find(".list-prev");
function selectDateAndTime(){
	//获取寄件人城市编码
	var senderCityCode = $('#senderCityCode').val();
	//alert($('#senderCityCode').val());
	if(!senderCityCode || senderCityCode == null || $.trim(senderCityCode) == ""){
		alertDialogs("系统繁忙，请稍后再试！");
		return;
	}
	
	//初始化下单日期和时间

	
	var defaultDate = 0; //设置默认日期
	var defaultTime = 1; //设置默认时间
	var selectDate = defaultDate;
	var selectTime = defaultTime;			
	
	setPageInfo();
	
	$mask = $('<div class="maskbox" style="z-index:10; opacity:.9;"></div>');
	//e.stopPropagation();			
	$("body").append($mask);
	$picker.slideDown(300);
	
	//选择寄件时间中tabs
	$picker.find("[data-tabs='tabs']").each(function(e){
		var parent= $(this);				 
		parent.find("li").each(function(i){
			$(this).bind("click",function(){
				$(this).siblings("li").removeClass("cur").end().addClass("cur");
				parent.siblings(".ui-tabs-content").hide();
				parent.siblings(".ui-tabs-content").eq(i).show();
			});
		});
	});	
}

//设置分页信息
function setPageInfo(){
	curPage = 1;	
	liNum = $("#orderTimeList").find("li").length;
	allPage = Math.ceil(liNum /12);

	if(allPage > 1){
		prev.addClass("disable").show();
		next.removeClass("disable").show();
	}else{
		prev.hide();
		next.hide();
	}
	if(curPage > 1){							
		next.removeClass("disable");
	}
	if(curPage == 1){
		prev.addClass("disable");
	}
}

//上一页
function prevPage(){
	if(curPage != 1){
		var top = parseInt(pickerTime.css("top"));
		pickerTime.animate({top:top + 160},300);
		curPage = curPage - 1;
	}
	
	if(curPage > 1){	
		next.removeClass("disable");
	}
	if(curPage == 1){
		prev.addClass("disable");
		next.removeClass("disable");
	}
}

//下一页
function nextPage(){
	if(curPage < allPage){
		var top = parseInt(pickerTime.css("top"));
		pickerTime.animate({top:top - 160},300);
		curPage = curPage + 1;	
	}
	if(curPage > 1){							
		prev.removeClass("disable");
	}
	if(curPage == allPage){
		next.addClass("disable");
	}
}


//选择日期
function selectDate(obj,dateIndex){
	//获取寄件人城市编码
	var senderCityCode = $("#senderCityCode").val();
	
	$(obj).siblings("li").removeClass("selected").end().addClass("selected");
	pickerTime.css({top:0});
	// 数据提交
	$.ajax({
		type : "GET",
		data : null,
		dataType : "json",
		url : "/service/order/getOrderTimeListByCityCode/"+senderCityCode+"/"+dateIndex,
		success : function(data) {
			$("#orderTimeList").find("li").remove();
			
			var timeList = data.timeList;
			if(timeList == null || timeList.length == 0){
				$("#selectDateValue").val("");
			} else {
				var selectValue = obj.children[1].innerText;
				$("#selectDateValue").val(selectValue);
			}
			
			//生成当天的时间列表
			var timeUlContent = "";
			if(timeList != null && timeList.length > 0){
				for(var i=0; i< timeList.length; i++){
					if(i==0){
						$("#selectTimeValue").val(timeList[i]); //设置第一个时间为默认值
						timeUlContent += '<li onclick="selectTime(this)" class="current">'+ timeList[i] + '</li>';
					} else {
						timeUlContent += '<li onclick="selectTime(this)">'+ timeList[i] + '</li>';
					}
				}
			}
			$("#orderTimeList").html(timeUlContent);
			
			//重新设置分页信息
			setPageInfo();
			
			$picker.find("[data-tabs='tabs']").find("li").removeClass("cur").end().find('[data-menu="time"]').addClass("cur");
			$picker.find(".ui-tabs-content").hide();
			$picker.find('[data-tabs-content="time"]').show();
		},
		error : function(e) {
		}
	});
	$(this).siblings("li").removeClass("selected").end().addClass("selected");
}

//选择时间事件
function selectTime(obj){
	$("#selectTimeValue").val(obj.innerText);
	$(obj).siblings("li").removeClass("current").end().addClass("current");
}

//确定事件
function confirmEvent(){
	var selectDate = $("#selectDateValue").val();
	var selectTime = $("#selectTimeValue").val();

	if(selectDate && selectDate != "" && selectTime && selectTime != ""){
		$('#dateTimeText').show();
		$('#timeSpan').hide();
		$("#dateTimeText").val(selectDate+ " " +selectTime);
		$("#dateTimeInput").val(selectDate+ " " +selectTime);
	} else {
		$('#dateTimeText').hide();
		$('#timeSpan').show();
		$("#dateTimeText").val("现在");
		$("#dateTimeInput").val("");
	}
	$picker.slideUp(300,function(){
		$mask.remove();
		$mask = "";
	});
	
	$("#selectDateValue").val("");
	$("#selectTimeValue").val("");
}

//取消事件
function cancelEvent(){
	$("#selectDateValue").val("");
	$("#selectTimeValue").val("");

	$picker.slideUp(300,function(){
		$mask.remove();
		$mask = "";
	});	
}

//文本提示弹出层
function tipsDialog(content){
//	var $dialog = $('<div class="dialog-tips"></div>');
//	var $content = $('<div class="content"></div>');
	var $dialog = $('<div class="black_overlay"></div>');
	var $content = $('<div class="white_content"></div>');
	var $content1 = $('<div style="text-align: right; cursor: default; height: 40px;"></div>');
	$content.html("<p>"+content+"</p>");
	$dialog.append($content);
	$("body").append($dialog);  
	var windowHeight = $(window).height();  
	var popupHeight = $dialog.height(); 
	var top = (windowHeight-popupHeight)/2+(windowHeight-popupHeight)/5;
	$dialog.css({"top": top}).fadeIn(500);		
	setTimeout(function () {
		$dialog.fadeOut(500);
	}, 2500);
}

function showClause(){
	alertDialogs($('#light1').html(),2);
}

/**
 * 弹出框
 * @param content
 * @param type
 */
function alertDialogs(content,type){
	//type 1 提示框  2条款  3 改派确认
	var $mask = $('<div class="maskboxs"></div>');
	var $dialog = $('<div id="dialog" class="ui-dialogs"></div>');
	var $content = $('<div class="ui-alert-contents"></div>');
	var $bottom;
	var $btnSubmit;
    var $btnCancel = $('<a class="ui-btns btn-cancels" href="javascript:void(0);">关闭 </a>');
	if(type==1){
	    $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix"></div>');
	    $btnSubmit = $('<a class="ui-btns btn-submits" href="javascript:void(0);">确认</a>');
	}else{
		 $bottom = $('<div class="ui-dialog-bts ui-cols2s clearfix" style="text-align:center;border-top: 1px solid rgba(0,0,0,.2);padding-top: 1px;"></div>');
		 $btnSubmit = $('<a class="ui-btns btn-submit01" href="javascript:void(0);">我知道了</a>');
	}
	var dialogDocHeight = 0;
	$content.html(content);
	if(type!=2){
	  $bottom.append($btnCancel);	
	}
	$bottom.append($btnSubmit);
	$dialog.append($content).append($bottom);
	$mask.css({height:$(document).height()});
	$("body").append($mask);
	$("body").append($dialog);
	dialogDocHeight = $dialog.height();
	
	centerDialog($dialog);
	
	$(window).resize(function(){		
	  centerDialog($dialog);	  
	 }); 
	
	$mask.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});
	
	$btnSubmit.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
		if('3'==type){
			isOk = true;
		}
		if(null!=onclose){
			
		}
	});
	
	$btnCancel.click(function(){
		$mask.remove();
		$dialog.remove();
		$("body").removeAttr("style");	
	});
	
	//垂直居中
	function centerDialog(obj){
		var windowWidth = $(window).width();   
		var windowHeight = $(window).height();  
		var popupHeight = $(obj).height();   
		var popupWidth = $(obj).width();
		var top = (windowHeight-popupHeight)/2; 
		var left = (windowWidth-popupWidth)/2;
		var objHeight = "auto";
		
		$mask.css({height:$(document).height()});
		
		if(dialogDocHeight > windowHeight){		
			top = windowHeight * 0.1;
			objHeight = windowHeight - top * 2;					
		}
		
		var bottomHeight = $bottom.outerHeight() + 1;			
		var contentHeight = (objHeight - bottomHeight);
		
		$(obj).css({ 
				"top": top,   
				"left": left ,
				"height":objHeight,
				"overflow":"hidden"
			});
				
		if(dialogDocHeight > windowHeight){	
			$content.css({ 
				"height":contentHeight
			});			
		}else{			
			$content.removeAttr("style"); 
		}
		$("body").css({
				"overflow":"hidden"
			});		
		
	}
	
}

function alertError(contect){
	$('#errorInfo').text(contect);
	$('#errorMsg').show();
	setTimeout(function () {
		$('#errorMsg').fadeOut(500);
	}, 1500);
}

