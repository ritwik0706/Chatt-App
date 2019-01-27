var express = require('express');
var socket = require('socket.io');


var app = express();
var server = app.listen(3000, function(){
    console.log('Listening to requests on port 3000');
});

app.use(express.static('design'));


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