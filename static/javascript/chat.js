let chat, message_box;
const chat_socket = io.connect({ query: { game_id } });


document.addEventListener('DOMContentLoaded', () => {
    chat = document.getElementById('messages'), message_box = document.getElementById('message_box');
    chat.scrollTop = chat.scrollHeight; // idk
    
    document.getElementById('chat_form').addEventListener('submit', event => {
        event.preventDefault();
        chat_socket.emit('submit message', message_box.value);
        message_box.value = '';
    });
});

chat_socket.on('update chat', message => {
    const sender = document.createElement('span'), content = document.createElement('span'); 
    sender.innerText = message['sender'], content.innerText = message['content']; 
    sender.classList.add('sender'), content.classList.add('message');
    chat.appendChild(sender), chat.appendChild(content);
    content.scrollIntoView();
});