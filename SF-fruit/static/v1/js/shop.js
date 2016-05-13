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
        var oCarListHead = $('.js_carListHead');        //店家
        var oCarList = $('.js_carList');                //全部宝贝
        var oCarListArea = $('.js_carListArea');        //列表区域
        var oDelBtn = $('.js_btnDel');                  //单个删除按钮
        var oStoreEditBtn = $('.js_storeEdit');         //整组删除按钮
        var oCheckBox = $('.js_checkBox');              //单选按钮
        var oGoodsSelet = oCarList.find('.js_checkBox');        //单个宝贝选择按钮
        var oStoreSelet = oCarListHead.find('.js_checkBox');    //店家全选按钮
        var oAllseletBtn = $('.js_btnAllselet');                //全部选按钮
        var oSumPrice = $('.js_sumPrice');                      //总价格
        var nOrderNum = $('.js_orderNum');                      //订单数量
        var oBtnPay = $('.js_btnPay');                 //提交按钮


/**********************************  购物车 start *************************************/



        myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);
        var orderNum = oCarListArea.find('.js_checkBox.active').length;
        nOrderNum.text(orderNum);

        //左滑动出现删除
        oCarListArea.hammer().on('swipeleft',function(e) {
            var index = oCarListArea.index(this);
            if(oCarListArea.hasClass('TformY5')) {
                oCarListArea.removeClass('TformY5');
            }
            else {
                oCarListArea.eq(index).addClass('TformY5');
            }
        });
        //右滑动隐藏删除
        oCarListArea.hammer().on('swiperight',function(e) {
            var index = oCarListArea.index(this);
            oCarListArea.removeClass('TformY5');
        });

        // 单个删除
        oDelBtn.hammer().on('tap',function(e) {
            var _cont = '<p class="delTipP" style="padding:0 30px">确定删除该商品？</p><span class="delTipSpan">删除后不可回复</span>';
            var _this = $(this);
            myPub.askLayer(_cont,function() {
                // 判断删除店家
                alert('确定');
                if(_this.parents('.js_carList').find('li').length == 1) {
                    _this.parents('.carListBox').remove();
                }
                else {
                    _this.parents('li').remove();
                }
                _this.siblings('.js_carListArea').removeClass('TformY5').find('.js_checkBox').removeClass('active');
                myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);
                myPub.LayerCloseAll();
            },function() {
                alert('取消了');
                _this.siblings('.js_carListArea').removeClass('TformY5').find('.js_checkBox').removeClass('active');
            },'提示');
        });

        // 整组选择
        oStoreEditBtn.hammer().on('tap',function() {
            // 删除选中或者整个
            // var _off = $(this).siblings('.js_checkBox').hasClass('active');
            // // 删除店家
            // if(_off) {
            //     $(this).parents('.js_carListHead').siblings('.js_carList').find('.js_carListArea').removeClass('TformY5').parents('.carListBox').remove();
            // }
            // // 删除选中的
            // else {
            //     $(this).parents('.js_carListHead').siblings('.js_carList').find('.active').parents('.js_carListArea').removeClass('TformY5').parents('li').remove();
            // }
            // 出现删除按钮 再次点击取消
            var _off = $(this).parents('.js_carListHead').siblings('.js_carList').find('.js_carListArea');
            if(_off.hasClass('TformY5')) {
                $(this).text('编辑');
                _off.removeClass('TformY5');
            }
            else {
                $(this).text('完成');
                _off.addClass('TformY5');
            }
        });

        // 单选选中和取消
        oCheckBox.hammer().on('tap',function() {
            if($(this).hasClass('active')) {
                $(this).removeClass('active').parents('.js_carList').siblings('.js_carListHead').find('.js_checkBox').removeClass('active');
                oAllseletBtn.removeClass('active');
            }
            else {
                $(this).addClass('active');
                // 店家全选
                var _CheckBoxNum = $(this).parents('.js_carList').find('.js_checkBox').length;
                var _ActiveNum = $(this).parents('.js_carList').find('.active').length;
                if(_ActiveNum >=_CheckBoxNum) {
                    $(this).parents('.js_carList').siblings('.js_carListHead').find('.js_checkBox').addClass('active');
                    var _actNum = $('.js_carListHead').find('.active').length;
                    var _checkNum = $('.js_carListHead').find('.js_checkBox').length;
                    if(_actNum >= _checkNum) {
                        oAllseletBtn.addClass('active');
                    }
                }
            }
            myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);
            var orderNum = oCarListArea.find('.js_checkBox.active').length;
            nOrderNum.text(orderNum);
        });


        // 店家全选
        oStoreSelet.hammer().on('tap',function() {
            if($(this).hasClass('active')) {
                $(this).parents('.js_carListHead').siblings('.js_carList').find('.js_checkBox').addClass('active');
            }
            else {
                $(this).parents('.js_carListHead').siblings('.js_carList').find('.js_checkBox').removeClass('active');
                oAllseletBtn.removeClass('active');
            }
            myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);
            var orderNum = oCarListArea.find('.js_checkBox.active').length;
            nOrderNum.text(orderNum);
        });

        // 全选
        oAllseletBtn.hammer().on('tap',function() {
            if($(this).hasClass('active')) {
                $(this).removeClass('active');
                oCheckBox.removeClass('active');
                oSumPrice.text(0);
            }
            else {
                $(this).addClass('active');
                oCheckBox.addClass('active');
            }
            myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);
            var orderNum = oCarListArea.find('.js_checkBox.active').length;
            nOrderNum.text(orderNum);
        });


        // 提交订单操作
        oBtnPay.on('click',function() {
            if(oUserAddr.css('display') == 'none') {
                myPub.TipLayer('亲，还没选择地址呢..^-^!');
            }
            else {
                var _tit = '请核对您的收货地址';//#666
                var _cont = oUserAddr.find('.js_seletAddr a').html();
                myPub.askLayer(_cont,function() {
                    alert('要跳转支付成功页面');
                    myPub.LayerCloseAll();
                    window.location.href='paySuccess.html';
                },function() {
                    alert('你取消了');
                },_tit);
            }

        });


/**********************************  购物车 end   *************************************/

    });

});