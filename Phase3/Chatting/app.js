var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + '\\index.html');});
users = [];
srvMsg = ["Hello, how are you?","Im doing fine!","Ok,bye"]
io.on('connection', function(socket){
   var index = 0;
   socket.on('getUser', function(data){
         users.push(data);
         console.log("Hello, ",data)
   });
   socket.on('getMsg', function(data){
        users.push(data);
        console.log("Client: ",data)
        console.log("Server: ", srvMsg[index])
    });
   socket.on('msg', function(data){
      //Send message to everyone
      data = srvMsg[index];
      index++;
      io.sockets.emit('newmsg', data);
   })
});
http.listen(3000, function(){console.log('listening on localhost:3000');});