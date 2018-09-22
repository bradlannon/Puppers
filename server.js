var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic(__dirname + '/dist/'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/dist/html/index.html');
});

app.listen(8080);

console.log('Started Express server');

