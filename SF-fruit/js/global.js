seajs.config({
    alias: {
      'hammer' : './js/plug/hammer.min.js',
      'iscroll': './js/plug/iscroll.min.js',
      'layer'  :'./js/plug/layer/layer.js',
      'public' :'./js/public.js',
    }
});

seajs.use(['hammer','iscroll','layer','public'], function(myHam,myIsc,myLay,myPub) {
   $(function () {
        var oContain = $('.js_contain');            //内容
        var oFooter = $('.js_footer');              //底部
        var oNavSecList = $('.js_navSecList');      //二级导航
        var oNavSecUl = $('.js_navSecList').find('ul');      //二级导航ul
        var oNavSecLi = $('.js_navSecList').find('li');      //二级导航li
        var oGoodsBox = $('.js_goodsBox');          //产品页面
        var oIndexSearch = $('.js_IndexSearch');    //搜索历史
        var oSearchArea = $('.js_searchArea');      //搜索框区域
        var oSStart = $('.js_sStart');              //开始搜索按钮
        var oSCancel = $('.js_sCancel');            //取消梭梭按钮
        var oBtnAddCar = $('.js_addCar');           //加入购物车按钮
        var oMoveIcon = $('.js_moveIcon');          //加入购物车动态标记
        var oGoTop = $('.js_goTop');                //回到顶部
        var oSearchTxt = $('.js_searchTxt');        //搜索框
        var oSeletSide = $('.js_seletSide');        //下滑窗口
        var oBotCloseBtn = $('.js_closeBtn');       //关闭按钮
        var oArrDownBtn = $('.js_arrDownBtn');      //下滑按钮
        var oGoodsSizeUl = $('.js_goodsSize ul');

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


        var oDeButton = $('.js_deButton');          //结账和加入操作按钮
        var oCarhref = $('.js_carhref');            //结账和加入 确定
        var oShadow = $('.js_shadow');              //阴影

        var oAmountBox = $('.js_amountBox');      //数量框
        var oGoodsPrice = $('.js_goodsPrice');      //产品价格
        var oSumNum = $('.js_sumNum');              //总数

        var obtnBusines = $('.js_btnA');            //联系商家信息按钮
        var oContactBoss = $('.js_contactBoss');    //商家信息
        var oUserMessage = $('.js_message').find('textarea');  //留言区域
        var maxLWord = $('.js_wordmax');               //最大字数



/**********************************  添加滚动条 start  *********************************/

        oNavSecUl.css({width:oNavSecLi.outerWidth(true) * oNavSecLi.length});
        var conScroll = new myPub.ScrollBar();
        if(oContain.length>0) {
            conScroll.AddScroll(oContain[0],{probeType: 3,click:true,mouseWheel:true});
            conScroll.ScrollIng(function() {
                this.y + 450 < 0 ? oGoTop.show() : oGoTop.hide();
            });
            // 阻止其他元素拖动
            $(document).on('touchmove',function(e) { e.preventDefault();});
            oGoTop.hammer().on('tap',function(e) {
                conScroll.GotoScroll('js_contain');
                myPub.HamstopPropaga();
            });

        }
        // //二级导航滚动
        // if(oNavSecList.length>0) {
        //     var secScroll = new myPub.ScrollBar();
        //     secScroll.AddScroll(oNavSecList[0],{scrollX: true, scrollY: false, click:true,mouseWheel:true});
        // }


/**********************************  添加滚动条 end    *************************************/


/**********************************  增加减少 start   ***********************************/
        if(oAmountBox.length > 0) {
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
        }


/**********************************  增加减少 end     ***********************************/


/**********************************  购物车 start *************************************/


        if(oCarListArea.length>0) {

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
                $(this).siblings('.js_carListArea').removeClass('TformY5').find('.js_checkBox').removeClass('active');
                // 判断删除店家
                if($(this).parents('.js_carList').find('li').length == 1) {
                    $(this).parents('.carListBox').remove();
                }
                else {
                    $(this).parents('li').remove();
                }
                conScroll.ReScroll();
                myPub.ShopSumPrice(oCheckBox,'.listBox','.js_goodsPrice',oSumPrice);


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
                conScroll.ReScroll();
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
        }


/**********************************  购物车 end   *************************************/


/**********************************  下滑窗口 start   **********************************/
        var oSeletSideH = oSeletSide.outerHeight(true);
        var ArrDownHam = new myPub.onHammerSwiper();
        var jumpBtn = false;     //判断是加入购物车false 还是结账true

        oSeletSide.css({bottom:-oSeletSideH});

        // 下滑按钮
        if(oArrDownBtn.length>0) {
            ArrDownHam.addHamSwipe(oArrDownBtn[0],'swipedown',function (e) {
                oSeletSide.stop().animate({bottom:-oSeletSideH},300,function() {oSeletSide.hide();});
                oShadow.hide();
            });
        }
        // 关闭按钮
        oBotCloseBtn.hammer().on('tap',function() {
            oSeletSide.stop().animate({bottom:-oSeletSideH},300,function(){ oSeletSide.hide();});
            oShadow.hide();
        });

        //确定按钮
        oCarhref.on('click',function() {
            if(jumpBtn) {
                myPub.ValiNum(oSumNum,function() {
                    oCarhref.attr('href','#1');
                },function() {
                    oCarhref.attr('href','https://www.baidu.com/');
                    oSeletSide.show().stop().animate({bottom:0},300);
                    oShadow.show();
                });
            }
            else {
                myPub.TipLayer('<span class="icon-rightIcon icon_myLayer"></span>加入购物车成功！');
                oSeletSide.stop().animate({bottom:-oSeletSideH},300,function(){ oSeletSide.hide();});
                oShadow.hide();

            }
        });

        // 加入和立即购买 target.children.nodeName
        oDeButton.hammer().on('tap',function() {
            var index = oDeButton.index(this);
            oSeletSide.show().stop().animate({bottom:0},300);
            oShadow.show();
            switch(index) {
                //加入购物车连接
                case 0: jumpBtn = false;
                    break;
                //立即购买连接
                case 1: jumpBtn = true;
                    break;
            }
            myPub.HamstopPropaga();
        });

        //规格选择
        oGoodsSizeUl.find('li').hammer().on('tap',function(e) {
            var index = $(this).index();
             oGoodsSizeUl.find('li').removeClass('active').eq(index).addClass('active');
        });

/**********************************  下滑窗口 end     **********************************/


        //显示搜索框
        oSStart.hammer().on('tap',function(e) {
            oSearchArea.show().eq(0).hide();
            oGoodsBox.hide();
            oFooter.hide();
            oIndexSearch.show();
            conScroll.ReScroll(oContain[0]);
            oSearchTxt.focus();
        });

        //隐藏搜索框
        oSCancel.hammer().on('tap',function(e) {
            oSearchArea.show().eq(1).hide();
            oGoodsBox.show();
            oFooter.show();
            oIndexSearch.hide();
            conScroll.ReScroll(oContain[0]);
            oSearchTxt.blur();
        });

        //添加购物车动画
        if(oFooter.find('li').length<=2) {
            myPub.AddCarAnimate(oBtnAddCar,oMoveIcon,"74%","95%");
        }
        else {
            myPub.AddCarAnimate(oBtnAddCar,oMoveIcon,"30%","94%");
        }

        // 弹出商家信息列表
        obtnBusines.hammer().on('tap',function() {
            var styleTitle = 'width:100%;  border:none';
            oContactBoss.show()
            myPub.TipTitleLayer('联系商家',styleTitle, oContactBoss.html());
        });

        // 限制字数
        if(oUserMessage.length>0) {
            myPub.statInputNum(oUserMessage,maxLWord);
        }



   });
});


