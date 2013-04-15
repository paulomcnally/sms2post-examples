var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.bodyParser());
server.listen(9999);

// Home page
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Receiver
app.post('/post', function (req, res) {
	ws_sendData(req.body);
	res.send('socket.io');
});


// Socket.io
io.sockets.on("connection", ws_start);

function ws_start(data){
	data.on("new_message", ws_sendData);
}

function ws_sendData(data){
	io.sockets.emit("ws_getData",data);
}