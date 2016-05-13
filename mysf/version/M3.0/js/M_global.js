seajs.config({
    alias: {
      'hammer' : '../../../../version/M3.0/js/M_plug/hammer.min.js',
      //'iscroll': '../../../../version/M3.0/js/M_plug/iscroll.min.js',
      //'layer'  :'../../../../version/M3.0/js/M_plug/layer/layer.js',
      'public' :'../../../../version/M3.0/js/M_public.js',
    }
});

seajs.use(['hammer''public'], function(myHam,myPub) {
    $(function() {
        var oMobNum = $('.js_mobNum'); //手机号码

        // 分段显示手机号码
        oMobNum.each(function(i) {
           myPub.SubMobNum(oMobNum.eq(i))
        })


    });

});


