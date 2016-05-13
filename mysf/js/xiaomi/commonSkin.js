$(document).ready(function(){

	if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
	};
});

function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

//弹出提示
function dialog(content,htmlButton,type){		
		var html1 = "<div id='dialogmask'></div><div id='dialog' class='dialog-a'></div>";
		var html2 = "<div id='dialogmask'></div><div id='dialog' class='dialog-b'><h5>提示信息</h5><div class='dialog-content'><div class='txt'></div><div class='action'></div></div></div>";
		var html = html1;
		if(type == 1){html = html2;}
		$("body").append(html);
		if(type != 1){
			$("#dialog").html(content);
		}else{
			$("#dialog").find(".txt").html(content);
			$("#dialog").find(".action").html(htmlButton);
		}
		
		var window_h = $(window).height();
		var window_w = $(window).width();
		var document_h = $(document).height();
		var h = (window_h - $("#dialog").height()) / 2;
		var w = (window_w - $("#dialog").width()) / 2;
		
		$(window).resize(function(){
			window_h = $(window).height();
			window_w = $(window).width();
			document_h = $(document).height();
			h = (window_h - $("#dialog").height()) / 2;
			w = (window_w - $("#dialog").width()) / 2;
			$("#dialog").css({"top":h,"left":w});
			$("#dialogmask").css({"width":window_w,"height":document_h});
			});
		var scrollTop = $(document).scrollTop();
		h = h + scrollTop;
		window_h = window_h + scrollTop;
		$("#dialog").css({"top":h,"left":w}).show();
		$("#dialogmask").css({"width":window_w,"height":document_h}).show();
		if(type != 1){
			$("#dialogmask").click(function() {
				closeDialog();
			});			
		}
		
	}
	
function closeDialog(){
	$("#dialog").remove();
	$("#dialogmask").remove();
}

function mem_confirm(_htmlTxt,_funcitonYes,_functionNo,_textYes,_textNo){
    var funcitonYes = _funcitonYes;
    var functionNo = _functionNo;
    window.mem_callback_yes = function(){
    	if(funcitonYes){
    		funcitonYes.call();
    	}
        closeDialog();
    };
    window.mem_callback_no = function(){
    	if(functionNo){
    		functionNo.call();
    	}
        closeDialog();
    };
    var htmlTxt = _htmlTxt;
    
    var textYes = "是";
    if(_textYes){
    	textYes = _textYes;
    }
    var textNo = "否";
    if(_textNo){
    	textNo = _textNo;
    }
    var htmlButton ="<a class='btn-action' onclick='mem_callback_yes();' href='javascript:void(0)'>"+textYes+"</a><a onclick='mem_callback_no();' class='btn-action ml20' href='javascript:void(0)'>"+textNo+"</a>";
    dialog(htmlTxt,htmlButton,1);
}

/**
 * 电子运单提示框
 * @param _htmlTxt
 * @param _funcitonYes
 * @param _textYes
 */
function mem_confirm2(_htmlTxt,_funcitonYes,_textYes){
    var funcitonYes = _funcitonYes;
    window.mem_callback_yes = function(){
    	if(funcitonYes){
    		funcitonYes.call();
    	}
        closeDialog();
    };
    var htmlTxt = _htmlTxt;
    
    var textYes = "确认";
    if(_textYes){
    	textYes = _textYes;
    }
    var htmlButton ="<a class='btn-action' style='height:30px;' onclick='mem_callback_yes();' href='javascript:void(0)'>"+textYes+"</a>";
    dialog(htmlTxt,htmlButton,1);
}

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
 * 错误码
 */
var ALI_INFOCODE = {
	200:"成功",
	201:"服务错误", 
	202:"手机号格式不正确", 
	203:"手机号已经被绑定", 
	204:"提交的手机号码和接收验证码的手机号码不一致",
	205:"验证码不正确",
	206:"验证码超时",
	207:"数据库插入失败",
	208:"支付宝用户已绑定",
	209:"绑定失败，请确保您的网络通畅。或退出稍后再试。",
	210:"当天验证码发送次数已用完",
};

