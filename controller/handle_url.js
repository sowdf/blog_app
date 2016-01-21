var fs = require('fs');
var URL = require('url');
var querystring = require('querystring');
var assert = require('assert');

var articleModel = require('./../model/article_model');

var MY_PASS_WORD = '****';
var mod = {
    handleStatic: function(pathname, res) {
        var type = pathname.match(/(\.[^\.]+)$/);
        type === null ? type = pathname : type = type[0];
        switch (type) {
            case ".css":
                res.writeHead(200, {
                    'Content-Type': 'text/css'
                });
                res.end(fs.readFileSync('dist/' + pathname));
                break;
            case ".js":
                res.writeHead(200, {
                    'Content-Type': 'application/javascript'
                });
                res.end(fs.readFileSync('dist/' + pathname));
                break;
            case ".ico":
            case ".gif":
            case ".png":
            case ".jpg":
                res.writeHead(200, {
                    'Content-Type': 'document'
                });
                res.end(fs.readFileSync('dist/' + pathname));
                break;
        }
    },
    handlePage: function(pathname, req, res) {
        console.log(pathname);
        switch (pathname) {

            case '/ajax':
                var getReqQuery = querystring.parse(URL.parse(req.url).search);
                console.log(getReqQuery);
                decide(getReqQuery, function(data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(data);
                    res.end();
                });
                break;
            default:
                req.method === 'POST' ? handlePost(req, res) : sendApp(res);
        }
    }
};
module.exports = mod;

function sendApp(res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(fs.readFileSync('views/app.html'));
}

function sendAdmin(res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(fs.readFileSync('views/admin.html'));
}

function handlePost(req, res) {
    req.on('data', function(chunk) {
        var getData = querystring.parse(chunk.toString());
        console.log(getData);
        if (getData.password || getData.password === '') {
            if (getData.password === MY_PASS_WORD) {
                sendAdmin(res);
            } else {
                res.writeHead(301, {
                    location: '/#close'
                });
                res.end();
            }
        } else if(getData.title) {
            insertArt(getData);
            res.writeHead(301, {
                location: '/'
            });
            res.end();
        }
    });
}

function decide(query, callback) {
    if (query['?itemNum']) {
        if (!query['tag']) {
            getList(query, callback);
        } else {
            getList(query, callback, {
                tag: query['tag']
            });
        }
    }
    if (query['?id']) {
        article(query, callback);
    }
    if (query['?tags']) {
        tags(query, callback);
    }
    if (query['?delete']) {
        deleteArt(query, callback);
    }
}

function getList(query, callback, select) {
    if (!select) {
        var select = undefined;
    }
    articleModel.findList(function(list) {
        list.toArray(function(err, doc) {
            assert.equal(err, null);
            var output = {};
            var start = (query['page'] - 1) * query['?itemNum'];
            output.total = doc.length;
            output.list = doc.slice(start, start + parseInt(query['?itemNum']));
            callback(JSON.stringify(output));
        });
    }, select);
}

function tags(query, callback) {
    articleModel.findList(function(list) {
        list.toArray(function(err, doc) {
            assert.equal(err, null);
            var obj = {};
            var output = {};
            for (var i = 0; i < doc.length; i++) {
                obj[doc[i].tag] = doc[i].tag;
            }
            output.list = Object.keys(obj);
            callback(JSON.stringify(output));
        });
    });
}

function article(query, callback) {
    var num = parseInt(query['?id']);
    articleModel.findOne(num, function(list) {
        list.toArray(function(err, doc) {
            assert.equal(err, null);
            var output = doc[0];
            callback(JSON.stringify(output));
        });
    });
}

function deleteArt(query, callback) {
    var num = parseInt(query['id']);
    articleModel.remove(num);
}

function insertArt(query) {
    var thisArticle = {};
    var date = new Date();
    thisArticle.title = query.title;
    thisArticle.tag = query.tag;
    thisArticle.main = query.main;
    thisArticle.date = date.getFullYear() + '\-' + (date.getMonth() + 1) + '\-' + date.getDate();
    
    if (query.exist === 'true') {
        articleModel.update(parseInt(query.id), thisArticle);
    } else {
        thisArticle.id = Date.now();
        thisArticle.link = '#detail#id=' + thisArticle.id;
        articleModel.insert(thisArticle);
    }
}
