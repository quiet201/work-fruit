var url;
$(document).ready(function (){
	//加日志
	$.post("/service/commonLog/addLog/L00701");
	//加载公共资源,并执行初始化方法
	getDescPage("commonPage","/page/common/tips/tips.html",'init');
	
	
	
});
//加载公共资源
function init(){
	queryAjax();
	//获取地址栏参数 
	url=getUrlValueByKey("urlStr");
	
	//改变地址栏参数
	if(url!=null&&url!="" && typeof(url)!='object'){
		  setCookie('urlStr',url);
		}else{
		  url = getCookie('urlStr');	
		 //urlParams.bno = getCookie('bno');	
	}
}
function addAddressClick(){
	var addressUrl = 'address_sent.html';
	if(url!=null&&url!=""){
		addressUrl+='?url='+url;
	}
	commonEventPush('寄件','页面统计','管理地址簿',url);
}


function queryAjax() {
	$("#waitplease1").show();
	// 数据提交
	$.ajax({ 
		type : "POST",
		dataType : "json",
		url : "/service/sendaddress/sendbook/findbooksbyuserId",
		success : function(data) {
			$("#waitplease1").hide();
			if (data) {
				var temp="<li class='item item-fm-m'><div class='fill-more div-padding-top-buttom10'><span class='lx-add'><p><span class='name text-fontStyle'></span>"+
				"<span class='tel'></span></p> <p class='address' ></p></span> </div> </li>"+
				"<li class='item item-fm'> <div class='ui-flex'> <div class='div-padding-top-buttom10'><div class='text-hui'><a href='#'><i id='selectItem' class=''></i>"+
				"</a><span id='addressType'></span></div></div><div class='' style='padding-top: 12px;'><a id='editAddress' class='btn-buttom-line btn-color-hui' href='#'>编辑</a><a id='cancelItem' class='btn-buttom-line btn-color-hui' href='#' style='margin-left: 10px;'>删除</a>"+
				"</div> </div> </li>";
				for(var i=0;i<data.length;i++){
					var list=$("<p></p>");
					var ul =$("<ul class='ui-fm '></ul>");
					var form = $("<form></form>");
					var section = $("<section class='grid-main'></section>");
					if(i==data.length-1){
						section=$("<section class='grid-main' style='margin-bottom:100px;' ></section>");
					}
					var tempObject=$(temp).clone();
					tempObject.first().attr("onclick","checkOne("+data[i].asbkId+");checkedHas("+data[i].asbkId+")");
					tempObject.find(".lx-add .name.text-fontStyle").html(data[i].userName);
					tempObject.find(".lx-add .tel").html(data[i].telePhoneNuber);
					tempObject.find(".address").html(data[i].areaName+data[i].detailAdress);
					//添加删除事件
					tempObject.find("#cancelItem").attr("onclick","showTip("+data[i].asbkId+",tipsCancel,tipsSubmit)").removeAttr("id");
					//添加编辑跳转
					tempObject.find("#editAddress").attr("onclick","editAddressInfo("+data[i].asbkId+")").removeAttr("id");
					//设置上次已选择地址
//					if(data[i].hasChecked == 1){
//						tempObject.find("#selectItem").removeClass().addClass("ui-ico-sfi ico-circle-tick ico-ck-style");
//					}
					if(data[i].addressStatus == 1){
						tempObject.find(".address").html("<p class='defort_lab'>【默认】</p>"+tempObject.find(".address").html());
						$("#defaultItem").append(tempObject);
						continue;
					}else{
						//tempObject.find(".text-hui").attr("onClick","setDefaultAddress("+data[i].asbkId+")");
						tempObject.find("#selectItem").removeAttr("id");
					}
					
					list.append(tempObject);
					ul.append(list);
					form.append(ul);
					section.append(form);
					$("body").append(section);
				}
				//$("#itemListFor").append(list);
			}
		},
		error : function(e) {
			$("#waitplease1").hide();
			console.log("查询失败...");
		}
	});

}

//编辑地址簿
function editAddressInfo(asbkid){
	if($.trim(asbkid)==""){
		alert("ID号不存在");
		return;
	}
	location.href = "/page/lanxin/addressbook/mybook/address_edit_sent3.html?asbkId="+asbkid;
};
//删除地址簿
function deleteOne(asbkid){
	if($.trim(asbkid)==""){
		alert("删除ID号不存在");
		return;
	}
	$("#waitplease").show();
	$.ajax({
					type : "POST",
					data : {asbkId:asbkid},
					dataType : "text",
					async: false,
					url : "/service/sendaddress/sendbook/delete/"+asbkid,
					success : function(data) {
//						alert("删除成功!");
						if($.trim(data)!=""){
							
							commontipsDialog("删除成功");
							getCommonImg("1023","N","1");
							setTimeout(function() {
								location.href = "/page/lanxin/addressbook/mybook/address_menber3.htm";
							},80);
						}else{
							commontipsDialog("删除失败");
							console.log("删除失败...");
							getCommonImg("1023","N","2");
						}
						
					},
					error : function(e) {

						$("#waitplease").hide();
						commontipsDialog("删除失败");
						console.log("删除失败...");
						getCommonImg("1023","N","3");
					}
				});
	
};
//删除动作
function tipsCancel(index){};

