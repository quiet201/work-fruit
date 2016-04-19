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

        var conScroll = new myPub.ScrollBar();      //页面滚动
        var secScroll = new myPub.ScrollBar();      //二级导航滚动



        if(oContain.length>0) { conScroll.AddScroll(oContain[0],{click:true}); }
        if(oNavSecList.length>0) {
            oNavSecUl.css({width:oNavSecLi.width() * oNavSecLi.length});
            secScroll.AddScroll(oNavSecList[0],{scrollX: true, scrollY: false, click:true});
        }


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


