let path = require('path');

let relativePathToIndexJS = '../client/index.js';
console.log(relativePathToIndexJS);

let absolutePaathToIndexjs = path.join(
  __dirname,
  '../projects/client/index.js'
);
console.log(absolutePaathToIndexjs);

let http = require('http');
let fs = require('fs');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/form') {
    fs.readFile('form.html', (err, data) => {
      if (err) console.log(err);
      res.setHeader('Content-Type', 'text/Html');
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/form') {
    let store = '';
    req.on('data', (chunk) => {
      store = store + chunk.toString();
    });
    req.on('end', () => {
      console.log(store);
      let parsedData = qs.parse(store);
      res.setHeader('Content-Type', 'text/Html');
      res.end(
        `<h1>${parsedData.name}</h1><email>${parsedData.email}</email><p>${parsedData.age}</p>`
      );
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

server.listen(5678, () => {
  console.log('Server listening on port 5678');
});
