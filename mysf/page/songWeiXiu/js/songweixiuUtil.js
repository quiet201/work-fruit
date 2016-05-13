//checkbox点击实现函数
function makeSureClick(_this, isSingle, id, valueOrFun){
	var makeSure = $(_this).attr('class');
	if(isSingle==true){
		if('check-active' == makeSure){
			//如果是单选，则必须选一个，所以当前选中框的状态不变，还是选中状态。
			return;
		}
		var objName = $(_this).attr("name");
		$("[name='"+ objName+"']").attr('class','check-a');
	}
	if('check-a'==makeSure){
		$(_this).attr('class','check-active');
		if(id){
			//支持input标签赋值
			var value = "";
			if(typeof(valueOrFun) == "function"){
				value = valueOrFun(_this);
			}else{
				value = valueOrFun;
			}
			$("#"+id).val(value);
		}
		
	}else{
		$(_this).attr('class','check-a');
		//支持input标签赋值
		if(id){
			$("#"+id).val(null);
		}
	}
	
	
}