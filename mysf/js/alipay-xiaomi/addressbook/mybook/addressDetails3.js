$(document).ready(function (){
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
});
function init(){
	var asbkId = getUrlValueByKey("sentAsbkId");
	
	queryOneAjax(asbkId);
	
};

function queryOneAjax(asbkId) {
	$("#waitplease1").show();
	// 数据提交
	$.ajax({
		type : "POST",
		data : {asbkId:asbkId},
		dataType : "json",
		url : "/service/sendaddress/sendbook/findonebook/"+asbkId,
		success : function(data) {
			$("#waitplease1").hide();
			if (data) {
				$("#userName").val(data.userName);
				$("#telePhone").val(data.telePhoneNuber);
				$("#asbkId").val(data.asbkId);
				$("#detailAdress").val(data.detailAdress);
				if($.trim(data.areaName)!=""){
					
					$("#destination").html(data.areaName).removeClass("placeholder");
				}
				if(!$("#provinceName").val()){
					$("#provinceName").val(data.provinceName);
					$("#provinceCode").val(data.provinceCode);
					$("#cityName").val(data.cityName);
					$("#cityCode").val(data.cityCode);
					$("#countyName").val(data.countyName);
					$("#countyCode").val(data.countyCode);
				}
				/*JSON.stringify(queryParam);
				$.parseJSON(queryParam);*/
				getCommonImg("1028","N","1");
			}else{
				commontipsDialog("查询失败");
				getCommonImg("1028","N","2");
			}
		},
		error : function(e) {
			$("#waitplease1").hide();
			console.log("查询失败...");
			getCommonImg("1028","N","3");
		}
	});

}
function checkAddressLength(text,content,lengths){
	
	 var add = text;
		
		var length = 0;
		for (var i=0;i<add.length;i++){
			
			var str = add.charAt(i);
			
			//判断是字符长度为1
			
			if(/\s/.test(str)){
				length+=0;
			}else{
				length+=3;
			}
			/*if(/^[a-zA-Z]*$/.test(str))
			{
			    //alert("“" + str + "”里全是字母！");
			    length++;
			}else if(/^[0-9]*$/.test(str)){
				//判断是数字字符为1
				 length++;
			}*/
			/*else if(/^[\u4e00-\u9fa5]*$/.test(str))
			{
			    //判断是汉字字符为3
			    length+=3;
			}else{
				length++;
			}*/
			
		} 
		if(length>lengths){
			//$("#waitplease").hide();
			alertError(content);
			return false;
		}else{
			return true;
		}
}

