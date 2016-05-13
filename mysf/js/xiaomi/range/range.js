$(document).ready(function(){
	//加日志
	$.post("/service/commonLog/addLog/L00802");
	rangeDto={"rangeName":"",//市区名
			  "rangeCode":"",//市区编码
			 "rcountyName":"",//地区/县名
			 "rcountyCode":""//地区编码
			};
	init();
	addListen();
	getCommonImg("108","N","1");
});

function init(){
	//地址信息
	var rangeName=getUrlValueByKey("srcName");//
	var rangeCode=getUrlValueByKey("srcCode");
	var rcountyName=getUrlValueByKey("acountyName");
	var rcountyCode=getUrlValueByKey("acountyCode");
	//如果获取的是原寄地信息
	if(rangeName){
		if(rcountyName){
			$("#rangeName").html(rangeName+" - "+rcountyName);
		}else{
			$("#rangeName").html(rangeName);
		}
		$("#rangeName").removeClass("placeholder");
		$(".ui-btn.btn-submit").removeClass("disable");
	}else{
		$(".ui-btn.btn-submit").addClass("disable");
	}
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
		var validateInfo=validateQueryFreight();
		if($.trim(validateInfo)!=""){
			$("#noteTips").text(validateInfo[0]).show();
			return;
		}
		queryFreight(rangeDto);
		
		//百度统计
		commonEventPush('寄件','页面统计','手松范围','range.html');
	});
};
//校验查件信息
function validateQueryFreight(){
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
				if(data.state=="Y"){
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
	/*if($.trim(specialArea)=="" && $.trim(serviceArea)==""){
		$("#serviceAreaDetails").hide();
	}*/
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
	$("#navigation").html(navigation);
	$("#queryResult").show();
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