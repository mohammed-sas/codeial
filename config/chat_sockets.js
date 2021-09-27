

module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer
        ,{
            cors: {
                origin: "http://34.227.178.14:8000",
                methods: ["GET", "POST"]
            }
         }
    );
    
    io.sockets.on('connection',function(socket){
        console.log('new connection received with socket id',socket.id);
        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });

        // .on detects the event
        socket.on('join_room',function(data){
            console.log('joining req',data);
            // the socket joins the chatroom
            socket.join(data.chatRoom);
            // this emits the info to all other user that a user has joined the chatroom
            io.in(data.chatRoom).emit('user_joined',data);

        });

        // detect send_message and broadcast to everyone in the room
        socket.on('send_message',function(data){
            io.in(data.chatRoom).emit('receive_message',data);
        });

    })



}