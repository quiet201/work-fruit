seajs.config({
    alias: {
      'hammer' : '../../../version/M3.0/js/M_plug/hammer.min.js',
      'iscroll': '../../../version/M3.0/js/M_plug/iscroll.min.js',
      //'layer'  :'../../../version/M3.0/js/M_plug/layer/layer.js',
      'public' :'../../../version/M3.0/js/M_public.js',
    }
});

seajs.use(['hammer','iscroll','public'], function(myHam,myIsc,myPub) {
    $(function() {
        var oSF_seletDay = $('.js_SF-seletDay');  // 产品类型选择day
        var oShowDay = $('.js_showDay');
        var oShowTime = $('.js_showTime');
        var oProductTypePage = $('.js_productType');


        var oSeletArea = $('.js_seletArea');
        var oSeletAddrBtn = $('.js_seletAddrBtn');
        var oSeletAreaScroll = new myPub.ScrollBar();
        oSeletAreaScroll.AddScroll(oSeletArea[0],{
            'useTransition':false,
            'mouseWheel':true,
        });

        oSeletAddrBtn.on('click',function() {
            setTimeout(function() {
                oSeletAreaScroll.ReScroll()
            },300)

        });

        // oSF_seletDayScroll.ReScroll()

        // 选中和不选 day
        oSF_seletDay.hammer().on('tap',function(e) {
            var _eTar = e.gesture.target;
            var _target;
            _eTar.nodeName.toLowerCase() == 'li' ? _target = $(_eTar) : _target = $(_eTar).parents('li');

            //产品类型选择
            //判断是否有class act_out 有表示过期 没有表示可选  act_in 表示选中
            if(_target.hasClass('act_out')) {
                alert("已经过期了")
                return;
            }
            else {
                _target.parents('ul').find('li').removeClass('act_in');
                if(_target.hasClass('act_in')) {
                    _target.removeClass('act_in');
                }
                else {
                    _target.addClass('act_in');
                    var _day = _target.find('.js_seletDay').text();
                    var _time = _target.find('.js_seletTime').text();
                    oShowDay.text(_day);
                    oShowTime.find('dt').hide().eq(1).text(_time).show();

                    $('.order_layer_iframe').stop().animate({'height':0},300,function() {
                        $('.order_layer_shade').hide();
                        oProductTypePage.hide();
                    });
                }
            }
        });


    });

});


