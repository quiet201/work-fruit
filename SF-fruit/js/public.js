define(function(require,exports,module) {

    //加入购物车的动画
    function AddCarAnimate(obj,target) {
        obj.hammer().on('tap',function(e) {
            console.log(e.target.innerHTML)
            target.removeClass('MAnimate');
            var _X = e.gesture.center.x;
            var _Y = e.gesture.center.y;
            target.css({ 'left':_X,'top':_Y, 'opacity':1});
            clearTimeout(obj.time);
            obj.time = setTimeout(function() {
                target.addClass('MAnimate').css({'left':"74%",'top':"95%", 'opacity':0});
            },10);

        });
    }
    exports.AddCarAnimate = AddCarAnimate;


    /*滚动条效果*/
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
            //console.log(this.obj)
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
        this.obj.scrollToElement(document.querySelector('.' + _clsName + ' li' + clsName), '', 0, 0);
    };

    //滚动结束事件
    ScrollBar.prototype.ScrollEnd = function (fn) {
        var _this = this.obj;
        this.obj.on('scrollEnd', function () {
            //console.log(this.y)
            //console.log(_this.maxScrollY)
            //如果滑动到底部，则加载更多数据
            if ((this.y - this.maxScrollY) < 20) {
                fn();
            }
        });
    };
    exports.ScrollBar = ScrollBar;
});


