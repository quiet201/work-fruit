$(document).ready(function(){
	/**导航下拉效果**/
	$("#sfnav li").hover(function(){
		$(this).addClass("hover").children(".subnav").stop(true,true).show("fast");
	},function(){
		$(this).removeClass("hover").children(".subnav").stop(true,true).hide();
		});
			
	footInit();
	$(window).resize(function(){   
		footInit();  
	});
	var pageUrl = getPageUrl();
	if("cn"!=getRegionCode()){
		if (!('1' == getCT()||getUT() == 1)){
			if(inArray(pageUrl, onlySCUrl)){
				location.href = "/"+i18n.name+"/tips.html";
			}
		}
	}
	
	//changeRegionByBrowserLan();
	
	/** 语言选择下拉效果 **/
	setLangListStyle();
	setLangSelectorStyle();
	//changLang();
	setWayBillQueryLink();
});
function setWayBillQueryLink(){
	var url = "/waybill/sc/waybill_query.html";
	var urlhmt = "http://www.sf-express.com/";
	var regionCode = getRegionCode();
	if("cn"==regionCode){
		$("#_header_search_wbill").attr("href",url);
		$("#_body_search_wbill").attr("href",url);
	}else{
		$("#_header_search_wbill").attr("href",urlhmt+regionCode+"/"+getLanCode()+"/");
		$("#_header_search_wbill").attr("target","_blank");
		$("#_body_search_wbill").attr("href",urlhmt+regionCode+"/"+getLanCode()+"/");
		$("#_body_search_wbill").attr("target","_blank");
	}
}
function changeRegionByBrowserLan(){
	var browserLan = "0";
	syncCallService("/service/changeRegion", "get", "json", "", function(data){
		browserLan = data;
	});
	if(browserLan!="0"){
		changeRegion(browserLan);
	}
}
function changeRegion(browserLan){
	var regAndLan = "/sc/";
	if(browserLan.indexOf("HK")!=-1||browserLan.indexOf("MO")!=-1){
		regAndLan = "/hk/tc/";
	}else if(browserLan.indexOf("TW")!=-1){
		regAndLan = "/tw/en/";
	}else if(browserLan.indexOf("en")!=-1){
		regAndLan = "/hk/en/";
	}
}
function getPageUrl(){
	var pageUrls = location.href.split("/");
	var pageUrl = pageUrls[pageUrls.length-1];
	if(pageUrl==""){
		pageUrl == "index.html";
	}
	return pageUrl;
}
function setLangListStyle(){
	var url = location.href;
	if ('1' == getCT()||getUT() == 1){//内部员工，月结客户仅支持大陆版本，屏蔽区域、语言选择
		var regionCode = getRegionCode();
		if("cn"!=regionCode){
			url = url.replace("/"+regionCode+"/"+getLanCode()+"/", "/sc/");
			location.href = url;
		}
	}else{
		$("#languagelist").hover(function(){
			$(this).children("a").eq(0).addClass("hover");
			$(this).children(".submenu").stop(true,true).show("fast");	
		},function(){
			$(this).children("a").eq(0).removeClass("hover");
			$(this).children(".submenu").stop(true,true).hide();	
		});	
	}
	var showRegin = {'cn':'中国大陆 Mainland China','hk':'香港/澳門 HK/MO','tw':'台灣 Taiwan'};
	var regionCode = getRegionCode();
	var hideId = "#region"+regionCode;
	$("#languagelist li").attr("style","display:");
	$(hideId).attr("style","display:none");
	$("#languagelist").children("a").eq(0).text(showRegin[regionCode]);
}

function setLangSelectorStyle(){
	var langAll = {'cn':['sc','en'],'hk':['tc','en'],'tw':['tc','en']};
	var regionCode = getRegionCode();
	var langCode = getLanCode();
	$("#langSelector li").attr("style","display:none");
	if(regionCode!='cn'){
		$("#lang_"+langAll[regionCode][0]).attr("style","display:");
		$("#lang_"+langAll[regionCode][1]).attr("style","display:");
		$("#langSelector span").removeClass().addClass("lang_unselected");
		$("#lang_"+langCode+" span").removeClass().addClass("lang_selected");
		$("#langSelector .lang_selected").unbind('click');
		$(".lang_unselected").bind('click',function(){
			changLang($(this).attr('lang'));
		});
	}
}
function changLang(lang){
	var url = document.location.href;
	var p = url.split("/");
	var curLang = getLanCode();
	var regionCode = getRegionCode();
	if(regionCode!='cn'){
		document.location.href = url.replace("/"+curLang+"/","/"+lang+"/");
	}
}
/** 页面小于一屏时底部固定 **/
function footInit(){
	var windowMH = $(window).height();
	var bodyMH = $(document.body).height();
	//alert(bodyMH + "----" + windowMH);
	if(bodyMH < windowMH){
		$(".footer").addClass("footerfixed");
	}else{
		$(".footer").removeClass("footerfixed");
	}
}

