//加载公共资源
function getDescPage(id,href,callback){
	if($.trim(href)==""){
		return;
	}
	$("#"+id).load(href,function(){
		$("#"+id).attr("onclick",callback+"()");
		$("#"+id).click();
		$("#"+id).removeAttr("onclick");
	});
};
/*function subscreptionBno(bno){
	$("#subscreptionButton").unbind().bind("click",function(){
		var page=location.href;
		location.href="/page/common/subscription/subscribeMsg.html?bno="+bno+"&page="+page;
	});
};*/

var preLength = 0;
function phoneChange(){
	var phone = $('#telePhone').val();
	var curLenth = 0;
	curLenth = phone.length;
	if(curLenth>preLength){
		
		var context = $('#telePhone').val();
		var text1 = context.substr(0,context.length-1);
		var text2 = context.substr(context.length-1,context.length);
		if(/^(010|02\d|0[3-9]\d{2})$/.test(text1)){
			$('#telePhone').val(text1+'-'+text2);
		}
		
		if(/^(010|02\d|0[3-9]\d{2})$/.test(phone)){
			$('#telePhone').val(phone+'-');
		}
		
		if(!phone.match(/(010-|02\d-|0[3-9]\d{2}-)/)){
			 var array = matchSpecial(phone);
				if(array && array.length>0){
					array.forEach(function(e){
						phone = phone.replace(e,'');
					})
					$('#telePhone').val(phone)
					
				}
		}else{
			var array = matchSpecial(phone);
			if(array && array.length>0){
				array.forEach(function(e){
					if(e!='-'){
						phone = phone.replace(e,'');
					}
					
				})
				$('#telePhone').val(phone)
				
			}
		}
		//使光标放置在文本最后
		var temp = $('#telePhone').val();
		 $('#telePhone').val("");
		 $('#telePhone').val(temp);
		 
		
	}
	preLength = $('#telePhone').val().length;
}

/**
 * 判断是否有特殊字符
 * @param s
 * @returns true 代表有 false 代表无
 */
function matchSpecial( str )      
{      
   var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\s)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\,)(\')(\")(\.)(\/)(\<)(\>)(\?)(\【)(\】)(\（)(\）)]/gi);      
   return ( str.match(containSpecial) );      
}