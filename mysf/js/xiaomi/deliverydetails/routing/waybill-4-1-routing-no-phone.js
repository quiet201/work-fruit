jQuery(document).ready(
		function($) {

			var evaType = -1;
			// 初始化页面参数
			init();
			slideRoatInfo(true);
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

			// tabs函数
			function tabs(classTab, classTarget, activeClass, callback) {
				var $objTabs = $("." + classTab);
				var $objsTargets = $("." + classTarget);
				$objTabs.off('click tap').on(
						'tap click',
						function(e) {
							$objTabs.removeClass(activeClass);
							var index = $(this).addClass(activeClass).index();
							// 操作类型
							evaType = index;
							$objsTargets.css("display", "none").removeClass(
									'current');
							$objsTargets.eq(index).css("display", "block")
									.addClass("current");
							if (callback) {
								callback(this, index);
							}
						});
			}
			;

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

			tabs("tabs", "tab-item", "active", function(ele, index) {
				$(".like-brick-tabs").removeClass('disnone');
			});

			// 激活提交
			var $subBtn = $("#subBtn");
			// activeSubmit();

			// 获取用户选择的tage值
			//var tagTexts = [];
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
							}, 2000);
						}
					},
					error : function(e) {
						console.log("评论失败...");
					}
				});

			}
		});
function activeSubmit() {
	var $subBtn = $("#subBtn");
	if ($subBtn.attr("disabled")) {
		$subBtn.removeAttr("disabled");
	}
};
function init() {
	// bno=1233454555&hasRoute=false
	var urlParams = {
		bno : "",
		hasRoute : true
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
// 获取请假参数
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
			if (data.state == "Y" && data.data.length > 0) {
				// 目前只支持一条数据评价
				var obj = data.data[0];
				$("#waybill-num").text(obj.waybillno);
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
			}
			getCommonImg("10543","N","1");
		},
		error : function(e) {
			console.log("获取评论失败...");
			getCommonImg("10543","N","3");
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
				url : "/service/delivery/signed/" + obj.bno + "/true",
				success : function(data) {
					$("#waitplease").hide();
					if ($.trim(data) != "") {
						var values = $.parseJSON(data).context;
						var routes = $.parseJSON(data).routeNodes;
						var routesDetails = $.parseJSON(data).barNewList;
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

						}
						if (routes) {
							for ( var i = 1; i < 4; i++) {
								var time=(routes["time" + i]?routes["time" + i]:"？？？");
								$("#imgRouteTops" + i).text(routes["node" + i]);
								$("#imgRouteDate" + i).text(time);
							}
						}
						var routeDetails = routeListResolve(routesDetails);
						$("#routeDetailsList").prepend(routeDetails);
						//广告设置  填充下拉图片url
						if ($.trim(values.interactiveRing)!="") {
							$("#advi-img").attr("src", values.interactiveRing);
						} else {
							$("#advi-img").attr("src","../../../images/ad/../../../images/ad/xiaomi900X100.png");
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