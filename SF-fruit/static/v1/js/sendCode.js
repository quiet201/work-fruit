seajs.config({
    alias: {
      'hammer' : './static/v1/js/plug/hammer.min.js',
      // 'iscroll': './js/plug/iscroll.min.js',
      'layer'  :'./static/v1/js/plug/layer/layer.js',
      'public' :'./static/v1/js/public.js',
    }
});


seajs.use(['hammer','layer','public'], function(myHam,myLay,myPub) {
    $(function() {
        // 发送验证码
        var oGetCode = $('.js_getCode'); //发送验证码
        var oInputText = $('.js_Text');  //输入框
        var oPhonetext = $('.js_phonetext');  //手机输入框
        var oTipError = $('.js_error');
        // 显示清空按钮
        oInputText.on('input propertychange',function() {
            $(this).val() == '' ? $(this).siblings('.js_clearBtn').addClass('active') : $(this).siblings('.js_clearBtn').removeClass('active');
        });

        oPhonetext.on('focus',function(e){
            oPhonetext.siblings('.js_error').hide().text('').removeClass('on')
        })

        oPhonetext.on('blur',function() {
            myPub.checkMobile(oPhonetext,function() {
                oPhonetext.siblings('.js_error').show().text('请输入手机号码').addClass('on');
            },function() {
                oPhonetext.siblings('.js_error').show().text('请输入正确的手机号码').addClass('on');
            },function() {
                oPhonetext.siblings('.js_error').hide().text('').removeClass('on')
            })
        })

        oGetCode.eq(0).on('click',function() {
            if(!oTipError.eq(0).hasClass('on')) {
                myPub.checkMobile(oPhonetext,function() {
                    oPhonetext.siblings('.js_error').show().text('请输入手机号码').addClass('on');
                },function() {
                    oPhonetext.siblings('.js_error').show().text('请输入正确的手机号码').addClass('on');
                },function() {
                    oPhonetext.siblings('.js_error').hide().text('').removeClass('on');
                    oGetCode.hide().eq(1).show();
                    myPub.CutTime(3,function(_time) {
                        oGetCode.hide().eq(0).show();
                        oGetCode.eq(1).find('span').text(_time+'s');
                        myPub.TipBtnLayer('您的手机号码已与其他QQ绑定，如果绑定请继续点击获取验证码，输入验证码验证后将解除与其他QQ号的绑定关系。','提示')
                    },function(time) {
                        oGetCode.eq(1).find('span').text(time+'s');
                    })
                })
            }

        });
    });

});