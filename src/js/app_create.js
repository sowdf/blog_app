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