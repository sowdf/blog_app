var ajax = require('./ajax');
var create = require('./mobile_create');
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
                if (thisHash.match(/#[^#]+/g).length === 3) {
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

        function _ctrl() {
            var thisHash = location.hash.match(/#[^#]+/);
            var contentList = document.getElementsByClassName('content-articles')[0];
            if (thisHash !== null) {
                if (thisHash[0] === '#articles') {
                    appContentControl.getArticleList();
                } else if (thisHash[0] === '#detail') {
                    appContentControl.getOneArticle();
                }
            }
        }
        _ctrl();
        window.addEventListener('hashchange', _ctrl);
        scroll(getTotal);
    }
};
module.exports = appContentControl;
var getTotal = {};

function articleListCallBack(data) {
    var contentList = document.getElementsByClassName('content-articles')[0];
    var articleList = data.list;
    for (var i = articleList.length - 1; i >= 0; i--) {
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
