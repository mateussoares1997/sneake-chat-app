import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client'

let socket

const Chat = (props) => {

    const { userName } = props
    const [ messages, setMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState()
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
            const message = {
                who: data.who,
                text: data.text
            }
            setNewMessage(message)
        });

    }, [])

    useEffect(() => {
        if(!newMessage){
            return
        }

        setMessages([
            ...messages,
            newMessage
        ])
    }, [newMessage]);
    
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
                {
                    messages && messages.map((message, index ) => {
                        const  whose = message.who === userName ? 'mine' : 'yours'
                        return (
                            <li className='message' key={index}>
                                <div className={'message-bubble ' + whose}>
                                    <span className='whose'>{message.who}</span>
                                    {message.text}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <textarea onChange={handleChange} className="chat-field" value={text} onKeyPress={handleKeyPress}></textarea>
        </div>
    );
}

export default Chat;
