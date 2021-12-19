let socket=io("http://localhost:4000");

//Query DOM

let message=document.getElementById('message');
let handle=document.getElementById('handle');
let send=document.getElementById('send');
let output=document.getElementById('output');
let feedback=document.getElementById('feedback');

// Emit events


socket.on('message', data => {
    console.log(data)
    appendMessages(data)
})



send.addEventListener('click',()=>{
    socket.emit('chat', {
        message:message.value,
        handle:handle.value
    })
})

message.addEventListener("keypress",()=>{
   socket.emit('typing',handle.value); 
})

//listen for event

socket.on('output-status',(data)=>{
    feedback.innerHTML="";
    if(data.length){
        data.forEach(ele=>{
            appendMessages(ele);
        })
    }
});



function appendMessages(data) {
    const html ='<p><strong>'+data.handle+":</strong>"+data.message+'</p>'
    output.innerHTML += html
}

socket.on('typing',(data)=>{
    feedback.innerHTML='<p><em>'+data+'is typing a message...</em></p>'
    console.log("baraaa");
});