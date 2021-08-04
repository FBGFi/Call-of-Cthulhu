import React, { useRef, useEffect, useContext } from 'react';
import { GameHostActions } from '../../../../../actions';
import ChatMessage from '../../../../../components/ChatMessage';
import { GameHostContext } from '../../../../../reducers/GameHostReducer';
import './HostChat.css';

const HostChat: React.FC = () => {
    const { state, dispatch } = useContext(GameHostContext);
    const chatMessagesRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const sendMessage = () => {
        if (inputRef.current && inputRef.current.value.length !== 0 && inputRef.current.value !== undefined) {
            let time = Date.now();

            // For some reason it was pushing it twice if done in reducer, so do it this way...
            let messages = state.CHAT_MESSAGES;
            messages.push({
                message: inputRef.current.value,
                sender: "Host",
                timeStamp: time,
                type: 'message'
            });
            if (messages.length > 30) {
                messages.shift();
            }

            dispatch(
                {
                    type: GameHostActions.SET_CHAT_MESSAGES,
                    value: messages
                });
            inputRef.current.value = "";
        }
    }

    const clearChat = () => {
        dispatch({
            type: GameHostActions.SET_CHAT_MESSAGES, value: [{
                message: "Chat was cleared by Host",
                sender: "Host",
                timeStamp: Date.now(),
                type: 'alert'
            }]
        });
    }

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [state]);

    return (
        <div className="HostChat">
            <div className="title-container">
                <h2>Chat</h2>
            </div>
            <div className="chat">
                <div ref={chatMessagesRef} className="chat-messages">
                    {state.CHAT_MESSAGES.map(message => <ChatMessage key={message.timeStamp + Math.floor(Math.random() * 10000)} message={message.message} timeStamp={message.timeStamp} sender={message.sender} type={message.type} />)}
                </div>
                <div className="send-message-container">
                    <input ref={inputRef} type="text" />
                    <button onClick={() => sendMessage()}>Send</button>
                    <button onClick={() => clearChat()}>Clear</button>
                </div>
            </div>
        </div>
    );
}

export default HostChat;