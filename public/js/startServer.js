var http = require('http');
var solc = require('solc');
var ed25519 = require('ed25519');
var crypto = require('crypto');

http.createServer(function (req, res) {
  var data = "";
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    var reqObj = data;
    var a = compile(reqObj);
    res.writeHead(200);
    res.end(JSON.stringify(a));
  });
}).listen(8088);
console.log('solc server running at http://127.0.0.1:8088/');

http.createServer(function (req, res) {
  var data = "";
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    var reqObj = data;
    var b = gen(reqObj);
    res.writeHead(200);
    res.end(JSON.stringify(b));
  });
}).listen(8086);
console.log('solc server running at http://127.0.0.1:8086/');

function compile(sol,resolve){
  var output = solc.compile(sol, 1);
  return output;
}

function gen(pwd,resolve){
  var kp = {};
  var seed = crypto.randomBytes(32);
  var genkp = ed25519.MakeKeypair(seed);
  kp.publicKey = genkp.publicKey.toString("hex");
  kp.privateKey = genkp.privateKey.toString("hex");
  return kp; 
}