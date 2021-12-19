const express=require("express");
const socket=require('socket.io');
const mongoose = require('mongoose');
const Status=require('./status');


//App Setup

const app=express();
const server=app.listen(4000, async()=>{
    console.log("Listening to requests on prt 4000");
});

app.use(express.static('public'));


//socket setup
const io = require("socket.io")(server);

const connectURl="mongodb+srv://bobo:1234@cluster0.erxur.mongodb.net/status?retryWrites=true&w=majority";

mongoose.connect(connectURl, { useUnifiedTopology: true, useNewUrlParser: true }).then(async()=>{
   await console.log("Baraaaaaaaa");
}).catch((err)=>{
    console.log(err);
})

io.on('connection',(socket)=>{

    
    console.log('made socket connection',socket.id);
    
    socket.on("chat",(data)=>{
        const chat=new Status({message:data.message,handle:data.handle});
        chat.save().then(()=>{
            io.emit('message',data)
        })
        console.log(data);
    })
    
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })

    Status.find().then(res=>{
        console.log(res);
        socket.emit('output-status',res);
    })
})


