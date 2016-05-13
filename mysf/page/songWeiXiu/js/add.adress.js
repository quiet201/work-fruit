$(function($){
	var selectArea = new MobileSelectArea();
	selectArea.init({});
	//提交
	$("#submit-adress").click(function(){
	  var userName = $("#userName").val(),
	      telePhone = $("#telePhone").val(),
	      zipCode = $("#zipCode").val(),
	      detailAddress = $("#detailAddress").val(),
	      provinceName = $("#provinceName").val(),
	      provinceCode = $("#provinceCode").val(),
	      cityName = $("#cityName").val(),
	      cityCode = $("#cityCode").val(),
	      countyName = $("#countyName").val(),
	      countyCode = $("#countyCode").val(),
	      data = {};
	      data['userName'] = userName;
	      data['telePhone'] = telePhone;
	      data['zipCode'] = zipCode;
	      data['detailAddress'] = detailAddress;
	      data['provinceName'] = provinceName;
	      data['provinceCode'] = provinceCode;
	      data['cityName'] = cityName;
	      data['cityCode'] = cityCode;
	      data['countyName'] = countyName;
	      data['countyCode'] = countyCode;
	
	      //提交Ajax
	      $.post("/service/songweixiu/private/address/insert", data,function(result){
	        if(result){
	          if(result["returnCode"] == 200){
	            $("#adress-content").alert({content:"请求成功"});
	          }else{
	            $("#adress-content").alert({content:result["returnMesg"]});
	          }
	        }
	      },"json");
	});
});