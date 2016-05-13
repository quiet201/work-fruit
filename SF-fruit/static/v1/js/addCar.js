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
        var oSeletSide = $('.js_seletSide');        //下滑窗口
        var oBotCloseBtn = $('.js_closeBtn');       //关闭按钮
        var oArrDownBtn = $('.js_arrDownBtn');      //下滑按钮
        var oDeButton = $('.js_deButton');          //结账和加入操作按钮
        var oCarhref = $('.js_carhref');            //结账和加入 确定
        var oGoodsSizeUl = $('.js_goodsSize ul');   //产品规格列表
        var oShadow = $('.js_shadow');              //阴影
        var oSumNum = $('.js_sumNum');              //总数

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

/**********************************  下滑窗口 end     **********************************/
    });

});