/** 选项卡 **/
function Tabs(id,num){
	var showNum = num;
    $('#'+id+' .tabs-box').each(function(i){
        $(this).attr('id',id+'-box-'+i);
        if (showNum){$('#'+id+'-box-'+showNum).show();}
		else {$('#'+id+'-box-'+0).show();}
    });
    $('#'+id+" .tabs-menu li").each(function(i){
        $(this).attr('id',id+'-li-'+i);
		if (showNum){$('#'+id+'-li-'+ showNum).find("a").addClass('selected');}
        else { $('#'+id+'-li-'+ 0).find("a").addClass('selected');}
    
    $(this).click(function(){
        $('#'+id+' .tabs-menu li').find("a").removeClass('selected');
		$(this).find("a").addClass('selected');
        $('#'+id+' .tabs-box').hide();
        $('#'+id+'-box-'+i).show();
        });
    });
}

/** 表格行鼠标移上去高亮 **/
function onMouseHoverTr(id){
	$(id).addClass("hover");
	}
function onMouseOutTr(id){
	$(id).removeClass("hover");
	}
/** 表格行点击变色 **/
function trOnClick(id){
	if ($(id).hasClass("selected")) {
	$(id).removeClass("selected").find(":checkbox").attr("checked",false);
	}else{
	$(id).addClass("selected").find(":checkbox").attr("checked",true);
	}
	}

/** 提示信息	 **/
function actionTips(id,content){
	$(id).select();
	var PLeft = $(id).offset().left - 17;
	var PTop = $(id).offset().top -37;
	var htmlDom ='<div class="actionTips" style="top:' + PTop +'px;left:' + PLeft + 'px;"><div class="box"><div class="content">'+ content + '</div><i class="arrow"></i></div></div>';
	$("body").append(htmlDom);
	$(".actionTips .close").click(function(){$(this).parents(".actionTips").remove();});
	event.stopPropagation();
	
	}
function moveActionTips(){
	$(".actionTips").remove();
	}

function login() {
	//如果是港澳台下单页面(包含iframe页面)
	if(parent.$('#fraOrder').length>0){
		parent.window.location.href = "/" + i18n.name + "/login.html";
	}else{
		window.location.href = "/" + i18n.name + "/login.html";
	}
}

function gotoIndex() {
	window.location.href = "/" + i18n.name + "/index.html";	
}

function handleBlackKeyword(){
	sfAlert(i18n.common_request_check);
}

function handleOldUser(){
	window.location.href = "/validate/" + i18n.name + "/user_valid.html";	
}

function handleSubaccountNoPermission(){
	sfAlert(i18n.common_subaccount_nopermission);
	try{
		closeLoading();
		closeTip();
	}catch(err){
	    //do nothing;
	}
}

function syncCallService(url, type, dataType, data, success, error) {
	$.ajax({
		url : url,
		type : type,
		dataType : dataType,
		data : data,
		async : false,
		cache : false,
		success : function(result) {
			if(result == "errorKeyword"){
				handleBlackKeyword();
				return;
			}else if(result == "common_old_user"){
				handleOldUser();
				return;
			}else if(result == "_sub_account_no_permission_"){
				handleSubaccountNoPermission();
				return;
			}else if(result == "AccessOverflowException"){
				sfAlert(i18n.access_overflow_exception);
				return;
			}else{
				success.call(this, result);
			}
		},
		error : function(result) {
			if(result!= null && result.responseText == "n0l0gin"){
				login();
			}else if (error != null) {
				error.call(this, result);
			}
		}
	});
	
}

function asyncCallService(url, type, dataType, data, success, error) {
	$.ajax({
		url : url,
		type : type,
		dataType : dataType,
		data : data,
		cache : false,
		success : function(result) {
			if (result == "n0l0gin") {
				login();
				return;
			}else if(result == "errorKeyword"){
				handleBlackKeyword();
				return;
			}else if(result == "common_old_user"){
				handleOldUser();
				return;
			}else if(result == "_sub_account_no_permission_"){
				handleSubaccountNoPermission();
				return;
			}else if(result == "AccessOverflowException"){
				sfAlert(i18n.access_overflow_exception);
				return;
			}else{
				success.call(this, result);
			}
		},
		error : function(result) {
			if(result!= null && result.responseText == "n0l0gin"){
				login();
			}else if (error != null) {
				error.call(this, result);
			}
		}
	});
}

