var empNo;
jQuery(document).ready(function($) {
	//加日志
	$.post("/service/commonLog/addLog/L00203");
	//加载公共资源
	getDescPage("commonPage","/page/common/tips/tips.html","init");
	
	$('#text-comments').hide();
	$('#yingxiang').hide();
});
function init(){
	var type=getUrlValueByKey("type");
	var data=getUrlValueByKey("json");
	var obj =$.parseJSON(decodeURI(data));
	getEvaluationAjax(obj.waybillno);
	if($.trim(type)==""){
		type="1";//类型
	}
	// 目前只支持一条数据评价
	//var obj = data.data[0];
	$("#waybill-num").text(obj.waybillno);
	//签收时间
	if($.trim(obj.signTime)!=""){
		$("#signTime").text(obj.signTime.replace("+"," "));
	}
	//设置小哥头像
	var imgUrl="/css/common/img/sfman_2.jpg";
	var empName="";
	if(obj.employ  && obj.employ.photoUrl){
		imgUrl = obj.employ.photoUrl ? obj.employ.photoUrl
				: "/css/common/img/sfman_2.jpg";
		empName=obj.employ.empName;
		empNo = obj.employ.empCode;
	}
	$("#photoUrl").attr("src", imgUrl);
	if(!variable1ObjectIsNull(empName)){
		empName='顺丰小哥';
	}
	$("#empName").text(empName);
	$("#empNo").text(empNo);
};

//获取评价参数
function getEvaluationAjax(waybillno) {
	$("#waitplease1").show();
	// 数据提交
	$.ajax({
		type : "POST",
		data : {
			waybillNo : waybillno,
			evalType:'2',//评价类型 1  收件 2 派件
			channel:'1'
		},
		dataType : "json",
		url : "/service/deliveryDetails/queryEvaluationService",
		success : function(data) {
			$("#waitplease1").hide();
			// 如果是有数据，并且是再次访问
			if (data.state == "Y") {
				$("#evaluateLabels").append(data.lables);
				//如果是对该运单已经评价过了
				if( data.data.length > 0){
					//替换广告位图片
					$('#ad').attr('src','/image/common/ad02.png');
					//活动参与
					$("#LotteryPage").show();
					whetherDoLuckDraw(waybillno,4);
					/*$("#evaluated").show();*/
					// 目前只支持一条数据评价
					$("#testPosition001").show();
					var obj = data.data[0];
					$("#waybill-num").html(obj.waybillno);
					///隐藏换一批按钮
					$("#tagsSwitch").hide();	
					var num = 0;
					if (obj.serviceEvaluation) {
						num = parseInt(obj.serviceEvaluation);
						var $stars = $('#evaluateScore i');
						setStarNum(num, $stars);
					}
					
					// 评价标签展示
					if (obj.labels) {
						var labels = obj.labels.split(",");
						var innerValue="";
						//因为结果集没有遍历完动态数据，无法区分哪些标签是需要保留的，先给选中标签激活
						for(var i=0;i<labels.length;i++){
							/*innerValue=innerValue+"<i class='ui-btn btn-submitassess'>"+labels[i]+"</i>";*/
							innerValue=innerValue+"<i class='current'>"+labels[i]+"</i>";
						}
						//$("#evaluateLabels").empty().append("<div class='clearfix'>"+innerValue+"</div>");
						$("#evaluateLabels").html("<div class='clearfix'>"+innerValue+"</div>");
					}
					
					if($.trim(obj.talk)!=""){
						var div = "<div class='msg-div clearfix'>"+
              	                  "<div class='msg-box-h'>"+
                    		      "<p id='evaluatedtext'>"+fillNull(obj.talk)+"</p>"+
                    		      "<span class='msg-lt-h'></span></div></div>";

						//$("#text-comments").val(fillNull(obj.talk)).attr("readonly","true");
						$("#text-commentsDiv").hide();
						$("#evaluateLabels").append(div);
						//$("#evaluatedtext").html(fillNull(obj.talk));
						$("#evaluatedRecord").show();
						
					}else{
						$("#text-comments").hide();
						$('#text-commentsDiv').hide();
					}
					
					$("#evaluateLabels").show();
					$("#noEvaluate").show();
					// 隐藏按钮防止再次提交
					buttonHide();
				}else{
					$("#noEvaluate").show();
					setListen();//因为有动态数据读取，添加事件需要获取到数据后再添加监听
					$("#evaluateLabels").show();
				};
			}
			getCommonImg("10544","N","1");
		},
		error : function(e) {
			getCommonImg("10544","N","2");
			$("#waitplease1").hide();
			console.log("获取评论失败...");
		}
	});
};