function tipsSubmit(index){
	deleteOne(index);
};


//-------------------------------选择地址---------------------------------------///
//更新地址薄信息，下次默认会使用上次选中的地址簿
function checkedHas(askId){
	$.ajax({
		type : "POST",
		data : {asbkId:askId},
		dataType : "json",
		url : "/service/sendaddress/sendbook/updateChecked/"+askId,
		success : function(data) {
		},
		error : function(e) {
			console.log("地址选择变更失败...");
		}
	});
};
//选择跳转
function checkOne(index){
	$('[data-toggle="select"]').each(function(){
		$(this).click(function(){
			$(this).siblings('[data-toggle="select"]').find('[data-btn="checkbox"]').removeClass("checked");
			$(this).find('[data-btn="checkbox"]').addClass("checked");
			});
	});
	setTimeout(function() {
		location.href ="/page/lanxin/addressbook/mybook/addressDetails3.html?sentAsbkId="+index;
		//window.location.href = "ship.html?asbkId="+index;
  },100);
}

//-------------------------------淘宝地址---------------------------------///
document.getElementById('selectAddress').addEventListener('click', function () {
/*$("#selectAddress").unbind().bind('click', function () {  */
//调用am.selectAddress接口并传入回调函数
      am.selectAddress(function (data) {
     
      var addressEntity1 = {
  			provinceName :data.prov,
  			cityName : data.city,
  			countyName : data.area,
  			addressId : data.addressId
  	};
   // 数据提交
		$.ajax({
			type : "POST",
			data : addressEntity1,
			dataType : "json",
			url : "/service/sendaddress/sendbook/findCountByProCiy",
			success : function(datas) {
				if(datas){
					var addressEntity = {
			    			userName : data.fullname,
			    			telePhoneNuber : data.mobilePhone,
			    			detailAdress : data.address,
			    			provinceName : data.prov,
			    			provinceCode : datas.provinceCode,
			    			cityName : data.city,
			    			cityCode : datas.cityCode,
			    			countyName : data.area,
			    			countyCode : datas.countyCode,
			    			addressStatus : 2,
			    			hasChecked : 1,
			    			sourceType : 1,
			    			addressId : data.addressId
			    		};
					$.ajax({
						type : "POST",
						data : addressEntity1,
						dataType : "json",
						url : "/service/sendaddress/sendbook/findCountByAddressId",
						success : function(dataOne) {
							if(dataOne){
								var addressEntity2 = {
						    			userName : data.fullname,
						    			telePhoneNuber : data.mobilePhone,
						    			detailAdress : data.address,
						    			provinceName : data.prov,
						    			provinceCode : datas.provinceCode,
						    			cityName : data.city,
						    			cityCode : datas.cityCode,
						    			countyName : data.area,
						    			countyCode : datas.countyCode,
						    			hasChecked : 1,
						    			sourceType : 1,
						    			addressId : data.addressId
						    		};
								$.ajax({
									type : "POST",
									data : addressEntity2,
									dataType : "json",
									url : "/service/sendaddress/sendbook/update",
									success : function(data) {
									},
									error : function(e) {
										console.log("变更失败...");
									}
								});
								
								location.href= "/page/lanxin/addressbook/mybook/address_menber3.html";
								
							}else{
								// 数据提交
								$.ajax({
									type : "POST",
									data : addressEntity,
									dataType : "json",
									url : "/service/sendaddress/sendbook/create",
									success : function(data) {
										if(data){ 
											alert(data);
										}else{ 
											$.ajax({
												type : "POST",
												data : null,
												dataType : "json",
												url : "/service/sendaddress/sendbook/findAskIdByUserId",
												success : function(data) {
													if(data){ 
														location.href= "/page/lanxin/addressbook/mybook/address_menber3.html";
													}
												},
												error : function(e) {
													console.log("查询失败...");
												}
											});
										 }
									},
									error : function(e) {
										console.log("新增失败...");
									}
								});
							}
						},
						error : function(e) {
							console.log("校验失败...");
						}
					});
					
				}else{
					commontipsDialog("很抱歉地址对应不上,请重新选择");
				} 
			},
			error : function(e) {
				console.log("地址校验失败...");
			}
		});
      
   })  
}, false);