(function(root,factory){
	root.MobileSelectArea = factory(window.jQuery || $);
})(this,function($){
	var MobileSelectArea = function() {
		this.isload=true;
		this.toSelectId="#chooseAddress";
		this.provinceTextId="#provinceText";
		this.provinceNameId="#provinceName";
		this.provinceCodeId="#provinceCode";
		this.cityNameId="#cityName";
		this.cityCodeId="#cityCode";
		this.countyNameId="#countyName";
		this.countyCodeId="#countyCode";
		this.url = "/page/common/address/province.html?addrName=destName&addrCode=destCode&addrCountyName=dcountyName&addrCountyCode=dcountyCode&type=3&gatChild=-1";
	};
	
	var load = function(_this){
		var r = new request(true);
		var provinceName = r.getAttribute("proName");//省份名称
		var provinceCode = r.getAttribute("proCode");//省份编码
		var cityName = r.getAttribute("destName");//城市名称
		var cityCode = r.getAttribute("destCode");//城市编码
		var countyName = r.getAttribute("dcountyName");//区县名称
		var countyCode = r.getAttribute("dcountyCode");//区县编码
		
		var provinceData = {};
        provinceData["provinceName"] = provinceName;
        provinceData["provinceCode"] = provinceCode;
        provinceData["cityName"] = cityName;
        provinceData["cityCode"] = cityCode;
        provinceData["countyName"] = countyName;
        provinceData["countyCode"] = countyCode;
        _this.loadData(provinceData);
	};
	
	var bindEvent = function(_this){
		$(_this.toSelectId).click(function(){
			forward(_this);
		});
	};
	
	var forward = function(_this,url){
		url = url||_this.url;
		var callbackUrl=location.href;
		if(location.href.indexOf("?")!=-1){
			callbackUrl=location.href.substring(0,location.href.indexOf("?"));
		}
		location.href=url+"&forward="+unescape(callbackUrl);
	};
	
	MobileSelectArea.prototype = {
		init: function(settings) {
			MobileSelectArea = $.extend(this, settings);
			this.isload&&load(this);
			bindEvent(this);
			return this;
		},
		loadData:function(data){
			var provinceName = data.provinceName||"";
			$(this.provinceNameId).val(provinceName);
		    $(this.provinceCodeId).val(data.provinceCode||"");
		    var cityName = data.cityName||"";
		    $(this.cityNameId).val(cityName);
		    $(this.cityCodeId).val(data.cityCode||"");
		    var countyName = data.countyName||"";
		    $(this.countyNameId).val(countyName);
		    $(this.countyCodeId).val(data.countyCode||"");
		    var temp = [];
		    provinceName&&temp.push(provinceName);
		    cityName&&temp.push(cityName);
		    countyName&&temp.push(countyName);
		    $(this.provinceTextId).html(temp.join("/"));
		    return this;
		}
	}
	return MobileSelectArea;
});