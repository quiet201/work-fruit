jQuery(function(){


function autFun(){
	var mW=$(".mBan").width();
	var mBL=460/180;
	$(".mBan .slideBox .bd").css("height",mW/mBL);
	$(".mBan .slideBox .bd img").css("width",mW);
	$(".mBan .slideBox .bd img").css("height",mW/mBL);
}

function autFun2(){
	var mW2=$(".mBan2").width();
	var mBL2=460/146;
	$(".mBan2 .slideBox .bd").css("height",mW2/mBL2);
	$(".mBan2 .slideBox .bd img").css("width",mW2);
	$(".mBan2 .slideBox .bd img").css("height",mW2/mBL2);
}
setInterval(autFun,1);
setInterval(autFun2,1);

$(".mbom_ul li:last").css("border","none");

})
//屏蔽页面错误
jQuery(window).error(function(){
  return true;
});
jQuery("img").error(function(){
  $(this).hide();
});