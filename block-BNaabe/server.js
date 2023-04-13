let http = require('http');
var qs = require('querystring');

let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   let store = '';
//   req.on('data', (chunk) => {
//     store = store + chunk;
//   });
//   req.on('end', () => {
//     if (req.method === 'POST' && req.url === '/json') {
//       console.log(store);
//       res.statusCode = 201;
//       res.setHeader('Content-Type','application/json');
//       res.end(store);
//     }
//      if (req.method === 'POST' && req.url === '/form') {
//       console.log(store);
//       res.statusCode = 201;
//       var formData = qs.parse(store);
//       res.end(JSON.stringify(formData));
//     }
//   });
// }

// function handleRequest(req, res) {
//   let store = '';
//   let dataFormat = req.headers['content-type'];
//   req.on('data', (chunk) => {
//     store = store + chunk;
//   });
//   req.on('end', () => {
//     if (dataFormat === 'application/json') {
//       var parsedData = JSON.parse(store);
//       console.log(store);
//       res.end(store);
//     }
//     if (dataFormat === 'application/x-www-form-urlencoded') {
//         console.log(store);
//       var formData = qs.parse(store);
//       var actualData = JSON.stringify(formData);
//       res.end(actualData);
//     }
//   });
// }

function handleRequest(req, res) {
  let store = '';
  let dataFormat = req.headers['content-type'];
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    if (dataFormat === 'application/json') {
      var parsedData = JSON.parse(store);
      console.log(store);
      res.write(`<h1>${parsedData['name']}</h1>`);
      res.write(`<h2>${parsedData['email']}</h2>`);
      res.end();
    }
    if (dataFormat === 'application/x-www-form-urlencoded') {
      console.log(store);
      var formData = qs.parse(store);
      var actualData = JSON.stringify(formData);
      res.write(`<h2>${formData['email']}</h2>`);
      res.end();
    }
  });
}

server.listen(7006, () => {
  console.log('Server listening on port 7k5');
});
