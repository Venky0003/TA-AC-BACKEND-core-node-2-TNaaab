let path = require('path');
let http = require('http');
let fs = require('fs');
let userDir = path.join(__dirname, '/users/');
let qs = require('querystring');
let url = require('url');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = '';
  let parsedUrl = url.parse(req.url, true);
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    if (parsedUrl.pathname === '/users' && req.method === 'POST') {
      let username = JSON.parse(store).username;
      fs.open(userDir + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        console.log(fd);
        fs.writeFile(fd, store, (err) => {
          if (err) {
            return console.log(err);
          }
          fs.close(fd, () => {
            res.end(`${username} successfully created`);
          });
        });
      });
    } else if (parsedUrl.pathname === `/users` && req.method === 'GET') {
      let username = parsedUrl.query.username;
      fs.readFile(userDir + username + '.json', (err, user) => {
        if (err) return console.log(err);
        console.log(user); //check the data type using the console.log
        res.setHeader('Content-Type', 'application/json');
        res.end(user);
      });
    } else if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
      let username = parsedUrl.query.username;
      fs.open(userDir + username + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              res.setHeader('Content-Type', 'application/json');
              res.end(`${username} updated successfully`);
            });
          });
        });
      });
    } else if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
      let username = parsedUrl.query.username;
      fs.unlink(userDir + username + '.json', (err) => {
        if (err) return console.log(err);
        res.end(`${username} Deleted successfully`);
      });
    } else {
      res.statuscode = 404;
      res.end('Page not Found');
    }
  });
}

server.listen(7001, () => {
  console.log('Server is listening on Port 7k');
});
