var selectedLabel;
var labelMsg;
$(document).ready(function(){

	//选择寄件时间	
		
		$("[data-toggle='datePicker']").bind("click",function(e){
			
			var $obj = $(this);
			var $picker = $('[data-toggle-content="datePicker"]');
			var pickerDate = $picker.find(".ui-timelist");
			var pickerTime = $picker.find(".items");
			var liNum = pickerTime.find("li").length;
			var prev = $picker.find(".list-prev");
			var next = $picker.find(".list-next");
			var defaultDate = 0; //设置默认日期
			var defaultTime = 1; //设置默认时间
			var selectDate = defaultDate;
			var selectTime = defaultTime;		
			
			var allPage = Math.ceil(liNum /12);
			var curPage = 1;		
			
			if(allPage > 2){
				prev.addClass("disable").show();
				next.show();
			}else{
				prev.hide();
				next.hide();
			}
					
			prev.bind("click",function(){
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
				}
			});	
			
			next.bind("click",function(){
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
			});
			
			var $mask = $('<div class="maskbox" style="z-index:10; opacity:.9;"></div>');
			
			
			e.stopPropagation();			
			$("body").append($mask);
			$picker.slideDown(300);
			
			//点击其它地址隐藏
			$mask.click(function(){			
				$picker.slideUp(300,function(){$mask.remove();});				
			});		
			
			
			//初始化选项卡
			$picker.find("[data-tabs='tabs']").find("li").removeClass("cur").end().find('[data-menu="date"]').addClass("cur");
			$picker.find(".ui-tabs-content").hide();
			$picker.find('[data-tabs-content="date"]').show();
			
			//设置默认日期
			pickerDate.find("li").each(function(i){
				if(i == defaultDate){
					$(this).siblings("li").removeClass("selected").end().addClass("selected");
				}
			});
			//设置默认时间
			pickerTime.find("li").each(function(i){
				if(i == defaultTime){
					$(this).siblings("li").removeClass("current").end().addClass("current");
				}
			});
			
			//选择日期
			pickerDate.find("li").each(function(i){
				$(this).bind("click",function(){
					$(this).siblings("li").removeClass("selected").end().addClass("selected");
					$picker.find("[data-tabs='tabs']").find("li").removeClass("cur").end().find('[data-menu="time"]').addClass("cur");
					$picker.find(".ui-tabs-content").hide();
					$picker.find('[data-tabs-content="time"]').show();
					selectDate = $(this).index();
				});
			});
			
			//选择时间
			pickerTime.find("li").each(function(i){
				$(this).bind("click",function(){
					$(this).siblings("li").removeClass("current").end().addClass("current");
					selectTime = $(this).index();
				});
			});	
			
			
			//点击确定
			$picker.find("[data-btn='submit']").bind("click",function(){
				$picker.slideUp(300,function(){
					var selectDateTime = pickerDate.find("li").eq(selectDate).find(".date").text() + ' ' + pickerTime.find("li").eq(selectDate).text();
					$obj.val(selectDateTime);
					$mask.remove();
				});				
			});
			
			//点击取消
			$picker.find("[data-btn='cancel']").bind("click",function(){
				$picker.slideUp(300,function(){
					$mask.remove();
				});			
			});
			
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
			
		});	
		
		
		//获取参数 查询路由信息
		var urlParams = {
				bno : "",
				hasRoute : false
			};
			//$('.fancybox').fancybox();
			
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
		
		addLabel();
		
	
});

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
				url : "/service/delivery/arrive/" + obj.bno + "/"
						+ obj.hasRoute,
				success : function(data) {
					ruleConfig.routeData=data;
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						if (values) {
							var toCityName = convertNull(values.toCityName);
							$('#toCityName').text(toCityName);
							/*$("#startAdd").text(
									convertNull(values.fromCityName));
							$("#endAdd").text(convertNull(values.toCityName));
							var businesstype=convertNull(values.businesstype);*/
							
							// 运输方式图片处理
							// 空运
							/*if (businesstype == '2'){
								$(".icons-process img").attr("src",
								"../../../images/xiaomi/icons-process-plane.png");
							}else{
								$(".icons-process img").attr("src",
								"../../../images/xiaomi/icons-process-car.png");
							}*/
							/*$(".expected-process strong").text(
									convertNull(values.expectedDate));
							$("#beginTime").text(convertNull(values.beginTime));
							// <span id="receivertips">快件正在派送中,派件人罗莉莉,电话<span
							// id="deliveryPhone">15013883053</span></span>
							$("#receivertips").html(convertNull(values.status));*/
							if (values.employ) {
								// 派送员手机
								/*$("#deliveryPhone").text(
										convertNull(values.employ.deliveryPhone));
								if($.trim(values.employ.deliveryPhone)!=""){
									$("#tellPhone").attr("href","tel:"+convertNull(values.employ.deliveryPhone));
								}
								// 派送员工号
								$("#empCode").text(
										convertNull(values.employ.empCode));*/
								$("#empName").text(
										convertNull(values.employ.empName));
								var imgUrl = values.employ.photoUrl ? values.employ.photoUrl
										: "../../../images/alipay/defalut-image.png";
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
												"../../../images/alipay/defalut-image.png");
							};
						};
						//广告设置  填充下拉图片url
						/*if ($.trim(values.interactiveRing)!="") {
							$("#advi-img").attr("src", values.interactiveRing);
						} else {
							$("#advi-img").attr("src","../../../images/ad/../../../images/ad/xiaomi900X100.png");
						}*/
					};
					getCommonImg("10532","N","1");
				},
				error : function(e) {
					ruleConfig.routeState="N";
					getCommonImg("10532","N","3");
				}
			});
			
		

}

