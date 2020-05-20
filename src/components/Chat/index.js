import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client'

let socket

const Chat = (props) => {

    const { userName, setUserName } = props
    const [ messages, setMessages ] = useState([])
    const [ text, setText ] = useState('')
    const history = useHistory()

    useEffect(() => {

        if(!userName){
            history.push('/');
            return
        }

        socket = io(process.env.REACT_APP_CHAT_SERVER)

        socket.on('connect', () => {
            socket.emit('join', {
                room: 'room',
                who: userName
            });
        });

        socket.on('joined',(data) => {

            if(!data.includes(userName)){
                alert(data)
            }else{
                alert('You entered')
            }

        });
       
        socket.on('messaged',(data) => {

            if(data.who !== userName){
                alert(data.text)
            }

        });

    }, [history, userName])

    const handleChange = (event) => {
        const value  = event.target.value
        setText(value)
    }
    
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            socket.emit('message', {
                who: userName,
                text: text,
                room: 'room'
            });
            setText('')
        }
    }
    
    return (
        <div className="chat">
            <ul className="chat-list"> 
                
            </ul>
            <textarea onChange={handleChange} className="chat-field" value={text} onKeyPress={handleKeyPress}></textarea>
        </div>
    );
}

export default Chat;
