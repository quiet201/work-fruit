jQuery(document).ready(
		function($) {

			// 初始化页面参数
			init();
			
		});
function activeSubmit() {
	var $subBtn = $("#subBtn");
	if ($subBtn.attr("disabled")) {
		$subBtn.removeAttr("disabled");
	}
};
function setListen(){
	var evaType = -1;
	var billno = $("#waybill-num").text();
	// 服务评价
	var $stars = $('.stars-wrapper i');
	var starNum = 0;
	$stars.off("click").on("click", function(e) {
		e.preventDefault();
		// this.clicked = true;
		var index = $(this).index();
		starNum = index + 1;
		$stars.removeClass("star-s");
		for ( var i = 0; i <= index; i++) {
			$stars.eq(i).addClass("star-s");
		}
		activeSubmit();
	});
	setStarNum(starNum, $stars);

	// 标签组切换
	var $tagsSwitch = $('#tagsSwitch');
	$tagsSwitch.off("click").on(
			"click",
			function(e) {
				var $tagBox = $(".tag-box");
				e.preventDefault();
				if (this.clickNum == undefined) {
					this.clickNum = 1;
				} else {
					this.clickNum++;
					if (this.clickNum > 2) {
						this.clickNum = 0;
					}
				}
				$tagBox.removeClass("active").eq(this.clickNum)
						.addClass("active");
			});

	// tag选择
	var $tag = $('.tag');
	$tag.off("click").on("click", function(e) {
		var $this = $(this);
		if (!this.flag) {
			$this.addClass("selected");
			this.flag = true;
		} else {
			$this.removeClass("selected");
			this.flag = false;
		}
	});

	// 激活提交
	var $subBtn = $("#subBtn");
	// activeSubmit();

	// 获取用户选择的tage值
	var tagString = "";
	var inputText = "";

	$subBtn.off("click").on(
			"click",
			function(e) {
				if ($stars.filter(".star-s").length == 0) {
					alert("请对服务评价打分");
					return false;
				} else {

					// 获取用户选择的tage值
					console.log($tag.parent());
					$tag.parent().children().filter(".selected").each(
							function(index, el) {
								tagString += $(el).text();
								tagString += ",";
							});
					tagString = tagString.substring(0,
							tagString.length - 1);

					// 获取用户输入值
					inputText = $.trim($("#text-comments").val());
					if(inputText && inputText.length>123){
						alert("输入字符过长,请重新输入。");
						return;
					}
					submitAjax();
				}
			});

	function submitAjax() {
		// 获取评价类型
		var serviceEvaluationDTO = {
			waybillno : billno,
			evaluationType : evaType,
			serviceEvaluation : starNum,
			labels : tagString,
			talk : inputText

		};
		// 数据提交
		$.ajax({
			type : "POST",
			data : serviceEvaluationDTO,
			dataType : "json",
			url : "/service/deliveryDetails/saveEvaluationService",
			success : function(data) {
				console.log(data);
				console.log(tagString);
				console.log(starNum);
				console.log(inputText);
				if (data) {
					// 提交后，对按钮，事件屏蔽处理
					buttonHide();
					$("#conmment-tips").show();
					setTimeout(function() {
						$("#conmment-tips").fadeOut();
						location.reload();
					}, 2000);
				}
			},
			error : function(e) {
				console.log("评论失败...");
			}
		});

	}
}
function init() {
	// bno=1233454555&hasRoute=false
	var urlParams = {
		bno : "",
		hasRoute : false
	};
	getUrlParams(urlParams);
	var billNo = $.trim(urlParams.bno);
	$("#waybill-num").text(billNo);
	getEvaluationAjax(billNo);
	// urlParams.bno="134545590677";
	getDeliverySignAjax(urlParams);
};
function buttonHide() {
	var $subBtn = $("#subBtn");
	var $stars = $('.stars-wrapper i');
	$stars.off("click");
	$(".tabs").off("click");
	$("#text-comments").hide();
	$subBtn.hide();
}
// 获取请求参数
function getEvaluationAjax(waybillno) {
	// 数据提交
	$.ajax({
		type : "POST",
		data : {
			waybillNo : waybillno
		},
		dataType : "json",
		url : "/service/deliveryDetails/queryEvaluationService",
		success : function(data) {
			// 如果是有数据，并且是再次访问
			if (data.state == "Y") {
				$("#evaluates").append(data.lables);
				if(data.data.length > 0){
					// 目前只支持一条数据评价
					var obj = data.data[0];
					$("#waybill-num").text(obj.waybillno);
					// 获取用户输入值
					$("#text-comments").hide();
					$(".comment-text span").first().text(obj.talk).show();
					$(".comment-text").show();
					var num = 0;
					if (obj.serviceEvaluation) {
						num = parseInt(obj.serviceEvaluation);
						var $stars = $('.stars-wrapper i');
						setStarNum(num, $stars);
					}
					// 评价标签展示
					if (obj.labels) {
						$(".tag-box:hidden").addClass("active");
						var labels = obj.labels.split(",");
						var innerValue="<div class='tag-box active'>";
						//因为结果集没有遍历完动态数据，无法区分哪些标签是需要保留的，先给选中标签激活
						for(var i=0;i<labels.length;i++){
							innerValue=innerValue+"<span class='tag selected'>"+labels[i]+"</span>";
						}
						innerValue=innerValue+"</div>";
						$("#evaluates").empty().append(innerValue);
					}
					// 填充下拉图片url
					if (false) {
						// if(obj.interactiveRing){
						$("#advi-img").attr("src", obj.interactiveRing);
					} else {
						$("#advi-img").attr("src",
						"../../../images/ad/../../../images/ad/xiaomi900X100.png");
						
					}
					// 隐藏按钮防止再次提交
					buttonHide();
				}else{
					setListen();
				}
			}
			getCommonImg("10542","N","1");
		},
		error : function(e) {
			console.log("获取评论失败...");
			getCommonImg("10542","N","3");
		}
	});

};
// 获取地址栏参数
function getUrlParams(urlParams) {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if ([ strs[i].split("=")[0] ] == "bno") {
				urlParams.bno = unescape(strs[i].split("=")[1]);
			}
			if ([ strs[i].split("=")[0] ] == "hasRoute") {
				urlParams.hasRoute = unescape(strs[i].split("=")[1]);
			}
		}
	}
}
// 签收查询
function getDeliverySignAjax(obj) {
	$("#waitplease").show();
	// 数据提交
	$
			.ajax({
				type : "POST",
				data : {
					waybillNo : obj.bno
				},
				dataType : "json",
				url : "/service/delivery/signed/" + obj.bno + "/"
						+ obj.hasRoute,
				success : function(data) {
					$("#waitplease").hide();
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						var IsBind=$.parseJSON(data).IsBind;
						if (values) {
							$("#startAdd").text(
									convertNull(values.fromCityName));
							$("#endAdd").text(convertNull(values.toCityName));
							var businesstype=convertNull(values.businesstype);
							
							// 运输方式图片处理
							// 空运
							//if (businesstype == '2'){
							if (false){
								$(".icons-process img").attr("src",
								"../../../images/xiaomi/icons-process-plane.png");
							}else{
								$(".icons-process img").attr("src",
								"../../../images/xiaomi/icons-process-car.png");
							}
							// 签收人
							$("#signPerson").html(convertNull(values.status));
							// 签收时间处理
							$(".expected-process strong").text(
									convertNull(values.signTime));
							$("#signTime").text(convertNull(values.signTime));
							//广告设置  填充下拉图片url
							if ($.trim(values.interactiveRing)!="") {
								$("#advi-img").attr("src", values.interactiveRing);
							} else {
								$("#advi-img").attr("src","../../../images/ad/../../../images/ad/xiaomi900X100.png");
							}
							if($.trim(IsBind)!=""){
								//1：绑定手机号   0没有绑定手机号
								if(IsBind==1){
									$(".user-comments").show();
									$(".nobind-phone").hide();
								}else{
									//$("user-comments").hide();
									$(".user-comments").hide();
	                                $(".nobind-phone").show();
									
								}
							}
						}
					}
				},
				error : function(e) {
					$("#waitplease").hide();
					console.log("服务器连接失败...");
				}
			});

};
function setStarNum(num, $stars) {
	$stars.removeClass("star-s").addClass("star-g");
	for ( var i = 0; i < num; i++) {
		$stars.eq(i).addClass("star-s");
	}
};