function buttonHide() {
	var $subBtn = $("#subBtn");
	var $stars = $('#evaluateScore');
	$stars.off("click");
	$("#evaluateLabels li").off("click");
	/*$("#text-comments").removeAttr("placeholder");*///hide();
	$subBtn.hide();
}
function setListen(){
	var evaType = -1;
	// 初始化页面参数
	var billno = $("#waybill-num").text();
	// 服务评价
	var $stars = $('.ui-ico.ico-star02');
	var starNum = 0;
	$stars.off("click").on("click", function(e) {
		e.preventDefault();
		// this.clicked = true;
		var index = $(this).index();
		starNum = index + 1;
		$stars.removeClass("able");
		for ( var i = 0; i <= index; i++) {
			$stars.eq(i).addClass("able");
		}
		
		$('#text-comments').val("");
		$('#text-comments').show();
		$('#yingxiang').show();
		 if(index<3){
        	 $("#Impression01").show();
        	 var item = $('#Impression02 .current');
        	 removeHiddenStarClass(item);
            $("#Impression02").hide();     
        }else{
        	 $("#Impression02").show();
        	 var item = $('#Impression01 .current');
        	 removeHiddenStarClass(item);
            $("#Impression01").hide();  
        }
		 addButtonListem();
	});
	setStarNum(starNum, $stars);

	// 标签组切换
	$("#evaluates div").addClass("unactive");
	/*tag-box active*/
	var $tagsSwitch = $('#tagsSwitch');
	$('#evaluates div').first().attr("class","tag-box active");
	$tagsSwitch.off("click").on(
			"click",
			function(e) {
				var $tagBox = $(".tag-box");
				e.preventDefault();
				var currentNum=0;
				$.each($tagBox,function(index,value){
					if($(value).attr("class")=="tag-box active"){
						currentNum=index;
					}
				});
				this.clickNum=currentNum;
				$tagBox.removeClass("active").eq(this.clickNum).addClass("unactive");
				if (this.clickNum == undefined) {
					this.clickNum = 1;
				} else {
					this.clickNum++;
					if (this.clickNum > 2) {
						this.clickNum = 0;
					}
				}
				$tagBox.removeClass("active").eq(this.clickNum).removeClass("unactive")
						.addClass("active");
				addButtonListem();
			});

	// tag选择
	
	var $tag = $('.ui-btn.btn-submitapprisal');
	$tag.off("click").on("click", function(e) {
		var $this = $(this);
		if (this.flag) {
			//addClass("selected");
			$this.attr("class","ui-btn btn-submitassess");
			this.flag = false;
		} else {
			//$this.attr("class","ui-btn btn-submitapprisal");
			$this.attr("class","current");
			//$this.removeClass("selected");
			this.flag = true;
		}
		addButtonListem();
	});

	// 激活提交
	var $subBtn = $("#subBtn");
	// activeSubmit();

	// 获取用户选择的tage值
	// var tagTexts = [];
	var tagString = "";
	var inputText = "";

	$subBtn.off("click").on(
			"click",
			function(e) {
				if ($stars.filter(".ui-ico.ico-star02.able").length == 0) {
					alertErrors("请对服务评价打分");
					return false;
				} else {

					// 获取用户选择的tage值
					console.log($tag.parent());
					  $tag.parent().children().filter(".current").each(
							function(index, el) {
								tagString += $(el).text();
								tagString += ",";
							});
					tagString = tagString.substring(0,
							tagString.length - 1);
					/*if("" == tagString || null ==  tagString){
						alertErrors("请选择服务评价");
						return false;
					}*/

					// 获取用户输入值
					inputText = $.trim($("#text-comments").val());
					if(inputText && inputText.length>123){
						alertErrors("输入字符过长,请重新输入。");
						return;
					}
					submitAjax();
					$('#subBtn').attr('class','btn-submit-no');
					$('#subBt').attr('onclick','');
				}
	});
	function submitAjax() {
		//根据签收时间判断是否可以进行评价操作
		var nowDate = getNowFormatDate();
		var signTime = $('#signTime').html();
		var days = getDateDiff(signTime,nowDate);
		//判断结果不为null且小于30的 可以进行评价操作
		if(null!=days&&days<30){
		//获取系统类型
		var sysName = getsystemName();
		$("#waitplease").show();
		// 获取评价类型
		var serviceEvaluationDTO = {
			//userId : userId,
			waybillno : billno,
			evaluationType : evaType,
			serviceEvaluation : starNum,
			labels : tagString,
			talk : inputText,
			empId:empNo,
			channel:'1',
			evalType:'2',
			platformType:sysName
		};
		// 数据提交
		$.ajax({
			type : "POST",
			data : serviceEvaluationDTO,
			dataType : "json",
			url : "/service/deliveryDetails/saveEvaluationService",
			success : function(data) {
				$("#waitplease").hide();
				console.log(data);
				console.log(tagString);
				console.log(starNum);
				console.log(inputText);
				if ($.trim(data.state)=="Y") {
					// 提交后，对按钮，事件屏蔽处理
					buttonHide();
					//$("#conmment-tips").show();
					setTimeout(function() {
						$("#conmment-tips").fadeOut();
						location.reload();
					}, 1000);
				}else{
					$("#conmment-tips2").show();
					setTimeout(function() {
						$("#conmment-tips2").fadeOut();
						location.reload();
					}, 1000);
					
				}
			},
			error : function(e) {
				$("#waitplease").hide();
				console.log("评论失败...");
			}
		});

	}else{
		
		alertErrors("签收时间超过30天的运单不可以评价~");
		}
	}
};

/*function activeSubmit() {
	var $subBtn = $("#subBtn");
	if ($subBtn.attr("btn-cancel")) {
		$subBtn.removeAttr("btn-submit");
	};
};*/
function setStarNum(num, $stars) {
	$stars.removeClass("able");
	for ( var i = 0; i < num; i++) {
		$stars.eq(i).addClass("able");
	};
};