var WX_HKMINFOCODE = {
		200 : "成功",
		201 : "服務錯誤",
		202 : "手機格式不正確",
		203 : "手機號碼已綁定",
		204 : "提交的手機號碼與接收驗證碼的手機號碼不一致",
		205 : "驗證碼不正確",
		206 : "驗證碼超時",
		207 : "數據新增失敗",
		208 : "微信用戶已綁定",
		209 : "綁定失敗，請確保您的网络通暢，或退出稍後再試",
		210 :"當天驗證碼發送次數已用完"
};



/**
 * 错误码定义 mousycoder
 */
var ErrorType = {
	OK:"成功",
	error500:"服务错误", 
	errorPhone:"手机号格式不正确", 
	errorCode:"验证码不正确",
	codeExpire:"验证码超时"
};


/**
 * 微信锁,防止方法重复提交.
 */
var wx_lock = {
		open:function(fname){
			if(wx_lock[fname+"_lock"] == "on"){
				return true;
			}else{
				wx_lock[fname+"_lock"] = "on";
				window.setTimeout(function(){
					wx_lock[fname+"_lock"] = "";
				},12000);
				return false;
			}
		},
		close:function(fname){
			wx_lock[fname+"_lock"] = "";
		}
};

/**
 * 日期类扩展
 * @param format
 * @returns
 */
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
 * String扩展类
 */
String.prototype.trim = function(){ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};



/**
 * ajax同步方法
 * @param url
 * @param type
 * @param dataType
 * @param data
 * @param success
 * @param error
 */
function syncCallService(url, type, dataType, data, success, error) {
	$.ajax({
		url : url,
		type : type,
		dataType : dataType,
		data : data,
		async : false,
		cache : false,
		success : function(result) {
			success.call(this, result);
		},
		error : function(result) {
			if (error != null) {
				error.call(this, result);
			}
		}
	});
}

/**
 * String工具类
 */
var StringUtils = {};
StringUtils.tremNull =  function(str){
	if(str){
		return str;
	}else{
		return "";
	}
};
StringUtils.trim =  function(str){
};
/** 验证手机号 ---新 */   
function isMobel(value) {  
	if(/^13\d{9}$/g.test(value)||/^14[5,7]\d{8}$/g.test(value)||(/^15[0-35-9]\d{8}$/g.test(value))||  
		(/^18[0-35-9]\d{8}$/g.test(value)) || (/^17\d{9}$/g.test(value))){    
		return true;  
	}else{  
        return false;  
	}  
}

var car_common_data = {
		/***
		 * 初始化地区
		 */
		init : function(){
			car_common_data.initCarBrand();
		},
		initCarBrand:function(){
			var deptName = $("#deptName").val();
			var url = "/service/weixin/getAreaList";
			if(null != deptName && deptName.length > 0){
				$.ajax({
					url : url + '?deptName='+encodeURI(encodeURI(deptName)),
					cache : false,
					type : "POST",
					dataType : "json",
					async : false,
					success : car_common_data.getCarBrand,
					error : function(){
						alert('加载地区异常');
					}
				});
			}else{
				$('#areaList').attr("class","error");
				$('#areaList').text("请输入区部编码或区部名称!");
			}
		},
		/***
		 **返回结果回调
		 */
		getCarBrand : function(data){
			var deptList = data.deptList;
			var option = "";
			var count =0;
			if(deptList){
				for ( var key in deptList) {
					count++;
					if(count % 4 == 0){
						option += "&nbsp;<input type='radio' name='deptCode' value='" + deptList[key].deptId + "'/>"+ deptList[key].deptName +"<br>";
					}else{
						option += "&nbsp;<input type='radio' name='deptCode' value='" + deptList[key].deptId + "'/>"+ deptList[key].deptName;
					}
				}
				$('#areaList').html(option);
				$('#areaList').attr("class","");
			}
		},
		initChannList:function(){
			var url = "/service/weixin/queryChannList";
			$.ajax({
				url : url,
				cache : false,
				type : "POST",
				dataType : "json",
				async : true,
				success : car_common_data.getChannList,
				error : function(){
					alert('加载渠道信息异常');
				}
			});
		},
		/***
		 **返回结果回调
		 */
		getChannList : function(data){
			var infoList = data.infoList;
			var option = "<option value='' >--请选择渠道--</option>";;
			if(infoList){
				for ( var key in infoList) {
					option += "<option value='" + infoList[key].code + "'>"+ infoList[key].chlName + "</option>";
				}
				$('#channelId').html(option).chosen();
				$('.chosen-results').height(200);
			}	
		}	
};