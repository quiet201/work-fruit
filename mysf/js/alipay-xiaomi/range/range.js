$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00802");
	rangeDto={"rangeName":"",//市区名
			"rangeCode":"",//市区编码
			"rcountyName":"",//地区/县名
			"rcountyCode":""//地区编码
	};
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	
	addListen();
	
	getCommonImg("108","N","1");
	
	checkNull();
}); 

function init(){
	//地址信息
	var proName = getUrlValueByKey("proName");
	var proCode = getUrlValueByKey("proCode");
	var rangeName=getUrlValueByKey("srcName");//
	var rangeCode=getUrlValueByKey("srcCode");
	var rcountyName=getUrlValueByKey("acountyName");
	var rcountyCode=getUrlValueByKey("acountyCode");
	//如果获取的是原寄地信息
	if(rangeName){
		if(rcountyName){
			$("#rangeName").html(proName+" - "+rangeName+" - "+rcountyName);
		}else{
			$("#rangeName").html(rangeName);
		}
		$("#rangeName").removeClass("text-fontStyle");
		$(".ui-btn.btn-submit").removeClass("disable");
	}else{
		$(".ui-btn.btn-submit").addClass("disable");
	}
	
	checkNull();
	rangeDto.rangeName=rangeName;
	rangeDto.rangeCode=rangeCode;
	rangeDto.rcountyName=rcountyName;
	rangeDto.rcountyCode=rcountyCode;
	//
	//初始化提示语
	$("#noteTips").hide();
};

function addListen(){
	//查询
	$(".ui-btn.btn-submit").off("click").on("click",function(){
		var validateInfo=validateQuery();
		if($.trim(validateInfo)!=""){
			
			//commontipsDialog(validateInfo);
			return;
		}
		queryFreight(rangeDto);
		
		//百度统计
		commonEventPush('寄件','页面统计','手松范围','range.html');
	});
};
//校验查件信息
function validateQuery(){
	var validateArray=[];
	var queryParam=rangeDto;
	if(queryParam){
		validateElement(queryParam.rangeCode,validateArray,"请输入查询地区");
	}else{
		validateArray.push("-1");
	}
	return validateArray;
};
function queryFreight(){
	$("#waitplease").show();
	$.post("/service/alipay/searchRange",
			rangeDto,
			function(data){
				$("#waitplease").hide();
				if(data.state=="Y"){
					$("#testPosition001").show();
					$("#waitplease").hide();
					createDom(data.result);
				}else {
					$("#waitplease").hide();
					$("#conmment-tips").show();
					setTimeout(function() {
						$("#conmment-tips").fadeOut();
						location.reload();
					}, 1000);
				}
			},"json"); 
};
/**
 * rangList
 * unrangeList
 */
function createDom(data){
	var unserviceArea="";
	var serviceArea="";
	var specialArea="";
	var sendingType=data.sendingType;
	var navigation=getUrlValueByKey("proName")+" - "+getUrlValueByKey("srcName")+
	" - "+getUrlValueByKey("acountyName");
	var temp="";
	if($.trim(sendingType)!=""){
		
		if(sendingType[0].deleverType =="1" &&  sendingType[0].deleverType =="1"){
			temp="全境提供服务";
		}else if ($.trim(sendingType[0].deleverType) =="" &&  $.trim(sendingType[0].deleverType) ==""){
			temp="不提供服务";//不服务
		}else if(sendingType[0].deleverType =="2" &&  sendingType[0].deleverType =="2"){
			temp="部分地区提供服务";
		}else {
			temp="特别收送地区";
		}
		$("#rangType").html(temp);
	}
	unserviceArea=showDom(data.unrangeList);
	serviceArea=showDom(data.rangList);
	specialArea=showDom(data.specialRangeList);
	$("#serviceArea").html(serviceArea);
	$("#specialService").html(specialArea);
	if($.trim(specialArea)==""){
		$("#specialService").hide();
		$("#specialServiceTips").hide();
	}
	if($.trim(serviceArea)==""){
		$("#serviceAreaTips").hide();
	}
	$("#unService").html(unserviceArea);
	if($.trim(unserviceArea)==""){
		$("#unService").hide();
		$("#unServiceTips").hide();
	}
	$("#navigation").html(navigation);
	$(".grid-main").show();
}; 
function showDom(data){
	var temp="";
	if($.trim(data)!=""){
		$.each(data,function(i,value){
			if($.trim(value.countyName)!=""){
				temp=temp+"、"+value.countyName;
			}
		});
		if(temp[0]=="、"){
			temp=temp.substring(1, temp.length);
		}
	}
	return temp;
};


function checkNull(){
	//判断是否已选择地址
	if($('#rangeName').text()=='选择地区'){
		$('#btnQuery').addClass('disable');
		$('#btnQuery').removeClass('btn-submit');
		//$('#btnQuery').attr('onclick','');
	}else{
		$('#btnQuery').addClass('btn-submit');
		$('#btnQuery').removeClass('disable');
	}
}