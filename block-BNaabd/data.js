let http = require('http');
var qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = '';
  let dataFormat = req.headers['content-type'];
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    if (dataFormat === 'application/json') {
      res.end(store);
    } else if (dataFormat === 'application/x-www-form-urlencoded') {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(7000, () => {
  console.log('Server listening on port 7k');
});
