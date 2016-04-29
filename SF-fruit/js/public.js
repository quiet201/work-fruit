define(function(require,exports,module) {

    //加入购物车的动画
    function AddCarAnimate(obj,target,sLeft,sTop) {
        obj.hammer().on('tap',function(e) {
            // console.log(e.target.innerHTML);
            target.removeClass('MAnimate');
            var _X = e.gesture.center.x;
            var _Y = e.gesture.center.y;
            target.css({ 'left':_X,'top':_Y, 'opacity':1});
            clearTimeout(obj.time);
            obj.time = setTimeout(function() {
                target.addClass('MAnimate').css({'left':sLeft,'top':sTop, 'opacity':0});
            },10);
            HamstopPropaga();
        });
    }
    exports.AddCarAnimate = AddCarAnimate;

    // hammer 冒泡
    function HamstopPropaga() {
        window.event.returnValue = false;
        return false;
    }
    exports.HamstopPropaga = HamstopPropaga;

    //平滑事件
    function onHammerSwiper(obj) {
        this.obj = obj;
    }

    onHammerSwiper.prototype.addHamSwipe = function(obj,type,fn) {
        this.obj = new Hammer.Manager(obj);
        this.obj.add(new Hammer.Swipe({threshold:8,direction:Hammer.DIRECTION_ALL}));
        this.obj.on(type,function(e) {
            if(fn) fn(e);
            //e.preventDefault();
            //e.stopPropagation();
        });
    };

    exports.onHammerSwiper = onHammerSwiper;




    /*************** 滚动条效果 s***************/
    function ScrollBar(obj) {
        this.obj = obj;
    }

    //添加滚动条
    ScrollBar.prototype.AddScroll = function (obj,sOptions) {
        this.obj = new IScroll(obj,sOptions);
    };
    //刷新滚动条
    ScrollBar.prototype.ReScroll = function () {
        this.obj.refresh();
    };

    //删除滚动条
    ScrollBar.prototype.DelScroll = function () {
        this.obj.destroy();
    };
    //跳转指定位置
    ScrollBar.prototype.GotoScroll = function (clsName) {
        //需要给ul加class名称才能行
        var _clsName = this.obj.scroller.className.replace(' ', '.');
        //console.log(this.obj.scroller)
        //console.log(document.querySelector('.' + _clsName + ' li' + clsName))
        this.obj.scrollToElement(document.querySelector('.' + _clsName), '', 0, 0);
    };

    //滚动结束事件
    ScrollBar.prototype.ScrollEnd = function (fn) {
        var _this = this.obj;
        _this.on('scrollEnd', fn);
    };

     //滚动监听
    ScrollBar.prototype.ScrollIng = function (fn) {
        var _this = this.obj;
        this.obj.on('scroll', fn);
    };
    //滚动下拉slideDown
    // ScrollBar.prototype.SlideDown = function (fn) {
    //     var _this = this.obj;
    //     this.obj.on('slideDown', fn);
    // };
    // //滚动上拉slideUp
    // ScrollBar.prototype.SlideUp = function (fn) {
    //     var _this = this.obj;
    //     this.obj.on('slideUp', fn);
    // };

    exports.ScrollBar = ScrollBar;
    /*************** 滚动条效果 e***************/


     /* 数字验证 */
    function ValiNum(obj,fn1,fn2) {
        var reg = new RegExp("^[0-9]*$");
        if(!reg.test(obj.val())){
            if(fn1) fn1();
        }
        else if( obj.val() < 0) {
            TipLayer("数量不能小余1");
            obj.val(1);
        }
        else{if(fn2) fn2();}
    }
    exports.ValiNum = ValiNum;

    /* 字数统计 */
     function statInputNum(textArea,numItem) {
        var max =  numItem.eq(0).text();
        var curLength = 0;
            textArea.each(function(i) {
                textArea.eq(i).attr("maxlength", max).on('input propertychange', function () {
                    curLength = $(this).val().length;
                    numItem.eq(i).empty().text(max - curLength);
                });
            });

    }
    exports.statInputNum = statInputNum;


    /* 购物车价格统计 */
    function ShopSumPrice(obj,tarFather,target,sumPrice) {
        var _price = 0;
        obj.each(function(i) {
            if(obj.eq(i).hasClass('active')) {
                var _oGoodsPrice = obj.eq(i).siblings(tarFather).find(target);
                _oGoodsPrice.each(function(i) {
                    _price += (_oGoodsPrice.eq(i).text())*1;
                     return  _price;
                });
            }

        });
        sumPrice.text(_price.toFixed(2));
    }
    exports.ShopSumPrice = ShopSumPrice;


    /*************** 弹框效果 s***************/

    //提示框
    function TipLayer (sCont,sStyle,fn) {
        layer.open({
            content: sCont,
            style:sStyle || 'background-color:rgba(0,0,0,0.5); color:#fff; border:none; border-radius: 15px;',
            time: 2,
            success:function() {if(fn)fn();}
        });
    }
    exports.TipLayer = TipLayer;

    //带按钮提示框
    function TipBtnLayer (sCont) {
        layer.open({
            content: sCont,
            btn:['确定'],
            shadeClose: false,
        });
    }
    exports.TipBtnLayer = TipBtnLayer;

    // 标题提示框
    function TipTitleLayer (sTitle,styleTit,sCont) {
        layer.open({
            title: [ sTitle,'background-color:#f8f8f8; color:#252525; font-weight:bold' ],
            content: sCont,
            shadeClose:false,
            style: styleTit,
        });
    }
    exports.TipTitleLayer = TipTitleLayer;

    //加载层
    function loadLayer() {
        layer.open({type: 2});
    }
    exports.loadLayer = loadLayer;

    //询问层
    function askLayer(sCont, yesFn, noFn) {
        layer.open({
            content: sCont,
            btn: ['确认', '取消'],
            shadeClose: false,
            yes: yesFn, no: noFn
        });
    }
    exports.askLayer = askLayer;


    /*************** 弹框效果 e***************/





});


