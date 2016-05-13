function callNative(fn) {
    (function(e) {
        var t = "MiuiYellowPageApi",
            n = function(t) {
                try {
                    e(t)
                } catch (n) {
                    alert(n.message)
                }
            },
            r = window,
            i = r[t];
        i ? n(i) : document.addEventListener("yellowpageApiReady", function(e) {
            setTimeout(function() {
                n(r[t])
            }, 1)
        })
    })
    (function(api) {
        fn(api);
    });
}