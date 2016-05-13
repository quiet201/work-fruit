// JavaScript Document
var place = {
	"fromprovince":"",
	"fromcity":"",
	"fromcounty":"",
	"toprovince":"",
	"tocity":"",
	"tocounty":"",
	"infotype":""
}

function placeSelector(wrapper, flag){
	wrapper.find("span[label]").click(function(){
		wrapper.find("span[label]").removeClass("on");
//		$(this).addClass("on");
		getAreaList($(this).attr("label"), wrapper, flag);
	});
	wrapper.children("placelist").hide(); 
}

function getAreaList(area, wrapper, flag){
	var placelist = wrapper.children(".placelist");
	placelist.html("");
	
	if(placelist.html() != ""){
		return false;
	}
	
	if(area == "province"){
		getProvinces(placelist, wrapper, flag);
	}else if(area == "city"){
		var province = wrapper.find("span[label=province]").text();
		getCities(province, placelist, wrapper, flag);		
	}else if(area == "county"){
		var province = wrapper.find("span[label=province]").text();
		var city = wrapper.find("*[label=city]").text();
		getCounties(province, city, placelist, wrapper, flag);
	}
}

function getProvinces(placelist, wrapper, flag){
	$.each(address.province, function(i) {
		placelist.append("<span>"+this.name+"</span>");
	});	
	
	placelist.children("span").click(function(){
		var province = $(this).text();
		wrapper.find("span[label=province]").text(province);
		eval('place.'+flag+'province = "' + province + '"');
		eval('place.'+flag+'city = ""');
		eval('place.'+flag+'county = ""');
		$("input[name="+flag+"province]").val(province);
		$("input[name="+flag+"city]").val("");
		$("input[name="+flag+"county]").val("");
	    placelist.hide();
		
		wrapper.find("span[label=city]").text("城市");
		wrapper.find("span[label=county]").text("区县");
	});
	placelist.show(); 
}

function getCities(province, placelist, wrapper, flag){
	if(province == "省份"){
		alert("请先选择省份");
		return false;
	}
	var provinceIndex = 0;
	$.each(address.province, function(i){
		if(this.name == province){
			provinceIndex = i;
		}
	})
	$.each(address.province[provinceIndex].city, function(i) {
		placelist.append("<span>"+this.name+"</span>");
	});	
	
	placelist.children("span").click(function(){
		var city = $(this).text();
		wrapper.find("span[label=city]").text(city);
		eval('place.'+flag+'city = "' + city + '"');
		eval('place.'+flag+'county = ""');
		$("input[name="+flag+"city]").val(city);
		$("input[name="+flag+"county]").val("");
	    placelist.hide();
		
		wrapper.find("span[label=county]").text("区县");
	});
	placelist.show(); 
}
function getCounties(province, city, placelist, wrapper, flag){
	if(city == "城市"){
		alert("请先选择地市");
		return false;
	}
	var provinceIndex = 0;
	var cityIndex = 0;
	
	$.each(address.province, function(i){
		if(this.name == province){
			provinceIndex = i;
		}
	})
	$.each(address.province[provinceIndex].city, function(i){
		if(this.name == city){
			cityIndex = i;
		}
	})
	
	$.each(address.province[provinceIndex].city[cityIndex].county, function(i) {
		placelist.append("<span>"+this.name+"</span>");
	});		
	placelist.children("span").click(function(){
		var county = $(this).text();
		wrapper.find("span[label=county]").text(county);
		eval('place.'+flag+'county = "' + county + '"');
		$("input[name="+flag+"county]").val(county);
	    placelist.hide();
	});
	placelist.show(); 	
}