/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var appHashControl = __webpack_require__(7);
	var appContentControl = __webpack_require__(8);



	appHashControl.init();
	appContentControl.init();

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	var ctrl = {
	    _on : function(ele) {
	        ele.className = ele.className + ' ' + ele.className + '-on';
	    },
	    _off : function(ele) {
	        var get = ele.className.replace(/[A-Za-z-]+-on/g, '');
	        var out = get.trim();
	        ele.className = out;
	    },
	    _listClear: function() {
	        console.log('clear');
	        var list = document.getElementsByClassName('content-articles')[0];
	        var items = document.getElementsByClassName('content-articles-item');
	        var count = items.length;
	        for(var i = 0; i < count; i++) {
	            list.removeChild(items[0]);
	        }
	    },
	    _tableClear: function() {
	        var tbody = document.getElementsByTagName('TBODY')[0];
	        var tlist = document.getElementsByTagName('TR');
	        var count = tlist.length;
	        for(var i = 1; i < count; i++) {
	            tbody.removeChild(tlist[1]);
	        }
	    }
	}
	module.exports = ctrl;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	function AJAX(method, URL, async, type, callback) {
	    var xml = new XMLHttpRequest();
	    xml.open(method, URL, async);
	    xml.responseType = type;
	    xml.onreadystatechange = function() {
	        if (xml.readyState==4 && xml.status==200){
	            var getRes = xml.response;
	            callback(getRes);
	        }
	    };
	    xml.send();
	}
	var ajaxReq = {
	    getArticleList: function(itemNum, page, tag, callback) {
	        var url = '/ajax?itemNum=' + itemNum;
	        tag ? url = url + '&&tag=' + tag + '&&page=' + page : url = url + '&&page=' + page;
	        AJAX('GET', url, true, 'json', function(data){
	            callback(data);
	        });
	    },
	    getOneArticle: function(ArtId, callback) {
	        var url = '/ajax?id=' + ArtId;
	        AJAX('GET', url, true, 'json', function(data){
	            callback(data);
	        });
	    },
	    getTags: function(callback) {
	        var url = '/ajax?tags=All';
	        AJAX('GET', url, true, 'json', function(data){
	            callback(data);
	        });
	    },
	    deleteArt: function(ArtId) {
	        var url = '/ajax?delete=true&&id=' + ArtId;
	        AJAX('GET', url, true, 'json', function(data){
	        });
	    }
	};
	module.exports = ajaxReq;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var pageCtrl = __webpack_require__(2);
	var ajax = __webpack_require__(6);
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
	        if (location.pathname !== '/') {
	            location.pathname = '/';
	        }
	        if (location.hash === '#close') {
	            location.hash = '#enter';
	            var content = document.getElementsByClassName('enter-content')[0];
	            var p = content.children[1];
	            p.innerText = '死';
	            p.style.fontSize = '4em';
	            p.style.fontWeight = '700';
	            p.style.color = '#d25349';
	            setTimeout(function() {
	                location.reload();
	            }, 3000);
	        } else {
	            location.hash = '#cover';
	        }
	        var cover = document.getElementsByClassName('cover')[0];
	        var articles = document.getElementsByClassName('content-articles')[0];
	        var detail = document.getElementsByClassName('content-detail')[0];
	        var about = document.getElementsByClassName('content-about')[0];
	        var enter = document.getElementsByClassName('enter')[0];
	        appHashControl.sidebar();
	        window.addEventListener('hashchange', function() {
	            pageCtrl._off(cover);
	            pageCtrl._off(articles);
	            pageCtrl._off(detail);
	            pageCtrl._off(about);
	            pageCtrl._off(enter);
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
	                case '#enter':
	                    pageCtrl._listClear();
	                    pageCtrl._on(enter);
	                    break;
	            }
	        });
	    }
	};
	module.exports = appHashControl;

	function IfList() {
	    if ( location.hash.match(/#[0-9]+/) !== null) {
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var ajax = __webpack_require__(6);
	var create = __webpack_require__(9);
	var appContentControl = {
	    getArticleList: function() {
	        var thisHash = location.hash;
	        var select;
	        var currentPage,
	            itemNum,
	            tag;
	        itemNum = 5;
	        if (thisHash !== '#articles') {
	            select = thisHash.match(/#[^#]+/g)[1];
	            var type = select.replace(/#/, '');
	            if (type == parseInt(type)) {
	                currentPage = type;
	                tag = undefined;
	            } else {
	                if (thisHash.match(/#[^#]+/g).length === 3){
	                    currentPage = thisHash.match(/#[^#]+/g)[2].replace(/#/, '');
	                } else {
	                    location.hash += '#1';
	                    return;
	                }
	                tag = type;
	            }
	        } else {
	            location.hash += '#1';
	            return;
	        }
	        ajax.getArticleList(itemNum, currentPage, tag, articleListCallBack);
	    },
	    getOneArticle: function() {
	        var link = location.hash.slice(11);
	        ajax.getOneArticle(link, oneArticleCallBack);
	    },
	    getTags: function() {
	        ajax.getTags(tagList);
	    },
	    init: function() {
	        ajax.getTags(tagList);
	        window.addEventListener('hashchange', function() {
	            var thisHash = location.hash.match(/#[^#]+/);
	            var contentList = document.getElementsByClassName('content-articles')[0];
	            if (thisHash !== null) {
	                if (thisHash[0] === '#articles') {
	                    appContentControl.getArticleList();
	                } else if (thisHash[0] === '#detail') {
	                    appContentControl.getOneArticle();
	                }
	            }
	        });
	        scroll(getTotal);
	    }
	};
	module.exports = appContentControl;
	var getTotal = {};

	function articleListCallBack(data) {
	    var contentList = document.getElementsByClassName('content-articles')[0];
	    var articleList = data.list;
	    for (var i = articleList.length-1; i >= 0; i--) {
	        var title = articleList[i].title;
	        var tag = articleList[i].tag;
	        var main = articleList[i].main;
	        var link = articleList[i].link;
	        var date = articleList[i].date;
	        var newItem = new create.ArticleItem();
	        var prevText = markdown.toHTML(main.slice(0, 100));
	        newItem._title(title);
	        newItem._prev(prevText);
	        newItem._date(date);
	        newItem._link(link);
	        contentList.appendChild(newItem._item);
	    }
	    getTotal.total = data.total;
	}

	function oneArticleCallBack(data) {
	    var title = document.getElementsByClassName('content-detail-title')[0];
	    var tag = document.getElementsByClassName('content-detail-tag')[0].children[0];
	    var date = document.getElementsByClassName('content-detail-date')[0].children[0];
	    var main = document.getElementsByClassName('content-detail-main')[0];
	    title.innerText = data.title;
	    tag.innerText = data.tag;
	    date.innerText = data.date;
	    var mainArticle = markdown.toHTML(data.main);
	    var a = mainArticle.replace(/<code>/g, "<pre><code>");
	    var b = a.replace(/<\/code>/g, "<\/code><\/pre>");
	    main.innerHTML = b;

	    var codes = document.getElementsByTagName('code');
	    for (var i = 0; i < codes.length; i++) {
	        var langType = codes[i].childNodes[0].data;
	        var chose = langType.match(/[A-Za-z][^\s]+/);
	        if (chose !== null && document.readyState === 'complete' && chose !== ['']) {
	            codes[i].className = chose;
	            hljs.highlightBlock(codes[i]);
	        }
	    }
	    hljs.highlightBlock(main);
	}

	function tagList(data) {
	    var list = document.getElementsByClassName('tagbar-list')[0];
	    for (var i = 0; i < data.list.length; i++) {
	        var thisItem = create.tagItem(data.list[i]);
	        list.appendChild(thisItem);
	    }
	}

	function scroll(data) {
	    var windowHeight = window.innerHeight;
	    var scroll = document.getElementsByClassName('content')[0];
	    console.log('1');
	    scroll.addEventListener('scroll', function() {

	        var scrollPosition = scroll.scrollTop;
	        var scrollHeight = scroll.scrollHeight;
	        var items = document.getElementsByClassName('content-articles-item');
	        if (location.hash.match(/#[0-9]+/) !== null && scrollPosition - scrollHeight + windowHeight === 0 && data.total > items.length) {
	            var page = location.hash.match(/#[0-9]+/)[0].slice(1);
	            var next = parseInt(page) + 1;
	            console.log(page);
	            location.hash = location.hash.replace(/#[0-9]+/, '#' + next);
	        }
	    });
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	var create = {
	    ArticleItem: function() {
	        var item = document.createElement('DIV');
	        var title = document.createElement('H3');
	        var preview = document.createElement('DIV');
	        var detail = document.createElement('DIV');
	        var front = document.createElement('SPAN');
	        var back = document.createElement('A');
	        item.className = 'content-articles-item';
	        title.className = 'articles-item-header';
	        preview.className = 'articles-item-preview markdown';
	        detail.className = 'articles-item-detail articles-item-rotate';
	        front.className = 'articles-item-rotate-front';
	        back.className = 'articles-item-btn';
	        item.appendChild(title);
	        item.appendChild(preview);
	        item.appendChild(detail);
	        detail.appendChild(front);
	        detail.appendChild(back);
	        back.innerText = '继续阅读';
	        this._item = item;
	        this._title = function(text) {
	            title.innerText = text;
	        };
	        this._prev = function(html) {
	            preview.innerHTML = html;
	        };
	        this._date = function(text) {
	            front.innerText = text;
	        };
	        this._link = function(URL) {
	            back.setAttribute('href', URL);
	        }
	    },
	    tagItem: function(tag) {
	        var item = document.createElement('DIV');
	        var link = document.createElement('A');
	        item.appendChild(link);
	        var URL = '#articles#' + tag;
	        item.className = 'tagbar-list-item';
	        link.innerText = tag;
	        link.setAttribute('href', URL);
	        return item;
	    }
	}
	module.exports = create;

/***/ }
/******/ ]);