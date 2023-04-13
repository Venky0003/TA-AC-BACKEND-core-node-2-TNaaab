console.log(__dirname);
let http = require('http');
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = '';
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    console.log(store);
    res.setHeader('Content-Type', 'application/json');
    res.write(store);
    res.end();
  });
}

server.listen(3456, () => {
  console.log('Server listening on port 3456');
});
