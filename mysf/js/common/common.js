$().ready(function () {
	$.ajaxSetup({ 
		timeout: 5000,
		type : "POST",
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",      
	    complete:function(XMLHttpRequest,textStatus){  
	        // 通过XMLHttpRequest取得响应头，sessionstatus，   
	        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");   
	        if(sessionstatus=="timeout"){  
	        	alert("未登陆或登陆超时，请登陆！");
	        	window.parent.location='/index.jsp';      
	        }   
	    },
	    error: function (xhr, status, e) { 
	    	
	    }
	});  
});


//处理selecta标签 加载数据

$().ready(function () {
	var els = $("select[load='true']");
	$.each(els,function(i,el){
//            switch (el.type){
//               case "select":
            	   loadSelect(el);
//                   break;
//               //case "radio":loadSelect(el);continue;
//            }
    });
});

function loadSelect(el){
	    var param={"configGroupCode":$(el).attr("param")};
     	var url=$(el).attr("purl");	
     	//var temp="<select id='channelType' name='channelType' onchange='selectChannelType()'</select>";
     	//var selectChannelType=$(temp);
     	var tempOption="";
		$.ajax({
			data : param,
			dataType : "json",
			url : url,
			success : function(json) {				
				if($.trim(json)!=""){					
					for(var i=0;i<json.length;i++)
					{
						var o=json[i];
						var valueConfig=$.trim(o.configCode)!=""?$.trim(o.configCode):"";
					    tempOption+="<option value ='"+valueConfig+"'>"+o.configName+"</option>";
					}					
					$(el).html(tempOption);
				}else{
					tempOption="<option value =''>无数据</option>";					
					$(el).html(tempOption);
				}
				//selectChannelType.prependTo(el);
			},
			error : function(){			  			
				tempOption="<option value =''>数据加载失败</option>";
				$(el).html(tempOption);
				//selectChannelType.prepend(tempOption);
				//selectChannelType.prependTo(el);
			}
		});
}
