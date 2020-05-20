import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Chat = (props) => {

    const { userName, setUserName } = props

    useEffect(() => {
        const socket = io(process.env.REACT_APP_CHAT_SERVER)

        socket.on('connect', () => {
            socket.emit('join', {
                room: 'room'
            });
        });

        socket.on('joined',(data) => {
            alert('joined')
        });

    }, [userName])

    
    
    return (
        <div className="chat">
            Let's chat, {userName}!
        </div>
    );
}

export default Chat;
