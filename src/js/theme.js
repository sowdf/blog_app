var themeModule = (function() {
    var monokai = '3rd/css/monokai-sublime.css';
    var theme = 'css/theme.css';
    
    function loadCSS(css) {
        var head = document.getElementsByTagName('HEAD').item(0);
        var style = document.createElement('LINK');
        style.href = css;
        style.className = css;
        style.rel = 'stylesheet';
        style.type = 'text/css';
        head.appendChild(style);
    }

    function decide() {
        var links = document.getElementsByTagName('link');
        var output = false;
        for (var i = 0; i < links.length; i++) {
            var j = i;
            if (links[j].href.match(/theme/) !== null) {
                output = true;
                break;
            }
        }
        return output;
    }

    function openNight() {
        loadCSS(theme);
        loadCSS(monokai);
    }

    function closeNight() {
        var head = document.getElementsByTagName('HEAD').item(0);
        var themeCSS = document.getElementsByClassName(theme)[0];
        var monokaiCSS = document.getElementsByClassName(monokai)[0];
        head.removeChild(themeCSS);
        head.removeChild(monokaiCSS);

    }

    function init() {
        var themeBtn = document.getElementsByClassName('slider-list-theme')[0];
        themeBtn.addEventListener('click', function() {
            decide() !== true ? openNight() : closeNight();
        });
    }
    return {
        initial: init
    };
}())
module.exports = themeModule;