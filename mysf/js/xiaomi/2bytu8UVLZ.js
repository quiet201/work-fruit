(function(Z){
    window.callBridge = function () {
        var ARGU = arguments;
        window.AlipayJSBridge ? window.AlipayJSBridge.call.apply(null, ARGU) : document.addEventListener("AlipayJSBridgeReady", function () {
            window.AlipayJSBridge.call.apply(null, ARGU);
        }, false);
    }
    var SHUNFENG = window.SHUNFENG = window.SHUNFENG || {};
    /*ua判断*/
    SHUNFENG.uaDetect =function(){
        var ua=navigator.userAgent,
            order=ua.indexOf('AlipayClient'),
            version;
        if(order!==-1){
            version=ua.substr(order+13,3);
            if(version>=0.1){
                return version;
            }else{
                return 0.1
            }
        }else{
            return 0;
        }
    }
    SHUNFENG.APDetect=SHUNFENG.uaDetect();
    /*toast提示*/
    SHUNFENG.toastMsg=function(msg,tipType){
        if(SHUNFENG.APDetect>=8.0){
            tipType=tipType||'fail';
            window.callBridge('toast', {
                content: msg,
                type: tipType,
                duration: 3000
            });
        }else{
            window.alert(msg);
        }
    }
    /*alert提示*/
    SHUNFENG.alertMsg=function(msg,title,btnWords){
        if(SHUNFENG.APDetect>=8.1){
            tipType=tipType||'fail';
            window.callBridge('alert', {
                title: btnWords||'',
                message: msg,
                button: btnWords||'我知道了'
            });
        }else if(SHUNFENG.APDetect>=8.0){
            window.callBridge('toast', {
                content: (typeof title==='undefined')?msg:('['+title+']'+msg),
                type: 'none',
                duration: 3000
            });
        }else{
            window.alert((typeof title==='undefined')?msg:('['+title+']'+msg));
        }
    }
    /*表单验证，输出没验证通过的项*/
    SHUNFENG.validForm=function(form){
        var result=[];
        form.find('[data-rule]').each(function(){
            var resultSingle=SHUNFENG.vaildSingle(Z(this));
            if(resultSingle){
                result.push(resultSingle[0]);
            }
        });
        return (result.length===0)?false:result;
    }
    /*表单验证，验证单个项*/
    SHUNFENG.vaildSingle=function(el){
        var result=[];
        if(el.attr('required')){
            if(el.val().length===0){
                result.push({
                    rule:el.data('rule'),
                    error:'required'
                });
                return result;
            }
        }
        if(el.data('valid')){
            var reg=new RegExp(el.data('valid'));
            if(!el.val().match(reg)){
                result.push({
                    rule:el.data('rule'),
                    error:'regRule'
                });
                return result;
            }
        }
        if(el.data('valid1')){
            var reg=new RegExp(el.data('valid1'));
            var inputText=el.val()?el.val().replace(/ /g,''):"";
            if(!inputText.match(reg)){
                result.push({
                    rule:el.data('rule'),
                    error:'regRule'
                });
                return result;
            }
        }
        return false;
    }
    /*对没验证通过的项使用特定方式提示，本例为toast提示*/
    SHUNFENG.validTips=function(result,tipsMap){
        if(result.length>0){
            var alertResult=result[0],
                alertTip='系统繁忙，请稍后再试！';
            if(tipsMap[alertResult.rule]&&tipsMap[alertResult.rule][alertResult.error]){
                alertTip=tipsMap[alertResult.rule][alertResult.error];
            }
            SHUNFENG.toastMsg(alertTip);
        }
    }
})(Zepto);