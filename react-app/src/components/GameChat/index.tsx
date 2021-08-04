import React, { useRef, useEffect } from 'react';
import ChatMessage, { TChatMessage } from '../ChatMessage';
import './GameChat.css';

type GameChatProps = {
    messages: TChatMessage[];
    sendChatMessage: (message: string) => void;
}

const GameChat: React.FC<GameChatProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (inputRef.current && inputRef.current.value.length > 0 && inputRef.current.value !== undefined) {
            props.sendChatMessage(inputRef.current.value);
            inputRef.current.value = "";
        }
    }

    useEffect(() => { 
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    });

    return (
        <>
            <div className="header">
                <h2>Chat</h2>
            </div>
            <div onChange={() => {console.log("asd");
            }} ref={chatRef} className="chat">
                {props.messages.map(message => <ChatMessage key={message.timeStamp + Math.floor(Math.random() * 10000)} message={message.message} timeStamp={message.timeStamp} type={message.type} sender={message.sender} />)}
            </div>
            <div className="input-container">
                <input ref={inputRef} type="text" />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    );
}

export default GameChat;