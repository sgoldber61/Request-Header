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
  var ipaddress = req.headers['x-forwarded-for'].split(",")[0];
  var language = req.headers["accept-language"].split(",")[0];
  
  var softwareData = req.headers['user-agent'];
  var regex = /\(([^)]+)\)/;
  var software = softwareData.match(regex)[1]; // results captured in parentheses
  
  res.send({ipaddress: ipaddress, language: language, software: software});
});

// listen to port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
