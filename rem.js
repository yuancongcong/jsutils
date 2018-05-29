export default function() {
    var changeRem = function() {
        var deviceWidth = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    };
    changeRem();
    var t;
    window.addEventListener('resize', function() {
        clearTimeout(t);
        t = setTimeout(changeRem, 300);
    }, false);
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(t);
            t = setTimeout(changeRem, 300);
        }
    }, false);
}
