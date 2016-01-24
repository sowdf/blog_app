var http = require('http');
var URL = require('url');

var handleURL = require('./controller/handle_url');

var PORT = process.env.PORT || 3000;
http.createServer(function(req, res) {
    var pathname = URL.parse(req.url).pathname;
    handleURL.handleStatic(pathname, res);
    handleURL.handlePage(pathname, req, res);
}).listen(PORT);
