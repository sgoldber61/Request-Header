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
  
  res.send({ipaddress: ipaddress, ip0: iparray[0], ip1: iparray[1], ip2: iparray[2], ip3: iparray[3]});
  
});

// listen to port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
