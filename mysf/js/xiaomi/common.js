window.onload = function(){
    FastClick.attach(document.body);
    //头部slider
    var $hSlider = $('#header-slider');
    var $swSlider  = $('#slider-switcher');

    $swSlider.on("click",function(e){
        e.stopPropagation();
        if( ! $swSlider.flag ){
            $swSlider.flag = true;
            $hSlider.addClass("open");
            hSwipe.setup();
        }else{
            $swSlider.flag = false;
            $hSlider.removeClass("open");
        }
    });
    $("#main-container").on("click",function(e){
        $swSlider.flag = false;
        $hSlider.removeClass("open");
    });

    var bullets ="";
    if(document.getElementById('bullets')){
    	bullets=document.getElementById('bullets').children;
    }
    var hSwipe = Swipe($hSlider[0], {
      startSlide: 0,
      speed: 100,
      continuous: true,
      callback: function(index, element) {
        console.log( index );
        var i = bullets.length;
        while( i--){
            bullets[i].className = " ";
        }
        bullets[index].className = "on";
      }
      // auto: 3000,
      // disableScroll: true,
      // stopPropagation: true,
      // transitionEnd: function(index, element) {}
    });
    
};

//如果对象为空（null），都已""字符替换，
function convertNull(obj){
	return obj?$.trim(obj):"";
};

//获取URL地址栏参数
//获取地址栏参数
function getUrlParamByKey(key){
	   var url=window.location.search;
	   var value="";
	   if(url.indexOf("?")!=-1){
	      	var str =   url.substr(1);
	     	 strs = str.split("&");
	   		for(var i=0;i<strs.length;i++){
	     		if([strs[i].split("=")[0]]==key){
	     			value=unescape(strs[i].split("=")[1]);
	     		} 
	     	}
	   }
	   return value;
}

//监听输入框输入，更改样式
function changeInputCss(id,hideId,num){
	//输入框的值
	var inputText=$("#"+id).val();
	if($.trim(inputText)==""){
		return;
	}
	var temp="";
	var splitSize=3;
	var count=1;
	if($.trim(inputText)!=""){
		for(var i=0;i<inputText.length;i++){
			if($.trim(inputText[i])==""){
				continue;
			}
			if(count%splitSize==0){
				temp=temp+inputText[i]+" ";
				count=1;
				continue;
			}
			temp=temp+inputText[i];
			count++;
		}
	}
	//复制粘贴情况，截取超长部分
	if(temp.length>num){
		temp=temp.substring(0,15);
	}
	$("#"+id).val($.trim(temp));
	$("#"+hideId).val($.trim(temp).replace(/ /g,''));
	$("#"+id).focus();
}
