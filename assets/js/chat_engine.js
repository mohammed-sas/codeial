class ChatEngine{
    constructor(chatboxId,userEmail){
        this.chatbox = $(`#${chatboxId}`);
        this.userEmail = userEmail;
        // this tells to establish a connection to chat_sockes.js in config
        this.socket = io.connect('http://34.227.178.14:5000');
        
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    // handles to and from communication
    // once the connection is established an acknowledgement is sent from the config file chat_sockets
    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log('socket connection established');

            // this event is emitted to server side config
            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatRoom : 'codeial'
            });
            self.socket.on('user_joined',function(data){
                console.log('a user has joined the chatroom',data);
            });

        });
        $('#send-message').click(function(){
            let msg= $('#chat-message-input').val();

            if(msg !=''){
                self.socket.emit('send_message',{
                    message : msg,
                    user_email:self.userEmail,
                    chatRoom : 'codeial'
                })
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);
            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';

            }

            newMessage.append($(`
                <span>
                    ${data.message}
                </span>
                <br>
                <sub>
                    ${data.user_email}
                </sub>
            `));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
        })

    }
}