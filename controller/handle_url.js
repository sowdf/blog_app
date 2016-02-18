var fs = require('fs');
var URL = require('url');
var querystring = require('querystring');
var assert = require('assert');

var articleModel = require('./../model/article_model');

var MY_PASS_WORD = '****';
var mod = {
    handleStatic: function(db, pathname, res) {
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
    handlePage: function(db, pathname, req, res) {
        switch (pathname) {
            case '/ajax':
                var getReqQuery = querystring.parse(URL.parse(req.url).search);
                decide(db, getReqQuery, function(data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(data);
                    res.end();
                });
                break;
            case '/mobile': 
                sendMobile(res);
            default:
                req.method === 'POST' ? handlePost(db, req, res) : sendApp(res);
        }
    }
};
module.exports = mod;

function sendMobile(res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(fs.readFileSync('views/mobile.html'));
}

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

function handlePost(db, req, res) {
    req.on('data', function(chunk) {
        var getData = querystring.parse(chunk.toString());
        if (getData.password || getData.password === '') {
            if (getData.password === MY_PASS_WORD) {
                sendAdmin(res);
            } else {
                res.writeHead(301, {
                    location: '/#close'
                });
                res.end();
            }
        } else if (getData.title) {
            insertArt(db, getData);
            res.writeHead(301, {
                location: '/'
            });
            res.end();
        }
    });
}

function decide(db, query, callback) {
    if (query['?itemNum']) {
        if (!query['tag']) {
            getList(db, query, callback);
        } else {
            getList(db, query, callback, {
                tag: query['tag']
            });
        }
    }
    if (query['?id']) {
        article(db, query, callback);
    }
    if (query['?tags']) {
        tags(db, query, callback);
    }
    if (query['?delete']) {
        deleteArt(db, query, callback);
    }
}

function getList(db, query, callback, select) {
    if (!select) {
        var select = undefined;
    }
    articleModel.findList(db, function(list) {
        list.toArray(function(err, doc) {
            assert.equal(err, null);
            var output = {};
            var start = -1 * (query['page'] - 1) * query['?itemNum'];
            output.total = doc.length;
            if (start !== 0) {
                output.list = doc.slice(start - parseInt(query['?itemNum']), start);
            } else {
                output.list = doc.slice(-1 * parseInt(query['?itemNum']));
            }
            callback(JSON.stringify(output));
        });
    }, select);
}

function tags(db, query, callback) {
    articleModel.findList(db, function(list) {
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

function article(db, query, callback) {
    var num = parseInt(query['?id']);
    articleModel.findOne(db, num, function(list) {
        list.toArray(function(err, doc) {
            assert.equal(err, null);
            var output = doc[0];
            callback(JSON.stringify(output));
        });
    });
}

function deleteArt(db, query, callback) {
    var num = parseInt(query['id']);
    articleModel.remove(db, num);
}

function insertArt(db, query) {
    var thisArticle = {};
    var date = new Date();
    thisArticle.title = query.title;
    thisArticle.tag = query.tag;
    thisArticle.main = query.main;
    thisArticle.date = date.getFullYear() + '\-' + (date.getMonth() + 1) + '\-' + date.getDate();

    if (query.exist === 'true') {
        articleModel.update(db, parseInt(query.id), thisArticle);
    } else {
        thisArticle.id = Date.now();
        thisArticle.link = '#detail#id=' + thisArticle.id;
        articleModel.insert(db, thisArticle);
    }
}
