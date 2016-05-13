$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00602");

	
	//init();
	addListen();
	
	searchCoupon();
});

//绑定选项卡切换事件
function addListen(){
	$(".coupons-tab ul li").click(function(){
		 $(this).addClass("cur").siblings().removeClass("cur"); //切换选中的按钮高亮状态
		 var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
		 //$(".box-coupons-con").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
		 //$(".box-coupons-con").eq(index).show();
		 var obj = $(".box-coupons-con");
		 $.each(obj, function(i) {     
			    if(index==i){
			    	$(obj[i]).show();
			    }else{
			    	$(obj[i]).hide();
			    }          
			});
		 });
}

//显示条形码
function showBarcordLayer(couponNo,checkCode,num){
	$("#checkCode").text(checkCode);
	$("#couponNo").text(couponNo);
	$("#showmc_num").html(num);
	//$("#couponImg").text();
	//$("#codeImg").text();
	BarCodeGeneration(couponNo,'3','50','5','148','22',$("#couponImg"));
	BarCodeGeneration(checkCode,'3','50','5','148','22',$("#codeImg"));
	$('#showBarcode').show();
}

//生成条形码
function BarCodeGeneration(code,barWidths,barHeights,moduleSizes,posXs,posYs,obj){
	var btype ='ean8';
	var value = code;
	 var settings = {
	          output:"css",
	          bgColor: "#FFFFFF",
	          color: "#000000",
	          barWidth: barWidths,
	          barHeight: barHeights,
	          moduleSize: moduleSizes,
	          posX: posXs,
	          posY: posYs,
	          addQuietZone: false
	        };
	 obj.text("").show().barcode(value, btype, settings);
	
}

//关闭弹出层事件
function closeLayer(){
	
	$("#layer").hide();
	
}

//关闭弹出的条形码
function closeBarcode(){
	$("#showBarcode").hide();
}




//查询用户所有顺丰券信息
function searchCoupon(){
	$.ajax({
		async : false,
		type : "POST",
		dataType : "json",
		url : "/service/coupons/coupons/searchCoupon",
		success: function(result){
			if(null!=result&&"[]"!=result){
			createNewDom(eval(result));
			}else{
				$("#noCuopons").show();
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$("#noCuopons").show();
		alert("查询失败");	
		}
	});
};

//提示使用規則
function showLayer(num){
	
	var amount = $(".amount");
	 $.each(amount, function(i) {     
		 $(amount[i]).html(num);         
		});
	$("#layer").show();
	
}


//创建顺丰券模板数据
function createNewDom(json) {
	if($.trim(json)==""){
		return;
	}
	//有效的顺丰券
	var temp="<div class='coupon-excellent coupon-sf-express'><div class='mt'></div><div class='mc'><div class='mc-con flex'>"+
             "<div class='mc-con-l'> <a href='javascript:void(0);'><div class='flex-sb coupon-text-notes'>"+
             "<div class='mc-price'><p class='price-y'>￥</p><p class='mc-num' id='pledgeMoneyTemp'></p></div><div class='flex-end'>"+
             "<p class='text-coupon'>顺丰优惠券</p><p class='view-use' id='openView'>查看使用规则</p></div></div><div class='effective'>有效期: <span id='effectDateTemp'>2016.1.10-2016.12.10</span></div>"+
             "</a></div><div class='mc-con-r'> <a href='javascript:void(0);'> <div><span class='code-view'>&nbsp;</span><span class='view-use'  id='viewBarCode'>查看条码</span></div>"+
             "<div>券号:<span id='couponNoTemp'> 8101234567890</span></div><div>校验码:<span id='checkCodeTemp'> 662000 </span></div></a></div></div> <div class='con-mc-hr'></div>"+
             " <div class='signed'></div></div></div>";
                  
                
              
 
	var unused = $("#-unused");
	var expired = $("#-expired");
	var use = $("#-used");
	$.each(json ,function(index,item){
		var obj  = $(temp).clone();
		
		
		if("未使用"==$.trim(item.status)){
			obj.find("#pledgeMoneyTemp").text(fillNull(item.pledgeMoney)).removeAttr("id");
			obj.find("#effectDateTemp").text(fillNull(item.effectDate)+fillNull(item.invalidDate)).removeAttr("id");
			obj.find("#viewBarCode").attr("onclick","showBarcordLayer('"+item.couponNo+"','"+item.checkCode+"','"+item.pledgeMoney+"')").removeAttr("id");
			obj.find("#openView").attr("onclick","showLayer('"+item.pledgeMoney+"')").removeAttr("id");
			//obj.find("#viewBarCode").attr("onclick",showBarcordLayer(item.couponNo,item.checkCode)).removeAttr("id");
			obj.find("#couponNoTemp").text(fillNull(item.couponNo)).removeAttr("id");
			obj.find("#checkCodeTemp").text(fillNull(item.checkCode)).removeAttr("id");
			unused.append(obj);
		}else if("已过期"==$.trim(item.status)){
			obj.find("#pledgeMoneyTemp").text(fillNull(item.pledgeMoney)).removeAttr("id");
			obj.find("#effectDateTemp").text(fillNull(item.effectDate)+fillNull(item.invalidDate)).removeAttr("id");
			obj.find("#viewBarCode").removeAttr("id");
			obj.find("#couponNoTemp").text(fillNull(item.couponNo)).removeAttr("id");
			obj.find("#checkCodeTemp").text(fillNull(item.checkCode)).removeAttr("id");
			expired.append(obj);
		}else if("已使用"==$.trim(item.status)){
			obj.find("#pledgeMoneyTemp").text(fillNull(item.pledgeMoney)).removeAttr("id");
			obj.find("#effectDateTemp").text(fillNull(item.effectDate)+fillNull(item.invalidDate)).removeAttr("id");
			obj.find("#viewBarCode").removeAttr("id");
			obj.find("#couponNoTemp").text(fillNull(item.couponNo)).removeAttr("id");
			obj.find("#checkCodeTemp").text(fillNull(item.checkCode)).removeAttr("id");
			use.append(obj);
		}
		
		
	
	});
	
	//统计各类券数量
	var unusedNum = $("#-unused > div").length;
	var expiredNum = $("#-expired > div").length;
	var usedNum = $("#-used > div").length;
	//将各类统计数据放回相应的span标签
	showImage(unusedNum,unused,$("#unusedNum"));
	showImage(expiredNum,expired,$("#expiredNum"));
	showImage(usedNum,use,$("#usedNum"));
	/*$("#unusedNum").html(unusedNum);
	$("#expiredNum").html(expiredNum);
	$("#usedNum").html(usedNum);*/
}
//判断是否需要显示提示图片
function showImage(num,obj,label){
	
	var noCoupons="<div class='box-tip-people'><div class='login-people  flex-c'>"+
                  "<P><img src='/css/common/img/people01.png'></P></div><p class='text-tip-people'>暂无该类型的优惠券信息哦~~"+
                  "</p><div class='flex-c'><p></p></div></div>";
	if(0==num){
		$(obj).append(noCoupons);
	}else{
		$(label).html(num);
	}
	

	
}
