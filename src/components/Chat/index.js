import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { animateScroll } from "react-scroll"
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
            history.push('/')
            return
        }

        socket = io(process.env.REACT_APP_CHAT_SERVER)

        socket.on('connect', () => {
            socket.emit('join', {
                room: 'room',
                who: userName
            })
        })

        socket.on('joined',(data) => {
            let text = 'You are connected with the room'

            if(!data.includes(userName)){
                text = data
            }

            const message = {
                who: 'Sneake Chat',
                text
            }

            setNewMessage(message)
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

    useEffect(() => {
        animateScroll.scrollToBottom();
    });
    
    const handleChange = (event) => {
        let value  = event.target.value

        //Clean new lines when there's no text
        const clean = value.replace(/^\s*(\n)\s*$/, '')
        setText(clean)
    }
    
    const handleKeyPress = (event) => {
        if(event.key !== 'Enter'){
            return
        }

        if(event.shiftKey){
            return
        }

        if(!text.length > 0){
            return 
        }

        socket.emit('message', {
            who: userName,
            text: text,
            room: 'room'
        });

        setText('')
    }

    return (
        <div className="chat">
            <ul className="chat-list" id='chat-list'> 
                {
                    messages && messages.map((message, index ) => {
                        const whose = message.who === userName ? 'mine' : 'yours'
                        const who = message.who === userName ? 'You' : message.who
                        const textArray = message.text.split('\n')
                        const textArrayLen = textArray.length
                        return (
                            <li className='message' key={index}>
                                <div className={'message-bubble ' + whose}>
                                    <span className='whose'>- {who}</span>
                                    {
                                        textArray.map((item, index) => (
                                            <p>
                                                { item }
                                                {
                                                    index + 1 !== textArrayLen && (
                                                        <br />
                                                    )
                                                }
                                            </p>
                                        ))
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <textarea 
                placeholder="Type a message..." 
                onChange={handleChange} 
                className="chat-field" 
                value={text} 
                onKeyPress={handleKeyPress}
                autoFocus>
            </textarea>
        </div>
    );
}

export default Chat;
