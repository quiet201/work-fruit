// yishu@live.cn 2015.08.06

$(document).ready(function () {

	order_submit_height();//底部提交层高度
	
	$(".close").click(function (){//关闭遮罩层
		order_layer_iframe_hide();
		order_layer_iframe_height();
		order_layer_iframe1_hide();
	});
	$("#js_contract_Provision").click(function (){//关闭遮罩层
		order_layer_iframe1_hide();
		order_layer_iframe_height();
		order_layer_iframe_hide();
	});
	
	//弹出框单选项处理  只适用单选值
	$(".option_select").click(function (){
		//显示弹出层
		var showDivId = $(this).attr("showDivId");
		var showDivObj = $("#"+showDivId);
		$(showDivObj).css("display","block");
		order_layer_iframe_show();
		order_layer_iframe_height();
		//设置选中项
		var parent = $(showDivObj).find(".name_element_select");
		var destId = $(parent).attr("destId");
		var optionValue = getOrSetValue($("#"+destId));
		//设置匹配项，找不到就当做是填其它的值
		$(parent).find(".chidren_element_option").each(function(){
			var childrenOptionValue = getOrSetValue($(this));
			if(childrenOptionValue==optionValue){
				optionValue=null;
				$(parent).find(".current").removeClass("current");
				$(this).addClass("current");
				return false;
			}
		});
		//如果不为空，则设置为填其它项的值
		if(optionValue){
			var otherOptionObj = $(showDivObj).find(".chidren_element_option_other");
			//触发单击事件
			$(otherOptionObj).trigger("click");
			//设置文本框值
			var srcValueId = $(otherOptionObj).attr("srcValueId");
			var srcValueObj = $("#"+srcValueId);
			getOrSetValue($(srcValueObj),optionValue);
			if($(srcValueObj).attr("setValueCallBack")){
				eval($(srcValueObj).attr("setValueCallBack"));
			}
		}else{
			//为空则隐藏填其它项
			var otherOptionObj = $(showDivObj).find(".chidren_element_option_other");
			if(otherOptionObj){
				//层显示id
				var relatedShowId = $(otherOptionObj).attr("relatedShowId");
				//显示层
				$("#"+relatedShowId).css("display","none");
				//清空值
				var srcValueId = $(otherOptionObj).attr("srcValueId");
				getOrSetValue($("#"+srcValueId),optionValue);
			}
		}
		
	});
	
	//弹出框多选项处理
	$(".option_mulit_select").click(function (){
		//显示弹出层
		var showDivId = $(this).attr("showDivId");
		var showDivObj = $("#"+showDivId);
		$(showDivObj).css("display","block");
		order_layer_iframe_show();
		order_layer_iframe_height();
		//设置选中项
		var parent = $(showDivObj).find(".name_element_mulit_select");
		//分割符
		var delimiter = $(parent).attr("delimiter");
		//设置文本值的组件ID
		var destId = $(parent).attr("destId");
		//文本框值
		var optionValue = getOrSetValue($("#"+destId));
		//设置匹配项，找不到就当做是填其它的值
		$(parent).find(".current").removeClass("current");
		$(parent).find(".chidren_element_mulit_option").each(function(){
			var childrenOptionValue = getOrSetValue($(this));
			var index = optionValue.indexOf(childrenOptionValue);
			if(index>-1){
				$(this).addClass("current");
				optionValue = optionValue.replace(childrenOptionValue,"").replace(delimiter+delimiter,delimiter);
				if(optionValue==delimiter){
					optionValue = "";
					return false;
				}
			}
		});
		//如果不为空，则设置为填其它项的值
		if(optionValue){
			//设置文本框值
			if(optionValue.indexOf(delimiter)==0){
				optionValue = optionValue.substr(delimiter.length);
			}
			var otherOptionObj = $(showDivObj).find(".chidren_element_mulit_option_other");
			getOrSetValue($(otherOptionObj),optionValue);
			if($(otherOptionObj).attr("setValueCallBack")){
				eval($(otherOptionObj).attr("setValueCallBack"));
			}
		}
		
	});
	
//	$("#js_content_bj").click(function (){//保价
//		$(".content_bj").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
//	});
	//普通弹出层展示
	if($(".popup_div").size()){
		$(".popup_div").each(function(){
			$(this).bind('click',function (){
				//检测是否有单击事件前预处理方法，如果该方法返回false则不显示该层
				var beforeClickFun = $(this).attr("beforeClickFun");
				if(beforeClickFun){
					if(false==eval(beforeClickFun)){
						return;
					}
				}
				//展示关联的层
				var showDivId = $(this).attr("showDivId");
				var showDivObj = $("#"+showDivId);
				$(showDivObj).css("display","block");
				order_layer_iframe_show();
				order_layer_iframe_height();
				//检测昌否有需要单击事件后需要处理的预处理方法
				var afterClickFun = $(this).attr("afterClickFun");
				if(afterClickFun){
					eval(afterClickFun)
				}
			});
		});
	}
	
//	$("#js_content_cplx").click(function (){//产品类型
//		$(".content_cplx").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
//	});
	$("#jd_content_sxcp").click(function (){//产品类型-标快
		order_layer_iframe_hide();
		$(".content_sxcp").show();
		order_layer_iframe_show();
		order_layer_iframe_height();
	});
//	$("#js_content_fkfs").click(function (){//付款方式
//		$(".content_fkfs").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
//	});
//	$("#js_content_dxgs").click(function (){//给收派员留言
//		$(".content_dxgs").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
//	});
//	$("#js_content_jjfs").click(function (){//寄件方式
//		$(".content_jjfs").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
//	});
//	$("#js_content_wpmc").click(function (){//物品名称
//		$(".content_wpmc").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
////		//设置选中项
////		var parent = $(this).children(".name_element_select");
////		var destId = $(parent).attr("destId");
////		var value = getOrSetValue($("#"+parent));
////		$(this).children(".chidren_element_option,.chidren_element_option_other").each(function(){
////			
////		});
//	});
//	$("#js_content_wpzl").click(function (){//物品重量
//		$(".content_wpzl").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
//	});
//	$("#js_content_jjsj").click(function (){//预约上门
//		$(".content_jjsj").show();
//		order_layer_iframe_show();
//		order_layer_iframe_height();
//	});
	$("#jd_content_sxdspy").click(function (){//找熟悉的收派员
		$(".content_sxdspy").show();
		order_layer_iframe_show();
	});
//	$("#js_content_tk").click(function (){//契约条款
//		$(".content_qytk").show();
//		order_layer_iframe1_show();
//		order_layer_iframe1_calculatePosition();//设置遮罩弹出层2位置
//	});
	
	
	$(".width1 ul").css("width",$(".width1").find("li").length * 120 - 20);
	$(".width2 ul").css("width",$(".width2").find("li").length * 120 - 20);
	
	$(".addressClipboard h4").click(function(){//新建订单-地址粘贴板
		$(".addressClipboard div").slideToggle("100",addressClipboard);
	});
	
	order_layer_iframe1_calculatePosition();//设置遮罩弹出层2位置
	order_layer_iframe2_calculatePosition();//设置遮罩弹出层3位置

	// yishu@live.cn 2015.08.18
	$(".order_success_content_printPosition dt.arrow").click(function(){//新建订单-地址粘贴板
		$(".order_success_content_printPosition_list").slideToggle("100",printPosition);
	});
	
	// yishu@live.cn 2015.08.25
	//快件管理-筛选项下拉
	$(".expressManage_tools>li>.Left>h4>p").click(function (e) {
		//e.stopPropagation();
		$('.filtrate_popup').addClass("hide");
		$(".expressManage_tools>li>.Left>h4>p").removeClass("current");
		$(this).addClass("current");
		$(this).siblings('.filtrate_popup').removeClass("hide");
		$(".order_layer_shade").show();
	});
	$('.filtrate_popup').click(function (e) {
		//e.stopPropagation();
	});
	$(document).click(function (e) {
		if(!e){  
          var e = window.event;  
        }  
        //获取事件点击元素  
        var targ = e.target;  
        //获取元素名称  
        var tname = targ.tagName; 
        //alert(tname);  
		//debugger
		if($(targ).is($(".expressManage_tools>li>.Left>h4>p"))==false && $(targ).is($('.filtrate_popup'))==false && $(targ).is($('.filtrate_popup').find("*"))==false){
			if($('.filtrate_popup').not(".hide").length>0){
				$('.filtrate_popup').addClass("hide");
				$(".expressManage_tools>li>.Left>h4>p").removeClass("current");
				$(".order_layer_shade").hide();
			}
		}
		
		
		
	});
	
	//配置弹出框单选项的选项单击事件
	if($(".name_element_select").size()>0){
		$(".name_element_select").each(function(){
			var parentId = $(this).attr("id");
			var destId = $(this).attr("destId");
			$(this).find(".chidren_element_option,.chidren_element_option_other").each(function(){
				$(this).bind("click", function(){
					 elementSelected(parentId,this,destId);
				});
			});
		});
	}
	
	//配置弹出框多选项的选项单击事件
	if($(".name_element_mulit_select").size()>0){
		$(".name_element_mulit_select").each(function(){
			//绑定确定按纽事件
			var makeSuerId = $(this).attr("makeSuerId");
			var parent = this;
			$("#"+makeSuerId).bind("click",function(){
				//检查是否有点击事件执行前预处理方法
				if($(this).attr("beforeClick")){
					if(false == eval(beforeClick)){
						return;
					}
				}
				var options = new Array();
				$(parent).find(".chidren_element_mulit_option.current").each(function(){
					options.push(getOrSetValue(this));
				});
				var option_other_id = $(parent).attr("option_other_id");
				if(option_other_id){
					options.push(getOrSetValue($("#"+option_other_id)));
				}
				//设置值的对象
				var destId = $(parent).attr("destId");
				//分割符
				var delimiter = $(parent).attr("delimiter");
				getOrSetValue($("#"+destId),options.join(delimiter));
				$(".close").trigger("click");
				var setValueCallBack = $(this).attr("setValueCallBack");
				if(setValueCallBack){
					eval(setValueCallBack);
				}
			});
			$(this).find(".chidren_element_mulit_option").each(function(){
				$(this).bind("click", function(){
					 $(this).toggleClass("current");
				});
			});
		});
	}
	

});

