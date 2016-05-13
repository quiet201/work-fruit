// JavaScript Document


function center(){
	var box_tips = document.getElementsByClassName('box-tip');
	if(box_tips!=null && box_tips.length>0){
		for(var i=0;i < box_tips.length;i++){
			box_tips[i].style.top = (document.documentElement.clientHeight - box_tips[i].offsetHeight)/2+"px";
		}
	}
}

