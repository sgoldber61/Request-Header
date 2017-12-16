// require non-express helper modules
var path = require('path');
var ipware = require('ipware');
var requestIp = require('request-ip');

// require express
var express = require('express');
var app = express();

// app routing

// render the home page index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// example: {ipaddress: "72.198.91.159", language: "en-US", software: "Macintosh; Intel Mac OS X 10_11_1"}
app.get('/whoami', function(req, res) {
  var ipaddress = req.connection.remoteAddress;
  
  var iparray = [req.headers['x-forwarded-for'],
     req.connection.remoteAddress,
     req.socket.remoteAddress,
     (req.connection.socket ? req.connection.socket.remoteAddress : null)];
  
  iparray.map(console.log);
  
  res.send({ipaddress: ipaddress, language: null, software: null});
});

// listen to port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