function order_submit_height(){//占位层-底部提交层高度
	var order_submit_height = $(".order_submit").height()+10;
	$(".order_bottom_placeholder").css("min-height",order_submit_height);
};
function order_layer_iframe_height(){//占位层-底部弹出层高度
	var order_bottom_height = $(".order_layer_iframe").height()+10;
	$(".order_bottom_placeholder").css("height",order_bottom_height);
};
function order_layer_iframe_show(){//底部弹出层显示
		$(".order_layer_shade").show();
		$(".order_layer_iframe").css("height","");
};
function order_layer_iframe_hide(){//底部弹出层隐藏
		$(".order_layer_shade").hide();
		$(".order_layer_iframe").css("height",0);
		$(".order_layer_iframe .container>div").hide();
};
function order_layer_iframe1_show(){//底部弹出层显示2
		$(".order_layer_shade").show();
		$(".order_layer_iframe1").show();
};
function order_layer_iframe1_hide(){//底部弹出层隐藏2
		$(".order_layer_shade").hide();
		$(".order_layer_iframe1").hide();
		$(".order_layer_iframe1 .container>div").hide();
};

function addressClipboard(){//新建订单-地址粘贴板
	var h4_class = $(".addressClipboard h4 i").attr("class");
	if(h4_class == "icon"){
		$(".addressClipboard h4 i").attr("class", "icon current"); 
	}else{
		$(".addressClipboard h4 i").attr("class", "icon"); 
	}
};

