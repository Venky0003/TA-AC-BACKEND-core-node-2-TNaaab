let http = require('http');
let path = require('path');
let server = http.createServer(handleRequest);
let fs = require('fs')

function handleRequest(req, res) {
    fs.createReadStream('./redame.txt').pipe(res)
}

server.listen(3000);