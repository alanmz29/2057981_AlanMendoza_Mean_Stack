var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/courses";
mongoose.pluralize(null); 
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

let db = mongoose.connection;
let msgSchema = mongoose.Schema({
    _id:Number,
    user:String,
    msg:String,
    
});

let courseModel = mongoose.model("Message",msgSchema);
app.get('/', function(req, res){
   res.sendFile(__dirname + '\\index.html');
});
let index = 0;
io.on('connection', function(socket){
   
   socket.on('msg', function(data){
      
      let c = new courseModel({_id:index,user:data.uName,msg:data.message});
      index++;
      courseModel.insertMany([c],(err,result)=> {
          if(!err)
          {
              console.log(result);
          } 
          else
          {
              console.log(err);
          }
      })
      io.sockets.emit('newmsg', data);
   })
});
http.listen(3000, function(){console.log('listening on localhost:3000');});