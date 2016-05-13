$(function($){
	var r = new request(true);
    var id = r.getAttribute("id",true);
    $.get("/service/songweixiu/private/address/single", {id:id},function(result){
        if(result){
          $("#userName").val(result['userName']);
          $("#telePhone").val(result['telePhone']);
          $("#zipCode").val(result['zipCode']);
          $("#detailAddress").val(result['detailAddress']);
          
          var provinceData = {};
          provinceData["provinceName"] = result['provinceName'];
          provinceData["provinceCode"] = result['provinceCode'];
          provinceData["cityName"] = result['cityName'];
          provinceData["cityCode"] = result['cityCode'];
          provinceData["countyName"] = result['countyName'];
          provinceData["countyCode"] = result['countyCode'];
          
          var selectArea = new MobileSelectArea();
          if(r.getAttribute("proName")){
        	  selectArea.init();
          }else{
        	  selectArea.init({isload:false}).loadData(provinceData);
          }
        }
    },"json");
    
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
	
	      data['id'] = id;
	
	      //提交Ajax
	      $.post("/service/songweixiu/private/address/update/byid", data,function(result){
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