var http = require('http');
var URL = require('url');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo = require('mongodb');
var mongoURL = 'mongodb://localhost:50712/blog';
var handleURL = require('./controller/handle_url');
var PORT = process.env.PORT || 3000;
MongoClient.connect(mongoURL, function(err, db) {
    if (err) throw err;
    http.createServer(function(req, res) {
        var pathname = URL.parse(req.url).pathname;
        handleURL.handleStatic(db, pathname, res);
        handleURL.handlePage(db, pathname, req, res);
        process.on('uncaughtException', function (error) {
            console.log(error.stack);
        });
    }).listen(PORT);
});