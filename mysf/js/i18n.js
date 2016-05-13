var sc = {};
var hk = {};
var en = {};
(function() {

	//add by 王煊 2013-10-25
	//符号 
	sc.symbol_colon = "：";
	hk.symbol_colon = "：";
	en.symbol_colon = ":";
	sc.symbol_exclamation = "！";
	hk.symbol_exclamation = "！";
	en.symbol_exclamation = "!";
	sc.symbol_question = "？";
	hk.symbol_question = "？";
	en.symbol_question = "?";
	sc.symbol_leftParenthesis = "（";
	hk.symbol_leftParenthesis = "（";
	en.symbol_leftParenthesis = "(";
	sc.symbol_rightParenthesis = "）";
	hk.symbol_rightParenthesis = "）";
	en.symbol_rightParenthesis = "(";
	//end by 王煊 2013-10-25

	sc.name = "sc";
	hk.name = "hk/tc";
	en.name = "hk/en";

	sc.lang = "sc";
	hk.lang = "tc";
	en.lang = "en";

	sc.MYSF = "我的顺丰";
	hk.MYSF = "我的順豐";
	en.MYSF = "My S.F.";
	sc.Welcome = "您好，";
	hk.Welcome = "您好，";
	en.Welcome = "Welcome,";

	//artDialog
	sc.okVal = "确定";
	hk.okVal = "確定";
	en.okVal = "OK";
	sc.cancelVal = "取消";
	hk.cancelVal = "取消";
	en.cancelVal = "Cancel";

	//register mode
	sc.register_phone_invalid = "请输入正确的手机号";
	hk.register_phone_invalid = "請輸入正確的手機號碼";
	en.register_phone_invalid = "Invalid mobile no."; 

	sc.register_username_null = "请输入用户名";
	hk.register_username_null = "請輸入用戶名";
	en.register_username_null = "Please enter username";

	sc.register_username_less = "用户名不能少于6位";
	hk.register_username_less = "用戶名不能少於6位";
	en.register_username_less = "Username may not be less than 6";

	sc.register_username_more = "用户名不能大于50位";
	en.register_username_more = "Username may not be more than 50";

	sc.register_username_err = "用户名必须以字母开头,由数字、字母或者下划线组成";
	hk.register_username_err = "用戶名必須以英文字母開頭, 由數字、英文字母或者下劃線組成";
	en.register_username_err = "Username should begin with alphabets, combine with no., alphabets or underscores"; 

	sc.register_email_invalid = "请输入正确的邮箱地址";
	hk.register_email_invalid = "請輸入正確的郵箱地址";
	en.register_email_invalid = "Invalid email address "; 
	sc.register_email_empty = "请输入邮箱地址";
	hk.register_email_empty = "請輸入郵箱地址";
	en.register_email_empty = "Please enter email address"; 
	sc.register_phone_used = "很抱歉，该手机号已被使用";
	hk.register_phone_used = "很抱歉，該手機號碼已被使用";
	en.register_phone_used = "Sorry, this mobile no. has already been registered";

	sc.register_username_used = "很抱歉，该用户名已被使用";
	hk.register_username_used = "很抱歉，該用戶名已被使用";
	en.register_username_used = "Sorry, this username has already been registered";

	sc.register_email_used = "很抱歉，该邮箱已被使用";
	hk.register_email_used = "很抱歉，該郵箱已被使用";
	en.register_email_used = "Sorry, this username has already been registered"; 

	sc.register_strength_pasword="密码不符合要求，请重新设置.";
	hk.register_strength_pasword="密碼不符合要求，請重新設置。";
	en.register_strength_pasword="invalid password";
	
	sc.simple_strength_pasword="密码中不能包含有6位及以上重复字符、连续6位及以上顺序(或逆序)数字";
	hk.simple_strength_pasword="密碼中不能包含有6位及以上重複字元、連續6元及以上順序(或逆序)數字";
	en.simple_strength_pasword="Password can not contain more than 6 characters and repeat, over six consecutive bits and order (or reverse) digital";
	
	sc.register_username_pasword_notsame="用户名和密码不能一样";
	hk.register_username_pasword_notsame="用戶名和密碼不能一樣";
	en.register_username_pasword_notsame="Not the same as the user name and password";
	
	sc.register_psw_veryweek = "非常弱:";
	hk.register_psw_veryweek = "非常弱:";
	en.register_psw_veryweek = "Very Week:";
	sc.register_psw_week = "弱:";
	hk.register_psw_week = "弱:";
	en.register_psw_week = "Week:";
	sc.register_psw_week_tip = "试试字母、数字和标点混合";
	hk.register_psw_week_tip = "試試英文字母、數字和標點混合";
	en.register_psw_week_tip = "Try combining alphabets, numbers and punctuations";
	sc.register_psw_middle = "中:";
	hk.register_psw_middle = "中:";
	en.register_psw_middle = "Middle:";
	sc.register_psw_middle_tip = "试试字母、数字和标点混合";
	hk.register_psw_middle_tip = "試試英文字母、數字和標點混合";
	en.register_psw_middle_tip = "Try combining alphabets, numbers and punctuations";
	sc.register_psw_verystrong = "非常强:";
	hk.register_psw_verystrong = "非常强:";
	en.register_psw_verystrong = "Very Strong:";
	sc.register_psw_strong = "强:";
	hk.register_psw_strong = "強:";
	en.register_psw_strong = "Strong:";
	sc.register_psw_strong_tip = "请牢记您的密码";
	hk.register_psw_strong_tip = "請緊記您的密碼";
	en.register_psw_strong_tip = "Please remember your password"; 
	sc.register_psw_not_match = "两次输入的密码不一致";
	hk.register_psw_not_match = "兩次輸入的密碼不一致";
	en.register_psw_not_match = "The passwords you entered must be consistent"; 
	sc.register_verify_code_wrong = "请输入正确的验证码";
	hk.register_verify_code_wrong = "請輸入正確的驗證碼";
	en.register_verify_code_wrong = "Wrong verification code"; 
	sc.register_verify_code_null = "请输入验证码";
	hk.register_verify_code_null = "請輸入驗證碼";
	en.register_verify_code_null = "please enter the verification code";

	sc.register_verify_code_regetcode = "请获取验证码";
	hk.register_verify_code_regetcode = "請獲取驗證碼";
	en.register_verify_code_regetcode = "Get verification code"; 

	sc.register_verify_code_timeout = "验证码已经超时，请重新获取";
	hk.register_verify_code_timeout = "驗證碼已經超時，請重新獲取";
	en.register_verify_code_timeout = "Verification code is expired. Please get a new one";
	
	sc.register_verify_code_error_count = "验证码输入错误次数过多";
	hk.register_verify_code_error_count = "验证码输入错误次数过多";
	en.register_verify_code_error_count = "Verification code input error too many";

	sc.register_verify_code_wrong = "请输入正确的验证码";
	hk.register_verify_code_wrong = "請輸入正確的驗證碼";
	en.register_verify_code_wrong = "Wrong verification code";

	sc.register_mobile_verify_code_wrong = "手机号和验证码没有匹配"; 
	hk.register_mobile_verify_code_wrong = "手機號和驗證碼沒有匹配";
	en.register_mobile_verify_code_wrong = "Mobile number and verification code are not matched";

	sc.register_username_used = "很抱歉，该用户名已被注册！";
	hk.register_username_used = "很抱歉，該用戶名已被註冊！";
	en.register_username_used = "Sorry, this username has been registered"; 
	sc.register_fail = "抱歉，注册失败！";
	hk.register_fail = "抱歉，註冊失敗！";
	en.register_fail = "Sorry, registration failed!"; 

	sc.register_fobidden="抱歉，您的注册次数已超过最大限制，为防止恶意注册,请明天再注册";
	en.register_fobidden=" Sorry. You have registered too many times. Please register tomorrow."; 
	hk.register_fobidden="抱歉，您的註冊次數已超過最大限制，為防止惡意註冊,請明天再註冊";

	sc.register_pic_verify_code_wrong = "请输入正确的图片验证码";
	en.register_pic_verify_code_wrong = "Please enter a correct verification code."; 
	hk.register_pic_verify_code_wrong = "請輸入正確的圖片驗證碼";

	sc.register_address_empty = "请输入您的详细地址";
	hk.register_address_empty = "請輸入您的詳細地址";
	en.register_address_empty = "Please enter detailed address"; 
	sc.register_psw_length = "密码为6-16位";
	hk.register_psw_length = "密碼為6-16位";
	en.register_psw_length = "The password should contain 6 to 16 characters"; 
	
	sc.bill_psw_length = "密码为6-16位";
	hk.bill_psw_length = "密碼為6-16位";
	en.bill_psw_length = "The password should contain 6 to 16 characters";
	
	sc.register_psw_space = "密码不能以空格作为开头或结尾";
	hk.register_psw_space = "密碼不能以空格作為開頭或結尾";
	en.register_psw_space = "The passwords cannot begin or end with a space"; 

	sc.register_psw_null = "请输入密码";
	hk.register_psw_null = "請輸入密碼";
	en.register_psw_null = "Please enter the password"; 

	sc.register_psw_confirm_null = "请输入确认密码";
	hk.register_psw_confirm_null = "請輸入確認密碼";
	en.register_psw_confirm_null = "Please enter password again"; 

	sc.register_verify_code_get = "获取验证码";
	hk.register_verify_code_get = "獲取驗證碼";
	en.register_verify_code_get = "Get verification code"; 

	sc.register_verify_code_enter = "请输入验证码";
	hk.register_verify_code_enter = "請輸入驗證碼";
	en.register_verify_code_enter = "Enter a verification code"; 

	sc.register_verify_code_enter_resend_prefix = "";
	hk.register_verify_code_enter_resend_prefix = "";
	en.register_verify_code_enter_resend_prefix = "Resend after ";
	sc.register_verify_code_enter_resend_suffix = "秒后重新发送";
	hk.register_verify_code_enter_resend_suffix = "秒後重新發送";
	en.register_verify_code_enter_resend_suffix = " s"; 

	sc.cps_page_redirect_msg = "你不具备积分兑换权限，无权查看!";
	hk.cps_page_redirect_msg = "你不具備積分兌換權限，無權查看!";
	en.cps_page_redirect_msg = "No permission for redemption!";

	sc.cps_page_redirect_prefix = "";
	hk.cps_page_redirect_prefix = "";
	en.cps_page_redirect_prefix = "redirect after ";
	sc.cps_page_redirect_suffix = "秒后跳转";
	hk.cps_page_redirect_suffix = "秒後跳轉";
	en.cps_page_redirect_suffix = " s"; 

	//advice mode
	sc.advice_dear_users = "尊敬的用户";
	hk.advice_dear_users = "尊敬的客戶";
	en.advince_dear_users = "Dear Valued Customer"; 
	sc.advince_thanks = "您的建议已提交，感谢您的宝贵建议";
	hk.advince_thanks = "您的建議已提交，感謝您的寶貴建議";
	en.advince_thanks = "Your advice has been submitted. Thank you for your valuable suggestion"; 

	sc.advince_error = "系统错误，请重试";
	hk.advince_error = "系統錯誤，請重試";
	en.advince_error = "system error, please try again";
	//mobile validate mode
	sc.mobile_validate_send_fail = "验证码发送失败，请重试！";
	hk.mobile_validate_send_fail = "驗證碼發送失敗，請重試！";
	en.mobile_validate_send_fail = "Fail to send the verification code, please try again!";
	sc.mobile_validate_send_success = "验证码发送成功，请查收！";
	hk.mobile_validate_send_success = "驗證碼發送成功，請查收！";
	en.mobile_validate_send_success = "Success to send the verification code, please check!";
	sc.mobile_validate_auth_code_length = "验证码为6位";
	hk.mobile_validate_auth_code_length = "驗證碼為6位";
	en.mobile_validate_auth_code_length = "The verification code is in 6 digits"; 
	sc.mobile_validate_bound_success = "手机号绑定成功！";
	hk.mobile_validate_bound_success = "手機號碼綁定成功！";
	en.mobile_validate_bound_success = "Mobile number linked successfully"; 
	sc.mobile_validate_auth_code_wrong = "验证码错误";
	hk.mobile_validate_auth_code_wrong = "驗證碼錯誤";
	en.mobile_validate_auth_code_wrong = "Wrong verification code"; 
	sc.mobile_validate_used_by_other_account = "该手机号已经被其它账号绑定";
	hk.mobile_validate_used_by_other_account = "該手機號碼已經被其他帳號綁定";
	en.mobile_validate_used_by_other_account = "The mobile number has already been linked to another account"; 

	//psw change mod
	sc.pswchange_psw_week = "弱:";
	hk.pswchange_psw_week = "弱:";
	en.pswchange_psw_week = "Week:";
	sc.pswchange_psw_veryweek = "非常弱:";
	hk.pswchange_psw_veryweek = "非常弱:";
	en.pswchange_psw_veryweek = "Very Week:";
	sc.pswchange_psw_week_tip = "试试字母、数字和标点混合";
	hk.pswchange_psw_week_tip = "試試英文字母、數字和標點混合";
	en.pswchange_psw_week_tip = "Try combining alphabets, numbers and punctuations"; 
	sc.pswchange_psw_middle = "中:";
	hk.pswchange_psw_middle = "中:";
	en.pswchange_psw_middle = "Middle:";
	sc.pswchange_psw_middle_tip = "试试字母、数字和标点混合";
	hk.pswchange_psw_middle_tip = "試試英文字母、數字和標點混合";
	en.pswchange_psw_middle_tip = "Try combining alphabets, numbers and punctuations";
	sc.pswchange_psw_strong = "强:";
	hk.pswchange_psw_strong = "強:";
	en.pswchange_psw_strong = "Strong:";
	sc.pswchange_psw_verystrong = "非常强:";
	hk.pswchange_psw_verystrong = "非常強:";
	en.pswchange_psw_verystrong = "Very Strong:";
	sc.pswchange_psw_strong_tip = "请牢记您的密码";
	hk.pswchange_psw_strong_tip = "請緊記您的密碼"; 
	en.pswchange_psw_strong_tip = "Please remember your password"; 
	sc.pswchange_psw_not_match = "两次输入的密码不一致";
	hk.pswchange_psw_not_match = "兩次輸入的密碼不一致";
	en.pswchange_psw_not_match = "The passwords you entered must be consistent"; 
	sc.pswchange_old_psw = "请输入原密码";
	hk.pswchange_old_psw = "請輸入原密碼";
	en.pswchange_old_psw = "Please enter the old password";
	sc.pswchange_new_psw = "请输入新密码";
	hk.pswchange_new_psw = "請輸入新密碼";
	en.pswchange_new_psw = "Please enter a new password"; 
	sc.pswchange_reset_psw_success = "密码修改成功，请您牢记您的新密码";
	hk.pswchange_reset_psw_success = "密碼修改成功，請您緊記您的新密碼";
	en.pswchange_reset_psw_success = "Reset password successfully, please remember your new password"; 
	sc.pswchange_old_psw_wrong = "原密码错误！";
	hk.pswchange_old_psw_wrong = "原密碼錯誤！";
	en.pswchange_old_psw_wrong = "Wrong current password!";
	sc.pswchange_psw_wrong = "密码错误！";
	hk.pswchange_psw_wrong = "密碼錯誤！";
	en.pswchange_psw_wrong = "Wrong password!"; 

	sc.pswchange_psw_length="密码长度为6-16位";
	hk.pswchange_psw_length="密碼長度為6-16位";
	en.pswchange_psw_length="The length of password should be from 6 to 16 characters";
	sc.pswchange_psw_newpsw_not_match="新密码不能与原密码一致";
	hk.pswchange_psw_newpsw_not_match="新密碼不能與原密碼一致";
	en.pswchange_psw_newpsw_not_match="New password and old password should be different";
	
	sc.psw_length_error="密码长度有误";
	hk.psw_length_error="密碼長度有誤";
	en.psw_length_error="There is an error on the length of password";
	
	sc.resetpwd_verifytype_null="重置登录密码，但未能找到绑定的手机号或邮箱找回密码";
	hk.resetpwd_verifytype_null="重置登錄密碼，但未能找到綁定的手機號或郵箱找回密碼";
	en.resetpwd_verifytype_null="reset login password,but not can find binding your mobileNo or Email reset password";

	



	//user info mode
	sc.user_timeout = "你未登录或长时间未操作，请重新登录";
	hk.user_timeout = "你未登錄或長時間未操作，請重新登錄";
	en.user_timeout = " Timeout, please login again"; 
	sc.user_phone_invalid = "请输入正确的手机号";
	hk.user_phone_invalid = "請輸入正確的手機號碼";
	en.user_phone_invalid = "Invalid mobile no."; 
	sc.user_telphone_invalid = "请填写正确的座机号码";
	hk.user_telphone_invalid = "請填寫正確的座機號碼";
	en.user_telphone_invalid = "Invalid telephone no."; 
	sc.user_phone_empty = "手机号不能为空";
	hk.user_phone_empty = "手機號碼不能為空";
	en.user_phone_empty = "Mobile phone number should be filled in"; 
	sc.user_email_invalid = "请输入正确的邮箱地址";
	hk.user_email_invalid = "請輸入正確的郵箱地址";
	en.user_email_invalid = "Invalid email address"; 
	sc.user_email_empty = "邮箱地址不能为空";
	hk.user_email_empty = "郵箱地址不能為空";
	en.user_email_empty = "Email address should be filled in"; 
	sc.user_address_empty = "请填写完整的地址信息";
	hk.user_address_empty = "請填寫完整的地址資訊";
	en.user_address_empty = "Please enter detailed address"; 
	sc.user_modify_fail = "抱歉，个人资料保存失败，请重新提交";
	hk.user_modify_fail = "抱歉，個人資料保存失敗，請重新提交";
	en.user_modify_fail = "Sorry, unable to save your personal information, please try again"; 
	sc.user_modify_success = "您的个人资料保存成功，验证手机号码/邮箱可用于后期您忘记密码时找回密码，如果您还没有验证，记得验证哦~";
	hk.user_modify_success = "您的個人資料保存成功，驗證手機號碼/郵箱可用於後期您忘記密碼時找回密碼，如果您還沒有驗證，記得驗證哦~";
	en.user_modify_success = "Your personal information is saved. If you choose to register by your mobile number/email account, you can retrieve your password in the future.";
	sc.user_phone_bound_by_other_account = "该手机号已经被其它账号验证";
	hk.user_phone_bound_by_other_account = "該手機號已經被其他帳號驗證";
	en.user_phone_bound_by_other_account = "The mobile number has already been linked to another account"; 
	sc.user_email_bound_by_other_account = "该手机号已经被其它账号验证";
	hk.user_email_bound_by_other_account = "該手機號已經被其他帳號驗證";
	en.user_email_bound_by_other_account = "The phone has been bound by anothor account";

	//login mode
	sc.login_username_empty = "用户名不能为空";
	hk.login_username_empty = "用戶名不能為空";
	en.login_username_empty = "Username should be filled in"; 
	sc.login_psw_empty = "密码不能为空";
	hk.login_psw_empty = "密碼不能為空";
	en.login_psw_empty = "Password should be filled in";
	sc.login_psw_wrong = "用户名/密码错误"; 
	hk.login_psw_wrong = "用戶名/密碼錯誤";
	en.login_psw_wrong = "Wrong username or password"; 
	sc.login_try_area = "您所在的区域暂不支持登陆";
	hk.login_try_area = "您所在的區域暫不支持登陸";
	en.login_try_area = "The city you situated does not support this function"; 

	//reg_order mode
	sc.reg_order_phone_invalid = "请填写正确的手机号";
	hk.reg_order_phone_invalid = "請填寫正確的手機號";
	en.reg_order_phone_invalid = "Invalid mobile phone number";
	sc.reg_order_phone_empty = "手机号不能为空";
	hk.reg_order_phone_empty = "手機號不能為空";
	en.reg_order_phone_empty = "Mobile phone number should be filled in"; 
	sc.reg_order_psw_empty = "密码不能为空";
	hk.reg_order_psw_empty = "密碼不能為空";
	en.reg_order_psw_empty = "Password should be filled in";
	sc.reg_order_psw_wrong = "用户名/密码错误";
	hk.reg_order_psw_wrong = "用戶名/密碼錯誤"; 
	en.reg_order_psw_wrong = "Wrong username or password"; 

	//reg mode
	sc.reg_phone_invalid = "请输入正确的手机号";
	hk.reg_phone_invalid = "請輸入正確的手機號碼";
	en.reg_phone_invalid = "Invalid mobile no."; 
	sc.reg_phone_empty = "手机号不能为空";
	hk.reg_phone_empty = "手機號碼不能為空";
	en.reg_phone_empty = "Mobile phone should be filled in"; 
	sc.reg_psw_empty = "密码不能为空";
	hk.reg_psw_empty = "密碼不能為空";
	en.reg_psw_empty = "Password should be filled in";
	sc.reg_psw_wrong = "用户名/密码错误"; 
	hk.reg_psw_wrong = "用戶名/密碼錯誤"; 
	en.reg_psw_wrong = "Wrong username or password"; 

	//order mode
	sc.order_address_wrong = "地址有数据错误，请检查省份城市和区域的名称";
	hk.order_address_wrong = "位址有資料錯誤，請檢查省份城市和區域的名稱";
	en.order_address_wrong = "Wrong address info, please check the province, city or area"; 

	sc.order_address_error = "用户已失效，请重新登陆";
	hk.order_address_error = "登陸失效，請重新登陸"; 
	en.order_address_error = "Invalid account. Please login again"; 

	sc.order_address_reservetm_error = "预约时间不正确";
	hk.order_address_reservetm_error = "預約時間不正確";
	en.order_address_reservetm_error = "Incorrect reserve time";


	sc.order_shipment_type = "快递产品";
	hk.order_shipment_type = "產品類型"; 
	en.order_shipment_type = "Express shipment"; 

	sc.order_standard_express = "标准快件";
	hk.order_standard_express = "標準快件";
	en.order_standard_express = "Standard express shipment";

	sc.order_common_express = "普货件";
	hk.order_common_express = "普貨件";
	en.order_common_express = "Bulky shipment";

	sc.order_privilege_express = "特惠件";
	hk.order_privilege_express = "特惠件";
	en.order_privilege_express = "Economic shipment";



	sc.order_safety_express = "特安件";
	hk.order_safety_express = "特安件";
	en.order_safety_express = "Highly secured express shipment";
	
	
	sc.order_detail_print = "已打印";
	hk.order_detail_print = "已列印";
	en.order_detail_print = "printed";
	
	sc.order_detail_not_print = "未打印";
	hk.order_detail_not_print = "未列印";
	en.order_detail_not_print = "print";


	sc.order_sender_empty = "寄件地址未添加";
	hk.order_sender_empty = "寄件地址未添加";
	en.order_sender_empty = "Please provide sender’s address"; 
	sc.order_recipient_empty = "收件地址未添加";
	hk.order_recipient_empty = "收件地址未添加";
	en.order_recipient_empty = "Please provide receiver’s address"; 
	sc.order_recipient_over_ten = "最多只能添加10个收件人";
	hk.order_recipient_over_ten = "最多只能添加10個收件人";
	en.order_recipient_over_ten = "Max. 10 receivers can be provided"; 
	sc.order_sender_recipient_same = "寄件人和收件人有重复";
	hk.order_sender_recipient_same = "寄件人和收件人不可為同一人";
	en.order_sender_recipient_same = "Sender and receiver should not be the same person"; 
	sc.order_over_reserve_time = "当前下单时间不是我司服务时间，请预约上门取件时间。";
	hk.order_over_reserve_time = "當前下單時間不是我司服務時間，請預約上門取件時間。";
	en.order_over_reserve_time = "The cut-off time is over, please make an appointment for picking up shipment."; 
	sc.order_make_booking = "请填写预约时间";
	hk.order_make_booking = "請填寫預約時間";
	en.order_make_booking = "Invalid pickup time"; 
	sc.order_booking_time_wrong = "预约上门取件时间不正确";
	hk.order_booking_time_wrong = "請輸入正確預約上門時間";
	en.order_booking_time_wrong = "Invalid time for picking up shipment";
	sc.order_phone_auth_code = "请填写校验码";
	hk.order_phone_auth_code = "請填寫校驗碼";
	en.order_phone_auth_code = "Please fill in verification code"; 
	sc.order_phone_auth_code_resend = "重新发送";
	hk.order_phone_auth_code_resend = "重新發送";
	en.order_phone_auth_code_resend = "Send Again";
	sc.order_phone_auth_code_timeout = "操作时间已超过60秒，请重新发送验证码";
	hk.order_phone_auth_code_timeout = "操作時間已超過60秒，請重新發送驗證碼";
	en.order_phone_auth_code_timeout = "The verification code is over 60s, please click send again";
	sc.order_phone_auth_code_wrong = "您输入的验证码有误，请重新输入";
	hk.order_phone_auth_code_wrong = "您輸入的驗證碼有誤，請重新輸入";
	en.order_phone_auth_code_wrong = "Invalid verification code. Please enter again"; 
	sc.order_phone_auth_code_send = "请发送效验码";
	hk.order_phone_auth_code_send = "請發送效驗碼";
	en.order_phone_auth_code_send = "Please send verification code";
	sc.order_sender_address_select = "请选择寄件地址";
	hk.order_sender_address_select = "請選擇寄件地址";
	en.order_sender_address_select = "Please select the sender address";
	sc.order_recipient_address_select = "请选择收件地址";
	hk.order_recipient_address_select = "請選擇收件地址";
	en.order_recipient_address_select = "Please select receiver’s address"; 

	sc.order_recipient_address_book_select = "从地址簿中选择";
	hk.order_recipient_address_book_select = "從地址簿中選擇";
	en.order_recipient_address_book_select = "Select from address book";

	sc.order_address_book_no_data = "地址簿未找到用户地址信息";
	hk.order_address_book_no_data = "地址簿未找到用戶地址信息";
	en.order_address_book_no_data = "No user's address is found"; 
	sc.order_add_sender_info = "添加寄件人";
	hk.order_add_sender_info = "添加寄件人";
	en.order_add_sender_info = " Add Shipper's Info";
	sc.order_add_recipient_info = "添加收件人";
	hk.order_add_recipient_info = "添加收件人";
	en.order_add_recipient_info = "Add receiver's info"; 
	sc.order_insure_without_price = "未声明保价";
	hk.order_insure_without_price = "未聲明保價";
	en.order_insure_without_price = "Please enter declared value";
	sc.order_declared_price = "声明价值：";
	hk.order_declared_price = "聲明價值：";
	en.order_declared_price = "Declared value"; 
	sc.order_file_shipments = "文件";
	hk.order_file_shipments = "文件";
	en.order_file_shipments = "Document";
	sc.order_file_shipments_over_declared_price = "文件类最高声明价值不超过2000元";
	hk.order_file_shipments_over_declared_price = "文件類最高聲明價值不超過2000元";
	en.order_file_shipments_over_declared_price = "The declared value of document cannot exceed $2000";

	sc.order_declared_price_tooMax_by_month = "最高声明价值不超过300000元";
	hk.order_declared_price_tooMax_by_month = "最高聲明價值不超過300000元";
	en.order_declared_price_tooMax_by_month = "The declared value cannot exceed $300000";

	sc.order_declared_price_tooMax_by_other = "最高声明价值不超过200000元";
	hk.order_declared_price_tooMax_by_other = "最高聲明價值不超過200000元";
	en.order_declared_price_tooMax_by_other = "The declared value cannot exceed $200000";

	sc.order_shipments_over_declared_price = "最高声明价值不超过20000元，若超过20000元，建议您选择我司特殊安全快件";
	hk.order_shipments_over_declared_price = "最高聲明價值不超過20000元，若超過20000元，建議您選擇我司特殊安全快件";
	en.order_shipments_over_declared_price = "The declared value cannot exceed $200000 , or you should change";
	sc.order_insure_price = "保价费用：";
	hk.order_insure_price = "保價費用：";
	en.order_insure_price = "Insurance charge";
	sc.order_shipments = "托寄物品：";
	hk.order_shipments = "託寄物品：";
	en.order_shipments = "Shipment content"; 
	sc.order_yuan = "元";
	hk.order_yuan = "元";
	en.order_yuan = "Dollar"; 
	sc.order_reminding = "寄件须知：";
	hk.order_reminding = "寄件須知：";
	en.order_reminding = "Shipping info";
	sc.order_reminding_msg_first = "快件声明价值不得超过快件实际价值，文件类最高声明价值不超过2000元，非文件类最高声明价值不超过20000元；" + 
								   "如需选择特殊保价，请在我司收派员上门取件时咨询，谢谢！";
	hk.order_reminding_msg_first = "快件聲明價值不得超過快件實際價值，文件類最高聲明價值不超過2000元，非文件類最高聲明價值不超過20000元；" + 
								   "如需選擇特殊保價，請在我司收派員上門取件時諮詢，謝謝！";
	en.order_reminding_msg_first = "The declared price of the shipments must less than its own actual price, and the file, papers or " + 
								   "documents can not exceed 2000 yuan. If you want to the special insure services, please hold " + 
								   "counsel with the coming expressman, Thanks for understanding!";
	sc.order_reminding_msg_second = "若未选择保价，顺丰对月结客户在不超过运费九倍的限额内，非月结客户在不超过运费七倍的限额内赔偿托寄物损" + 
									"失的实际价值。";
	hk.order_reminding_msg_second = "若未選擇保價，順豐對月結客戶在不超過運費九倍的限額內，非月結客戶在不超過運費七倍的限額內賠償託寄物損" + 
									"失的實際價值。";

	en.order_reminding_msg_second = "If you do not insure your shipments, for the losses of shipments, S.F. will make the corresponding compensation: " + 
									"within 9 times amount of the freight for the monthly account member, and within 7 times amount of the freight for " +
									"the non-monthly member.";
	sc.order_reminding_msg_third = "若选择保价，顺丰按托寄物的声明价值和损失比例赔偿，托寄物声明价值高于实际价值的，按实际价值赔偿。";
	hk.order_reminding_msg_third = "若選擇保價，順豐按託寄物的聲明價值和損失比例賠償，託寄物聲明價值高於實際價值的，按實際價值賠償。";
	en.order_reminding_msg_third = "If you insure your shipments, S.F. will make the corresponding compensation accroding to the declared price and the " + 
								   "losses ratio. If the declared price of the shipments higher than its actual price, S.F. will make the corresponding " +
								   "compensation accroding to the actual price of the shipments.";
	sc.order_shipments_over_11KG = "11Kg以上";
	hk.order_shipments_over_11KG = "11Kg以上";
	en.order_shipments_over_11KG = "more than 11Kg";
	sc.order_weight = "重量：";
	hk.order_weight = "重量：";
	en.order_weight = "Weight:"; 
	sc.order_remark_empty = "无";
	hk.order_remark_empty = "無";
	en.order_remark_empty = "None"; 
	sc.order_remark = "备注：";
	hk.order_remark = "備註：";
	en.order_remark = "Remark:";	 
	sc.order_modify = "修改";
	hk.order_modify = "修改";
	en.order_modify = "Modify";
	sc.order_delete = "删除";
	hk.order_delete = "刪除";
	en.order_delete = "Delete";
	//付款方式 需重新翻译 2013-7-18
	sc.order_payment_prepaid = "寄付现结";
	hk.order_payment_prepaid = "寄付現結";
	en.order_payment_prepaid = "Prepaid";
	sc.order_payment_prepaid_month = "寄付月结";
	hk.order_payment_prepaid_month = "寄付月結";
	en.order_payment_prepaid_month = "Account prepaid"; 
	sc.order_payment_freight_collect = "到付";
	hk.order_payment_freight_collect = "到付";
	en.order_payment_freight_collect = "Freight Collect";
	sc.order_payment_third_party = "第三方付";
	hk.order_payment_third_party = "第三方付"; 
	en.order_payment_third_party = "Paid by third party";  
	
	
	sc.order_payment_cash_settlement = "到付现结";
	hk.order_payment_cash_settlement = "到付現結";
	en.order_payment_cash_settlement = "Freight Collect Cash settlement"; 
	
	sc.order_payment_monthly_statement = "到付月结";
	hk.order_payment_monthly_statement = "到付月結";
	en.order_payment_monthly_statement = "Freight Collect monthly statement";
	
	
	sc.order_insure = "声明价值：";
	hk.order_insure = "聲明價值：";
	en.order_insure = "Declared Value:"; 
	sc.order_add_same_recipient = "相同收件人不能重复添加";
	hk.order_add_same_recipient = "相同收件人不能重複添加";
	en.order_add_same_recipient = "Not able to add the same receiver"; 
	sc.order_booking_time_tomorrow = "明天";
	hk.order_booking_time_tomorrow = "明天";
	en.order_booking_time_tomorrow = "Tomorrow";
	sc.order_booking_time_today = "今天";
	hk.order_booking_time_today = "今天";
	en.order_booking_time_today = "Today";
	sc.order_booking_time_the_day_after_tomorrow = "后天";
	hk.order_booking_time_the_day_after_tomorrow = "後天";
	en.order_booking_time_the_day_after_tomorrow = "The day after tomorrow";
	sc.order_confirm_delete = "确定要删除吗?";
	hk.order_confirm_delete = "確定要刪除嗎?";
	en.order_confirm_delete = "Confirm to delete?";
	sc.order_add_sender_company = "填写寄件公司";
	hk.order_add_sender_company = "填寫寄件公司";
	en.order_add_sender_company = "Please enter the sender’s company name"; 
	sc.order_add_recipient_company = "填写收件公司";
	hk.order_add_recipient_company = "填寫收件公司";
	en.order_add_recipient_company = "Please enter the receiver’s company name"; 
	sc.order_ignore_sender_company = "隐藏寄件公司";
	hk.order_ignore_sender_company = "隱藏寄件公司";
	en.order_ignore_sender_company = "Ignore the shipper’s company";
	sc.order_ignore_recipient_company = "隐藏收件公司";
	hk.order_ignore_recipient_company = "隱藏收件公司";
	en.order_ignore_recipient_company = "Ignore the receiver’s company";
	sc.order_enter_recipient_name = "请填写收件人姓名";
	hk.order_enter_recipient_name = "請填寫收件人姓名";
	en.order_enter_recipient_name = "Please enter the receiver’s name"; 
	sc.order_enter_sender_name = "请填写寄件人姓名";
	hk.order_enter_sender_name = "請填寫寄件人姓名";
	en.order_enter_sender_name = "Please enter the sender's name";
	sc.order_phone_or_telephone = "固话和手机请至少填写一项。";
	hk.order_phone_or_telephone = "電話和手機請至少填寫一項。";
	en.order_phone_or_telephone = "Please enter telephone or mobile no."; 
	sc.order_phone_invalid = "请填写正确的手机号";
	hk.order_phone_invalid = "請填寫正確的手機號";
	en.order_phone_invalid = "Invalid mobile no."; 
	sc.order_telephone_invalid = "请填写正确的电话号码";
	hk.order_telephone_invalid = "請填寫正確的電話號碼";
	en.order_telephone_invalid = "Invalid telephone no."; 
	sc.order_address_empty = "请填写您的详细地址";
	hk.order_address_empty = "請填寫您的詳細地址";
	en.order_address_empty = "Please enter detailed address"; 
	sc.order_address_accept_all = "请填写正确的收无忧地址";
	hk.order_address_accept_all = "请填写正确的收无忧地址";
	en.order_address_accept_all = "请填写正确的收无忧地址"; 
	sc.order_add_shipments = "请填写托寄物内容";
	hk.order_add_shipments = "請填寫託寄物內容";
	en.order_add_shipments = "Please enter shipment content";
	sc.order_shipments_amount_empty = "请填写数量";
	hk.order_shipments_amount_empty = "請填寫數量";
	en.order_shipments_amount_empty = "Please enter quantity";
	sc.order_shipments_amount_zero = "数量不能为0";
	hk.order_shipments_amount_zero = "數量不能為0";
	en.order_shipments_amount_zero = "The amount cannot be 0";
/*	sc.order_shipments_amount_wrong = "数量有误";
	hk.order_shipments_amount_wrong = "數量有誤";
	en.order_shipments_amount_wrong = "Invalid quantity";*/
	sc.order_declared_price_empty = "请填写价格";
	hk.order_declared_price_empty = "請填寫價格";
	en.order_declared_price_empty = "Please enter shipment value";
	sc.order_declared_price_zero = "保价不能为0";
	hk.order_declared_price_zero = "保價不能為0";
	en.order_declared_price_zero = "Declared value cannot be 0"; 
	sc.order_declared_price_wrong = "价格有误";
	hk.order_declared_price_wrong = "價格有誤";
	en.order_declared_price_wrong = "Invalid value"; 
	sc.order_declared_price_tooMax = "声明价值不能超过20000";
	hk.order_declared_price_tooMax = "聲明價值不能超過20000";
	en.order_declared_price_tooMax = "Value should not exceed 20000";
	
	
	sc.order_specialPack_value_empty = "请填写特质包装费用";
	hk.order_specialPack_value_empty = "請填寫特質包裝費用";
	en.order_specialPack_value_empty = "Please enter special pack fee";
	
	sc.order_specialPack_value_zero = "特质包装费用不能为0";
	hk.order_specialPack_value_zero = "特質包裝費用不能為0";
	en.order_specialPack_value_zero = "special pack fee cannot be 0";
	
	sc.order_specialPack_value_wrong = "特质包装费用有误";
	hk.order_specialPack_value_wrong = "特質包裝費用有誤";
	en.order_specialPack_value_wrong = "Invalid special pack fee";
	
	
	sc.order_specialPack = "特质包装";
	hk.order_specialPack = "特質包裝";
	en.order_specialPack = "special pack";
	
	sc.order_aviationReport = "代办航空申报";
	hk.order_aviationReport = "代辦航空申報";
	en.order_aviationReport = "aviation report";
	
	sc.order_medotherfee = "其他费用";
	hk.order_medotherfee = "其他费用";
	en.order_medotherfee = "other fee";
	
	sc.order_medsignback = "签回单服务";
	hk.order_medsignback = "签回单服务";
	en.order_medsignback = "签回单服务";
	
	sc.order_medtrustRecept = "代收货款";
	hk.order_medtrustRecept = "代收货款";
	en.order_medtrustRecept = "代收货款";
	
	sc.order_province = "选择省份";
	hk.order_province = "選擇省份";
	en.order_province = "Province";
	sc.order_city = "选择城市";
	hk.order_city = "選擇城市";
	en.order_city = "City";
	sc.order_taiwan = "台 灣";
	hk.order_taiwan = "台 灣";
	en.order_taiwan = "Tai wan";
	sc.order_district = "选择区/县";
	hk.order_district = "選擇區/縣";
	en.order_district = "District/Area";
	sc.order_di2strict = "选择地区";
	hk.order_di2strict = "選擇地區";
	en.order_di2strict = "District";
	sc.order_area = "选择区域";
	hk.order_area = "選擇區域";
	en.order_area = "Area";
	sc.order_name = "姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：";
	hk.order_name = "姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：";
	en.order_name = "Name:";
	sc.order_recipient_company = "收件公司：";
	hk.order_recipient_company = "收件公司：";
	en.order_recipient_company = "Receiver’s company:";
	sc.order_phone = "手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：";
	hk.order_phone = "手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;機：";
	en.order_phone = "Mobile phone number:";
	sc.order_telephone = "固&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：";
	hk.order_telephone = "固&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;話：";
	en.order_telephone = "Telephone number ";
	sc.order_telephone_style = "格式：区号-电话号码 -分机号。";
	hk.order_telephone_style = "格式：區號-電話號碼 -分機號。";
	en.order_telephone_style = "Format: Area code – telephone no. – extension no.";
	sc.order_address = "地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：";
	hk.order_address = "地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：";
	en.order_address = "Address:";
	sc.order_cargo = "托&nbsp;寄&nbsp;物：";
	hk.order_cargo = "托&nbsp;寄&nbsp;物：";
	en.order_cargo = "Shipment content:";
	sc.order_shipments_amount = "数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：";
	hk.order_shipments_amount = "數&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：";
	en.order_shipments_amount = "Amount:";
	sc.order_calculate_insure_price = "计算保价费用？";
	hk.order_calculate_insure_price = "計算保價費用？";
	en.order_calculate_insure_price = "Caculate the insurance charge?";
	sc.order_payment = "付款方式：";
	hk.order_payment = "付款方式：";
	en.order_payment = "Payment method:";
	sc.order_account = "月结账号：";
	hk.order_account = "月結帳號：";
	en.order_account = "Credit account:";
	sc.order_account_empty = "请输入月结账号";
	hk.order_account_empty = "請輸入月結帳號";
	en.order_account_empty = "Please enter credit account no.";
	sc.order_account_wrong = "请输入正确的月结账号";
	hk.order_account_wrong = "請輸入正確的月結帳號";
	en.order_account_wrong = "Please enter valid credit account no."; 
	sc.order_save = "保 存";
	hk.order_save = "保 存";
	en.order_save = "Save";
	sc.order_cancel = "取 消";
	hk.order_cancel = "取 消";
	en.order_cancel = "Cancel";
	sc.order_amount = "数量：";
	hk.order_amount = "數量：";
	en.order_amount = "Amount:";
	sc.additional_service ="附加服务";
	hk.additional_service ="附加服務";
	en.additional_service ="Value-added service";
	sc.self_pick_up="自取";
	hk.self_pick_up="自取";
	en.self_pick_up="Self-pickup"; 
	//waybill print mode
	sc.waybill_print_close = "如果您还未打印完成，请勿关闭窗口，确定关闭？";
	hk.waybill_print_close = "如果您還未列印完成，請勿關閉視窗，確定關閉？";
	en.waybill_print_close = "Please don’t close the window, as the printing is not yet completed. Are you sure to close the window?";

	//myorder mode
	sc.myorder_cancel_wrong = "您勾选的订单中包含已取件或已取消的订单，请重新勾选。";
	hk.myorder_cancel_wrong = "您勾選的訂單中包含已取件或已取消的訂單，請重新勾選。";
	en.myorder_cancel_wrong = "The order(s) you selected is/are collected or cancelled, please select again.";
	sc.myorder_urge_wrong = "您勾选的订单中包含已取件或已取消的订单，请重新勾选。";
	hk.myorder_urge_wrong = "您勾選的訂單中包含已取件或已取消的訂單，請重新勾選。";
	en.myorder_urge_wrong = "The order(s) you selected is/are collected or cancelled, please select again.";
	sc.myorder_delete_wrong = "您勾选的订单中包含未取件或未取消的订单，请重新勾选。";
	hk.myorder_delete_wrong = "您勾選的訂單中包含未取件或未取消的訂單，請重新勾選。";
	en.myorder_delete_wrong = "The order(s) you selected is/are not collected or cancelled, please select again.";
	sc.myorder_innerorder_wrong = "您勾选的订单中包含公司件订单，请重新勾选。";
	hk.myorder_innerorder_wrong = "您勾選的訂單中包含公司件訂單，請重新勾選。";
	en.myorder_innerorder_wrong = "The order(s) you selected is/are including company order, please select again.";
	sc.myorder_waybillno_invalid = "请输入有效的运单号（12位数字）";
	hk.myorder_waybillno_invalid = "請輸入有效的運單號（12位數字）";
	en.myorder_waybillno_invalid = "Invalid waybill no. (12 digits)"; 
	sc.myorder_add_waybillno_success = "添加运单号成功";
	hk.myorder_add_waybillno_success = "添加運單號成功";
	en.myorder_add_waybillno_success = "Adding waybill no. successfully";
	sc.myorder_add_waybillno_fail = "添加运单号失败";
	hk.myorder_add_waybillno_fail = "添加運單號失敗";
	en.myorder_add_waybillno_fail = "Fail to add waybill no.";
	
	sc.myorder_modify_waybillno_fail = "修改运单号失败";
	hk.myorder_modify_waybillno_fail = "修改運單號失敗";
	en.myorder_modify_waybillno_fail = "Fail to modify waybill no.";
	
	sc.myorder_modify_waybillno_success = "修改运单号成功";
	hk.myorder_modify_waybillno_success = "修改運單號成功";
	en.myorder_modify_waybillno_success = "successfully to modify waybill no.";
	
	
	
	sc.myorder_input_modify_waybillno = "请输入要修改的运单号";
	hk.myorder_input_modify_waybillno = "請輸入要修改的運單號";
	en.myorder_input_modify_waybillno = "plase input modify waybill no.";
	
	sc.myorder_right_modify_waybillno = "请输入正确的运单号";
	hk.myorder_right_modify_waybillno = "請輸入正確的運單號";
	en.myorder_right_modify_waybillno = "plase input right waybill no.";
	
	sc.myorder_input_add_waybillno = "请输入要添加的运单号";
	hk.myorder_input_add_waybillno = "請輸入要添加的運單號";
	en.myorder_input_add_waybillno = "plase input add waybill no.";
	
	
	
	
	sc.myorder_add_waybillno_exist = "已经添加过该运单号";
	hk.myorder_add_waybillno_exist = "已經添加過該運單號";
	en.myorder_add_waybillno_exist = "The waybill no. has been added";
	sc.myorder_add_waybillno_used = "该运单号已被使用";
	hk.myorder_add_waybillno_used = "該運單號已被使用";
	en.myorder_add_waybillno_used = "The waybill no. has been used";
	sc.myorder_booking_time = "预约时间：";
	hk.myorder_booking_time = "預約時間：";
	en.myorder_booking_time = "Pickup time:";
	sc.myorder_orderno = "订单号:";
	hk.myorder_orderno = "訂單號:";
	en.myorder_orderno = "Order No.:";
	sc.myorder_order_create_time = "下单时间：";
	hk.myorder_order_create_time = "下單時間：";
	en.myorder_order_create_time = "Time of placing order:";
	sc.myorder_sender = "寄件人";
	hk.myorder_sender = "寄件人";
	en.myorder_sender = "Sender";
	sc.myorder_order_detail = "订单详情";
	hk.myorder_order_detail = "訂單詳情";
	en.myorder_order_detail = "Order info"; 
	sc.myorder_goto_order_detail = "进入订单详情可修改订单或重打运单";
	hk.myorder_goto_order_detail = "進入訂單詳情可修改訂單或重打運單";
	en.myorder_goto_order_detail = "In order detail, you can modify the order detail or re-print the waybill";
	sc.myorder_no_record = "没有订单记录";
	hk.myorder_no_record = "沒有訂單記錄";
	en.myorder_no_record = "No Record";
	sc.myorder_place_order = "我要寄件";
	hk.myorder_place_order = "我要寄件";
	en.myorder_place_order = "Place order";
	sc.myorder_waybillno = "运单号";
	hk.myorder_waybillno = "運單號";
	en.myorder_waybillno = "Waybill no.";
	sc.myorder_recipient = "收件人";
	hk.myorder_recipient = "收件人";
	en.myorder_recipient = "Receiver";
	sc.myorder_trace = "快件追踪";
	hk.myorder_trace = "快件追蹤";
	en.myorder_trace = "Shipment tracking";
	sc.myorder_email_rss = "邮件订阅";
	hk.myorder_email_rss = "郵件訂閱";
	en.myorder_email_rss = "Email RSS"; 
	sc.myorder_position = "快件位置";
	hk.myorder_position = "快件位置";
	en.myorder_position = "Shipment location";
	sc.myorder_state = "状态";
	hk.myorder_state = "狀態";
	en.myorder_state = "Status";
	sc.myorder_cancel_relative_waybillno = "取消关联运单";
	hk.myorder_cancel_relative_waybillno = "取消關聯運單";
	en.myorder_cancel_relative_waybillno = "Cancel waybill linkage";
	sc.myorder_confirm_cancel_relative_waybillno = "确认取消关联运单：";
	hk.myorder_confirm_cancel_relative_waybillno = "確認取消關聯運單：";
	en.myorder_confirm_cancel_relative_waybillno = "Confirm to cancel the relative waybill no.:";
	sc.myorder_save_fail = "保存失败。";
	hk.myorder_save_fail = "保存失敗。";
	en.myorder_save_fail = "Save failed.";
	sc.myorder_user_timeout = "连接超时，您可能长时间未操作，请重新登陆。";
	hk.myorder_user_timeout = "連接逾時，您可能長時間未操作，請重新登陸。";
	en.myorder_user_timeout = "Connect timeout, you may disconnect to the server, please login again.";
	sc.myorder_add_waybillno = "添加运单号";
	hk.myorder_add_waybillno = "添加運單號";
	en.myorder_add_waybillno = "Add Waybill no.";
	sc.myorder_urge = "催收";
	hk.myorder_urge = "催收";
	en.myorder_urge = "Urge";
	sc.myorder_cancel = "取消订单";
	hk.myorder_cancel = "取消訂單";
	en.myorder_cancel = "Cancel Order";
	sc.myorder_delete = "删除";
	hk.myorder_delete = "刪除";
	en.myorder_delete = "Delete";
	sc.myorder_select_order_empty = "请选择至少一条记录。";
	hk.myorder_select_order_empty = "請選擇至少一條記錄。";
	en.myorder_select_order_empty = "Please select at least one record";
	sc.myorder_action_cancel = "取消";
	hk.myorder_action_cancel = "取消";
	en.myorder_action_cancel = "Cancel";
	sc.myorder_action_print = "打印";
	hk.myorder_action_print = "打印";
	en.myorder_action_print = "Print";
	sc.myorder_action_modify = "修改";
	hk.myorder_action_modify = "修改";
	en.myorder_action_modify = "Modify";
	sc.myorder_transgener_user = "您是未注册用户，请先进行手机校验。";
	hk.myorder_transgener_user = "您是未註冊用戶，請先進行手機校驗。";
	en.myorder_transgener_user = "You have not registered, please verify your mobile phone no. first"; 
	sc.myorder_no_order_for_action = "没有可";
	hk.myorder_no_order_for_action = "沒有可";
	en.myorder_no_order_for_action = "There are not ";
	sc.myorder_confirm_action = "确定";
	hk.myorder_confirm_action = "確定";
	en.myorder_confirm_action = "Confirm"; 
	sc.myorder_confirm_operate_selected_record = "已选中的所有订单？订单号：";
	hk.myorder_confirm_operate_selected_record = "已選中的所有訂單？訂單號：";
	en.myorder_confirm_operate_selected_record = " the orders you select? order no. as follow:";
	sc.myorder_dot = "。";
	hk.myorder_dot = "。";
	en.myorder_dot = ".";
	sc.myorder_action_success = "所选订单已成功";
	hk.myorder_action_success = "所選訂單已成功";
	en.myorder_action_success = "The order you selected have success to ";
	sc.myorder_order = "订单：";
	hk.myorder_order = "訂單：";
	en.myorder_order = "Order:";
	sc.myorder_have_success = "已成功";
	hk.myorder_have_success = "已成功";
	en.myorder_have_success = " have success to ";
	sc.myorder_have_select = "所选订单：";
	hk.myorder_have_select = "所選訂單：";
	en.myorder_have_select = "The order you selected: ";
	sc.myorder_have_fail = "未能成功";
	hk.myorder_have_fail = "未能成功";
	en.myorder_have_fail = "Unsuccessful"; 
	sc.myorder_operate_again = "，请重新操作。";
	hk.myorder_operate_again = "，請重新操作。";
	en.myorder_operate_again = ", please operate again";

	//myorder detail mode
	sc.myorder_detail_order_not_exist = "对不起，订单：";
	hk.myorder_detail_order_not_exist = "對不起，訂單：";
	en.myorder_detail_order_not_exist = "Sorry, the order:";
	sc.myorder_detail_no_record = "记录不存在。";
	hk.myorder_detail_no_record = "記錄不存在。";
	en.myorder_detail_no_record = " does not exist.";
	sc.myorder_detail_hope_pick_up_time = "希望上门取件时间：";
	hk.myorder_detail_hope_pick_up_time = "希望上門取件時間：";
	en.myorder_detail_hope_pick_up_time = "Expected pickup time:";
	sc.myorder_detail_recipient_info = "收件人信息";
	hk.myorder_detail_recipient_info = "收件人信息";
	en.myorder_detail_recipient_info = "Receiver’s information";
	sc.myorder_detail_sender_info = "寄件人信息";
	hk.myorder_detail_sender_info = "寄件人信息";
	en.myorder_detail_sender_info = "Sender Info";
	sc.myorder_detail_save = "保存";
	hk.myorder_detail_save = "保存";
	en.myorder_detail_save = "Save";
	sc.myorder_detail_reprint = "重打";
	hk.myorder_detail_reprint = "重新打印"; 
	en.myorder_detail_reprint = "Print again";
	sc.myorder_detail_remark_length_limit = "备注信息不能长于20个字符";
	hk.myorder_detail_remark_length_limit = "備註資訊不能長於20個字符";
	en.myorder_detail_remark_length_limit = "The remark should be less than 20 characters";
	sc.myorder_detail_remark_save_success = "备注信息保存成功";
	hk.myorder_detail_remark_save_success = "備註資訊保存成功";
	en.myorder_detail_remark_save_success = "Save successfully"; 
	sc.myorder_detail_remark_save_fail = "备注信息保存失败";
	hk.myorder_detail_remark_save_fail = "備註資訊保存失敗";
	en.myorder_detail_remark_save_fail = "Save Fail";
	sc.myorder_detail_delete_recipient = "确定要删除该收件人信息么？";
	hk.myorder_detail_delete_recipient = "確定要刪除該收件人資訊麼？";
	en.myorder_detail_delete_recipient = "Confirm to delete the receiver’s info?";
	sc.myorder_detail_waybill_forbid_delete = "该运单已取件，不能删除！";
	hk.myorder_detail_waybill_forbid_delete = "該運單已取件，不能刪除！";
	en.myorder_detail_waybill_forbid_delete = "Shipment has been collected and cannot be deleted!";
	sc.myorder_detail_waybill_not_exist = "运单记录不存在，不能删除！";
	hk.myorder_detail_waybill_not_exist = "運單記錄不存在，不能刪除！";
	en.myorder_detail_waybill_not_exist = "The waybill does not exist, it cannot be deleted!";
	sc.myorder_detail_waybill_at_least_one = "删除失败，A4订单至少有一条运单记录！";
	hk.myorder_detail_waybill_at_least_one = "刪除失敗，A4訂單至少有一條運單記錄！";
	en.myorder_detail_waybill_at_least_one = "Unable to delete. There should be at least one record in My Orders!";
	sc.myorder_detail_address = "详细地址";
	hk.myorder_detail_address = "詳細地址";
	en.myorder_detail_address = "Address";
	sc.myorder_detail_shipments = "托&nbsp; 寄&nbsp;物：";
	hk.myorder_detail_shipments = "托&nbsp; 寄&nbsp;物：";
	en.myorder_detail_shipments = "The Shipments:";
	sc.myorder_detail_insure = "保价";
	hk.myorder_detail_insure = "保價";
	en.myorder_detail_insure = "Shipment protection plus service";
	sc.myorder_detail_phone_empty = "请输入手机号码";
	hk.myorder_detail_phone_empty = "請輸入手機號碼";
	en.myorder_detail_phone_empty = "Please enter the mobile phone no."; 

	//address book mode
	sc.address_book_add_recipient_address = "添加收件地址";
	hk.address_book_add_recipient_address = "添加收件地址";
	en.address_book_add_recipient_address = "Add a receiver’s address"; 
	sc.address_book_add_sender_address = "添加寄件地址";
	hk.address_book_add_sender_address = "添加寄件地址";
	en.address_book_add_sender_address = "Add Sender Address";
	sc.address_book_modify_sender_address = "修改寄件地址";
	hk.address_book_modify_sender_address = "修改寄件地址";
	en.address_book_modify_sender_address = "Modify Sender Address";
	sc.address_book_modify_recipient_address = "修改收件地址";
	hk.address_book_modify_recipient_address = "修改收件地址";
	en.address_book_modify_recipient_address = "Modify the receiver’s address";
	sc.address_book_copy_to_sender_success = "已复制到寄件地址簿";
	hk.address_book_copy_to_sender_success = "已複製到寄件地址簿";
	en.address_book_copy_to_sender_success = "Copied to sender’s address book";
	sc.address_book_copy_to_recipient_success = "已复制到收件地址簿";
	hk.address_book_copy_to_recipient_success = "已複製到收件地址簿";
	en.address_book_copy_to_recipient_success = "Copied to receiver’s address book"; 
	sc.address_book_copy_fail = "复制失败, 请重试！";
	hk.address_book_copy_fail = "複製失敗, 請重試！";
	en.address_book_copy_fail = "Fail, please try again!";
	sc.address_book_delete_confirm = "确定要删除吗?";
	hk.address_book_delete_confirm = "確定要刪除嗎?";
	en.address_book_delete_confirm = "Confirm to delete?";
	sc.address_book_delete_fail = "删除失败，请重试！";
	hk.address_book_delete_fail = "刪除失敗，請重試！";
	en.address_book_delete_fali = "Delete fail, please try again!";
	sc.address_book_delete_success = "删除成功";
	hk.address_book_delete_success = "刪除成功";
	en.address_book_delete_success = "Delete Successfully";
	sc.address_book_set_default = "设为默认";
	hk.address_book_set_default = "設為默認";
	en.address_book_set_default = "Default"; 

	sc.address_book_cancel_default = "取消默认";
	hk.address_book_cancel_default = "取消默認";
	en.address_book_cancel_default = "Un-default";

	sc.address_book_default = "默认";
	hk.address_book_default = "默認";
	en.address_book_default = "Default";
	sc.address_book_copy = "复制";
	hk.address_book_copy = "複製";
	en.address_book_copy = "Copy";
	sc.address_book_edit = "编辑";
	hk.address_book_edit = "編輯";
	en.address_book_edit = "Edit";
	sc.address_book_close = "关闭";
	hk.address_book_close = "關閉";
	en.address_book_close = "Close";
	sc.address_book_remove = "删除";
	hk.address_book_remove = "刪除";
	en.address_book_remove = "Delete";
	sc.address_book_place_an_order = "下订单";
	hk.address_book_place_an_order = "下訂單";
	en.address_book_place_an_order = "Order";
	sc.address_book_select_at_least_one = "请选择至少一条记录";
	hk.address_book_select_at_least_one = "請選擇至少一條記錄";
	en.address_book_select_at_least_one = "Please select at least one record";
	sc.address_book_delete_select = "确定要删除所选的记录吗?";
	hk.address_book_delete_select = "確定要刪除所選的記錄嗎?";
	en.address_book_delete_select = "Confirm to delete the record you select";
	sc.address_book_copy_success  = "已成功复制所选项";
	hk.address_book_copy_success  = "已成功複製所選項";
	en.address_book_copy_success = "Copy Successfully";

	sc.coupon_no_record = "没有优惠劵记录";
	hk.coupon_no_record = "沒有優惠劵記錄";
	en.coupon_no_record = "No coupon record";

	sc.point_exchg_goods_no_data = "没有可兑换的商品";
	hk.point_exchg_goods_no_data = "沒有可兌換的商品";
	en.point_exchg_goods_no_data = "No redeemable products"; 
	sc.point_exchg_rule = "积分规则";
	hk.point_exchg_rule = "積分規則";
	en.point_exchg_rule = "rule";
	sc.point_detail = "积分明细";
	hk.point_detail = "積分明細";
	en.point_detail = "detail";
	sc.point_detail_no_data = "没有积分明细数据";
	hk.point_detail_no_data = "沒有積分明細數據";
	en.point_detail_no_data = "No info on bonus point"; 

	sc.goods_exchg = "兑换商品";
	hk.goods_exchg = "兌換商品";
	en.goods_exchg = "Redeem";
	
	sc.import_excel_frist="批量设置前，请先导入EXCEL或者修改异常收件信息";
	hk.import_excel_frist="批量設置前，請先導入EXCEL或者修改異常收件資訊";
	en.import_excel_frist="Please import the excel file first";
	sc.batch_set_mgr = "批量设置";
	hk.batch_set_mgr = "批量設置";
	en.batch_set_mgr="batch setup";
	sc.user_def_col_mgr = "扩展字段管理";
	hk.user_def_col_mgr = "擴展欄位管理";
	en.user_def_col_mgr = "extend column";
	sc.confirm_override = "自定义字段已经在使用，修改字段名将会覆盖原来的字段名，确定要修改吗?";
	hk.confirm_override = "自訂欄位已經在使用，修改欄位名將會覆蓋原來的欄位名，確定要修改嗎?";
	en.confirm_override = "Modifying the field will overwrite the old field. Are you sure to edit?";
	sc.success ="操作成功";
	hk.success ="操作成功";
	en.success ="success";
	sc.system_error ="系统异常";
	hk.system_error ="系統異常";
	en.system_error ="system exception";
	//积分订单使用
	sc.pointOrder_no_record = "没有积分订单记录";
	hk.pointOrder_no_record = "沒有積分訂單記錄";
	en.pointOrder_no_record = "No bonus point record";

	sc.pointOrderno="订单号";
	hk.pointOrderno="訂單號";
	en.pointOrderno="Order no.";

	sc.pointOrder_create_time="日期";
	hk.pointOrder_create_time="日期";
	en.pointOrder_create_time="Date";

	sc.pointOrder_name="商品名称";
	hk.pointOrder_name="商品名稱";
	en.pointOrder_name="Product name";

	sc.pointOrder_num="数量";
	hk.pointOrder_num="數量";
	en.pointOrder_num="Quantity";

	sc.pointOrder_point="积分";
	hk.pointOrder_point="積分";
	en.pointOrder_point="Bonus point";

	sc.pointOrder_consume_point="消费积分";
	hk.pointOrder_consume_point="消費積分";
	en.pointOrder_consume_point="Bonus point spent";

	sc.pointOrder_status="状态";
	hk.pointOrder_status="狀態";
	en.pointOrder_status="status";

	sc.point_order_detail="积分订单详情";
	hk.point_order_detail="積分訂單詳情";
	en.point_order_detail="Bonus points history";

	sc.point_order_exchange_date="兑换日期";
	hk.point_order_exchange_date="兌換日期";
	en.point_order_exchange_date="Redemption date";

	sc.point_order_good_type="商品属性";
	hk.point_order_good_type="商品屬性";
	en.point_order_good_type="Product type";

	sc.myorder_add_success="添加成功";
	hk.myorder_add_success="添加成功";
	en.myorder_add_success="Sucessfully added";

	sc.myorder_add_fail="已关联运单号，添加失败";
	hk.myorder_add_fail="已關聯運單號，添加失敗";
	en.myorder_add_fail="Already linked with the waybill no., fail to add"; 


	//add by 庄佳钊
	//2013-10-24
	//user info mode
	sc.user_msex="男";
	hk.user_msex="男";
	en.user_msex="male";

	sc.user_fsex="女";
	hk.user_fsex="女";
	en.user_fsex="female";

	sc.user_age_invalid="年龄范围为1-100岁";
	hk.user_age_invalid="年齡範圍爲1-100歲";
	en.user_age_invalid="Age range 1-100 ";

	sc.address_wrong="请填写正确的地址";
	hk.address_wrong="請填寫正確的位址";
	en.address_wrong=" Please enter a correct address";
	
	sc.user_phone_login="开启手机登录";
	hk.user_phone_login="開啓手機登錄";
	en.user_phone_login="Activate mobile login";

	sc.user_phone_cancel="取消手机登录";
	hk.user_phone_cancel="取消手機登錄";
	en.user_phone_cancel="Cancel mobile login";

	sc.user_phone_login_success="手机登录启动成功";
	hk.user_phone_login_success="手機登錄啓動成功";
	en.user_phone_login_success="Mobile phone login activated";

	sc.user_phone_login_fail="手机启动失败,用户已失效,请重新登录";
	hk.user_phone_login_fail="手機啓動失敗,用戶已失效,請重新登錄";
	en.user_phone_login_fail="Mobile login failed. Please try again";

	sc.user_phone_fail_bind="手机启动失败,请重新绑定手机";
	hk.user_phone_fail_bind="手機啓動失敗,請重新綁定手機";
	en.user_phone_fail_bind="Mobile activation failed. Please register again";

	sc.user_phone_by_other="手机启动失败,手机号已被用户使用";
	hk.user_phone_by_other="手機啓動失敗,手機號已被用戶使用";
	en.user_phone_by_other="Mobile activation failed. This mobile no. has been used by another user";   
	
	
	sc.user_email_by_loginType="邮箱取消失败,请您更换手机或用户名方式登录后重试";
	hk.user_email_by_loginType="郵箱取消失敗,請您更換手機或用戶名方式登錄後重試";
	en.user_email_by_loginType="Failed to cancel email account. Please try mobile login or username login";
	
   
	sc.user_system_exception="系统异常,请重新登录";
	hk.user_system_exception="系統異常,請重新登錄";
	en.user_system_exception="System error. Please login again";

	sc.user_email_login_startup="开启邮箱登录";
	hk.user_email_login_startup="開啓郵箱登錄";
	en.user_email_login_startup="Activate email account login";

	sc.user_email_login_cancel="取消邮箱登录";
	hk.user_email_login_cancel="取消郵箱登錄";
	en.user_email_login_cancel="Cancel email account login";

	sc.user_email_bind="绑定邮箱地址";
	hk.user_email_bind="綁定郵箱地址";
	en.user_email_bind="Register by email address";	

	
	sc.user_email_activate="激活邮箱地址";
	hk.user_email_activate="啟動郵箱地址";
	en.user_email_activate="Activate the email account";
	
	sc.user_email_modify="修改邮箱地址";
	hk.user_email_modify="修改郵箱地址";
	en.user_email_modify="Modify the email address";

	sc.user_phone_bind="绑定手机号";
	hk.user_phone_bind="綁定手機號";
	en.user_phone_bind="Register by mobile phone no.";	

	sc.user_phone_modify="修改手机号";
	hk.user_phone_modify="修改手機號";
	en.user_phone_modify="Modify mobile no.";

	sc.user_phone_login_cancle_success="手机登录取消成功";
	hk.user_phone_login_cancle_success="手機登錄取消成功";
	en.user_phone_login_cancle_success="Cancel mobile login";

	sc.user_phone_login_cancle_fail="手机取消失败,用户已失效,请重新登录";
	hk.user_phone_login_cancle_fail="手機取消失敗,用戶已失效,請重新登錄";
	en.user_phone_login_cancle_fail="Fail to cancel mobile login, invalid user, please login again";

	sc.user_phone_cancle_bind_fail="手机取消失败,请重新绑定手机";
	hk.user_phone_cancle_bind_fail="手機取消失敗,請重新綁定手機";
	en.user_phone_cancle_bind_fail="Fail to cancel mobile login, please register again";

	
	sc.user_phone_by_loginType="手机取消失败,请您更换邮箱或用户名方式登录后重试";
	hk.user_phone_by_loginType="手機取消失敗,請您更換郵箱或用戶名方式登錄後重試";
	en.user_phone_by_loginType="Mobile no. is cancelled. Please try email account login or username login.";
	
	//订阅
	sc.subscription_one_trench="请至少选择一种订阅渠道";
	hk.subscription_one_trench="請至少選擇一種訂閱渠道";
	en.subscription_one_trench="Please select at least one subscription channel.";
	
	//电子账单
	sc.report_user_not_cardNo="您的账户没有设置月结卡号，不能使用此功能!";
	hk.report_user_not_cardNo="您的帳戶沒有設置月結卡號，不能使用此功能!";
	en.report_user_not_cardNo="Your account does not support credit account no., so this function cannot be used."; 
	sc.report_select_date="请选择日期!";
	hk.report_select_date="請選擇日期!";
	en.report_select_date="Please select a date!";
	sc.report_tmDate_endDate="起始日期不能大于结束日期";
	hk.report_tmDate_endDate="起始日期不能大於結束日期";
	en.report_tmDate_endDate="The date of placing shipment should not later than the completed date.";
	sc.report_select_mouth="请选择月份！";
	hk.report_select_mouth="請選擇月份！";
	en.report_select_mouth=" Please select a month!";
	sc.report_execl_data="正在导出大量的数据，请您耐心等待。。。";
	hk.report_execl_data="正在導出出大量的資料，請您耐心等待。。。";
	en.report_execl_data=" A huge amount of data is downloading. Please wait.";
	sc.report_not_login="您还未登录,暂不能使用此功能";
	hk.report_not_login="您還未登錄,暫不能使用此功能";
	en.report_not_login=" You have not logged in. You cannot use this function temporarily."; 
	sc.report_tmDate_endData_change="开始日期和结束日期的间隔不可以超过30天";
	hk.report_tmDate_endData_change="開始日期和結束日期的間隔不可以超過30天";
	en.report_tmDate_endData_change=" There should be less than 30 days between the start date and end date."; 
	sc.report_cardNo_error="月结卡号错误";
	hk.report_cardNo_error="月結卡號錯誤";
	en.report_cardNo_error=" Error on the credit account no.";
	sc.report_not_file="要下载的文件不存在";
	hk.report_not_file="要下載的文件不存在";
	en.report_not_file="Cannot find the document for downloading";
	sc.report_load_data="正在处理，请您耐心等待...";
	hk.report_load_data="正在處理，請您耐心等待...";
	en.report_load_data=" In progress. Please wait…";
	sc.reprot_file_load_error="下载失败,请确定要导出的账单数据是否存在!";
	hk.reprot_file_load_error="下載失敗,請確定要導出出的帳單資料是否存在!";
	en.reprot_file_load_error=" Fail to download. Please confirm if the exporting data of statement exists."; 
	sc.report_image_select="请选中需要下载的图片";
	hk.report_image_select="請選中需要下載的圖片";
	en.report_image_select="Please select the picture for downloading";
	sc.reprot_image_data_load="正在获取图片数据，请您耐心等待。。。";
	hk.reprot_image_data_load="正在獲取圖片資料，請您耐心等待。。。";
	en.reprot_image_data_load="Downloading picture. Please wait.";
	sc.reprot_waybillNo_not_iamge="您所选的运单号没有图片";
	hk.reprot_waybillNo_not_iamge="您所選的運單號沒有圖片";
	en.reprot_waybillNo_not_iamge="No picture of the waybill no. you selected"; 
	sc.reprot_waybillNo_err_iamge_err="运单号不正确或找不到图片";
	hk.reprot_waybillNo_err_iamge_err="運單號不正確或找不到圖片";
	en.reprot_waybillNo_err_iamge_err="Incorrect waybill no. or picture cannot be found."; 
	sc.report_waybillNo_see_iamge="运单图片查看";
	hk.report_waybillNo_see_iamge="運單圖片查看";
	en.report_waybillNo_see_iamge="View the picture of waybill";
	
	sc.user_email_login_success="邮箱登录启动成功";
	hk.user_email_login_success="郵箱登錄啓動成功";
	en.user_email_login_success="Email account activated successfully";

	sc.user_email_login_invalid="邮箱启动失败,用户已失效,请重新登录";
	hk.user_email_login_invalid="郵箱啓動失敗,用戶已失效,請重新登錄";
	en.user_email_login_invalid="Fail to activate by email account, invalid user, please login again";	

	sc.user_email_login_fail_bind="邮箱启动失败,请重新绑定邮箱";
	hk.user_email_login_fail_bind="郵箱啓動失敗,請重新綁定郵箱";
	en.user_email_login_fail_bind="Fail to activate by email account, please try again";

	sc.user_email_login_fail_by_other="邮箱启动失败,邮箱地址已被用户使用";
	hk.user_email_login_fail_by_other="郵箱啓動失敗,郵箱地址已被用戶使用";
	en.user_email_login_fail_by_other="Fail to activate by email account, this email address has been used by the another user";

	sc.user_email_cancle_success="邮箱登录取消成功";
	hk.user_email_cancle_success="郵箱登錄取消成功";
	en.user_email_cancle_success="Email account login is cancelled successfully";

	sc.user_email_cancle_invalid="邮箱取消失败,用户已失效,请重新登录";
	hk.user_email_cancle_invalid="郵箱取消失敗,用戶已失效,請重新登錄";
	en.user_email_cancle_invalid="Email account login is failed to cancel, invalid user, please login again";

	sc.user_email_cancle_fail="邮箱取消失败,请重新绑定邮箱";
	hk.user_email_cancle_fail="郵箱取消失敗,請重新綁定郵箱";
	en.user_email_cancle_fail="Email account login is failed to cancel, please register again";

	//area_handle
	sc.area_handle_data="后台获取区县数据失败，请重新获取";
	hk.area_handle_data="後台獲取區縣數據失敗，請重新獲取";
	en.area_handle_data="Fail to retrieve data, please try again";
   
	sc.area_handle_notfound_data="对不起，没有找到数据";
	hk.area_handle_notfound_data="對不起，沒有找到數據";
	en.area_handle_notfound_data="Sorry, no data is found";
	//city_handle
	sc.city_handle_data="后台获取城市数据失败，请重新获取";
	hk.city_handle_data="後台獲取城市數據失敗，請重新獲取";
	en.city_handle_data="Fail to retrieve data, please try again";
	//province_handle
	sc.province_handle_data="后台获取省份数据失败，请重新获取";
	hk.province_handle_data="後台獲取省份數據失敗，請重新獲取";
	en.province_handle_data="Fail to retrieve data, please try again";	

	sc.beijing="北京";
	hk.beijing="北京";
	en.beijing="Beijing";

	sc.tianjing="天津";
	hk.tianjing="天津";
	en.tianjing="Tianjing";

	sc.shanghai="上海";
	hk.shanghai="上海";
	en.shanghai="Shanghai";

	sc.chongqing="重庆";
	hk.chongqing="重慶";
	en.chongqing="Chongqing";

	sc.shi="市";
	hk.shi="市";
	en.shi="City";

	//2013-10-25
	//common.js
	sc.common_request_check = "您的请求含有非法关键字，请检查后再次提交。";
	hk.common_request_check = "您的請求含有非法關鍵字，請檢查後再次提交。";
	en.common_request_check = "Your request contains illegal keyword, please check and resubmit.";
	
	sc.common_subaccount_nopermission = "您没有此功能的权限。";
	hk.common_subaccount_nopermission = "您沒有此功能的權限。";
	en.common_subaccount_nopermission = "You do not have permission for this feature.";

	sc.common_nian = "年";
	hk.common_nian = "年";
	en.common_nian = "year";

	sc.common_yue = "月";
	hk.common_yue = "月";
	en.common_yue = "month";

	sc.common_ri = "日";
	hk.common_ri = "日";
	en.common_ri = "day";

	//peroption.js
	sc.peroption_psw = "请输入密码，6-30位字符";
	hk.peroption_psw = "請輸入密碼，6-30位字符";
	en.peroption_psw = "Please enter password which includes 6 to 30 characters";

	sc.peroption_psw_confirm = "请确认密码";
	hk.peroption_psw_confirm = "請確認密碼";
	en.peroption_psw_confirm = "Please confirm password";

	//2013010-28
	 sc.peroption_new_psw = "请输入新密码，6-30位字符";
	 hk.peroption_new_psw = "請輸入新密碼，6-30位字符";
	 en.peroption_new_psw = "Please enter password which includes 6 to 30 characters";
	 
	 sc.peroption_new_psw_confirm = "请确认新密码";
	 hk.peroption_new_psw_confirm = "請確認新密碼";
	 en.peroption_new_psw_confirm = "Please confirm new password";
	 
	 sc.peroption_new_psw_not_match = "输入的两次新密码不一致";
	 hk.peroption_new_psw_not_match = "輸入的兩次新密碼不一致";
	 en.peroption_new_psw_not_match = "The passwords you have entered must be consistent";
	 
	 sc.peroption_sender_signature_limit = "寄件签名10位以下";
	 hk.peroption_sender_signature_limit = "寄件簽名10位以下";
	 en.peroption_sender_signature_limit = "The sender’s signature should be within 10 characters";
	 
	 sc.peroption_recipient_id_limit = "收件员工号10位以下";
	 hk.peroption_recipient_id_limit = "收件員工號10位以下";
	 en.peroption_recipient_id_limit = "Courier ID should be within 10 characters"; 

	 sc.peroption_nobind = "您尚未绑定手机号或者电子邮箱，请致电顺丰客服4008111111，帮您找回密码。";
	 hk.peroption_nobind = "您尚未綁定手機號或者電子郵箱，請致電順豐客服4008111111，幫您找回密碼";
	 en.peroption_nobind = "You are not bound phone no. or e-mail,please call 4008111111 for find your password, thank you.";
	 //在之前i18n.js中找到遗漏的，补上
	 hk.pswchange_old_psw = "請輸入原密碼";
	 /////////////////////////////////////
	 sc.peroption_psw_wrong = "原密码不正确，请重新输入";
	 hk.peroption_psw_wrong = "原密碼不正確，請重新輸入";
	 en.peroption_psw_wrong = "The original password is incorrect, please enter again";
	 
	 sc.peroption_save_or_not = "是否保存设置？";
	 hk.peroption_save_or_not = "是否保存設置？";
	 en.peroption_save_or_not = "Save the settings?";
	 
	 sc.peroption_save_success = "保存成功！";
	 hk.peroption_save_success = "保存成功！";
	 en.peroption_save_success = "Saved successfully!";
	//end by 庄佳钊

	//add by 王煊 2013-10-25

	sc.errorLoding = "加载出错";
	hk.errorLoding = "加載出錯";
	en.errorLoding = "Loading error";
	sc.recipients_phone_error = "收件人电话输入有误";
	hk.recipients_phone_error = "收件人電話輸入有誤";
	en.recipients_phone_error = "Wrong receiver’s telephone no.";
	sc.sender_phone_error = "寄件人电话输入有误";
	hk.sender_phone_error = "寄件人電話輸入有誤";
	en.sender_phone_error = "Wrong sender’s telephone no.";
	sc.waybill_when = "时间";
	hk.waybill_when = "時間";
	en.waybill_when = "time";
	sc.waybill_place = "当前地点";
	hk.waybill_place = "當前地點";
	en.waybill_place = "current location";
	sc.waybill_without_statusInfo = "无此运单状态信息";
	hk.waybill_without_statusInfo = "無此運單狀態信息";
	en.waybill_without_statusInfo = "No waybill info";	
	sc.waybill_routing = "运单路由";
	hk.waybill_routing = "運單路由";
	en.waybill_routing = "Route of shipment"; 
	sc.back = "返回";
	hk.back = "返回";
	en.back = "return";

	sc.waybill_number_tips = "最多输入20个运单号码，系统会自动为您以;号隔开";
	hk.waybill_number_tips = "最多輸入20個運單號碼，系統會自動為您以;號隔開";
	en.waybill_number_tips = "Please enter up to 20 waybill no, a “;” will be used for seperating the numbers automatically by the system."; 
	sc.waybill_number_empty = "运单号不能为空，至少要一个运单号";
	hk.waybill_number_empty = "運單號不能為空，至少要一個運單號";
	en.waybill_number_empty = "At least one set of waybill no. should be filled in";
	sc.waybill_number_exceeded = "运单号不能超过20个";
	hk.waybill_number_exceeded = "運單號不能超過20個";
	en.waybill_number_exceeded = "Should not enter more than 20 sets of waybill no."; 
	sc.waybill_length_constraint = "输入的第%count%个快件单号长度必须等于12";
	hk.waybill_length_constraint = "輸入的第%count%個快件單號長度必須等於12";
	en.waybill_length_constraint = "The %count% waybill no. should be equal to 12 characters";	
	sc.waybill_character_constraint = "输入的第%count%个快件单号必须是数字,且为半角输入法";
	hk.waybill_character_constraint = "輸入的第%count%個快件單號必須是數字,且為半角輸入法";
	en.waybill_character_constraint = "The %count% waybill no. should be numeric and in half-width input method";
	sc.waybill_select_at_least_one = "请选择至少一条记录。";
	hk.waybill_select_at_least_one = "請選擇至少一條記錄。";
	en.waybill_select_at_least_one = "Please select at least one record.";
	sc.waybill_delete_confirmation = "确定删除已选中的所有快件历史";
	hk.waybill_delete_confirmation = "確定刪除已選中的所有快件歷史";
	en.waybill_delete_confirmation = "Confirm to delete all the shipment history";
	sc.waybill_praise = "好评";
	hk.waybill_praise = "好評";
	en.waybill_praise = "Good";
	sc.waybill_getaway_reviews = "中评";
	hk.waybill_getaway_reviews = "中評";
	en.waybill_getaway_reviews = "Normal";
	sc.waybill_bad_reviews = "差评";
	hk.waybill_bad_reviews = "差評";
	en.waybill_bad_reviews = "Bad reviews";

	sc.waybill_view_details = "查看详细";
	hk.waybill_view_details = "查看詳細";
	en.waybill_view_details = "View Details";
	sc.waybill_subscribe_email = "订阅邮件";
	hk.waybill_subscribe_email = "訂閱郵件";
	en.waybill_subscribe_email = "Email subscribe"; 
	sc.waybill_sender = "寄件人";
	hk.waybill_sender = "寄件人";
	en.waybill_sender = "Sender";
	sc.waybill_recipients = "收件人";
	hk.waybill_recipients = "收件人";
	en.waybill_recipients = "Receiver";
	sc.waybill_no_history = "您还没有快件追踪历史记录";
	hk.waybill_no_history = "您還沒有快件追踪歷史記錄";
	en.waybill_no_history = "No shipment tracking history";
	sc.waybill_registration = "注册";
	hk.waybill_registration = "註冊";
	en.waybill_registration = "Register";

	sc.waybill_tips = "温馨提示";
	hk.waybill_tips = "溫馨提示";
	en.waybill_tips = "Tips";
	sc.waybill_log_tips = "注册并登录后即可追踪快件和查看快件追踪历史。如果您已注册，请<a class=\"unl\" onClick=\"javascript:login();\">登录</a>；如果您还没有注册，请先";
	hk.waybill_log_tips = "註冊並登錄後即可追踪快件和查看快件追踪歷史。如果您已註冊，請<a class=\"unl\" onClick=\"javascript:login();\">登錄</a>；如果您還沒有註冊，請先";
	en.waybill_log_tips = "You can track shipment status after registeration. If you have registered, please <a class=\"unl\" onClick=\"javascript:login();\">login</a>; if you have not registered, please";

	sc.waybill_internal_promotions_pieces = "内部优惠件";
	hk.waybill_internal_promotions_pieces = "內部優惠件";
	en.waybill_internal_promotions_pieces = "Internal promotional shipment";
	sc.waybill_internal_parts = "公司件";
	hk.waybill_internal_parts = "公司件";
	en.waybill_internal_parts = "Internal shipment";
	sc.waybill_stubs = "顺<br />丰<br />存<br />根";
	hk.waybill_stubs = "順<br />豐<br />存<br />根";
	en.waybill_stubs = "SF<br />stubs";
	sc.waybill_send_payment = "寄付";
	hk.waybill_send_payment = "寄付";
	en.waybill_send_payment = "Prepaid";
	sc.waybill_to_pay = "到付";
	hk.waybill_to_pay = "到付";
	en.waybill_to_pay = "Collect";
	sc.waybill_third_payment = "第三方付";
	hk.waybill_third_payment = "第三方付";
	en.waybill_third_payment = "Paid by third party";
	sc.waybill_standard_express = "标准快件";
	hk.waybill_standard_express = "標準快件";
	en.waybill_standard_express = "Standard express";
	sc.waybill_SF_specials = "顺丰特惠";
	hk.waybill_SF_specials = "順豐特惠";
	en.waybill_SF_specials = "S.F. economic shipment";
	sc.waybill_general_cargo = "普货";
	hk.waybill_general_cargo = "普貨";
	en.waybill_general_cargo = "Bulky shipment";
	sc.waybill_pick_up_pieces = "自取件";
	hk.waybill_pick_up_pieces = "自取件";
	en.waybill_pick_up_pieces = "Self-pickup shipment";
	sc.waybill_third_region = "第三方地区";
	hk.waybill_third_region = "第三方地區";
	en.waybill_third_region = "Third Party district code";
	sc.waybill_declared_value = "声明价值";
	hk.waybill_declared_value = "聲明價值";
	en.waybill_declared_value = "Declared Value";
	
	
	sc.invoice_type = "发票类型";
	hk.invoice_type = "發票類型";
	en.invoice_type = "Invoice type";
	
	
	sc.express_value_error = "快件价值过高, 不能收件";
	hk.express_value_error = "快件價值過高, 不能收件";
	en.express_value_error = "The shipment value is too high, no pick up service";
	

	sc.order_commit_error = "提交数据有误，请修改后再提交";
	hk.order_commit_error = "提交數據有誤，請修改後再提交";
	en.order_commit_error = "Data error, please modify and submit again";
	sc.order_sender_invalid = "请输入寄件人姓名";
	hk.order_sender_invalid = "請輸入寄件人姓名";
	en.order_sender_invalid = "Please enter sender’s name";
	sc.order_extension_number_invalid = "请输入正确的分机号";
	hk.order_extension_number_invalid = "請輸入正確的分機號";
	en.order_extension_number_invalid = "Please enter correct extension";
	sc.order_areacode_invalid = "请输入正确的区号";
	hk.order_areacode_invalid = "請輸入正確的區號";
	en.order_areacode_invalid = "Please enter correct area code";
	sc.order_province_invalid = "请选择省份";
	hk.order_province_invalid = "請選擇省份";
	en.order_province_invalid = "Please select province";
	sc.order_city_invalid = "请选择城市";
	hk.order_city_invalid = "請選擇城市";
	en.order_city_invalid = "Please select city";
	sc.order_area_invalid = "请选择区域";
	hk.order_area_invalid = "請選擇區域";
	en.order_area_invalid = "Please select area";	

	sc.order_nation_Inland = "中国";
	hk.order_nation_Inland = "中國";
	en.order_nation_Inland = "China";
	sc.order_confirm_cancel = "确定取消吗?";
	hk.order_confirm_cancel = "確定取消嗎?";
	en.order_confirm_cancel = "Confirm to cancel?";
	sc.order_area_nanshan = "南山区";
	hk.order_area_nanshan = "南山區";
	en.order_area_nanshan = "NanShan";
	sc.order_area_futian = "福田区";
	hk.order_area_futian = "福田區";
	en.order_area_futian = "FuTian";
	sc.order_other_expenses = "请填写其它费用";
	hk.order_other_expenses = "請填寫其他費用";
	en.order_other_expenses= "Please fill in other expenses";
	sc.order_numbers_range = "其它费用只能是1-99之间的整数";
	hk.order_numbers_range = "其他費用只能是1-99之間的整數";
	en.order_numbers_range = "Other expense can only be an integer number between 1-9";
	sc.ragion_hk = "香港";
	hk.ragion_hk = "香港";
	en.ragion_hk = "HongKong";
	sc.ragion_ma = "澳门";
	hk.ragion_ma = "澳門";
	en.ragion_ma = " Macau";
	sc.ragion_tw = "台湾";
	hk.ragion_tw = "台灣";
	en.ragion_tw = "Taiwan";
	sc.ragion_blank = "请选择国家/地区";
	hk.ragion_blank = "請選擇國家/地區";
	en.ragion_blank = " Please select country/ region"; 
	sc.ragion_cn = "中国大陆";
	hk.ragion_cn = "中國大陸";
	en.ragion_cn = "China";

	sc.choose_region = "请先选择收/寄件国家或地区";
	hk.choose_region = "請先選擇收/寄件國家或地區";
	en.choose_region = "Please select country/ region for receiving/ sending out shipment";

	sc.cnMobileFormat = "请填写正确的大陆手机号";
	hk.cnMobileFormat = "請填寫正確的大陸手機號碼";
	en.cnMobileFormat = " Please fill in correct mobile no. in Mainland China "; 
	
	sc.hkMobileFormat = "请填写正确的香港手机号";
	hk.hkMobileFormat = "請填寫正確的香港手機號碼";
	en.hkMobileFormat = " Please fill in correct mobile no. in Hong Kong";
	
	sc.mcMobileFormat = "请填写正确的澳门手机号";
	hk.mcMobileFormat = "請填寫正確的澳門手機號碼";
	en.mcMobileFormat = " Please fill in correct mobile no. in Macau";

	sc.twMobileFormat = "请填写正确的台湾手机号";
	hk.twMobileFormat = "請填寫正確的台灣手機號碼";
	en.twMobileFormat = " Please fill in correct mobile no. in Taiwan";

    sc.cnPhoneFormat = "请填写正确的大陆座机号";
    hk.cnPhoneFormat = "請填寫正確的大陸座機號";
    en.cnPhoneFormat = " Please fill in correct telephone no. in Mainland China";
    
    sc.hkPhoneFormat = "请填写正确的香港座机号";
    hk.hkPhoneFormat = "請填寫正確的香港座機號";
    en.hkPhoneFormat = " Please fill in correct telephone no. in Hong Kong";
    
    sc.mcPhoneFormat = "请填写正确的澳门座机号";
    hk.mcPhoneFormat = "請填寫正確的澳門座機號";
    en.mcPhoneFormat = " Please fill in correct telephone no. in Macau";
    
    sc.twPhoneFormat = "请填写正确的台湾座机号";
    hk.twPhoneFormat = "請填寫正確的台灣座機號";
    en.twPhoneFormat = " Please fill in correct telephone no. in Taiwan";
    
    sc.enter_right_mobile_num = "请输入正确的手机号码";
    hk.enter_right_mobile_num = "請輸入正確的手機號碼";
    en.enter_right_mobile_num = "Please enter correct mobile no.";
    
	sc.order_contract='<div style="line-height:22px;"><div style="margin-left:200px;font-weight: bold;font-size: 16px;">《快件运单契约条款》</div>'+
			'<div style="font-weight: bold;">1、特别声明：寄件人托运价值超过2万元的贵重物品的，应当在托运时向本公司声明。寄</div>'+
			'<div style="margin-left:19px;font-weight: bold;">件人未声明的，该物品毁损、灭失后，本公司有权按照不超过2万元的一般物品予以赔</div>'+
			'<div style="margin-left:19px;font-weight: bold;">偿。</div>'+
			'<div>2、为保证货物安全送达，寄件人办理托运时须承担以下义务：</div>'+
			'<div style="margin-left:19px;">（1）如实申报托寄物内容和价值，并准确、清楚地填写寄件人、收件人的名称、地址、联</div>'+
			'<div style="margin-left:19px;">系电话等资料；</div>'+
			'<div style="margin-left:19px;">（2）本公司为集货混装运输，寄件人应根据托寄物的性质（尤其是易碎品），提供充分的防</div>'+
			'<div style="margin-left:19px;">破损措施，保障安全运输。</div>'+
			'<div>3、关于费用和发票的约定：</div>'+
			'<div style="margin-left:19px;">（1）已经发运的到付快件，如收件人尚未付费，寄件人要求更改为寄件人付费的，需要支</div>'+
			'<div style="margin-left:19px;">付额外服务费。该服务费标准以本公司在官方网站上的公布价格为准。</div>'+
			'<div style="margin-left:19px;">（2）寄件人指示在物流中心、保税区等需要支付出/入仓费或其他额外费用的特殊地址收取</div>'+
			'<div style="margin-left:19px;">或派送快件时，寄件人或其指定付款人应当偿还本公司垫付的上述出/入仓费等额外费</div>'+
			'<div style="margin-left:19px;">用，并向本公司支付附加服务费。附加服务费标准以本公司在官方网站上的公布价格</div>'+
			'<div style="margin-left:19px;">为准。</div>'+
			'<div style="margin-left:19px;">（3）无法派送的托寄物，若寄件人要求退回，则双程费用均由寄件人承担。</div>'+
			'<div style="margin-left:19px;">（4）本公司在向月结客户收取月结款时提供发票；有发票需求的散单客户，请在付款后1</div>'+
			'<div style="margin-left:19px;">个月内持运单原件向本公司索取发票。</div>'+
			'<div style="font-weight: bold;">4、若因本公司原因造成托寄物毁损、灭失的，本公司将免除本次运费。若寄件人未选择保</div>'+
			'<div style="margin-left:19px;font-weight: bold;">价或特安，则本公司对月结客户在不超过运费九倍的限额内、对非月结客户在不超过运</div>'+
			'<div style="margin-left:19px;font-weight: bold;">费七倍的限额内赔偿托寄物的实际损失。若寄件人已选择保价或特安，则本公司按照投</div>'+
			'<div style="margin-left:19px;font-weight: bold;">保金额予以赔偿。若托寄物仅有部分损失，则按照损失比例赔偿。</div>'+
			'<div style="color:red">5、对于签单返还服务，若因本公司原因导致签收回单毁损、灭失的，本公司将免费提供一</div>'+
			'<div style="margin-left:19px;color:red">次签单返还服务作为赔偿。</div>'+
			'<div>6、本契约条款未作约定的，或本契约条款与国家相关法律法规及标准相冲突的，按照相关</div>'+
			'<div style="margin-left:19px;">规定执行。</div></div>';
	/*hk.order_contract='<div style="line-height:22px;"><div style="margin-left:200px;font-weight: bold;font-size: 16px;">《快件運單契約條款》</div>' +
			'<div style="font-weight: bold;">1、特別聲明：寄件人托運價值超過2萬元的貴重物品的，應當在托運時向本公司聲明。寄</div>'+
			'<div style="margin-left:19px;font-weight: bold;">件人未聲明的，該物品毀損、滅失後，本公司有權按照不超過2萬元的一般物品予以賠</div>'+
			'<div style="margin-left:19px;font-weight: bold;">償。 </div>'+
			'<div>2、為保證貨物安全送達，寄件人辦理托運時須承擔以下義務：</div>'+
			'<div style="margin-left:19px;">（1）如實申報託寄物內容和價值，並準確、清楚地填寫寄件人、收件人的名稱、地址、聯</div>' +
			'<div style="margin-left:19px;">系電話等資料；</div>'+
			'<div style="margin-left:19px;">（2）本公司為集貨混裝運輸，寄件人應根據託寄物的性質（尤其是易碎品），提供充分的防</div>'+
			'<div style="margin-left:19px;">破損措施，保障安全運輸。 </div>'+
			'<div>3、關於費用和發票的約定：</div>'+
			'<div style="margin-left:19px;">（1）已經發運的到付快件，如收件人尚未付費，寄件人要求更改為寄件人付費的，需要支</div>' +
			'<div style="margin-left:19px;">付額外服務費。該服務費標準以本公司在官方網站上的公佈價格為準。 </div>'+
			'<div style="margin-left:19px;">（2）寄件人指示在物流中心、保稅區等需要支付出/入倉費或其他額外費用的特殊地址收取</div>'+
			'<div style="margin-left:19px;">或派送快件時，寄件人或其指定付款人應當償還本公司墊付的上述出/入倉費等額外費</div>'+
			'<div style="margin-left:19px;">用，並向本公司支付附加服務費。附加服務費標準以本公司在官方網站上的公佈價格</div>'+
			'<div style="margin-left:19px;">為準。 </div>'+
			'<div style="margin-left:19px;">（3）無法派送的託寄物，若寄件人要求退回，則雙程費用均由寄件人承擔。 </div>'+
			'<div style="margin-left:19px;">（4）本公司在向月結客戶收取月結款時提供發票；有發票需求的散單客戶，請在付款後1</div>' +
			'<div style="margin-left:19px;">個月內持運單原件向本公司索取發票。 </div>'+
			'<div style="font-weight: bold;">4、若因本公司原因造成託寄物毀損、滅失的，本公司將免除本次運費。若寄件人未選擇保</div>'+
			'<div style="margin-left:19px;font-weight: bold;">價或特安，則本公司對月結客戶在不超過運費九倍的限額內、對非月結客戶在不超過運</div>'+
			'<div style="margin-left:19px;font-weight: bold;">費七倍的限額內賠償託寄物的實際損失。若寄件人已選擇保價或特安，則本公司按照投</div>'+
			'<div style="margin-left:19px;font-weight: bold;">保金額予以賠償。若託寄物僅有部分損失，則按照損失比例賠償。 </div>'+
			'<div style="c​​olor:red">5、對於簽單返還服務，若因本公司原因導致簽收回單毀損、滅失的，本公司將免費提供一</div>'+
			'<div style="margin-left:19px;color:red">次簽單返還服務作為賠償。 </div>'+
			'<div>6、本契約條款未作約定的，或本契約條款與國家相關法律法規及標準相衝突的，按照相關</div>'+
			'<div style="margin-left:19px;">規定執行。 </div></div>';*/
	hk.order_contract='<div style="line-height:22px;height:600px;overflow-y:auto;font-family:Arial;"><div style="margin-left:200px;font-weight: bold;font-size: 16px;">Terms and Conditions</div>'+
			'<div style="font-weight: bold;">1. Definitions</div>'+
			'<div style="margin-left:21px;">●   On this Waybill, “SF” refers to S.F. Express Group Co., Ltd., its subsidiaries and branches, and their respective employees, agents and independent contractors.</div>'+
			'<div style="margin-left:21px;">●   If your shipment originates outside China, your contract of carriage is with the SF subsidiary, branch or independent contractor who originally accepts the Shipment from you.</div>'+
			'<div style="margin-left:21px;">●   “Package” means any container or envelope that is accepted by SF for delivery.  “Shipment” means all packages which are tendered to and accepted by SF on a single Waybill.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">2. Unacceptable Shipments</div>'+
			'<div style="margin-left:17px;">Shipper agrees that its Shipment is acceptable for transportation and is deemed unacceptable if:</div>'+
			'<div style="margin-left:21px;">●   It is classified as hazardous material, dangerous goods, prohibited or restricted articles by IATA (International Air Transportation Association), ICAO (International Civil Aviation Organization), any applicable government department or other relevant organization;</div>'+
			'<div style="margin-left:21px;">●   no customs de3claration is made when required by applicable customs regulations; or</div>'+
			'<div style="margin-left:21px;">●   SF believes it cannot transport an item safely or legally (such items included but are not limited to: animals, currency, bearer form negotiable instruments, precious metals and stones, firearms, parts thereof and ammunition, human remains, pornography and illegal narcotics/drugs).</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">3. Right to Inspect</div>'+
			'<div style="margin-left:21px;">●   Your Shipment may, at our option or at the request of government authorities, be opened and inspected by us or such authorities at any time.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">4. Shipper’s Warranties and Indemnity</div>'+
			'<div style="margin-left:17px;">Shipper shall indemnify and hold SF harmless from any losses or damages, arising out of Shipper’s failure to comply with any applicable laws or regulations and for Shipper’s breach of any of the following warranties and representations:</div>'+
			'<div style="margin-left:21px;">●   all information provided by Shipper or its representatives is complete and accurate;</div>'+
			'<div style="margin-left:21px;">●   the Shipment was prepared in secure premises by Shipper’s employees;</div>'+
			'<div style="margin-left:21px;">●   Shipper employed reliable staff to prepare the Shipmen</div>'+
			'<div style="margin-left:21px;">●   Shipper protected the Shipment against unauthorized interference during preparation, storage and transportation to SF;</div>'+
			'<div style="margin-left:21px;">●  the Shipment is properly and accurately marked, described and addressed and packed to ensure safe transportation by SF with ordinary care in handling; </div>'+
			'<div style="margin-left:21px;">●  all applicable customs, import, export and other laws and regulations have been complied with; and</div>'+
			'<div style="margin-left:21px;">●  this Waybill has been signed by Shipper’s authorized representative and the Terms and Conditions constitute binding and enforceable obligations of Shipper. </div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">5. Declared Value Limits</div>'+
			'<div style="margin-left:17px;">Shipper agrees the Declared Value for Customs on this Waybill is equivalent to the actual cash value of the Shipment while the actual cash value of the Shipment shall not exceed the local currency equivalent of UNITED STATES DOLLARS FIVE THOUSAND (USD5,000.00)</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">6. Transport and Routing</div>'+
			//'<div style="margin-left:17px;">SF may perform any of the following activities on Shipper’s behalf in order to provide services to Shipper.</div>'+
			'<div style="margin-left:21px;">●   SF can hire independent contractors to complete the transportation and other services. Both SF and its contractors represent themselves, their employees, agents and its sub-contractors. All of them can take the rights and interests from this clause, and none of them has the rights to abandon or change this clause.</div>'+
			'<div style="margin-left:21px;">●   A waybill only contains one shipment.</div>'+
			'<div style="margin-left:21px;">●   SF has the rights to choose the applicable site to transfer the Shipment.</div>'+
			'<div style="margin-left:21px;">●   Unless there is any other written agreement while picking-up, the services SF can provide only be limited to pick-up, dispatch, transport, customs clearance if necessary.</div>'+
			'<div style="margin-left:21px;">●   Shipper agrees their shipment to be transported together with other shipments, and SF may not be in full control toward a single shipment in all facilities. </div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">7. Customs, Exports and Imports</div>'+
			'<div style="margin-left:17px;">SF may perform any of the following activities on Shipper’s behalf in order to provide services to Shipper：</div>'+
			'<div style="margin-left:21px;">●   complete any document, amend product and service codes, and pay any duties and taxes required under applicable laws and regulations,</div>'+
			'<div style="margin-left:21px;">●   act as Shipper’s forwarding agent for customs and export control purposes and as Receiver solely for the purpose of designating a customs broker to perform customs clearance and entry and</div>'+
			'<div style="margin-left:21px;">●   redirect the Shipment to Receiver’s import broker or other address upon request by any person who SF believes in its reasonable opinion to be authorized.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">8. Delay of Shipments</div>'+
			'<div style="margin-left:17px;">●   SF will make every reasonable effort to deliver the Shipment according to SF’s regular delivery schedules, but these are not guaranteed and do not form part of the contract. SF is not liable for any damage or loss caused by delays.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">9. Deliveries and Undeliverable</div>'+
			'<div style="margin-left:21px;">●   Shipments cannot be delivered to PO boxes or postal codes. Shipments are delivered to the Receiver’s address given by Shipper, but not necessarily to the named Receiver personally. </div>'+
			'<div style="margin-left:21px;">●   Shipments to addresses with a central receiving area will be delivered to that area. If Receiver refuses delivery or to pay for delivery, or the Shipment is deemed to be unacceptable, or it has been undervalued for customs purposes, or Receiver cannot be reasonably identified or located, SF shall use reasonable efforts to return the Shipment to Shipper at Shipper’s cost, failing which the shipment may be released, disposed of or sold by SF without incurring any liability whatsoever to Shipper or anyone else, with the proceeds applied against service charges and related administrative costs and the balance of the proceeds of a sale to be returned to Shipper.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">10. Shipment Charges & Billing</div>'+
			'<div style="margin-left:21px;">●   SF’s Shipment charges are calculated according to the higher of actual or volumetric weight and any Shipment may be re-weighted and re-measured by SF to confirm this calculation. </div>'+
			'<div style="margin-left:21px;">●   Even if Shipper gives us different payment instructions, Shipper will always be primarily responsible for all charges. Shipper shall pay on demand all shipping or other charges not paid when due by Receiver, in the case of Receiver billing, or by the third party, in the case of third party billing. If SF is required to pay any taxes, duties as levies on behalf of the Shipper, Receiver or some other party, and SF is unable to recover such amount on request from the relevant person, that amount will be payable by the Shipper on demand. </div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">11. Circumstances beyond SF’s Control</div>'+
			'<div style="margin-left:17px;">SF is not liable for any loss or damage arising out of circumstances beyond SF’s control. These include but are not limited to:-"Act of God"- e.g. earthquake, cyclone, storm, flood, fog; "Force Majeure" –e.g. war, plane crash or embargo; any defect or characteristic related to the nature of the Shipment, even if known to SF; riot or civil commotion; any act or omission by a person not employed or contracted by SF e.g. Shipper, Receiver, third party, customs or other government official; industrial action; and electrical or magnetic damage to, or erasure of, electronic or photographic images, data or recordings</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">12. SF’s liability</div>'+
			'<div style="margin-left:21px;">●   SF contracts with Shipper on the basis that SF’s liability is strictly limited to direct loss only and to the per kilo/lb limits in this Section. All other types of loss or damage are excluded (including but not limited to lost profits, income, interest, future business), whether such loss or damage is special or indirect, and even if the risks of such loss or damage was brought to SF’s attention before or after acceptance of the Shipment since special risks can be insured by Shipper.</div>'+
			'<div style="margin-left:21px;">●   SF’s liability under a waybill, inter alia, arising out of or in connection with negligence, any act or omission, shall be limited to the stipulation of the following.</div>'+
			'<div style="margin-left:21px;">●   If a Shipment combines carriage by air, road or other mode of transport, it shall be presumed that any loss or damage occurred during the air period of such carriage unless proven otherwise. SF’s liability in respect of any one Shipment transported, without prejudice to Sections 8, 11, 13, 14, is limited to its actual cash value and shall not exceed the greater of $US 100 or;$US 20.00 /kilogram or $US 9.07/lb for Shipments transported by air or other non-road mode of transportation; or $US 10.00/ kilogram or $US 4.54/lb for Shipments transported by road (not applicable to the US).</div>'+
			'<div style="margin-left:21px;">●   Claims are limited to one claim per Shipment settlement of which will be full and final settlement for all loss or damage in connection therewith. If Shipper regards these limits as insufficient it must make its own insurance arrangements, failing which Shipper assumes all risks of loss or damage. All claims must be made in writing and within strict time limits. Unless contrary to applicable laws, all claims must be submitted in writing to SF within thirty (30) days from the date that SF accepted the Shipment, failing which SF shall have no liability whatsoever. Within ninety (90) days after written notification of the claim to SF it must be documented by delivery to SF all relevant supporting documentation. SF is not obligated to act on any claim until all transportation charges have been paid. The claim amount shall not be set off against such charges. If the Receiver accepts the Shipment without noting any damage on the delivery record, SF will assume the Shipment was delivered in good condition. SF will not consider any claim for damages unless the original shipping and packing materials are available for its inspection. SF makes no warranties, express or implied.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">13. International Conventions</div>'+
			'<div style="margin-left:17px;">If the Shipment is transported by air and involves an ultimate destination or stop in a country other than the country of departure, the Warsaw and Montreal Conventions and any of their subsequent amendments and protocols, if applicable, governs and in most cases limits SF’s liability for loss or damage. For international road transportation, the Convention for the International Carriage of Goods by Road (CMR) may apply. These conventions limit SF’s liability for loss or damage.</div>'+
			'<div style="font-weight: bold;">14. Governing Law</div>'+
			'<div style="margin-left:17px;">Any dispute arising under or in any way connected with these Terms and Conditions shall be subject, for the benefit of SF, to the non-exclusive jurisdiction of the courts of, and governed by the law of, the country of origin of the Shipment and Shipper irrevocably submits to such jurisdiction, unless contrary to applicable law.</div>'+
			'<div style="font-weight: bold;">15. Severability</div>'+
			'<div style="margin-left:17px;">The invalidity or unenforceability of any provision shall not affect any other part of these Terms and Conditions.</div>'+
			'<div style="font-weight: bold;">16. Governing Language</div>'+
			'<div style="margin-left:17px;">If there are different languages incorporated in this Waybill (including this Terms and Conditions), the English version shall always prevail in the event of any inconsistency.</div>'+
			'</div>';
	en.order_contract='<div style="line-height:22px;height:600px;overflow-y:auto;font-family:Arial;"><div style="margin-left:200px;font-weight: bold;font-size: 16px;">Terms and Conditions</div>'+
	'<div style="font-weight: bold;">1. Definitions</div>'+
	'<div style="margin-left:21px;">●   On this Waybill, “SF” refers to S.F. Express Group Co., Ltd., its subsidiaries and branches, and their respective employees, agents and independent contractors.</div>'+
	'<div style="margin-left:21px;">●   If your shipment originates outside China, your contract of carriage is with the SF subsidiary, branch or independent contractor who originally accepts the Shipment from you.</div>'+
	'<div style="margin-left:21px;">●   “Package” means any container or envelope that is accepted by SF for delivery.  “Shipment” means all packages which are tendered to and accepted by SF on a single Waybill.</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">2. Unacceptable Shipments</div>'+
	'<div style="margin-left:17px;">Shipper agrees that its Shipment is acceptable for transportation and is deemed unacceptable if:</div>'+
	'<div style="margin-left:21px;">●   It is classified as hazardous material, dangerous goods, prohibited or restricted articles by IATA (International Air Transportation Association), ICAO (International Civil Aviation Organization), any applicable government department or other relevant organization;</div>'+
	'<div style="margin-left:21px;">●   no customs de3claration is made when required by applicable customs regulations; or</div>'+
	'<div style="margin-left:21px;">●   SF believes it cannot transport an item safely or legally (such items included but are not limited to: animals, currency, bearer form negotiable instruments, precious metals and stones, firearms, parts thereof and ammunition, human remains, pornography and illegal narcotics/drugs).</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">3. Right to Inspect</div>'+
	'<div style="margin-left:21px;">●   Your Shipment may, at our option or at the request of government authorities, be opened and inspected by us or such authorities at any time.</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">4. Shipper’s Warranties and Indemnity</div>'+
	'<div style="margin-left:17px;">Shipper shall indemnify and hold SF harmless from any losses or damages, arising out of Shipper’s failure to comply with any applicable laws or regulations and for Shipper’s breach of any of the following warranties and representations:</div>'+
	'<div style="margin-left:21px;">●   all information provided by Shipper or its representatives is complete and accurate;</div>'+
	'<div style="margin-left:21px;">●   the Shipment was prepared in secure premises by Shipper’s employees;</div>'+
	'<div style="margin-left:21px;">●   Shipper employed reliable staff to prepare the Shipmen</div>'+
	'<div style="margin-left:21px;">●   Shipper protected the Shipment against unauthorized interference during preparation, storage and transportation to SF;</div>'+
	'<div style="margin-left:21px;">●  the Shipment is properly and accurately marked, described and addressed and packed to ensure safe transportation by SF with ordinary care in handling; </div>'+
	'<div style="margin-left:21px;">●  all applicable customs, import, export and other laws and regulations have been complied with; and</div>'+
	'<div style="margin-left:21px;">●  this Waybill has been signed by Shipper’s authorized representative and the Terms and Conditions constitute binding and enforceable obligations of Shipper. </div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">5. Declared Value Limits</div>'+
	'<div style="margin-left:17px;">Shipper agrees the Declared Value for Customs on this Waybill is equivalent to the actual cash value of the Shipment while the actual cash value of the Shipment shall not exceed the local currency equivalent of UNITED STATES DOLLARS FIVE THOUSAND (USD5,000.00)</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">6. Transport and Routing</div>'+
	//'<div style="margin-left:17px;">SF may perform any of the following activities on Shipper’s behalf in order to provide services to Shipper.</div>'+
	'<div style="margin-left:21px;">●   SF can hire independent contractors to complete the transportation and other services. Both SF and its contractors represent themselves, their employees, agents and its sub-contractors. All of them can take the rights and interests from this clause, and none of them has the rights to abandon or change this clause.</div>'+
	'<div style="margin-left:21px;">●   A waybill only contains one shipment.</div>'+
	'<div style="margin-left:21px;">●   SF has the rights to choose the applicable site to transfer the Shipment.</div>'+
	'<div style="margin-left:21px;">●   Unless there is any other written agreement while picking-up, the services SF can provide only be limited to pick-up, dispatch, transport, customs clearance if necessary.</div>'+
	'<div style="margin-left:21px;">●   Shipper agrees their shipment to be transported together with other shipments, and SF may not be in full control toward a single shipment in all facilities. </div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">7. Customs, Exports and Imports</div>'+
	'<div style="margin-left:17px;">SF may perform any of the following activities on Shipper’s behalf in order to provide services to Shipper：</div>'+
	'<div style="margin-left:21px;">●   complete any document, amend product and service codes, and pay any duties and taxes required under applicable laws and regulations,</div>'+
	'<div style="margin-left:21px;">●   act as Shipper’s forwarding agent for customs and export control purposes and as Receiver solely for the purpose of designating a customs broker to perform customs clearance and entry and</div>'+
	'<div style="margin-left:21px;">●   redirect the Shipment to Receiver’s import broker or other address upon request by any person who SF believes in its reasonable opinion to be authorized.</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">8. Delay of Shipments</div>'+
	'<div style="margin-left:17px;">●   SF will make every reasonable effort to deliver the Shipment according to SF’s regular delivery schedules, but these are not guaranteed and do not form part of the contract. SF is not liable for any damage or loss caused by delays.</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">9. Deliveries and Undeliverable</div>'+
	'<div style="margin-left:21px;">●   Shipments cannot be delivered to PO boxes or postal codes. Shipments are delivered to the Receiver’s address given by Shipper, but not necessarily to the named Receiver personally. </div>'+
	'<div style="margin-left:21px;">●   Shipments to addresses with a central receiving area will be delivered to that area. If Receiver refuses delivery or to pay for delivery, or the Shipment is deemed to be unacceptable, or it has been undervalued for customs purposes, or Receiver cannot be reasonably identified or located, SF shall use reasonable efforts to return the Shipment to Shipper at Shipper’s cost, failing which the shipment may be released, disposed of or sold by SF without incurring any liability whatsoever to Shipper or anyone else, with the proceeds applied against service charges and related administrative costs and the balance of the proceeds of a sale to be returned to Shipper.</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">10. Shipment Charges & Billing</div>'+
	'<div style="margin-left:21px;">●   SF’s Shipment charges are calculated according to the higher of actual or volumetric weight and any Shipment may be re-weighted and re-measured by SF to confirm this calculation. </div>'+
	'<div style="margin-left:21px;">●   Even if Shipper gives us different payment instructions, Shipper will always be primarily responsible for all charges. Shipper shall pay on demand all shipping or other charges not paid when due by Receiver, in the case of Receiver billing, or by the third party, in the case of third party billing. If SF is required to pay any taxes, duties as levies on behalf of the Shipper, Receiver or some other party, and SF is unable to recover such amount on request from the relevant person, that amount will be payable by the Shipper on demand. </div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">11. Circumstances beyond SF’s Control</div>'+
	'<div style="margin-left:17px;">SF is not liable for any loss or damage arising out of circumstances beyond SF’s control. These include but are not limited to:-"Act of God"- e.g. earthquake, cyclone, storm, flood, fog; "Force Majeure" –e.g. war, plane crash or embargo; any defect or characteristic related to the nature of the Shipment, even if known to SF; riot or civil commotion; any act or omission by a person not employed or contracted by SF e.g. Shipper, Receiver, third party, customs or other government official; industrial action; and electrical or magnetic damage to, or erasure of, electronic or photographic images, data or recordings</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">12. SF’s liability</div>'+
	'<div style="margin-left:21px;">●   SF contracts with Shipper on the basis that SF’s liability is strictly limited to direct loss only and to the per kilo/lb limits in this Section. All other types of loss or damage are excluded (including but not limited to lost profits, income, interest, future business), whether such loss or damage is special or indirect, and even if the risks of such loss or damage was brought to SF’s attention before or after acceptance of the Shipment since special risks can be insured by Shipper.</div>'+
	'<div style="margin-left:21px;">●   SF’s liability under a waybill, inter alia, arising out of or in connection with negligence, any act or omission, shall be limited to the stipulation of the following.</div>'+
	'<div style="margin-left:21px;">●   If a Shipment combines carriage by air, road or other mode of transport, it shall be presumed that any loss or damage occurred during the air period of such carriage unless proven otherwise. SF’s liability in respect of any one Shipment transported, without prejudice to Sections 8, 11, 13, 14, is limited to its actual cash value and shall not exceed the greater of $US 100 or;$US 20.00 /kilogram or $US 9.07/lb for Shipments transported by air or other non-road mode of transportation; or $US 10.00/ kilogram or $US 4.54/lb for Shipments transported by road (not applicable to the US).</div>'+
	'<div style="margin-left:21px;">●   Claims are limited to one claim per Shipment settlement of which will be full and final settlement for all loss or damage in connection therewith. If Shipper regards these limits as insufficient it must make its own insurance arrangements, failing which Shipper assumes all risks of loss or damage. All claims must be made in writing and within strict time limits. Unless contrary to applicable laws, all claims must be submitted in writing to SF within thirty (30) days from the date that SF accepted the Shipment, failing which SF shall have no liability whatsoever. Within ninety (90) days after written notification of the claim to SF it must be documented by delivery to SF all relevant supporting documentation. SF is not obligated to act on any claim until all transportation charges have been paid. The claim amount shall not be set off against such charges. If the Receiver accepts the Shipment without noting any damage on the delivery record, SF will assume the Shipment was delivered in good condition. SF will not consider any claim for damages unless the original shipping and packing materials are available for its inspection. SF makes no warranties, express or implied.</div>'+
	'<div>&nbsp;</div>'+
	'<div style="font-weight: bold;">13. International Conventions</div>'+
	'<div style="margin-left:17px;">If the Shipment is transported by air and involves an ultimate destination or stop in a country other than the country of departure, the Warsaw and Montreal Conventions and any of their subsequent amendments and protocols, if applicable, governs and in most cases limits SF’s liability for loss or damage. For international road transportation, the Convention for the International Carriage of Goods by Road (CMR) may apply. These conventions limit SF’s liability for loss or damage.</div>'+
	'<div style="font-weight: bold;">14. Governing Law</div>'+
	'<div style="margin-left:17px;">Any dispute arising under or in any way connected with these Terms and Conditions shall be subject, for the benefit of SF, to the non-exclusive jurisdiction of the courts of, and governed by the law of, the country of origin of the Shipment and Shipper irrevocably submits to such jurisdiction, unless contrary to applicable law.</div>'+
	'<div style="font-weight: bold;">15. Severability</div>'+
	'<div style="margin-left:17px;">The invalidity or unenforceability of any provision shall not affect any other part of these Terms and Conditions.</div>'+
	'<div style="font-weight: bold;">16. Governing Language</div>'+
	'<div style="margin-left:17px;">If there are different languages incorporated in this Waybill (including this Terms and Conditions), the English version shall always prevail in the event of any inconsistency.</div>'+
	'</div>';
	
	/*en.order_contract='<div style="line-height:22px;height:600px;overflow-y:auto"><div style="margin-left:200px;font-weight: bold;font-size: 16px;">Terms and Conditions</div>'+
			'<div style="font-weight: bold;">1. Definitions</div>'+
			'<div style="margin-left:21px;">●   On this Waybill, “SF” refers to S.F. Express Group Co., Ltd., its subsidiaries and branches, and their respective employees, agents and independent contractors.</div>'+
			'<div style="margin-left:21px;">●   If your shipment originates outside China, your contract of carriage is with the SF subsidiary, branch or independent contractor who originally accepts the Shipment from you.</div>'+
			'<div style="margin-left:21px;">●   “Package” means any container or envelope that is accepted by SF for delivery.  “Shipment” means all packages which are tendered to and accepted by SF on a single Waybill.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">2. Unacceptable Shipments</div>'+
			'<div style="margin-left:17px;">Shipper agrees that its Shipment is acceptable for transportation and is deemed unacceptable if:</div>'+
			'<div style="margin-left:21px;">●   It is classified as hazardous material, dangerous goods, prohibited or restricted articles by IATA (International Air Transportation Association), ICAO (International Civil Aviation Organization), any applicable government department or other relevant organization;</div>'+
			'<div style="margin-left:21px;">●   no customs de3claration is made when required by applicable customs regulations; or</div>'+
			'<div style="margin-left:21px;">●   SF believes it cannot transport an item safely or legally (such items included but are not limited to: animals, currency, bearer form negotiable instruments, precious metals and stones, firearms, parts thereof and ammunition, human remains, pornography and illegal narcotics/drugs).</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">3. Right to Inspect</div>'+
			'<div style="margin-left:21px;">●   Your Shipment may, at our option or at the request of government authorities, be opened and inspected by us or such authorities at any time.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">4. Shipper’s Warranties and Indemnity</div>'+
			'<div style="margin-left:17px;">Shipper shall indemnify and hold SF harmless from any losses or damages, arising out of Shipper’s failure to comply with any applicable laws or regulations and for Shipper’s breach of any of the following warranties and representations:</div>'+
			'<div style="margin-left:21px;">●   all information provided by Shipper or its representatives is complete and accurate;</div>'+
			'<div style="margin-left:21px;">●   the Shipment was prepared in secure premises by Shipper’s employees;</div>'+
			'<div style="margin-left:21px;">●   Shipper employed reliable staff to prepare the Shipmen</div>'+
			'<div style="margin-left:21px;">●   Shipper protected the Shipment against unauthorized interference during preparation, storage and transportation to SF;</div>'+
			'<div style="margin-left:21px;">●  the Shipment is properly and accurately marked, described and addressed and packed to ensure safe transportation by SF with ordinary care in handling; </div>'+
			'<div style="margin-left:21px;">●  all applicable customs, import, export and other laws and regulations have been complied with; and</div>'+
			'<div style="margin-left:21px;">●  this Waybill has been signed by Shipper’s authorized representative and the Terms and Conditions constitute binding and enforceable obligations of Shipper. </div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">5. Transport and Routing</div>'+
			'<div style="margin-left:17px;">SF can hire independent contractors to complete the transportation and other services provided to Shipper.  Both SF and its contractors represent themselves, their employees, agents and its sub-contractors. All of them can take the rights and interests from this clause, and none of them has the rights to abandon or change this clause.</div>'+
			'<div style="margin-left:21px;">●   A Waybill may contain only one shipment.</div>'+
			'<div style="margin-left:21px;">●   SF had the rights to choose the applicable site to transfer the Shipment,</div>'+
			'<div style="margin-left:21px;">●   Unless there is another agreement while picking-up, the services SF can provide only be limited in pick-up, dispatch, transport, customs clearance if necessary</div>'+
			'<div style="margin-left:21px;">●   Shipper agrees their shipment to be transported together with other shipments, and SF may not be in full control towards a single shipment in all facilities.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">6. Customs, Exports and Imports</div>'+
			'<div style="margin-left:17px;">SF may perform any of the following activities on Shipper’s behalf in order to provide services to Shipper.</div>'+
			'<div style="margin-left:21px;">●   Complete any document, amend product and service codes, and pay any duties and taxes required under applicable laws and regulations.</div>'+
			'<div style="margin-left:21px;">●   Act as Shipper’s forwarding agent for customs and export control purposes and as receiver solely for the purpose of designating a customs broker to perform customs clearance and entry, and</div>'+
			'<div style="margin-left:21px;">●   redirect the Shipment to Receiver’s import broker or other address upon request by any person who SF believes in its reasonable opinion to be authorized.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">7. Delay of Shipments</div>'+
			'<div style="margin-left:17px;">SF will make every reasonable efforts to deliver the Shipment according to SF’s regular delivery schedules, but these are <B>not guaranteed and do not form part of the contract</B>. SF is not liable for any damage or loss caused by delays.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">8. Deliveries and Undeliverable</div>'+
			'<div style="margin-left:21px;">●   Shipments cannot be delivered to PO boxes or postal codes.  Shipments are delivered to the Receiver’s address given by Shipper, but not necessarily to the named Receiver personally.</div>'+
			'<div style="margin-left:21px;">●   Shipments to addresses with a central receiving area will be delivered to that area.  If receiver refuses delivery or to pay for delivery, or the Shipment is deemed to be unacceptable, or it has been undervalued for customs purposes, or receiver cannot be reasonably identified or located, SF shall use reasonable efforts to return the Shipment to Shipper at Shipper’s cost, failing which the shipment may be released, disposed of or sold by SF without incurring any liability whatsoever to Shipper or anyone else, with the proceeds applied against service charges and related administrative costs and the balance of the proceeds of a sale to be returned to Shipper.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">9. Shipment Charges & Billing</div>'+
			'<div style="margin-left:21px;">●   SF’s Shipment charges are calculated according to the higher of actual or volumetric weight and any Shipment may be re-weighted and re-measured by SF to confirm this calculation. </div>'+
			'<div style="margin-left:21px;">●   Shipper shall pay for or reimburse SF for all Shipment charges, storage charges, duties and taxes owed services provided by SF or incurred by SF on Shipper’s or receiver’s or any third party’s behalf and all claims, damages, fines and expenses incurred if the Shipment is deemed unacceptable for transport as described in Section 2.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">10. Circumstances beyond SF’s Control</div>'+
			'<div style="margin-left:21px;">●   SF is not liable for any loss or damage, arising out of circumstances beyond SF’s control.  These include but are not limited to: - “Act of God” – e.g. earthquake, cyclone, storm, flood, fog; “Force Majeure” -- e.g. war, plane crash, or embargo, any defect or characteristic related to the nature of the Shipment, even if known to SF; riot or civil commotion; any act or omission by a person not employed or contracted by SF e.g. Shipper, receiver, third party, customs or other government official; industrial action; and electrical or magnetic damage to, or erasure of, electronic or photographic images, data or recordings.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">11. SF’s liability</div>'+
			'<div style="margin-left:21px;">●   SF contracts with Shipper on the basis that SF’s liability is strictly limited to direct loss only and to the per kilo/lb limits in this Section.  All other types of loss or damage are excluded (including but not limited to lost profits, income, interest, future business), whether such loss or damage is special or indirect, and even if the risks of such loss or damage were brought to SF’s attention before or after acceptance of the Shipment since special risks can be insured by Shipper at Shipper’s cost.</div>'+
			'<div style="margin-left:21px;">●   If a Shipment combines carriage by air, road or other mode of transport, it shall be presumed that any loss or damage occurred during the air period of such carriage unless proven otherwise.  SF’s liability in respect of any one Shipment transported, without prejudice to Sections 7, 10, 12, and 13, is limited to it’s actual cash value and shall not exceed the greater of $US 100 or; $US 20.00/kilogram or $US 9.07/lb for Shipments transported by air or other non-road mode of transportation; or $US 10.00/kilogram or $US 4.54/lb for Shipments transported by road (not applicable to the US).</div>'+
			'<div style="margin-left:21px;">●   Claims are limited to one claim per Shipment, settlement of which will be full and final settlement for all loss or damage in connection there with.  If Shipper regards these limits as insufficient it must make it own insurance arrangements at its expense, failing which Shipper assumes all risks of loss or damage.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">12. Warsaw Conventions</div>'+
			'<div style="margin-left:17px;">If the Shipment is transported by air and involves an ultimate destination or stop in a country other than the country of departure, the Warsaw Conventions, if applicable, govern and in most cases limit SF’s liability for loss or damage.</div>'+
			'<div>&nbsp;</div>'+
			'<div style="font-weight: bold;">13. Governing Law</div>'+
			'<div style="margin-left:21px;">●    Any dispute arising under or in any way connected with these Terms and Conditions shall be subject, for the benefit of SF, to the non-exclusive jurisdiction of the courts of, and governed by the laws of, the country of origin of the Shipment and Shipper irrevocably submits to such jurisdiction, unless contrary to applicable law. </div>'+
			'<div style="margin-left:21px;">●   The invalidity or unenforceability of any provision shall not affect any other part of these Terms and Conditions.</div></div>';
*/

	//end by 王煊 2013-10-25

	//add by wuxiaofan 2013-10-25 
	//login mode
	sc.login_code_wrong="验证码不正确";
	en.login_code_wrong="Wrong verification code";
	hk.login_code_wrong="驗證碼不正確";


	sc.disabled_user="账号已被禁用";
	en.disabled_user="User account is disabled";
	hk.disabled_user="帳號已被禁用";

	sc.login_error="登录出错";
	en.login_error="login error";
	hk.login_error="登錄出錯";

	sc.loginError_tryAgain = "登录出错,请稍后重试";
	en.loginError_tryAgain = "Login error. Please try again later";
	hk.loginError_tryAgain = "登錄出錯,請稍後重試";

	sc.psw_not_meet_rule_="密码不符合要求，请重新设置。";
	en.psw_not_meet_rule_="Invalid password. Please enter again";
	hk.psw_not_meet_rule_="密碼不符合要求，請重新設置。";


	sc.strength_psw_success = "密码修改成功，请重新登录";
	en.strength_psw_success = "Reset password success, please login again"; 
	hk.strength_psw_success = "密碼修改成功，請重新登錄";

	sc.email_validate_used_by_other_account = "对不起，该邮箱已经被绑定使用，请修改";
	hk.email_validate_used_by_other_account = "對不起，該郵箱已經被綁定使用，請修改";
	en.email_validate_used_by_other_account = "This email account has been registered. Please edit"; 

	sc.username_contain_blank="登录名不能包含空格";
	en.username_contain_blank="username should not contain blank";
	hk.username_contain_blank="登錄名不能包含空格";
	
	sc.password_contain_blank="密码不能包含空格";
	en.password_contain_blank="password should not contain blank";
	hk.password_contain_blank="密码不能包含空格";

	//公司注册

	sc.companyregist_Failed="登记注册失败";
	en.companyregist_Failed="Registration failed";
	hk.companyregist_Failed="登記註冊失敗";

	sc.companyregist_companyname_null="请填写公司名称";
	en.companyregist_companyname_null="Please enter company name";
	hk.companyregist_companyname_null="請填寫公司名稱";

	sc.companyregist_cardno_null="请填写月结账号";
	en.companyregist_cardno_null="Please enter credit account no."; 
	hk.companyregist_cardno_null="請填寫月結賬號";
   
	sc.companyregist_cardno_format_invalid="请填写正确的月结账号";
	en.companyregist_cardno_format_invalid="Please enter the correct credit account no.";
	hk.companyregist_cardno_format_invalid="請填寫正確的月結賬號";

	sc.companyregist_cardno_exist="月结账号未激活";
	en.companyregist_cardno_exist="Credit account no. is not activated"; 
	hk.companyregist_cardno_exist="月結賬號未啟動";
   
	sc.companyregist_cardno_used="月结账号已被登记注册";
	en.companyregist_cardno_used="Credit account no. has been registered by other users";
	hk.companyregist_cardno_used="月結賬號已被登陸註冊";

	sc.companyregist_linkman_null="请填写联系人";
	en.companyregist_linkman_null="Please enter contact person";
	hk.companyregist_linkman_null="請填寫聯繫人";

	sc.companyregist_cardno_used_redo="您的月结账号已被注册，是否重新注册";
	en.companyregist_cardno_used_redo="Your credit account no. has been registered. Do you want to register again?";
	hk.companyregist_cardno_used_redo="您的月結賬號已被登陸註冊，是否重新登陸註冊";

	sc.companyregist_cardno_used_approved_redo="您的月结账号已被登陆注册，并且已通过审核,是否重新登陆注册";
	en.companyregist_cardno_used_approved_redo="YYour credit account no. has been registered and approved. Do you want to register again?";
	hk.companyregist_cardno_used_approved_redo="您的月結賬號已被登陸註冊，並且已通過審核,是否重新登陸註冊";

	sc.cmpnySetPsw_save_failed = "保存失败";
	en.cmpnySetPsw_save_failed = "Failed to save";
	hk.cmpnySetPsw_save_failed = "保存失敗";

	sc.cmpnySetPsw_psw_null = "请填写密码";
	en.cmpnySetPsw_psw_null = "Please fill in the password";
	hk.cmpnySetPsw_psw_null = "請填寫密碼";


	sc.verifyType_choose = "请选择";
	en.verifyType_choose = "Please select";
	hk.verifyType_choose = "請選擇";

	sc.verifyType_none = "无";
	en.verifyType_none = "None";
	hk.verifyType_none = "無";


	sc.verifyType_mobile = "手机";
	en.verifyType_mobile = "Mobile no.";
	hk.verifyType_mobile = "手機";

	sc.verifyType_email = "邮箱";
	en.verifyType_email = "Email";
	hk.verifyType_email = "郵箱";

	sc.companyregist_cardno_confirm="请填写确认月结账号";
	en.companyregist_cardno_confirm="Please enter credit account no.";
	hk.companyregist_cardno_confirm="請填寫確認月結賬號";

	sc.companyregist_cardno_match = "月结账号两次填写不正确";
	en.companyregist_cardno_match = "Invalid credit account numbers entered";
	hk.companyregist_cardno_match = "月結賬號兩次填寫不正確";

	sc.verifyType_to_choose = "请选择验证方式";
	en.verifyType_to_choose = "Please select verification method";
	hk.verifyType_to_choose = "請選擇驗證方式";

	sc.verifyType_select_mobile = "请选择要验证的手机号";
	en.verifyType_select_mobile = "Please select mobile no. for verification";
	hk.verifyType_select_mobile = "請選擇要驗證的手機號";

	sc.verifyType_select_email = "请选择要验证的邮箱地址";
	en.verifyType_select_email = "Please select email address for verification";
	hk.verifyType_select_email = "請選擇要驗證的手機號";

	sc.order_areacode_style_wrong = "请填写正确的区号";
	en.order_areacode_style_wrong = "Please enter correct area code";
	hk.order_areacode_style_wrong = "請填寫正確的區號";


	sc.order_Ext_style_wrong = "请填写正确的分机号码";
	en.order_Ext_style_wrong = "Please fill in correct extension no.";
	hk.order_Ext_style_wrong = "請填寫正確的分機號碼";

	sc.contain_blank = "不能含有空格";
	en.contain_blank = "Cannot contain blank";
	hk.contain_blank = "不能含有空格";

	sc.cardno_only_num = "月结账号只能是数字";
	en.cardno_only_num = "Credit account no. can only be numeric";
	hk.cardno_only_num = "月結賬號只能是數字";

	sc.cardno_ten_digits = "只能是10位数字";
	en.cardno_ten_digits = "Only 10 digits";
	hk.cardno_ten_digits = "只能是10位數字";
	
	sc.order_packnum_emtry = "请填写包裹件数";
	en.order_packnum_emtry = "please input pack piece";
	hk.order_packnum_emtry = "請填寫包裹件數";
	
	sc.order_packnum_error = "包裹件数填写错误";
	en.order_packnum_error = "pack piece input error";
	hk.order_packnum_error = "包裹件數填寫錯誤";
	

	sc.cardno_invalid = "不是有效的月结账号";
	en.cardno_invalid = "Invalid credit account no.";
	hk.cardno_invalid = "不是有效的月結賬號";

	sc.provinces_data_obtain_failed = "后台获取省份数据失败，请重新获取";
	en.provinces_data_obtain_failed = "Data retrieve failed. Please try again";
	hk.provinces_data_obtain_failed = "後台獲取省份數據失敗，請重新獲取";

	//订单查询
	sc.beginTM_gt_endTM_error = "下单日期起始时间不能大于结束时间";
	en.beginTM_gt_endTM_error = " The time placing shipment should not later than the finished time.";
	hk.beginTM_gt_endTM_error = "下單日期起始時間不能大於結束時間";

	//orderSource
	sc.orderSource_android = "Android自助端下单";
	en.orderSource_android = "Placing order by Android Apps";
	hk.orderSource_android = "Android自助端下單";

	sc.orderSource_webserver_history = "网服历史数据订单";
	en.orderSource_webserver_history = " Order from web server history";
	hk.orderSource_webserver_history = "網服歷史數據訂單";

	sc.orderSource_webserver_sync = "网服同步数据订单";
	en.orderSource_webserver_sync = "Order from web server synchronized data";	
	hk.orderSource_webserver_sync = "網服同步數據訂單";

	sc.orderSource_weixin_order = "微信下单";
	en.orderSource_weixin_order = " Placing order by WeChat";
	hk.orderSource_weixin_order = "微信下單";

	sc.orderSource_web_order = "网上订单";
	en.orderSource_web_order = " Online Order"; 
	hk.orderSource_web_order = "網上訂單";

  //sfit0168 begin
	sc.order_number_invalid = "请输入托寄物名称";
	hk.order_number_invalid = "請輸入託寄物名稱"; 
	en.order_number_invalid = "Please fill in the shipment content";
	sc.order_weight_invalid = "请输入正确的托寄物的重量";
	hk.order_weight_invalid = "請輸入正確的託寄物的重量";
	en.order_weight_invalid = "Please fill in the weight of shipment";
	sc.order_weight_not_zero = "重量不能为0";
	hk.order_weight_not_zero = "重量不能為0";
	en.order_weight_not_zero = "weight is not right";
	
	sc.order_materialValue_invalid = "请输入正确的托寄物的价值";
	hk.order_materialValue_invalid = "請輸入正確的託寄物的價值";
	en.order_materialValue_invalid = "Please fill in the shipment value";
	
	sc.print_declareWay_Sea = "海运正式报关";
	hk.print_declareWay_Sea = "海運正式報關";
	en.print_declareWay_Sea = "Formal entry for sea shipment";
	sc.print_declareWay_Custom = "正式报关";
	hk.print_declareWay_Custom = "正式報關";
	en.print_declareWay_Custom = "Formal entry";
	sc.print_declareWay_Easy = "简易报关";
	hk.print_declareWay_Easy = "簡易報關";
	en.print_declareWay_Easy = "Informal entry";
	//海运
	sc.print_declareTeaWay = "海运";
	hk.print_declareTeaWay = "海運";
	en.print_declareTeaWay = "Sea Shipment";
	//寄方
	sc.print_send = "寄方";
	hk.print_send = "寄方";
	en.print_send = "Shipper";
	sc.print_rec = "收方";
	hk.print_rec = "收方";
	en.print_rec = "Receiver";
	//偏远
	sc.print_remote = "偏远";
	hk.print_remote = "偏遠";
	en.print_remote = "Remote area";
	// 非工商
	sc.print_Commerce = "非工商";
	hk.print_Commerce = "非工商";
	en.print_Commerce = "Non-industrial and commercial area";
	//所有附加费用均有寄方承担
	sc.print_Surcharge = "所有附加费用均有寄方承担";
	hk.print_Surcharge = "所有附加費用均有寄方承擔";
	en.print_Surcharge = "All surcharges are paid by shipper";
	//标准快件
	sc.waybill_HKMT_specials = "标准快件";
	hk.waybill_HKMT_specials = "標準快件";
	en.waybill_HKMT_specials = "Standard express";
	//手开发票
	sc.waybill_HKMT_invoce = "手开发票";
	hk.waybill_HKMT_invoce = "手開發票";
	en.waybill_HKMT_invoce = "Hand-write Invoice";
	
	//空
	sc.waybill_HKMT_blank = "空";
	hk.waybill_HKMT_blank = "空";
	en.waybill_HKMT_blank = "blank";
	
	//电子发票
	sc.waybill_HKMTD_invocet = "电子发票";
	hk.waybill_HKMTD_invocet = "電子發票";
	en.waybill_HKMTD_invocet = "e-invoice";
	
	sc.order_HKMT_checkPhone = "手机号码不符合所选手机区域";
	hk.order_HKMT_checkPhone = "手機號碼不符合所選手機區域";
	en.order_HKMT_checkPhone = "Mobile no. does not match with the selected district of mobile";
	
	
	sc.order_HKMT_checkAgree = "请勾选我同意协议";
	hk.order_HKMT_checkAgree = "請勾選我同意協議";
	en.order_HKMT_checkAgree = "Please tick I agree the agreement";
	//请优先选择地址
	sc.order_HKMT_checkAddress = "请优先选择地址";
	hk.order_HKMT_checkAddress = "請優先選擇位址";
	en.order_HKMT_checkAddress = "Please select the address";
	//寄
	sc.order_HKMT_send = "寄";
	hk.order_HKMT_send = "寄";
	en.order_HKMT_send = "Send";
	//到
	sc.order_HKMT_rec = "到";
	hk.order_HKMT_rec = "到";
	en.order_HKMT_rec = "To";
	//第三
	sc.order_HKMT_three = "第三";
	hk.order_HKMT_three = "第三";
	en.order_HKMT_three = "Three";
	//请选择预约小时时间
	sc.order_hour_reserve_time = "请选择预约小时时间";
	hk.order_hour_reserve_time = "請選擇預約小時時間";
	en.order_hour_reserve_time = "Please select the reservation time"; 
	//"数据库中的时间配置不正确"
	sc.order_Data_reserve_time = "数据库中的时间配置不正确";
	hk.order_Data_reserve_time = "資料庫中的時間配置不正確";
	en.order_Data_reserve_time = "Incorrect time setting"; 
	//"请先选择具体的哪一天"
	sc.order_Day_reserve_time = "请先选择具体的哪一天";
	hk.order_Day_reserve_time = "請先選擇具體的哪一天";
	en.order_Day_reserve_time = "Please select a specific date"; 
	//"寄付转第三方付"
	sc.order_HTMK_third_pay = "寄付转第三方付";
	hk.order_HTMK_third_pay = "寄付第三方付";
	en.order_HTMK_third_pay = "Change payment method to third party"; 
	//由于快件重量超过100kg，请致电客服热线下单或只可输99.5kg
	sc.order_weight_scope = "快件重量不能超过100kg，请致电客服热线下单";
	hk.order_weight_scope = "快件重量不能超過100kg，請致電客服熱線下單";
	en.order_weight_scope = "Shipment weight cannot exceed 100kg, please call CS hotline to place order";
	//所有
	sc.all = "所有";
	hk.all = "所有";
	en.all = "all";
	//(備註：最低服務費為港幣10元。)
	sc.secure_message_Hk = "(備註：最低服務費為港幣10元。)";
	hk.secure_message_Hk = "(備註：最低服務費為港幣10元。)";
	en.secure_message_Hk = "(Remark: With minimum service charge of HKD10)";
	//(備註：最低服務費為新台幣40元。)
	sc.secure_message_TW = "(備註：最低服務費為新台幣40元。)";
	hk.secure_message_TW = "(備註：最低服務費為新台幣40元。)";
	en.secure_message_TW = "(Remark: With minimum service charge of NTD40)";
  //sfit0168 end

	/*
	“;”隔开各项
	hotCity 代表需要查询热点城市
	根据父节点查询一次只能查询一个id
	根据子节点查询至少使用2个id，每个id用“，”隔开，只用一个时用“-1”填充
	A000086000 中国;A000710000 台湾;A000810000 香港;A000820000 澳门
	*/
	sc.address_send_rootPraent = "A000086000;hotCity";
	hk.address_send_rootPraent = "A000810000,A000820000";
	en.address_send_rootPraent = "A000810000,A000820000";

	sc.address_receive_rootPraent = "A000086000;hotCity";
	hk.address_receive_rootPraent = "A000810000,A000820000";
	en.address_receive_rootPraent = "A000810000,A000820000";

	sc.catchFromcolumn = "dist_cn_name";
	hk.catchFromcolumn = "dist_alias";
	en.catchFromcolumn = "dist_en_name";
	//end by wuxiaofan 2013-10-25


	//港澳台下单
	sc.need_input_line_cargo_info="请至少完整填写一行托寄物信息";
	hk.need_input_line_cargo_info="請至少完整填寫一行託寄物資訊";
	en.need_input_line_cargo_info="Please fill in shipment details";
	
	sc.need_fill_full="请完整填写第";
	hk.need_fill_full="請完整填寫第";
	en.need_fill_full=" Please fill in shipment contents of row ";

	sc.need_fill_full_or_not="行的托寄物信息或者完全不填写";
	hk.need_fill_full_or_not="行的託寄物資訊不完整";
	en.need_fill_full_or_not=" or fill in nothing";

	sc.prod_area_wrong="原产地格式不正确";
	hk.prod_area_wrong="原產地格式不正確";
	en.prod_area_wrong="Incorrect format of origin";

	sc.input_origin_prod_area="请输入原产地";
	hk.input_origin_prod_area="請輸入原產地";
	en.input_origin_prod_area="Please enter origin";
	
	sc.order_stop_time="的服务时间为：";
	en.order_stop_time="service time is:";
	hk.order_stop_time="的服務時間為：";
	
	
	sc.origin_prod_area="原产地：";
	hk.origin_prod_area="原產地：";
	en.origin_prod_area="origin：";
	
	
	sc.pack_sample="包裹-样品";
	hk.pack_sample="包裹-樣品";
	en.pack_sample="Parcel-sample";
	
	sc.pack_market="包裹-销售";
	hk.pack_market="包裹-銷售";
	en.pack_market="parcel-sale";
	
	sc.packages="包裹";
	hk.packages="包裹";
	en.packages="package";
	
	sc.other="其他";
	hk.other="其他";
	en.other="other";
	
	sc.express_type="快件类型：";
	hk.express_type="快件類型：";
	en.express_type="Shipment type:";
	
	
	sc.import_tax_payment="进口税支付方：";
	hk.import_tax_payment="進口稅支付方：";
	en.import_tax_payment="Bill duties & taxes to:";
	
	sc.official_customs_declaration="正式报关";
	hk.official_customs_declaration="正式報關";
	en.official_customs_declaration="Formal entry";
	
	sc.faraway_add_fee="偏远附加费：";
	hk.faraway_add_fee="偏遠附加費：";
	en.faraway_add_fee="Remote area surcharge:";
	
	sc.not_busincess_add_fee="非工商区附加费：";
	hk.not_busincess_add_fee="非工商區附加費：";
	en.not_busincess_add_fee="Non-industrial and commercial area surcharge:";
	
	sc.faraway_area="偏远地区";
	hk.faraway_area="偏遠地區";
	en.faraway_area="Remote area";
	
	sc.what_faraway_area="什么是偏远地区";
	hk.what_faraway_area="什麼是偏遠地區";
	en.what_faraway_area="waht is remote area";
	
	sc.add_fee="附加费：";
	hk.add_fee="附加費：";
	en.add_fee="Surcharges：";
	
	sc.not_busincess_area="非工商区";
	hk.not_busincess_area="非工商區";
	en.not_busincess_area="Non-industrial and commercial area";
	
	sc.what_not_busincess_area="什么是非工商区";
	hk.what_not_busincess_area="什麼是非工商區";
	en.what_not_busincess_area="What is Non-industrial and commercial area";
	
	sc.add_fee_pay_type="附加费付款方式：";
	hk.add_fee_pay_type="附加費付款方式：";
	en.add_fee_pay_type="Payment methods of surcharge";
	

	sc.order_shipments_amount_wrong = "数量只能是1到5位的整数"; 
	hk.order_shipments_amount_wrong = "數量只能是1到5位的整數";
	en.order_shipments_amount_wrong = "Quantity should be an integer";

	sc.order_shipments_amount_fomart_wrong = "数量最多保留两位小数";
	hk.order_shipments_amount_fomart_wrong = "數量最多保留兩位小數";
	en.order_shipments_amount_fomart_wrong = "Up to 2 digits";
	
	sc.order_shipments_integer = "数量只能是整数";
	hk.order_shipments_integer = "數量只能是整數";
	en.order_shipments_integer = "Incorrect amount";
	

	sc.need_input_price = "请填写单价";
	hk.need_input_price = "請填寫單價";
	en.need_input_price = "Please fill in the value"; 
	
	sc.canot_input_0 = "单价不能为0";
	hk.canot_input_0 = "單價不能為0";
	en.canot_input_0 = "The value cannot be 0";

	sc.price_format_wrong = "单价不能包含空格";
	hk.price_format_wrong = "單價不能包含空格";
	en.price_format_wrong = "No spacing when entering value";

	sc.price_decimal_format_wrong = "单价只能为正整数";
	hk.price_decimal_format_wrong = "單價只能為正整數";
	en.price_decimal_format_wrong = "Quantity should be an integer";

	sc.price_quantity = "单价";
	hk.price_quantity = "單價";
	en.price_quantity = "Quantity";
	
	sc.total_price_wrong = "总价不正确";
	hk.total_price_wrong = "總價不正確";
	en.total_price_wrong = "Incorrect total value"; 
	
	sc.total_price_over_wrong = "总价不能大于99999";
	hk.total_price_over_wrong = "總價不能大於99999";
	en.total_price_over_wrong = "Total value up to 5 digit";
	
	
	sc.total_price = "总价：";
	hk.total_price = "總價：";
	en.total_price = "total value:";
	
	sc.total_pr2ice = "总价值：";
	hk.total_pr2ice = "總價值：";
	en.total_pr2ice = "total value:";
	
	sc.declareService = "需要进口正式报关服务";
	hk.declareService = "需要進口正式報關服務";
	en.declareService = "Need Import Formal Entry";

	sc.not_need_pick = "不需要收派员上门取件，我希望：";
	hk.not_need_pick = "不需要收派員上門取件，我希望：";
	en.not_need_pick = "I do not need courier to pickup, I prefer:";

	sc.send_by_self = "自寄";
	hk.send_by_self = "自寄";
	en.send_by_self = "Self drop-off ";

	sc.if_send_by_self = "(若您勾选了\"自寄\"选项,收派员将不会上门收件,需要您自行打印运单并交予收派员)";
	hk.if_send_by_self = "(若您勾選了\"自寄\"選項,收派員將不會上門收件,需要您自行列印運單並交予收派員)";
	en.if_send_by_self = "(If you tick “self drop-off”, courier will not come and pickup, please print the waybill and pass to our courier.)"; 

	sc.customer_code="客户编码：";
	hk.customer_code="客戶編碼：";
	en.customer_code="Customer a/c no";
	
	
	sc.rec_dutyNo="收件人稅號：";
	hk.rec_dutyNo="收件人稅號：";
	en.rec_dutyNo="Receiver’s Tax ID";
	
	
	sc.customer_code_wrong="客户编码有误";
	hk.customer_code_wrong="客戶編碼有誤";
	en.customer_code_wrong="Invalid customer a/c no";
	
	sc.addi_fee="附加费";
	hk.addi_fee="附加費";
	en.addi_fee="Additional surcharge";
	
	sc.member_news="会员动态";
	hk.member_news="會員動態";
	en.member_news="Member News";
	
	sc.order_protocal="下单条款细则";
	hk.order_protocal="下單條款細則";
	en.order_protocal="Terms of use";

	sc.business_introduce="业务介绍";
	hk.business_introduce="業務介紹";
	en.business_introduce="Business introduction";
	
	sc.member_helping="会员帮助";
	hk.member_helping="會員幫助";
	en.member_helping="Help";
	
	sc.rTaxNo="请输入寄件人税号";
	hk.rTaxNo="請輸入寄件人稅號";
	en.rTaxNo="Please fill in shipper’s Tax ID";
	
	sc.taxNo_error="输入税号有误";
	hk.taxNo_error="輸入稅號有誤";
	en.taxNo_error="Invalid Tax ID";
	
	sc.publish="发表于";
	hk.publish="發表于";
	en.publish="Published at";
	
	sc.export_scope="请选择导出范围";
	hk.export_scope="請選擇導出範圍";
	en.export_scope="Please select fields to export";
	
	sc.select_one_record="请选择至少一条数据导出";
	hk.select_one_record="請選擇至少一條數據導出";
	en.select_one_record="Please choose at least one data to export";
	
	sc.addbook_search_tips="您可以在此快速搜索姓名或联系方式";
	hk.addbook_search_tips="您可以在此快速搜索姓名或聯繫方式";
	en.addbook_search_tips="Quick search for name and tel no. here";
	
	sc.export_condition_tips="请输入搜索条件，否则请选择导出整个地址簿";
	hk.export_condition_tips="請輸入搜索條件，否則請選擇匯出整個地址簿";
	en.export_condition_tips="Please fill in searching criteria, or choose to export entire address book";
	
	sc.export_error="抱歉！您导出的记录大于1000条，请重新筛选后导出";
	hk.export_error="抱歉！您匯出的記錄大於1000條，請重新篩選後匯出";
	en.export_error="There are more than 1000 records to export, please choose again";

	sc.username_notexist="登录名不存在，请重新输入";
	hk.username_notexist="登錄名不存在，請重新輸入";
	en.username_notexist="Invalid login name, please enter again";

	sc.not_bind_email="您尚未绑定手机号或者电子邮箱，无法找回密码，建议您重新注册顺丰会员，谢谢。";
	hk.not_bind_email="您尚未綁定手機號或者電子郵箱，無法找回密碼，建議您重新註冊順豐會員，謝謝。";
	en.not_bind_email="Cannot retrieve password as mobile no. or email address not binded to this a/c, please register again, thanks.";

	sc.save_pwd_fail="保存密码失败";
	hk.save_pwd_fail="保存密碼失敗";
	en.save_pwd_fail="Failed to save passwords";
	

	sc.send_info_wrong="寄件人信息有误，请核查";
	hk.send_info_wrong="寄件人資訊有誤，請核查";
	en.send_info_wrong="Invalid sender info";

	sc.mobile_or_tel="固话和手机至少填写一项";
	hk.mobile_or_tel="固話和手機請至少填寫一項";
	en.mobile_or_tel="Please fill in tel. no. or mobile no.";

	
	sc.recevier_info_wrong="收件人信息有误，请核查";
	hk.recevier_info_wrong="收件人資訊有誤，請核查";
	en.recevier_info_wrong="Invalid receiver info";
	

	sc.tel_fomart_tips="格式：区号-电话号码-分机号。";
	hk.tel_fomart_tips="格式：區號-電話號碼-分機號。";
	en.tel_fomart_tips="Format: District code-Tel no.-ext no.";
	
	sc.cps_webservice_error="接口调用异常，请联系管理员。";
	hk.cps_webservice_error="接口調用異常，請聯繫管理員。";
	en.cps_webservice_error="System error, please contact administrator";
	
	sc.need_select_insured="单票计费重量少于或等于10kg,必买保价";
	hk.need_select_insured="單票計費重量少於或等於10kg,必買保價";
	en.need_select_insured="10kg or below per piece shall purchase SPPS";
	
	sc.need_select_insured_avg="每公斤申报价值为港币5,001至10,000元, 必买保价";
	hk.need_select_insured_avg="每公斤申報價值為港幣5,001至10,000元, 必買保價";
	en.need_select_insured_avg="Value between HKD 5,001-10,000 per kg shall purchase SPPS";
	
	sc.express_over_value = "快件价值过高, 请致电客服热线下单";
	hk.express_over_value = "快件價值過高, 請致電客服熱線下單";
	en.express_over_value = "High value shipment, please contact CS hotline to place order";
	
	sc.ntd="台币";
	hk.ntd="台幣";
	en.ntd="NTD";
	
	sc.usd="美元";
	hk.usd="美元";
	en.usd="USD";
	
	sc.china_mainland="中国大陆";
	hk.china_mainland="中國大陸";
	en.china_mainland="Mainland China";
	
	sc.countyName_null_error="请选择区/县";
	hk.countyName_null_error="請選擇區/縣";
	en.countyName_null_error="Please select district";
	
	sc.mail_validate_msg = "对不起，该邮箱已经被绑定使用，请修改用户名";
	hk.mail_validate_msg = "對不起，該郵箱已經被綁定使用，請修改用戶名";
	en.mail_validate_msg = "This email address is used, please choose another username";

	sc.nodata="找不到匹配的数据。";
	hk.nodata="找不到匹配的數據。";
	en.nodata="Nodata.";	

	sc.submiting="正在提交您的请求，请稍候...";
	hk.submiting="正在提交您的請求，請稍後...";
	en.submiting="Request is sending. Please wait...";
	
	sc.calendar_clear = "清空";
	hk.calendar_clear = "清空";
	en.calendar_clear = "Clear";
	
	sc.calendar_timeStr = "时间";
	hk.calendar_timeStr = "時間";
	en.calendar_timeStr = "Time";
	
	sc.calendar_quickStr = "快速选择";
	hk.calendar_quickStr = "快速選擇";
	en.calendar_quickStr = "Quick Selection";
	
	sc.calendar_err_1 = "最小日期不能大于最大日期!";
	hk.calendar_err_1 = "最小日期不能大於最大日期!";
	en.calendar_err_1 = "MinDate Cannot be bigger than MaxDate!";
	
	sc.calendar_errAlertMsg = "不合法的日期格式或者日期超出限定范围,需要撤销吗?";
	hk.calendar_errAlertMsg = "不合法的日期格式或者日期超出限定範圍,需要撤銷嗎?";
	en.calendar_errAlertMsg = "Invalid date or the date out of range,redo or not?";
	
	sc.calendar_aWeekStr = ["周","日","一","二","三","四","五","六"];
	hk.calendar_aWeekStr = ["周","日","一","二","三","四","五","六"];
	en.calendar_aWeekStr = ["wk", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	
	sc.aLongWeekStr = ["周","星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	hk.aLongWeekStr = ["周","星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	en.aLongWeekStr = ["wk","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	
	sc.aMonStr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一","十二"];
	hk.aMonStr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一","十二"];
	en.aMonStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	sc.aLongMonStr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
	hk.aLongMonStr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
	en.aLongMonStr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	sc.dateBetween ="时间段不能为空且结束时间必须大于或等于开始时间！";
	hk.dateBetween ="時間段不能為空且結束時間必須大於或等於開始時間！";
	en.dateBetween ="noTransfer";

	sc.compareDate ="时间段不能超过一周";
	hk.compareDate ="時間段不能超過一周";
	en.compareDate ="noTransfer";

	sc.showDetail ="查看详情";
	hk.showDetail ="查看詳情";
	en.showDetail ="Show Detail";
	
	sc.mobile_nobind = "您尚未绑定手机号，请致电顺丰客服4008111111，帮您找回密码。";
	hk.mobile_nobind = "您尚未綁定手機號，請致電順豐客服4008111111，幫您找回密碼";
	en.mobile_nobind = "You are not bound phone no. ,please call 4008111111 for find your password, thank you.";

	sc.role_addSubAccount ="新增子账户";
	hk.role_addSubAccount ="新增子帳戶";
	en.role_addSubAccount ="Add New Sub-Account";
	
	sc.role_modifySubAccount ="修改信息";
	hk.role_modifySubAccount ="修改信息";
	en.role_modifySubAccount ="Modify Info";

	sc.role_addSubAccount_success ="创建子用户成功";
	hk.role_addSubAccount_success ="创建子用户成功";
	en.role_addSubAccount_success ="创建子用户成功";
	
	sc.role_unmarch_userNameAndPwd ="用户名密码不正确";
	hk.role_unmarch_userNameAndPwd ="用户名密码不正确";
	en.role_unmarch_userNameAndPwd ="用户名密码不正确";
	
	sc.role_addsubaccount_isbindalalready ="账号已被绑定";
	hk.role_addsubaccount_isbindalalready ="账号已被绑定";
	en.role_addsubaccount_isbindalalready ="账号已被绑定";
	
	sc.role_addsubaccount_monthaccount ="月结账号不能绑定为子账号";
	hk.role_addsubaccount_monthaccount ="月结账号不能绑定为子账号";
	en.role_addsubaccount_monthaccount ="月结账号不能绑定为子账号";
	
	sc.role_addSubAccount_employee ="内部员工账号不能绑定为子账号";
	hk.role_addSubAccount_employee ="内部员工账号不能绑定为子账号";
	en.role_addSubAccount_employee ="内部员工账号不能绑定为子账号";
	
	sc.role_addSubAccount_abroad ="港澳台用户不能被绑定为子账号";
	hk.role_addSubAccount_abroad ="港澳台用户不能被绑定为子账号";
	en.role_addSubAccount_abroad ="港澳台用户不能被绑定为子账号";
	
	sc.role_addsubaccount_differentzone ="不能绑定不同区域的账号";
	hk.role_addsubaccount_differentzone ="不能绑定不同区域的账号";
	en.role_addsubaccount_differentzone ="不能绑定不同区域的账号";

	sc.role_send_mobile_prefix ="新建子用户成功，已向手机号码";
	hk.role_send_mobile_prefix ="新建子用户成功，已向手机号码";
	en.role_send_mobile_prefix ="新建子用户成功，已向手机号码";

	sc.role_send_email_prefix ="新建子用户成功，已向电子邮箱";
	hk.role_send_email_prefix ="新建子用户成功，已向电子邮箱";
	en.role_send_email_prefix ="新建子用户成功，已向电子邮箱";
	
	sc.role_send_mobile_suffix ="发送了用户名与初始密码。";
	hk.role_send_mobile_suffix ="发送了用户名与初始密码。";
	en.role_send_mobile_suffix ="发送了用户名与初始密码。";
	
	sc.role_send_email_suffix ="发送了验证邮件。";
	hk.role_send_email_suffix ="发送了验证邮件。";
	en.role_send_email_suffix ="发送了验证邮件。";
	
	sc.role_stopSubAccount ="停用子账户";
	hk.role_stopSubAccount ="停用子账户";
	en.role_stopSubAccount ="停用子账户";
	
	sc.role_startSubAccount ="启用子账户";
	hk.role_startSubAccount ="启用子账户";
	en.role_startSubAccount ="启用子账户";
	
	sc.role_showStopSubAccount ="查看停用的子账户";
	hk.role_showStopSubAccount ="查看停用的子账户";
	en.role_showStopSubAccount ="查看停用的子账户";
	
	sc.role_showStartSubAccount ="查看启用的子账户";
	hk.role_showStartSubAccount ="查看启用的子账户";
	en.role_showStartSubAccount ="查看启用的子账户";

	
	sc.role_opera_status_success ="更改子账户状态成功";
	hk.role_opera_status_success ="更改子账户状态成功";
	en.role_opera_status_success ="更改子账户状态成功";
	
	sc.role_delete_success ="删除子账户成功";
	hk.role_delete_success ="删除子账户成功";
	en.role_delete_success ="删除子账户成功";
	
	sc.role_opera_status_exception ="更改子账户状态失败";
	hk.role_opera_status_exception ="更改子账户状态失败";
	en.role_opera_status_exception ="更改子账户状态失败";
	
	sc.role_delete_exception ="删除子账户失败";
	hk.role_delete_exception ="删除子账户失败";
	en.role_delete_exception ="删除子账户失败";

	sc.role_select_one_record = "请选择一条记录。";
	hk.role_select_one_record = "請選擇一條記錄。";
	en.role_select_one_record = "Please select one record";

	sc.role_select_exception = "获取记录失败。";
	hk.role_select_exception = "获取记录失败。";
	en.role_select_exception = "获取记录失败。";
	
	sc.subaccount_modify_success ="修改联系人成功";
	hk.subaccount_modify_success ="修改联系人成功";
	en.subaccount_modify_success ="修改联系人成功";
	
	sc.subaccount_modify_exception ="修改联系人异常";
	hk.subaccount_modify_exception ="修改联系人异常";
	en.subaccount_modify_exception ="修改联系人异常";
	
	
	sc.subaccount_query_permission_fail ="查询子用户权限失败";
	hk.subaccount_query_permission_fail ="查詢子用戶許可權失敗";
	en.subaccount_query_permission_fail ="Query failed sub-user privileges";
	
	sc.no_monthaccout_permission ="没有月结权限";
	hk.no_monthaccout_permission ="沒有月結權限";
	en.no_monthaccout_permission ="No Month Account Permission";
	
	sc.subaccount_select_one_user ="请选择一个子用户";
	hk.subaccount_select_one_user ="請選擇一個子用戶";
	en.subaccount_select_one_user ="Please select a sub-user";
	
	sc.subaccount_no_relation ="不能设置此用户权限";
	hk.subaccount_no_relation ="不能設置此用戶許可權";
	en.subaccount_no_relation ="You can not set this user right";
	
	sc.subaccount_prepareisexist ="账号已被其它母账号注册";
	hk.subaccount_prepareisexist ="账号已被其它母账号注册";
	en.subaccount_prepareisexist ="账号已被其它母账号注册";
	
	sc.subaccount_set_permission ="设置权限";
	hk.subaccount_set_permission ="設置許可權";
	en.subaccount_set_permission ="Set permissions";
	
	sc.security_payway_value ="声明价值大于5万元，付款方式只能选择寄付或者第三方付";
	hk.security_payway_value ="聲明價值大於5萬元，付款方式只能選擇寄付或者協力廠商付";
	en.security_payway_value ="value greater than 50000,payway can choose send pay or third party pay";
	
	//查看详情
	//"noTransfer"
	sc.user_nickName_isexist="该昵称已被其它用户使用";
	hk.user_nickName_isexist="该昵称已被其它用户使用";
	en.user_nickName_isexist="该昵称已被其它用户使用";
	
	sc.user_nickName_empty="昵称不能为空";
	hk.user_nickName_empty="昵称不能为空";
	en.user_nickName_empty="昵称不能为空";
	
	sc.user_nickName_invalid="不满足昵称命名规则";
	hk.user_nickName_invalid="不满足昵称命名规则";
	en.user_nickName_invalid="不满足昵称命名规则";
	
	sc.print_warn_message="请配置本地打印机";
	hk.print_warn_message="请配置本地打印机";
	en.print_warn_message="请配置本地打印机";
	
	sc.waybill_query_wait="正在为您查询运单，请耐心等待...";
	hk.waybill_query_wait="正在為您查詢運單，請耐心等候...";
	en.waybill_query_wait="Is to query the waybill for you, please be patient...";
	
	sc.waybill_query_fail="未查到您输入的运单，请稍后再试";
	hk.waybill_query_fail="未查到您輸入的運單，請稍後再試";
	en.waybill_query_fail="Not found you enter the waybill, please try again later";
	
	sc.access_overflow_exception="系统忙，请稍后再试";
	hk.access_overflow_exception="系統忙，請稍後再試";
	en.access_overflow_exception="Try the system is busy, please wait";
	
	sc.order_HKMT_login = "请重新登录！";
	hk.order_HKMT_login = "請重新登錄！";
	en.order_HKMT_login = "Please login !";
	
	sc.none_crabs_pri_province = "很抱歉，大闸蟹专递产品暂未开通此地区，详情请咨询当地客服，谢谢！";
	hk.none_crabs_pri_province = "很抱歉，大閘蟹專遞產品暫未開通此地區，詳情請諮詢當地客服，謝謝！";
	en.none_crabs_pri_province = "很抱歉，大闸蟹专递产品暂未开通此地区，详情请咨询当地客服，谢谢！";
	
	sc.crabs_none_rec_pay = "很抱歉，大闸蟹专递产品不支持到付，详情请咨询当地客服，谢谢！";
	hk.crabs_none_rec_pay = "很抱歉，大閘蟹專遞產品不支持到付，詳情請諮詢當地客服，謝謝！";
	en.crabs_none_rec_pay = "很抱歉，大闸蟹专递产品不支持到付，详情请咨询当地客服，谢谢！";
	
	sc.none_crabs_pri_province_batch = "很抱歉，新疆、西藏、甘肃、内蒙古、青海、宁夏属于偏远地区，无法保证时效，详情请咨询当地客服或销售人员，谢谢！";
	hk.none_crabs_pri_province_batch = "很抱歉，新疆、西藏、甘肅、內蒙古、青海、寧夏屬於偏遠地區，無法保證時效，詳情請諮詢當地客服或銷售人員，謝謝！";
	en.none_crabs_pri_province_batch = "很抱歉，新疆、西藏、甘肃、内蒙古、青海、宁夏属于偏远地区，无法保证时效，详情请咨询当地客服或销售人员，谢谢！";
	
	sc.crabs_prod_type = "大闸蟹专递";
	hk.crabs_prod_type = "大閘蟹專遞";
	en.crabs_prod_type = "大闸蟹专递";

	sc.piece="件数：";
	hk.piece="件數：";
	en.piece="pieces:";
	
	sc.hkmt_sel_area_tip="提示：电子运单现正处于内部测试阶段，如客户需下单，请使用[简易下单]功能, 谢谢!。";
	hk.hkmt_sel_area_tip="提示：電子運單現正處於內部測試階段，如客戶需下單，請使用[簡易下單]功能, 謝謝!。";
	en.hkmt_sel_area_tip="Reminder: Ewaybill is under testing, if you want to place order, please click “Easy order”, thanks!";
	
	sc.eaccount="电子账户";
	hk.eaccount="電子帳戶";
	en.eaccount="e-account";
	
	sc.conveniently_pay="顺手付";
	hk.conveniently_pay="順手付";
	en.conveniently_pay="He paid";
	
})(sc,en,hk);

var i18n = {};
var language = [ sc, en ,hk];
(function() {
	var lanCode = getLanCode();
	var regionCode = getRegionCode();
	for ( var i = 0; i < language.length; i++) {
		/*if (regionCode == language[i].name) {
			i18n = language[i];
			break;
		}*/
		if (lanCode == language[i].lang) {
			i18n = language[i];
			break;
		}
		i18n = language[0];
	}
	if(regionCode!='cn'){
		i18n.name = regionCode+"/"+lanCode;
		}
})(i18n);

var needLoginUrl = new Array(
		"/order/hk/tc/order.html",
		"/order/tw/tc/order.html",
		"/order/hk/en/order.html",
		"/order/tw/en/order.html",
		"/order/sc/batch_order.html",
		"/order/hk/tc/batch_order.html",
		"/order/hk/en/batch_order.html",
		"/order/tw/tc/batch_order.html",
		"/order/tw/en/batch_order.html",
		"/order/batch_order.html",
		"/waybill/sc/send_waybill_query.html",
		"/waybill/hk/tc/send_waybill_query.html",
		"/waybill/hk/en/send_waybill_query.html",
		"/waybill/tw/tc/send_waybill_query.html",
		"/waybill/tw/en/send_waybill_query.html",
		"/waybill/send_waybill_query.html",
		"/waybill/sc/rece_waybill_query.html",
		"/waybill/hk/tc/rece_waybill_query.html",
		"/waybill/hk/en/rece_waybill_query.html",
		"/waybill/tw/tc/rece_waybill_query.html",
		"/waybill/tw/en/rece_waybill_query.html",
		"/waybill/rece_waybill_query.html",
		"order/sc/record_export.html",
		"order/hk/tc/record_export.html",
		"order/hk/en/record_export.html",
		"order/tw/tc/record_export.html",
		"order/tw/en/record_export.html",
		"order/record_export.html",
		"/user/sc/user_info.html",
		"/user/hk/tc/user_info.html",
		"/user/hk/en/user_info.html",
		"/user/tw/tc/user_info.html",
		"/user/tw/en/user_info.html",
		"/user/user_info.html",
		"/user/point/sc/my_point.html",
		"/user/point/hk/tc/my_point.html",
		"/user/point/hk/en/my_point.html",
		"/user/point/tw/tc/my_point.html",
		"/user/point/tw/en/my_point.html",
		"/user/point/my_point.html",
		"/user/point/sc/my_month_point.html",
		"/user/point/hk/tc/my_month_point.html",
		"/user/point/hk/en/my_month_point.html",
		"/user/point/tw/tc/my_month_point.html",
		"/user/point/tw/en/my_month_point.html",
		"/user/point/my_month_point.html",
		"/member/sc/coupon.html",
		"/member/hk/tc/coupon.html",
		"/member/hk/en/coupon.html",
		"/member/tw/tc/coupon.html",
		"/member/tw/en/coupon.html",
		"/member/coupon.html",
		"/user/sc/passw_change.html",
		"/user/hk/tc/passw_change.html",
		"/user/hk/en/passw_change.html",
		"/user/tw/tc/passw_change.html",
		"/user/tw/en/passw_change.html",
		"/user/passw_change.html",
		"/subscription/sc/mysubscription.html",
		"/subscription/hk/tc/mysubscription.html",
		"/subscription/hk/en/mysubscription.html",
		"/subscription/tw/tc/mysubscription.html",
		"/subscription/tw/en/mysubscription.html",
		"/subscription/mysubscription.html",
		"/order/bth_detail.html",
		"/order/sc/bth_detail.html",
		"/order/hk/tc/bth_detail.html",
		"/order/hk/en/bth_detail.html",
		"/order/tw/tc/bth_detail.html",
		"/order/tw/en/bth_detail.html",
		"/order/bthmyorder_detail.html",
		"/order/sc/bthmyorder_detail.html",
		"/order/hk/tc/bthmyorder_detail.html",
		"/order/hk/en/bthmyorder_detail.html",
		"/order/tw/tc/bthmyorder_detail.html",
		"/order/tw/en/bthmyorder_detail.html",
		"/order/myorder_detail.html",
		"/order/sc/myorder_detail.html",
		"/order/hk/tc/myorder_detail.html",
		"/order/hk/en/myorder_detail.html",
		"/order/tw/tc/myorder_detail.html",
		"/order/tw/en/myorder_detail.html",

		"/user/emailbind/sc/bind_email.html",
		"/user/emailbind/hk/tc/bind_email.html",
		"/user/emailbind/hk/en/bind_email.html",
		"/user/emailbind/tw/tc/bind_email.html",
		"/user/emailbind/tw/en/bind_email.html",
		"/user/emailbind/sc/bind_emailsend.html",
		"/user/emailbind/hk/tc/bind_emailsend.html",
		"/user/emailbind/hk/en/bind_emailsend.html",
		"/user/emailbind/tw/tc/bind_emailsend.html",
		"/user/emailbind/tw/en/bind_emailsend.html",
		"/user/emailbind/sc/bind_emailSuccess.html",
		"/user/emailbind/hk/tc/bind_emailSuccess.html",
		"/user/emailbind/hk/en/bind_emailSuccess.html",
		"/user/emailbind/tw/tc/bind_emailSuccess.html",
		"/user/emailbind/tw/en/bind_emailSuccess.html",
		"/user/emailbind/sc/modify_email.html",
		"/user/emailbind/hk/tc/modify_email.html",
		"/user/emailbind/hk/en/modify_email.html",
		"/user/emailbind/tw/tc/modify_email.html",
		"/user/emailbind/tw/en/modify_email.html",
		"/user/emailbind/sc/modify_emailNew.html",
		"/user/emailbind/hk/tc/modify_emailNew.html",
		"/user/emailbind/hk/en/modify_emailNew.html",
		"/user/emailbind/tw/tc/modify_emailNew.html",
		"/user/emailbind/tw/en/modify_emailNew.html",
		//"/user/emailbind/sc/modify_emailSend.html",
		//"/user/emailbind/hk/tc/modify_emailSend.html",
		//"/user/emailbind/hk/en/modify_emailSend.html",
		//"/user/emailbind/tw/tc/modify_emailSend.html",
		//"/user/emailbind/tw/en/modify_emailSend.html",

		"/user/mobilebind/sc/bind_mobile.html",
		"/user/mobilebind/hk/tc/bind_mobile.html",
		"/user/mobilebind/hk/en/bind_mobile.html",
		"/user/mobilebind/tw/tc/bind_mobile.html",
		"/user/mobilebind/tw/en/bind_mobile.html",
		"/user/mobilebind/sc/bind_mobileSuccess.html",
		"/user/mobilebind/hk/tc/bind_mobileSuccess.html",
		"/user/mobilebind/hk/en/bind_mobileSuccess.html",
		"/user/mobilebind/tw/tc/bind_mobileSuccess.html",
		"/user/mobilebind/tw/en/bind_mobileSuccess.html",
		"/user/mobilebind/sc/modify_mobile_new.html",
		"/user/mobilebind/hk/tc/modify_mobile_new.html",
		"/user/mobilebind/hk/en/modify_mobile_new.html",
		"/user/mobilebind/tw/tc/modify_mobile_new.html",
		"/user/mobilebind/tw/en/modify_mobile_new.html",
		"/user/mobilebind/sc/modify_mobile.html",
		"/user/mobilebind/hk/tc/modify_mobile.html",
		"/user/mobilebind/hk/en/modify_mobile.html",
		"/user/mobilebind/tw/tc/modify_mobile.html",
		"/user/mobilebind/tw/en/modify_mobile.html",
		"/user/mobilebind/sc/modify_mobileSuccess.html",
		"/user/mobilebind/hk/tc/modify_mobileSuccess.html",
		"/user/mobilebind/hk/en/modify_mobileSuccess.html",
		"/user/mobilebind/tw/tc/modify_mobileSuccess.html",
		"/user/mobilebind/tw/en/modify_mobileSuccess.html",
		"/addrbook/sc/address.html",
		"/addrbook/hk/tc/address.html",
		"/addrbook/hk/en/address.html",
		"/addrbook/tw/tc/address.html",
		"/addrbook/tw/en/address.html",
		"order/sc/myorder_record.html",
		"order/hk/tc/myorder_record.html",
		"order/hk/en/myorder_record.html",
		"order/tw/tc/myorder_record.html",
		"order/tw/en/myorder_record.html",
		"user/sc/mytemplate.html",
		"user/hk/tc/mytemplate.html",
		"user/hk/en/mytemplate.html",
		"user/tw/tc/mytemplate.html",
		"user/tw/en/mytemplate.html",
		"user/sc/myoption.html",
		"user/hk/tc/myoption.html",
		"user/hk/en/myoption.html",
		"user/tw/tc/myoption.html",
		"user/tw/en/myoption.html",
		"user/sc/peroption.html",
		"user/hk/tc/peroption.html",
		"user/hk/en/peroption.html",
		"user/tw/tc/peroption.html",
		"user/tw/en/peroption.html",
		"user/resetpwd/sc/reset_extpwd",
		"user/resetpwd/hk/tc/reset_extpwd",
		"user/resetpwd/hk/en/reset_extpwd",
		"user/resetpwd/tw/tc/reset_extpwd",
		"user/resetpwd/tw/en/reset_extpwd",
		"sfpay/sc/account.html",
		"sfpay/hk/tc/account.html",
		"sfpay/hk/en/account.html",
		"sfpay/tw/tc/account.html",
		"sfpay/tw/en/account.html",
		"sfbest/sc/sfbest.html",
		"sfbest/hk/tc/sfbest.html",
		"sfbest/hk/en/sfbest.html",
		"sfbest/tw/tc/sfbest.html",
		"sfbest/tw/en/sfbest.html",
		"/order/hk/tc/Dorder.html",
		"/order/hk/en/Dorder.html",
		"/order/tw/tc/Dorder.html",
		"/order/tw/en/Dorder.html"
		);
var needNormalUrl = new Array(
		"/user/sc/order_msg.html",
		"/user/hk/tc/order_msg.html",
		"/user/hk/en/order_msg.html",
		"/user/tw/tc/order_msg.html",
		"/user/tw/en/order_msg.html",
		"/user/order_msg.html",
		"/order/sc/order.html",
		"/order/hk/tc/order.html",
		"/order/hk/en/order.html",
		"/order/tw/tc/order.html",
		"/order/tw/en/order.html",
		"/order/hk/tc/Dorder.html",
		"/order/hk/en/Dorder.html",
		"/order/tw/tc/Dorder.html",
		"/order/tw/en/Dorder.html",
		"/order/order.html",
		"/order/sc/batch_order.html",
		"/order/hk/tc/batch_order.html",
		"/order/hk/en/batch_order.html",
		"/order/tw/tc/batch_order.html",
		"/order/tw/en/batch_order.html",
		"/order/batch_order.html",
		"/waybill/sc/send_waybill_query.html",
		"/waybill/hk/tc/send_waybill_query.html",
		"/waybill/hk/en/send_waybill_query.html",
		"/waybill/tw/tc/send_waybill_query.html",
		"/waybill/tw/en/send_waybill_query.html",
		"/waybill/send_waybill_query.html",
		"/waybill/sc/rece_waybill_query.html",
		"/waybill/hk/tc/rece_waybill_query.html",
		"/waybill/hk/en/rece_waybill_query.html",
		"/waybill/tw/tc/rece_waybill_query.html",
		"/waybill/tw/en/rece_waybill_query.html",
		"/waybill/rece_waybill_query.html",
		"order/sc/record_export.html",
		"order/hk/tc/record_export.html",
		"order/hk/en/record_export.html",
		"order/tw/tc/record_export.html",
		"order/tw/en/record_export.html",
		"order/record_export.html",
		"/user/sc/user_info.html",
		"/user/hk/tc/user_info.html",
		"/user/hk/en/user_info.html",
		"/user/tw/tc/user_info.html",
		"/user/tw/en/user_info.html",
		"/user/user_info.html",
		"/user/point/sc/my_point.html",
		"/user/point/sc/my_month_point.html",
		"/user/point/hk/tc/my_month_point.html",
		"/user/point/hk/en/my_month_point.html",
		"/user/point/tw/tc/my_month_point.html",
		"/user/point/tw/en/my_month_point.html",
		"/user/point/my_month_point.html",
		"/user/point/hk/tc/my_point.html",
		"/user/point/hk/en/my_point.html",
		"/user/point/tw/tc/my_point.html",
		"/user/point/tw/en/my_point.html",
		"/user/point/my_point.html",
		"/member/sc/coupon.html",
		"/member/hk/tc/coupon.html",
		"/member/hk/en/coupon.html",
		"/member/tw/tc/coupon.html",
		"/member/tw/en/coupon.html",
		"/member/coupon.html",
		"/user/sc/passw_change.html",
		"/user/hk/tc/passw_change.html",
		"/user/hk/en/passw_change.html",
		"/user/tw/tc/passw_change.html",
		"/user/tw/en/passw_change.html",
		"/user/passw_change.html",
		"/subscription/sc/mysubscription.html",
		"/subscription/hk/tc/mysubscription.html",
		"/subscription/hk/en/mysubscription.html",
		"/subscription/tw/tc/mysubscription.html",
		"/subscription/tw/en/mysubscription.html",
		"/subscription/mysubscription.html"
		);
var needInnerUrl = new Array(
		"/innerorder/sc/order_inner.html",
		"/innerorder/hk/tc/order_inner.html",
		"/innerorder/hk/en/order_inner.html",
		"/innerorder/tw/tc/order_inner.html",
		"/innerorder/tw/en/order_inner.html",
		"/innerorder/order_inner.html",
		"/innerorder/sc/inner_discount_order.html",
		"/innerorder/hk/tc/inner_discount_order.html",
		"/innerorder/hk/en/inner_discount_order.html",
		"/innerorder/tw/tc/inner_discount_order.html",
		"/innerorder/tw/en/inner_discount_order.html",
		"/innerorder/inner_discount_order.html",
		"/innerorder/sc/inner_discount_submit.html",
		"/innerorder/hk/tc/inner_discount_submit.html",
		"/innerorder/hk/en/inner_discount_submit.html",
		"/innerorder/tw/tc/inner_discount_submit.html",
		"/innerorder/tw/en/inner_discount_submit.html",
		"/innerorder/inner_discount_submit.html",
		"/innerorder/sc/inner_print.html",
		"/innerorder/hk/tc/inner_print.html",
		"/innerorder/hk/en/inner_print.html",
		"/innerorder/tw/tc/inner_print.html",
		"/innerorder/tw/en/inner_print.html",
		"/innerorder/inner_print.html",
		"/innerorder/sc/myorder_inner_detail.html",
		"/innerorder/hk/tc/myorder_inner_detail.html",
		"/innerorder/hk/en/myorder_inner_detail.html",
		"/innerorder/tw/tc/myorder_inner_detail.html",
		"/innerorder/tw/en/myorder_inner_detail.html",
		"/innerorder/myorder_inner_detail.html",
		"/innerorder/sc/myorder_inner.html",
		"/innerorder/hk/tc/myorder_inner.html",
		"/innerorder/hk/en/myorder_inner.html",
		"/innerorder/tw/tc/myorder_inner.html",
		"/innerorder/tw/en/myorder_inner.html",
		"/innerorder/myorder_inner.html"
		);
var needMonthUrl = new Array(
		"/report/sc/myReport.html",
		"/report/hk/tc/myReport.html",
		"/report/hk/en/myReport.html",
		"/report/tw/tc/myReport.html",
		"/report/tw/en/myReport.html",
		"/report/sc/combination_report.html",
		"/report/hk/tc/combination_report.html",
		"/report/hk/en/combination_report.html",
		"/report/tw/tc/combination_report.html",
		"/report/tw/en/combination_report.html",
		"/report/sc/month_billing.html",
		"/report/hk/tc/month_billing.html",
		"/report/hk/en/month_billing.html",
		"/report/tw/tc/month_billing.html",
		"/report/tw/en/month_billing.html",
		
		"/order/sc/order_export.html",
		"/order/hk/tc/order_export.html",
		"/order/hk/en/order_export.html",
		"/order/tw/tc/order_export.html",
		"/order/tw/en/order_export.html",
		"/order/sc/order_export_abroad.html",
		"/order/hk/tc/order_export_abroad.html",
		"/order/hk/en/order_export_abroad.html",
		"/order/tw/tc/order_export_abroad.html",
		"/order/tw/en/order_export_abroad.html"
		);

var reportUrl = new Array(
		"/report/sc/myReport.html",
		"/report/hk/tc/myReport.html",
		"/report/hk/en/myReport.html",
		"/report/tw/tc/myReport.html",
		"/report/tw/en/myReport.html",
		"/report/sc/combination_report.html",
		"/report/hk/tc/combination_report.html",
		"/report/hk/en/combination_report.html",
		"/report/tw/tc/combination_report.html",
		"/report/tw/en/combination_report.html",
		"/report/sc/month_billing.html",
		"/report/hk/tc/month_billing.html",
		"/report/hk/en/month_billing.html",
		"/report/tw/tc/month_billing.html",
		"/report/tw/en/month_billing.html"
		);

var indexURL = new Array(
		"/sc/index.html",
		"/hk/tc/index.html",
		"/hk/en/index.html",
		"/tw/tc/index.html",
		"/tw/en/index.html",
		"/index.html"
		);
var normalSendUrl = new Array(
		"/user/sc/order_msg.html",
		"/user/hk/tc/order_msg.html",
		"/user/hk/en/order_msg.html",
		"/user/tw/tc/order_msg.html",
		"/user/tw/en/order_msg.html",
		"/user/order_msg.html",
		"/order/sc/order.html",
		"/order/hk/tc/order.html",
		"/order/hk/en/order.html",
		"/order/tw/tc/order.html",
		"/order/tw/en/order.html",
		"/order/order.html"
		);
var batchSendUrl = new Array(
		"/order/sc/batch_order.html",
		"/order/hk/tc/batch_order.html",
		"/order/hk/en/batch_order.html",
		"/order/tw/tc/batch_order.html",
		"/order/tw/en/batch_order.html",
		"/order/batch_order.html"
		);
var innerSendUrl = new Array(
		"/innerorder/sc/order_inner.html",
		"/innerorder/hk/tc/order_inner.html",
		"/innerorder/hk/en/order_inner.html",
		"/innerorder/tw/tc/order_inner.html",
		"/innerorder/tw/en/order_inner.html",
		"/innerorder/order_inner.html"
		);
var discountSendUrl = new Array(
		"/innerorder/sc/inner_discount_order.html",
		"/innerorder/hk/tc/inner_discount_order.html",
		"/innerorder/hk/en/inner_discount_order.html",
		"/innerorder/tw/tc/inner_discount_order.html",
		"/innerorder/tw/en/inner_discount_order.html",
		"/innerorder/inner_discount_order.html"
		);
var discountConfirmUrl = new Array(
		"/innerorder/sc/inner_discount_submit.html",
		"/innerorder/hk/tc/inner_discount_submit.html",
		"/innerorder/hk/en/inner_discount_submit.html",
		"/innerorder/tw/tc/inner_discount_submit.html",
		"/innerorder/tw/en/inner_discount_submit.html",
		"/innerorder/inner_discount_submit.html"
		);
var orderHisUrl = new Array(
		"/order/sc/myorder_record.html",
		"/order/hk/tc/myorder_record.html",
		"/order/hk/en/myorder_record.html",
		"/order/tw/tc/myorder_record.html",
		"/order/tw/en/myorder_record.html",
		"/order/myorder_record.html");
var sendWaybillHisUrl = new Array(
		"/waybill/sc/send_waybill_query.html",
		"/waybill/hk/tc/send_waybill_query.html",
		"/waybill/hk/en/send_waybill_query.html",
		"/waybill/tw/tc/send_waybill_query.html",
		"/waybill/tw/en/send_waybill_query.html",
		"/waybill/send_waybill_query.html"
		);
var recWaybillHisUrl = new Array(
		"/waybill/sc/rece_waybill_query.html",
		"/waybill/hk/tc/rece_waybill_query.html",
		"/waybill/hk/en/rece_waybill_query.html",
		"/waybill/tw/tc/rece_waybill_query.html",
		"/waybill/tw/en/rece_waybill_query.html",
		"/waybill/rece_waybill_query.html"
		);
var tracingWaybillUrl = new Array(
		"/waybill/sc/tracing_waybill_query.html",
		"/waybill/hk/tc/tracing_waybill_query.html",
		"/waybill/hk/en/tracing_waybill_query.html",
		"/waybill/tw/tc/tracing_waybill_query.html",
		"/waybill/tw/en/tracing_waybill_query.html",
		"/waybill/tracing_waybill_query.html"
		);
var exportWaybillUrl = new Array(
		"order/sc/record_export.html",
		"order/hk/tc/record_export.html",
		"order/hk/en/record_export.html",
		"order/tw/tc/record_export.html",
		"order/tw/en/record_export.html",
		"order/record_export.html"
		);
var infoUrl = new Array(
		"/user/sc/user_info.html",
		"/user/hk/tc/user_info.html",
		"/user/hk/en/user_info.html",
		"/user/tw/tc/user_info.html",
		"/user/tw/en/user_info.html",
		"/user/user_info.html"
		);
var infoAddressUrl = new Array(
		"/addrbook/sc/address.html",
		"/addrbook/hk/tc/address.html",
		"/addrbook/hk/en/address.html",
		"/addrbook/tw/tc/address.html",
		"/addrbook/tw/en/address.html",
		"/addrbook/address.html"
		);
var infoMyPointUrl = new Array(
		"/user/point/sc/my_point.html",
		"/user/point/hk/tc/my_point.html",
		"/user/point/hk/en/my_point.html",
		"/user/point/tw/tc/my_point.html",
		"/user/point/tw/en/my_point.html",
		"/user/point/my_point.html"
		);
var infoMyMonthPointUrl = new Array(
		"/user/point/sc/my_month_point.html",
		"/user/point/hk/tc/my_month_point.html",
		"/user/point/hk/en/my_month_point.html",
		"/user/point/tw/tc/my_month_point.html",
		"/user/point/tw/en/my_month_point.html",
		"/user/point/my_month_point.html"
		);
var infoCouPonUrl = new Array(
		"/member/sc/coupon.html",
		"/member/hk/tc/coupon.html",
		"/member/hk/en/coupon.html",
		"/member/tw/tc/coupon.html",
		"/member/tw/en/coupon.html",
		"/member/coupon.html"
		);
var infoPwdUrl = new Array(
		"/user/sc/passw_change.html",
		"/user/hk/tc/passw_change.html",
		"/user/hk/en/passw_change.html",
		"/user/tw/tc/passw_change.html",
		"/user/tw/en/passw_change.html",
		"/user/passw_change.html"
		);
var infoSubscriptionUrl = new Array(
		"/subscription/sc/mysubscription.html",
		"/subscription/hk/tc/mysubscription.html",
		"/subscription/hk/en/mysubscription.html",
		"/subscription/tw/tc/mysubscription.html",
		"/subscription/tw/en/mysubscription.html",
		"/subscription/mysubscription.html"
		);
var authorizationUrl = new Array(
		"/user/authorization/sc/authorization.html",
		"/user/authorization/hk/tc/authorization.html",
		"/user/authorization/hk/en/authorization.html",
		"/user/authorization/tw/tc/authorization.html",
		"/user/authorization/tw/en/authorization.html",
		"/user/authorization/authorization.html"
);
var myoptionUrl = new Array(
		"/user/sc/myoption.html",
		"/user/myoption.html",
		"/user/hk/tc/myoption.html",
		"/user/hk/en/myoption.html",
		"/user/tw/tc/myoption.html",
		"/user/tw/en/myoption.html"
);
var eaccountUrl = new Array(
		"/sfpay/sc/account.html",
		"/sfpay/en/account.html",
		"/sfpay/account.html"
		);
var sfbestUrl = new Array(
		"/sfbest/sc/sfbest.html",
		"/sfpay/en/sfbest.html",
		"/sfpay/sfbest.html"
		);
var onlySCUrl = new Array(
		"sfbest.html"
		,"batch_order.html"
		,"record_export.html"
		,"my_point.html"
		,"coupon.html"
		,"account.html"
		,"inner_discount_order.html"
		,"inner_discount_submit.html"
		,"inner_print.html"
		,"myorder_inner_detail.html"
		,"myorder_inner.html"
		,"order_inner.html"
		,"coupon.html"
		,"getCouponRule.html"
		,"getCouponRule-en.html"
		,"useCouponRule.html"
		,"useCouponRule-en.html"
		,'batch_order.html'
		,'batchpre.html'
		,'bth_detail.html'
		,'bth_ok.html'
		,'bthmyorder_detail.html'
		,"pointOrder.html"
		,"combination_report.html"
		,"month_billing.html"
		,"myReport.html"
		,'sf-express.html'
		,'send_waybill_query.html'
		,'rece_waybill_query.html'
		);
var urlToMenuCookie =
	[
	{"url":indexURL,"pName":"_header_home","p2Name":""},
	
	{"url":normalSendUrl,"pName":"_header_send","p2Name":""},
	{"url":batchSendUrl,"pName":"_header_send","p2Name":""},
	{"url":innerSendUrl,"pName":"_header_send","p2Name":""},
	{"url":discountSendUrl,"pName":"_header_send","p2Name":""},
	{"url":discountConfirmUrl,"pName":"_header_send","p2Name":""},
	
	{"url":orderHisUrl,"pName":"_header_info_send_his","p2Name":"_header2_order_his"},
	{"url":sendWaybillHisUrl,"pName":"_header_info_send_his","p2Name":"_header2_send_waybill_his"},
	{"url":recWaybillHisUrl,"pName":"_header_info_send_his","p2Name":"_header2_rec_waybill_his"},
	{"url":tracingWaybillUrl,"pName":"_header_info_send_his","p2Name":"_header2_tracing_waybill"},
	{"url":exportWaybillUrl,"pName":"_header_info_send_his","p2Name":"_header2_export_waybill"},
	
	{"url":infoUrl,"pName":"_header_account_manager","p2Name":"_header2_info"},
	{"url":infoAddressUrl,"pName":"_header_account_manager","p2Name":"_header2_info_address"},
	{"url":infoMyPointUrl,"pName":"_header_account_manager","p2Name":"_header2_info_my_point"},
	{"url":infoMyMonthPointUrl,"pName":"_header_account_manager","p2Name":"_header2_info_my_point"},
	{"url":infoCouPonUrl,"pName":"_header_account_manager","p2Name":"_header2_info_coupon"},
	{"url":infoPwdUrl,"pName":"_header_account_manager","p2Name":"_header2_info_pwd"},
	{"url":infoSubscriptionUrl,"pName":"_header_account_manager","p2Name":"_header2_info_subscription"},
	{"url":authorizationUrl,"pName":"_header_account_manager","p2Name":"_header2_info_authorization_"},
	{"url":myoptionUrl,"pName":"_header_account_manager","p2Name":""},
	{"url":eaccountUrl,"pName":"_header_account_manager","p2Name":"_header2_info_sfpay_account"},
	{"url":sfbestUrl,"pName":"_header_account_manager","p2Name":"_header2_info_sfbest"},
	
	{"url":reportUrl,"pName":"_header_reprot","p2Name":""}
	
	];
function getRegionCode() {
	var regioncode = "cn";//
	var curURL = document.location.href;
	if (curURL.indexOf("/hk/") >= 0){
		regioncode = "hk";
	}
	if (curURL.indexOf("/tw/") >= 0){
		regioncode = "tw";

	}
	if (curURL.indexOf("/service/") >= 0){
		if(curURL.indexOf("/sc/") >= 0){
			regioncode = "cn";
		}else{
			regioncode = "hk";
		}
	}
	return regioncode;
}

function getLanCode() {
	var langCode = 'sc';
	var url = location.href;
	/*var p = url.split("/");
	var regionCode = getRegionCode();*/
	if(url.indexOf("/tc/") >= 0){
		langCode = "tc";
	}
	if(url.indexOf("/en/") >= 0){
		langCode = "en";
	}
	/*if(regionCode!='cn'){
		langCode = p[p.length - 2];
	}else{
		langCode = 'sc';
	}*/
	return langCode;
}