/**
 * Validform 的 callback处理
 * @param result
 * @returns {Boolean}
 */
function validformCallbackHandle(result){
	if (result == "n0l0gin") {
		login();
		return false;
	}else if(result == "errorKeyword"){
		handleBlackKeyword();
		return false;
	}else if(result == "common_old_user"){
		handleOldUser();
		return false;
	}else{
		return true;
	}
}

/** 检查密码 */
/*function verifyPassword(password){
	if(password == ''){
		return i18n.register_psw_null;
	}
	if (password.length < 6 || password.length > 30) {
		return i18n.register_psw_length;
	}else if($.trim(password)!=password) {
		return i18n.register_psw_space;
	} else {
		var reg = /^[\d|\s]{6,30}$/;
		var reg2 = /^[a-zA-Z0-9]{6,30}$/;
		if (reg.test(password)) {
			return "week";
		} else if(reg2.test(password)) {
			return "middle";
		} else {
			return "strong";
		}
	}
}
*/
/** 检查密码强度 */
/** modify by sfit0157 2014-05-19
function verifyPassword(password){
	if(password == ''){
		return i18n.register_psw_null;
	}
	if (password.length < 6 || password.length > 16) {
		return i18n.register_psw_length;
	}else if(password.replace(/\s+/g,"")!=password ) {//空格校验
		return i18n.password_contain_blank;
	}else {
		if(isStrengthPassword(password)){
			if(password.length>=8 && password.length<=16){
				return "strong";
			}else{
				return "middle";
			}
		}else{
			return "week";
		}
		
	}
}
*/

