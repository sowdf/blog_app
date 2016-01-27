var pageCtrl = require('./page_ctrl');
var ajax = require('./ajax');
var appHashControl = {
    sidebar: function() {
        var appContainer = document.getElementsByClassName('app-container')[0];
        var sidebarMobileBtn = document.getElementsByClassName('sidebar-mobile-btn')[0];
        var sidebar = document.getElementsByClassName('sidebar')[0];
        var tagbar = document.getElementsByClassName('tagbar')[0];
        var mask = document.getElementsByClassName('content-mask')[0];
        var tagBtn = document.getElementsByClassName('sidebar-list-item')[1];
        sidebarMobileBtn.addEventListener('click', function() {
            appContainer.className = 'app-container sidebar-open';
        });
        mask.addEventListener('click', function() {
            appContainer.className = 'app-container';
            tagbar.className = 'tagbar';
        });
        sidebar.addEventListener('click', function() {
            if (tagbar.className === 'tagbar tagbar-on' && event.target.tagName !== 'A') {
                tagbar.className = 'tagbar';
            }
            if (event.target.tagName === 'A') {
                appContainer.className = 'app-container';
                tagbar.className = 'tagbar';
            }
        });
        tagBtn.addEventListener('click', function() {
            if (tagbar.className === 'tagbar') {
                tagbar.className = 'tagbar tagbar-on';
                event.stopPropagation();
            }
        });
        tagbar.addEventListener('click', function() {
            if (event.target.tagName === 'A') {
                tagbar.className = 'tagbar';
                appContainer.className = 'app-container';
            }
        });
    },
    init: function() {
        if (location.pathname !== '/mobile') {
            location.pathname = '/mobile';
        }

        function _ctrl() {
            pageCtrl._off(cover);
            pageCtrl._off(articles);
            pageCtrl._off(detail);
            pageCtrl._off(about);
            var thisHash = location.hash;
            if (thisHash !== '') {
                thisHash = thisHash.match(/^\#[^\#]+/)[0];
            }
            switch (thisHash) {
                case '#cover':
                    pageCtrl._listClear();
                    pageCtrl._on(cover);
                    break;
                case '#articles':
                    IfList();
                    pageCtrl._on(articles);
                    break;
                case '#detail':
                    pageCtrl._listClear();
                    pageCtrl._on(detail);
                    break;
                case '#about':
                    pageCtrl._listClear();
                    pageCtrl._on(about);
                    break;
                default:
                    location.hash = '#cover';
            }
        }
        var cover = document.getElementsByClassName('cover')[0];
        var articles = document.getElementsByClassName('content-articles')[0];
        var detail = document.getElementsByClassName('content-detail')[0];
        var about = document.getElementsByClassName('content-about')[0];
        appHashControl.sidebar();
        _ctrl();
        window.addEventListener('hashchange', _ctrl);
    }
};
module.exports = appHashControl;

function IfList() {
    if (location.hash.match(/#[0-9]+/) !== null) {
        if (location.hash.match(/#[0-9]+/)[0] === '#1') {
            pageCtrl._listClear();
            return;
        }
    }
    if (location.hash.match(/#[0-9]+/) !== null) {
        var page = location.hash.match(/#[0-9]+/)[0].slice(1);
        var items = document.getElementsByClassName('content-articles-item');
        if (items.length >= parseInt(page) * 5 || items.length < parseInt(page) * 5 - 5) {
            location.hash = '#cover';
        }
    }
}
