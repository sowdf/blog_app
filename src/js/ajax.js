function AJAX(method, URL, async, type, callback) {
    var xml = new XMLHttpRequest();
    xml.open(method, URL, async);
    xml.responseType = type;
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
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
        AJAX('GET', url, true, 'json', function(data) {
            callback(data);
        });
    },
    getOneArticle: function(ArtId, callback) {
        var url = '/ajax?id=' + ArtId;
        AJAX('GET', url, true, 'json', function(data) {
            callback(data);
        });
    },
    getTags: function(callback) {
        var url = '/ajax?tags=All';
        AJAX('GET', url, true, 'json', function(data) {
            callback(data);
        });
    },
    deleteArt: function(ArtId) {
        var url = '/ajax?delete=true&&id=' + ArtId;
        AJAX('GET', url, true, 'json', function(data) {});
    }
};
module.exports = ajaxReq;