//动态添加标签
function addLabel(){
	$.ajax({
		type : "POST",
		data : {},
		dataType : "json",
		url : "/service/labelMessage/labelInfo",
		success : function(data) {
		   var labels = eval(data);
		   for(var i=0;i<labels.length;i++){
			   var content = "";
		   $.each(labels[i],function(key,value){
	            //$("#mapinfo").append(key+"----"+value+"<br/><hr/>");
			// alert(key+"----"+value);
			// content+="<div class='msg-box-h' onClick='addMsg(this);'  id="+key+"><span class='msg-lt-h'></span><p>"+value+"</p></div>";
			   content+="<div class='msg-box-h' onClick='addMsg(this);' id="+key+"><span class='msg-lt-h'></span><p>"+value+"</p></div>";
	        });
		       $('#labelSets').append(content);
		   }
		 
			//getCommonImg("10532","N","1");
		},
		error : function(e) {
			//ruleConfig.routeState="N";
			//getCommonImg("10532","N","3");
		}
	});
	
}

//捎话标签选中事件
function addMsg(e){
	//alert($(e).attr('id'));
	selectedLabel = $(e).attr('id');
    labelMsg = $(e).find('p').text();
	//alert(selectedLabel+'----------'+labelMsg);
	//遍历复选按钮
	$('[class="msg-box-h"]').each(function(){
		$(this).click(function(){
			$('.msg-div div').each(function(){
				$(this).removeClass("msg-box-red");
			});
			$(this).toggleClass("msg-box-red");
//			if(){
				//if($(this).hasClass("msg-box-red") && $(this).index()==6){
			//alert($(this).find('p').text());
			//判断是否选中弹出时间 的标签
			if($(this).hasClass("msg-box-red") && '晚点送'==$(this).find('p').text()){
					$("#yy-time").show();
					$(".ui-fm .li-msg").css("border-bottom","#e1e1e1 1px solid");
				}else{
					$("#yy-time").hide();
					$(".ui-fm li").css("border-bottom","#e1e1e1 0px solid");
				}
//			}
		});
	});
}

//点击提交按钮 跳转页面
function btnClick(){
	var url="/../../../xiaomi/deliverydetails/no-routing/sf07_1-ok.html";
	window.location = url;
	
}
