let path = require('path');
let http = require('http');
let fs = require('fs');
let userDir = path.join(__dirname, 'users/');
let qs = require('querystring');
let url = require('url');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = '';
  let parsedUrl = url.parse(req.url, true);
  let filePath = userDir + parsedUrl.pathname.split('/')[2] + '.json';
  // let querystring = qs.parse(req.url, true)
  req.on('data', (chunk) => {
    store = store + chunk;
  });

  req.on('end', () => {
    let username = JSON.parse(store).username;
    if (parsedUrl.pathname === `/users/${username}` && req.method === 'POST') {
      //   let username = JSON.parse(store).username;
      if (username) {
        fs.open(filePath, 'wx', (err, fd) => {
          if (err) {
            res.end('Username already exists. Please choose another username.');
          } else {
            fs.writeFile(filePath, store, (err) => {
              if (err) {
                return console.log(err);
              }
              fs.close(fd, (err) => {
                if (err) {
                  return console.log(err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(`${username} successfully created`);
              });
            });
          }
        });
      } else {
        res.end('Please provide a valid username.');
      }
    }

    if (parsedUrl.pathname === `/users` && req.method === 'GET') {
      let { username } = qs.parse(parsedUrl.query);
      let filePath = userDir + username + '.json';
      if (username) {
        let filePath = path.join(userDir, `${username}.json`);
        fs.readFile(filePath, (err, user) => {
          if (err) return console.log(err);
          let data = JSON.parse(user);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        });
      }
    }

    if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
      let { username } = qs.parse(parsedUrl.query);
      let filePath = path.join(userDir, `${username}.json`);
      fs.open(filePath, 'r+', (err) => {
        if (!err) {
          fs.truncate(filePath, (err) => {
            if (err) return console.log(err);
            fs.writeFile(filePath, store, (err) => {
              if (err) return console.log(err);
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({ message: 'User updated successfully.' })
              );
            });
          });
        } else {
          res.end('User does not exist.');
        }
      });
    }
    if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
      fs.unlink(filePath, (err) => {
        if (err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'User deleted successfully.' }));
      });
    }
  });
}

server.listen(7000, () => {
  console.log('Server is listening on Port 7k');
});
