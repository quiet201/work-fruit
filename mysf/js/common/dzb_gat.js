/**
 * 地址薄控件
 * div 根div的id
 * sorr  r-收件人 , s-寄件人
 * fn 回调范钢锋
 */
var $order_user_addressbook_data = null;
var $order_user_addressbook_div = null;
var $order_user_addressbook_fn = null;
function showAddressBook(div,sorr,fn){
	$order_user_addressbook_div = div;
	$order_user_addressbook_fn = fn;
	var domstr = '<div id="addressBook" class="topPanel">'+
	'<header class="header">'+
	'<a class="goback" onclick="closeAddressBook()">'+commonI18n.get("I_BACK")+'</a><h2 class="header-title">'+commonI18n.get("I_ADRESS_BOOK")+'(<span id="addressDataSize">0</span>)</h2>'+
	'</header>'+
	'<section class="mainContent">'+
    	'<section class="grid-addressbook">'+
    		'<ul id="addressData">'+
        	'</ul>'+
    	'</section>'+
	'</section>'+
	'</div>';
	//显示h页面
	$("#"+div).hide("slow");
	$("#"+div).after(domstr);
	if(sorr == "s"){
		getAddressList_s(function(json){
			openAddressBook(json);
		});
	}
	if(sorr == "r"){
		getAddressList_r(function(json){
			openAddressBook(json);
		});
	}
}

/**
 * 展现地址簿
 */
function openAddressBook(json){
	var dom = "";
	for(var i=0; i<json.length; i++){
		dom = dom + '<li class="line" onclick="setAddressBook(\''+i+'\')">'+
    		'<a href="javascript:void(0)">'+
			'<label>'+json[i].fullname+'</label>'+
			'<span>'+json[i].provinceName+'/'+json[i].cityName+'/'+json[i].countyName+'</span>'+
			'<detail>'+json[i].address+'</detail>'+
			'</a>'+
    	'</li>';
	}
	$("#addressData").html(dom);
	$("#addressDataSize").html(json.length);
}

/**
 *	关闭地址簿
 */
 function closeAddressBook(){
	$("#addressBook").remove();
	$("#"+$order_user_addressbook_div).show("slow");
 }

/**
 * 将地址薄中的一个地址设置到页面;
 */
function setAddressBook(i){
	var json = $order_user_addressbook_data[i];
	$order_user_addressbook_fn.call(this,json);
	closeAddressBook();
}

/**
 * 获取寄件人地址
 */
function getAddressList_s(fn){
	var	url = "/service/addrbook/address/page/S?condition=&time=&pageSize=1000";
	$.ajax({
		type : "GET",
		dataType : "json",
		url : url,
		success: function(date){
			if(date.result instanceof Array && date.result.length>0){
				var json = date.result;
				$order_user_addressbook_data = json;
				fn.call(this,json);
			}else{
				alert(commonI18n.get("I_ERROR_INFO_01"));
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(commonI18n.get("I_ERROR_INFO_02"));
		}
	});
}

/**
 * 获取收件人地址[暂不使用等待需求扩展]
 */
function getAddressList_r(fn){
//	var	url = "/service/addrbook/address/page/S?condition=&time=&pageSize=1000";
//	$.ajax({
//		type : "GET",
//		dataType : "json",
//		url : url,
//		success: function(date){
//			if(date.result instanceof Array && date.result.length>0){
//				var json = date.result;
//				$order_user_addressbook_data = json;
//				fn.call(this,json);
//			}else{
//				alert(commonI18n.get("I_ERROR_INFO_01"));
//			}
//		},
//		error:function(XMLHttpRequest, textStatus, errorThrown){
//			alert(commonI18n.get("I_ERROR_INFO_02"));
//		}
//	});
}


