var http = require('http');
var fs = require('fs');
var path = require('path');

var MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

var root = process.cwd();

http.createServer(function(req, res) {
  var url = req.url.split('?')[0];

  // Resolve directory URLs to index.html
  var filePath = path.join(root, url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + url);
      return;
    }
    var ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(3001, function() {
  console.log('Server running at http://localhost:3001');
});
