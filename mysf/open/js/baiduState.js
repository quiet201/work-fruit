	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "//hm.baidu.com/hm.js?9b157a991d75746d6505ae5166d57395";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
	//统计事件总入口
	function commonEventPush(v1,v2,v3){
		_hmt.push(['_trackEvent',v1,v2,v3]);
	}
	function commonEventPush(v1,v2,v3,v4){
		//_hmt.push(['_trackEvent',v1,v2,v3,v4]);
		_hmt.push(['_trackEvent',v1,v2,v3]);
	}
	
	