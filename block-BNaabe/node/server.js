let path = require('path');
let absolutePath = __dirname;
let relativePath = './index.html';

console.log(absolutePath);
console.log(__dirname + '/app.js');
console.log(relativePath);
console.log(path.join(absolutePath, 'index.html'));
