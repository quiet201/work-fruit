//搜索-输入状态和按钮激活联动
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var searchInputField = document.querySelectorAll('.am-search');
        if(searchInputField){
            Array.prototype.forEach.call(searchInputField, function (elem) {
                var searchBtnWrap = elem.querySelector('.am-search-button'),
                    searchTrigger = elem.querySelector('.am-search-button .am-button'),
                    searchInput = elem.querySelector('input.am-search-value'),
                    searchClear = elem.querySelector('.am-icon-clear'),
                    btnHideTimer;
                if (searchTrigger && searchInput) {
                    searchActive(searchInput,searchTrigger);
                    searchInput.addEventListener('focus',function(){
                        searchActive(searchInput,searchTrigger);
                        searchBtnWrap.style.display='block';
                    },false);
                    searchInput.addEventListener('blur',function(){
                        btnHideTimer=setTimeout(function(){
                            searchBtnWrap.style.display='none';
                        },400);
                    },false);
                    searchClear.addEventListener('click',function(){
                        clearTimeout(btnHideTimer);
                    },false);
                    searchInput.addEventListener('input', function () {
                        searchActive(searchInput,searchTrigger);
                    }, false);
                    function searchActive(elem,trigger){
                        if(elem.value.length > 0){
                            trigger.removeAttribute('disabled');
                        }else{
                            trigger.setAttribute('disabled','disabled');
                        }
                    }
                }
            });
        }
    }, false);
})();
//输入清除功能
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var autoClearFiled = document.querySelectorAll('.am-input-autoclear');
        if(autoClearFiled){
            Array.prototype.forEach.call(autoClearFiled, function (elem) {
                var clearTrigger = elem.querySelector('.am-icon-clear');
                var clearInput = elem.querySelector('input[type="text"],input[type="password"],input[type="number"],input[type="tel"],input[type="email"],input[type="url"],input[type="search"]');
                if (clearTrigger && clearInput) {
                    if (clearInput.value.length > 0) {
                        clearTrigger.style.visibility = 'visible';
                    }
                    clearTrigger.addEventListener('click', function () {
                        clearInput.value = '';
                        clearInput.focus();
                        clearTrigger.style.visibility = 'hidden';
                    }, false);
                    clearInput.addEventListener('input', function () {
                        clearTrigger.style.visibility = (clearInput.value.length > 0) ? 'visible' : 'hidden';
                    }, false);
                }
            });
        }
    }, false);
})();

//input框输入之后才点亮下一步按钮
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var requiredField = document.querySelectorAll('[data-am-required-for]');

        function canEnable(btnId) {
            if (document.getElementById(btnId)) {
                var fields = document.querySelectorAll('[data-am-required-for=' + btnId + ']');
                var b = true;
                Array.prototype.forEach.call(fields, function (elem) {
                    var minLen = Number(elem.getAttribute('data-am-required-length')) || 1;
                    //b = b && !!elem.value;
                    b = b && (elem.value.length >= minLen);
                });
                return b;
            }
            return true;
        }

        function handler(e) {
            var btnId = e.target.getAttribute('data-am-required-for');
            refreshBtn(btnId);
        }

        function refreshBtn(btnId) {
            var submitBtn = document.getElementById(btnId);
            if (submitBtn) {
                if (canEnable(btnId)) {
                    submitBtn.removeAttribute('disabled');
                } else {
                    submitBtn.setAttribute('disabled', 'disabled');
                }
            }
        }

        // 放重复判断
        var btnIds = {};
        Array.prototype.forEach.call(requiredField, function (elem) {
            elem.addEventListener('input', handler);
            elem.addEventListener('focus', handler);
            elem.addEventListener('blur', handler);

            var btnId = elem.getAttribute('data-am-required-for');
            if (!btnIds[btnId]) {
                refreshBtn(btnId);
                btnIds[btnId] = true;
            }
        });
    });
})();
