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