function verifyPassword(password){
    var score = 0;
    score += password.length * 4;
    score += ( repeat(1,password).length - password.length ) * 1;
    score += ( repeat(2,password).length - password.length ) * 1;
    score += ( repeat(3,password).length - password.length ) * 1;
    score += ( repeat(4,password).length - password.length ) * 1;
    if (password.match(/(.*[0-9].*[0-9].*[0-9])/)){ score += 5;}
    if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){ score += 5 ;}
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){ score += 10;}
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)){ score += 15;}
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)){ score += 15;}
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)){score += 15;}
    if (password.match(/^\w+$/) || password.match(/^\d+$/) ){ score -= 10;}
    if ( score < 0 ){score = 0;}
    if ( score > 99 ){ score = 99;}
    return Math.floor(score/20+1);
    
    function repeat(len,str){
    var res = "";
    for (var i = 0; i < str.length; i++ ){
        var repeated = true;
        for (var j = 0, max = str.length - i - len; j < len && j < max; j++){
            repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + len));
        }
        if (j < len) repeated = false;
        if (repeated) {
            i += len - 1;
            repeated = false;
        }else{
            res += str.charAt(i);
        }
    }
    return res;
    }
}
//end by sfit0157 2014-05-19
/** 验证手机号 */
function verifyMobile(mobileNo) {
	var reg = /^1[34578]\d{9}$/;
	if (reg.test(mobileNo)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 验证港澳台手机号
 * @param mobileNo
 * @param areaCode	区域编码
 * @returns {Boolean}
 */
function verifyHMTMobile(mobileNo,areaCode) {
	var reg;
	if('852' == areaCode){
		//验证香港手机号	(5、6、9开头，8个数字)
		reg = /^[569]\d{7}$/;
	}else if('853' == areaCode){
		//验证澳门手机号	(6开头，8个数字)
		reg = /^6\d{7}$/;
	}else if('886' == areaCode){
		//验证台湾手机号	(09开头，10个数字)
		reg = /^09\d{8}$/;
	}else{
		return verifyMobile(mobileNo);
	}
	if (reg.test(mobileNo)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 验证港澳台座机号
 * @param mobileNo
 * @param areaCode	区域编码
 * @returns {Boolean}
 */
function verifyHMTPhone(mobileNo,areaCode) {
	var reg;	
	if('852' == areaCode){
		//验证香港座机号	(2,3,5,8开头，8个数字)
		reg=/^(852\-)?([2358]\d{7})+(\-[0-9]{1,5})?$/;
	}else if('853' == areaCode){
		//验证澳门座机号	(2开头，8个数字)		
		reg=/^(853\-)?(2\d{7})+(\-[0-9]{1,5})?$/;
	}else if('886' == areaCode){
		//验证台湾座机号	(0开头，区号可以是两位或三位或四位对应电话号码8位、7位、6位)
		//reg =/^(0[2,3,4]\-)?([6,7,8]\d{7})+(\-[0-9]{1,5})?$/;
		reg = /^(0\d{1}\-)?([2-9]\d{7})(\-[0-9]{1,5})?$|^(0\d{2}\-)?([2-9]\d{6})(\-[0-9]{1,5})?$|^(0\d{3}\-)?([2-9]\d{5})(\-[0-9]{1,5})?$/;
	}else{
		return isTelephoneSub(mobileNo);
	}
	if (reg.test(mobileNo)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 验证用户名	6~50位的数字或字母、下划线组成
 * @param username
 * @return
 */
function verifyUsername(username){
	var reg = /^[a-zA-Z][a-zA-Z0-9_]{5,49}$/;
	if (reg.test(username)) {
		return true;
	} else {
		return false;
	}
}

/** 验证手机号 ---新 */
function isMobel(value) {  
	if(/^13\d{9}$/g.test(value)||/^14[57]\d{8}$/g.test(value)||(/^15[0-35-9]\d{8}$/g.test(value))||  
		(/^18[0-35-9]\d{8}$/g.test(value)) || (/^17\d{9}$/g.test(value))){    
		return true;  
	}else{  
        return false;  
	}  
}

/**验证固话(区号-号码-分机号)**/
function isTelephone(obj)// 正则判断
{  
	
	//var pattern=/(^[0-9]{3,4}(\-)?[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)/;
	var pattern=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,5})?$/;
	if(pattern.test(obj)) 
	{ 
		return true; 
	} 
	else 
	{ 
		return false; 
	} 
} 

/**验证固话(区号-号码-分机号)**/
function isTelephoneSub(obj)// 正则判断
{ 
	//var pattern=/(^[0-9]{3,8}\-[0-9]{3,4}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)/; 
	var pattern=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,5})?$/;
	if(pattern.test(obj)) 
	{ 
		return true; 
	} 
	else 
	{ 
		return false; 
	} 
} 

/** 验证邮箱 */
function verifyEmail(email) {
	//var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	var reg = /^([a-zA-Z0-9]*[-_.]?[a-zA-Z0-9]+)+@([a-zA-Z0-9]*[-_\.]?[a-zA-Z0-9]+)+[\.][A-Za-z]{2,3}([\.][A-Za-z]{2})?$/;
	if (reg.test(email)&&email.length<=100) {
		return true;
	} else {
		return false;
	}
}

/** 从url中获取指定key的value */
request = {
	getQueryString : function(key) {
		var svalue = window.location.search.match(new RegExp("[\?\&]" + key
				+ "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}
};

/**
 * 警告框
 * 
 * @param {String}
 *            消息内容
 */
function sfAlert(msg,func) {
	art.dialog({
		id : "Alert",
		title : i18n.MYSF,
		lock : true,
		width : 250,
		resize : false,
		okVal : i18n.okVal,
		drag : true,
		content : msg,
		esc : true,
		background : "#555",
		callback: func,
		ok : function() {
			this.close();
		}
	});
}

//在父节点上弹出错误信息
function sfAlertHTMK(msg,func) {
	parent.art.dialog({
		id : "Alert",
		title : i18n.MYSF,
		lock : true,
		width : 250,
		resize : false,
		okVal : i18n.okVal,
		drag : true,
		content : msg,
		esc : true,
		background : "#555",
		callback: func,
		ok : function() {
			this.close();
		}
	});
}


(function() {
	if (artDialog && artDialog.confirm) {
		/**
		 * 确认
		 * 
		 * @param {String}
		 *            消息内容
		 * @param {Function}
		 *            确定按钮回调函数
		 * @param {Function}
		 *            取消按钮回调函数
		 */
		artDialog.confirm = function(content, yes, no) {
			return artDialog({
				title : i18n.MYSF,
				id : 'Confirm',
				icon : 'question',
				okVal : i18n.okVal,
				cancelVal : i18n.cancelVal,
				fixed : true,
				lock : true,
				opacity : .1,
				content : content,
				ok : function(here) {
					return yes.call(this, here);
				},
				cancel : function(here) {
					return no && no.call(this, here);
				}
			});
		};
	}
	if (artDialog && artDialog.prompt) {
		/**
		 * 提问
		 * 
		 * @param {String}
		 *            提问内容
		 * @param {Function}
		 *            回调函数. 接收参数：输入值
		 * @param {String}
		 *            默认值
		 */
		artDialog.prompt = function(content, yes, value) {
			value = value || '';
			var input = 0;

			return artDialog({
				title : i18n.MYSF,
				id : 'Prompt',
				icon : 'question',
				okVal : i18n.okVal,
				cancelVal : i18n.cancelVal,
				fixed : true,
				lock : true,
				opacity : .1,
				content : [ '<div style="margin-bottom:5px;font-size:12px">',
						content, '</div>', '<div>', '<input class="input-text input-normal" value="', value,
						'" />', '</div>' ]
						.join(''),
				init : function() {
					input = this.DOM.content.find('input')[0];
					input.select();
					input.focus();
				},
				ok : function(here) {
					return yes && yes.call(this, input.value, here);
				},
				cancel : true
			});
		};
	}
})(i18n.MYSF);


/**
 * 确认框
 * 
 * @param {String}
 *            消息内容 确定返回true，取消返回false
 */
function sfConfirm(msg, okCallback, cancelCallback) {
	artDialog.confirm(msg, okCallback, cancelCallback);
}

/**
 * 提问框
 * 
 * @param {String}
 *            提问内容
 * @param {Function}
 *            回调函数. 接收参数：输入值
 * @param {String}
 *            默认值
 */
function sfPrompt(msg, callback, defaultVal) {
	artDialog.prompt(msg, callback, defaultVal);
}


function alertDialog(msg){
    art.dialog({
        title: i18n.MYSF,
        lock:true,
        width:250,
        resize:false,
        drag:true,
        content: msg,
        esc:true,
        background:"#555"
    });
}

function getCookie(objName){
     var arrStr = document.cookie.split(";");
     for(var i = 0;i < arrStr.length;i++){
         var temp = arrStr[i].split("=");
         if( $.trim(objName) == $.trim(temp[0])) return temp[1];
    }   
}

function getL() {
	var l = 0;
	syncCallService("/service/ticketstatus", "get", "json", "", function(data){
		if (data == "1") {
			l = 2;
		} else {
			l = 0;
		}
	}, function(data) {
		l = 0;
	});
	return l;
}

function getUT() {
	return getCookie("t") == undefined? 0:getCookie("t");
}

function getCT() {
	return getCookie("ct") == undefined? 0:getCookie("ct");
}
function isCustMem(){
	var ct = getCT();
	return ct=="1"?"1":"0";
}
function getU() {
	return getCookie("u") == undefined? i18n.advice_dear_users:getCookie("u");;
}

function isGroupUser() {
	var v = getCookie("v");
	if(v == undefined || v == null || v == "false" || v == "undefined"){
		return false;
	}else{
		return true;
	}
}

function delCookie(name){
    document.cookie = name+"=0;path=/;expires="+(new Date(0)).toGMTString();
}

function addCookieWithNoExpires(name,value){
    var cookieValue = name + "=" + value;
    cookieValue += ";path=/";
//    cookieValue += ";domain=.sf-express.com";
    document.cookie = cookieValue;
}

function addCookie(name,value){
    var cookieValue = name + "=" + value;
    var date = new Date();
    var ms = 7*24*3600*1000;
    date.setTime(date.getTime() + ms);
    cookieValue += ";expires=" + date.toGMTString();
    cookieValue += ";path=/";
//    cookieValue += ";domain=.sf-express.com";
    document.cookie = cookieValue;
}

/*-------------------扩展Date的format方法 ---------------------*/
Date.prototype.format = function (format) {
	var o = {
    	"M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
     };
     if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     }
     for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
     }
     return format;
};

/**  
 * 转换日期对象为日期字符串(国际化)  
 * @param date 日期对象  
 * @param isFull 是否为完整的日期数据,  
 *               为true时, 格式如"2000-03-05 01:05:04"  
 *               为false时, 格式如 "2000-03-05"  
 * @return 符合要求的日期字符串  
 */  
function getI18nFormatDate(date, isFull) {
        var pattern = "";
        if (isFull == true || isFull == undefined) {
        	if(i18n == en) {
        		pattern = "MM/dd/yyyy hh:mm:ss";
        	} else {
        		//年月日
        		pattern = "yyyy"+i18n.common_nian+"MM"+i18n.common_yue+"dd"+i18n.common_ri+"hh:mm:ss";
        	}
            
        } else {
        	if(i18n == en) {
        		pattern = "MM/dd/yyyy";
        	} else {
        		pattern = "yyyy"+i18n.common_nian+"MM"+i18n.common_yue+"dd"+i18n.common_ri;
        	}
        }
        return function(date, pattern) {
        	if (date == undefined) {
                date = new Date();
            }
            if (pattern == undefined) {
                pattern = "yyyy-MM-dd hh:mm:ss";
            }
            return date.format(pattern);
        }(date, pattern);
    }

/**  
 * 转换long值为日期字符串(国际化)  
 * @param l long值  
 * @param isFull 是否为完整的日期数据,  
 *               为true时, 格式如"2000-03-05 01:05:04"  
 *               为false时, 格式如 "2000-03-05" 
 * @return 符合要求的日期字符串  
 */  
function getI18nFormatDateByLong(l, isFull) {
    return getI18nFormatDate(new Date(l), isFull);
}

/**
 * 将一个javaScript字面量对象,转化成一个标准的json字符串.
 * by : 孔卫佳
 * time : 2013-05-24
 * @param javascript字面量对象
 * @return 标准json字符串
 */
function json2String(obj){
	if(typeof(obj) =='undefined' || typeof(obj) =='function'){
		return '';
	}
	if(typeof(obj) =='number' || typeof(obj) =='string' || typeof(obj) =='boolean'){
		return '"'+obj+'"';
	}
	if(typeof(obj) =='object'){
		if(obj instanceof Array){
			var reStr = '[';
			for(i in obj){
				reStr = reStr + json2String(obj[i])+',';
			}
			reStr = reStr + ']';
            reStr = reStr .replace(/,]/,']');
			return reStr;
		} 
		if(obj instanceof Date){
			return '"'+obj+'",';
		}
		if(obj instanceof Object){
			var reStr = '{';
			for(i in obj){
				reStr = reStr + '"' + i + '":' + json2String(obj[i]) + ',';
			}
            reStr = reStr + '}';
            reStr = reStr .replace(/,}/,'}');
			return reStr;
		}
	}
	return '';
}

function subString(str, len, hasDot) {
	if(null==str || str==undefined){
		return '';
	}
    var newLength = 0; 
    var newStr = ""; 
    var chineseRegex = /[^\x00-\xff]/g; 
    var singleChar = ""; 
    var strLength = str.replace(chineseRegex,"**").length; 
    for(var i = 0;i < strLength;i++) { 
        singleChar = str.charAt(i).toString(); 
        if(singleChar.match(chineseRegex) != null){ 
            newLength += 2; 
        } else { 
            newLength++; 
        } 
        if(newLength > len) { 
            break; 
        } 
        newStr += singleChar; 
    } 
    if(hasDot && strLength > len) { 
        newStr += "..."; 
    } 
    return newStr; 
} 

//********************************************************************************

/**
 * 解析url拿到对应的参数
 */
function getParameter(name){ 
    var paramStr=location.search; 
    if(paramStr.length==0)return null; 
    if(paramStr.charAt(0)!='?')return null; 
    paramStr=unescape(paramStr); 
    paramStr=paramStr.substring(1); 
    if(paramStr.length==0)return null; 
    var params=paramStr.split('&'); 
    var p = null;
    for(var i=0;i<params.length;i++){
       if(params[i].indexOf(name) >= 0){           
        p = params[i].split('=');
        p = p[1];         
       }
   }
   return p;
}

/**
 * 解析url拿到对应的参数
 * 包括参数值里的=
 * getParameter(name) 无法正确解析xx.html?p1=xx&p2=xx=&p3=xx里的参数p2
 */
function getParameter1(name){ 
    var paramStr=location.search; 
    if(paramStr.length==0)return null; 
    if(paramStr.charAt(0)!='?')return null; 
    paramStr=unescape(paramStr); 
    paramStr=paramStr.substring(1); 
    if(paramStr.length==0)return null; 
    var params=paramStr.split('&'); 
    var p = null;
    for(var i=0;i<params.length;i++){
       if(params[i].indexOf(name) >= 0){           
        p = params[i].substring(name.length+1);         
       }
   }
   return p;
}

function getAreaCode(){
	var areaCode = 'CN';
	var value = $(".btn-submenu").text();
	if (value.indexOf('Taiwan') != -1) {
		areaCode = 'TW';
	} else if (value.indexOf('HK') != -1 || value.indexOf('MO') != -1) {
		areaCode = 'HKM';
	}
	return areaCode;
}


function getUrlPara(paraName){
	var sUrl = location.href;
	var sReg = "(?:\\?|&){1}"+paraName+"=([^&]*)";
	var re=new RegExp(sReg,"gi");
	re.exec(sUrl);
	return RegExp.$1;
}


function isStrengthPassword(pwd){
	/*var type0=0;
	var type1=0;
	var type2=0;
	var type3=0;
	var typeNum=0;
	var chara;
	if(pwd==undefined || pwd==null || pwd=='' || $.trim(pwd)==''){
		return false;
	}
	if(pwd.length<6 || pwd.length>16){
		return false;
	}
	for(var i=0;i<pwd.length;i++){
		chara=pwd.charAt(i);
		if(chara>='A' && chara<='Z' && type0==0){
			type0=1;
		}else if(chara>='a' && chara<='z' && type1==0){
			type1=1;
		}else if(chara>='0' && chara<='9' && type2==0){
			type2=1;
		}else if(type3==0 && (chara=='~' || chara=='!' || chara=='@' || chara=='#'
			|| chara=='$' || chara=='%' || chara=='^' || chara=='&' || chara=='*'
				|| chara=='(' || chara==')' || chara=='-' || chara=='+' || chara=='='|| chara=='/' || chara=='|'
					|| chara=='\\' || chara=='`' || chara==',' || chara=='，' || chara=='.' || chara=='。'
						|| chara=='?' || chara=='？' || chara==':' || chara==';' || chara=='"' || chara=='"'
							|| chara=='“'|| chara=='”' || chara=='【' || chara=='】' || chara=='[' || chara==']'
								|| chara=='{' || chara=='}' || chara=='\'')){//不能含有空格
			type3=1;
		}
		
		typeNum=type0+type1+type2+type3;
		if(typeNum>=3){
			return true;
		}
	}
	
	return false;*/
	
	if(pwd.length<6 || pwd.length>16){
		return false;
	}
	
	//1.密码中不能包含有连续6位及以上顺序(或逆序)数字
	var pattern_1 = /^.*(012345|123456|234567|345678|456789|567890|098765|987654|876543|765432|654321|543210).*$/;
	if(pattern_1.test(pwd)){
		return false;
	}
	
	//2.密码中不能包含有连续6位及以上重复字符，字母区分大小写；（如：密码中不能包含8888889、aaaaaa 或AAAAAA等重复字符）。
	var pattern_2 = /^.*(.)\1{5,}.*$/;
	if(pattern_2.test(pwd)){
		return false;
	}
	
	return true;
}


//获取域名
function getCurHostName(){
	var hostname = document.location.hostname;
	var url='https://i.sf-express.com';
	if(hostname.indexOf("istg")>=0){
		url="https://istg.sf-express.com";
	}
	return @url@;
}


//清除缓存
function clearSSOCache(){ 
  delCookie("l");
	delCookie("u");
	delCookie("c");
	delCookie("t");
	delCookie("ct");
	delCookie("JSESSIONID");
	delCookie("ehkmt");
	delCookie("einter");
  var host=getCurHostName();
  syncCallService(@ssoServer@+"/sso/logout?service="+host+"/service/ticket/loginResult", "POST", "json", "", function(data){
  //syncCallService("http://10.0.23.226:9999/sso/logout?service=http://127.0.0.1:8080/service/ticket/loginResult", "POST", "json", "", function(data){
				
}, function(data){});

}

/**
 * 打开遮罩层
 */
var showLoading = function(){
	var clientHeight = $(window).height();
	var offsetHeight = document.body.offsetHeight;
	var userHeight = (offsetHeight > clientHeight ? offsetHeight:clientHeight);
	$("<div class=\"mask\"></div>").css({display:"block",width:"100%",height:userHeight}).appendTo("body"); 
};

/**
 * 关闭遮罩层
 */
var closeLoading = function(){
	$("div.mask-msg").remove(); 
	$("div.mask").remove(); 
};

function getSendAddrsfromBook(){
	
}

function getRecAddrsfromBook(){
	
}
//校验港澳台地址薄客户编码
function validateCustCode(regionCode,custCode){
	//有关港澳台客户编码规则, 都是10位数字组成, 香港以852开头, 澳门的的853开头, 台湾的以886开头
    var url = "/service/verify/verifyCustCode";
	var type = "get";
	var dataType = 'json';
	var data = {regionCode:regionCode,custCode:custCode};
	var custCodeIslegal = false;
	syncCallService(url, type, dataType, data, function(result) {
		custCodeIslegal = result;
	});
	return custCodeIslegal;

}
//校验港澳台地址薄税号
function validateTaxNo(taxNo){
	//台湾地区税号没有具体的规则, 都是8位数字组成
	 var url = "/service/verify/verifyTaxNo";
		var type = "get";
		var dataType = 'json';
		var data = {taxNo:taxNo};
		var taxNoIslegal = false;
		syncCallService(url, type, dataType, data, function(result) {
			taxNoIslegal = result;
		});
		return taxNoIslegal;
	//var reg=/^\d{8}$/;
}
//把手机号的中间4位变为*号暂时只支持大陆手机号
function splitMobile(mobile){
	if(mobile!=null&&mobile!=''){
		if(mobile.substring(0,1)=='1'){
			mobile=mobile.substring(0,3)+"****"+mobile.substring(7);
		}		
	}	
	return mobile;
}
//把邮箱@符号与域名之间的字符变为*号
function splitEmail(email){
	var length=email.length;  
	var chars1=email.substring(0,email.indexOf('@')+1);
	var chars2=email.substring(email.indexOf('.'));
	var chars3='';
	var num=length-chars1.length-chars2.length;
	for(var i=0;i<num;i++){
		chars3+='*';
	}
	email = email.substring(0,email.indexOf('@')+1)+chars3+email.substring(email.indexOf('.'));
	return email;
	
}

function getAddiService(language,type){
	var obj = '';
	var param = 'type='+type;
	syncCallService('/service/order/'+language+'/getAddiService',"post","json",param,function(data) {
		if(data != null){
			$.each(data,function (i,item){
				obj+='<option value="'+item.value+'">'+item.label+'</option>';
			});
		}
	}, function() {
	});
	return obj;
}

function getAddiServiceForObj(language,type){
	var obj = '';
	var param = 'type='+type;
	syncCallService('/service/order/'+language+'/getAddiService',"post","json",param,function(data) {
		if(data != null){
			obj = data;
		}
	}, function() {
	});
	return obj;
}

/**
 * 自己拼装的json格式数据提交时，如果值中包含了英文双引号，后台解析json时会报错
 * 故在拼装时调用该方法对双引号转义
 * @param jsonStr
 * @returns
 */
function espaceQuote(jsonStr){
	if(jsonStr==undefined || jsonStr==null){
		return "";
	}
	if(typeof(jsonStr)=='string'){
		return jsonStr.replace(/\"/g,"\\\"");
	}
	return jsonStr;
}
/**
*是否具有企业批量下单权限
*/
function isHasBatchOrderPermission(){
    var custType = getCT();
    if('0' == custType){
        return false;
    }else if('1' == custType){
        return true;
    }else if('2' == custType){
    	var subPermisson = getCookie("sub_permission");
    	if(subPermisson == undefined || subPermisson == null 
    			|| subPermisson == "undefined" || subPermisson == ""){
    		return false;
    	}
        var funcIds = eval('('+subPermisson+')').funcIds;
        var flag = false;
        for(var i=0; i<funcIds.length; i++){
            if('CN_BATCH_ORDER' == funcIds[i]){
                flag = true;
                break;
            }
        }
        return flag;
    }else{
        return false;
    }
}

function getAreaFromUrl(){
	if(location.href.indexOf("/hk/")>-1){
		return "hk";		
	}else if(location.href.indexOf("/tw/")>-1){
		return "tw";		
	}else{
		return "sc";
	}
}

var noneCrabsProList = new Array("665","891","931","150","630","640");
function getNoneCrabsProList(){
	syncCallService('/service/order/nonecrabsprolist', 'post', 'JSON', '', function(data){
		noneCrabsProList = data.split(",");
	},function(){});
}

function renderProdTypeForOrder(provinceid){
	var pathname = location.pathname;
	var path = pathname.substring(pathname.lastIndexOf("/")+1);
	if("order.html"!=path)return;
	if($("#payway option[value='2']").length==0){
		$("#payway").append('<option value="2">到付</option>').render();
	}
	if(inArray(provinceid, noneCrabsProList)){
		$("select option").detach("[value='SP334']").parent().render();
	}else{
		if($("select[name='prodType'] option[value='SP334']").length==0){
			$("select[name='prodType']").append('<option value="SP334">大闸蟹专递</option>').render();
		}
	}
}

Math.formatFloat = function(f, digit) {
    var m = Math.pow(10, digit);
    return parseInt(f * m, 10) / m;
};