//设置遮罩弹出层2位置
function order_layer_iframe1_calculatePosition(){
	var layer_iframe_height = ($(".order_layer_iframe1").height())/2;
	var layer_iframe_width = ($(".order_layer_iframe1").width())/2;
	//alert(layer_iframe_height);
	$(".order_layer_iframe1").css({"margin-top":-layer_iframe_height,"margin-left":-layer_iframe_width});
}
//设置遮罩弹出层3位置
function order_layer_iframe2_calculatePosition(){
	var layer_iframe_width = ($(".order_layer_iframe2").width()+50)/2;
	var layer_iframe_height = ($(".order_layer_iframe2").height()+50)/2;
	//alert(layer_iframe_height);
	$(".order_layer_iframe2").css({"margin-left":-layer_iframe_width,"margin-top":-layer_iframe_height,"left":"50%","top":"50%"});
}

// yishu@live.cn 2015.08.18
function printPosition(){//新建订单-地址粘贴板
	var dt_class = $(".order_success_content_printPosition dt").attr("class");
	if(dt_class == "arrow"){
		$(".order_success_content_printPosition dt").attr("class", "arrow current"); 
	}else{
		$(".order_success_content_printPosition dt").attr("class", "arrow"); 
	}
};

function elementSelected(parentId,_this,destId){
	//清除选择样式
	var parentObj = $("#"+parentId);
	$(parentObj).find(".current").removeClass("current");
	$(_this).addClass("current");
	var destValueCallFun = $(parentObj).attr("destValueCallFun");
	//如果是需填其它的选项，则显示文本框
	if($(_this).hasClass("chidren_element_option_other")){
		//层显示id
		var relatedShowId = $(_this).attr("relatedShowId");
		//源文本框ID
		var srcValueId =  $(_this).attr("srcValueId");
		//清除文本框值
		getOrSetValue($("#"+srcValueId),"");
		//输入值确定按纽ID
		var makeSuerId =  $(_this).attr("makeSuerId");
		//显示层
		$("#"+relatedShowId).css("display","block");
		//确定按纽绑定事件
		$("#"+makeSuerId).off("click").on("click",function(){
			var beforeClick = $(this).attr("beforeClick");
			if($(this).attr("beforeClick")){
				if(false == eval(beforeClick)){
					return;
				}
			}else{
				if(""==getOrSetValue($("#"+srcValueId))){
					alertError('输入值不能为空');
					return;
				}
			}
			setElementSelectedValue($("#"+srcValueId),destId);
			if(destValueCallFun){
				eval(destValueCallFun);
			}
		});
	}else{
		setElementSelectedValue(_this,destId);
		if(destValueCallFun){
			eval(destValueCallFun);
		}
	}
}

function setElementSelectedValue(_this,destId){
	var value = getOrSetValue(_this);
	var destObj = $("#"+destId);
	getOrSetValue(destObj,value);
	$(".close").trigger("click");
}

function getOrSetValue(_this,value){
	if($(_this).is('input') || $(_this).is('text')  || $(_this).is('textarea')  || $(_this).is('number')  || $(_this).is('checkbox')){
		if(value!=undefined){
			$(_this).val(value);
		}else{
			return $(_this).val();
		}
	}else{
		if(value!=undefined){
			$(_this).text(value);
		}else{
			return $(_this).text();
		}
	}
}



