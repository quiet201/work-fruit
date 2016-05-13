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
        var oOrderSlide = $('.js_orderInfoBox').find('.swiper-slide');
        var oBossInfo = $('.js_bossInfo');              //商家信息 js_bossInfo
        var oBossName = $('.js_bossName');              //店家名字
        var oCanOrderInfo = $('.js_cancelOrder');       //取消订单信息


        oOrderSlide.hammer().on('tap',function(e) {
            //console.log(e.gesture.target)
            var _btnA = $(e.gesture.target);
            var _typeNum = _btnA.attr('_type')*1;

            switch(_typeNum) {
                // 0 联系商家
                case 0:
                    var styleTitle = 'width:100%;  border:none';
                    var _sBossInfo= _btnA.parents('.js_cBossA').siblings('.js_bossInfo');
                    var _index = oBossInfo.index(_sBossInfo);
                    var _BossName = oBossName.eq(_index).text();
                    _sBossInfo.show();
                    myPub.TipTitleLayer('联系商家: '+_BossName,styleTitle, _sBossInfo.html(),function() {
                        _sBossInfo.hide();
                    });

                    break;
                // 1 取消订单
                case 1:
                    var styleTitle = '请选择取消原因';
                    myPub.askLayer(oCanOrderInfo.html(),function() {
                        alert('yes');
                    },function() {
                        alert('no');
                        oCanOrderInfo.hide();
                    },styleTitle,
                    function() {
                        oCanOrderInfo.show();
                        // 弹框原因选择
                        var _oReasonListLi = $('.js_reasonList').find('li');
                        var oUserMessage = $('.js_message').find('textarea');  //留言区域
                        var maxLWord = $('.js_wordmax');               //最大字数
                        _oReasonListLi.hammer().off('tap');
                        _oReasonListLi.hammer().on('tap',function() {
                            _oReasonListLi.removeClass('active');
                            $(this).addClass('active');
                        });
                        myPub.statInputNum(oUserMessage,maxLWord);
                    });
                    break;
                // 2 立即付款
                case 2: alert(_typeNum);
                    break;
                // 3 申请售后
                case 3: alert(_typeNum);
                    break;
                // 4 查看物流
                case 4: alert(_typeNum);
                    break;
                // 5 确认收货
                case 5:
                    var _cont = '<p class="delTipP" >亲！ 确定您已收到货物了吗？</p><span class="delTipSpan">确认收货后此交易将会关闭</span>';
                    myPub.askLayer(_cont,function() {
                        alert('确定' + _typeNum);
                        myPub.LayerCloseAll();

                    },function() {
                        alert('取消了' + _typeNum);

                    },'no');
                    break;
                // 6 删除订单
                case 6:
                    var _cont = '<p class="delTipP" >亲！ 您确定要删除此订单吗？</p><span class="delTipSpan">删除后此订单会永远消失</span>';
                        myPub.askLayer(_cont,function() {
                            alert('确定' + _typeNum);
                            myPub.LayerCloseAll();
                        },function() {
                            alert('取消了' + _typeNum);
                        },'no');
                    break;
                default:;
                    break;
            }
        });


    });

});