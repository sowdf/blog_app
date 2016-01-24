var pageCtrl = require('./page_ctrl');
var font = require('./font');
var adminHashCtrl = {
    init: function() {
        var articles = document.getElementsByClassName('admin-articles')[0];
        var write = document.getElementsByClassName('admin-write')[0];
        var writeBtn = document.getElementsByClassName('admin-write-btn')[0];
        var backArrow = document.getElementsByClassName('admin-write-back-arrow')[0];
        var prevArrow = document.getElementsByClassName('admin-prev-btn')[0];
        var nextArrow = document.getElementsByClassName('admin-next-btn')[0];
        var logoutBtn = document.getElementsByClassName('admin-logout-btn')[0];
        location.hash = '#articles';
        pageCtrl._on(articles);
        adminHashCtrl.editor();
        window.addEventListener('hashchange', function() {
            pageCtrl._tableClear();
            pageCtrl._off(write);
            pageCtrl._off(articles);
            var thisHash = location.hash;
            if (thisHash !== '') {
                thisHash = thisHash.match(/^\#[^\#]+/)[0];
            }
            switch (thisHash) {
                case '#articles':
                    pageCtrl._on(articles);
                    break;
                case '#write':
                    pageCtrl._on(write);
                    break;
                default :
                    location.hash = '#articles';
            }
        });
        logoutBtn.addEventListener('click', function() {
            location.href = location.href.replace(/#[^]+/g, '');
        });
        font.edit(writeBtn, 0.4, '#fff');
        font.arrow(backArrow, 'left', 0.6, '#fff');
        font.arrow(prevArrow, 'top', 0.6, '#fff');
        font.arrow(nextArrow, 'bottom', 0.6, '#fff');
        font.logout(logoutBtn, 0.3, '#fff');
    },
    editor: function() {
        var mainEditor = document.getElementsByClassName('main-edit')[0];
        var prevEditor = document.getElementsByClassName('main-preview')[0];
        var switchBtn = document.getElementsByClassName('write-switch-btn')[0];
        var writeMain = document.getElementsByClassName('write-main')[0];
        var adminWrite = document.getElementsByClassName('admin-write')[0];
        var fullScreenBtn = document.getElementsByClassName('write-fullscreen-btn')[0];
        switchBtn.addEventListener('click', function() {
            if(writeMain.className === 'write-main') {
                writeMain.className = 'write-main preview-on';
            } else {
                writeMain.className = 'write-main';
            }
        });
        
        mainEditor.addEventListener('input', function() {
            var output = markdown.toHTML(mainEditor.value);
            var a = output.replace(/<code>/g,"<pre><code>");
            var b = a.replace(/<\/code>/g, "<\/code><\/pre>");
            prevEditor.innerHTML = b;
            var codes = document.getElementsByTagName('code');
            for( var i = 0; i < codes.length; i++) {
                var langType = codes[i].childNodes[0]
                !langType ? langType = 'code' : langType = langType.data;
                var chose = langType.match(/[A-Za-z][^\s]+/);
                if (chose !== null && document.readyState ==='complete' && chose !== ['']) {
                    codes[i].className = chose;
                }
            }
            var codes = document.getElementsByTagName('CODE');
            for (var i = 0; i< codes.length; i++) {
                hljs.highlightBlock(codes[i]);
            }
        });

        function screenFull() {
            if(adminWrite.className === 'admin-write admin-write-on') {
                adminWrite.className = 'admin-write admin-write-on fullscreen-on';
            } else {
                adminWrite.className = 'admin-write admin-write-on';
            }
        }
        fullScreenBtn.addEventListener('click', screenFull);
        window.addEventListener('keydown', function(e) {
            if ( adminWrite.className === 'admin-write admin-write-on' ||
                 adminWrite.className === 'admin-write admin-write-on fullscreen-on' )
            {
                if(e.keyCode === 0x1B) {
                    screenFull();
                }
            }
        });
    }
}
module.exports = adminHashCtrl;