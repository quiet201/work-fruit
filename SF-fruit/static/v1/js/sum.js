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
        var oAmountBox = $('.js_amountBox');        //数量框
        var oGoodsPrice = $('.js_goodsPrice');      //产品价格
        var oSumNum = $('.js_sumNum');              //总数
        var oCheckBox = $('.js_checkBox');          //单选按钮
        var oSumPrice = $('.js_sumPrice');                      //总价格
        var nOrderNum = $('.js_orderNum');                      //订单数量


/**********************************  增加减少 start   ***********************************/

        oAmountBox.each(function(i) {
            var oHandBtn = oAmountBox.eq(i).find('.js_handBtn');
            var oGoodsPriceTxt = oGoodsPrice.eq(i).text();
            var iNow = oSumNum.eq(i).val();
            //oGoodsPrice.eq(i).html((oGoodsPriceTxt*iNow).toFixed(2));

            oHandBtn.hammer().on('tap',function() {
                var index = oHandBtn.index(this);
                switch(index) {
                    //减少
                    case 0:
                         if(iNow <= 1) {
                            iNow = 1;
                            myPub.TipLayer("最小为1");
                         }
                         else {
                            iNow--;
                         }
                        break;
                    //增加
                    case 1:
                        if(iNow >= 99) {
                            iNow = 99;
                            myPub.TipLayer("最大为99");
                         }
                         else {
                            iNow++;
                         }
                        break;
                }
                oGoodsPrice.eq(i).html((oGoodsPriceTxt*iNow).toFixed(2));
                oSumNum.eq(i).val(iNow);
                myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);
            });


            oSumNum.eq(i).on('input propertychange',function(e) {
                myPub.ValiNum(oSumNum.eq(i),function() {
                    myPub.TipLayer('输入正确数字');
                    oSumNum.eq(i).val(1);
                },function() {
                    var _iNow = oSumNum.eq(i).prop('value')*1;
                    // 设置最大值会导致底部上移
                    if(_iNow >= 99) {
                        _iNow = 99;
                        oSumNum.eq(i).val(_iNow);
                        myPub.TipLayer("最大为"+_iNow);
                     }
                    iNow = _iNow;
                    oGoodsPrice.eq(i).html((oGoodsPriceTxt*iNow).toFixed(2));
                    myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);

                });
                e.preventDefault();
            });

            oSumNum.eq(i).blur(function() {
               // myPub.TipLayer( $('.js_seletSide').css('bottom')  )
            });

        });

/**********************************  增加减少 end     ***********************************/

    });

});