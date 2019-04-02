var express = require('express');
var socket = require('socket.io');
var path = require('path');

var port = process.env.port


var app = express();

app.use(express.static(path.join(__dirname, './design'), { maxAge: 86400000 }));


app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, './design/index.html'));
  });

var server = app.listen(port, function(){
    console.log('Listening to requests on port '+ port);
});

var io = socket(server);

io.on('connection', function(socket){
    console.log('Socket connection made, Socket ID : ' + socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});