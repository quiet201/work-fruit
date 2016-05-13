$(document).ready(
		
			function() {
				//加日志
				$.post("/service/commonLog/addLog/L01003");
				$('.fancybox').fancybox();
				//跳转URL：null?empNo=000212&empName=曹火根&mobile=13414475904&imgUrl=http://skss.sf-express.com/emp/pic/000212
				var deliverName = getUrlValueByKey("empName");//收派员名字
				var deliverPhone = getUrlValueByKey("mobile");//手拍员手机
				var deliverNo = getUrlValueByKey("empNo");//收派员工号
				var deliverImg = getUrlValueByKey("imgUrl");//收派员照片
				$("#deliverName").html(fillNull(deliverName));
				$("#deliverPhone").html("电话：" + fillNull(deliverPhone));
				$("#deliverNo").html("工号：" + fillNull(deliverNo));
				//$("#deliverImg").attr("alt", deliverName);
				if ($.trim(deliverPhone) != "") {
					$("#tellPhone").attr("href",
							"tel:" + fillNull(fillNull(deliverPhone)));
					$(".ui-btn.btn-buttom-l").attr("href",
							"tel:" + fillNull(fillNull(deliverPhone)));
				} else {
					$("#phoneTips").html("没有电话号码，不能拨打哦...");
					$(".ui-btn.btn-buttom-l").addClass("disable");
				}
				
				//图片处理
				if ($.trim(deliverImg) != "") {
					$("#bigImg").attr("href", deliverImg);
					$("#deliverImg").attr("src", deliverImg);
					$("#deliverImg").click(function(){
						window.location=deliverImg;
					});
					//$("#deliverImg").attr("onclick", url);
					} else {
					$("#deliverImg").attr("src", "/css/common/img/sfman_2.jpg");
					$("#bigImg").attr("href", "#");
				}	
				$("#deliverImg").show();
				// 获取标签
				getLabelsAjax(deliverNo);
				
				getCommonImg("10581","N","1");
			}
			);
	
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
	
	// 获取标签
	function getLabelsAjax(deliverNo) {
	    // 数据请求 
		$.ajax({
			type : "POST",
			data : {
				empCode : deliverNo
			},
			dataType : "json",
			url : "/service/delivery/arrive/getEmpEvs/"+deliverNo,
			success : function(data) {
				if ($.trim(data.evaSta) == ""){
					$("#yin").hide();
				}
				else{
					$(".grid-main").show();
					var strhtml = "";
						$.each(data.evaSta,function(index,value){
							strhtml +="<i class='ui-btn btn-submitassess'>"+value.evaName+'+'+value.evaNameSum+"</i>";
						});
					$("#evaluates").html(strhtml);
				}
			},
			error : function(e) {
				console.log("获取标签失败...");
			}
		}); 
	};
	