seajs.config({
    alias: {
      'hammer' : './js/plug/hammer.min.js',
      'iscroll': './js/plug/iscroll.min.js',
      'layer'  :'./js/plug/layer/layer.js',
      'public' :'./js/public.js',
    }
});

seajs.use(['hammer','iscroll','layer','public'], function(myHam,myIsc,myLay,myPub) {
   // $(function () {
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
        var oPage1 = $('.js_page1');
        var oPage2 = $('.js_page2');


/**********************************  添加滚动条 start   *************************************/
        //页面滚动
        if(oContain.length>0) {
            var conScroll = new myPub.ScrollBar();
            conScroll.AddScroll(oContain[0],{click:true,mouseWheel:true});
        }
        //二级导航滚动
        if(oNavSecList.length>0) {
            oNavSecUl.css({width:oNavSecLi.width() * oNavSecLi.length});
            var secScroll = new myPub.ScrollBar();
            secScroll.AddScroll(oNavSecList[0],{scrollX: true, scrollY: false, click:true,mouseWheel:true});
        }
        //详情滚动
        if(oPage1.length>0 && oPage2.length>0) {
            var maxY = 100;
            var oPullTip = $('.js_pullTip');
            var H1 = oPage1.height();
            var H2 = oPage2.height();
            var pageScroll1 = new IScroll(oPage1[0], { probeType: 3, mouseWheel: true });
            var pageScroll2 = new IScroll(oPage2[0], { probeType: 3, mouseWheel: true });

            pageScroll1.on('scroll',function() {
                var _disY = this.maxScrollY - this.y;
                if(_disY >= maxY) {
                    oPage1.find('.js_pullTip').addClass('changIcon');
                }
                else {
                    oPullTip.removeClass('changIcon');
                }
            });

            pageScroll2.on('scroll',function() {
                if(this.y >= maxY) {
                    oPage2.find('.js_pullTip').addClass('changIcon');
                }
                else {
                    oPullTip.removeClass('changIcon');
                }
            });


            //上拉
            pageScroll1.on('slideUp',function() {
                //console.log("1:"+this.y);
                if(this.maxScrollY - this.y > maxY) {
                    oPage1.stop().animate({height:0,opacity:0},300);
                    oPage2.stop().animate({height:H2,opacity:1},500,function() {
                        pageScroll2.refresh();
                    });

                }
            });
            //下拉
            pageScroll2.on('slideDown',function() {
                //console.log('2:'+this.y);
                if(this.y > maxY) {
                    oPullTip.removeClass('changIcon');
                    oPage2.find('.js_pullTip').addClass('changIcon');
                    oPage1.stop().animate({height:H1,opacity:1},500,function() {
                        pageScroll1.refresh();
                    });
                    oPage2.stop().animate({height:0,opacity:0},300);

                }
            });

        }


/**********************************  添加滚动条 end    *************************************/

        //显示搜索框
        oSStart.hammer().on('tap',function(e) {
            oSearchArea.show().eq(0).hide();
            oGoodsBox.hide();
            oFooter.hide();
            oIndexSearch.show();
            conScroll.ReScroll(oContain[0]);
        });

        //隐藏搜索框
        oSCancel.hammer().on('tap',function(e) {
            oSearchArea.show().eq(1).hide();
            oGoodsBox.show();
            oFooter.show();
            oIndexSearch.hide();
            conScroll.ReScroll(oContain[0]);
        });

        //添加购物车动画
        myPub.AddCarAnimate(oBtnAddCar,oMoveIcon);

   // });


});


