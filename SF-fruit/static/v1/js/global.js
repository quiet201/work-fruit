seajs.config({
    alias: {
      'hammer' : './static/v1/js/plug/hammer.min.js',
      // 'iscroll': './js/plug/iscroll.min.js',
      'layer'  :'./static/v1/js/plug/layer/layer.js',
      'public' :'./static/v1/js/public.js',
    }
});

seajs.use(['hammer','layer','public'], function(myHam,myLay,myPub) {
    //seajs.use(['public'],function (myPub) {
    $(function() {
        var oHeader = $('.js_header');              //头部
        var oContain = $('.js_contain');            //内容
        var oFooter = $('.js_footer');              //底部
        var oNavSecList = $('.js_navSecList');      //二级导航
        var oNavSecUl = $('.js_navSecList').find('ul');      //二级导航ul
        var oNavSecLi = $('.js_navSecList').find('li');      //二级导航li

        var oGoTop = $('.js_goTop');                //回到顶部


        var oGoodsBox = $('.js_goodsBox');          //产品页面
        var oSearchBox = $('.js_searchBox');        //搜索框
        var oIndexSearch = $('.js_IndexSearch');    //搜索历史
        var oSearchArea = $('.js_searchArea');      //搜索框区域
        var oSStart = $('.js_sStart');              //开始搜索按钮
        var oSCancel = $('.js_sCancel');            //取消搜索按钮

        var oBtnAddCar = $('.js_addCar');           //加入购物车按钮
        var oMoveIcon = $('.js_moveIcon');          //加入购物车动态标记

        var oSearchTxt = $('.js_searchTxt');        //搜索框
        var oSearchClear = $('.js_clearBtn');       //搜索框清空

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

        var oAmountBox = $('.js_amountBox');        //数量框
        var oGoodsPrice = $('.js_goodsPrice');      //产品价格
        var oSumNum = $('.js_sumNum');              //总数
        var oBtnPay = $('.js_btnPay');                 //提交按钮

        var oContactBossBtn = $('.js_contactBoss');     //联系商家信息按钮 js_contactBoss
        var oBossInfo = $('.js_bossInfo');              //商家信息 js_bossInfo
        var oBossName = $('.js_bossName');              //店家名字
        var oReasonList = $('.js_reasonList');          //取消原因选择
        var oCanOrderBtn = $('.js_cancelOrderBtn');     //取消订单按钮
        var oCanOrderInfo = $('.js_cancelOrder');       //取消订单信息

        var oTrueGetBtn = $('.js_trueGetBtn');          //确认收货
        var oDelOrderBtn = $('.js_delOrderBtn');        //删除订单
        var oCancelApply = $('.js_cancelApply');        //取消申请

        var oUserMessage = $('.js_message').find('textarea');  //留言区域
        var maxLWord = $('.js_wordmax');               //最大字数
        var oUserAddr = $('.js_userAddr');             //用户现在的地址




/**********************************  监测滚动条 start  *********************************/

        // oNavSecUl.css({width:oNavSecLi.outerWidth(true) * oNavSecLi.length});
        // var conScroll = new myPub.ScrollBar();
        // if(oContain.length>0) {
        //     conScroll.AddScroll(oContain[0],{probeType: 3,click:true,mouseWheel:true});
        //     conScroll.ScrollIng(function() {
        //         this.y + 450 < 0 ? oGoTop.show() : oGoTop.hide();
        //     });
        //     // 阻止其他元素拖动
        //     $(document).on('touchmove',function(e) { e.preventDefault();});
        // }
        // //二级导航滚动
        // if(oNavSecList.length>0) {
        //     var secScroll = new myPub.ScrollBar();
        //     secScroll.AddScroll(oNavSecList[0],{scrollX: true, scrollY: false, click:true,mouseWheel:true});
        // }
        $(window).on('scroll',function() {
            myPub.throttle(addFixed,window);

        });





        function addFixed () {
            var _scrollTop = $(window).scrollTop();
            var _time = null;
            if(_scrollTop > 60) {
                if(oSearchArea.eq(0).css('display') == 'none') {
                    oHeader.addClass('fixedDom').css({top:0});
                    oSearchArea.eq(1).hide();
                }
                else {
                    oSearchBox.addClass('fixedDom');
                }
                oGoTop.show();
            }
            else {
                if(oSearchArea.eq(0).css('display') == 'none') {
                    oHeader.removeClass('fixedDom').css({top:'5rem'});
                    clearTimeout(_time)
                    _time = setTimeout(function() {
                        oSearchArea.eq(1).show();
                    },30)
                }
                else {
                    oSearchBox.removeClass('fixedDom');
                }
                oGoTop.hide();
            }
        }

        oGoTop.hammer().on('tap',function(e) {
            //$(window).scrollTop(0);
            $('html,body').stop().animate({scrollTop: '0px'}, 600);
            myPub.HamstopPropaga();
        });


/**********************************  监测滚动条 end    *************************************/


/**********************************  增加减少 start   ***********************************/
   /*
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
    */
/**********************************  增加减少 end     ***********************************/


/**********************************  购物车 start *************************************/
/*

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
        }

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
                    alert('你取消了')
                },_tit);
            }

        });
*/

/**********************************  购物车 end   *************************************/


/**********************************  下滑窗口 start   **********************************/
    /*
        var oSeletSideH = oSeletSide.outerHeight(true);
        var ArrDownHam = new myPub.onHammerSwiper();
        var jumpBtn = false;     //判断是加入购物车false 还是结账true

        oSeletSide.css({bottom:-oSeletSideH});

        // 下滑按钮
        if(oArrDownBtn.length>0) {
            ArrDownHam.addHamSwipe(oArrDownBtn[0],'swipedown',function (e) {
                oSeletSide.stop().animate({bottom:-oSeletSideH},300,function() {oSeletSide.hide();});
                oShadow.hide();
                $(document).off('touchmove');
            });
        }
        // 关闭按钮
        oBotCloseBtn.hammer().on('tap',function() {
            oSeletSide.stop().animate({bottom:-oSeletSideH},300,function(){ oSeletSide.hide();});
            oShadow.hide();
            $(document).off('touchmove');
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
                $(document).off('touchmove');
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
            $(document).on('touchmove',function(e) { e.preventDefault();});
        });

        //规格选择
        oGoodsSizeUl.find('li').hammer().on('tap',function(e) {
            var index = $(this).index();
             oGoodsSizeUl.find('li').removeClass('active').eq(index).addClass('active');
        });
    */
/**********************************  下滑窗口 end     **********************************/

/**********************************  部分公共操作 start **********************************/
        // //显示搜索框
        // oSStart.hammer().on('tap',function(e) {
        //     oSearchArea.show().eq(1).hide();
        //     oGoodsBox.hide();
        //     oFooter.hide();
        //     oIndexSearch.show();
        //     oHeader.hide();
        //     oContain.hide();
        //     oSearchTxt.focus();
        // });

        // //隐藏搜索框
        // oSCancel.hammer().on('tap',function(e) {
        //     oSearchArea.show().eq(0).hide();
        //     oGoodsBox.show();
        //     oFooter.show();
        //     oIndexSearch.hide();
        //     oHeader.show();
        //     oContain.show();
        //     oSearchTxt.blur();
        // });

        // 清空搜索框  oSearchClear
        oSearchClear.hammer().on('tap',function() {
            oSearchTxt.val('');
            $(this).addClass('active').siblings('.js_Text').val('').siblings('.js_error').hide().removeClass('on');
        });

        // 显示清空按钮
        oSearchTxt.on('input propertychange',function() {
            $(this).val() == '' ? oSearchClear.addClass('active') : oSearchClear.removeClass('active');
        });

        //添加购物车动画
        var oShopCarTip = $('.js_userNum');
        var clearTime;
        var oGoodsList = $('.js_goodsList');
        var dbTapOff = true;
        oGoodsList.hammer().on('tap',function(e) {
            //console.log(e)
            if(dbTapOff) { //阻止多次点击 true 可点击
                dbTapOff = false;
                var _tags = e.gesture.target.offsetParent;
                var _tagsParent = $(_tags);
                var _X = e.gesture.center.x;
                var _Y = e.gesture.center.y;
                //console.log(_tagsParent.parents('.picList').find('h4').text());
                //console.log(_tagsParent.parents('li').find('.js_addCar').attr('_id'));
                //console.log(_tagsParent.parents('li').index());
                if(_tags.nodeName.toLowerCase() == 'p' || _tags.nodeName.toLowerCase() == 'em') {
                    var aLi = $(this).find('.js_addCar');
                    var sLeft;
                    if(oFooter.find('li').length<=2) {
                        sLeft = "70%";
                    }
                    else {
                        sLeft = "30%";
                    }
                    myPub.AddCarAnimate(_X,_Y,oMoveIcon,sLeft,"94%",function() {
                            oShopCarTip.addClass('mybounceIn');
                            clearTimeout(clearTime);
                            clearTime = setTimeout(function() {
                                oShopCarTip.removeClass('mybounceIn');


                                dbTapOff = true;
                            },800);
                        });
                    myPub.HamstopPropaga();
                }
            }
        });





        /*
        var oOrderSlide = $('.js_orderInfoBox').find('.swiper-slide');

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
*/






        // 弹出商家信息列表
        oContactBossBtn.on('click',function() {
            var styleTitle = 'width:100%;  border:none';
            var _sBossInfo= $(this).parents('.js_cBossA').siblings('.js_bossInfo');
            var _index = oBossInfo.index(_sBossInfo);
            var _BossName = oBossName.eq(_index).text();
            _sBossInfo.show();
            myPub.TipTitleLayer('联系商家: '+_BossName,styleTitle, _sBossInfo.html(),function() {
                _sBossInfo.hide();
            });
        });

        // 确认收货提示
        oTrueGetBtn.hammer().on('tap',function() {
            var _cont = '<p class="delTipP" >亲！ 确定您已收到货物了吗？</p><span class="delTipSpan">确认收货后此交易将会关闭</span>';
            myPub.askLayer(_cont,function() {
                // 判断删除店家
                alert('确定');
                myPub.LayerCloseAll();

            },function() {
                alert('取消了');

            },'no');
        });
        // 售后订单被取消弹框
        oCancelApply.hammer().on('tap',function() {
            var _cont = '<p class="delTipP" >此订单正在售后处理</p><span class="delTipSpan">确认收货将取消售后申请</span>';
            myPub.askLayer(_cont,function() {
                // 判断删除店家
                alert('确定');
                myPub.LayerCloseAll();

            },function() {
                alert('取消了');

            },'no');
        });




        // 删除订单提示
        oDelOrderBtn.hammer().on('tap',function() {
            var _cont = '<p class="delTipP" >亲！ 您确定要删除此订单吗？</p><span class="delTipSpan">删除后此订单会永远消失</span>';
            myPub.askLayer(_cont,function() {
                // 判断删除店家
                alert('确定');
                myPub.LayerCloseAll();
            },function() {
                alert('取消了');
            },'no');
        });



        // 放弃支付原因
        oCanOrderBtn.on('click',function() {
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

        });

        // 原因选择
        oReasonList.find('li').hammer().on('tap',function() {
            oReasonList.find('li').removeClass('active');
            $(this).addClass('active');
        });


        // 限制字数
        if(oUserMessage.length>0) {
            myPub.statInputNum(oUserMessage,maxLWord);
        }


        /*
        // 搜索设置cookie
        var cTime = 'h2';  //coookie 时间
        var _val = [];
        var oSearchBtn = $('.js_searchBtn');    //搜索按钮
        var oSearchTxt = $('.js_searchTxt');    //搜索框
        var oHClearBtn = $('.js_HClearBtn');  //清楚历史记录按钮
        var oHisListUl = $('.js_hisList').find('ul'); //历史记录UL
        var recomHTMl = $('.js_hisList').find('ul').html();  //系统推荐
        var cookArry = document.cookie.split('; ');   // 分离cookie成数组
        var cookIndex = parseInt(myPub.getCookie('cookIndex')); // 记录个数

        // 获取cookie并设置历史记录
        if(myPub.getCookie('cookIndex') == undefined) {
            myPub.setCookie('cookIndex','-1',cTime);
            cookIndex = parseInt(myPub.getCookie('cookIndex'));
        }
        else {
            oHisListUl.empty();
            for(var i=0; i<cookArry.length; i++) {
                if(cookArry[i].charAt(0) == 'r') {
                    _val[i] = cookArry[i].substring( cookArry[i].indexOf('=')+1 );
                    oHisListUl.prepend('<li>'+ unescape(_val[i]) +'</li>');
                }

            }

        }

        //搜索后添加cookie
        oSearchBtn.hammer().on('tap',function() {
            if(oSearchTxt.val() == '') {
                myPub.TipLayer('亲！搜索信息不能为空！');
            }
            else {
                cookIndex == null || cookIndex >= 4  ? cookIndex = 0 : cookIndex++;
                myPub.setCookie('records'+cookIndex,oSearchTxt.val(),cTime);
                myPub.setCookie('cookIndex',cookIndex,cTime);
            }
        });

        // 清楚cookie和历史记录
        oHClearBtn.hammer().on('tap',function() {
            myPub.askLayer('亲！您确定要清除历史记录？',function() {
                for(var i=0; i<cookArry.length; i++) {
                    myPub.delCookie('records'+i);
                }
                myPub.delCookie('cookIndex');
                // 清楚cookie的记录 添加系统推荐的
                oHisListUl.empty().html(recomHTMl);
                myPub.LayerCloseAll();
            },function() {
                alert('no')
            },'no');
        });
        */

/*
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
*/

/**********************************  部分公共操作 end   **********************************/


   });
});


