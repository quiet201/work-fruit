$.ajaxSetup({
	complete:function(XMLHttpRequest,textStatus){      
        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); 
        if(sessionstatus=="timeout"){
        	window.location.href ="login.html";
        } 
     }
});

if(!$("#checkIsLogin").val()){
	$.ajax({url: "/service/songweixiu/private/checkIsLogin",async: false});
}

(function($){
	$.fn.alert = function(op) {   
		defaultop = {
				title:"提示",
				butClose:"我知道了"
		};
		op = $.extend(defaultop,op);
		
		var template = [];
		template.push('<div class="row mask">');
			template.push('<div class="iframe-wx">');
		    	template.push('<div class="msg-wx" style="margin-left:-135px;margin-top:-28px;">');
		    		template.push('<p class="art-msg">'+op['title']+'</p>');
		    		template.push('<p class="c-msg">'+op['content']+'</p>');
		    		template.push('<p class="c-msgr"><a data-bind="close">'+op['butClose']+'</a></p>');
		    	template.push('</div>');
		 	template.push('</div>');
		 template.push('</div>');
		 
		 
		 
		 $(this).append(template.join(""));
		 
		 $(this).find("a[data-bind='close']").click(function(){
			 $(this).parents("div.mask").remove();
		 });
	};
})(window.jQuery);