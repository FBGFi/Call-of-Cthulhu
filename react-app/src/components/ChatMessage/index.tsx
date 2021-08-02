import React from 'react';
import './ChatMessage.css';

type TChatMessage = {
    timeStamp: number;
    message: string;
    sender: string;
    type: 'alert' | 'message' | 'roll'
}

const ChatMessage: React.FC<TChatMessage> = (props) => {
    return (
        <div className='ChatMessage'>
            <span>{new Date(props.timeStamp).toLocaleString()} - {props.sender} said:</span>
            <p className={props.type}>{props.message}</p>
        </div>
    );
}

export default ChatMessage;

export type {TChatMessage};