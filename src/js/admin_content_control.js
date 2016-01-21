var create = require('./admin_create');
var ajax = require('./ajax');
var adminContentControl = {
    getArticleList: function() {
        var select;
        var currentPage;
        var tag = undefined;
        var itemNum = 20;
        if (location.hash.match(/#[0-9]+/) !== null) {
            var currentPage = parseInt(location.hash.match(/#[0-9]+/)[0].slice(1));
        } else {
            location.hash += '#1';
        }
        ajax.getArticleList(itemNum, currentPage, tag, articleListCallBack);
    },
    getArticle: function() {
        var num = parseInt(location.hash.match(/#[^#]+/g)[1].slice(1));
        var form = document.getElementsByTagName('form')[0];
        var node = document.createElement("input");
        var id = document.createElement("input");
        node.name  = 'exist';
        node.value = 'true';
        node.style.display = 'none';
        id.name = 'id';
        id.value = num;
        id.style.display = 'none';
        form.appendChild(node.cloneNode());
        form.appendChild(id.cloneNode());
        ajax.getOneArticle(num, articleCallBack);
    },
    init: function() {
        window.addEventListener('hashchange', function() {
            var thisHash = location.hash.match(/#[^#]+/g);
            //var contentList = document.getElementsByClassName('content-articles')[0];
            if (thisHash !== null) {
                if (thisHash[0] === '#articles') {
                    adminContentControl.getArticleList();
                } else if(thisHash[0] === '#write' && thisHash.length === 2) {
                    
                    adminContentControl.getArticle();
                    
                }
            }
        });
    }
}
module.exports = adminContentControl;
function articleListCallBack(data) {
    var articleList = data.list;
    var prevBtn = document.getElementsByClassName('admin-prev-btn')[0];
    var nextBtn = document.getElementsByClassName('admin-next-btn')[0];
    var currentPage = location.hash.match(/#[0-9]+/)[0].slice(1);
    var content = document.getElementsByTagName('tbody')[0];
    for (var i = 0; i < articleList.length; i++) {
        var j = i;
        var thisItem = new create.tableItem();
        thisItem._fill(data.list[j]);
        var doc = data.list[j].id;
        thisItem._delete().addEventListener('click', function(){
            var tbody = document.getElementsByTagName('tbody')[0];
            var thisLine = event.target.parentElement.parentElement;
            tbody.removeChild(thisLine);
            ajax.deleteArt(doc);
        });
        thisItem._edit().setAttribute('href', '#write#' + doc)
        content.appendChild(thisItem._item);
    }
    if( 20*currentPage < data.total ) {
        var next = location.hash.replace(/#[0-9]+/, '#' + (parseInt(currentPage) + 1));
        nextBtn.setAttribute('href', next);
        nextBtn.className = 'admin-next-btn';
    } else {
        nextBtn.setAttribute('href', location.hash);
        nextBtn.className = 'admin-next-btn prevent-btn';
    }
    if (parseInt(currentPage) === 1) {
        prevBtn.setAttribute('href', location.hash);
        prevBtn.className = 'admin-prev-btn prevent-btn';
    } else {
        var prev = location.hash.replace(/#[0-9]+/, '#' + (parseInt(currentPage) - 1));
        prevBtn.setAttribute('href', prev);
        prevBtn.className = 'admin-prev-btn';
    }
}

function articleCallBack(data) {
    var title = document.getElementsByTagName('INPUT')[0];
    var tag = document.getElementsByTagName('INPUT')[1];
    var main = document.getElementsByTagName('TEXTAREA')[0];
    title.value = data.title;
    tag.value = data.tag;
    main.value = data.main;
}