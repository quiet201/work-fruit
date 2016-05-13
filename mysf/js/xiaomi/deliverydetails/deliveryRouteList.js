$(document).ready(function(){
	//初始化页面项
	init();
	//添加监听
	listenEvent();
});

function init(){
	getBillsByUser();
};

function listenEvent(){
	
};
//获取用户用户订单历史列表
function getBillsByUser(){
	var data=[{billNo:"1"},{billNo:"2"},{billNo:"3"},{billNo:"4"}];
	var displayInfo=showBillList(data);
	$("#searchResultList").prepend(displayInfo);
};
//列表组装展示
function showBillList(data){
	//如果
	var showList="";
	if(data && data.length>0){
		$.each(data,function(index,param){
			if($.trim(showList)==""){
				showList="<li><a href='#'>"+param.billNo+"<span class='icons icons-SVG-13'></span><span class='icons icons-SVG-14'></span></a></li>";
			}else{
				showList=showList+"<li><a href='#'>"+param.billNo+"<span class='icons icons-SVG-13'></span><span class='icons icons-SVG-14'></span></a></li>";
			}
		});
	}
	return showList;

};
