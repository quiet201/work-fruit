seajs.config({
    alias: {
      'hammer' : './js/M_plug/hammer.min.js',
      // 'iscroll': './js/M_plug/iscroll.min.js',
      'layer'  :'./js/M_plug/layer/layer.js',
      'public' :'./js/M_public.js',
    }
});

seajs.use(['hammer','layer','public'], function(myHam,myLay,myPub) {
    $(function() {
        var oMobNum = $('.js_mobNum'); //手机号码



        // 分段显示手机号码
        oMobNum.each(function(i) {
          myPub.SubMobNum(oMobNum.eq(i));
        });





/**********************************  购物车 start *************************************/


/**********************************  购物车 end   *************************************/



    });

});


