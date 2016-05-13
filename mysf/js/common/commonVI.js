$(document).ready(function(){
	//后台取[sc]
	//<span class="i18n code[I_NAME_NOT_NULL]"></span>
});

/**
 * 国际化文件
 */
var commonI18n = {
	lang_info : {
		I_ERROR_INFO_03:{
			sc:"服务器未响应",
			tc:"服務器未響應",
			en:""
		},
		I_ERROR_INFO_02:{
			sc:"服务器连接失败",
			tc:"服務器連接失敗",
			en:""
		},
		I_ERROR_INFO_01:{
			sc:"对不起,您的地址簿中无数据!",
			tc:"對不起,您的地址簿中無數據!!",
			en:""
		},
		I_ADRESS_BOOK:{
			sc:"地址簿",
			tc:"地址簿",
			en:""
		},
		I_BACK:{
			sc:"返回",
			tc:"返回",
			en:""
		},
		I_NAME_NOT_NULL:{
			sc:"请填写用户姓名",
			tc:"請填寫用戶姓名",
			en:""
		},
		I_PNO_NOT_NULL:{
			sc:"请填写正确的手机号码",
			tc:"請填寫正確的手機號碼",
			en:""
		},
		I_ADDRESS_NOT_NULL:{
			sc:"请填写详细地址",
			tc:"請填寫詳細地址",
			en:""
		},
		I_PCT_NOT_NULL:{
			sc:"请选择地区",
			tc:"請選擇地區",
			en:""
		},
		I_MATERIAL_NOT_NULL:{
			sc:"请填写物品",
			tc:"請填寫物品",
			en:""
		},
		I_MATERIALVALUE_NOT_NULL:{
			sc:"请填写正确的物品价格",
			tc:"請填寫正確的物品價格",
			en:""
		},
		I_CURRENCY_NOT_NULL:{
			sc:"请选择币种",
			tc:"請選擇幣種",
			en:""
		},
		I_MDD_NOT_NULL:{
			sc:"请选目的地地区",
			tc:"請選目的地地區",
			en:""
		},
		I_WEIGHT_NOT_NULL:{
			sc:"请正确填写重量",
			tc:"請正確填寫重量",
			en:""
		}
	},
	lang_code : "sc",
	get : function(code){
		return commonI18n.lang_info[code][commonI18n.lang_code];
	}
};

/**
 * 校验框架
 */
var commonVerify = {
	verifyObj:{
		nameNotNull:{reg:/^\s*\S+.*$/,erro_info:"I_NAME_NOT_NULL"},
		pnoNotNull:{reg:/(^09[0-9]{8}$)|(^[569][0-9]{7}$)|(^6[0-9]{7}$)/,erro_info:"I_PNO_NOT_NULL"},
		addressNotNull:{reg:/^\s*\S+.*$/,erro_info:"I_ADDRESS_NOT_NULL"},
		materialNotNull:{reg:/^\s*\S+.*$/,erro_info:"I_MATERIAL_NOT_NULL"}, //请填写物品
		materialValueNotNull:{reg:/^[0-9]{1,6}$/,erro_info:"I_MATERIALVALUE_NOT_NULL"}, //请填写正确的物品价格
		currencyNotNull:{reg:/^\s*\S+.*$/,erro_info:"I_CURRENCY_NOT_NULL"}, //请选择币种
		mddNotNull:{reg:/^\s*\S+.*$/,erro_info:"I_MDD_NOT_NULL"}, //请选目的地地区
		weightNotNull:{reg:/^[0-9]{1,5}$/,erro_info:"I_WEIGHT_NOT_NULL"}
	},
	check:function(value,code){
		var codeArray = null;
		if(typeof(code) == "string"){
			codeArray = [code];
		}else{
			codeArray = code;
		}
		for(n in codeArray){
			var verifyObj = commonVerify.verifyObj[codeArray[n]];
			if(!verifyObj){
				continue;
			}
			if(!verifyObj.reg.test(value)){
				var text = commonI18n.get(verifyObj.erro_info);
				alert(text);
				return false;
			}
		}
		return true;
	}
};

/**
 * 收集form中input的数据并做基础校验
 * @param obj
 * @param className
 * @returns
 */
function getFormInfo(obj,className){
	var reObj = obj;
	reObj.$verify = true;
	$("."+className+" input,."+className+" select").each(function(i){
		if(!reObj.$verify){
			return;
		}
		var idValue = $(this).attr("id");
		var val = $(this).val().trim();
		var class_str = $(this).attr("class");
		if(/verifyCode\[(.*)\]/.test(class_str)){
            var reg = RegExp.$1.split(",");
        	if(!commonVerify.check(val,reg)){
        		reObj.$verify = false;
        		return;
        	}
		}
		reObj[idValue] =  val;
	});
	return reObj;
}