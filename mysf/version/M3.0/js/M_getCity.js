seajs.config({
    alias: {
      //'hammer' : '../../../../version/M3.0/js/M_plug/hammer.min.js',
      // 'iscroll': '../../../../version/M3.0/js/M_plug/iscroll.min.js',
      //'layer'  :'../../../../version/M3.0/js/M_plug/layer/layer.js',
      //'public' :'../../../../version/M3.0/js/M_public.js',
      'city' :'../../../../version/M3.0/js/city.data-3.js',
    }
});

seajs.use(['city'], function(myCity) {
    $(function() {

        console.log(cityData3[0].text);

        var oSetBtn = $('.js_setMoren');
        var oAddr_mrBtn = $('.js_mrBtn');
        // 默认按钮选择
        oSetBtn.on('click',function() {
            if( oAddr_mrBtn.hasClass('active') ) {
                oAddr_mrBtn.removeClass('active')
            }
            else {
                oAddr_mrBtn.addClass('active')
            }
        });

    });

});


